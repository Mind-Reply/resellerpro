# ResellerPro — BI Platform Release Specification

## Objective
Build ResellerPro as a single, modern, operator-friendly business and infrastructure platform. The BI layer is a first-class product surface, not a decorative dashboard.

## Primary navigation
Overview · Domains · Commerce · Customers · Deployments · Infrastructure · Analytics · Evidence · Settings

## Overview
Show only observed metrics: active domains, orders, recurring revenue, deployment state, infrastructure health, unresolved actions and evidence freshness. Every metric has a source and timestamp.

## Commerce BI
Orders, subscriptions, invoices, refunds, tax, revenue trend, MRR/ARR where the underlying billing data supports it, customer cohorts and product performance. No synthetic values.

## Domain BI
Portfolio, renewals, expiry risk, registrar/provider status, DNS state, transfer state and bulk actions.

## Deployment BI
Projects, environments, builds, release history, failures, rollback actions, runtime health and evidence. Deployment status is derived from actual provider/runtime checks.

## Customer BI
Workspace/customer records, lifecycle, activity, subscriptions, support state and account health. Protect personal data and enforce workspace authorization.

## Infrastructure
Provider connections, services, environments, secrets references, jobs, health checks and incidents. Never display secret values.

## Evidence
Every critical production metric and state should expose: source, observation timestamp, related object, verification method and limitations.

## UX principles
- One clear primary action per page.
- Progressive disclosure instead of dashboard clutter.
- Responsive mobile-first operation.
- Keyboard accessible tables and commands.
- Fast filtering/search across dense records.
- Empty states explain the next action.
- Errors explain recovery, not just failure.
- Destructive actions require explicit confirmation.
- Public pages never expose owner/private infrastructure data.

## Syncfusion boundary
Evaluate Syncfusion React DataGrid/Charts for high-density operational data and analytics. Keep the existing visual language around them. Add only after licensing, bundle impact, accessibility and workflow fit are verified. Do not introduce Syncfusion into edge runtimes or core business services.

## Release gates
1. Type-check.
2. Unit tests.
3. E2E critical flows.
4. Migration validation.
5. Production-config validation.
6. Build/OpenNext validation.
7. Deployment.
8. Live health/smoke verification.
9. Evidence record with commit and timestamp.

## Critical E2E paths
Visitor → product/pricing → account → checkout test mode → workspace → domain search → domain record → deployment → analytics → evidence.

## Definition of done
A feature is complete only when its UI, API/service layer, persistence model, authorization, error handling, tests, responsive behavior and runtime verification all exist. A page containing placeholder metrics is not complete.
