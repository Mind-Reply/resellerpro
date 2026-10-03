const fs = require("node:fs");
const path = require("node:path");

describe("Stripe-first capability layer", () => {
  test("registry contains all requested capability transfers", () => {
    const source = fs.readFileSync(path.join(__dirname, "../src/lib/capability-registry.ts"), "utf8");
    for (const key of [
      "intent-to-product",
      "visual-first",
      "live-preview",
      "agentic-engineering",
      "github-native",
      "full-stack-generation",
      "visual-code-control",
      "automatic-qa",
      "proof-artifacts",
      "design-system-memory",
      "controlled-deployment",
      "version-rollback",
      "integrations",
      "parallel-execution",
      "owner-control",
      "mobile-first",
      "idea-to-evidence-loop",
    ]) expect(source).toContain(key);
  });

  test("Stripe implementation has no hard-coded secret or price identifier", () => {
    const source = fs.readFileSync(path.join(__dirname, "../src/lib/billing.ts"), "utf8");
    expect(source).not.toMatch(/sk_(live|test)_[A-Za-z0-9]+/);
    expect(source).not.toMatch(/price_[A-Za-z0-9]+/);
  });

  test("commercial routes are present", () => {
    expect(fs.existsSync(path.join(__dirname, "../src/app/api/capabilities/route.ts"))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, "../src/app/api/billing/portal/route.ts"))).toBe(true);
    expect(fs.existsSync(path.join(__dirname, "../src/app/api/billing/checkout/one-time/route.ts"))).toBe(true);
  });
});
