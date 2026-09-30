# ResellerPro — Platform-First Release Architecture

Status: EXECUTION STANDARD

## Decision

ResellerPro is its own platform first. Its primary business is **domain infrastructure**: domain registration/renewal and hosting services operated through ResellerPro's own registrar and hosting-provider capabilities.

Services, executions and deployments are first-class execution layers around that core—not the product identity.

The platform therefore has one operating model:

**Domain → Provider → Service → Execution → Deployment → Runtime → Evidence**

The platform core owns identity, workspace boundaries, authorization, configuration, provider control, billing abstraction, eventing, audit/evidence, execution state, navigation, search, notifications and release-state semantics.

## Primary business surfaces

### Domain
The primary customer/business surface:
- Domain search and availability
- Registration
- Renewal
- Transfer
- DNS
- Nameservers
- Domain lifecycle
- Expiry and auto-renewal
- Domain portfolio
- Domain-level billing and service state

### Provider
The underlying first-party infrastructure capability:
- Registrar operations
- Hosting accounts and plans
- DNS infrastructure
- Nameserver infrastructure
- Hosting resources
- Provisioning
- Resource lifecycle
- Provider credentials and connection references
- Provider health and capacity
- Provider-level audit/evidence

Provider state must be authoritative for infrastructure state. Secrets themselves are never exposed in the UI or persisted as displayable values.

## Execution graph

The product should model operations as a graph rather than unrelated screens:

**Domain**
→ **Provider**
→ **Service**
→ **Execution**
→ **Deployment**
→ **Runtime state**
→ **Evidence**

A domain can have multiple services. A service can have multiple executions. An execution can produce one or more deployments. Deployments expose runtime observations. Evidence records the source and verification of each important state.

This graph becomes the backbone for BI, operations and customer support.

## Services

Services represent what ResellerPro operates for a customer or workspace, for example:
- Domain registration
- Domain renewal
- DNS
- Hosting
- SSL
- Email
- Managed application/service
- Other approved infrastructure products

A service is a durable business object. It should not be confused with an individual execution or deployment.

## Executions

Executions represent actions performed against a service/provider:
- Register domain
- Renew domain
- Provision hosting
- Configure DNS
- Issue/renew certificate
- Deploy application
- Scale resource
- Suspend/resume service
- Recover failed operation

Executions require idempotency, authorization, status, attempts, timestamps, provider references and auditable outcomes.

## Deployments

Deployments represent released infrastructure/application state:
- Target
- Environment
- Version/build
- Provider resource
- Release status
- Health checks
- Rollback/recovery state
- Evidence

A deployment is not equivalent to an execution. An execution is an action; a deployment is the resulting released state.

## Commerce and billing

Commerce supports the domain/provider business:
- Products and plans
- Quotes
- Cart
- Orders
- Invoices
- Subscriptions
- Refund/settlement state
- Checkout

Stripe remains the financial system of record for Stripe-owned payment objects. ResellerPro owns product/workspace workflow, domain/service state, execution state and evidence.

Stripe webhooks must be signature-verified, idempotent and auditable. A webhook receipt is not proof that a domain/service operation completed.

Stripe Connect remains deferred unless the business model becomes a two-sided payment platform.

## BI

BI sits above the graph and reports only observed state:
- Domain portfolio
- Provider health
- Service inventory
- Execution success/failure
- Deployment state
- Revenue and billing
- Customer lifecycle
- Capacity and operational health
- Evidence freshness

No synthetic KPI or simulated runtime state.

## Regional expansion

Country/market packs configure:
- Currency
- Tax/legal rules
- Language
- Product availability
- Provider availability
- Local execution rules

Regional configuration must not silently change the underlying domain/provider operating model.

## UX contract

The primary navigation should make the operating model obvious:

**Overview · Domains · Providers · Services · Executions · Deployments · Commerce · Analytics · Evidence · Settings**

The first screen should answer:
- Where am I?
- What changed?
- What needs attention?
- What can I do next?
- What evidence supports the state?

Mobile is a first-class operator surface.

## Truth contract

Never show synthetic revenue, fake provider health, fabricated domain availability, invented runtime state or unverified deployment as live.

Every important operational state has:
- source
- observedAt
- verification method
- scope
- limitation

## Platform-ready gate

ResellerPro is platform-ready when a new domain/provider service can be added without creating a parallel identity model, billing model, provider model, execution model, deployment model, navigation system or evidence system.

That is the architecture gate for every subsequent capability.
