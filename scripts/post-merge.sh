#!/bin/bash
set -e

# Set git identity for auto-commits (required in the task agent environment)
git config --local user.email "bot@jobsdonelabs.ai"
git config --local user.name "JobsDone Labs Bot"

pnpm install --frozen-lockfile
pnpm --filter db push

# Run all script tests before touching any files.
# A clear error here prevents a broken sync from silently corrupting the site.
if ! pnpm --filter @workspace/scripts run test; then
  echo ""
  echo "╔══════════════════════════════════════════════════════════════════╗"
  echo "║  [post-merge] FATAL: Script tests failed — sync aborted.        ║"
  echo "║  Fix the failing test(s) listed above, then re-run post-merge.  ║"
  echo "╚══════════════════════════════════════════════════════════════════╝"
  exit 1
fi

pnpm --filter @workspace/scripts run update-sitemap
pnpm --filter @workspace/scripts run inject-og-dimensions

# Generate OG images for any blog posts that are missing one
pnpm --filter @workspace/scripts run gen-og --missing

# --- Commit and push newly generated og.png files and updated HTML ---
#
# Also stages any HTML files modified by inject-og-dimensions (dimension tags)
# so GitHub always has the up-to-date metadata.
#
# Uses a pull --rebase retry to handle the case where a human pushed concurrently,
# which would otherwise cause a non-fast-forward rejection.
#
# If the push permanently fails the local commit is reset so subsequent runs
# start clean rather than accumulating stale commits.
push_generated_files() {
  git add -- 'artifacts/landing-page/public/blog/*/og.png' || true
  git add -- 'artifacts/landing-page/public/blog/*/index.html' || true
  git add -- 'artifacts/landing-page/public/about/*/index.html' || true
  git add -- 'artifacts/landing-page/public/case-study/*/index.html' || true

  if git diff --cached --quiet; then
    echo "[post-merge] No generated files to commit."
    return 0
  fi

  git commit -m "chore: auto-generate missing og.png and inject OG dimensions [skip ci]"

  if git push origin HEAD; then
    echo "[post-merge] Push succeeded."
    return 0
  fi

  echo "[post-merge] WARNING: push rejected (likely non-fast-forward). Attempting pull --rebase and retry..."

  if git pull --rebase origin HEAD; then
    if git push origin HEAD; then
      echo "[post-merge] Push succeeded after rebase."
      return 0
    fi
    echo "[post-merge] ERROR: push failed after rebase retry. Resetting local commit to avoid stale state."
    git reset --soft HEAD~1
    echo "[post-merge] Local commit reset. Re-run post-merge.sh or push manually to resolve."
  else
    echo "[post-merge] ERROR: git pull --rebase failed (conflict?). Aborting rebase and resetting local commit."
    git rebase --abort 2>/dev/null || true
    git reset --soft HEAD~1
  fi

  return 0
}

push_generated_files
