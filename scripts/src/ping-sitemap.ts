/**
 * Sitemap health check + IndexNow ping — runs automatically after every deploy (post-merge.sh).
 *
 * Google's /ping endpoint was deprecated in June 2023 (returns 404 for everyone).
 * See: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
 *
 * What this script does:
 *   1. Verifies sitemap.xml is publicly reachable from production.
 *   2. Validates the response is well-formed XML with at least one <url> entry.
 *   3. Extracts all URLs from the sitemap and submits them to IndexNow
 *      (instant Bing + Yandex indexing notification).
 *
 * Fast Google indexing relies on:
 *   • One-time sitemap registration in Google Search Console (see docs/google-search-console.md).
 *   • Accurate <lastmod> dates in sitemap.xml so Googlebot re-crawls changed pages.
 *
 * IndexNow key verification:
 *   • Key file must be live at: https://www.jobsdonelabs.ai/<INDEXNOW_KEY>.txt
 *   • The file content must equal the key itself (already in place).
 *   • Register the key once in Bing Webmaster Tools to confirm ownership.
 *     See docs/bing-webmaster-tools.md for the step-by-step setup guide.
 */

const SITEMAP_URL = "https://www.jobsdonelabs.ai/sitemap.xml";
const HOST = "www.jobsdonelabs.ai";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

function extractUrls(xml: string): string[] {
  const matches = xml.matchAll(/<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/g);
  return Array.from(matches, (m) => m[1].trim());
}

async function checkSitemap(): Promise<string[]> {
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

  const urls = extractUrls(body);
  console.log(`[sitemap] ✓ Sitemap OK (HTTP ${res.status}, ${urls.length} URLs)`);
  console.log(
    `[sitemap]   Google indexing relies on <lastmod> dates + the one-time GSC registration.`
  );
  console.log(`[sitemap]   See docs/google-search-console.md for setup steps.`);

  return urls;
}

async function pingIndexNow(urls: string[]): Promise<void> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn(
      "[indexnow] ⚠ INDEXNOW_KEY env var not set — skipping IndexNow submission."
    );
    return;
  }

  console.log(`[indexnow] Submitting ${urls.length} URL(s) to IndexNow…`);

  const payload = {
    host: HOST,
    key,
    keyLocation: `https://${HOST}/${key}.txt`,
    urlList: urls,
  };

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (res.status === 200) {
    console.log(`[indexnow] ✓ IndexNow accepted all ${urls.length} URL(s) (HTTP 200).`);
  } else if (res.status === 202) {
    console.log(
      `[indexnow] ✓ IndexNow queued submission (HTTP 202) — URLs will be processed shortly.`
    );
  } else if (res.status === 422) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `IndexNow rejected the submission (HTTP 422 — invalid URL format or key mismatch). ${text}`
    );
  } else if (res.status === 429) {
    console.warn(
      `[indexnow] ⚠ IndexNow rate-limited (HTTP 429) — submission will be retried on next deploy.`
    );
  } else {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow returned unexpected HTTP ${res.status}. ${text}`);
  }
}

async function main(): Promise<void> {
  const urls = await checkSitemap();
  await pingIndexNow(urls);
}

main().catch((err) => {
  console.error(
    `[ping-sitemap] ✗ ${err instanceof Error ? err.message : String(err)}`
  );
  process.exit(1);
});
