# ResellerPro — unified platform integration contract

Status: IMPLEMENTED IN CANONICAL REPOSITORY

The canonical repository is Mind-Reply/resellerpro. The platform uses the simplified persisted account/workspace model rather than a parallel tRPC stack.

## Frontend integration

src/hooks/useResellerAccount.ts is the canonical React integration surface.

It provides:
- useAuth() — account discovery, login, registration, logout and session refresh;
- useSubscription() — plan discovery, subscription state and controlled Stripe checkout;
- useTransactions() — paginated transaction history and transaction lookup;
- useAnalytics() — persisted business-intelligence summary and refresh.

The browser uses the platform's HTTP-only session cookie. No bearer token is stored in localStorage.

## Endpoint mapping

| Capability | Canonical endpoint |
|---|---|
| Current account | GET /api/account/me |
| Login | POST /api/account/login |
| Register | POST /api/account/register |
| Logout | POST /api/account/logout |
| Plans | GET /api/billing/plans |
| Subscription | GET /api/billing/subscription |
| Checkout | POST /api/billing/checkout |
| Transactions | GET /api/transactions |
| Transaction | GET /api/transactions/:id |
| BI summary | GET /api/analytics/summary |

## Billing safety

Stripe remains fail-closed unless the deployment has mode-matching credentials, webhook verification and configured price IDs.

## BI truth

Analytics are calculated from persisted workspace-scoped records. No synthetic revenue, customer or acquisition metrics are generated.

## International behavior

Market configuration controls locale, currency and timezone. Browser language is a presentation hint only and cannot silently change tax, legal terms, billing currency or fulfilment country.

## Runtime authority

GitHub → validation → ResellerPro → Cloudflare/OpenNext → smoke/health → evidence.

Vercel is excluded from the production authority path.