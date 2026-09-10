# Layer 2 Reasoning Engine — ResellerPro

The supplied Threadripper/vLLM script is treated as a **private-node reference implementation**, not as production-ready deployment code.

## Required corrections before execution

- Verify the actual NVIDIA GPU architecture before setting `TORCH_CUDA_ARCH_LIST`; the supplied `8.9` value must not be assumed for every RTX Pro 6000 generation.
- Do not hard-code `sudo` or assume passwordless privilege escalation in an unattended worker.
- Verify that CPU core range `25-48` matches the real host topology before pinning.
- Make model path, port, worker count and resource limits configuration-driven.
- Add health/readiness checks for the vLLM endpoint before reporting `VERIFIED`.
- Use a supervised service (systemd/container/orchestrator) for long-running execution rather than a background shell process.
- Keep runtime logs separate from the commerce ledger; ledger entries store references/hashes, not large logs.
- Fail closed when audit storage is unavailable.
- Never allow the reasoning worker to execute purchases, payments, destructive infrastructure actions, or membership renewals directly.

## Boundary

Layer 2 may reason, rank, summarize, compare and prepare actions. The control plane owns authorization. The ledger owns evidence. An owner approval is required before external/irreversible commerce actions.

## Interface contract

Input: normalized task + relevant ledger/signal context.

Output: structured recommendation containing `operation_id`, `decision`, `confidence`, `assumptions`, `evidence_refs`, `risk`, `proposed_action`, and `approval_required`.

No free-form model output is accepted as proof of execution.
