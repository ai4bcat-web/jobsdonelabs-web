import { describe, it, expect } from "vitest";
import { validateSitemap } from "./sitemap-validator.js";

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
