# Self-host quickstart

Partsgate is open source (Apache-2.0) and meant to be run by your own team, on your own distributor keys. Your keys and your distributor account stay with you. See [pricing](../pricing.md) for why it is built this way.

> Status: pre-launch. The distributor connectors are written against the vendors' documentation and have never talked to a live account. Start with mock mode, then a read-only live search, and keep caps low.

## Requirements

- Node 22 and npm.
- Either Docker, or nothing else: a user-space Postgres is bundled for local use.

## Path A: local, no Docker

Run in the repository:

```
npm install
npm run setup:env          # writes .env with random secrets
node scripts/pg.mjs start  # leave running: Postgres on 127.0.0.1:54329
npx medusa db:migrate
npx medusa exec ./src/scripts/seed.ts   # demo company + agent keys (.demo-keys.json)
npx medusa user -e you@example.com -p "a-long-password"
npx medusa develop         # dashboard at http://localhost:9000/app
```

Creating your own company and first admin is not in the dashboard yet; today it is the seed script or a module call. This is the biggest gap before real use.

## Path B: Docker Compose

```
cp deploy/prod.env.example deploy/prod.env   # fill in random values
docker compose -f deploy/compose.prod.yml --env-file deploy/prod.env up --build
```

The compose file and Dockerfile have not been executed by the author yet. Put a TLS reverse proxy in front; the server binds 127.0.0.1 only.

## Add your distributor keys

Keys belong to your team and go in the server environment, never in chat or source control.

- Mouser: `MOUSER_API_KEY` (search) and `MOUSER_ORDER_API_KEY` (cart and order).
- DigiKey: `DIGIKEY_CLIENT_ID`, `DIGIKEY_CLIENT_SECRET`, plus your account id and, for ordering, a DigiKey credit account.
- Switch on with `PARTSGATE_SUPPLIER_MODE=live`. Placing real orders needs a second switch, `PARTSGATE_LIVE_ORDERS=1`.

First check, read-only: `npm run connector:smoke` runs one search per distributor and never orders.

## Then connect an agent

Create an agent and its key under Buyer company, set its mandate, and follow the [connect page](connect.md) with your own server URL.

Source: https://partsgate.example/docs/self-host.md
