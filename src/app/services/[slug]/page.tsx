import Link from "next/link";

const catalog: Record<string, {title:string; group:string; description:string; outcomes:string[]}> = {
  "innovation-intelligence": {title:"Innovation & Intelligence", group:"Innovation & Intelligence", description:"Predictive insights, intelligent workflows and practical technology adoption tied to measurable business outcomes.", outcomes:["Opportunity assessment","Workflow design","Decision intelligence","Implementation measurement"]},
  "data-analytics": {title:"Data & Analytics", group:"Innovation & Intelligence", description:"Robust data architecture, operational analytics and evidence-backed decision surfaces.", outcomes:["Data architecture","Operational dashboards","Anomaly and trend analysis","Evidence-backed reporting"]},
  "infrastructure-modernisation": {title:"Infrastructure Modernisation", group:"Core Technology & Development", description:"Scalable cloud or hybrid environments designed around resilience, security and controlled operations.", outcomes:["Estate assessment","Migration design","Runtime monitoring","Recovery and continuity"]},
  "application-modernisation": {title:"Application Modernisation", group:"Core Technology & Development", description:"Legacy modernisation and cloud-native development with controlled releases and observable runtime state.", outcomes:["Architecture review","Modernisation plan","Release engineering","Runtime verification"]},
  "security": {title:"Security", group:"Operations, Security & People", description:"Practical protection, monitoring and governance across applications, infrastructure and access.", outcomes:["Security posture review","Access and secrets controls","Threat and dependency checks","Evidence and remediation"]},
  "managed-services": {title:"Managed Services", group:"Operations, Security & People", description:"Day-to-day technology operation with defined service boundaries, monitoring, escalation and evidence.", outcomes:["Service monitoring","Incident/change handling","Maintenance","Operational reporting"]},
  "digital-workplace": {title:"Digital Workplace", group:"Operations, Security & People", description:"Secure, collaborative workplace systems connected to operational workflows.", outcomes:["Workplace assessment","Identity and access","Collaboration setup","Adoption measurement"]},
  "training": {title:"Training", group:"Operations, Security & People", description:"Role-specific enablement tied to the technology actually deployed and operated.", outcomes:["Skills assessment","Role-based learning","Operational playbooks","Capability measurement"]},
};

export function generateStaticParams() { return Object.keys(catalog).map(slug => ({ slug })); }

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = catalog[slug];
  if (!service) return <main style={{padding:40}}><h1>Service not found</h1><Link href="/services">Back to services</Link></main>;

  return <main style={{maxWidth:900, margin:"0 auto", padding:"72px 24px"}}>
    <Link href="/services">← All services</Link>
    <p style={{marginTop:48, opacity:.6, fontSize:13, textTransform:"uppercase", letterSpacing:".12em"}}>{service.group}</p>
    <h1 style={{fontSize:"clamp(42px,7vw,72px)", lineHeight:1.04, margin:"12px 0 22px"}}>{service.title}</h1>
    <p style={{fontSize:21, lineHeight:1.6, opacity:.78}}>{service.description}</p>
    <h2 style={{marginTop:52}}>Operating outcomes</h2>
    <ul style={{lineHeight:2, paddingLeft:22}}>{service.outcomes.map(x => <li key={x}>{x}</li>)}</ul>
    <div style={{marginTop:48, padding:24, border:"1px solid rgba(127,127,127,.22)", borderRadius:18}}>
      <strong>Execution boundary</strong>
      <p style={{lineHeight:1.6, opacity:.72}}>Delivery proceeds through assessment, design, build, operation and verification. No provider, pricing, availability or runtime claim is exposed without current evidence.</p>
    </div>
  </main>;
}
