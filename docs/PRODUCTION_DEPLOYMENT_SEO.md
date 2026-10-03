# ResellerPro — Deployment & International SEO Contract

Status: CANONICAL / CONTROLLED

## Runtime authority

The production path is:

`GitHub main → validation → ResellerPro release → Cloudflare/OpenNext → smoke/health verification → evidence`

Vercel is not a production deployment target for this repository.

## Domain strategy

Domain availability, ownership and pricing are provider facts. This repository does not claim that a domain is available, registered or priced until a current provider/registrar response proves it.

Default market structure:
- root host for the canonical global surface;
- country subdomains for localized markets when the domain/DNS evidence exists;
- locale-aware paths are acceptable where subdomains are not operationally justified;
- ccTLDs only after verified ownership and renewal controls.

Browser language is a presentation hint. It must not silently change billing currency, tax, legal terms or fulfilment country.

## SEO / international rules

Each public market should carry:
- canonical URL;
- appropriate locale metadata;
- hreflang relationships where multiple locale URLs exist;
- localized title/description copy;
- localized transactional and support strings after review;
- no fabricated metrics, rankings, testimonials or availability claims.

## Platform sections

The canonical workspace now has real surfaces for:
- Analytics;
- Account;
- Billing;
- Commerce;
- Domains;
- Operations;
- Growth;
- Integrations.

Analytics reads persisted platform records. It does not fabricate live telemetry.

## Deployment evidence

A release is not represented as LIVE merely because the repository builds. Evidence should include:
- commit SHA;
- deployment identifier;
- canonical hostname;
- timestamp;
- health response;
- critical-route smoke results;
- rollback reference.

## Legacy material

Older provider comparisons or historical SEO drafts may mention other platforms. They are informational only and must not be treated as the current deployment contract.
