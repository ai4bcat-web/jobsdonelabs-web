import { describe, it, expect } from "vitest";
import {
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import {
  hasDimensionTags,
  injectDimensions,
  injectIntoDir,
  runInjectOgDimensions,
  OG_IMAGE_WIDTH,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_TYPE,
} from "./inject-og-dimensions.js";

// ---------------------------------------------------------------------------
// Unit helpers
// ---------------------------------------------------------------------------

function htmlWithOgImage(extraMeta = ""): string {
  return [
    `<html><head>`,
    `  <meta property="og:title" content="Test" />`,
    `  <meta property="og:image" content="https://example.com/og.png" />`,
    extraMeta,
    `</head><body></body></html>`,
  ].join("\n");
}

function htmlWithoutOgImage(): string {
  return `<html><head><title>No OG image</title></head><body></body></html>`;
}

function htmlWithDimensions(): string {
  return [
    `<html><head>`,
    `  <meta property="og:image" content="https://example.com/og.png" />`,
    `  <meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    `  <meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    `  <meta property="og:image:type" content="${OG_IMAGE_TYPE}" />`,
    `</head><body></body></html>`,
  ].join("\n");
}

// ---------------------------------------------------------------------------
// hasDimensionTags
// ---------------------------------------------------------------------------

describe("hasDimensionTags", () => {
  it("returns false when all three dimension tags are absent", () => {
    expect(hasDimensionTags(htmlWithOgImage())).toBe(false);
  });

  it("returns false when only width tag is present", () => {
    const html = htmlWithOgImage(
      `  <meta property="og:image:width" content="1200" />`,
    );
    expect(hasDimensionTags(html)).toBe(false);
  });

  it("returns true when all three dimension tags are present", () => {
    expect(hasDimensionTags(htmlWithDimensions())).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// injectDimensions
// ---------------------------------------------------------------------------

describe("injectDimensions", () => {
  it("inserts width, height, and type tags immediately after og:image", () => {
    const result = injectDimensions(htmlWithOgImage());
    expect(result).toContain(
      `<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`,
    );
    expect(result).toContain(
      `<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`,
    );
    expect(result).toContain(
      `<meta property="og:image:type" content="${OG_IMAGE_TYPE}" />`,
    );
  });

  it("places the dimension tags on separate lines after og:image", () => {
    const result = injectDimensions(htmlWithOgImage());
    const ogImageIdx = result.indexOf(`property="og:image"`);
    const widthIdx = result.indexOf(`property="og:image:width"`);
    expect(widthIdx).toBeGreaterThan(ogImageIdx);
  });

  it("preserves the original og:image tag", () => {
    const html = htmlWithOgImage();
    const result = injectDimensions(html);
    expect(result).toContain(`property="og:image" content="https://example.com/og.png"`);
  });

  it("preserves surrounding HTML unchanged", () => {
    const result = injectDimensions(htmlWithOgImage());
    expect(result).toContain(`<meta property="og:title" content="Test" />`);
    expect(result).toContain(`</html>`);
  });
});

// ---------------------------------------------------------------------------
// injectIntoDir — file-system integration
// ---------------------------------------------------------------------------

describe("injectIntoDir", () => {
  let tmpDir: string;

  function setup(): string {
    tmpDir = mkdtempSync(join(tmpdir(), "og-dim-test-"));
    return tmpDir;
  }

  function teardown() {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  }

  it("injects dimension tags into a fresh post that is missing them", () => {
    const dir = setup();
    try {
      const slug = "new-post";
      mkdirSync(join(dir, slug));
      writeFileSync(join(dir, slug, "index.html"), htmlWithOgImage());

      injectIntoDir(dir, "blog");

      const result = readFileSync(join(dir, slug, "index.html"), "utf-8");
      expect(hasDimensionTags(result)).toBe(true);
    } finally {
      teardown();
    }
  });

  it("skips a file that already has all three dimension tags", () => {
    const dir = setup();
    try {
      const slug = "already-done";
      mkdirSync(join(dir, slug));
      const original = htmlWithDimensions();
      writeFileSync(join(dir, slug, "index.html"), original);

      const { skipped, injected } = injectIntoDir(dir, "blog");

      expect(injected).toBe(0);
      expect(skipped).toBe(1);
      const result = readFileSync(join(dir, slug, "index.html"), "utf-8");
      expect(result).toBe(original);
    } finally {
      teardown();
    }
  });

  it("skips a file that has no og:image tag at all", () => {
    const dir = setup();
    try {
      const slug = "no-og";
      mkdirSync(join(dir, slug));
      const original = htmlWithoutOgImage();
      writeFileSync(join(dir, slug, "index.html"), original);

      const { skipped, injected } = injectIntoDir(dir, "blog");

      expect(injected).toBe(0);
      expect(skipped).toBe(1);
      const result = readFileSync(join(dir, slug, "index.html"), "utf-8");
      expect(result).toBe(original);
    } finally {
      teardown();
    }
  });

  it("returns { injected: 0, skipped: 0 } when the directory does not exist", () => {
    const result = injectIntoDir("/nonexistent-path-abc123", "test");
    expect(result).toEqual({ injected: 0, skipped: 0 });
  });

  it("processes multiple slugs independently, injecting only those that need it", () => {
    const dir = setup();
    try {
      mkdirSync(join(dir, "needs-injection"));
      mkdirSync(join(dir, "already-has-it"));
      mkdirSync(join(dir, "no-og-tag"));

      writeFileSync(join(dir, "needs-injection", "index.html"), htmlWithOgImage());
      writeFileSync(join(dir, "already-has-it", "index.html"), htmlWithDimensions());
      writeFileSync(join(dir, "no-og-tag", "index.html"), htmlWithoutOgImage());

      const { injected, skipped } = injectIntoDir(dir, "blog");

      expect(injected).toBe(1);
      expect(skipped).toBe(2);

      expect(hasDimensionTags(readFileSync(join(dir, "needs-injection", "index.html"), "utf-8"))).toBe(true);
      expect(readFileSync(join(dir, "already-has-it", "index.html"), "utf-8")).toBe(htmlWithDimensions());
      expect(readFileSync(join(dir, "no-og-tag", "index.html"), "utf-8")).toBe(htmlWithoutOgImage());
    } finally {
      teardown();
    }
  });
});

// ---------------------------------------------------------------------------
// runInjectOgDimensions — end-to-end: simulates a fresh GitHub post arriving
// ---------------------------------------------------------------------------

describe("runInjectOgDimensions — end-to-end injection across content dirs", () => {
  let tmpDir: string;

  function setup(): { blogDir: string; aboutDir: string; caseStudyDir: string } {
    tmpDir = mkdtempSync(join(tmpdir(), "og-dim-e2e-"));
    const blogDir = join(tmpDir, "blog");
    const aboutDir = join(tmpDir, "about");
    const caseStudyDir = join(tmpDir, "case-study");
    mkdirSync(blogDir, { recursive: true });
    mkdirSync(aboutDir, { recursive: true });
    mkdirSync(caseStudyDir, { recursive: true });
    return { blogDir, aboutDir, caseStudyDir };
  }

  function teardown() {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  }

  it("injects dimension tags into a fresh blog post arriving via GitHub sync", () => {
    const { blogDir, aboutDir, caseStudyDir } = setup();
    try {
      mkdirSync(join(blogDir, "fresh-post"));
      writeFileSync(join(blogDir, "fresh-post", "index.html"), htmlWithOgImage());

      runInjectOgDimensions({ blog: blogDir, about: aboutDir, "case-study": caseStudyDir });

      const result = readFileSync(join(blogDir, "fresh-post", "index.html"), "utf-8");
      expect(hasDimensionTags(result)).toBe(true);
      expect(result).toContain(`<meta property="og:image:width" content="${OG_IMAGE_WIDTH}" />`);
      expect(result).toContain(`<meta property="og:image:height" content="${OG_IMAGE_HEIGHT}" />`);
    } finally {
      teardown();
    }
  });

  it("injects dimension tags into about/ and case-study/ pages too (Task #46)", () => {
    const { blogDir, aboutDir, caseStudyDir } = setup();
    try {
      mkdirSync(join(aboutDir, "founder"));
      mkdirSync(join(caseStudyDir, "logistics-win"));
      writeFileSync(join(aboutDir, "founder", "index.html"), htmlWithOgImage());
      writeFileSync(join(caseStudyDir, "logistics-win", "index.html"), htmlWithOgImage());

      runInjectOgDimensions({ blog: blogDir, about: aboutDir, "case-study": caseStudyDir });

      expect(hasDimensionTags(readFileSync(join(aboutDir, "founder", "index.html"), "utf-8"))).toBe(true);
      expect(hasDimensionTags(readFileSync(join(caseStudyDir, "logistics-win", "index.html"), "utf-8"))).toBe(true);
    } finally {
      teardown();
    }
  });

  it("returns correct total counts across all directories", () => {
    const { blogDir, aboutDir, caseStudyDir } = setup();
    try {
      mkdirSync(join(blogDir, "b1"));
      mkdirSync(join(aboutDir, "a1"));
      mkdirSync(join(caseStudyDir, "c1"));
      writeFileSync(join(blogDir, "b1", "index.html"), htmlWithOgImage());
      writeFileSync(join(aboutDir, "a1", "index.html"), htmlWithDimensions());
      writeFileSync(join(caseStudyDir, "c1", "index.html"), htmlWithOgImage());

      const { injected, skipped } = runInjectOgDimensions({
        blog: blogDir,
        about: aboutDir,
        "case-study": caseStudyDir,
      });

      expect(injected).toBe(2);
      expect(skipped).toBe(1);
    } finally {
      teardown();
    }
  });

  it("is idempotent — running twice produces no additional changes", () => {
    const { blogDir, aboutDir, caseStudyDir } = setup();
    try {
      mkdirSync(join(blogDir, "idempotent-post"));
      writeFileSync(join(blogDir, "idempotent-post", "index.html"), htmlWithOgImage());

      runInjectOgDimensions({ blog: blogDir, about: aboutDir, "case-study": caseStudyDir });
      const afterFirst = readFileSync(join(blogDir, "idempotent-post", "index.html"), "utf-8");

      const { injected } = runInjectOgDimensions({ blog: blogDir, about: aboutDir, "case-study": caseStudyDir });
      const afterSecond = readFileSync(join(blogDir, "idempotent-post", "index.html"), "utf-8");

      expect(injected).toBe(0);
      expect(afterSecond).toBe(afterFirst);
    } finally {
      teardown();
    }
  });
});
