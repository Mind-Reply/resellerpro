"use client";

import Link from "next/link";
import { useSubscription, useTransactions } from "@/hooks/useResellerAccount";

const money = (value: number, currency = "USD") =>
  new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);

export default function BillingPage() {
  const { plans, subscription, createCheckout, isCheckingOut } = useSubscription();
  const { transactions } = useTransactions();

  return (
    <main className="ws-detail">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium tracking-[0.2em] text-slate-500">RESELLERPRO / BILLING</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Account & billing.</h1>
          <p className="mt-2 text-slate-500">Subscription state and transaction evidence from the provider-backed ledger.</p>
        </div>
        <Link href="/workspace" className="rounded-lg border px-4 py-2 text-sm">Workspace</Link>
      </header>

      <section className="mt-8 rounded-2xl border bg-white p-5 shadow-sm">
        <p className="text-xs uppercase tracking-wide text-slate-500">Current subscription</p>
        {subscription ? (
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <strong>{subscription.planId}</strong>
            <span className="rounded-full border px-3 py-1 text-xs">{subscription.status}</span>
            {subscription.currentPeriodEnd && (
              <span className="text-sm text-slate-500">Period ends {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
            )}
          </div>
        ) : <p className="mt-2 text-sm text-slate-500">No subscription is recorded for this account.</p>}
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.id} className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="text-lg font-semibold">{plan.name}</h2>
            <p className="mt-2 min-h-10 text-sm text-slate-500">{plan.headline}</p>
            <div className="mt-5 text-3xl font-semibold">
              {plan.monthlyPrice == null ? "Custom" : money(plan.monthlyPrice, plan.currency)}
            </div>
            <button
              className="mt-5 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
              disabled={!plan.checkoutAvailable || isCheckingOut}
              onClick={() => void createCheckout({ planId: plan.id as "starter" | "growth" | "enterprise" })}
            >
              {plan.checkoutAvailable ? "Continue to checkout" : "Provider configuration required"}
            </button>
          </article>
        ))}
      </section>

      <section className="mt-6 rounded-2xl border bg-white p-5 shadow-sm">
        <h2 className="font-semibold">Transactions</h2>
        <div className="mt-4 divide-y">
          {transactions.length ? transactions.map((transaction: any) => (
            <div key={transaction.id} className="flex items-center justify-between gap-4 py-4">
              <div>
                <p className="font-medium">{transaction.description}</p>
                <p className="text-xs text-slate-500">{transaction.type} · {new Date(transaction.createdAt).toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="font-medium">{money(Number(transaction.amount), String(transaction.currency).toUpperCase())}</p>
                <p className="text-xs text-slate-500">{transaction.status}</p>
              </div>
            </div>
          )) : <p className="py-4 text-sm text-slate-500">No transactions recorded yet.</p>}
        </div>
      </section>
    </main>
  );
}
