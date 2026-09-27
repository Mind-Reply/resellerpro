"use client";

import Link from "next/link";
import { useAnalytics } from "@/hooks/useResellerAccount";

const money = (value: number) =>
  new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);

export default function AnalyticsPage() {
  const { data, loading, refresh } = useAnalytics();

  if (loading) {
    return <main className="ws-detail"><p>Loading persisted business intelligence…</p></main>;
  }

  const summary = data?.summary;

  return (
    <main className="ws-detail">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500">RESELLERPRO / ANALYTICS</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Business intelligence.</h1>
          <p className="mt-2 max-w-2xl text-slate-500">Real persisted workspace records only: commerce, customers, domains, services, invoices and acquisition events.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => void refresh()} className="rounded-lg border px-4 py-2 text-sm">Refresh</button>
          <Link href="/workspace" className="rounded-lg border px-4 py-2 text-sm">Workspace</Link>
        </div>
      </header>

      <section className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        {[
          ["Customers", summary?.customers ?? 0],
          ["Active domains", summary?.activeDomains ?? 0],
          ["Orders", summary?.totalOrders ?? 0],
          ["Revenue", money(summary?.revenue ?? 0)],
          ["Open invoices", money(summary?.openInvoiceValue ?? 0)],
          ["Active services", summary?.activeServices ?? 0],
        ].map(([label, value]) => (
          <article key={label} className="rounded-2xl border bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
            <strong className="mt-2 block text-2xl">{String(value)}</strong>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Paid revenue, last 30 days</h2>
              <p className="text-sm text-slate-500">Derived from paid invoices.</p>
            </div>
            <span className="text-xs text-slate-400">{data?.source}</span>
          </div>
          <div className="mt-5 space-y-2">
            {data?.revenueSeries?.length ? data.revenueSeries.map((item: any) => (
              <div key={item.date} className="flex items-center gap-3">
                <span className="w-24 text-xs text-slate-500">{item.date}</span>
                <div className="h-2 flex-1 rounded bg-slate-100">
                  <div
                    className="h-2 rounded bg-slate-900"
                    style={{ width: `${Math.min(100, Math.max(4, Number(item.value) / Math.max(1, Number(summary?.revenue || 1)) * 100))}%` }}
                  />
                </div>
                <span className="w-24 text-right text-sm">{money(Number(item.value))}</span>
              </div>
            )) : <p className="text-sm text-slate-500">No paid invoice events are recorded yet.</p>}
          </div>
        </article>

        <article className="rounded-2xl border bg-white p-5 shadow-sm">
          <h2 className="font-semibold">Acquisition signal</h2>
          <p className="text-sm text-slate-500">Persisted events grouped by source and event type.</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {(data?.acquisition?.eventsBySource || []).map((item: any) => (
              <div key={item.source} className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs uppercase tracking-wide text-slate-500">{item.source}</p>
                <strong className="mt-1 block text-2xl">{item.count}</strong>
              </div>
            ))}
          </div>
          <div className="mt-5 border-t pt-4">
            <p className="text-xs uppercase tracking-wide text-slate-500">Event types</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(data?.acquisition?.eventsByType || []).map((item: any) => (
                <span key={item.type} className="rounded-full border px-3 py-1 text-xs">{item.type}: {item.count}</span>
              ))}
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
