import Link from "next/link";

const services = [
  { slug: "innovation-intelligence", group: "Innovation & Intelligence", title: "Innovation & Intelligence", text: "Turn complex technology opportunities into measurable operating improvements." },
  { slug: "data-analytics", group: "Innovation & Intelligence", title: "Data & Analytics", text: "Capture, model and interpret operational data with evidence-backed decision surfaces." },
  { slug: "infrastructure-modernisation", group: "Core Technology & Development", title: "Infrastructure Modernisation", text: "Modernise cloud and hybrid infrastructure around resilience, security and operational evidence." },
  { slug: "application-modernisation", group: "Core Technology & Development", title: "Application Modernisation", text: "Modernise or build applications with tested releases, observable runtime state and controlled change." },
  { slug: "security", group: "Operations, Security & People", title: "Security", text: "Establish practical security controls, monitoring and evidence across the operating estate." },
  { slug: "managed-services", group: "Operations, Security & People", title: "Managed Services", text: "Operate critical technology with defined service boundaries, monitoring and escalation." },
  { slug: "digital-workplace", group: "Operations, Security & People", title: "Digital Workplace", text: "Connect people, systems and workflows through secure, measurable workplace infrastructure." },
  { slug: "training", group: "Operations, Security & People", title: "Training", text: "Build practical technology capability around the systems your organisation actually operates." },
] as const;

export default function ServicesPage() {
  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "72px 24px" }}>
      <header style={{ maxWidth: 820, marginBottom: 56 }}>
        <p style={{ fontSize: 13, letterSpacing: ".12em", textTransform: "uppercase", opacity: .65 }}>Technology Services</p>
        <h1 style={{ fontSize: "clamp(42px, 7vw, 78px)", lineHeight: 1.02, margin: "14px 0 20px" }}>
          Innovation &amp; Intelligence, connected to execution.
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.6, opacity: .78 }}>
          Assess, design, build, operate and verify technology through one platform model:
          Domain → Provider → Service → Execution → Deployment → Runtime → Evidence.
        </p>
      </header>

      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
        {services.map((service) => (
          <Link key={service.slug} href={"/services/" + service.slug}
            style={{ display: "block", padding: 28, border: "1px solid rgba(127,127,127,.22)", borderRadius: 20, textDecoration: "none" }}>
            <p style={{ fontSize: 12, opacity: .55, margin: "0 0 12px" }}>{service.group}</p>
            <h2 style={{ margin: "0 0 12px", fontSize: 24 }}>{service.title}</h2>
            <p style={{ margin: 0, lineHeight: 1.55, opacity: .72 }}>{service.text}</p>
          </Link>
        ))}
      </section>

      <section style={{ marginTop: 56, padding: 28, borderRadius: 20, background: "rgba(127,127,127,.08)" }}>
        <h2 style={{ marginTop: 0 }}>Delivery model</h2>
        <p style={{ lineHeight: 1.7, opacity: .78 }}>
          Assess → Design → Build → Operate → Verify. Provider-dependent capabilities remain gated until the relevant
          technical, commercial and runtime evidence exists.
        </p>
      </section>
    </main>
  );
}
