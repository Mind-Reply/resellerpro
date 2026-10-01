import Link from "next/link";

const families = [
  {
    id: "intelligence",
    number: "01",
    title: "Innovation & Intelligence",
    intro: "Turn operational data into clearer decisions, predictive signals and bounded workflow improvements.",
    services: [
      ["Applied AI & Machine Learning", "Predictive models, classification, retrieval and decision-support workflows built around governed data."],
      ["Data & Analytics", "Data architecture, operational reporting and decision surfaces connected to real business records."],
    ],
  },
  {
    id: "technology",
    number: "02",
    title: "Core Technology & Development",
    intro: "Modernize the infrastructure and applications underneath the business without losing operational control.",
    services: [
      ["Infrastructure Modernization", "Cloud and hybrid architecture, migration planning, resilience and cost-aware infrastructure operations."],
      ["Application Modernization", "Modern application architecture, integration, APIs, delivery pipelines and cloud-native development."],
    ],
  },
  {
    id: "operations",
    number: "03",
    title: "Operations, Security & People",
    intro: "Keep critical technology secure, maintained and usable by the people who depend on it.",
    services: [
      ["Security", "Security posture, identity, monitoring, threat-informed controls and practical resilience engineering."],
      ["Managed Services", "Ongoing infrastructure and application monitoring, maintenance, optimization and operational response."],
      ["Digital Workplace", "Modern collaboration, identity, device and connectivity foundations for distributed teams."],
      ["Training", "Role-specific enablement that helps teams operate the technology they actually adopt."],
    ],
  },
];

const graph = ["Domain", "Provider", "Service", "Execution", "Deployment", "Runtime", "Evidence"];

export default function ServicesPage() {
  return (
    <main className="svc-site">
      <header className="svc-nav">
        <Link href="/" className="svc-logo"><span>RP</span> ResellerPro</Link>
        <nav><Link href="/">Platform</Link><Link href="/workspace">Workspace</Link><Link href="/services">Services</Link></nav>
        <Link href="/workspace" className="svc-cta">Open workspace</Link>
      </header>

      <section className="svc-hero">
        <div>
          <p className="svc-kicker">RESELLERPRO / SERVICES</p>
          <h1>Innovation on top of infrastructure you can actually operate.</h1>
          <p>ResellerPro starts with domains, registrar/provider infrastructure and hosting. These services extend that foundation into data, applications, security and managed operations without creating a second operating model.</p>
          <div className="svc-actions"><Link href="#catalog" className="svc-primary">Explore services</Link><Link href="/workspace" className="svc-secondary">Open workspace</Link></div>
        </div>
        <div className="svc-graph">
          <small>OPERATING GRAPH</small>
          {graph.map((item, i) => <div key={item}><span>0{i + 1}</span><strong>{item}</strong>{i < graph.length - 1 && <b>↓</b>}</div>)}
        </div>
      </section>

      <section className="svc-proof">
        <div><strong>01</strong><span>Infrastructure-first</span><p>Domains, hosting and provider state remain the foundation.</p></div>
        <div><strong>02</strong><span>Evidence-led</span><p>Operational claims are separated from planned capability.</p></div>
        <div><strong>03</strong><span>Regional-ready</span><p>BG and UK are designed as native market packs before wider expansion.</p></div>
      </section>

      <section id="catalog" className="svc-catalog">
        <div className="svc-heading"><p className="svc-kicker">SERVICE CATALOG</p><h2>Build, modernize, secure and operate.</h2><p>Each service has a delivery path, provider dependencies and evidence boundary. Services can be productized, assessed or managed depending on how standardized the delivery becomes.</p></div>
        <div className="svc-families">
          {families.map((family) => <section className="svc-family" id={family.id} key={family.id}>
            <div className="svc-family-head"><span>{family.number}</span><div><h3>{family.title}</h3><p>{family.intro}</p></div></div>
            <div className="svc-cards">{family.services.map(([title, text]) => <article key={title}><small>{family.number}</small><h4>{title}</h4><p>{text}</p><Link href="/workspace">Assess / operate →</Link></article>)}</div>
          </section>)}
        </div>
      </section>

      <section className="svc-delivery">
        <div><p className="svc-kicker">DELIVERY MODEL</p><h2>No brochureware. Every service needs an operating path.</h2></div>
        <div className="svc-delivery-list">
          {["Assess", "Design", "Build", "Operate", "Verify"].map((x, i) => <div key={x}><span>0{i + 1}</span><strong>{x}</strong><p>{i === 0 ? "Scope the actual customer problem, infrastructure and constraints." : i === 1 ? "Define architecture, dependencies, security and regional requirements." : i === 2 ? "Create the implementation, integrations and release candidate." : i === 3 ? "Run the approved service with explicit ownership and monitoring." : "Verify runtime outcome and attach evidence before calling it complete."}</p></div>)}
        </div>
      </section>

      <section className="svc-regions">
        <p className="svc-kicker">REGIONAL FOUNDATION</p><h2>Native in Bulgaria and the UK first.</h2><p>BG and UK are the first complete market packs: language, currency, domain catalogue, provider capability, tax/legal presentation, checkout, support and operational evidence. Wider EU, Asia and Latin America follow only after the foundations are settled.</p>
        <div><span>BG</span><span>UK</span><span>EU NEXT</span><span>ASIA / LATAM — RESEARCH GATED</span></div>
      </section>

      <section className="svc-final"><p className="svc-kicker">NEXT MOVE</p><h2>Start with the infrastructure. Add intelligence where it creates measurable value.</h2><div><Link href="/workspace" className="svc-primary">Open ResellerPro</Link><Link href="/" className="svc-secondary">Back to platform</Link></div></section>
    </main>
  );
}
