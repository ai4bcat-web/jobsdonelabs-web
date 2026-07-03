/**
 * Injects og:image:width, og:image:height, and og:image:type tags into HTML
 * files that have an og:image tag but are missing the dimension tags.
 *
 * Covers blog/, about/, and case-study/ subdirectories so every content page
 * gets full social-preview metadata — not just blog posts.
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run inject-og-dimensions
 *
 * Integrated into post-merge.sh so new posts and pages shipped via GitHub
 * automatically get the correct OG image dimension metadata on the next sync.
 *
 * Standard OG image dimensions: 1200 × 630 px PNG.
 */

import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const PUBLIC_DIR = join(REPO_ROOT, "artifacts/landing-page/public");

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
export const OG_IMAGE_TYPE = "image/png";

const OG_IMAGE_PATTERN =
  /(<meta\s+property="og:image"\s+content="[^"]*"\s*\/>)/i;

const DIMENSION_TAGS = [
  `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
  `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
  `<meta property="og:image:type" content="${OG_IMAGE_TYPE}" />`,
];

export function hasDimensionTags(html: string): boolean {
  return (
    /<meta\s+property="og:image:width"/i.test(html) &&
    /<meta\s+property="og:image:height"/i.test(html) &&
    /<meta\s+property="og:image:type"/i.test(html)
  );
}

export function injectDimensions(html: string): string {
  return html.replace(OG_IMAGE_PATTERN, (_match, ogImageTag) => {
    return [ogImageTag, ...DIMENSION_TAGS].join("\n  ");
  });
}

/**
 * Scan `dir` for immediate subdirectories each containing an `index.html`,
 * inject OG dimension tags into any that are missing them, and return counts.
 *
 * @param dir    Absolute path to the directory to scan.
 * @param label  Short label used in log output (e.g. "blog", "about").
 * @returns      `{ injected, skipped }` counts.
 */
export function injectIntoDir(
  dir: string,
  label: string,
): { injected: number; skipped: number } {
  if (!existsSync(dir)) {
    return { injected: 0, skipped: 0 };
  }

  const slugs = readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let injected = 0;
  let skipped = 0;

  for (const slug of slugs) {
    const filePath = join(dir, slug, "index.html");
    if (!existsSync(filePath)) {
      skipped++;
      continue;
    }
    const html = readFileSync(filePath, "utf-8");

    if (!OG_IMAGE_PATTERN.test(html)) {
      console.log(
        `[inject-og-dimensions] skip  ${label}/${slug}  (no og:image tag)`,
      );
      skipped++;
      continue;
    }

    if (hasDimensionTags(html)) {
      console.log(
        `[inject-og-dimensions] ok    ${label}/${slug}  (dimension tags already present)`,
      );
      skipped++;
      continue;
    }

    const updated = injectDimensions(html);
    writeFileSync(filePath, updated, "utf-8");
    console.log(`[inject-og-dimensions] fixed ${label}/${slug}`);
    injected++;
  }

  return { injected, skipped };
}

/**
 * Run dimension-tag injection across all content directories:
 * blog/, about/, and case-study/.
 *
 * @param dirs  Optional override map of label → absolute dir path.
 *              Defaults to the real on-disk directories when not supplied.
 */
export function runInjectOgDimensions(
  dirs: Record<string, string> = {
    blog: join(PUBLIC_DIR, "blog"),
    about: join(PUBLIC_DIR, "about"),
    "case-study": join(PUBLIC_DIR, "case-study"),
  },
): { injected: number; skipped: number } {
  let totalInjected = 0;
  let totalSkipped = 0;

  for (const [label, dir] of Object.entries(dirs)) {
    const { injected, skipped } = injectIntoDir(dir, label);
    totalInjected += injected;
    totalSkipped += skipped;
  }

  console.log(
    `\n[inject-og-dimensions] Done — ${totalInjected} file(s) updated, ${totalSkipped} skipped.`,
  );

  return { injected: totalInjected, skipped: totalSkipped };
}

const isMain =
  process.argv[1] &&
  (await import("node:url")).fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) runInjectOgDimensions();
