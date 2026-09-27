import { NextResponse } from "next/server";
import { getAccountSession } from "@/lib/account-auth";

export async function GET() {
  const user = await getAccountSession();
  return NextResponse.json({
    authenticated: Boolean(user),
    user: user
      ? {
          id: user.id,
          email: user.email,
          name: user.displayName,
          profileComplete: user.profileComplete,
          workspaceId: user.workspace.id,
          workspaceName: user.workspace.name,
        }
      : null,
  });
}
