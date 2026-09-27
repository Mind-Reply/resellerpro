"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const nav = ["Overview", "Analytics", "Billing", "Account", "Apps", "Websites", "Agents", "Domains", "Commerce", "Operations", "Growth", "Integrations", "Settings"];

const pageLinks: Record<string, string> = {
  Analytics: "/workspace/analytics",
  Billing: "/workspace/billing",
  Account: "/workspace/account",
};

const cards = {
  Overview: [
    ["Workspace", "One place for creation, deployment and operation.", "READY"],
    ["Business intelligence", "Persisted commerce, customer, service and acquisition signals.", "READY"],
    ["Account & billing", "Subscriptions, checkout and transactions live behind the account boundary.", "READY"],
    ["Release rail", "Source → Build → Approve → Execute → Verify → Record.", "GOVERNED"],
    ["Evidence", "Attach proof to material outcomes before they become claims.", "TRACEABLE"],
    ["Provider layer", "Adapters remain replaceable behind the product contract.", "NEUTRAL"],
  ],
  Analytics: [
    ["Revenue", "Persisted paid invoice and order signals, never invented telemetry.", "READY"],
    ["Customers", "Workspace-scoped customer counts and activity.", "READY"],
    ["Acquisition", "Campaign, source and event evidence from persisted records.", "READY"],
    ["Operations", "Services, domains and invoices connected to the same workspace.", "READY"],
  ],
  Billing: [
    ["Plans", "Provider-backed commercial plan catalog.", "READY"],
    ["Checkout", "Stripe subscription checkout remains fail-closed until configured.", "GATED"],
    ["Subscription", "Current account subscription is read from persisted state.", "READY"],
    ["Transactions", "Checkout and invoice history are recorded per customer.", "READY"],
  ],
  Account: [
    ["Identity", "Secure HTTP-only account sessions.", "READY"],
    ["Workspace", "Each customer session is bound to one workspace.", "READY"],
    ["Sign in", "Email/password account access with server-side verification.", "READY"],
    ["Sign out", "Server-side cookie invalidation, no localStorage token.", "READY"],
  ],
  Apps: [
    ["Create app", "Start a product surface with auth, data and release boundaries.", "READY"],
    ["Data model", "Define records, relationships and permissions before launch.", "DESIGN"],
    ["Release", "Prepare a candidate build and route it through approval.", "GOVERNED"],
    ["Operate", "Keep health, usage and evidence beside the product.", "READY"],
  ],
  Websites: [
    ["Visual builder", "Compose pages, sections and responsive layouts.", "READY"],
    ["Brand controls", "Set typography, spacing, colors and reusable sections.", "READY"],
    ["Domain connect", "Connect a verified domain through the provider layer.", "GATED"],
    ["Publish", "Promotion remains separate from runtime verification.", "GOVERNED"],
  ],
  Agents: [
    ["Agent studio", "Define purpose, tools, boundaries and approval requirements.", "READY"],
    ["Tool access", "Connect only the systems the agent is explicitly allowed to use.", "CONTROLLED"],
    ["Action queue", "Prepared actions stop for approval when they are consequential.", "GOVERNED"],
    ["Evidence", "Record what was requested, executed and observed.", "TRACEABLE"],
  ],
  Domains: [
    ["Portfolio", "Organise names, renewal state and provider ownership.", "READY"],
    ["Lookup", "Connect a registrar adapter for authoritative availability.", "GATED"],
    ["DNS", "Prepare intent before any DNS mutation is permitted.", "GATED"],
    ["Transfers", "Keep transfer status and authorization evidence together.", "GATED"],
  ],
  Commerce: [
    ["Catalog", "Define products and offers without inventing provider prices.", "READY"],
    ["Quote", "A quote becomes an offer only when a current source exists.", "GATED"],
    ["Checkout", "Payment execution is separated from order intent.", "GATED"],
    ["Settlement", "Executed is not settled until reconciliation completes.", "GOVERNED"],
  ],
  Operations: [
    ["Deployments", "See candidates, releases, health and rollback state.", "READY"],
    ["Workflows", "Prepare bounded operational actions.", "READY"],
    ["Health", "Expose runtime checks beside release state.", "VERIFY"],
    ["Evidence ledger", "Preserve the proof trail for material operations.", "TRACEABLE"],
  ],
  Growth: [
    ["SEO / GEO", "Scan discoverability and prioritise concrete fixes.", "READY"],
    ["Social", "Prepare channel-specific content from approved source material.", "READY"],
    ["Analytics", "Use the persisted BI surface rather than invented metrics.", "READY"],
    ["Optimisation", "Turn observed friction into an actionable change.", "READY"],
  ],
  Integrations: [
    ["GitHub", "Source and release integration with explicit repository scope.", "CONNECT"],
    ["Cloudflare", "Runtime and edge execution through the approved deployment path.", "CONNECT"],
    ["Stripe", "Commerce adapter kept fail-closed until configured and verified.", "GATED"],
    ["Data", "Connect the selected persistence layer with access boundaries.", "GATED"],
  ],
  Settings: [
    ["Identity", "Workspace roles and owner permissions.", "CONTROLLED"],
    ["Environments", "Separate development, preview, staging and production.", "CONTROLLED"],
    ["Secrets", "Reference environment-scoped secrets without exposing values.", "CONTROLLED"],
    ["Audit", "Review material actions and evidence records.", "TRACEABLE"],
  ],
} as const;

export default function Workspace() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const rows = useMemo(
    () => cards[active as keyof typeof cards].filter((x) => x.join(" ").toLowerCase().includes(query.toLowerCase())),
    [active, query],
  );

  return (
    <main className="ws">
      <header className="ws-top">
        <Link href="/" className="ws-brand"><span>RP</span> ResellerPro</Link>
        <div className="ws-top-state"><i /> PLATFORM SURFACE / CONTROLLED</div>
        <Link href="/" className="ws-back">← Home</Link>
      </header>
      <div className="ws-shell">
        <aside className="ws-side">
          <small>WORKSPACE</small>
          {nav.map((item) => (
            <button key={item} className={item === active ? "active" : ""} onClick={() => setActive(item)}>{item}</button>
          ))}
        </aside>
        <section className="ws-main">
          <div className="ws-heading">
            <div>
              <p>RESELLERPRO / {active.toUpperCase()}</p>
              <h1>{active === "Overview" ? "The operating surface." : active}</h1>
              <span>State is explicit. Unverified capability stays gated.</span>
            </div>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Filter modules" />
          </div>
          <div className="ws-grid">
            {rows.map(([title, text, state]) => (
              <article key={title}>
                <div className="ws-card-top"><span>{state}</span><b>•••</b></div>
                <h2>{title}</h2>
                <p>{text}</p>
                {pageLinks[active] ? (
                  <Link href={pageLinks[active]} className="inline-block pt-3 text-sm font-medium">Open surface →</Link>
                ) : (
                  <button className="pt-3 text-left text-sm font-medium">Open surface →</button>
                )}
              </article>
            ))}
          </div>
          <div className="ws-rail">
            <div><small>RELEASE RAIL</small><strong>Source</strong><strong>Build</strong><strong>Approve</strong><strong>Execute</strong><strong>Verify</strong><strong>Record</strong></div>
            <p>Material execution is designed to stop at the right boundary rather than silently crossing it.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
