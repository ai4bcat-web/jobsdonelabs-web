/**
 * Generates an OG image (og.png) for one or more blog posts.
 *
 * Usage:
 *   pnpm --filter @workspace/scripts run gen-og <slug>      — generate for a specific post
 *   pnpm --filter @workspace/scripts run gen-og --all       — regenerate for every post
 *   pnpm --filter @workspace/scripts run gen-og --missing   — generate only where og.png is absent
 *
 * Output: artifacts/landing-page/public/blog/<slug>/og.png (1408×768 PNG)
 *
 * Integrated into post-merge.sh (--missing mode) so new posts shipped via
 * GitHub get an OG image automatically on the next sync.
 */

import { readFileSync, readdirSync, existsSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "../..");
const BLOG_DIR = join(REPO_ROOT, "artifacts/landing-page/public/blog");
const FONT_DIR = join(__dirname, "../assets/fonts");

const W = 1408;
const H = 768;
const PAD_X = 72;
const PAD_Y_TOP = 80;

const BRAND_INK = "#171513";
const BRAND_CREAM = "#F4EFE3";
const BRAND_CREAM_DIM = "rgba(244,239,227,0.62)";
const BRAND_ACCENT = "#D34E24";

function extractMeta(html: string): { title: string; description: string } {
  const titleMatch = html.match(
    /<meta\s+property="og:title"\s+content="([^"]*)"/i,
  );
  const descMatch = html.match(
    /<meta\s+property="og:description"\s+content="([^"]*)"/i,
  );
  const title = titleMatch?.[1]?.trim() ?? "Jobs Done Labs";
  const description = descMatch?.[1]?.trim() ?? "";
  return { title, description };
}

