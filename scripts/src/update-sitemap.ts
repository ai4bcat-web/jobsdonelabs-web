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
 * Non-blog pages (homepage, blog index, case study, about) are also refreshed
 * using the same date-extraction logic via the NON_BLOG_PAGES map below.
 *
 * Run automatically via scripts/post-merge.sh before the sitemap ping.
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");

const SITEMAP_PATH = join(
  REPO_ROOT,
  "artifacts/landing-page/public/sitemap.xml"
);
const BLOG_DIR = join(REPO_ROOT, "artifacts/landing-page/public/blog");
const BASE_URL = "https://www.jobsdonelabs.ai";

/**
 * Maps each non-blog sitemap URL to its corresponding HTML file path
 * (relative to REPO_ROOT). Add new pages here to keep them auto-dated.
 */
const NON_BLOG_PAGES: Array<{ url: string; file: string }> = [
  {
    url: `${BASE_URL}/`,
    file: "artifacts/landing-page/index.html",
  },
  {
    url: `${BASE_URL}/blog/`,
    file: "artifacts/landing-page/public/blog/index.html",
  },
  {
    url: `${BASE_URL}/case-study/logistics-200k-profit/`,
    file: "artifacts/landing-page/public/case-study/logistics-200k-profit/index.html",
  },
  {
    url: `${BASE_URL}/about/ryne-bandolik/`,
    file: "artifacts/landing-page/public/about/ryne-bandolik/index.html",
  },
];

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
for (const { url, file } of NON_BLOG_PAGES) {
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
    // Extract the <loc> value for a helpful warning message.
    const locMatch = part.match(/<loc>([^<]+)<\/loc>/);
    const loc = locMatch ? locMatch[1] : "(unknown loc)";
    console.warn(
      `[update-sitemap] ⚠ WARNING: sitemap URL not in NON_BLOG_PAGES and not a blog post — lastmod will not be updated: ${loc}\n` +
        `  Add an entry for this URL to the NON_BLOG_PAGES array in scripts/src/update-sitemap.ts`
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

let updated = parts.join("");
// Remove blank lines left behind when a <url> block is deleted (parts[i] = "").
// The separator text on either side of the removed block remains, producing
// two adjacent whitespace-only lines. Collapse ≥3 consecutive newlines to 2.
updated = updated.replace(/(\n[ \t]*){3,}/g, "\n\n");
if (newEntries.length > 0) {
  updated = updated.replace("</urlset>", newEntries.join("\n") + "\n</urlset>");
}

validateSitemap(updated, nonBlogDates, blogDates);

writeFileSync(SITEMAP_PATH, updated, "utf-8");

console.log(
  `[update-sitemap] ✓ sitemap.xml updated — ${blogDates.size} blog post(s) and ${nonBlogDates.size} non-blog page(s) processed` +
    (newEntries.length > 0 ? `, ${newEntries.length} new entry added` : "") +
    (removedCount > 0 ? `, ${removedCount} stale entry removed` : "")
);

/**
 * Validates the final sitemap XML string after it has been written to disk.
 * Throws a descriptive Error if any invariant is violated so the caller
 * (post-merge.sh) can abort before the sitemap ping fires.
 *
 * Checks performed:
 *  1. The document is at least minimally well-formed XML (urlset wrapper present).
 *  2. Every non-blog page URL is still present.
 *  3. Every blog entry has a <lastmod> in YYYY-MM-DD format.
 *  4. No <loc> value appears more than once (no duplicates).
 */
function validateSitemap(
  xml: string,
  expectedNonBlog: Map<string, string>,
  expectedBlog: Map<string, string>
): void {
  const errors: string[] = [];

  // 1. Minimal well-formedness: must open and close with <urlset …> … </urlset>
  if (!/<urlset[\s\S]*>/.test(xml) || !xml.includes("</urlset>")) {
    errors.push("sitemap.xml is missing a valid <urlset> root element");
  }

  // Extract all <url> blocks for per-entry checks.
  const urlBlocks = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(
    (m) => m[0]
  );

  // 2. All non-blog pages must still be present.
  for (const url of expectedNonBlog.keys()) {
    if (!xml.includes(`<loc>${url}</loc>`)) {
      errors.push(`Non-blog entry missing from sitemap: <loc>${url}</loc>`);
    }
  }

  // 3. Every blog entry must have a <lastmod> in YYYY-MM-DD format.
  const LASTMOD_RE = /<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/;
  const BLOG_POST_LOC_RE_LOCAL = new RegExp(
    `<loc>${BASE_URL.replace(".", "\\.")}/blog/([^/]+)/</loc>`
  );
  for (const block of urlBlocks) {
    const blogMatch = block.match(BLOG_POST_LOC_RE_LOCAL);
    if (!blogMatch) continue; // non-blog block; skip lastmod check
    const slug = blogMatch[1];
    if (slug === "") continue; // blog index — not a post
    if (!LASTMOD_RE.test(block)) {
      errors.push(
        `Blog entry /blog/${slug}/ is missing a valid <lastmod> (YYYY-MM-DD)`
      );
    }
  }

  // 4. No duplicate <loc> values.
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const seen = new Set<string>();
  for (const loc of locs) {
    if (seen.has(loc)) {
      errors.push(`Duplicate <loc> in sitemap: ${loc}`);
    }
    seen.add(loc);
  }

  if (errors.length > 0) {
    throw new Error(
      `[update-sitemap] sitemap.xml validation failed:\n` +
        errors.map((e) => `  • ${e}`).join("\n")
    );
  }

  console.log(
    `[update-sitemap] ✓ validation passed — ${urlBlocks.length} <url> entries, no duplicates, all lastmod dates valid`
  );
}
