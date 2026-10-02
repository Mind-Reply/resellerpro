# Product Engine Contract

ResellerPro is the commerce/deployment authority. The product-engine loop is:

**visual brief → typed implementation → validation → Stripe/Supabase integration → Cloudflare build → smoke test → evidence**

Required capabilities:
- visual-first responsive experience
- typed domain/API boundaries
- Stripe payment capability behind explicit configuration
- Supabase/database state where applicable
- automated type/lint/test/production-config checks
- deployment evidence before any LIVE label

Repository remains the sole source of implementation truth. Do not introduce a second product runtime or competitor dependency.
