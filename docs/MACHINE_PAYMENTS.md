# Machine Payments — MPP + x402

## Purpose

ResellerPro is the canonical machine-payment service surface for paid API capabilities. Machine clients can pay per call without a browser checkout flow.

Protocols:

- **MPP** — Stripe Machine Payments Protocol. Supports Stripe Shared Payment Tokens for cards and supported on-chain payment methods.
- **x402** — HTTP 402 payment protocol for USDC on Base, settled through the configured facilitator and recorded in Stripe.

## Canonical flow

`Agent → ResellerPro API → 402 payment challenge → payment credential → settlement → service response → transaction/evidence record`

No new repository is created for machine payments.

## First paid capability

The first capability should be a small, deterministic ResellerPro API operation with a low per-call price. Recommended initial contract:

- MPP: USD 0.50 minimum for card/SPT-compatible calls.
- x402: USD 0.01 minimum for USDC/Base calls.
- Currency and amount are server-defined; clients cannot choose the settlement destination.
- Every successful settlement receives an idempotency key and a provider transaction/payment identifier.
- Payment credentials and provider secrets never enter source control, logs, client bundles, or application data.

## Runtime configuration

MPP:

- `STRIPE_SECRET_KEY`
- `STRIPE_PROFILE_ID`
- `TEMPO_DEPOSIT_ADDRESS`
- `MACHINE_PAYMENTS_MPP_ENABLED=true`

x402:

- `STRIPE_SECRET_KEY`
- `CDP_API_KEY_ID`
- `CDP_API_KEY_SECRET`
- `BASE_DEPOSIT_ADDRESS`
- `MACHINE_PAYMENTS_X402_ENABLED=true`

Secrets belong in the production secret store. The repository contains variable names and integration code only.

## Implementation source

Stripe's maintained machine-payment examples are the reference implementation:

- https://github.com/stripe-samples/machine-payments
- MPP TypeScript reference: `mpp/server/node-typescript`
- x402 TypeScript reference: `x402/server/node-typescript`

The implementation uses `mppx` for MPP and the `@x402/*` packages for x402. Do not copy the sample repository into ResellerPro; adapt the protocol boundary into this canonical repository.

## Evidence

A machine payment is commercially counted only when the provider settlement is real and the service response is associated with the settlement evidence.

Record at minimum:

- request timestamp
- capability/route
- protocol
- amount
- currency
- provider payment identifier or transaction hash
- idempotency key
- response outcome
- source commit
- deployment identity

Repository code alone does not constitute payment or revenue evidence.

## Owner boundary

Enabling machine payments changes a money-movement surface. Production activation requires the owner-controlled Stripe/secret-store configuration and an end-to-end payment receipt. Code preparation and test-mode validation can proceed independently.

## Verification states

Use:

- `IMPLEMENTED` — integration code exists and passes repository validation.
- `READY` — required production configuration is prepared.
- `LIVE` — a real machine payment has settled and the paid endpoint returned successfully.
- `FAILED` — an attempted integration or payment did not satisfy its contract.
- `UNVERIFIED` — no current runtime/payment evidence exists.

Do not use a `BLOCKED` label for this integration. Missing configuration is represented by the specific configuration item that still needs to be supplied.
