# ResellerPro — Hourly Automation Register

This register defines safe long-running automation. Schedules are proposals until connected runtime infrastructure exists.

| Cadence | Job | Purpose | Write boundary | Status |
|---|---|---|---|---|
| hourly | ledger-integrity | validate event IDs, timestamps, required fields and broken links | ledger/audit only | READY |
| hourly | commerce-reconciliation | compare orders, invoices, provisioning and payment states | ledger/reconciliation only | READY |
| hourly | domain-renewal-risk | scan expiry/renewal windows and surface risk | recommendations only | READY |
| hourly | margin-watch | detect pricing/margin changes and anomalies | recommendations only | READY |
| hourly | intent-signal-watch | capture ICP/retrieval/mention/sentiment/validation signals | signal store | READY |
| hourly | inventory-watch | monitor configured owner shopping candidates and price/availability changes | owner queue only | READY |
| hourly | membership-watch | monitor renewal dates, price changes, utilization and cancellation windows | owner queue only | READY |
| hourly | deployment-health | verify configured public endpoints and recent deployment state | evidence only | READY |
| hourly | failed-run-recovery | classify failed jobs and create recovery tasks | recovery queue only | READY |
| hourly | owner-digest | produce a concise priority digest from verified ledger events | owner read channel | READY |

## Guardrails

1. No secret values in logs or ledger entries.
2. No purchase execution without explicit owner approval.
3. No membership renewal without explicit owner approval unless a future policy explicitly grants that authority.
4. No destructive infrastructure action from the hourly loop.
5. No public claim is generated from an unverified metric.
6. Every job emits start, finish, status, evidence reference and error classification.
7. Retry with bounded backoff; never create duplicate transactions on retry.
8. Jobs must be idempotent using stable operation keys.
9. Regional processing is EU/CEE-first but must preserve a single canonical ledger.
10. Long-running operation is achieved through a real scheduler/worker deployment, not by a shell process assumed to survive indefinitely.
