import { describe, it, expect, vi, afterEach } from "vitest";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { validateSitemap } from "./sitemap-validator.js";
import { collapseBlankLines, findUnregisteredSitemapUrls } from "./sitemap-utils.js";
import { runUpdateSitemap } from "./update-sitemap.js";

const BASE = "https://www.example.com";

function makeNonBlog(...urls: string[]): Map<string, string> {
  return new Map(urls.map((u) => [u, "2024-01-01"]));
}

function makeBlog(...slugs: string[]): Map<string, string> {
  return new Map(slugs.map((s) => [s, "2024-01-01"]));
}

function urlBlock(loc: string, lastmod?: string): string {
  return [
    "  <url>",
    `    <loc>${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

function sitemap(...blocks: string[]): string {
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...blocks,
    `</urlset>`,
  ].join("\n");
}

describe("validateSitemap — check 1: urlset well-formedness", () => {
  it("passes when urlset is present and properly closed", () => {
    const xml = sitemap(urlBlock(`${BASE}/`));
    expect(() =>
      validateSitemap(xml, makeNonBlog(`${BASE}/`), makeBlog(), BASE)
    ).not.toThrow();
  });

  it("throws when <urlset> opening tag is missing", () => {
    const xml = [
      `<?xml version="1.0"?>`,
      urlBlock(`${BASE}/`),
      `</urlset>`,
    ].join("\n");
    expect(() =>
      validateSitemap(xml, makeNonBlog(`${BASE}/`), makeBlog(), BASE)
    ).toThrow(/missing a valid <urlset>/);
  });

  it("throws when </urlset> closing tag is missing", () => {
    const xml = [
      `<?xml version="1.0"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      urlBlock(`${BASE}/`),
    ].join("\n");
    expect(() =>
      validateSitemap(xml, makeNonBlog(`${BASE}/`), makeBlog(), BASE)
    ).toThrow(/missing a valid <urlset>/);
  });
});

describe("validateSitemap — check 2: non-blog URLs present", () => {
  it("passes when all expected non-blog URLs are in the XML", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/`),
      urlBlock(`${BASE}/about/`)
    );
    expect(() =>
      validateSitemap(
        xml,
        makeNonBlog(`${BASE}/`, `${BASE}/about/`),
        makeBlog(),
        BASE
      )
    ).not.toThrow();
  });

  it("throws when a non-blog URL is absent from the XML", () => {
    const xml = sitemap(urlBlock(`${BASE}/`));
    expect(() =>
      validateSitemap(
        xml,
        makeNonBlog(`${BASE}/`, `${BASE}/missing-page/`),
        makeBlog(),
        BASE
      )
    ).toThrow(/Non-blog entry missing from sitemap.*missing-page/);
  });

  it("throws for each missing non-blog URL (multiple errors collected)", () => {
    const xml = sitemap();
    let err: Error | undefined;
    try {
      validateSitemap(
        xml,
        makeNonBlog(`${BASE}/page-a/`, `${BASE}/page-b/`),
        makeBlog(),
        BASE
      );
    } catch (e) {
      err = e as Error;
    }
    expect(err?.message).toMatch(/page-a/);
    expect(err?.message).toMatch(/page-b/);
  });
});

describe("validateSitemap — check 3: blog entries have valid <lastmod>", () => {
  it("passes when every blog post has a YYYY-MM-DD lastmod", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/blog/hello-world/`, "2024-06-01"),
      urlBlock(`${BASE}/blog/another-post/`, "2024-07-15")
    );
    expect(() =>
      validateSitemap(xml, makeNonBlog(), makeBlog("hello-world", "another-post"), BASE)
    ).not.toThrow();
  });

  it("throws when a blog post is missing <lastmod> entirely", () => {
    const xml = sitemap(urlBlock(`${BASE}/blog/no-date/`));
    expect(() =>
      validateSitemap(xml, makeNonBlog(), makeBlog("no-date"), BASE)
    ).toThrow(/no-date.*missing a valid <lastmod>/);
  });

  it("throws when <lastmod> has an invalid format (not YYYY-MM-DD)", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/blog/bad-date/`, "June 1, 2024")
    );
    expect(() =>
      validateSitemap(xml, makeNonBlog(), makeBlog("bad-date"), BASE)
    ).toThrow(/bad-date.*missing a valid <lastmod>/);
  });

  it("does not require <lastmod> on the blog index URL itself", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/blog/`),
      urlBlock(`${BASE}/blog/real-post/`, "2024-01-01")
    );
    expect(() =>
      validateSitemap(xml, makeNonBlog(`${BASE}/blog/`), makeBlog("real-post"), BASE)
    ).not.toThrow();
  });
});

