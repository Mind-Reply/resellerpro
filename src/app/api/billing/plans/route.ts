import { NextResponse } from "next/server";
import { getBillingPlans, getBillingReadiness } from "@/lib/billing";

export async function GET() {
  return NextResponse.json({
    plans: getBillingPlans(),
    readiness: getBillingReadiness(),
  });
}
