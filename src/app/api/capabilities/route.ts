import { NextResponse } from "next/server";
import { CAPABILITY_REGISTRY } from "@/lib/capability-registry";
import { getBillingReadiness } from "@/lib/billing";

export async function GET() {
  return NextResponse.json({
    status: "IMPLEMENTED",
    commercialAuthority: "stripe",
    billing: getBillingReadiness(),
    canonicalRepository: "Mind-Reply/resellerpro",
    capabilities: CAPABILITY_REGISTRY,
    generatedAt: new Date().toISOString(),
  }, { headers: { "Cache-Control": "no-store" } });
}
