# ResellerPro organization repository authority

**Product:** ResellerPro  
**Organization repository:** `Mind-Reply/resellerpro`  
**Current implementation source:** `Mind-Reply/resellerpro`  
**State:** CANONICAL / GOVERNANCE COMPLETE (2026-09-30)

This repository is the single organization source for the ResellerPro platform.

Historical sources:
- `angellllkr-eng/resellerpro-platform` — SOURCE-FREEZE / provenance-only
- `angellllkr-eng/reseller-pro-enterprise` — SOURCE-FREEZE / provenance-only
- `angellllkr-eng/reseller-pro` — LEGACY / SOURCE-FREEZE

The unified implementation covers the combined platform baseline:
domains, workspace, provider orchestration, commerce, orders, invoices, account sessions, subscriptions, transactions, acquisition intelligence, analytics, operations and evidence.

Runtime target:

`GitHub → validation → ResellerPro → Cloudflare Workers/OpenNext → smoke/health → evidence`

Vercel is explicitly excluded from the production authority path.

## Governance status (2026-09-30)

- Organization destination: COMPLETE
- Source freeze: APPLIED
- Full application tree transfer: COMPLETE (105 source files promoted on 2026-10-03)
- Production authority: NOT YET CLAIMED (runtime evidence still required)

See `RESELLERPRO_COMPLETE.md` and `SOURCE_SYNC_MANIFEST_2026-09-30.md`.

Repository state is not runtime proof. A deployment is only represented as live after URL/health verification and evidence recording.
