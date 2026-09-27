import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { setAccountSession } from "@/lib/account-auth";

const schema = z.object({
  email: z.string().trim().email().max(320),
  password: z.string().min(1).max(128),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const email = input.email.toLowerCase();
    const customers = await prisma.customer.findMany({
      where: { email },
      take: 2,
      select: {
        id: true,
        email: true,
        passwordHash: true,
        displayName: true,
        workspaceId: true,
        workspace: { select: { id: true, name: true } },
      },
    });

    const customer = customers.length === 1 ? customers[0] : null;
    if (!customer?.passwordHash || !(await compare(input.password, customer.passwordHash))) {
      return NextResponse.json({ ok: false, error: "Invalid email or password." }, { status: 401 });
    }

    await setAccountSession(customer.id, customer.workspaceId);

    return NextResponse.json({
      ok: true,
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.displayName,
        workspaceId: customer.workspace.id,
        workspaceName: customer.workspace.name,
      },
    });
  } catch (error) {
    const message = error instanceof z.ZodError ? "Please provide a valid email and password." : "Unable to sign in.";
    return NextResponse.json({ ok: false, error: message }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}
