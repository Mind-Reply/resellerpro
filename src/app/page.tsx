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
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://mind-reply.com/#organization",
        "name": "Mind-Reply",
        "url": "https://mind-reply.com/"
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://mind-reply.com/#resellerpro",
        "name": "ResellerPro",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web",
        "url": "https://mind-reply.com/",
        "description": "ResellerPro is a provider-neutral control platform for deployments, domains, environments, runtime operations and release evidence.",
        "publisher": { "@id": "https://mind-reply.com/#organization" }
      },
      {
        "@type": "WebSite",
        "@id": "https://mind-reply.com/#website",
        "name": "Mind-Reply",
        "url": "https://mind-reply.com/",
        "publisher": { "@id": "https://mind-reply.com/#organization" }
      }
    ]
  };

  const answers = [
    {
      title: "What is ResellerPro?",
      body: "ResellerPro is a provider-neutral control platform for deployments, domains, environments, runtime operations and release evidence. ResellerPro connects source selection, build preparation, preview review, approval, provider execution, health verification and evidence recording into one operating surface. The platform separates repository state from runtime proof so a successful build is not presented as a verified live release. ResellerPro also establishes explicit boundaries around secrets, environments, commerce, domains and operational actions. The public interface uses concise definitions, visible status, structured data and visual system maps so people and machine readers can identify the product, its purpose and its operating model quickly. ResellerPro is designed as an enterprise control layer rather than a generic dashboard, with provider-neutral contracts that can accommodate edge, serverless and managed runtimes without making unverified claims about any particular provider or deployment."
    },
    {
      title: "How does the release model work?",
      body: "ResellerPro uses a visible release contract: source, build, preview, approve, deploy, verify and prove. Each stage represents a distinct operational state rather than a decorative progress indicator. Source identifies the intended repository and change. Build produces the candidate artifact. Preview exposes the candidate for review. Approval records the explicit release decision. Deploy requests provider execution. Verify checks the resulting runtime and health signals. Prove records the evidence required to distinguish observed runtime state from repository intent. The interface makes these boundaries visible because deployment platforms become difficult to govern when build completion, provider execution and production verification are treated as the same event. ResellerPro therefore presents status as evidence-backed state, using CLEAR, CHECKING, MISMATCH, UNPROVEN, STOPPED, APPROVED and LIVE as integrity vocabulary."
    }
  ];

  return (
    <main className="min-h-screen bg-[#070809] text-[#eceae4]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#070809]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1440px] items-center justify-between px-5 py-4 md:px-10">
          <Link href="/" className="flex items-center gap-3" aria-label="ResellerPro home">
            <span className="grid h-9 w-9 place-items-center bg-[#eceae4] font-mono text-xs font-black text-[#070809]">RP</span>
            <span className="text-[15px] font-semibold tracking-[-0.02em]">ResellerPro</span>
          </Link>
          <nav className="hidden gap-7 text-xs font-medium text-white/55 md:flex">
            <a href="#platform" className="hover:text-white">Platform</a>
            <a href="#answers" className="hover:text-white">Answers</a>
            <a href="#architecture" className="hover:text-white">Architecture</a>
            <a href="#release" className="hover:text-white">Release</a>
          </nav>
          <a href="#architecture" className="border border-white/20 px-4 py-2.5 text-xs font-semibold hover:border-white/50">View system</a>
        </div>
      </header>

      <section id="platform" className="mx-auto max-w-[1440px] px-5 pb-24 pt-20 md:px-10 md:pb-32 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:items-end">
          <div>
            <p className="mb-7 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8ff3d]">ResellerPro / infrastructure control</p>
            <h1 className="max-w-6xl text-[clamp(3.6rem,8vw,8rem)] font-semibold leading-[0.84] tracking-[-0.08em]">
              Deployment control with proof built in.
            </h1>
            <p className="mt-9 max-w-2xl text-lg leading-8 text-white/60 md:text-xl">
              ResellerPro connects source, build, preview, approval, provider execution, runtime verification and release evidence in one controlled surface.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#answers" className="bg-[#c8ff3d] px-6 py-3.5 text-sm font-bold text-[#070809]">Read the system</a>
              <a href="#architecture" className="border border-white/20 px-6 py-3.5 text-sm font-semibold hover:border-white/50">Inspect architecture</a>
            </div>
          </div>

          <div className="border border-white/10 bg-[#0d0f10] p-5">
            <div className="mb-5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
              <span className="text-white/40">Integrity rail</span>
              <span className="text-[#c8ff3d]">evidence-first</span>
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 sm:grid-cols-4">
              {integrity.slice(0, 4).map((state) => (
                <div key={state} className="bg-[#101213] p-5">
                  <div className="h-1.5 w-1.5 bg-[#c8ff3d]" />
                  <div className="mt-10 font-mono text-[10px] font-bold tracking-[0.14em]">{state}</div>
                </div>
              ))}
            </div>
            <div className="mt-px grid grid-cols-3 gap-px bg-white/10">
              {integrity.slice(4).map((state) => (
                <div key={state} className="bg-[#101213] p-5">
                  <div className="h-1.5 w-1.5 bg-white/35" />
                  <div className="mt-10 font-mono text-[10px] font-bold tracking-[0.14em]">{state}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="answers" className="border-y border-white/10 bg-[#eceae4] text-[#10110f]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="mb-14 max-w-3xl">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">Answer-first islands</p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.9] tracking-[-0.065em] md:text-7xl">Short answers. Complete context.</h2>
          </div>
          <div className="grid gap-px border border-black/10 bg-black/10 lg:grid-cols-2">
            {answers.map((answer) => (
              <article key={answer.title} className="bg-[#eceae4] p-7 md:p-10">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">Answer island</span>
                  <span className="h-2 w-2 bg-[#4169ff]" />
                </div>
                <h2 className="mt-14 text-2xl font-semibold tracking-[-0.04em]">{answer.title}</h2>
                <p className="mt-5 text-[15px] leading-7 text-black/65">{answer.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-[.72fr_1.28fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[#c8ff3d]">Visual-first architecture</p>
            <h2 className="mt-4 text-5xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-6xl">A system map people can read at a glance.</h2>
            <p className="mt-7 max-w-md text-sm leading-7 text-white/55">
              The visual layer mirrors the operating model: capabilities, states, evidence and release boundaries remain distinct and scannable.
            </p>
          </div>

          <div className="border border-white/10 bg-[#0d0f10]">
            <div className="grid gap-px bg-white/10 sm:grid-cols-3">
              {[
                ["01", "VISUAL", "High-contrast modules and system maps"],
                ["02", "ANSWER", "Named definitions with context"],
                ["03", "ENTITY", "Structured product and organization data"],
              ].map(([n, title, detail]) => (
                <div key={n} className="bg-[#101213] p-7 md:p-8">
                  <span className="font-mono text-[10px] text-white/35">{n}</span>
                  <h3 className="mt-12 font-mono text-xs font-bold tracking-[0.18em] text-[#c8ff3d]">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/55">{detail}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 p-7 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Execution graph</span>
                <span className="font-mono text-[10px] text-[#c8ff3d]">READ → VERIFY → PROVE</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-7">
                {release.map(([n, name]) => (
                  <div key={n} className="border border-white/10 p-4">
                    <span className="font-mono text-[9px] text-white/30">{n}</span>
                    <div className="mt-7 font-mono text-[10px] font-bold tracking-[0.12em]">{name}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-px border-t border-white/10 bg-white/10 sm:grid-cols-3">
              {capabilities.slice(0, 3).map(([n, title, body]) => (
                <details key={title} className="group bg-[#101213] p-7">
                  <summary className="cursor-pointer list-none">
                    <span className="font-mono text-[10px] text-white/30">{n}</span>
                    <h3 className="mt-8 text-xl font-semibold">{title}</h3>
                    <span className="mt-3 block font-mono text-[9px] uppercase tracking-[0.14em] text-[#c8ff3d]">Open module +</span>
                  </summary>
                  <p className="mt-5 text-sm leading-6 text-white/55">{body}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="release" className="border-y border-white/10 bg-[#101213]">
        <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">Release contract</p>
              <h2 className="mt-4 text-5xl font-semibold leading-[0.9] tracking-[-0.06em] md:text-7xl">No proof, no claim.</h2>
              <p className="mt-8 max-w-xl text-base leading-7 text-white/55">
                Repository state, provider execution and runtime verification remain separate facts. ResellerPro exposes the distinction instead of inventing live status.
              </p>
            </div>
            <div className="border-t border-white/15">
              {release.map(([n, name, detail]) => (
                <div key={n} className="grid grid-cols-[42px_110px_1fr] items-center gap-4 border-b border-white/10 py-5 text-sm">
                  <span className="font-mono text-[10px] text-white/30">{n}</span>
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-white/70">{name}</span>
                  <span className="text-white/45">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[#070809] px-5 pb-10 text-white/35 md:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 border-t border-white/10 pt-7 text-xs md:flex-row md:items-center md:justify-between">
          <span>ResellerPro · Mind-Reply</span>
          <span>Control · verification · evidence</span>
        </div>
      </footer>
    </main>
  );
}
