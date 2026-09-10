# ResellerPro — Ledger Control Plane

Status model: `VERIFIED | READY | BLOCKED | FAILED | UNVERIFIED`

## Ledger priority

The ledger is the highest-priority operational register. Every material commerce, provisioning, renewal, membership, automation, recommendation, and recovery event gets an immutable-style append-only record with a stable event ID, timestamp, actor, scope, decision, amount, currency, evidence pointer, and outcome.

### Priority order

1. Safety / payment / ownership boundary
2. Transaction integrity and reconciliation
3. Provisioning and service continuity
4. Renewal and expiry risk
5. Margin and pricing intelligence
6. Shopping / purchase opportunities
7. Membership / recurring-service opportunities
8. Content, visibility and growth signals

## Owner-only shopping lane

Shopping and purchasing are enabled as an **owner-only queue**. The system may discover products, compare prices, calculate landed cost, watch availability, detect price changes, prepare a cart/request, and recommend a purchase. It must not place an order, accept terms, spend funds, or create a recurring charge without an explicit owner approval event.

Required purchase record:

- `purchase_id`
- `owner_scope`
- `item`
- `vendor`
- `url`
- `quantity`
- `unit_price`
- `total_estimate`
- `currency`
- `shipping_estimate`
- `tax_estimate`
- `renewal_or_membership_terms`
- `reason`
- `alternatives`
- `approval_state`
- `approved_at`
- `executed_at`
- `evidence`

## Membership lane

Memberships/subscriptions use the same ledger. Track start date, renewal date, cadence, current price, cancellation terms, utilization, owner value score, and next action. Renewal may be recommended automatically; recurring payment may not be silently initiated.

## Signal layer

Track upstream intent signals before ranking/traffic movement:

- ICP intent and demand shifts
- retrieval/recommendation visibility
- mentions and sentiment
- video and third-party validation
- competitor pricing and product movement
- domain/hosting demand
- renewal and portfolio risk

The signal layer feeds recommendations; recommendations never bypass the approval boundary.

## Competitive operating promises

- Every transaction is provable.
- Every decision exposes margin and assumptions.
- Every workflow has a visible state and recovery path.
- Every customer-facing action has an accountable owner/system actor.
- One workspace should expose domain → hosting → billing → deployment → support → operations.
- Regional storefronts share one canonical operational truth.

## Claims discipline

Do not publish claims such as zero failures, zero refunds, or superiority versus a named competitor unless the ledger contains the measurement definition, time window, population, denominator, and evidence source.

## Recovery

A failed or ambiguous event becomes `FAILED` or `UNVERIFIED`; it is never silently converted to success. Reconciliation runs must be able to link the original event and the recovery event.
