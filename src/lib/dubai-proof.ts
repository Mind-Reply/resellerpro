export const DUBAI_PROOF = "https://dubai.mind-reply.com";

export type DubaiProofPayload = {
  side: string;
  evidence: string;
  host: string;
  hash?: string;
  evidence_url?: string;
};

export async function writeDubaiProof(
  id: string,
  payload: DubaiProofPayload
) {
  const res = await fetch(
    `${DUBAI_PROOF}/proof/${encodeURIComponent(id)}`,
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...payload,
        ts: new Date().toISOString(),
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Dubai proof write failed: ${res.status}`);
  }

  const json: { receipt_id?: string } = await res.json();

  if (!json.receipt_id) {
    throw new Error("Dubai proof returned no receipt_id");
  }

  return json.receipt_id;
}

export async function readDubaiPublicProof() {
  const res = await fetch(`${DUBAI_PROOF}/monitor/public`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Dubai proof read failed: ${res.status}`);
  }

  return res.json();
}
