/**
 * Validates a final sitemap XML string against four invariants.
 * Extracted into its own module so it can be unit-tested independently of the
 * file-system and network side-effects in update-sitemap.ts.
 *
 * Checks performed:
 *  1. The document is at least minimally well-formed XML (urlset wrapper present).
 *  2. Every non-blog page URL is still present.
 *  3. Every blog entry has a <lastmod> in YYYY-MM-DD format.
 *  4. No <loc> value appears more than once (no duplicates).
 *
 * @param xml           The full sitemap XML string to validate.
 * @param expectedNonBlog  Map of non-blog page URLs → lastmod date strings.
 * @param expectedBlog     Map of blog post slugs → lastmod date strings.
 * @param baseUrl       The site root URL (e.g. "https://www.example.com").
 *                      Controls the regex used to identify blog-post <url> blocks.
 */
export function validateSitemap(
  xml: string,
  expectedNonBlog: Map<string, string>,
  expectedBlog: Map<string, string>,
  baseUrl: string
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
  const escapedBase = baseUrl.replace(/\./g, "\\.");
  const BLOG_POST_LOC_RE = new RegExp(
    `<loc>${escapedBase}/blog/([^/]+)/</loc>`
  );
  for (const block of urlBlocks) {
    const blogMatch = block.match(BLOG_POST_LOC_RE);
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
