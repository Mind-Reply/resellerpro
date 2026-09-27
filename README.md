# ResellerPro

A premium, owner-controlled reseller platform for domains, commerce, provider orchestration and controlled execution.

**Canonical repository:** `Mind-Reply/resellerpro`  
**Runtime direction:** ResellerPro + Cloudflare / OpenNext  
**Production rule:** validate → record evidence → approve → release → verify

## Unified platform

ResellerPro is the single organization implementation for:

- domain and provider operations;
- customer/workspace identity;
- commerce, orders and invoices;
- subscriptions and controlled checkout;
- transaction history and webhook evidence;
- acquisition and business intelligence;
- operations, release state and audit evidence.

The platform is deliberately simplified around one workspace and one persisted operating model instead of parallel product stacks.

## Account and billing

Customer sessions use a signed HTTP-only cookie bound to a customer and workspace. Browser localStorage is not used for bearer session tokens.

Stripe billing is fail-closed by default:

`STRIPE_BILLING_MODE=disabled`

Test or live checkout can only activate when the deployment contains mode-matching Stripe credentials, webhook credentials and configured plan price IDs.

## Runtime

`GitHub → validation → ResellerPro → Cloudflare Workers/OpenNext → smoke/health → evidence`

Vercel is not a production authority for this repository.

## Privacy / public identity rule

Do not expose the owner's personal name, personal GitHub handle, personal profile URLs, private email addresses, internal account names, local filesystem names, or private infrastructure identifiers in the public product UI.

Public UI uses **ResellerPro**, **Mind-Reply**, and approved product language only.

## Design direction

The experience is an enterprise commerce/control product for technical operators and business owners, using restrained editorial hierarchy, deliberate whitespace, strong information confidence and visible release state.

## Runtime truth

Repository state is not runtime proof. A deployment is only represented as live after URL/health verification and evidence recording.

See `CANONICAL_POINTER.md`, `docs/UNIFIED_BI_PLATFORM.md`, and `docs/CANONICAL_MIGRATION.md`.
