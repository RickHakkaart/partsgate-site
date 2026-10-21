# Partsgate: governed ordering for hardware agents

Your agent can order the BOM. You approve the money.

Partsgate is the ordering step for hardware agents. Agents find parts and build the cart anywhere. Partsgate places the order at Mouser or DigiKey on your own account, inside limits you set, and a human approves anything above them.

[Connect your agent](docs/connect.md)

Example, not a real order. Agent bom-buyer is asked: "Order the BOM of rev B for 5 boards from Mouser, 10% spare on passives, max EUR 300." It passes the category, per-order and monthly-cap checks, then lands above the approval threshold of EUR 250.00 (order total EUR 287.40), so it waits for a human. Distributor confirmation: none yet.

## Where it sits

Coding agents already read your KiCad project, pull the BOM and compare distributors. They stop before the part that costs money. Partsgate is that last step, not another search engine: one MCP server with six tools, company accounts, per-agent spend mandates and a human approval queue.

## What stays under your control

- A mandate per agent: maximum per order, monthly cap, allowed categories and an approval threshold. Hard limits are denied before anything is sent.
- A human above the threshold: the order waits and nothing reaches the distributor until an approver says yes. A rejection needs a reason.
- Re-quote before placing: price and stock are checked again right before the order goes out, and again on approval.
- Confirmed means confirmed: only when the distributor returns its own order number. What an agent claims about status is ignored.

## Connect in 60 seconds

Get an agent API key from your company admin, then run one command in Claude Code. Other clients are on the [connect page](docs/connect.md).

Claude Code:

```
claude mcp add --transport http partsgate https://partsgate.example/mcp --header "Authorization: Bearer <key>"
```

## Status, plainly

> Partsgate is pre-launch. The Mouser and DigiKey connectors are written against the distributors' documentation and have not been verified against a live account yet. Until then, treat every order as a design-partner pilot with a low cap. See [pricing](pricing.md) for what a design partner gets.


Source: https://partsgate.example/index.md
