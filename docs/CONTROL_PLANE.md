# ResellerPro Control Plane

Status: ACTIVE / OWNER-GATED

ResellerPro is the first execution surface in the multi-project rollout. GitHub remains the source of truth for versioned work. Supabase is the state/evidence layer where a project has been explicitly bound to it.

## Release rule

`CHANGE -> VALIDATE -> RECORD EVIDENCE -> OWNER APPROVAL -> PROVIDER RELEASE -> VERIFY URL/HEALTH -> COMPLETE`

No provider-side deployment is claimed without provider-side evidence.

## Execution boundaries

Allowed without a production release:
- inspect repository and runtime configuration
- create isolated branches
- implement reversible code and documentation changes
- run deterministic validation
- record evidence and blockers
- prepare provider-specific release packets

Owner-gated:
- production deployment
- DNS/domain changes
- payment settlement or live billing changes
- secret rotation or exposure
- destructive migrations
- external commitments

## Platform mapping

| Capability | ResellerPro responsibility |
|---|---|
| Domains | registry and lifecycle state |
| Hosting | provider/project binding |
| Deployments | build, release packet, provider verification |
| URLs | canonical URL registry and health evidence |
| Billing | Stripe integration with explicit live gate |
| Evidence | hashes, release state, verification record |
| Projects | one bounded execution context per project |

## Truth standard

A URL is VERIFIED only when a provider-side deployment record and a successful runtime check both exist. A repository containing deployment configuration is not proof of deployment.

## Next platform handoff

After ResellerPro reaches READY, repeat the same control-plane pattern for the next confirmed platform/project. The phrase “Vera platform” is not mapped to an owned repository yet, so no external repository is assumed. NovaGaming is similarly held until its owned project is identified.
