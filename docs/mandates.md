# Mandates and approvals

A mandate is what one agent may spend. An admin sets it per agent in the dashboard. Every `complete_checkout` is judged against it.

## The limits

One Partsgate install serves one company (single-tenant): one install is one company. Limits are set per agent; a company admin sets them in the dashboard.

| Limit | What happens when it is hit |
|---|---|
| Maximum per order | Denied. The agent gets a `mandate_denied` error and nothing is sent. |
| Monthly cap | Denied. Pending, unconfirmed and confirmed orders count towards the cap. |
| Allowed categories | Denied if a line is outside the categories the agent may buy. |
| Allowed suppliers | Denied if the checkout is at a supplier the agent may not use. Empty means any. |
| Allowed ship-to destinations | Denied if the ship-to code is not on the list. Empty means anywhere. |
| Approval threshold | Not denied. The order waits as `pending_approval` until a human approves or rejects it. |
| Approval expiry | A waiting approval expires (72 hours by default, per install). The order is cancelled and its counted spend is released. |
| Approver ceiling | Each approver can have a EUR ceiling; above it the Approve button is off and the server refuses. |
| Four-eyes | The human owner of an agent cannot approve its orders, and cannot raise or widen its limits. Boundary: this protects against agents and non-admin staff, not against a malicious admin of the install, who controls the server. See [self-host](self-host.md) and the guarantees document. |

## What an approver sees

The agent, the supplier and the lines, the total, why it needs a human, the agent's mandate and what it already spent this month. Approve places the order. Reject needs a reason and the order is cancelled.


## Order states

| State | Meaning |
|---|---|
| Needs approval (`pending_approval`) | Above the threshold. Nothing has gone to the distributor. |
| Approved, sending (`approved`, `placing`) | A human approved. The order is being placed. Not final. |
| Confirmed (`confirmed`) | The distributor returned its own order number. The only success state. |
| Failed or rejected (`failed`, `rejected`) | The distributor refused, or an approver said no. |
| Cancelled (`cancelled`) | Closed without being placed. |

## Five rules that always hold

1. `complete_checkout` needs an idempotency key. The same key returns the same order and never a second distributor order.
2. The mandate is checked on every completion.
3. The order is re-quoted right before placing, and again on approval. A changed total, quantity or stock aborts it.
4. `confirmed` only when the distributor returns an order number. Agent-supplied status or order claims are ignored.
5. Completions are serialised with a database lock, so two retries cannot both place an order.

## Error codes you will see

`mandate_denied`, `missing_idempotency_key`, `idempotency_key_reuse`, `mixed_supplier`, `quote_failed`, `agent_revoked`, `not_found`. Errors come back as an MCP tool result with `isError` and a `messages` array holding the code.


Source: https://partsgate.example/docs/mandates.md
