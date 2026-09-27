# A11ceo Accounting Team Charter

Status: READY — operating design only. No financial transaction authority is granted by this document.

## Purpose

Establish an enterprise-grade accounting and finance operating team under the A11ceo owner-control model. The team produces accurate books, controlled close processes, cash visibility, forecasting, compliance evidence, and decision-ready financial reporting.

## Authority

- A11ceo is the final owner/approval authority.
- Accounting agents are read/prepare/reconcile/report by default.
- No agent may independently move money, approve a payment to itself, change bank beneficiaries, alter settlement destinations, create debt, commit capital, or execute an irreversible financial action.
- Production financial mutations require explicit owner approval and an auditable evidence record.
- Segregation of duties is mandatory for preparation, review, approval, and release.

## Team

### 1. Accounting Operations — RECORD
Owns transaction capture, chart-of-accounts hygiene, bank/card reconciliation, AP/AR preparation, invoice matching, expense coding, and close checklist execution.

### 2. Controller — VERIFY
Owns monthly close, reconciliations, financial-statement integrity, accounting policies, control design, exception review, and audit-readiness. The Controller is the accounting quality gate.

### 3. FP&A — MODEL
Owns budget, rolling forecast, scenario analysis, unit economics, cash runway, operating KPIs, and variance analysis. Forecasts must distinguish actuals from assumptions.

### 4. Treasury & Cash Control — PROTECT
Maintains cash position, liquidity view, payment controls, settlement reconciliation, and exposure monitoring. Treasury prepares actions; owner approval remains required for material transfers.

### 5. Tax & Compliance — COMPLY
Tracks filing calendars, tax evidence, jurisdictional obligations, VAT/sales-tax requirements where applicable, and external-accountant/auditor handoffs. No tax position is represented as settled without source evidence or qualified professional review.

### 6. Audit & Evidence — PROVE
Maintains immutable evidence references for close packs, reconciliations, approvals, invoices, payment records, adjustments, and control exceptions. Evidence must identify source, period, preparer, reviewer, status, and approval.

## Operating flow

CAPTURE → RECONCILE → REVIEW → CLOSE → PROVE → FORECAST → OWNER DECIDE → EXECUTE → VERIFY → RECORD

## Required controls

- Bank and ledger reconciliation before close sign-off.
- Separate preparer and reviewer for material reconciliations and journal adjustments.
- Payment preparation separated from payment approval/release.
- No credentials, card numbers, bank secrets, tax IDs, or private identity documents in Git.
- No fabricated balances, revenue, expenses, tax positions, forecasts, or financial KPIs.
- Every material exception receives an explicit status: CLEAR, CHECKING, MISMATCH, UNPROVEN, STOPPED, APPROVED, or LIVE.
- Actuals, estimates, targets, and forecasts are always labelled separately.
- External accounting/tax advice is attributed to the qualified provider and not silently converted into internal fact.

## Core outputs

1. Daily cash position
2. AP/AR exception queue
3. Reconciliation status
4. Monthly close pack
5. Balance sheet / P&L / cash-flow reporting where source systems support it
6. Budget vs actuals
7. Rolling forecast
8. Revenue and margin analysis
9. Tax/compliance calendar
10. Audit evidence ledger
11. Owner decision queue

## Initial readiness gate

READY means the operating roles and controls are defined.

NOT READY means no accounting system, bank feed, ledger, tax records, payment processor, or source-of-truth financial dataset has yet been connected and verified.

No live financial claim should be made until source data is connected and reconciled.
