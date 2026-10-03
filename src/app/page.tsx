import Link from "next/link";

const modules = [
  { id: "01", title: "Apps", text: "Create operational products with a governed workspace, data model and release path." },
  { id: "02", title: "Websites", text: "Design responsive customer experiences, connect domains and keep the release state visible." },
  { id: "03", title: "Agents", text: "Prepare bounded operators that connect to approved tools and stop at explicit control points." },
  { id: "04", title: "Domains", text: "Search, organise and route domain assets through provider-neutral contracts." },
  { id: "05", title: "Commerce", text: "Keep quotes, checkout, orders and settlement evidence in one commercial flow." },
  { id: "06", title: "Operations", text: "Watch deployments, health, renewals, workflows and evidence from one cockpit." },
];

const growth = [
  ["01", "Discover", "SEO/GEO readiness, structured content and search visibility controls."],
  ["02", "Engage", "Campaign drafts, social content and customer journeys prepared from the workspace."],
  ["03", "Measure", "Acquisition, conversion, service and portfolio signals without invented numbers."],
  ["04", "Improve", "Turn observed friction into a concrete next action, owner decision or verified change."],
];

const control = [
  ["Source", "Repository and change are explicit."],
  ["Build", "A candidate artifact is produced before release."],
  ["Approve", "Material actions require an explicit decision."],
  ["Execute", "Provider adapters perform the approved operation."],
  ["Verify", "Runtime state is checked independently."],
  ["Record", "Evidence stays attached to the outcome."],
];

export default function Home() {
  return (
    <main className="rp-site">
      <header className="rp-nav">
        <Link href="/" className="rp-logo" aria-label="ResellerPro home">
          <span className="rp-mark">RP</span><span>ResellerPro</span>
        </Link>
        <nav>
          <a href="#platform">Platform</a><a href="/enterprise">Enterprise</a><a href="#operate">Operate</a><a href="#growth">Growth</a><a href="#control">Control</a>
        </nav>
        <Link href="/workspace" className="rp-nav-cta">Open workspace</Link>
      </header>

      <section className="rp-hero">
        <div className="rp-hero-copy">
          <p className="rp-kicker">MIND-REPLY / RESELLERPRO</p>
          <h1>Build the business layer.<br /><em>Keep the system yours.</em></h1>
          <p className="rp-lede">A single operating surface for websites, domains, commerce, agents, deployments and growth — designed around visible state, explicit control and evidence.</p>
          <div className="rp-actions"><Link href="/workspace" className="rp-button rp-button-primary">Enter the workspace</Link><a href="#platform" className="rp-button rp-button-quiet">See the platform</a></div>
          <div className="rp-proof"><span>CONTROL-FIRST</span><span>PROVIDER-NEUTRAL</span><span>EVIDENCE-LED</span></div>
        </div>

        <div className="rp-hero-console" aria-label="ResellerPro hero video">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/og-3650.png"
            style={{ width: "100%", display: "block", aspectRatio: "16 / 9", objectFit: "cover", border: "1px solid #17302c", borderRadius: "18px" }}
          >
            <source src="/hero-3650.mp4" type="video/mp4" />
          </video>
        </div>

      </section>

      <section className="rp-statement"><p className="rp-kicker">THE PRODUCT RULE</p><h2>It should feel as easy as a builder, but behave like an operating system.</h2><p>Start with an idea. Create the surface. Connect the infrastructure. Measure what actually happened. Improve the next move.</p></section>

      <section id="platform" className="rp-section">
        <div className="rp-section-head"><div><p className="rp-kicker">ONE PLATFORM</p><h2>Create without stitching together five products.</h2></div><p>Apps, sites, agents and commercial infrastructure share the same account, navigation, identity and release model.</p></div>
        <div className="rp-module-grid">{modules.map(m => <article className="rp-module" key={m.id}><span>{m.id}</span><h3>{m.title}</h3><p>{m.text}</p><Link href="/workspace">Open module →</Link></article>)}</div>
      </section>

      <section id="operate" className="rp-dark-section">
        <div className="rp-section-head"><div><p className="rp-kicker">OPERATE</p><h2>After launch, the platform becomes more useful.</h2></div><p>Keep service state, release work, integrations and evidence in the same operating picture instead of multiplying tabs.</p></div>
        <div className="rp-operate-grid">{[
          ["Deployments", "Promotion, rollback, health and release evidence."],
          ["Integrations", "Connect approved providers without making them the product."],
          ["Analytics", "Observe acquisition, conversion, service and portfolio signals."],
          ["Workflows", "Prepare bounded operational actions without silent mutation."],
        ].map(([title,text], i) => <div className="rp-operate-card" key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p><b>CONTROLLED SURFACE</b></div>)}</div>
      </section>

      <section id="growth" className="rp-section">
        <div className="rp-section-head"><div><p className="rp-kicker">GROW AFTER SHIPPING</p><h2>Marketing tools belong next to the product.</h2></div><p>The reference model is simple: discover, engage, measure and improve — with real evidence rather than invented performance claims.</p></div>
        <div className="rp-growth-grid">{growth.map(([n,t,c]) => <article key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></article>)}</div>
      </section>

      <section id="control" className="rp-control">
        <div className="rp-control-copy"><p className="rp-kicker">CONTROL CONTRACT</p><h2>No proof, no claim.</h2><p>Repository intent, provider execution and runtime state are separate facts. ResellerPro keeps them separate so the interface never needs to pretend.</p></div>
        <div className="rp-control-list">{control.map(([a,b], i) => <div key={a}><span>0{i+1}</span><strong>{a}</strong><p>{b}</p></div>)}</div>
      </section>

      <section className="rp-final"><p className="rp-kicker">RESELLERPRO / MIND-REPLY</p><h2>One workspace. Many products. One operating model.</h2><div className="rp-actions"><Link href="/workspace" className="rp-button rp-button-primary">Open workspace</Link><a href="#platform" className="rp-button rp-button-quiet">Explore platform</a></div></section>
      <footer className="rp-footer"><span>ResellerPro · Mind-Reply</span><span>Control · execution · verification · evidence</span></footer>
    </main>
  );
}