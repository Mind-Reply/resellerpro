import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { setAccountSession } from "@/lib/account-auth";

const schema = z.object({
  name: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(320),
  password: z.string().min(10).max(128),
  workspaceName: z.string().trim().min(2).max(160).optional(),
});

export async function POST(request: Request) {
  try {
    const input = schema.parse(await request.json());
    const email = input.email.toLowerCase();

    const existing = await prisma.customer.findFirst({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "An account already exists for this email." }, { status: 409 });
    }

    const passwordHash = await hash(input.password, 12);
    const workspace = await prisma.workspace.create({
      data: {
        name: input.workspaceName || `${input.name}'s workspace`,
        customers: {
          create: {
            email,
            displayName: input.name,
            passwordHash,
            profileComplete: true,
          },
        },
      },
      include: { customers: true },
    });

    const customer = workspace.customers[0];
    await setAccountSession(customer.id, workspace.id);

    return NextResponse.json({
      ok: true,
      user: {
        id: customer.id,
        email: customer.email,
        name: customer.displayName,
        workspaceId: workspace.id,
        workspaceName: workspace.name,
      },
    });
  } catch (error) {
    const message = error instanceof z.ZodError ? "Please provide a valid name, email and password." : "Unable to create the account.";
    return NextResponse.json({ ok: false, error: message }, { status: error instanceof z.ZodError ? 400 : 500 });
  }
}
