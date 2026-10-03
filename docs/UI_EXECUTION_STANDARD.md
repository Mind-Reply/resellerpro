# ResellerPro UI Execution Standard

## Product character
Premium, calm, fast and operational. The interface should feel like a modern control product, not a hosting-panel clone.

## Shell
Responsive top bar + collapsible navigation + command/search entry + workspace context + notification/action tray. Mobile must remain fully usable without horizontal scrolling.

## Page grammar
Every page follows: context → primary action → current state → work surface → supporting detail → evidence/recovery.

## Tables
Use server-side pagination/filtering for large datasets. Persist useful view state. Support keyboard navigation, column visibility, density controls and export only where appropriate.

## Charts
Charts answer a question. Each chart has a title, period, unit, source timestamp and empty/error state. Never render a chart from fabricated data.

## Forms
Typed validation, inline errors, disabled/loading state, optimistic updates only when rollback is safe, and explicit success confirmation.

## Security UX
Sensitive values are masked. Privileged actions require confirmation and authorization. Audit-sensitive mutations show who/what/when after success.

## Responsive requirement
Desktop, tablet and mobile layouts are designed as one system. Critical operations must remain possible on a phone.

## Accessibility
Semantic HTML, visible focus, keyboard operation, adequate target sizes, labels and status announcements for asynchronous operations.

## Performance
Prefer Server Components for data-first pages. Keep client boundaries narrow. Avoid loading enterprise component suites on pages that do not use them. Lazy-load heavy analytics/interaction modules.
