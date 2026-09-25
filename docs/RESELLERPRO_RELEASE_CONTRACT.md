# ResellerPro Release Contract

This document supersedes provider-specific deployment instructions that claim a deployment is live merely because a command completed.

## Release packet

Every production release must bind:
- repository and commit SHA
- build/test result
- artifact identity
- requested environment
- exact release scope
- owner approval
- provider deployment identifier
- canonical URL
- post-release health result
- rollback reference

## Completion

`PREPARED -> APPROVED -> RELEASED -> URL VERIFIED -> HEALTH VERIFIED -> COMPLETE`

If any evidence is missing, status remains `BLOCKED` or `UNVERIFIED`.

## Provider rule

ResellerPro is the intended release/control surface for this project. No new production dependency on Vercel, Netlify or Railway is to be introduced.

Provider commands or API endpoints must be taken from the connected ResellerPro implementation/provider documentation; they must not be invented.

## Safety

Never print secrets. Never rotate credentials during a routine release. Never change DNS, billing state or external integrations without an explicit owner-approved release packet.
