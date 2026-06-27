# Show HN draft

Post at https://news.ycombinator.com/submit — title in the title field, the text below as the
first comment (HN convention for Show HN). Post Tue–Thu ~8–10am ET for best visibility.

## Title

```
Show HN: Free API to convert any name to Korean (Hangul), plus an MCP server for Claude
```

## First comment

```
I built My Hangul Name — a free tool + API that converts a name from any language into its
closest natural Korean (Hangul) spelling, based on actual pronunciation and Korea's official
외래어 표기법 transcription rules. It returns multiple accepted spellings, IPA, and a one-line
origin.

Why: K-pop/K-drama fans, Korean learners, and travelers constantly ask "how do I write my name
in Korean?" — but transliteration isn't 1:1 with spelling, it's pronunciation-based, so naive
romanization gets it wrong. The result is LLM-backed and cached.

The API is free, CORS-enabled, and needs no key:

  curl "https://www.myhangulname.com/api/v1/transliterate?name=Caroline"
  → 캐롤라인

Docs: https://www.myhangulname.com/api-docs
OpenAPI: https://www.myhangulname.com/api/v1/openapi.json

I also wired up an MCP server so Claude (and other agents) can use it as a native tool:

  claude mcp add --transport http my-hangul-name https://www.myhangulname.com/api/mcp

Happy to answer questions about the transliteration rules, caching, or the MCP setup.
```

Tips:
- Be present in the thread for the first few hours to reply.
- Don't ask for upvotes (HN penalizes it).
