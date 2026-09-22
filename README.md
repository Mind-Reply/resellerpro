# ResellerPro — legacy repository pointer

> Canonical source: https://github.com/angellllkr-eng/resellerpro-platform

This repository is retained as historical/provenance material only. It is **not** a production build target and must not receive new ResellerPro feature, provider, deployment, commerce, execution, or tooling work.

## Canonical operating rule

All future ResellerPro work belongs in the canonical private repository:

- Repository: angellllkr-eng/resellerpro-platform
- Product: ResellerPro
- Primary deployment: Cloudflare Workers + OpenNext
- Owner: A.K. / Angel Krastev
- Status authority: canonical repository evidence and release gates

The canonical repository contains the current application, Cloudflare deployment configuration, execution/evidence model, provider adapters, commerce surfaces, tests, CI/CD and launch documentation.

Do not fork, copy, or extend this legacy repository for production.

## Why this repository is retained

This repository contains an earlier ResellerPro implementation and historical product/design work. It remains available for provenance and recovery reference, but it is intentionally separated from the production source of truth.

## Security

This public repository must contain only content that is safe to expose publicly. Production credentials, database credentials, payment secrets, provider credentials, customer data and private deployment configuration must remain outside Git history and be managed through the appropriate secret store.

Canonical source: https://github.com/angellllkr-eng/resellerpro-platform
