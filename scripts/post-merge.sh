#!/bin/bash
set -e
pnpm install --frozen-lockfile
pnpm --filter db push
pnpm --filter @workspace/scripts run test
pnpm --filter @workspace/scripts run update-sitemap
pnpm --filter @workspace/scripts run inject-og-dimensions
