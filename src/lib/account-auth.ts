import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import { prisma } from "@/lib/prisma";

const COOKIE_NAME = "rp_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;

type SessionPayload = {
  sub: string;
  workspaceId: string;
  exp: number;
};

function secret() {
  const value = process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET;
  if (!value) throw new Error("JWT_SECRET or NEXTAUTH_SECRET is required");
  return value;
}

function encode(payload: SessionPayload) {
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = createHmac("sha256", secret()).update(body).digest("base64url");
  return body + "." + sig;
}

function decode(token: string): SessionPayload | null {
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = createHmac("sha256", secret()).update(body).digest("base64url");
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.sub || !payload.workspaceId || !payload.exp || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export async function setAccountSession(customerId: string, workspaceId: string) {
  const store = await cookies();
  store.set(COOKIE_NAME, encode({
    sub: customerId,
    workspaceId,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function clearAccountSession() {
  const store = await cookies();
  store.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getAccountSession() {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  let payload: SessionPayload | null = null;
  try {
    payload = decode(token);
  } catch {
    return null;
  }
  if (!payload) return null;

  return prisma.customer.findFirst({
    where: { id: payload.sub, workspaceId: payload.workspaceId },
    select: {
      id: true,
      workspaceId: true,
      email: true,
      displayName: true,
      profileComplete: true,
      workspace: { select: { id: true, name: true } },
    },
  });
}

export function sessionCookieName() {
  return COOKIE_NAME;
}
