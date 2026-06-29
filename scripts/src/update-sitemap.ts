/**
 * Auto-updates <lastmod> dates in sitemap.xml for all pages.
 *
 * For each public/blog/*\/index.html file:
 *   1. Reads `dateModified` (or `datePublished`) from the JSON-LD <script> block.
 *   2. Falls back to the file's filesystem mtime if neither is found.
 *   3. Splits sitemap.xml into isolated <url>…</url> segments and updates only
 *      the segment whose <loc> matches the page — no cross-block regex bleed.
 *   4. Inserts a new <url> entry for any blog post not yet in the sitemap.
 *
 * Non-blog pages are discovered automatically by walking public/ for index.html
 * files and deriving their canonical URL from the path. Blog-post subdirectories
 * (direct children of public/blog/) are excluded from this scan.
 *
 * NON_BLOG_PAGE_OVERRIDES supplies metadata only for pages whose HTML lives
 * outside public/ (e.g. the homepage). No config edits are needed when a new
 * public/ page lands.
 *
 * Run automatically via scripts/post-merge.sh before the sitemap ping.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { validateSitemap } from "./sitemap-validator.js";
import { collapseBlankLines } from "./sitemap-utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");

const SITEMAP_PATH = join(
  REPO_ROOT,
  "artifacts/landing-page/public/sitemap.xml"
);
const PUBLIC_DIR = join(REPO_ROOT, "artifacts/landing-page/public");
const BLOG_DIR = join(PUBLIC_DIR, "blog");
const BASE_URL = "https://www.jobsdonelabs.ai";

/**
 * Override metadata for pages whose HTML lives outside public/.
 * Auto-discovery covers everything inside public/; only add an entry here
 * when the HTML file is at a non-canonical location (e.g. the homepage).
 */
const NON_BLOG_PAGE_OVERRIDES: Record<string, { file: string }> = {
  [`${BASE_URL}/`]: {
    file: "artifacts/landing-page/index.html",
  },
};

/**
 * Walks PUBLIC_DIR and returns one {url, file} entry per index.html found,
 * skipping blog-post subdirectories (direct children of BLOG_DIR — those
 * are handled by the blog-post logic).
 */
function discoverNonBlogPages(): Array<{ url: string; file: string }> {
  const pages: Array<{ url: string; file: string }> = [];

  function walk(dir: string): void {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        // Blog post dirs live directly inside BLOG_DIR — skip them here.
        if (dir === BLOG_DIR) continue;
        walk(join(dir, entry.name));
      } else if (entry.name === "index.html") {
        const absPath = join(dir, "index.html");
        // Relative to PUBLIC_DIR: "" | "/about/ryne-bandolik" | "/blog" | …
        const relToPublic = dir.slice(PUBLIC_DIR.length);
        const urlPath = relToPublic ? `${relToPublic}/` : "/";
        const url = `${BASE_URL}${urlPath}`;
        const fileRelToRepo = absPath.slice(REPO_ROOT.length + 1);
        pages.push({ url, file: fileRelToRepo });
      }
    }
  }

  walk(PUBLIC_DIR);
  return pages;
}

function extractDate(html: string, filePath: string): string {
  const modMatch = html.match(/"dateModified"\s*:\s*"(\d{4}-\d{2}-\d{2})"/);
  if (modMatch) return modMatch[1];

  const pubMatch = html.match(/"datePublished"\s*:\s*"(\d{4}-\d{2}-\d{2})"/);
  if (pubMatch) return pubMatch[1];

  const mtime = statSync(filePath).mtime;
  return mtime.toISOString().slice(0, 10);
}

function setLastmod(block: string, loc: string, date: string): string {
  if (block.includes("<lastmod>")) {
    return block.replace(/<lastmod>[^<]*<\/lastmod>/, `<lastmod>${date}</lastmod>`);
  }
  return block.replace(
    `<loc>${loc}</loc>`,
    `<loc>${loc}</loc>\n    <lastmod>${date}</lastmod>`
  );
}

const slugs = readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const blogDates = new Map<string, string>();
for (const slug of slugs) {
  const htmlPath = join(BLOG_DIR, slug, "index.html");
  const html = readFileSync(htmlPath, "utf-8");
  blogDates.set(slug, extractDate(html, htmlPath));
  console.log(`[update-sitemap]   ${slug}: ${blogDates.get(slug)}`);
}

// Discover non-blog pages from the public/ directory tree.
const discoveredPages = discoverNonBlogPages();

// Build the final url→file map: start from discovered pages, then apply
// overrides (which can supply a custom file path or add pages outside public/).
const allNonBlogFiles = new Map<string, string>(); // url → file (relative to REPO_ROOT)

