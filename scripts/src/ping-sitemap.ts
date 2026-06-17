/**
 * Sitemap health check + IndexNow ping — runs automatically after every deploy (post-merge.sh).
 *
 * Google's /ping endpoint was deprecated in June 2023 (returns 404 for everyone).
 * See: https://developers.google.com/search/blog/2023/06/sitemaps-lastmod-ping
 *
 * What this script does:
 *   1. Verifies sitemap.xml is publicly reachable from production.
 *   2. Validates the response is well-formed XML with at least one <url> entry.
 *   3. Extracts all URLs (with their <lastmod> dates) from the sitemap.
 *   4. Compares against a persisted snapshot (~/.indexnow-snapshot.json) of the
 *      last successful submission to find only new or changed URLs.
 *   5. Submits only those changed/new URLs to IndexNow
 *      (instant Bing + Yandex indexing notification).
 *   6. Updates the snapshot after a successful submission.
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

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const SITEMAP_URL = "https://www.jobsdonelabs.ai/sitemap.xml";
const HOST = "www.jobsdonelabs.ai";
const INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow";

const SNAPSHOT_PATH = path.join(os.homedir(), ".indexnow-snapshot.json");

type UrlEntry = { lastmod: string | null };
type Snapshot = Record<string, UrlEntry>;

function loadSnapshot(): Snapshot {
  try {
    const raw = fs.readFileSync(SNAPSHOT_PATH, "utf-8");
    return JSON.parse(raw) as Snapshot;
  } catch {
    return {};
  }
}

function saveSnapshot(snapshot: Snapshot): void {
  fs.writeFileSync(SNAPSHOT_PATH, JSON.stringify(snapshot, null, 2), "utf-8");
}

interface SitemapEntry {
  url: string;
  lastmod: string | null;
}

function extractEntries(xml: string): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const urlBlocks = xml.matchAll(/<url>([\s\S]*?)<\/url>/g);
  for (const block of urlBlocks) {
    const content = block[1];
    const locMatch = content.match(/<loc>\s*(https?:\/\/[^<]+)\s*<\/loc>/);
    if (!locMatch) continue;
    const url = locMatch[1].trim();
    const lastmodMatch = content.match(/<lastmod>\s*([^<]+)\s*<\/lastmod>/);
    const lastmod = lastmodMatch ? lastmodMatch[1].trim() : null;
    entries.push({ url, lastmod });
  }
  return entries;
}

async function checkSitemap(): Promise<SitemapEntry[]> {
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

  const entries = extractEntries(body);
  console.log(`[sitemap] ✓ Sitemap OK (HTTP ${res.status}, ${entries.length} URLs)`);
  console.log(
    `[sitemap]   Google indexing relies on <lastmod> dates + the one-time GSC registration.`
  );
  console.log(`[sitemap]   See docs/google-search-console.md for setup steps.`);

  return entries;
}

function findChangedEntries(
  current: SitemapEntry[],
  snapshot: Snapshot
): SitemapEntry[] {
  return current.filter(({ url, lastmod }) => {
    const prev = snapshot[url];
    if (!prev) return true;
    if (lastmod !== prev.lastmod) return true;
    return false;
  });
}

/**
 * Returns true only when IndexNow confirms the submission (HTTP 200 or 202).
 * Returns false for non-fatal skips (missing key, rate-limit).
 * Throws on hard errors (422, unexpected status) so the caller can surface them.
 */
async function pingIndexNow(urls: string[]): Promise<boolean> {
  const key = process.env.INDEXNOW_KEY;
  if (!key) {
    console.warn(
      "[indexnow] ⚠ INDEXNOW_KEY env var not set — skipping IndexNow submission."
    );
    return false;
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
    return true;
  } else if (res.status === 202) {
    console.log(
      `[indexnow] ✓ IndexNow queued submission (HTTP 202) — URLs will be processed shortly.`
    );
    return true;
  } else if (res.status === 422) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `IndexNow rejected the submission (HTTP 422 — invalid URL format or key mismatch). ${text}`
    );
  } else if (res.status === 429) {
    console.warn(
      `[indexnow] ⚠ IndexNow rate-limited (HTTP 429) — submission will be retried on next deploy.`
    );
    return false;
  } else {
    const text = await res.text().catch(() => "");
    throw new Error(`IndexNow returned unexpected HTTP ${res.status}. ${text}`);
  }
}

async function main(): Promise<void> {
  const entries = await checkSitemap();
  const snapshot = loadSnapshot();

  const changed = findChangedEntries(entries, snapshot);

  if (changed.length === 0) {
    console.log(
      `[indexnow] No new or changed URLs since last submission — skipping IndexNow ping.`
    );
    return;
  }

  console.log(
    `[indexnow] ${changed.length} of ${entries.length} URL(s) are new or changed.`
  );

  const urls = changed.map((e) => e.url);
  const submitted = await pingIndexNow(urls);

  if (submitted) {
    const updatedSnapshot: Snapshot = {};
    for (const { url, lastmod } of entries) {
      updatedSnapshot[url] = { lastmod };
    }
    saveSnapshot(updatedSnapshot);
    console.log(`[indexnow] Snapshot saved to ${SNAPSHOT_PATH}.`);
  } else {
    console.log(
      `[indexnow] Snapshot not updated — submission was skipped or rate-limited; changed URLs will be retried on next deploy.`
    );
  }
}

main().catch((err) => {
  console.error(
    `[ping-sitemap] ✗ ${err instanceof Error ? err.message : String(err)}`
  );
  process.exit(1);
});
