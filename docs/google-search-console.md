# Google Search Console — Sitemap Registration

## Why this matters

Google needs to know your sitemap exists before it will crawl it on a regular schedule.
Submitting it once in Search Console dramatically cuts the time between publishing a new
blog post and it appearing in search results (hours vs. days/weeks).

> **Note on the `/ping` endpoint** — Google deprecated `https://www.google.com/ping?sitemap=...`
> in June 2023. It now returns 404. Fast indexing today relies on accurate `<lastmod>` dates
> in `sitemap.xml` (already in place) plus a one-time GSC submission.

---

## One-time setup: register the sitemap

1. Go to [Google Search Console](https://search.google.com/search-console/) and sign in.
2. Select (or add) the **jobsdonelabs.ai** property.
3. In the left sidebar click **Sitemaps** (under *Indexing*).
4. In the *Add a new sitemap* field enter:
   ```
   sitemap.xml
   ```
   (Search Console prepends your domain automatically.)
5. Click **Submit**.
6. Refresh the page — the sitemap should show status **Success** and a URL count near 12.

That's it. Google will now re-fetch the sitemap automatically every time it crawls the site.

---

## Keeping indexing fast after each publish

When you publish new blog posts, update the `<lastmod>` date in
`artifacts/landing-page/public/sitemap.xml` to today's date for each changed/new URL.
Googlebot uses `<lastmod>` to prioritise re-crawls, so accurate dates = faster re-indexing.

Example entry:
```xml
<url>
  <loc>https://www.jobsdonelabs.ai/blog/my-new-post/</loc>
  <lastmod>2026-06-16</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
```

---

## Checking for crawl errors

After submitting:
1. In Search Console → **Pages** (under *Indexing*), watch for any URLs flagged as
   *Crawled – currently not indexed* or *Discovered – currently not indexed*.
2. **Sitemaps** tab shows the last fetch time and detected URL count.
3. If a URL shows an error, click it for the reason (usually a 4xx or redirect issue).

---

## Optional: IndexNow (instant indexing for Bing/Yandex)

IndexNow lets you push a URL to Bing and Yandex the moment it's published — no waiting
for a crawl. It requires a free API key from [Bing Webmaster Tools](https://www.bing.com/webmasters/).
See `scripts/src/ping-sitemap.ts` for a starting point if you want to add this later.