for (const { url, file } of discoveredPages) {
  const override = NON_BLOG_PAGE_OVERRIDES[url];
  allNonBlogFiles.set(url, override?.file ?? file);
}

// Add override entries that discovery didn't cover (e.g. homepage lives outside public/).
for (const [url, meta] of Object.entries(NON_BLOG_PAGE_OVERRIDES)) {
  if (!allNonBlogFiles.has(url)) {
    allNonBlogFiles.set(url, meta.file);
  }
}

const sitemap = readFileSync(SITEMAP_PATH, "utf-8");

// Split into alternating [non-url-text, <url>…</url>, non-url-text, …].
// The capturing group keeps each URL block as its own element so we can
// update it in isolation — no regex can accidentally span two blocks.
const parts = sitemap.split(/(<url>[\s\S]*?<\/url>)/g);

const existingSlugs = new Set<string>();
let removedCount = 0;

// Matches a blog-post <loc> like https://www.jobsdonelabs.ai/blog/<slug>/
// The blog index (/blog/) has an empty capture group and is intentionally excluded.
const BLOG_POST_LOC_RE = new RegExp(
  `<loc>${BASE_URL.replace(".", "\\.")}/blog/([^/]+)/</loc>`
);

// Build a lookup from URL → date for non-blog pages so we can update them
// in a single pass over the parts array alongside blog-post updates.
const nonBlogDates = new Map<string, string>();
for (const [url, file] of allNonBlogFiles) {
  const filePath = join(REPO_ROOT, file);
  const html = readFileSync(filePath, "utf-8");
  const date = extractDate(html, filePath);
  nonBlogDates.set(url, date);
  console.log(`[update-sitemap]   ${url}: ${date}`);
}

for (let i = 0; i < parts.length; i++) {
  const part = parts[i];
  if (!part.startsWith("<url>")) continue;

  const blogMatch = part.match(BLOG_POST_LOC_RE);
  if (blogMatch) {
    const slugInSitemap = blogMatch[1];
    if (blogDates.has(slugInSitemap)) {
      // Slug still exists on disk — update lastmod as before.
      existingSlugs.add(slugInSitemap);
      const loc = `${BASE_URL}/blog/${slugInSitemap}/`;
      parts[i] = setLastmod(part, loc, blogDates.get(slugInSitemap)!);
    } else {
      // Slug no longer exists on disk — remove the entry.
      console.log(`[update-sitemap]   removing stale entry: /blog/${slugInSitemap}/`);
      parts[i] = "";
      removedCount++;
    }
    continue;
  }

  // Check whether this block matches a non-blog page.
  let matchedNonBlog = false;
  for (const [url, date] of nonBlogDates) {
    if (part.includes(`<loc>${url}</loc>`)) {
      parts[i] = setLastmod(part, url, date);
      matchedNonBlog = true;
      break;
    }
  }

  if (!matchedNonBlog) {
    // This sitemap URL is neither a known blog post nor a discoverable non-blog
    // page — it may be stale or point to a file that no longer exists.
    const locMatch = part.match(/<loc>([^<]+)<\/loc>/);
    const loc = locMatch ? locMatch[1] : "(unknown loc)";
    console.warn(
      `[update-sitemap] ⚠ WARNING: sitemap URL not found on disk — lastmod will not be updated: ${loc}`
    );
  }
}

const newEntries: string[] = [];
for (const [slug, date] of blogDates) {
  if (!existingSlugs.has(slug)) {
    const loc = `${BASE_URL}/blog/${slug}/`;
    newEntries.push(
      [
        "  <url>",
        `    <loc>${loc}</loc>`,
        `    <lastmod>${date}</lastmod>`,
        "    <changefreq>monthly</changefreq>",
        "    <priority>0.8</priority>",
        "  </url>",
      ].join("\n")
    );
  }
}

let updated = collapseBlankLines(parts.join(""));
if (newEntries.length > 0) {
  updated = updated.replace("</urlset>", newEntries.join("\n") + "\n</urlset>");
}

validateSitemap(updated, nonBlogDates, blogDates, BASE_URL);

writeFileSync(SITEMAP_PATH, updated, "utf-8");

console.log(
  `[update-sitemap] ✓ sitemap.xml updated — ${blogDates.size} blog post(s) and ${nonBlogDates.size} non-blog page(s) processed` +
    (newEntries.length > 0 ? `, ${newEntries.length} new entry added` : "") +
    (removedCount > 0 ? `, ${removedCount} stale entry removed` : "")
);
