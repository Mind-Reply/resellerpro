# ResellerPro — canonical organization repository

**Product:** ResellerPro  
**Canonical organization repository:** `Mind-Reply/resellerpro`  
**Current implementation source:** `angellllkr-eng/resellerpro-platform`  
**Status:** CONSOLIDATION IN PROGRESS

This repository is the single organization destination for ResellerPro. The larger personal implementation has been verified as the current source candidate and must be migrated/absorbed here before this repository is treated as the production implementation.

## Source-of-truth rule

There must be exactly one active ResellerPro implementation.

Until the migration is completed:
- Do not create new ResellerPro implementations.
- Do not split features between this repository and `angellllkr-eng/resellerpro-platform`.
- Treat `angellllkr-eng/resellerpro-platform` as a **source-freeze migration source**, not a second product.
- Preserve unique useful code, documentation and evidence during migration.
- Do not claim production runtime health from repository state alone.

## Runtime policy

Target release path:

**GitHub → validation → ResellerPro → Cloudflare Workers/OpenNext → smoke/health → evidence**

Vercel is legacy evidence only.

## Security

Credentials, customer data, payment secrets and provider secrets must remain outside Git history and in the approved secret-management layer.

## Migration state

The organization destination is intentionally kept explicit so repository names no longer imply two products. The remaining work is content transfer/reconciliation and final repository-administration cleanup (archive/rename/delete) where supported.

Reference source:
https://github.com/angellllkr-eng/resellerpro-platform
