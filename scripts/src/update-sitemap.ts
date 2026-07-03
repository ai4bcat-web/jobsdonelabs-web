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
import { collapseBlankLines, findUnregisteredSitemapUrls } from "./sitemap-utils.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");

const DEFAULT_SITEMAP_PATH = join(
  REPO_ROOT,
  "artifacts/landing-page/public/sitemap.xml"
);
const DEFAULT_PUBLIC_DIR = join(REPO_ROOT, "artifacts/landing-page/public");
const DEFAULT_BASE_URL = "https://www.jobsdonelabs.ai";

/**
 * Override metadata for pages whose HTML lives outside public/.
 * Auto-discovery covers everything inside public/; only add an entry here
 * when the HTML file is at a non-canonical location (e.g. the homepage).
 */
const DEFAULT_NON_BLOG_PAGE_OVERRIDES: Record<string, { file: string }> = {
  [`${DEFAULT_BASE_URL}/`]: {
    file: "artifacts/landing-page/index.html",
  },
};

export interface UpdateSitemapOptions {
  sitemapPath: string;
  publicDir: string;
  baseUrl: string;
  /**
   * Map of canonical URL → absolute file path for pages whose HTML lives
   * outside `publicDir` (e.g. the site root `index.html`).
   * When omitted, no overrides are applied.
   */
  nonBlogPageOverrides?: Record<string, { file: string }>;
  /**
   * Root directory used to compute relative file paths in log output.
   * Defaults to the repo root when not supplied.
   */
  repoRoot?: string;
}

function discoverNonBlogPages(
  publicDir: string,
  blogDir: string,
  baseUrl: string,
  repoRoot: string
): Array<{ url: string; file: string }> {
  const pages: Array<{ url: string; file: string }> = [];

  function walk(dir: string): void {
    const entries = readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (dir === blogDir) continue;
        walk(join(dir, entry.name));
      } else if (entry.name === "index.html") {
        const absPath = join(dir, "index.html");
        const relToPublic = dir.slice(publicDir.length);
        const urlPath = relToPublic ? `${relToPublic}/` : "/";
        const url = `${baseUrl}${urlPath}`;
        const fileRelToRepo = absPath.slice(repoRoot.length + 1);
        pages.push({ url, file: fileRelToRepo });
      }
    }
  }

  walk(publicDir);
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

/**
 * Core update logic — extracted so integration tests can inject fixture paths
 * without touching the real sitemap or blog directory.
 */
export function runUpdateSitemap(opts: UpdateSitemapOptions): void {
  const {
    sitemapPath,
    publicDir,
    baseUrl,
    nonBlogPageOverrides = {},
    repoRoot = REPO_ROOT,
  } = opts;

  const blogDir = join(publicDir, "blog");

  const slugs = readdirSync(blogDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const blogDates = new Map<string, string>();
  for (const slug of slugs) {
    const htmlPath = join(blogDir, slug, "index.html");
    const html = readFileSync(htmlPath, "utf-8");
    blogDates.set(slug, extractDate(html, htmlPath));
    console.log(`[update-sitemap]   ${slug}: ${blogDates.get(slug)}`);
  }

  const discoveredPages = discoverNonBlogPages(publicDir, blogDir, baseUrl, repoRoot);

  const allNonBlogFiles = new Map<string, string>();

  for (const { url, file } of discoveredPages) {
    const override = nonBlogPageOverrides[url];
    allNonBlogFiles.set(url, override?.file ?? file);
  }

  for (const [url, meta] of Object.entries(nonBlogPageOverrides)) {
    if (!allNonBlogFiles.has(url)) {
      allNonBlogFiles.set(url, meta.file);
    }
  }

  const sitemap = readFileSync(sitemapPath, "utf-8");

  const parts = sitemap.split(/(<url>[\s\S]*?<\/url>)/g);

  const existingSlugs = new Set<string>();
  let removedCount = 0;

  const BLOG_POST_LOC_RE = new RegExp(
    `<loc>${baseUrl.replace(/\./g, "\\.")}/blog/([^/]+)/</loc>`
  );

  const nonBlogDates = new Map<string, string>();
  for (const [url, file] of allNonBlogFiles) {
    const filePath = file.startsWith("/") ? file : join(repoRoot, file);
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
        existingSlugs.add(slugInSitemap);
        const loc = `${baseUrl}/blog/${slugInSitemap}/`;
        parts[i] = setLastmod(part, loc, blogDates.get(slugInSitemap)!);
      } else {
        console.log(`[update-sitemap]   removing stale entry: /blog/${slugInSitemap}/`);
        parts[i] = "";
        removedCount++;
      }
      continue;
    }

    for (const [url, date] of nonBlogDates) {
      if (part.includes(`<loc>${url}</loc>`)) {
        parts[i] = setLastmod(part, url, date);
        break;
      }
    }
  }

  for (const loc of findUnregisteredSitemapUrls(sitemap, nonBlogDates, baseUrl)) {
    console.warn(
      `[update-sitemap] ⚠ WARNING: sitemap URL not found on disk — lastmod will not be updated: ${loc}`
    );
  }

  const newEntries: string[] = [];

  // Auto-insert any blog post not yet in the sitemap.
  for (const [slug, date] of blogDates) {
    if (!existingSlugs.has(slug)) {
      const loc = `${baseUrl}/blog/${slug}/`;
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

  // Auto-insert any discovered non-blog page that is not yet in the sitemap.
  // This ensures that when a new page lands in public/ via a GitHub push it
  // gets a sitemap entry immediately rather than causing validateSitemap to
  // throw with an unhelpful "missing" error.
  const currentXml = parts.join("");
  for (const [url, date] of nonBlogDates) {
    if (!currentXml.includes(`<loc>${url}</loc>`)) {
      console.log(`[update-sitemap]   adding new non-blog page: ${url}`);
      newEntries.push(
        [
          "  <url>",
          `    <loc>${url}</loc>`,
          `    <lastmod>${date}</lastmod>`,
          "    <changefreq>monthly</changefreq>",
          "    <priority>0.6</priority>",
          "  </url>",
        ].join("\n")
      );
    }
  }

  let updated = collapseBlankLines(currentXml);
  if (newEntries.length > 0) {
    updated = updated.replace("</urlset>", newEntries.join("\n") + "\n</urlset>");
  }

  validateSitemap(updated, nonBlogDates, blogDates, baseUrl);

  writeFileSync(sitemapPath, updated, "utf-8");

  console.log(
    `[update-sitemap] ✓ sitemap.xml updated — ${blogDates.size} blog post(s) and ${nonBlogDates.size} non-blog page(s) processed` +
      (newEntries.length > 0 ? `, ${newEntries.length} new entry added` : "") +
      (removedCount > 0 ? `, ${removedCount} stale entry removed` : "")
  );
}

runUpdateSitemap({
  sitemapPath: DEFAULT_SITEMAP_PATH,
  publicDir: DEFAULT_PUBLIC_DIR,
  baseUrl: DEFAULT_BASE_URL,
  nonBlogPageOverrides: DEFAULT_NON_BLOG_PAGE_OVERRIDES,
  repoRoot: REPO_ROOT,
});
