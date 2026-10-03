"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

type Analytics = {
  generatedAt: string;
  source: string;
  summary: {
    customers: number;
    activeDomains: number;
    totalOrders: number;
    revenue: number;
    openInvoiceValue: number;
    activeServices: number;
  };
  revenueSeries: { date: string; value: number }[];
  acquisition: { totalEvents: number };
};

const nav = [
  ["Overview", "/workspace"],
  ["Analytics", "/workspace/analytics"],
  ["Billing", "/workspace/billing"],
  ["Account", "/workspace/account"],
  ["Domains", "#domains"],
  ["Commerce", "#commerce"],
  ["Operations", "#operations"],
  ["Settings", "#settings"],
] as const;

const surfaces = [
  ["Domains", "Portfolio, renewal state, provider ownership and DNS intent.", "READY", "domains"],
  ["Commerce", "Orders, invoices, subscriptions and settlement evidence.", "READY", "commerce"],
  ["Operations", "Release state, health checks and governed execution.", "VERIFY", "operations"],
  ["Analytics", "Persisted revenue, customer, acquisition and service signals.", "READY", "/workspace/analytics"],
  ["Billing", "Provider-backed plans, checkout and subscription state.", "READY", "/workspace/billing"],
  ["Evidence", "Trace material outcomes to an observation and source.", "TRACEABLE", "evidence"],
] as const;

const number = (value: number) => new Intl.NumberFormat("en-US").format(value);
const money = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article className="bi-metric"><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>;
}

export default function Workspace() {
  const [active, setActive] = useState("Overview");
  const [query, setQuery] = useState("");
  const [data, setData] = useState<Analytics | null>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    fetch("/api/analytics/summary", { cache: "no-store" })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload.error || "Analytics unavailable.");
        return payload as Analytics;
      })
      .then((payload) => { if (mounted) { setData(payload); setState("ready"); } })
      .catch((reason: unknown) => {
        if (mounted) { setError(reason instanceof Error ? reason.message : "Analytics unavailable."); setState("error"); }
      });
    return () => { mounted = false; };
  }, []);

  const filtered = useMemo(
    () => surfaces.filter(([title, description]) => `${title} ${description}`.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const recentRevenue = data?.revenueSeries.slice(-7).reduce((sum, item) => sum + item.value, 0) ?? 0;

  return (
    <main className="ws">
      <header className="ws-top">
        <Link href="/" className="ws-brand"><span>RP</span> ResellerPro</Link>
        <div className="ws-top-state"><i /> OBSERVED DATA / CONTROLLED</div>
        <Link href="/" className="ws-back">← Home</Link>
      </header>

      <div className="ws-shell">
        <aside className="ws-side">
          <small>WORKSPACE</small>
          {nav.map(([label, href]) =>
            href.startsWith("/") ? (
              <Link key={label} href={href} className={label === active ? "active" : ""} onClick={() => setActive(label)}>{label}</Link>
            ) : (
              <button key={label} className={label === active ? "active" : ""} onClick={() => setActive(label)}>{label}</button>
            ),
          )}
        </aside>

        <section className="ws-main">
          <div className="ws-heading">
            <div>
              <p>RESELLERPRO / BI CONTROL SURFACE</p>
              <h1>{active === "Overview" ? "Know what is happening." : active}</h1>
              <span>Persisted signals first. Unverified capability stays explicitly gated.</span>
            </div>
            <div className="ws-tools">
              <label htmlFor="surface-filter">Find a surface</label>
              <input id="surface-filter" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search modules" />
            </div>
          </div>

          {active === "Overview" ? (
            <>
              <section className="bi-metrics" aria-label="Observed workspace metrics">
                {state === "loading" && <div className="bi-status">Loading persisted workspace signals…</div>}
                {state === "error" && <div className="bi-status bi-error">UNAVAILABLE — {error}</div>}
                {state === "ready" && data && <>
                  <Metric label="Customers" value={number(data.summary.customers)} detail="workspace records" />
                  <Metric label="Active domains" value={number(data.summary.activeDomains)} detail="active / renewal due" />
                  <Metric label="Orders" value={number(data.summary.totalOrders)} detail="non-refunded orders" />
                  <Metric label="Revenue" value={money(data.summary.revenue)} detail="persisted order value" />
                  <Metric label="Open invoices" value={money(data.summary.openInvoiceValue)} detail="draft + open" />
                  <Metric label="Services" value={number(data.summary.activeServices)} detail="active / provisioning" />
                </>}
              </section>

              <section className="bi-proof">
                <div><small>OBSERVATION</small><strong>{data ? new Date(data.generatedAt).toLocaleString() : "Pending"}</strong><span>{data?.source ?? "Waiting for workspace authentication."}</span></div>
                <div><small>RECENT REVENUE</small><strong>{data ? money(recentRevenue) : "—"}</strong><span>Paid invoice value observed across the latest seven available days.</span></div>
                <div><small>ACQUISITION EVENTS</small><strong>{data ? number(data.acquisition.totalEvents) : "—"}</strong><span>Persisted events in the latest 30-day window.</span></div>
              </section>

              <div className="ws-section-title">
                <div><small>EXECUTION LAYERS</small><h2>One surface. Clear boundaries.</h2></div>
                <span>Source → Build → Approve → Execute → Verify → Record</span>
              </div>

              <div className="ws-grid">
                {filtered.map(([title, description, status, target]) => (
                  <article key={title}>
                    <div className="ws-card-top"><span>{status}</span><b>↗</b></div>
                    <h2>{title}</h2><p>{description}</p>
                    {target.startsWith("/") ? <Link href={target} className="ws-open">Open surface →</Link> : <button className="ws-open" onClick={() => setActive(title)}>Open surface →</button>}
                  </article>
                ))}
              </div>

              <div className="ws-rail">
                <div><small>RELEASE RAIL</small><strong>Source</strong><strong>Build</strong><strong>Approve</strong><strong>Execute</strong><strong>Verify</strong><strong>Record</strong></div>
                <p>Runtime health and evidence remain separate gates. A repository state is not presented as runtime proof.</p>
              </div>
            </>
          ) : (
            <section className="bi-placeholder">
              <span>{active.toUpperCase()}</span>
              <h2>Surface boundary is defined.</h2>
              <p>This module is part of the BI platform contract. It stays separated from observed analytics until its provider, persistence and verification path are connected.</p>
              <Link href="/workspace/analytics">Open the verified analytics surface →</Link>
            </section>
          )}
        </section>
      </div>
    </main>
  );
}
