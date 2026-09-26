import Link from "next/link";

const integrity = ["CLEAR", "CHECKING", "MISMATCH", "UNPROVEN", "STOPPED", "APPROVED", "LIVE"];

const capabilities = [
  ["01", "Deploy", "Git-connected builds, previews, promotion, rollback and release evidence."],
  ["02", "Domains", "Domain inventory, DNS intent, certificates and environment-aware routing."],
  ["03", "Runtime", "Provider-neutral execution across edge, serverless and managed runtimes."],
  ["04", "Environments", "Development, preview, staging and production boundaries with explicit gates."],
  ["05", "Secrets", "Environment-scoped references without credentials in source or client bundles."],
  ["06", "Observe", "Build output, deployment events, health checks and evidence receipts."],
  ["07", "Control", "Roles, approvals and auditable actions for teams and operators."],
  ["08", "Commerce", "Plans, usage boundaries and explicit payment/settlement contracts."],
  ["09", "Edge", "Locale-aware delivery and regional execution without architectural lock-in."],
  ["10", "Data", "RLS-first control-plane records with provider-neutral interfaces."],
  ["11", "Automation", "Prepared, approved, executed and verified actions — no silent mutation."],
  ["12", "Recovery", "Promotion and rollback paths designed into the release surface."],
];