function wrapText(text: string, maxChars: number): string[] {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxChars) {
      current = candidate;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

function truncateDescription(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  const cut = text.lastIndexOf(" ", maxChars);
  return cut > 0 ? text.slice(0, cut) + "…" : text.slice(0, maxChars) + "…";
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildSvg(title: string, description: string): string {
  const TITLE_FONT_SIZE = 62;
  const DESC_FONT_SIZE = 28;
  const LABEL_FONT_SIZE = 16;
  const LINE_HEIGHT_TITLE = TITLE_FONT_SIZE * 1.18;

  const maxTitleChars = Math.floor((W - PAD_X * 2) / (TITLE_FONT_SIZE * 0.52));
  const titleLines = wrapText(title, maxTitleChars);

  const reservedForDesc = 120;
  const maxTitleLines = Math.floor(
    (H - PAD_Y_TOP - 40 - reservedForDesc - 56) / LINE_HEIGHT_TITLE,
  );
  const clippedLines = titleLines.slice(0, maxTitleLines);
  if (titleLines.length > maxTitleLines) {
    const last = clippedLines[clippedLines.length - 1];
    if (last) {
      clippedLines[clippedLines.length - 1] =
        last.length > maxTitleChars - 1
          ? last.slice(0, maxTitleChars - 1) + "…"
          : last + "…";
    }
  }

  const totalTitleHeight = clippedLines.length * LINE_HEIGHT_TITLE;
  const contentHeight = totalTitleHeight + (description ? reservedForDesc : 0);
  const startY = (H - contentHeight) / 2 + TITLE_FONT_SIZE * 0.8;

  const titleSvg = clippedLines
    .map(
      (line, i) =>
        `<text x="${PAD_X}" y="${startY + i * LINE_HEIGHT_TITLE}" ` +
        `font-family="Anton" font-size="${TITLE_FONT_SIZE}" ` +
        `fill="${BRAND_CREAM}" xml:space="preserve">${escapeXml(line)}</text>`,
    )
    .join("\n  ");

  const descY =
    startY + clippedLines.length * LINE_HEIGHT_TITLE + DESC_FONT_SIZE + 12;
  const truncDesc = truncateDescription(description, 120);
  const descSvg = description
    ? `<text x="${PAD_X}" y="${descY}" font-family="Hanken Grotesk" font-size="${DESC_FONT_SIZE}" ` +
      `fill="${BRAND_CREAM_DIM}" xml:space="preserve">${escapeXml(truncDesc)}</text>`
    : "";

  const STRIPE_W = 6;
  const ACCENT_OFFSET = 52;
  const accentX = PAD_X;
  const accentY = PAD_Y_TOP - 4;
  const accentH = Math.min(
    totalTitleHeight + TITLE_FONT_SIZE * 0.15,
    H - accentY - 80,
  );

  return `<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <!-- background -->
  <rect width="${W}" height="${H}" fill="${BRAND_INK}"/>

  <!-- decorative grid overlay (very subtle) -->
  <defs>
    <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(244,239,227,0.03)" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>

  <!-- accent vertical stripe -->
  <rect x="${accentX}" y="${accentY}" width="${STRIPE_W}" height="${accentH}" fill="${BRAND_ACCENT}"/>

  <!-- brand label -->
  <text x="${PAD_X + ACCENT_OFFSET}" y="${PAD_Y_TOP}" font-family="Hanken Grotesk" font-weight="bold"
        font-size="${LABEL_FONT_SIZE}" fill="${BRAND_ACCENT}" letter-spacing="3"
        xml:space="preserve">JOBS DONE LABS</text>

  <!-- post title -->
  ${titleSvg}

  <!-- description -->
  ${descSvg}

  <!-- bottom url -->
  <text x="${PAD_X + ACCENT_OFFSET}" y="${H - 34}" font-family="Hanken Grotesk" font-size="18"
        fill="rgba(244,239,227,0.35)" xml:space="preserve">jobsdonelabs.ai</text>
</svg>`;
}

function generateForSlug(slug: string): void {
  const postDir = join(BLOG_DIR, slug);
  const htmlPath = join(postDir, "index.html");
  const outPath = join(postDir, "og.png");

  if (!existsSync(htmlPath)) {
    console.error(`[gen-og] ERROR: no index.html found for slug "${slug}"`);
    process.exit(1);
  }

  const html = readFileSync(htmlPath, "utf-8");
  const { title, description } = extractMeta(html);

  const svg = buildSvg(title, description);

  const fontFiles = [
    join(FONT_DIR, "Anton-Regular.ttf"),
    join(FONT_DIR, "HankenGrotesk-Regular.ttf"),
    join(FONT_DIR, "HankenGrotesk-Bold.ttf"),
    join(FONT_DIR, "DejaVuSans-Bold.ttf"),
    join(FONT_DIR, "DejaVuSans.ttf"),
  ].filter(existsSync);

  const resvg = new Resvg(svg, {
    font: {
      fontFiles,
      loadSystemFonts: false,
      defaultFontFamily: "Anton",
    },
    fitTo: { mode: "width", value: W },
  });

  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  writeFileSync(outPath, pngBuffer);

  console.log(
    `[gen-og] ✓  blog/${slug}/og.png  (${(pngBuffer.length / 1024).toFixed(0)} KB)`,
  );
}

function main(): void {
  const args = process.argv.slice(2);
  const mode = args[0];

  if (!mode) {
    console.error(
      "[gen-og] Usage: gen-og <slug> | gen-og --all | gen-og --missing",
    );
    process.exit(1);
  }

  const allSlugs = readdirSync(BLOG_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  if (mode === "--all") {
    console.log(`[gen-og] Generating OG images for all ${allSlugs.length} posts…`);
    for (const slug of allSlugs) generateForSlug(slug);
  } else if (mode === "--missing") {
    const missing = allSlugs.filter(
      (slug) => !existsSync(join(BLOG_DIR, slug, "og.png")),
    );
    if (missing.length === 0) {
      console.log("[gen-og] All posts already have an og.png — nothing to do.");
      return;
    }
    console.log(`[gen-og] Generating OG images for ${missing.length} post(s) missing og.png…`);
    for (const slug of missing) generateForSlug(slug);
  } else {
    generateForSlug(mode);
  }
}

const isMain =
  process.argv[1] &&
  (await import("node:url")).fileURLToPath(import.meta.url) === process.argv[1];
if (isMain) main();
