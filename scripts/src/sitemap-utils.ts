/**
 * Collapse runs of 3 or more consecutive newlines (with optional horizontal
 * whitespace on blank lines) down to exactly two newlines.
 *
 * This is applied after a <url> block is deleted from the sitemap so the
 * surrounding separator text doesn't leave a visible gap of extra blank lines.
 */
export function collapseBlankLines(xml: string): string {
  return xml.replace(/(\n[ \t]*){3,}/g, "\n\n");
}
