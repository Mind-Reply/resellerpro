# TASKS.md — Outstanding-Work Register

**Updated:** 2026-09-30

## Critical
- [ ] **Runtime verification:** prove the canonical ResellerPro deployment path and intended public domain with direct executable evidence.
- [ ] **Stripe webhook gate:** set the test webhook secret through the approved secret channel, fire a test event, and prove WebhookEvent + order transition.
- [ ] Openprovider sandbox register → poll → complete with evidence packet.
- [ ] Assess historical Supabase pool token exposure; rotate if ever live.
- [ ] Resolve Supabase security advisor findings: 15 public tables have RLS enabled but no policies.
- [x] Organization governance COMPLETE + SOURCE-FREEZE on personal mirrors (2026-09-30).
- [ ] Full application tree transfer completion (in progress — first batch executed).

## High
- [ ] Bind canonical production hostname for ResellerPro registrar surface.
- [ ] `.bg` document-gate UX + worker states exercised once.
- [ ] Consolidate contradictory root “LIVE/COMPLETE” docs.
- [ ] Fix test harness: isolated test DB; security tests against running server.

## Normal
- [ ] Focused Jest groups with safe env.
- [ ] `npm run validate` + migration validate on CI evidence.
- [ ] API auth / rate-limit / timeout review pass.

## Deferred
- [ ] Content calendar, social, pure marketing articles.
- [ ] ICANN Track B entity + application capital.

## Identity rules (always)
- ResellerPro is the registrar control plane and Platform 01 execution authority.
- Cloudflare Workers/OpenNext is the current runtime path.
- No Vercel deployment path or Vercel DNS is authoritative.
- No secrets in git.
- Mutations fail-closed until evidence.
- Do not claim live state from source/configuration alone.
