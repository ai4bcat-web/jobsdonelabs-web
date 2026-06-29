/**
 * Injects og:image:width, og:image:height, and og:image:type tags into blog
 * post HTML files that have an og:image tag but are missing the dimension tags.
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run inject-og-dimensions
 *
 * Integrated into post-merge.sh so new posts shipped via GitHub automatically
 * get the correct OG image dimension metadata on the next sync.
 *
 * Standard OG image dimensions: 1200 × 630 px PNG.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const BLOG_DIR = join(REPO_ROOT, "artifacts/landing-page/public/blog");

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_TYPE = "image/png";

const OG_IMAGE_PATTERN =
  /(<meta\s+property="og:image"\s+content="[^"]*"\s*\/>)/i;

const DIMENSION_TAGS = [
  `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
  `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
  `<meta property="og:image:type" content="${OG_IMAGE_TYPE}" />`,
];

function hasDimensionTags(html: string): boolean {
  return (
    /<meta\s+property="og:image:width"/i.test(html) &&
    /<meta\s+property="og:image:height"/i.test(html) &&
    /<meta\s+property="og:image:type"/i.test(html)
  );
}

function injectDimensions(html: string): string {
  return html.replace(OG_IMAGE_PATTERN, (_match, ogImageTag) => {
    return [ogImageTag, ...DIMENSION_TAGS].join("\n  ");
  });
}

const slugs = readdirSync(BLOG_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let injected = 0;
let skipped = 0;

for (const slug of slugs) {
  const filePath = join(BLOG_DIR, slug, "index.html");
  const html = readFileSync(filePath, "utf-8");

  if (!OG_IMAGE_PATTERN.test(html)) {
    console.log(`[inject-og-dimensions] skip  blog/${slug}  (no og:image tag)`);
    skipped++;
    continue;
  }

  if (hasDimensionTags(html)) {
    console.log(
      `[inject-og-dimensions] ok    blog/${slug}  (dimension tags already present)`,
    );
    skipped++;
    continue;
  }

  const updated = injectDimensions(html);
  writeFileSync(filePath, updated, "utf-8");
  console.log(`[inject-og-dimensions] fixed blog/${slug}`);
  injected++;
}

console.log(
  `\n[inject-og-dimensions] Done — ${injected} file(s) updated, ${skipped} skipped.`,
);
