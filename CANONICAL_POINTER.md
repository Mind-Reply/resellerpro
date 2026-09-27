# ResellerPro organization repository authority

**Product:** ResellerPro  
**Organization repository:** `Mind-Reply/resellerpro`  
**Current implementation source:** `Mind-Reply/resellerpro`  
**State:** CANONICAL / CONSOLIDATED

This repository is the single organization source for the ResellerPro platform.

Historical sources:
- `angellllkr-eng/resellerpro-platform` — SOURCE-FREEZE / provenance-only
- `angellllkr-eng/reseller-pro-enterprise` — SOURCE-FREEZE / provenance-only

The unified implementation now covers the combined platform baseline:
domains, workspace, provider orchestration, commerce, orders, invoices, account sessions, subscriptions, transactions, acquisition intelligence, analytics, operations and evidence.

Runtime target:

`GitHub → validation → ResellerPro → Cloudflare Workers/OpenNext → smoke/health → evidence`

Vercel is explicitly excluded from the production authority path.

Repository state is not runtime proof. A deployment is only represented as live after URL/health verification and evidence recording.
