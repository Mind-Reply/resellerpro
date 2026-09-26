# ResellerPro — Enterprise Competitive Baseline

## Objective

ResellerPro is being developed as a provider-neutral control layer with a minimum capability surface comparable to the expectations established by modern deployment platforms.

This document is a capability baseline, not a claim that every runtime capability is already deployed.

## Required capability families

1. Source integration
   - GitHub repository connection
   - branch/environment mapping
   - commit provenance
   - deployment history

2. Build and release
   - deterministic build contract
   - preview environments
   - production promotion
   - rollback
   - build logs
   - release evidence

3. Runtime
   - edge/serverless execution
   - Cloudflare/OpenNext path
   - Cloud Run path
   - provider adapter boundary
   - environment isolation

4. Domains and networking
   - custom domains
   - DNS intent and verification
   - TLS/certificate state
   - locale routing
   - regional routing
   - health/readiness endpoints

5. Configuration and secrets
   - environment-scoped variables
   - secret references
   - no credentials in source
   - controlled rotation workflow

6. Observability
   - build status
   - deployment status
   - health checks
   - runtime logs
   - incident/evidence record
   - explicit UNVERIFIED state when external verification is unavailable

7. Team and governance
   - owner
   - roles
   - approvals
   - auditable mutations
   - reversible releases
   - fail-closed destructive operations

8. Commerce
   - tenant plans
   - usage boundaries
   - Stripe integration boundary
   - invoices and payment events
   - explicit approval for money movement

9. Data
   - Postgres/Supabase control plane
   - RLS-first authorization
   - provider-neutral records
   - migration and backup contracts

10. International delivery
   - locale subdirectories
   - x-default
   - reciprocal hreflang
   - canonical URLs
   - locale-aware sitemap
   - currency display separated from settlement routing

## ResellerPro differentiator

The product boundary is not a hosting provider. It is the control layer that can orchestrate multiple providers while retaining owner control, evidence, and release reversibility.

## Status vocabulary

- READY — repository implementation exists and can be inspected.
- CONTRACT — architecture is specified but runtime implementation still needs verification.
- VERIFIED — independently verified in the target runtime.
- UNVERIFIED — code/config exists but external runtime proof is absent.
- BLOCKED — required external permission or infrastructure is unavailable.

## Current release path

GitHub → build validation → provider adapter → deployment → external HTTP/health → evidence → release record.

No deployment is described as live until the external HTTP and health stages are proven.
