interface ProofRecord {
  receipt_id: string;
  id: string;
  side: string;
  host: string;
  evidence: string;
  ts: string;
  status: "PROVEN";
}

interface Env {
  PROOF_VAULT: KVNamespace;
  ASSETS: Fetcher;
}

const corsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET,POST,OPTIONS",
  "access-control-allow-headers": "content-type",
};

function json(data: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(data), {
    ...init,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...corsHeaders,
      ...(init.headers ?? {}),
    },
  });
}

function receiptKey(id: string) {
  return `receipt:${id}`;
}

function publicKey(side: string) {
  return `latest:${side}`;
}

function normalizeSide(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : "";
}

async function handleProofPost(request: Request, id: string, env: Env) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return json({ error: "invalid_json" }, { status: 400 });
  }

  const side = normalizeSide(body.side);
  const evidence = typeof body.evidence === "string" ? body.evidence.trim() : "";
  const host = typeof body.host === "string" ? body.host.trim() : "";

  if (!id || !side || !evidence || !host) {
    return json(
      { error: "required_fields: id, side, evidence, host" },
      { status: 400 },
    );
  }

  const ts = new Date().toISOString();
  const receipt_id = `3650-${crypto.randomUUID()}`;

  const record: ProofRecord = {
    receipt_id,
    id,
    side,
    host,
    evidence,
    ts,
    status: "PROVEN",
  };

  await env.PROOF_VAULT.put(receiptKey(id), JSON.stringify(record));
  await env.PROOF_VAULT.put(
    publicKey(side),
    JSON.stringify({
      side,
      host,
      ts,
      status: "PROVEN",
      receipt_id,
    }),
  );

  return json({ receipt_id }, { status: 201 });
}

async function handleProofGet(env: Env, id: string) {
  const record = await env.PROOF_VAULT.get<ProofRecord>(receiptKey(id), "json");

  if (!record) {
    return json({ error: "proof_not_found" }, { status: 404 });
  }

  return json({
    receipt_id: record.receipt_id,
    id: record.id,
    side: record.side,
    host: record.host,
    ts: record.ts,
    status: record.status,
  });
}

async function handlePublic(env: Env) {
  const record = await env.PROOF_VAULT.get<{
    side: string;
    host: string;
    ts: string;
    status: "PROVEN";
    receipt_id: string;
  }>(publicKey("dubai"), "json");

  if (!record) {
    return json({
      side: "dubai",
      host: "dubai.mind-reply.com",
      ts: null,
      status: "UNVERIFIED",
    });
  }

  return json(record);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    const url = new URL(request.url);
    const match = url.pathname.match(/^\/proof\/([^/]+)$/);

    if (match) {
      const id = decodeURIComponent(match[1]);
      if (request.method === "POST") {
        return handleProofPost(request, id, env);
      }
      if (request.method === "GET") {
        return handleProofGet(env, id);
      }
      return json({ error: "method_not_allowed" }, { status: 405 });
    }

    if (url.pathname === "/monitor/public" && request.method === "GET") {
      return handlePublic(env);
    }

    if (url.pathname === "/health" && request.method === "GET") {
      return json({ service: "3650-live", status: "READY" });
    }

    return env.ASSETS.fetch(request);
  },
};
