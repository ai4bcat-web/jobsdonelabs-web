# Bing Webmaster Tools — IndexNow Registration

## Why this matters

IndexNow is already wired into the deploy pipeline (`scripts/src/ping-sitemap.ts`). On
every deploy it pushes every sitemap URL to Bing and Yandex for instant re-indexing.

However, Bing requires a **one-time manual step** to associate the IndexNow key with your
verified site. Until that's done, submissions are accepted by the API but don't appear in
the Bing Webmaster Tools "IndexNow" dashboard report.

---

## What has been verified (2026-06-17)

| Check | Status |
|---|---|
| Key file live: `GET https://www.jobsdonelabs.ai/aa3c656f122419868fa93e8a6464386a.txt` | ✓ HTTP 200 |
| File content equals the key (`aa3c656f122419868fa93e8a6464386a`) | ✓ exact match |
| Live IndexNow API test ping → `POST https://api.indexnow.org/indexnow` | ✓ HTTP 202 |
| IndexNow ping fires on every deploy | ✓ wired in post-merge.sh |

HTTP 202 from the IndexNow API confirms Bing reached the key file, validated it, and
queued the submission. The key and key-file are fully functional.

**Remaining manual step:** register `www.jobsdonelabs.ai` as a verified property inside
the Bing Webmaster Tools dashboard so submissions appear in the IndexNow report.
See the steps below.

---

## One-time setup: register the site and verify the key

1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters) and sign in with a
   Microsoft account.

2. **Add your site** — if `www.jobsdonelabs.ai` isn't already listed, click
   **Add a site**, enter `https://www.jobsdonelabs.ai`, and follow the verification flow.
   - The easiest verification method is **XML file** (place the provided file in
     `artifacts/landing-page/public/` and redeploy) or **Auto-verify via Bing** if
     the site was previously listed in Google Search Console.

3. Once the site is verified, navigate to **Settings → IndexNow** (left sidebar).

4. Bing will show your active IndexNow key. Confirm it matches:
   ```
   aa3c656f122419868fa93e8a6464386a
   ```
   and that the key file URL resolves:
   ```
   https://www.jobsdonelabs.ai/aa3c656f122419868fa93e8a6464386a.txt
   ```

5. Click **Verify** (if prompted). Bing fetches the key file directly to confirm
   ownership.

---

## Confirming it's working

After the next deploy (which triggers a fresh IndexNow ping):

1. In Bing Webmaster Tools → **IndexNow** report, you should see the submitted URLs
   listed with a *Submitted* or *Processed* status.
2. If you want to trigger an immediate test without waiting for a deploy, run:
   ```bash
   INDEXNOW_KEY=aa3c656f122419868fa93e8a6464386a pnpm --filter @workspace/scripts run ping-sitemap
   ```

---

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| No URLs in IndexNow report | Site not registered / key not verified | Complete step 3–5 above |
| HTTP 422 from IndexNow API | Key mismatch or key file not reachable | Verify `INDEXNOW_KEY` env var matches the `.txt` file name and content |
| HTTP 403 from IndexNow API | Key file returns wrong content | Ensure file content is exactly the key with no trailing newline issues |
| Site shows as unverified | Domain mismatch | Ensure you added `www.jobsdonelabs.ai`, not `jobsdonelabs.ai` |
