import { NextResponse } from "next/server";
import { getBillingReadiness } from "@/lib/billing";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let database = "unverified";
  try {
    await prisma.$queryRaw`SELECT 1`;
    database = "reachable";
  } catch {
    database = "unreachable";
  }

  const billing = getBillingReadiness();

  return NextResponse.json({
    ok: database === "reachable",
    runtime: process.env.RESELLERPRO_MODE || "controlled",
    deploymentAuthority: "ResellerPro",
    runtimeTarget: "Cloudflare/OpenNext",
    database,
    billing: {
      mode: billing.mode,
      configured: billing.configured,
      checkoutEnabled: billing.checkoutEnabled,
      webhookEnabled: billing.webhookEnabled,
    },
    liveCommerceEnabled: billing.checkoutEnabled && billing.mode === "live",
    checkedAt: new Date().toISOString(),
  }, {
    headers: { "Cache-Control": "no-store" },
  });
}
