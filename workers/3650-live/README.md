# 3650-live

Five-side proof runtime housed inside the canonical Mind-Reply/resellerpro repository.

Runtime contract:

- POST /proof/:id writes a proof record and returns only receipt_id.
- GET /proof/:id returns the narrow public receipt view.
- GET /monitor/public returns the latest Dubai public proof state.
- GET /health returns the worker readiness state.

The five configured hostnames and live.shipbythurs.day route through the same Worker.

## Deployment

Deploy this Worker with its own Wrangler config:

    npx --yes wrangler@4.135.0 deploy --config workers/3650-live/wrangler.json

Before deployment, replace YOUR_KV_ID with the real Cloudflare KV namespace ID for PROOF_VAULT. No credential or secret belongs in this file.

Runtime state:

- Source wiring: READY
- KV namespace: UNVERIFIED until the real namespace ID is supplied
- Live DNS/Worker response: UNVERIFIED until deployed and smoke-tested
