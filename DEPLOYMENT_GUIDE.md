# ResellerPro deployment guide

## Canonical production path

ResellerPro uses the controlled release path:

GitHub main → validation → ResellerPro release → Cloudflare Workers/OpenNext → smoke/health verification → evidence

Vercel, Netlify and Railway are legacy documentation references and are not production authorities for this project.

## Required release gates

1. Validate TypeScript and Prisma.
2. Build the production artifact.
3. Confirm required runtime secrets exist in the deployment provider secret manager.
4. Release through the approved ResellerPro/Cloudflare path.
5. Run homepage, API health, asset, link and mobile smoke checks.
6. Record runtime evidence before representing the deployment as LIVE.
7. Keep registration, DNS, hosting and financial mutations fail-closed until their provider-specific evidence gates pass.

## Environment contract

Secrets must remain outside GitHub. Production configuration may require DATABASE_URL, NEXTAUTH_SECRET, provider credentials, Stripe webhook/payment credentials when commerce is explicitly enabled, and Cloudflare deployment credentials in approved secret storage.

Do not place secret values in source, client bundles, logs, screenshots or documentation.

## Verification

A successful GitHub build is not proof of a live deployment. Production evidence should identify the commit SHA, deployment identifier, canonical hostname, timestamp, HTTP status, health result, critical route checks, asset/error check and rollback reference.

## Rollback

Rollback must target the last verified release, not merely the last successful build. Preserve evidence for both the failed release and recovery release.

## Documentation rule

Older documents that say ResellerPro is LIVE, recommend Vercel, or supply example production URLs are historical until reconciled with current runtime evidence.