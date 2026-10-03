import { NextResponse } from "next/server";
import { handleStripeWebhook } from "@/lib/billing";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ received: false, error: "Missing Stripe signature." }, { status: 400 });

  try {
    const rawBody = await request.text();
    const result = await handleStripeWebhook(rawBody, signature);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      received: false,
      error: error instanceof Error ? error.message : "Webhook processing failed.",
    }, { status: 400 });
  }
}
