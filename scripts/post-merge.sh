#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
pnpm --filter @workspace/scripts run test
pnpm --filter @workspace/scripts run update-sitemap
pnpm --filter @workspace/scripts run inject-og-dimensions

# Generate OG images for any blog posts that are missing one
pnpm --filter @workspace/scripts run gen-og -- --missing

# --- Commit and push newly generated og.png files ---
# Uses a pull --rebase retry to handle the case where a human pushed an og.png
# to GitHub concurrently, which would otherwise cause a non-fast-forward rejection.
# A second failure is logged but never aborts the rest of the sync.
push_og_images() {
  git add -- 'artifacts/landing-page/public/blog/*/og.png' || true

  if git diff --cached --quiet; then
    echo "[post-merge] No new og.png files to commit."
    return 0
  fi

  git commit -m "chore: auto-generate missing og.png [skip ci]"

  if git push origin HEAD; then
    echo "[post-merge] og.png push succeeded."
    return 0
  fi

  echo "[post-merge] WARNING: push rejected (likely non-fast-forward). Attempting pull --rebase and retry..."

  if git pull --rebase origin HEAD; then
    if git push origin HEAD; then
      echo "[post-merge] og.png push succeeded after rebase."
      return 0
    fi
    echo "[post-merge] ERROR: og.png push failed after rebase retry. The generated images are committed locally but not pushed to GitHub. Re-run post-merge.sh or push manually to resolve."
  else
    echo "[post-merge] ERROR: git pull --rebase failed (conflict?). Aborting rebase. Resolve conflicts and push og.png manually."
    git rebase --abort 2>/dev/null || true
  fi

  return 0
}

push_og_images
