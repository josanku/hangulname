# Directory & marketplace submissions

Copy-paste entries for each directory. Submit once; they keep sending traffic.

---

## 1. public-apis/public-apis (GitHub) — highest ROI

Repo: https://github.com/public-apis/public-apis — open a PR adding one row.
Category: **Text Analysis** (or "Open Data" / "Development"). Entry:

```
| [My Hangul Name](https://www.myhangulname.com/api-docs) | Convert any name from 19 languages into Korean (Hangul) with pronunciation | No | Yes | Yes |
```

Columns are: API | Description | Auth | HTTPS | CORS. (Auth = No, HTTPS = Yes, CORS = Yes.)

---

## 2. APIs.guru (OpenAPI directory)

https://github.com/APIs-guru/openapi-directory — add our spec:
- OpenAPI URL: https://www.myhangulname.com/api/v1/openapi.json
- Provider: myhangulname.com

---

## 3. RapidAPI Hub

https://rapidapi.com/ → "Add New API" → import from OpenAPI URL above.
- Pricing: Free (Basic, unlimited / soft-capped)
- Category: Text Analysis / Tools
- Tagline: "Convert any name to Korean (Hangul) — free, no key."

---

## 4. Postman Public API Network

Publish the collection (already at /my-hangul-name.postman_collection.json):
- Import it into a public Postman workspace → Publish.
- Workspace name: "My Hangul Name API"
- Add the OpenAPI URL as the API definition.

---

## 5. Other free-API lists

- PublicAPIs.dev — https://publicapis.dev (submit via their GitHub source)
- free-for.dev / free-for-dev — "APIs" section PR
- apilist.fun — submit form
- API Tracker / ProgrammableWeb successor sites

Entry blurb (reuse anywhere):
> **My Hangul Name API** — Free, CORS-enabled, no-key HTTP API that converts any name from 19
> languages into its closest natural Korean (Hangul) spelling, with IPA pronunciation and origin.
> Docs: https://www.myhangulname.com/api-docs

---

## 6. MCP server directories (Claude/agent audience — do these!)

We host an MCP server at `https://www.myhangulname.com/api/mcp` (tool: `transliterate_name`).

- **awesome-mcp-servers** (GitHub, punkpeye/awesome-mcp-servers) — PR entry:
  ```
  - [My Hangul Name](https://www.myhangulname.com/api/mcp) 🌐 - Convert any name into its Korean (Hangul) spelling with pronunciation. Free, no key.
  ```
- **Smithery** — https://smithery.ai → submit remote server URL.
- **mcp.so** — https://mcp.so → submit.
- **Glama** — https://glama.ai/mcp/servers → submit.
- **PulseMCP** — https://www.pulsemcp.com → submit.

Standard MCP listing blurb:
> **My Hangul Name** — an MCP server that converts any name from any language into Korean (Hangul)
> with pronunciation and origin. One tool: `transliterate_name(name, lang)`. Remote (Streamable
> HTTP), free, no key: `https://www.myhangulname.com/api/mcp`
