# Connect your agent

Pick your client. Each one needs the same two things: the server URL and an agent API key.

### Claude Code

Run in your terminal:

```
claude mcp add --transport http partsgate https://partsgate.example/mcp --header "Authorization: Bearer <key>"
```

### Cursor and other JSON clients

Add to your client's MCP configuration file (for Cursor, mcp.json):

```
{
  "mcpServers": {
    "partsgate": {
      "url": "https://partsgate.example/mcp",
      "headers": { "Authorization": "Bearer <key>" }
    }
  }
}
```

No one-click install link is published for Cursor: it has not been verified.

### Plain HTTP

```
curl -s https://partsgate.example/mcp \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

## Before you run it

1. Ask a company admin to create an agent under **Buyer company** in the Partsgate dashboard and set its mandate.
2. Copy the key when it is shown. It starts with `pgk_` and is shown once; only its hash is stored.
3. Replace `<key>` in the command. Keep the key out of chat history and source control.

## Check it works

Ask your agent: "Search the catalog for GRM188R71C104KA01D and tell me the price breaks." It should call `search_catalog`. Prices are those of your company's own distributor account.

Discovery profile for clients that read it: `https://partsgate.example/.well-known/ucp`. The tools and their arguments are on the [tools page](tools.md); limits and approvals are on the [mandates page](mandates.md).


Source: https://partsgate.example/docs/connect.md
