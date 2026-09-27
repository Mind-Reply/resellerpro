import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/account-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const user = await getAccountSession();
  if (!user) return NextResponse.json({ error: "Authentication required." }, { status: 401 });

  const { id } = await context.params;
  const transaction = await prisma.transaction.findFirst({
    where: { id, customerId: user.id },
  });

  if (!transaction) return NextResponse.json({ error: "Transaction not found." }, { status: 404 });
  return NextResponse.json({ transaction });
}
