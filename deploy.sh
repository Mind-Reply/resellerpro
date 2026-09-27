#!/usr/bin/env bash
set -euo pipefail

echo "RESELLERPRO — CONTROLLED CLOUDFLARE RELEASE"
echo "============================================"

if [[ ! -f "package.json" || ! -f "wrangler.toml" ]]; then
  echo "Repository root was not detected." >&2
  exit 1
fi

echo "1/4 Validate TypeScript and Prisma"
npm run type-check
npx prisma validate

echo "2/4 Build application"
npm run cf:build

echo "3/4 Deploy through Cloudflare/OpenNext"
npx --yes wrangler@4.135.0 deploy

echo "4/4 Runtime verification"
echo "Deployment command completed. Verify the canonical hostname and health/evidence separately before marking LIVE."
