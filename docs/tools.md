# The six tools

Six tools, named and shaped after the Universal Commerce Protocol shopping service (`source/services/shopping/mcp.openrpc.json`). They are not yet schema-validated against the UCP JSON schemas. Variant ids look like `mouser:<sku>` or `digikey:<sku>`. One distributor per checkout.

### search_catalog

Search components by MPN or keyword across Mouser and DigiKey, priced at your company's own distributor account.

- `catalog.query`: MPN or keyword
- `catalog.filters.categories`: optional list
- `catalog.pagination.limit`: 1 to 50

### get_product

Product detail: stock, minimum order quantity and price breaks at your pricing.

- `catalog.id`: an MPN or a variant id

### create_checkout

Create a checkout from variant ids and quantities.

- `checkout.line_items[]`: each with `item.id` and `quantity` (integer, 1 or more)

### update_checkout

Replace the line items and re-price. Use it after a failed re-quote.

- `id`: the checkout id
- `checkout.line_items[]`: as above

### complete_checkout

Place the order. Over your approval threshold it waits for a human.

- `id`: the checkout id
- `meta["idempotency-key"]` or an `Idempotency-Key` header: required

Over the threshold the checkout reports `complete_in_progress` and the order is `pending_approval`. Poll `get_order`.

### get_order

Order state, including `pending_approval` and `confirmed`, and the distributor's order number.

- `id`: the order id


Source: https://partsgate.example/docs/tools.md
