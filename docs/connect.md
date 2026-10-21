# Connect your agent

Pick your client. Each one needs the same two things: the server URL and an agent API key.

### Claude Code

Run in your terminal:

```
claude mcp add --transport http bomhq https://<your-host>/mcp --header "Authorization: Bearer <key>"
```

Claude Code supports remote MCP servers over HTTP with a custom header.

### Cursor and other JSON clients

Add to your client's MCP configuration file (for Cursor, mcp.json):

```
{
  "mcpServers": {
    "bomhq": {
      "url": "https://<your-host>/mcp",
      "headers": { "Authorization": "Bearer <key>" }
    }
  }
}
```

We have not verified a one-click install link for Cursor, so there is none here. Check your client's documentation for where the file lives.

### Plain HTTP

```
curl -s https://<your-host>/mcp \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

This server belongs to one company. One bomhq install serves one company (single-tenant): one install is one company. Use the URL of your own install.

## Before you run it

1. Ask a company admin to create an agent under **Buyer company** in the bomhq dashboard and set its mandate.
2. Copy the key when it is shown. It starts with `pgk_` and is shown once; only its hash is stored.
3. Replace `<key>` in the command. Keep the key out of chat history and source control.

## Check it works

Ask your agent: "Search the catalog for GRM188R71C104KA01D and tell me the price breaks." It should call `search_catalog`. Prices are those of your company's own distributor account.

Discovery profile for clients that read it: `https://<your-host>/.well-known/ucp`. The tools and their arguments are on the [tools page](tools.md); limits and approvals are on the [mandates page](mandates.md).


Source: https://bomhq.com/docs/connect.md
