"use client";

import { useState } from "react";

type Region = "eu_sovereign" | "uk_global" | "balkans";
type DataMaturity = "siloed_legacy" | "lakehouse_in_progress" | "active_realtime";
type PrimaryPillar =
  | "sovereign_platform"
  | "governed_ai_ml"
  | "data_analytics"
  | "cloud_hybrid_infra"
  | "app_modernization"
  | "zero_trust_security"
  | "managed_operations"
  | "digital_workplace";

type Result = {
  success: boolean;
  assessmentId: string;
  verificationHash: string;
  exposureRiskScore: number;
  blueprint: {
    targetArchitecture: string;
    recommendedPhases: string[];
  };
};

const pillars: { value: PrimaryPillar; label: string }[] = [
  { value: "sovereign_platform", label: "Sovereign platform" },
  { value: "governed_ai_ml", label: "Governed AI & workflows" },
  { value: "data_analytics", label: "Data & analytics" },
  { value: "cloud_hybrid_infra", label: "Hybrid cloud infrastructure" },
  { value: "app_modernization", label: "Application modernization" },
  { value: "zero_trust_security", label: "Zero-trust security" },
  { value: "managed_operations", label: "Managed operations & SRE" },
  { value: "digital_workplace", label: "Digital workplace" },
];

export default function EnterprisePage() {
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [region, setRegion] = useState<Region>("eu_sovereign");
  const [dataMaturity, setDataMaturity] = useState<DataMaturity>("siloed_legacy");
  const [primaryPillar, setPrimaryPillar] = useState<PrimaryPillar>("sovereign_platform");
  const [complianceZone, setComplianceZone] = useState("EU GDPR / SE-Europe");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  async function submit() {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("/api/enterprise/diagnostic", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          companyName,
          contactEmail,
          region,
          dataMaturity,
          primaryPillar,
          complianceZone,
        }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "Diagnostic unavailable.");
      setResult(payload as Result);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : "Diagnostic unavailable.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="enterprise-page">
      <header className="enterprise-nav">
        <a href="/" className="enterprise-brand"><span>RP</span> ResellerPro</a>
        <nav>
          <a href="#stack">Platform</a>
          <a href="#diagnostic">Diagnostic</a>
          <a href="#operations">Operations</a>
        </nav>
        <a className="enterprise-nav-cta" href="/workspace">Owner workspace →</a>
      </header>

      <section className="enterprise-hero">
        <div>
          <p className="enterprise-kicker">RESELLERPRO / ENTERPRISE MODERNIZATION</p>
          <h1>Modernize the stack.<br /><em>Keep the authority.</em></h1>
          <p className="enterprise-lede">
            A governed modernization surface for hybrid infrastructure, data, applications and operational controls.
            Start with an evidence-backed diagnostic and a scoped delivery blueprint.
          </p>
          <div className="enterprise-actions">
            <a href="#diagnostic" className="enterprise-primary">Run readiness diagnostic</a>
            <a href="#stack" className="enterprise-secondary">Explore the stack</a>
          </div>
          <div className="enterprise-proof">
            <span>OWNER-GOVERNED</span><span>PROVIDER-NEUTRAL</span><span>LINEAGE-VERIFIED</span>
          </div>
        </div>

        <div className="enterprise-console">
          <div className="enterprise-console-top"><span><i /> CONTROL PLANE / OBSERVED</span><b>EDGE</b></div>
          <div className="enterprise-console-grid">
            <aside>
              <strong>ENTERPRISE</strong>
              <span className="active">Readiness</span>
              <span>Exposure</span>
              <span>Lineage</span>
              <span>Operations</span>
            </aside>
            <div className="enterprise-console-main">
              <small>MODERNIZATION SIGNAL</small>
              <h2>Observe → Operate → Optimize</h2>
              <div className="enterprise-signal"><b>01</b><span>Runtime telemetry</span><strong>READY</strong></div>
              <div className="enterprise-signal"><b>02</b><span>Approval controls</span><strong>READY</strong></div>
              <div className="enterprise-signal"><b>03</b><span>Lineage evidence</span><strong>TRACEABLE</strong></div>
              <div className="enterprise-hash">sha256 / assessment lineage / generated per submission</div>
            </div>
          </div>
        </div>
      </section>

      <section className="enterprise-strip">
        <div><strong>01</strong><span>OBSERVE</span><p>Inventory runtime state, exposure and data movement.</p></div>
        <div><strong>02</strong><span>OPERATE</span><p>Introduce explicit control points and change authority.</p></div>
        <div><strong>03</strong><span>OPTIMIZE</span><p>Modernize workloads while preserving evidence.</p></div>
      </section>

      <section id="stack" className="enterprise-section">
        <div className="enterprise-heading"><div><p className="enterprise-kicker">THE STACK</p><h2>Modernization without surrendering the control plane.</h2></div><p>Cloud, applications, data and operational providers remain replaceable adapters around an owner-controlled operating model.</p></div>
        <div className="enterprise-bento">
          <article className="wide"><span>01 / GOVERNED AI & WORKFLOWS</span><h3>Human authority stays explicit.</h3><p>Bounded automation can prepare work and evidence; material mutation remains attached to an approval boundary.</p><code>observe → propose → approve → execute → verify</code></article>
          <article><span>02 / ZERO-TRUST</span><h3>Identity before execution.</h3><p>Scope access to the workspace, provider and operation before an action reaches infrastructure.</p></article>
          <article><span>03 / DATA LINEAGE</span><h3>Every material record has context.</h3><p>Capture source, outcome and cryptographic payload evidence alongside operational events.</p></article>
          <article><span>04 / APPLICATIONS</span><h3>Phased modernization.</h3><p>Separate interfaces from legacy cores and move capability incrementally instead of rewriting blindly.</p></article>
          <article className="wide"><span>05 / MANAGED OPERATIONS</span><h3>One release rail from source to runtime.</h3><p>Keep build state, provider execution, runtime verification and recorded evidence distinct so the dashboard never confuses intent with live state.</p></article>
        </div>
      </section>

      <section id="diagnostic" className="enterprise-diagnostic">
        <div className="enterprise-heading"><div><p className="enterprise-kicker">READINESS DIAGNOSTIC</p><h2>Turn the current state into a scoped blueprint.</h2></div><p>The diagnostic stores a tamper-evident SHA-256 lineage hash with the assessment. The exposure score is a transparent heuristic, not a regulatory certification.</p></div>
        <div className="enterprise-form-shell">
          <div className="enterprise-form">
            <label>Enterprise name<input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Acme Logistics" maxLength={255} /></label>
            <label>Work email<input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="architecture@company.eu" maxLength={320} /></label>
            <label>Delivery zone<select value={region} onChange={(e) => setRegion(e.target.value as Region)}><option value="eu_sovereign">EU / SE-Europe</option><option value="uk_global">UK & Global</option><option value="balkans">Balkans gateway</option></select></label>
            <label>Data maturity<select value={dataMaturity} onChange={(e) => setDataMaturity(e.target.value as DataMaturity)}><option value="siloed_legacy">Siloed legacy</option><option value="lakehouse_in_progress">Lakehouse in progress</option><option value="active_realtime">Active realtime</option></select></label>
            <label>Primary capability<select value={primaryPillar} onChange={(e) => setPrimaryPillar(e.target.value as PrimaryPillar)}>{pillars.map((pillar) => <option key={pillar.value} value={pillar.value}>{pillar.label}</option>)}</select></label>
            <label>Compliance / control zone<input value={complianceZone} onChange={(e) => setComplianceZone(e.target.value)} maxLength={100} /></label>
            <button onClick={submit} disabled={loading || !companyName || !contactEmail}>{loading ? "Generating lineage proof…" : "Run diagnostic & produce blueprint"}</button>
            {error && <p className="enterprise-error">{error}</p>}
          </div>

          <div className="enterprise-result">
            {!result ? <><span>OUTPUT</span><h3>Blueprint appears here.</h3><p>Submit the assessment to receive the registered assessment ID, exposure heuristic and verification hash.</p></> : <>
              <span>ASSESSMENT REGISTERED</span>
              <h3>Scoped with lineage proof.</h3>
              <p>Assessment ID: <code>{result.assessmentId}</code></p>
              <p>Exposure heuristic: <strong>{result.exposureRiskScore}%</strong></p>
              <p className="enterprise-hash-result">{result.verificationHash}</p>
              <div className="enterprise-phases">{result.blueprint.recommendedPhases.map((phase) => <div key={phase}>{phase}</div>)}</div>
            </>}
          </div>
        </div>
      </section>

      <section id="operations" className="enterprise-operations">
        <p className="enterprise-kicker">OPERATIONS SLA</p>
        <h2>Observe. Operate. Optimize.</h2>
        <div className="enterprise-plans">
          <article><span>01</span><h3>Observe</h3><strong>$2,500 / mo</strong><p>Telemetry, exposure register and runtime health.</p></article>
          <article className="featured"><span>02</span><h3>Operate</h3><strong>$7,500 / mo</strong><p>Change management, incident response and approval controls.</p></article>
          <article><span>03</span><h3>Optimize</h3><strong>Enterprise</strong><p>Architectural modernization and workload optimization.</p></article>
        </div>
      </section>

      <footer className="enterprise-footer"><span>ResellerPro · Mind-Reply</span><span>Source · Build · Approve · Execute · Verify · Record</span></footer>
    </main>
  );
}
