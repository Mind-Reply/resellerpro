# ResellerPro Supabase Baseline

Project: `resellerpro-prod`
Ref: `ngrbwntxnyapzwtierpf`
Observed: 2026-09-25

## VERIFIED

- Project status: ACTIVE_HEALTHY.
- PostgreSQL: 17.6.1.166.
- Public tables inspected: all listed tables have RLS enabled.
- Edge functions: none currently listed.
- Existing policies were found on `Workspace` and `WorkspaceMember`.

## SECURITY FINDING

Supabase security advisors report 15 public tables with RLS enabled but no policies. This is not automatically a defect: a table may intentionally have no client-access policy. It does mean the access model must be explicitly reviewed before any public Data API exposure or application feature is declared complete.

Affected tables include:
`AcquisitionEvent`, `AuditEvent`, `Cart`, `CartItem`, `Consent`, `Customer`, `DnsRecord`, `Domain`, `DomainOperation`, `Invoice`, `Order`, `Quote`, `Service`, `SupportTicket`, `WebhookEvent`.

## SAFE NEXT ACTION

Map each table to its intended actor and operation before writing policies. Do not create broad `authenticated` policies merely to silence the advisor.

## Performance findings

The performance advisor currently reports three unused indexes:
- `idx_domain_operation_pending_claim`
- `idx_quote_active_expiry`
- `WorkspaceMember_userId_idx`

Do not delete them solely from the advisor result; verify query workload first.

## Release gate

Database changes remain owner-gated. No schema or RLS mutation was performed by this baseline.
