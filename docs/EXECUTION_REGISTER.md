# ResellerPro — Execution Register

| ID | Priority | Work | State | Proof required |
|---|---|---|---|---|
| RP-001 | Critical | Canonical ledger + reconciliation | READY | persisted events + reconciliation result |
| RP-002 | Critical | Owner-only purchase/membership queue | READY | approval boundary + no autonomous spend |
| RP-003 | Critical | Long-running hourly worker architecture | READY | supervised scheduler + heartbeat |
| RP-004 | Critical | Commerce/provisioning recovery | READY | failed-state + recovery event |
| RP-005 | High | Margin transparency | READY | cost/revenue/margin calculations |
| RP-006 | High | Renewal-risk intelligence | READY | expiry scan + evidence |
| RP-007 | High | Intent/retrieval/validation signal layer | READY | timestamped signal records |
| RP-008 | High | Regional routing/localization model | READY | canonical data + locale configuration |
| RP-009 | Normal | Agency beachhead measurement | READY | baseline and outcome dataset |
| RP-010 | Normal | Competitive campaigns | BLOCKED | verified outcome evidence |

## Operating rule

Execute the smallest real change, verify it, record evidence, then continue. Documentation does not equal implementation. Runtime features remain `READY` until a real deployment and end-to-end test prove them.
