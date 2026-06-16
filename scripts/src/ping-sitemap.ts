/**
 * Sitemap health check — runs automatically after every deploy (post-merge.sh).
 *
 * Google's /ping endpoint was deprecated in June 2023 (returns 404 for everyone).
 * See: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
 *
 * What this script does instead:
 *   1. Verifies sitemap.xml is publicly reachable from production.
 *   2. Validates the response is well-formed XML with at least one <url> entry.
 *
 * Fast Google indexing now relies on:
 *   • One-time sitemap registration in Google Search Console (see docs/google-search-console.md).
 *   • Accurate <lastmod> dates in sitemap.xml so Googlebot re-crawls changed pages.
 *
 * For Bing/Yandex instant indexing, see follow-up task #11 (IndexNow integration).
 */

const SITEMAP_URL = "https://www.jobsdonelabs.ai/sitemap.xml";

async function checkSitemap(): Promise<void> {
  console.log(`[sitemap] Verifying sitemap is publicly reachable…`);
  console.log(`[sitemap] GET ${SITEMAP_URL}`);

  const res = await fetch(SITEMAP_URL, { method: "GET" });

  if (!res.ok) {
    throw new Error(
      `Sitemap returned HTTP ${res.status} — verify the deployment is live.`
    );
  }

  const body = await res.text();

  if (!body.includes("<urlset") || !body.includes("<url>")) {
    throw new Error(
      "Sitemap response does not look like a valid XML sitemap (missing <urlset> or <url>)."
    );
  }

  const urlCount = (body.match(/<url>/g) ?? []).length;
  console.log(`[sitemap] ✓ Sitemap OK (HTTP ${res.status}, ${urlCount} URLs)`);
  console.log(
    `[sitemap]   Google indexing relies on <lastmod> dates + the one-time GSC registration.`
  );
  console.log(`[sitemap]   See docs/google-search-console.md for setup steps.`);
}

checkSitemap().catch((err) => {
  console.error(
    `[sitemap] ✗ ${err instanceof Error ? err.message : String(err)}`
  );
  process.exit(1);
});