describe("validateSitemap — check 4: no duplicate <loc> values", () => {
  it("passes when all <loc> values are unique", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/`),
      urlBlock(`${BASE}/blog/`),
      urlBlock(`${BASE}/blog/post-a/`, "2024-01-01")
    );
    expect(() =>
      validateSitemap(
        xml,
        makeNonBlog(`${BASE}/`, `${BASE}/blog/`),
        makeBlog("post-a"),
        BASE
      )
    ).not.toThrow();
  });

  it("throws when the same <loc> appears twice", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/blog/dup-post/`, "2024-01-01"),
      urlBlock(`${BASE}/blog/dup-post/`, "2024-02-01")
    );
    expect(() =>
      validateSitemap(xml, makeNonBlog(), makeBlog("dup-post"), BASE)
    ).toThrow(/Duplicate <loc>.*dup-post/);
  });

  it("reports the specific duplicated URL in the error message", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/page/`, "2024-01-01"),
      urlBlock(`${BASE}/page/`, "2024-01-01")
    );
    let err: Error | undefined;
    try {
      validateSitemap(xml, makeNonBlog(`${BASE}/page/`), makeBlog(), BASE);
    } catch (e) {
      err = e as Error;
    }
    expect(err?.message).toMatch(`${BASE}/page/`);
  });
});

describe("validateSitemap — multiple simultaneous failures", () => {
  it("collects all errors before throwing rather than short-circuiting", () => {
    const badXml = [
      `<?xml version="1.0"?>`,
      urlBlock(`${BASE}/blog/no-lastmod/`),
      urlBlock(`${BASE}/blog/no-lastmod/`),
    ].join("\n");

    let err: Error | undefined;
    try {
      validateSitemap(
        badXml,
        makeNonBlog(`${BASE}/missing/`),
        makeBlog("no-lastmod"),
        BASE
      );
    } catch (e) {
      err = e as Error;
    }

    expect(err).toBeDefined();
    expect(err?.message).toMatch(/missing a valid <urlset>/);
    expect(err?.message).toMatch(/missing-page|missing/i);
    expect(err?.message).toMatch(/no-lastmod.*missing a valid <lastmod>/);
    expect(err?.message).toMatch(/Duplicate <loc>/);
  });
});

// ---------------------------------------------------------------------------
// findUnregisteredSitemapUrls — detection of unknown sitemap pages
// ---------------------------------------------------------------------------

describe("findUnregisteredSitemapUrls — unregistered page detection", () => {
  it("returns an empty array when every non-blog URL is known", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/`),
      urlBlock(`${BASE}/about/`)
    );
    const knownNonBlog = makeNonBlog(`${BASE}/`, `${BASE}/about/`);
    expect(findUnregisteredSitemapUrls(xml, knownNonBlog, BASE)).toEqual([]);
  });

  it("returns the URL when the sitemap contains a page not in knownNonBlog", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/`),
      urlBlock(`${BASE}/ghost-page/`)
    );
    const knownNonBlog = makeNonBlog(`${BASE}/`);
    const result = findUnregisteredSitemapUrls(xml, knownNonBlog, BASE);
    expect(result).toContain(`${BASE}/ghost-page/`);
    expect(result).toHaveLength(1);
  });

  it("returns all unknown URLs when multiple unregistered pages are present", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/`),
      urlBlock(`${BASE}/unknown-a/`),
      urlBlock(`${BASE}/unknown-b/`)
    );
    const knownNonBlog = makeNonBlog(`${BASE}/`);
    const result = findUnregisteredSitemapUrls(xml, knownNonBlog, BASE);
    expect(result).toContain(`${BASE}/unknown-a/`);
    expect(result).toContain(`${BASE}/unknown-b/`);
    expect(result).toHaveLength(2);
  });

  it("does not flag blog-post URLs as unregistered", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/`),
      urlBlock(`${BASE}/blog/hello-world/`, "2024-01-01"),
      urlBlock(`${BASE}/blog/another-post/`, "2024-06-15")
    );
    const knownNonBlog = makeNonBlog(`${BASE}/`);
    expect(findUnregisteredSitemapUrls(xml, knownNonBlog, BASE)).toEqual([]);
  });

  it("does not flag the blog index URL (/blog/) as unregistered when it is known", () => {
    const xml = sitemap(
      urlBlock(`${BASE}/blog/`),
      urlBlock(`${BASE}/blog/post-one/`, "2024-01-01")
    );
    const knownNonBlog = makeNonBlog(`${BASE}/blog/`);
    expect(findUnregisteredSitemapUrls(xml, knownNonBlog, BASE)).toEqual([]);
  });

  it("emits a console.warn for each URL returned (integration check)", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    try {
      const xml = sitemap(
        urlBlock(`${BASE}/`),
        urlBlock(`${BASE}/unlisted-page/`)
      );
      const knownNonBlog = makeNonBlog(`${BASE}/`);
      const unregistered = findUnregisteredSitemapUrls(xml, knownNonBlog, BASE);
      for (const loc of unregistered) {
        console.warn(`[update-sitemap] ⚠ WARNING: sitemap URL not found on disk — lastmod will not be updated: ${loc}`);
      }
      expect(warnSpy).toHaveBeenCalledOnce();
      expect(warnSpy.mock.calls[0][0]).toContain("unlisted-page");
    } finally {
      warnSpy.mockRestore();
    }
  });
});

// ---------------------------------------------------------------------------
// collapseBlankLines — blank-line cleanup after a <url> block is removed
// ---------------------------------------------------------------------------

/**
 * Simulates what update-sitemap.ts does when it removes a <url> block:
 *   parts[i] = ""  →  parts.join("")  →  collapseBlankLines(…)
 *
 * The sitemap helper here produces the same separator style the real file
 * uses (one blank line between blocks), so we can verify the full round-trip.
 */
function joinAndCollapse(...parts: string[]): string {
  return collapseBlankLines(parts.join(""));
}

describe("collapseBlankLines — blank-line cleanup after entry removal", () => {
  it("removes extra blank lines when the middle entry is deleted", () => {
    const before = "\n\n  <url>\n    <loc>https://x.com/a/</loc>\n  </url>\n\n";
    const deleted = "";
    const after = "\n\n  <url>\n    <loc>https://x.com/c/</loc>\n  </url>\n\n";

    const result = joinAndCollapse(before, deleted, after);

    const consecutive = result.match(/\n(\s*\n)+/g) ?? [];
    const maxRun = Math.max(...consecutive.map((s) => (s.match(/\n/g) ?? []).length));
    expect(maxRun).toBeLessThanOrEqual(2);
  });

  it("does not produce 3+ consecutive newlines anywhere in the output", () => {
    const blocks = [
      "\n\n  <url>\n    <loc>https://x.com/1/</loc>\n  </url>\n\n",
      "",
      "\n\n  <url>\n    <loc>https://x.com/2/</loc>\n  </url>\n\n",
      "",
      "\n\n  <url>\n    <loc>https://x.com/3/</loc>\n  </url>\n\n",
    ];

    const result = collapseBlankLines(blocks.join(""));

    expect(result).not.toMatch(/\n\n\n/);
  });

  it("preserves the loc URLs of non-removed entries after cleanup", () => {
    // Simulate the real split/join structure: the whitespace lives in the
    // separator parts (not attached to the <url> blocks themselves), which
    // is exactly what sitemap.split(/(<url>[\s\S]*?<\/url>)/g) produces.
    const sep = "\n  ";
    const block1 = "<url>\n    <loc>https://x.com/kept-a/</loc>\n  </url>";
    const block2 = "<url>\n    <loc>https://x.com/kept-b/</loc>\n  </url>";
    const removed = "";

    // sep + block1 + sep + removed + sep + block2 + sep
    const raw = sep + block1 + sep + removed + sep + block2 + sep;
    const result = collapseBlankLines(raw);

    expect(result).toContain("<loc>https://x.com/kept-a/</loc>");
    expect(result).toContain("<loc>https://x.com/kept-b/</loc>");
  });

  it("leaves output unchanged when there are no consecutive blank lines", () => {
    const clean = "line1\n\nline2\n\nline3\n";
    expect(collapseBlankLines(clean)).toBe(clean);
  });

  it("collapses a run of 4 newlines down to exactly 2", () => {
    const input = "a\n\n\n\nb";
    const result = collapseBlankLines(input);
    expect(result).toBe("a\n\nb");
  });

  it("collapses blank lines that contain only spaces or tabs", () => {
    const input = "a\n   \n\t\nb";
    const result = collapseBlankLines(input);
    expect(result).not.toMatch(/\n\n\n/);
    expect(result).toContain("a");
    expect(result).toContain("b");
  });
});

// ---------------------------------------------------------------------------
// runUpdateSitemap — end-to-end integration tests
// ---------------------------------------------------------------------------

/**
 * Exercise the full update-sitemap pipeline (file I/O, blog-date extraction,
 * entry insertion/removal, and the final validateSitemap call) against
 * minimal fixture directories in a temp folder.
 */
describe("runUpdateSitemap — end-to-end integration", () => {
  let tmpDir: string;

  afterEach(() => {
    if (tmpDir) rmSync(tmpDir, { recursive: true, force: true });
  });

  function setup(): { publicDir: string; blogDir: string; sitemapPath: string } {
    tmpDir = mkdtempSync(join(tmpdir(), "sitemap-test-"));
    const publicDir = join(tmpDir, "public");
    const blogDir = join(publicDir, "blog");
    mkdirSync(blogDir, { recursive: true });
    return { publicDir, blogDir, sitemapPath: join(publicDir, "sitemap.xml") };
  }

  function blogHtml(dateModified?: string, datePublished?: string): string {
    const fields: string[] = [];
    if (dateModified) fields.push(`"dateModified": "${dateModified}"`);
    if (datePublished) fields.push(`"datePublished": "${datePublished}"`);
    const ld = `{ "@type": "Article"${fields.length ? ", " + fields.join(", ") : ""} }`;
    return `<html><head><script type="application/ld+json">${ld}</script></head><body></body></html>`;
  }

  function pageHtml(): string {
    return `<html><head></head><body></body></html>`;
  }

  const IBASE = "https://www.example.com";

  function makeSitemap(...blocks: string[]): string {
    return [
      `<?xml version="1.0" encoding="UTF-8"?>`,
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
      ...blocks,
      `</urlset>`,
    ].join("\n");
  }

  function urlBlock(loc: string, lastmod?: string): string {
    return [
      "  <url>",
      `    <loc>${loc}</loc>`,
      lastmod ? `    <lastmod>${lastmod}</lastmod>` : "",
      "  </url>",
    ]
      .filter(Boolean)
      .join("\n");
  }

  it("updates lastmod for an existing blog post using dateModified from JSON-LD", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    mkdirSync(join(blogDir, "hello-world"));
    writeFileSync(join(blogDir, "hello-world", "index.html"), blogHtml("2024-03-15"));
    writeFileSync(join(publicDir, "index.html"), pageHtml());
    writeFileSync(
      sitemapPath,
      makeSitemap(
        urlBlock(`${IBASE}/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/hello-world/`, "2024-01-01")
      )
    );

    runUpdateSitemap({ sitemapPath, publicDir, baseUrl: IBASE, repoRoot: tmpDir });

    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).toContain("<lastmod>2024-03-15</lastmod>");
    expect(result).toContain(`<loc>${IBASE}/blog/hello-world/</loc>`);
  });

  it("falls back to datePublished when dateModified is absent", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    mkdirSync(join(blogDir, "pub-only"));
    writeFileSync(join(blogDir, "pub-only", "index.html"), blogHtml(undefined, "2024-06-01"));
    writeFileSync(join(publicDir, "index.html"), pageHtml());
    writeFileSync(
      sitemapPath,
      makeSitemap(
        urlBlock(`${IBASE}/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/pub-only/`, "2024-01-01")
      )
    );

    runUpdateSitemap({ sitemapPath, publicDir, baseUrl: IBASE, repoRoot: tmpDir });

    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).toContain("<lastmod>2024-06-01</lastmod>");
  });

  it("inserts a new <url> entry for a blog post not yet in the sitemap", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    mkdirSync(join(blogDir, "brand-new-post"));
    writeFileSync(join(blogDir, "brand-new-post", "index.html"), blogHtml("2024-09-10"));
    writeFileSync(join(publicDir, "index.html"), pageHtml());
    writeFileSync(sitemapPath, makeSitemap(urlBlock(`${IBASE}/`, "2024-01-01")));

    runUpdateSitemap({ sitemapPath, publicDir, baseUrl: IBASE, repoRoot: tmpDir });

    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).toContain(`<loc>${IBASE}/blog/brand-new-post/</loc>`);
    expect(result).toContain("<lastmod>2024-09-10</lastmod>");
  });

  it("removes a stale blog entry whose directory no longer exists on disk", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    mkdirSync(join(blogDir, "active-post"));
    writeFileSync(join(blogDir, "active-post", "index.html"), blogHtml("2024-04-01"));
    writeFileSync(join(publicDir, "index.html"), pageHtml());
    writeFileSync(
      sitemapPath,
      makeSitemap(
        urlBlock(`${IBASE}/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/active-post/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/deleted-post/`, "2023-12-01")
      )
    );

    runUpdateSitemap({ sitemapPath, publicDir, baseUrl: IBASE, repoRoot: tmpDir });

    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).not.toContain(`<loc>${IBASE}/blog/deleted-post/</loc>`);
    expect(result).toContain(`<loc>${IBASE}/blog/active-post/</loc>`);
  });

  it("auto-discovers a non-blog page in public/ and includes it in the output", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    const aboutDir = join(publicDir, "about");
    mkdirSync(aboutDir, { recursive: true });
    mkdirSync(join(blogDir, "some-post"));
    writeFileSync(join(publicDir, "index.html"), pageHtml());
    writeFileSync(join(aboutDir, "index.html"), pageHtml());
    writeFileSync(join(blogDir, "some-post", "index.html"), blogHtml("2024-05-05"));
    writeFileSync(
      sitemapPath,
      makeSitemap(
        urlBlock(`${IBASE}/`, "2024-01-01"),
        urlBlock(`${IBASE}/about/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/some-post/`, "2024-01-01")
      )
    );

    runUpdateSitemap({ sitemapPath, publicDir, baseUrl: IBASE, repoRoot: tmpDir });

    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).toContain(`<loc>${IBASE}/about/</loc>`);
    expect(result).toContain(`<loc>${IBASE}/blog/some-post/</loc>`);
    expect(result).toContain("<lastmod>2024-05-05</lastmod>");
  });

  it("produces a sitemap that passes validateSitemap end-to-end (wiring check)", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    mkdirSync(join(blogDir, "post-a"));
    mkdirSync(join(blogDir, "post-b"));
    writeFileSync(join(blogDir, "post-a", "index.html"), blogHtml("2024-01-10"));
    writeFileSync(join(blogDir, "post-b", "index.html"), blogHtml("2024-02-20"));
    writeFileSync(join(publicDir, "index.html"), pageHtml());
    writeFileSync(
      sitemapPath,
      makeSitemap(
        urlBlock(`${IBASE}/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/post-a/`, "2023-01-01")
      )
    );

    // Should not throw — the internal validateSitemap call is the real check.
    expect(() =>
      runUpdateSitemap({ sitemapPath, publicDir, baseUrl: IBASE, repoRoot: tmpDir })
    ).not.toThrow();

    // Also verify the written content directly.
    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).toContain("<lastmod>2024-01-10</lastmod>");
    expect(result).toContain("<lastmod>2024-02-20</lastmod>");
    expect(result).toContain(`<loc>${IBASE}/blog/post-a/</loc>`);
    expect(result).toContain(`<loc>${IBASE}/blog/post-b/</loc>`);
  });

  it("uses a nonBlogPageOverride file path when supplied (absolute path)", () => {
    const { publicDir, blogDir, sitemapPath } = setup();
    mkdirSync(join(blogDir, "override-post"));
    writeFileSync(join(blogDir, "override-post", "index.html"), blogHtml("2024-07-07"));
    // Homepage lives outside publicDir — simulate with an absolute file path override.
    const homeHtml = join(tmpDir, "index.html");
    writeFileSync(homeHtml, pageHtml());
    writeFileSync(
      sitemapPath,
      makeSitemap(
        urlBlock(`${IBASE}/`, "2024-01-01"),
        urlBlock(`${IBASE}/blog/override-post/`, "2024-01-01")
      )
    );

    runUpdateSitemap({
      sitemapPath,
      publicDir,
      baseUrl: IBASE,
      repoRoot: tmpDir,
      nonBlogPageOverrides: { [`${IBASE}/`]: { file: homeHtml } },
    });

    const result = readFileSync(sitemapPath, "utf-8");
    expect(result).toContain(`<loc>${IBASE}/</loc>`);
    expect(result).toContain(`<loc>${IBASE}/blog/override-post/</loc>`);
  });
});
