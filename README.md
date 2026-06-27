# My Hangul Name — Korean (Hangul) name converter & free API

Convert any name, from any language, into its natural Korean (Hangul) spelling — based on real
pronunciation and Korea's official 외래어 표기법 transcription rules. Free, instant, with a
pronunciation guide, 20+ fonts, and shareable Hangul art.

🔗 **Live:** https://www.myhangulname.com · **Built & operated by [Wehome](https://wehome.me)**

---

## 🧩 Free API (no key, CORS-enabled)

Convert a name to Hangul over plain HTTP. No sign-up, no API key. Best-effort rate limit ~30 req/min/IP.

```bash
curl "https://www.myhangulname.com/api/v1/transliterate?name=Caroline"
```

```jsonc
{
  "sourceLang": "en-US",
  "variants": [
    { "country": "United States", "flag": "🇺🇸",
      "options": ["캐롤라인", "캐롤린"], "phonetic": "캘로린", "ipa": "/ˈkærəlaɪn/" }
  ],
  "origin": "A name of French origin meaning 'free woman'."
}
```

- **GET** `/api/v1/transliterate?name=<name>&lang=<en|ko|ja|zh|…>`
- **POST** `/api/v1/transliterate` with `{ "name": "...", "lang": "en" }`
- **OpenAPI:** https://www.myhangulname.com/api/v1/openapi.json
- **Docs & live examples:** https://www.myhangulname.com/api-docs
- **Postman collection:** [`/my-hangul-name.postman_collection.json`](https://www.myhangulname.com/my-hangul-name.postman_collection.json)

## 🤖 Use it in Claude / agents (MCP)

A hosted [Model Context Protocol](https://modelcontextprotocol.io) server exposes one tool,
`transliterate_name`, so Claude and other agents can convert names natively.

```bash
# Claude Code
claude mcp add --transport http my-hangul-name https://www.myhangulname.com/api/mcp
```

Or add `https://www.myhangulname.com/api/mcp` as a **custom connector** in Claude Desktop / claude.ai.

## ✨ Features

- 19 input languages, auto-detected (English, Chinese, Japanese, Spanish, French, German, Arabic,
  Russian, Portuguese, Vietnamese, Indonesian, Thai, Malay, Hindi, Bengali, Filipino, Burmese,
  Mongolian, Korean)
- Multiple accepted spellings + IPA + Korean text-to-speech
- 20+ Korean fonts, downloadable name cards & Hangul art
- Per-name pages (`/name/<name>`) and an FAQ at `/faq`

---

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Built with Next.js 16. Transliteration is LLM-backed and cached (Vercel KV in production).
