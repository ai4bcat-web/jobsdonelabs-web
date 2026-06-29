#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
pnpm --filter @workspace/scripts run update-sitemap

# Inject og:image:width / og:image:height / og:image:type into any new posts
# that arrived without them (tags are required for correct social previews)
pnpm --filter @workspace/scripts run inject-og-dimensions

# Generate OG images for any new posts that are missing one
pnpm --filter @workspace/scripts run gen-og --missing

# Commit and push any newly generated og.png files back to GitHub
git add artifacts/landing-page/public/blog/*/og.png 2>/dev/null || true

if git diff --cached --quiet; then
  echo "[post-merge] No new OG images to commit — skipping push."
else
  git -c user.name="replit-bot" \
      -c user.email="bot@jobsdonelabs.ai" \
      commit -m "chore: auto-generate OG images for new posts"

  REPO_URL="https://${GITHUB_PAT}@github.com/ai4bcat-web/jobsdonelabs-web.git"
  git push "$REPO_URL" HEAD:main
  echo "[post-merge] OG images committed and pushed to GitHub."
fi
