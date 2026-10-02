export const CAPABILITY_REGISTRY = [
  { key: "intent-to-product", sourceTrack: "Base44", capability: "Intent to working product", canonical: "ResellerPro", implementation: "bounded product/workspace workflows" },
  { key: "visual-first", sourceTrack: "Lovable", capability: "Visual-first product creation", canonical: "MindReply", implementation: "owner-controlled visual/product surface" },
  { key: "live-preview", sourceTrack: "Bolt.new", capability: "Live preview", canonical: "MindReply", implementation: "preview and independent runtime verification" },
  { key: "agentic-engineering", sourceTrack: "Replit Agent", capability: "Agentic engineering execution", canonical: "A11-K", implementation: "bounded execution contracts" },
  { key: "github-native", sourceTrack: "Cursor", capability: "GitHub-native ownership", canonical: "A11-K", implementation: "canonical repository and branch evidence" },
  { key: "full-stack-generation", sourceTrack: "v0", capability: "Full-stack generation", canonical: "ResellerPro", implementation: "Next.js runtime + API + persistence" },
  { key: "visual-code-control", sourceTrack: "Bubble", capability: "Visual editing without losing code control", canonical: "MindReply", implementation: "product surface backed by canonical source" },
  { key: "automatic-qa", sourceTrack: "Emergent", capability: "Automatic QA", canonical: "agent-control-plane", implementation: "test/build/health/evidence gates" },
  { key: "proof-artifacts", sourceTrack: "Emergent", capability: "Proof/evidence artifacts", canonical: "agent-control-plane", implementation: "evidence receipts" },
  { key: "design-system-memory", sourceTrack: "Lovable", capability: "Design-system memory", canonical: "MindReply", implementation: "canonical visual system" },
  { key: "controlled-deployment", sourceTrack: "Replit Agent", capability: "Controlled deployment", canonical: "ResellerPro", implementation: "Cloudflare/OpenNext release path" },
  { key: "version-rollback", sourceTrack: "Cursor", capability: "Versioning and rollback", canonical: "A11-K", implementation: "Git branch/commit release identity" },
  { key: "integrations", sourceTrack: "Base44", capability: "First-class integrations", canonical: "ResellerPro", implementation: "provider adapters and explicit credentials" },
  { key: "parallel-execution", sourceTrack: "Cursor", capability: "Parallel bounded execution", canonical: "agent-control-plane", implementation: "bounded task contracts" },
  { key: "owner-control", sourceTrack: "Bubble", capability: "Owner approval/control", canonical: "agent-control-plane", implementation: "approval and audit boundaries" },
  { key: "mobile-first", sourceTrack: "Lovable", capability: "Mobile/iPhone-first operation", canonical: "MindReply", implementation: "responsive owner/product surfaces" },
  { key: "idea-to-evidence-loop", sourceTrack: "Replit Agent", capability: "Idea → visual → implementation → test → deploy → verify → evidence → iterate", canonical: "agent-control-plane", implementation: "cross-repository release contract" },
] as const;

export type CapabilityKey = (typeof CAPABILITY_REGISTRY)[number]["key"];
