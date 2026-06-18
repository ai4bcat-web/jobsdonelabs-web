/**
 * Auto-updates <lastmod> dates in sitemap.xml for all blog posts.
 *
 * For each public/blog/*\/index.html file:
 *   1. Reads `dateModified` (or `datePublished`) from the JSON-LD <script> block.
 *   2. Falls back to the file's filesystem mtime if neither is found.
 *   3. Splits sitemap.xml into isolated <url>…</url> segments and updates only
 *      the segment whose <loc> matches the blog post — no cross-block regex bleed.
 *   4. Inserts a new <url> entry for any blog post not yet in the sitemap.
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
if (newEntries.length > 0) {
  updated = updated.replace("</urlset>", newEntries.join("\n") + "\n</urlset>");
}

writeFileSync(SITEMAP_PATH, updated, "utf-8");

console.log(
  `[update-sitemap] ✓ sitemap.xml updated — ${blogDates.size} blog post(s) processed` +
    (newEntries.length > 0 ? `, ${newEntries.length} new entry added` : "") +
    (removedCount > 0 ? `, ${removedCount} stale entry removed` : "")
);
