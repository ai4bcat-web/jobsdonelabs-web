/**
 * Collapse runs of 3 or more consecutive newlines (with optional horizontal
 * whitespace on blank lines) down to exactly two newlines.
 *
 * This is applied after a <url> block is deleted from the sitemap so the
 * surrounding separator text doesn't leave a visible gap of extra blank lines.
 */
export function collapseBlankLines(xml: string): string {
  // Match a newline followed by 2+ whitespace-only lines.
  // The outer \n is consumed but the trailing whitespace of the last blank
  // line is NOT captured, so indentation on the very next content line is
  // preserved (unlike the greedy (\n[ \t]*){3,} pattern which would swallow
  // the leading spaces of the following <url> tag).
  return xml.replace(/\n([ \t]*\n){2,}/g, "\n\n");
}

/**
 * Scans the sitemap XML for <url> blocks whose <loc> is neither a known
 * non-blog page nor a blog-post URL under baseUrl/blog/<slug>/.
 *
 * Returns the unrecognised <loc> values so the caller can emit warnings.
 * This is a pure function with no side effects — all I/O happens in the caller.
 *
 * @param xml           Full sitemap XML string.
 * @param knownNonBlog  Map of non-blog page URLs → lastmod strings (keys used only).
 * @param baseUrl       Site root URL (e.g. "https://www.example.com").
 * @returns             Array of <loc> strings that were not recognised.
 */
export function findUnregisteredSitemapUrls(
  xml: string,
  knownNonBlog: Map<string, string>,
  baseUrl: string
): string[] {
  const parts = xml.split(/(<url>[\s\S]*?<\/url>)/g);
  const escapedBase = baseUrl.replace(/\./g, "\\.");
  const BLOG_POST_LOC_RE = new RegExp(
    `<loc>${escapedBase}/blog/([^/]+)/</loc>`
  );

  const unregistered: string[] = [];
  for (const part of parts) {
    if (!part.startsWith("<url>")) continue;

    // Blog-post blocks (including the blog index) are always expected.
    if (BLOG_POST_LOC_RE.test(part)) continue;

    // Check against every known non-blog URL.
    let matched = false;
    for (const url of knownNonBlog.keys()) {
      if (part.includes(`<loc>${url}</loc>`)) {
        matched = true;
        break;
      }
    }

    if (!matched) {
      const locMatch = part.match(/<loc>([^<]+)<\/loc>/);
      if (locMatch) unregistered.push(locMatch[1]);
    }
  }

  return unregistered;
}
