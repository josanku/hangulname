---
title: "A free API to convert any name to Korean (Hangul) — and an MCP server for Claude"
published: false
tags: api, korean, ai, mcp
canonical_url: https://www.myhangulname.com/api-docs
---

> Cross-post to Dev.to and Hashnode. Set `published: true` when ready. Keep `canonical_url` so SEO
> credit flows to the docs page.

Transliterating a name into Korean **isn't a 1:1 letter swap**. Hangul is phonetic, so the right
spelling follows how a name is *pronounced*, using Korea's official 외래어 표기법 (foreign-word
transcription) rules. "Caroline" → **캐롤라인**, not a letter-by-letter mapping.

I run [My Hangul Name](https://www.myhangulname.com), and I just opened up the engine as a **free,
no-key API** — plus a **hosted MCP server** so Claude and other agents can use it natively.

## The API

No key, CORS-enabled, ~30 req/min/IP.

```bash
curl "https://www.myhangulname.com/api/v1/transliterate?name=Caroline"
```

```json
{
  "sourceLang": "en-US",
  "variants": [
    { "country": "United States", "flag": "🇺🇸",
      "options": ["캐롤라인", "캐롤린"], "phonetic": "캘로린", "ipa": "/ˈkærəlaɪn/" }
  ],
  "origin": "A name of French origin meaning 'free woman'."
}
```

### JavaScript

```js
const res = await fetch("https://www.myhangulname.com/api/v1/transliterate?name=Caroline");
const { variants } = await res.json();
console.log(variants[0].options[0]); // 캐롤라인
```

### Python

```python
import requests
r = requests.get("https://www.myhangulname.com/api/v1/transliterate", params={"name": "Caroline"})
print(r.json()["variants"][0]["options"][0])  # 캐롤라인
```

It supports 19 input languages (auto-detected): English, Chinese, Japanese, Spanish, French,
German, Arabic, Russian, Portuguese, Vietnamese, Indonesian, Thai, Malay, Hindi, Bengali, Filipino,
Burmese, Mongolian, Korean.

OpenAPI spec: <https://www.myhangulname.com/api/v1/openapi.json> ·
Postman: <https://www.myhangulname.com/my-hangul-name.postman_collection.json>

## Use it inside Claude (MCP)

There's a hosted [Model Context Protocol](https://modelcontextprotocol.io) server exposing a single
tool, `transliterate_name`:

```bash
claude mcp add --transport http my-hangul-name https://www.myhangulname.com/api/mcp
```

Or add `https://www.myhangulname.com/api/mcp` as a custom connector in Claude Desktop / claude.ai.
Then just ask Claude to write a name in Korean and it calls the tool.

## Notes

- Results are cached, so repeat lookups are instant.
- There's no single "right" answer — the first option is the most recommended spelling.
- Free for personal and commercial use. Built by [Wehome](https://wehome.me).

If you build something with it, I'd love to hear about it 🙌
