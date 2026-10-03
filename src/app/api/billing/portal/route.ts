import { NextResponse } from "next/server";
import { z } from "zod";
import { getAccountSession } from "@/lib/account-auth";
import { createBillingPortalSession } from "@/lib/billing";

const schema = z.object({ returnUrl: z.string().url() });

export async function POST(request: Request) {
  const user = await getAccountSession();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  try {
    const { returnUrl } = schema.parse(await request.json());
    return NextResponse.json(await createBillingPortalSession({
      customerId: user.id,
      returnUrl,
    }));
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : "Billing portal could not be created.",
    }, { status: 400 });
  }
}
