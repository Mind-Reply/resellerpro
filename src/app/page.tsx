import Link from "next/link";

const capabilities = [
  ["Deploy", "Git-connected builds, preview environments, release promotion, rollback and deployment evidence."],
  ["Domains", "Domain inventory, DNS intent, certificate state and environment-aware routing."],
  ["Hosting", "Provider-neutral runtime contracts spanning Cloudflare/OpenNext, Cloud Run and future providers."],
  ["Providers", "One control surface for infrastructure providers instead of a provider-locked product boundary."],
  ["Environments", "Development, preview, staging and production boundaries with explicit release gates."],
  ["Secrets", "Environment-scoped secret references without committing credentials or exposing them to clients."],
  ["Observability", "Build output, deployment events, health checks, runtime logs and evidence receipts."],
  ["Teams", "Owner control, roles, approvals and auditable actions for agencies and enterprise operators."],
  ["Billing", "Tenant plans, usage boundaries and Stripe-ready commercial contracts; settlement remains explicit."],
  ["Edge", "Locale-aware routing, regional delivery contracts and CDN/edge execution without duplicate roots."],
  ["Data", "Supabase/Postgres control-plane integration with RLS-first security and provider-neutral records."],
  ["Automation", "Human-command execution: actions are prepared, approved, executed and verified rather than silently mutated."],
];

const matrix = [
  ["Git-connected deployment", "Target", "READY"],
  ["Preview environments", "Target", "CONTRACT"],
  ["Custom domains + DNS", "Target", "CONTRACT"],
  ["Environment variables / secrets", "Target", "CONTRACT"],
  ["Build logs + deployment history", "Target", "CONTRACT"],
  ["Rollback / promotion", "Target", "CONTRACT"],
  ["Edge / serverless runtimes", "Target", "CONTRACT"],
  ["Observability + health evidence", "Target", "CONTRACT"],
  ["Teams / approvals / audit", "Target", "CONTRACT"],
  ["Provider-neutral infrastructure", "ResellerPro differentiator", "READY"],
  ["Cloudflare/OpenNext path", "Current direction", "READY"],
  ["Supabase control plane", "Current direction", "READY"],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ResellerPro",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "Provider-neutral deployment, domain, hosting and owner-control platform.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#07090d] text-slate-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="pointer-events-none fixed inset-0 -z-0">
        <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-64 h-[32rem] w-[32rem] rounded-full bg-blue-600/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#07090d]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-3 font-black tracking-tight">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-600 text-sm text-slate-950">R</span>
            <span>ResellerPro</span>
          </Link>
          <nav className="hidden gap-6 text-sm text-slate-400 md:flex">
            <a href="#platform" className="hover:text-white">Platform</a>
            <a href="#capabilities" className="hover:text-white">Capabilities</a>
            <a href="#matrix" className="hover:text-white">Baseline</a>
            <a href="#release" className="hover:text-white">Release</a>
          </nav>
          <Link href="#release" className="rounded-full bg-white px-4 py-2 text-xs font-bold text-slate-950 hover:bg-cyan-200">Inspect platform</Link>
        </div>
      </header>

      <section id="platform" className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pt-32">
        <div className="max-w-5xl">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.18em] text-cyan-200">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            Provider-neutral deployment control
          </div>
          <h1 className="text-5xl font-black leading-[0.98] tracking-[-0.045em] md:text-7xl">
            The operating layer between your code and your infrastructure.
          </h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-400 md:text-xl">
            ResellerPro is being built to cover the practical deployment surface teams expect from a modern platform: code, builds, previews, domains, hosting, environments, secrets, observability, approvals and release evidence — without making one infrastructure provider your architecture.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#capabilities" className="rounded-xl bg-cyan-300 px-6 py-3.5 text-sm font-black text-slate-950 shadow-2xl shadow-cyan-500/10 hover:bg-cyan-200">Explore capabilities</a>
            <a href="#matrix" className="rounded-xl border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-semibold text-slate-200 hover:bg-white/[0.07]">See minimum baseline</a>
          </div>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            ["01", "Connect", "GitHub repository → project → environment"],
            ["02", "Prepare", "Build → preview → checks → approval"],
            ["03", "Release", "Deploy → health → evidence → rollback path"],
          ].map(([n, t, d]) => (
            <div key={n} className="group rounded-2xl border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:border-cyan-300/30">
              <div className="font-mono text-xs text-cyan-300">{n}</div>
              <h2 className="mt-5 text-xl font-bold">{t}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="border-y border-white/10 bg-white/[0.018]">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Platform surface</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Minimum enterprise-grade capability set.</h2>
            <p className="mt-5 text-slate-400">The reference design supplied for this work is treated as a visual direction, not as evidence that any capability is already live.</p>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([title, body], i) => (
              <article key={title} className="rounded-2xl border border-white/10 bg-[#0b0f15]/90 p-6 shadow-xl shadow-black/10 transition hover:border-cyan-300/25 hover:bg-[#0d121a]">
                <div className="font-mono text-[10px] text-slate-500">CAPABILITY {String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-5 text-lg font-bold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-400">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="matrix" className="mx-auto max-w-7xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Competitive baseline</p>
          <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Vercel-class expectations, ResellerPro-controlled architecture.</h2>
          <p className="mt-5 text-slate-400">This is a delivery baseline. “READY” means the repository has a concrete implementation direction; “CONTRACT” means the capability still needs runtime/provider verification.</p>
        </div>
        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10">
          <div className="grid grid-cols-[1.7fr_.9fr_.7fr] border-b border-white/10 bg-white/[0.04] px-5 py-3 font-mono text-[10px] uppercase tracking-wider text-slate-500">
            <span>Capability</span><span>Position</span><span>Status</span>
          </div>
          {matrix.map(([a,b,c]) => (
            <div key={a} className="grid grid-cols-[1.7fr_.9fr_.7fr] border-b border-white/5 px-5 py-4 text-sm last:border-0">
              <span className="text-slate-200">{a}</span><span className="text-slate-500">{b}</span><span className={c === "READY" ? "font-mono text-cyan-300" : "font-mono text-amber-300"}>{c}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="release" className="border-t border-white/10 bg-gradient-to-b from-cyan-400/[0.06] to-transparent">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">Release contract</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">Build it once. Verify it. Then release.</h2>
              <p className="mt-5 max-w-2xl text-slate-400">ResellerPro will treat deployment evidence as part of the platform, not an afterthought. GitHub remains source control; runtime providers remain replaceable; the control layer records what actually happened.</p>
            </div>
            <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/[0.05] p-7">
              <div className="font-mono text-xs text-cyan-200">RELEASE PIPELINE</div>
              <div className="mt-5 space-y-3 font-mono text-sm text-slate-300">
                {["SOURCE", "BUILD", "PREVIEW", "CHECK", "APPROVE", "DEPLOY", "HEALTH", "EVIDENCE"].map((x, i) => <div key={x} className="flex items-center gap-3"><span className="text-cyan-300">{String(i + 1).padStart(2, "0")}</span>{x}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-10 text-center text-xs text-slate-500">
        ResellerPro · Canonical organization repository: Mind-Reply/resellerpro · Runtime state must be externally verified before being called live.
      </footer>
    </main>
  );
}
