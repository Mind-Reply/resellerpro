# Repository Security and Execution Standard

## Authority
This repository is the commerce execution authority for ResellerPro. Its code, deployment configuration, credentials, customer data, billing logic, and operational evidence remain isolated from other repositories.

## Execution path
GitHub change -> validation -> build -> deployment through the approved ResellerPro execution path -> smoke checks -> runtime evidence.

## Privileged access
Every privileged actor must have an assigned responsibility, explicit scope, authorization level, and auditable identity. Access is least-privilege and repository-specific.

Protected actions require owner-approved controls where applicable:
- deployment configuration
- production credentials
- billing and payment configuration
- customer-data access
- domain changes
- destructive migrations
- access-policy changes

## Accountability
A material control bypass triggers immediate access suspension and incident review. Documented remediation costs, contractual remedies, indemnification, or enforceable contractual penalties may apply where expressly agreed and lawful. Financial consequences are proportionate and never replace technical security controls.

## Evidence
Each material execution records the repository, commit, actor, action, environment, timestamp, checks, deployment result, smoke result, and evidence reference.

## Separation
No credential, customer dataset, deployment authority, or internal control is shared with another repository unless explicitly authorized and documented.

## Current execution priority
ResellerPro is the primary deployment/execution path for this repository. Vercel is not treated as an execution authority for this workstream.