const release = [
  ["01", "SOURCE", "Repository and change selected"],
  ["02", "BUILD", "Artifact produced and checked"],
  ["03", "PREVIEW", "Environment exposed for review"],
  ["04", "APPROVE", "Explicit release decision"],
  ["05", "DEPLOY", "Provider execution"],
  ["06", "VERIFY", "Health and runtime checks"],
  ["07", "PROVE", "Evidence recorded"],
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ResellerPro",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "A provider-neutral deployment, domain, hosting and control platform.",
  };

  return (
    <main className="min-h-screen bg-[#f4f3ef] text-[#10110f]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="border-b border-[#10110f]/10 bg-[#f4f3ef]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-5 md:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="ResellerPro home">
            <span className="grid h-9 w-9 place-items-center border border-[#10110f] bg-[#10110f] font-mono text-xs font-bold text-[#f4f3ef]">RP</span>
            <span className="text-[15px] font-semibold tracking-[-0.02em]">ResellerPro</span>
          </Link>

          <nav className="hidden items-center gap-8 text-[13px] font-medium text-[#10110f]/60 md:flex">
            <a href="#platform" className="transition hover:text-[#10110f]">Platform</a>
            <a href="#capabilities" className="transition hover:text-[#10110f]">Capabilities</a>
            <a href="#baseline" className="transition hover:text-[#10110f]">Baseline</a>
            <a href="#release" className="transition hover:text-[#10110f]">Release</a>
          </nav>

          <a href="#platform" className="border border-[#10110f] bg-[#10110f] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#2a2b28]">
            Explore platform
          </a>
        </div>
      </header>

      <section id="platform" className="mx-auto max-w-[1440px] px-5 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#10110f]/45">
              Deployment control / infrastructure layer
            </p>
            <h1 className="max-w-5xl text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
              Ship without giving your architecture away.
            </h1>
            <p className="mt-9 max-w-2xl text-lg leading-8 text-[#10110f]/60 md:text-xl">
              ResellerPro brings code, builds, previews, domains, environments, runtime providers, approvals and release evidence into one controlled surface.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#capabilities" className="bg-[#10110f] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#2a2b28]">Explore capabilities</a>
              <a href="#baseline" className="border border-[#10110f]/20 px-6 py-3.5 text-sm font-semibold transition hover:border-[#10110f]/50">View baseline</a>
            </div>
          </div>

          <div className="border-t border-[#10110f]/15 pt-5 lg:mb-2">
            <div className="grid grid-cols-2 gap-px overflow-hidden border border-[#10110f]/10 bg-[#10110f]/10">
              {[
                ["CODE", "Connected source"],
                ["BUILD", "Repeatable release"],
                ["EDGE", "Provider-neutral runtime"],
                ["PROOF", "Recorded evidence"],
              ].map(([k, v]) => (
                <div key={k} className="bg-[#eeede8] p-5 md:p-7">
                  <div className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#10110f]/40">{k}</div>
                  <div className="mt-8 text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid border-y border-[#10110f]/10 md:grid-cols-3">
          {[
            ["01", "Connect", "Repository → project → environment"],
            ["02", "Prepare", "Build → preview → checks → approval"],
            ["03", "Release", "Deploy → health → evidence → recovery"],
          ].map(([n, t, d]) => (
            <div key={n} className="border-b border-[#10110f]/10 p-6 last:border-0 md:border-b-0 md:border-r md:last:border-r-0 md:p-8">
              <div className="font-mono text-[10px] text-[#10110f]/40">{n}</div>
              <h2 className="mt-12 text-2xl font-semibold tracking-[-0.035em]">{t}</h2>
              <p className="mt-3 text-sm leading-6 text-[#10110f]/55">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="border-y border-[#10110f]/10 bg-[#e9e8e2]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#10110f]/45">Platform surface</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] tracking-[-0.06em] md:text-7xl">
                Enterprise-grade by baseline.
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-[#10110f]/55">
              The visual system is deliberately quiet: clear hierarchy, hard edges, strong typography and status-first information.
            </p>
          </div>

          <div className="mt-16 grid border-l border-t border-[#10110f]/10 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(([n, title, body]) => (
              <article key={title} className="group min-h-[220px] border-b border-r border-[#10110f]/10 bg-[#e9e8e2] p-7 transition hover:bg-[#f4f3ef] md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-[#10110f]/35">{n}</span>
                  <span className="h-2 w-2 bg-[#10110f]/20 transition group-hover:bg-[#10110f]" />
                </div>
                <h3 className="mt-14 text-xl font-semibold tracking-[-0.03em]">{title}</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-[#10110f]/55">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="baseline" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#10110f]/45">Competitive baseline</p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.94] tracking-[-0.06em] md:text-6xl">
              The expectation is the platform.
            </h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-[#10110f]/55">
              Modern deployment platforms establish the minimum. ResellerPro adds a provider-neutral control layer and keeps release state explicit.
            </p>
          </div>

          <div className="border-t border-[#10110f]">
            {[
              ["Git-connected deployment", "BASELINE"],
              ["Preview environments", "BASELINE"],
              ["Custom domains + DNS", "BASELINE"],
              ["Environment variables / secrets", "BASELINE"],
              ["Build logs + deployment history", "BASELINE"],
              ["Promotion / rollback", "BASELINE"],
              ["Edge / serverless runtimes", "BASELINE"],
              ["Health + release evidence", "CONTROL"],
              ["Teams / approvals / audit", "CONTROL"],
              ["Provider-neutral infrastructure", "CONTROL"],
            ].map(([name, tag]) => (
              <div key={name} className="grid grid-cols-[1fr_auto] gap-6 border-b border-[#10110f]/10 py-5">
                <span className="text-sm font-medium">{name}</span>
                <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#10110f]/40">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="release" className="bg-[#10110f] text-[#f4f3ef]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/40">Release contract</p>
              <h2 className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-7xl">
                Build it. Verify it. Release it.
              </h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/55">
                Every release has a visible path from source to proof. No hidden mutation. No invented live status.
              </p>
            </div>

            <div className="border-t border-white/15">
              {release.map(([n, name, detail]) => (
                <div key={n} className="grid grid-cols-[42px_110px_1fr] items-center gap-4 border-b border-white/10 py-5 text-sm">
                  <span className="font-mono text-[10px] text-white/35">{n}</span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-white/65">{name}</span>
                  <span className="text-white/45">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#10110f] px-5 pb-10 text-white/35 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-white/10 pt-7 text-xs md:flex-row md:items-center md:justify-between">
          <span>ResellerPro</span>
          <span>Deployment control · domains · runtime · release evidence</span>
        </div>
      </footer>
    </main>
  );
}
