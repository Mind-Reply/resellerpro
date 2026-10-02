export const DUBAI_PROOF = "https://dubai.mind-reply.com";

export async function writeProof(
  id: string,
  payload: { side: string; evidence: string; host: string },
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
    },
  );

  if (!res.ok) {
    throw new Error(`Proof write failed: ${res.status}`);
  }

  const json: { receipt_id?: string } = await res.json();

  if (!json.receipt_id) {
    throw new Error("Proof service returned no receipt_id");
  }

  return json.receipt_id;
}

export async function readPublic() {
  const r = await fetch(`${DUBAI_PROOF}/monitor/public`, {
    cache: "no-store",
  });

  if (!r.ok) {
    throw new Error(`Public proof read failed: ${r.status}`);
  }

  return r.json();
}
