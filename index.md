# bomhq: governed ordering for hardware agents

Your agent can order the BOM. You approve the money.

Connect Claude Code in 60 seconds:

```
claude mcp add --transport http bomhq https://bomhq.example-company.com/mcp --header "Authorization: Bearer <key>"
```

Get the agent key from your company admin. Other clients are on the [connect page](docs/connect.md). bomhq places the order at Mouser or DigiKey on your own account, inside limits you set, and a human approves anything above them.

## What you see when an order needs you

Example, not a real order. Status: Needs approval. Agent bom-buyer, BOM rev B x 5, spare passives, EUR 287.40, expires in 71 h.

- Asked for: "Order the BOM of rev B for 5 boards from Mouser, 10% spare on passives, max EUR 300."
- Categories: allowed: passives, ics
- Per order: under the maximum of EUR 500.00
- This month: inside the cap of EUR 2,000.00
- Threshold: above EUR 250.00, so it waits for a human
- Distributor confirmation: none yet. It appears only after a human approves and the distributor returns an order number.

## Where it sits

Coding agents already read your KiCad project, pull the BOM and compare distributors. They stop before the part that costs money. bomhq is that last step, not another search engine: one MCP server with six tools, per-agent spend mandates and a human approval queue.

## What stays under your control

- A mandate per agent: maximum per order, monthly cap, allowed categories and an approval threshold. Hard limits are denied before anything is sent.
- A human above the threshold: over the threshold the order waits. Nothing reaches the distributor until an approver says yes. A rejection needs a reason.
- Re-quote before placing: the price and stock are checked again right before the order goes out, and again on approval. If they changed, the order stops.
- Confirmed means confirmed: an order is confirmed only when the distributor returns its own order number. What an agent claims about payment or status is ignored.

## Run it yourself

One bomhq install serves one company (single-tenant): one install is one company. bomhq is open source (Apache-2.0) and self-hosted first: your team runs it with your own distributor keys. See the [self-host quickstart](docs/self-host.md).

## Status, plainly

Pre-launch. The Mouser and DigiKey connectors are written against the distributors' documentation and have not been verified against a live account yet. Until then, keep caps low. See [pricing](pricing.md) for the open-source and extras picture.


Source: https://bomhq.com/index.md
