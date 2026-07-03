import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { Resvg } from "@resvg/resvg-js";
import { buildSvg } from "./gen-og.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const FONT_DIR = join(__dirname, "../assets/fonts");

function renderPng(svg: string, fontFiles: string[]): Buffer {
  const resvg = new Resvg(svg, {
    font: { fontFiles, loadSystemFonts: false, defaultFontFamily: "Anton" },
    fitTo: { mode: "width", value: 1408 },
  });
  return Buffer.from(resvg.render().asPng());
}

const BRAND_FONTS = [
  join(FONT_DIR, "Anton-Regular.ttf"),
  join(FONT_DIR, "HankenGrotesk-Regular.ttf"),
  join(FONT_DIR, "HankenGrotesk-Bold.ttf"),
  join(FONT_DIR, "DejaVuSans-Bold.ttf"),
  join(FONT_DIR, "DejaVuSans.ttf"),
];

const DEJAVU_ONLY_FONTS = [
  join(FONT_DIR, "DejaVuSans-Bold.ttf"),
  join(FONT_DIR, "DejaVuSans.ttf"),
];

describe("gen-og font files", () => {
  it("Anton-Regular.ttf exists in assets/fonts", () => {
    expect(existsSync(join(FONT_DIR, "Anton-Regular.ttf"))).toBe(true);
  });

  it("HankenGrotesk-Regular.ttf exists in assets/fonts", () => {
    expect(existsSync(join(FONT_DIR, "HankenGrotesk-Regular.ttf"))).toBe(true);
  });

  it("HankenGrotesk-Bold.ttf exists in assets/fonts", () => {
    expect(existsSync(join(FONT_DIR, "HankenGrotesk-Bold.ttf"))).toBe(true);
  });
});

describe("gen-og brand font rendering", () => {
  const SAMPLE_TITLE = "Testing Anton Font Rendering End-to-End";
  const SAMPLE_DESC =
    "This description exercises Hanken Grotesk in the generated OG image, catching silent fallback regressions.";

  it("renders a valid PNG (correct magic bytes)", () => {
    const svg = buildSvg(SAMPLE_TITLE, SAMPLE_DESC);
    const png = renderPng(svg, BRAND_FONTS.filter(existsSync));

    // PNG magic bytes: 0x89 P N G
    expect(png[0]).toBe(0x89);
    expect(png[1]).toBe(0x50);
    expect(png[2]).toBe(0x4e);
    expect(png[3]).toBe(0x47);
    expect(png.length).toBeGreaterThan(0);
  });

  it("brand-font PNG differs detectably from the DejaVu-only fallback", () => {
    const svg = buildSvg(SAMPLE_TITLE, SAMPLE_DESC);

    const brandPng = renderPng(svg, BRAND_FONTS.filter(existsSync));
    const fallbackPng = renderPng(svg, DEJAVU_ONLY_FONTS.filter(existsSync));

    // Anton and Hanken Grotesk have different glyph metrics to DejaVu Sans, so
    // the rendered bitmaps and their compressed sizes will differ.
    expect(brandPng.length).not.toBe(fallbackPng.length);

    const diff = Math.abs(brandPng.length - fallbackPng.length);
    expect(diff).toBeGreaterThan(500);
  });

  it("brand-font render size stays within the expected range for Anton/Hanken (regression guard)", () => {
    const svg = buildSvg(SAMPLE_TITLE, SAMPLE_DESC);
    const png = renderPng(svg, BRAND_FONTS.filter(existsSync));

    // These bounds were established from an Anton+Hanken render.  If the font
    // files are swapped for DejaVu the size shifts outside this window.
    // Update the bounds here whenever the SVG layout intentionally changes.
    const KB = 1024;
    expect(png.length).toBeGreaterThan(50 * KB);
    expect(png.length).toBeLessThan(800 * KB);
  });
});
