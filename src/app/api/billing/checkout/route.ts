import { NextResponse } from "next/server";
import { z } from "zod";
import { getAccountSession } from "@/lib/account-auth";
import { createCheckoutSession } from "@/lib/billing";

const schema = z.object({
  planId: z.enum(["starter", "growth", "enterprise"]),
  returnUrl: z.string().url(),
});

export async function POST(request: Request) {
  const user = await getAccountSession();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  try {
    const input = schema.parse(await request.json());
    const result = await createCheckoutSession({
      customerId: user.id,
      workspaceId: user.workspaceId,
      email: user.email,
      planId: input.planId,
      returnUrl: input.returnUrl,
    });
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Checkout could not be created.",
    }, { status: 400 });
  }
}
