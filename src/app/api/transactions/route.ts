import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/account-auth";
import { listTransactions } from "@/lib/billing";

export async function GET(request: Request) {
  const user = await getAccountSession();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const url = new URL(request.url);
  const offset = Number(url.searchParams.get("offset") || 0);
  const limit = Number(url.searchParams.get("limit") || 50);

  return NextResponse.json({
    transactions: await listTransactions(user.id, offset, limit),
    offset,
    limit,
  });
}
