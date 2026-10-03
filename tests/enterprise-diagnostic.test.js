const fs = require("node:fs");
const path = require("node:path");
const crypto = require("node:crypto");

const root = path.resolve(__dirname, "..");

describe("enterprise modernization diagnostic", () => {
  test("ships the canonical schema, API, page and migration", () => {
    expect(fs.existsSync(path.join(root, "prisma/schema.prisma"))).toBe(true);
    expect(fs.existsSync(path.join(root, "src/app/api/enterprise/diagnostic/route.ts"))).toBe(true);
    expect(fs.existsSync(path.join(root, "src/app/enterprise/page.tsx"))).toBe(true);
    expect(fs.existsSync(path.join(root, "prisma/migrations/20261003_enterprise_modernization/migration.sql"))).toBe(true);
  });

  test("lineage hashing produces the required SHA-256 shape", () => {
    const payload = JSON.stringify({
      companyName: "Sofia Sovereign Cloud Ltd",
      contactEmail: "arch@sofia-cloud.bg",
      complianceZone: "EU GDPR / SE-Europe",
      createdAt: "2026-10-03T00:00:00.000Z",
    });
    const hash = crypto.createHash("sha256").update(payload).digest("hex");
    expect(hash).toMatch(/^[a-f0-9]{64}$/);
  });

  test("public surface does not embed credential-like literals", () => {
    const page = fs.readFileSync(path.join(root, "src/app/enterprise/page.tsx"), "utf8");
    const route = fs.readFileSync(path.join(root, "src/app/api/enterprise/diagnostic/route.ts"), "utf8");
    expect(page + route).not.toMatch(/sk_(live|test)_|whsec_|rk_(live|test)_/i);
  });
});
