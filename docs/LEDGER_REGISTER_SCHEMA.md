# Canonical Ledger Register Schema

Every important operation is represented by one normalized event.

```text
operation_id       stable idempotency key
parent_operation   optional causal operation
occurred_at        UTC timestamp
actor_type         owner | customer | system | worker | vendor
actor_id           scoped identifier; never secret
region             canonical market code
entity_type        domain | hosting | order | invoice | payment | deployment | ticket | purchase | membership | signal
entity_id          scoped entity identifier
action              discover | quote | checkout | provision | renew | reconcile | recommend | approve | execute | recover | cancel
status              VERIFIED | READY | BLOCKED | FAILED | UNVERIFIED
amount              nullable numeric
currency            nullable ISO currency
margin              nullable numeric
risk_score          nullable numeric
approval_required   boolean
approval_id         nullable
vendor_ref          nullable external reference
evidence_refs       list of immutable evidence references
input_hash          normalized input hash
output_hash         normalized result hash
error_code          nullable normalized error
next_action         nullable operator/recommendation
created_at          UTC timestamp
```

## Integrity rules

- `operation_id` is unique and idempotent.
- Financial events require currency and evidence references.
- `VERIFIED` requires an independent verification result.
- `FAILED` and `UNVERIFIED` remain visible until reconciled.
- Evidence references must not contain secrets, payment credentials, or unnecessary personal data.
- Corrections are new events; historical events are not silently rewritten.
