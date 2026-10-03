# TRUST STATE — VERIFIED DEPLOYMENT REALITY — 2026-09-30

## Current release attempt — 2026-09-30

The owner has explicitly authorized publication of the canonical ResellerPro platform.

Release target:
- Source: `Mind-Reply/resellerpro`
- Branch: `main`
- Runtime authority: Cloudflare Workers + OpenNext
- Release workflow: `.github/workflows/deploy-cloudflare.yml`
- Required sequence: validation → production release → runtime health verification → evidence
- Publication request status: IN_PROGRESS / awaiting GitHub Actions + Cloudflare runtime evidence

A repository push to `main` is the configured release trigger. This record is intentionally factual: publication is not represented as LIVE until the runtime health gate succeeds.

## Verified in repository

- Next.js + TypeScript control plane: discovery, quote, checkout, workers, admin, hosting and monitoring.
- Provider bus: Openprovider primary, OpusDNS fallback, RDAP read-only.
- Feature gates fail-closed for registration, DNS, hosting and live checkout until owner flags + evidence.
- `GET /api/health` and `GET /api/platform/capabilities` expose runtime readiness.
- Prisma models: workspace, quotes, consent, orders, operations, audit and WebhookEvent.
- Stripe webhook route is acknowledge-first + idempotent.
- Priority regional TLDs: `.bg`, `.gr`, `.ro`, `.eu`.
- Self-host path: `Dockerfile.prod` + `docker-compose.prod.yml`.
- Canonical web launch path: **Cloudflare Workers + OpenNext**.
- Cloudflare deployment workflow: `.github/workflows/deploy-cloudflare.yml`.
- Platform order: **ResellerPro is Platform 01 / first execution target**.
- Organization canonical: `Mind-Reply/resellerpro` (governance COMPLETE 2026-09-30).

## Not verified as production-live

1. Cloudflare production deployment on the intended canonical hostname.
2. Stripe checkout → signed webhook → WebhookEvent → order transition → reconciliation.
3. Openprovider sandbox/live registration → poll → complete.
4. `.bg` document-gate end-to-end.
5. Production hosting/DNS write cycle via provider adapters.
6. Canonical production hostname binding and DNS propagation.

## Vercel status

Historical Vercel deployments may exist, but Vercel is **not** the active production authority and must not be used as current production proof.

## Release state

**CODE: READY / DEPLOYMENT PATH: CONFIGURED / RELEASE: READY FOR RUNTIME VERIFICATION / RUNTIME: pending_evidence / MUTATIONS: FAIL-CLOSED**

A deployment being configured or previously marked READY does not prove current runtime health.

## Identity

- Registrar product: ResellerPro (A11-K)
- Canonical source: `Mind-Reply/resellerpro`
- Primary runtime: Cloudflare Workers + OpenNext
- Fallback runtime: Docker/self-host
- Owner: A.K.

Secrets remain outside GitHub.

## Human-facing Trust State

- **CLEAR** — relevant facts agree and proof exists.
- **CHECKING** — facts are still being established.
- **MISMATCH** — sources disagree.
- **UNPROVEN** — a statement lacks sufficient proof.
- **STOPPED** — safe continuation is not justified.
- **APPROVED** — the owner explicitly permitted the next action.
- **LIVE** — the change is active and independently checked.

Current repository state is **CHECKING / UNPROVEN** for production runtime until the live Cloudflare deployment and canonical hostname are independently re-proven.

Documentation does not override runtime proof.
