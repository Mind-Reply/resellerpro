# ResellerPro — Platform-First Release Architecture

Status: EXECUTION STANDARD

## Decision

ResellerPro is released as its own platform first. Domain, commerce, BI, operations, deployment and regional capabilities are modules of that platform, not parallel products competing for the same control surface.

The platform core owns identity, workspace boundaries, authorization, configuration, eventing, audit/evidence, provider adapters, billing abstraction, navigation, search, notifications and release-state semantics.

Modules consume those platform primitives.

## Core versus modules

### Platform core
- Workspace and customer identity
- Session and authorization boundary
- Role and permission model
- Configuration and feature flags
- Global search and command surface
- Notifications and action center
- Event/audit log
- Evidence records and verification state
- Provider connection registry
- Billing abstraction and Stripe integration boundary
- Job/execution state
- Error/recovery model
- Shared responsive UI system
- Health and release gates

### Commerce module
- Products
- Quotes
- Cart
- Orders
- Invoices
- Refund/settlement state
- Checkout

### Domain module
- Domain portfolio
- Availability/quotes
- Registration and renewal operations
- DNS
- Provider state
- Expiry and transfer workflows

### Operations module
- Services
- Deployments
- Environments
- Jobs
- Runtime checks
- Incident/recovery workflows

### BI module
- Revenue and billing analytics
- Customer and lifecycle analytics
- Acquisition analytics
- Product/service performance
- Operational health
- Evidence freshness

### Regional module
- Country/market configuration
- Currency/tax/legal configuration
- Localized catalog and language
- Provider availability
- Regional execution rules

## Stripe boundary

Stripe is the financial system of record for Stripe-owned payment objects. ResellerPro remains the product system of record for workspace context, authorization, business workflow, operational state and evidence.

ResellerPro must not duplicate Stripe as a second payment processor. It should persist only Stripe identifiers and business projections required for product workflows and reconciliation.

Stripe webhooks are external events. Handlers must be signature-verified, idempotent and auditable. A webhook receipt is not by itself proof that a business workflow completed; resulting state must be reconciled.

Stripe Billing/Checkout should power direct ResellerPro subscriptions and checkout where applicable. Stripe Connect is not part of the platform core unless ResellerPro later becomes a two-sided platform where customer businesses receive payments through ResellerPro.

## Release sequence

1. Platform kernel
2. Identity/workspace/authorization
3. Billing and commerce foundation
4. Evidence/audit and event model
5. Shared operator UX
6. Domains
7. Operations/deployments
8. BI
9. Regional packs
10. Advanced provider orchestration

Each stage must pass type-check, tests, build and applicable runtime verification before being called released.

## UX contract

The first screen should answer:
- Where am I?
- What changed?
- What needs attention?
- What can I do next?
- What evidence supports the state?

Mobile is a first-class operator surface, not a compressed desktop dashboard.

## Truth contract

Never show a synthetic KPI, fake runtime state, fabricated provider health, invented revenue or unverified deployment as live.

Every operationally important state has source, observedAt, verification method, scope and limitation.

## Platform-ready gate

ResellerPro is platform-ready only when a new module can be added without creating a parallel identity model, billing model, audit model, provider registry, navigation system or evidence system.

That is the architecture gate for every subsequent module.
