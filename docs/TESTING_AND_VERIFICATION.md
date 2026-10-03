# ResellerPro — Verification Record

Status: SOURCE-BASED / CI-VERIFICATION REQUIRED

This document replaces earlier aspirational “100% ready” checklists. Claims below are limited to what the current repository implements or what GitHub Actions verifies.

## Current repository checks

The canonical workflow `.github/workflows/validate.yml` runs on pushes and pull requests to `main` and performs:

1. dependency installation;
2. TypeScript type-check;
3. Prisma schema validation;
4. production build.

A workflow status is the evidence for whether those checks passed for a specific commit.

## Unified BI implementation

Implemented in the canonical repository:

- workspace-scoped customer account creation and login;
- signed HTTP-only customer sessions;
- subscription persistence;
- transaction ledger;
- Stripe checkout boundary;
- Stripe webhook signature validation;
- webhook idempotency through persisted `WebhookEvent` records;
- fail-closed Stripe mode/key matching;
- analytics from persisted customers, domains, orders, invoices, services and acquisition events;
- Analytics, Billing and Account workspace surfaces;
- Cloudflare/OpenNext deployment script;
- runtime health endpoint.

## Deliberately gated

The following remain configuration/provider dependent and are not represented as LIVE by source code alone:

- live Stripe charging;
- live domain registration;
- DNS mutation;
- hosting provisioning;
- carrier/shipping actions;
- production domain ownership;
- production runtime health.

## Evidence rule

Do not claim a check passed unless GitHub Actions or independent runtime evidence records the result for the relevant commit.

Historical documents that described Vercel deployment, fabricated performance figures, or unverified launch readiness are superseded by this record.
