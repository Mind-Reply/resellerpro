import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/account-auth";
import { getSubscription } from "@/lib/billing";

export async function GET() {
  const user = await getAccountSession();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  return NextResponse.json({ subscription: await getSubscription(user.id) });
}
