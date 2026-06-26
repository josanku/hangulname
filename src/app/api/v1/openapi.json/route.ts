import { NextResponse } from "next/server";

const BASE = "https://www.myhangulname.com";

const spec = {
  openapi: "3.0.3",
  info: {
    title: "My Hangul Name API",
    version: "1.0.0",
    description:
      "Convert any name from 19 languages into its closest natural Korean (Hangul) spelling. Free, CORS-enabled, no API key required.",
    contact: { name: "Wehome", url: "https://wehome.me", email: "jo@wehome.me" },
    termsOfService: `${BASE}/api-docs`,
    license: { name: "Free to use (attribution appreciated)" },
  },
  externalDocs: { description: "API documentation & live examples", url: `${BASE}/api-docs` },
  servers: [{ url: `${BASE}/api/v1`, description: "Production" }],
  tags: [{ name: "Transliteration", description: "Name → Korean Hangul" }],
  paths: {
    "/transliterate": {
      get: {
        operationId: "transliterateName",
        tags: ["Transliteration"],
        summary: "Transliterate a name to Hangul",
        description: "Returns the closest natural Korean (Hangul) spelling(s) for a name, with pronunciation (IPA) and origin. Free, no API key.",
        parameters: [
          { name: "name", in: "query", required: true, schema: { type: "string", maxLength: 60 }, description: "Name in any language", example: "Caroline" },
          { name: "lang", in: "query", required: false, schema: { type: "string", default: "en" }, description: "UI language for text fields (en, ko, zh, ja, es, fr, de, ar, ru, pt, vi, id, th, ms, hi, bn, tl, my, mn)", example: "en" },
        ],
        responses: {
          "200": { description: "Transliteration result", content: { "application/json": { schema: { $ref: "#/components/schemas/Result" } } } },
          "400": { description: "Invalid input" },
          "429": { description: "Rate limit exceeded" },
        },
      },
      post: {
        operationId: "transliterateNamePost",
        tags: ["Transliteration"],
        summary: "Transliterate a name to Hangul",
        description: "Same as GET, with the name in a JSON body. Free, no API key.",
        requestBody: {
          required: true,
          content: { "application/json": { schema: { type: "object", required: ["name"], properties: { name: { type: "string", maxLength: 60 }, lang: { type: "string", default: "en" } } } } },
        },
        responses: {
          "200": { description: "Transliteration result", content: { "application/json": { schema: { $ref: "#/components/schemas/Result" } } } },
          "400": { description: "Invalid input" },
          "429": { description: "Rate limit exceeded" },
        },
      },
    },
  },
  components: {
    schemas: {
      Result: {
        type: "object",
        properties: {
          sourceLang: { type: "string", example: "en-US", description: "BCP-47 tag for text-to-speech" },
          variants: {
            type: "array",
            items: {
              type: "object",
              properties: {
                country: { type: "string", example: "United States" },
                flag: { type: "string", example: "🇺🇸" },
                options: { type: "array", items: { type: "string" }, example: ["캐롤라인", "캐롤린"] },
                phonetic: { type: "string", example: "캘로린" },
                ipa: { type: "string", example: "/ˈkærəlaɪn/" },
              },
            },
          },
          origin: { type: "string", example: "A name of French origin meaning 'free woman'." },
        },
      },
    },
  },
};

export function GET() {
  return NextResponse.json(spec, {
    headers: { "Access-Control-Allow-Origin": "*", "Cache-Control": "public, max-age=86400" },
  });
}
