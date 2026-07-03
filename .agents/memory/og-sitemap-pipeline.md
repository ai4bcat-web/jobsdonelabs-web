---
name: OG/sitemap post-merge pipeline
description: Key decisions and constraints for the GitHub → Replit auto-sync pipeline (post-merge.sh, gen-og, inject-og-dimensions, update-sitemap).
---

## Bot-push loop guard
`isBotPush()` in `github-webhook.ts` detects `[skip ci]` in commit messages and skips git pull. The auto-commit message MUST always contain `[skip ci]` to avoid an infinite webhook loop.

## inject-og-dimensions scope
Processes blog/, about/, AND case-study/ subdirectories (not just blog/). Export `runInjectOgDimensions(dirs)` for testing. OG dimensions are 1200×630 PNG.

## collapseBlankLines fix
Use `\n([ \t]*\n){2,}` not `(\n[ \t]*){3,}` — the old pattern consumed the leading indentation of the next `<url>` tag after a block deletion.

## post-merge stale commit protection
If og.png/HTML push fails permanently, call `git reset --soft HEAD~1` so the local commit doesn't accumulate across runs.

## post-merge commits HTML too
`push_generated_files()` stages blog/about/case-study index.html files alongside og.png so injected OG dimension tags reach GitHub.

## Non-blog page auto-insertion
`runUpdateSitemap` now auto-inserts newly discovered non-blog pages (found in public/ but not yet in sitemap.xml) rather than emitting a warning and then letting validateSitemap throw.

**Why:** Without auto-insertion, a new page landing via GitHub would fail the merge with a confusing validator error instead of being handled gracefully.
