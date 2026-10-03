# ResellerPro — Unified BI Platform

Status: CANONICAL IMPLEMENTATION

The organization repository `Mind-Reply/resellerpro` is the single source for the simplified combined ResellerPro platform.

## Unified surface

One workspace now connects:

- domains and provider operations;
- customer identity and workspace scope;
- orders, invoices and commerce state;
- subscription plans and controlled Stripe checkout;
- transaction history and idempotent Stripe webhooks;
- acquisition event records;
- persisted business intelligence;
- deployment, evidence and release governance.

## Account model

Customer authentication uses a signed HTTP-only session cookie bound to a customer and workspace. The browser never stores an account bearer token in localStorage.

## Billing model

Stripe billing is fail-closed by default:

`STRIPE_BILLING_MODE=disabled`

Checkout is enabled only when the deployment contains the required Stripe secret, webhook secret and plan price IDs. Webhook events are persisted through the existing `WebhookEvent` table and ignored safely when already processed.

## BI model

Analytics are derived from persisted records. The platform does not invent revenue, customer, acquisition or operational numbers. The current analytics endpoint reads customers, domains, orders, invoices, services and acquisition events scoped to the authenticated workspace.

## International model

Market and locale configuration remains configuration-driven. Country/browser language must not silently change billing currency, tax, legal terms or fulfillment country.

## Provider model

Production authority remains:

`GitHub → validation → ResellerPro → Cloudflare/OpenNext → smoke/health → evidence`

No repository commit is itself proof of a LIVE deployment.
