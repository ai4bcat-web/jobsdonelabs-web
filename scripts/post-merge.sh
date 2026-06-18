#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
pnpm --filter @workspace/scripts run gen-og --missing
pnpm --filter @workspace/scripts run update-sitemap
