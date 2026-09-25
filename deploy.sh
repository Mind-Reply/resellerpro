#!/bin/bash
# RESELLERPRO RELEASE PREPARATION
# Provider-side production deployment is intentionally not performed by this script.
# It prepares deterministic evidence and stops before irreversible release actions.

set -euo pipefail

echo "RESELLERPRO RELEASE PREPARATION"
echo "==============================="

pnpm release:check

echo
echo "READY: deterministic validation passed."
echo "BLOCKED: provider-side production release requires the owner-gated ResellerPro release path."
echo "Do not substitute Vercel, Netlify, Railway or another provider command."
echo "Record the provider deployment ID, canonical URL and runtime health check before marking COMPLETE."
