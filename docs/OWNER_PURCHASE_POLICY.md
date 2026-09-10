# Owner Purchase & Membership Policy

## Scope

This policy covers shopping, equipment, software, services, memberships, subscriptions and renewals initiated through ResellerPro for the owner.

## Allowed without approval

- Search and discovery
- Price comparison
- Availability monitoring
- Price-drop alerts
- Cart/request preparation
- Cost and margin calculations
- Renewal reminders
- Cancellation-window reminders
- Draft purchase plans

## Approval required

- Placing an order
- Paying an invoice
- Starting or renewing a membership/subscription
- Accepting vendor terms
- Creating recurring charges
- Buying a domain/service with a non-trivial contractual commitment

## Required approval evidence

`approval_id`, `purchase_id`, exact item/service, vendor, total/max spend, currency, recurrence, approval timestamp, and approving owner identity.

Approval must be explicit and specific. A recommendation, previous purchase, or scheduled job is not approval.

## Hourly behavior

The hourly watcher may re-price candidates and surface the best current option. It may not convert a watcher result into a transaction automatically.

## Privacy

Shopping history and membership information is owner-scoped. Do not expose it in public dashboards, public repositories, customer analytics, or model prompts unless explicitly required and authorized.
