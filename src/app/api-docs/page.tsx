import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://www.myhangulname.com";

export const metadata: Metadata = {
  title: "API — My Hangul Name",
  description:
    "Free, CORS-enabled API to convert any name into Korean (Hangul). Use it from the CLI, your app, or as a Claude (MCP) tool. No API key required.",
  alternates: { canonical: `${BASE}/api-docs` },
  openGraph: {
    title: "My Hangul Name API",
    description: "Convert any name to Korean Hangul via a free HTTP API.",
    url: `${BASE}/api-docs`,
    type: "article",
  },
};

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-slate-900 text-slate-100 rounded-xl p-4 overflow-x-auto text-xs leading-relaxed">
      <code>{children}</code>
    </pre>
  );
}

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6">
      <div className="max-w-2xl mx-auto pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-8"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/40 p-6 sm:p-8 space-y-8">
          <header>
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-2">API</h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Convert any name from 19 languages into its closest natural Korean (Hangul) spelling.
              The API is <strong>free, CORS-enabled, and needs no API key</strong>. Best-effort rate
              limit: ~30 requests/min per IP.
            </p>
          </header>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">Endpoint</h2>
            <Code>{`GET  ${BASE}/api/v1/transliterate?name=Caroline&lang=en
POST ${BASE}/api/v1/transliterate   { "name": "Caroline", "lang": "en" }`}</Code>
            <p className="text-xs text-slate-500 mt-2">
              <code className="text-violet-600">name</code> (required) — the name in any language.{" "}
              <code className="text-violet-600">lang</code> (optional, default <code>en</code>) — UI
              language for the text fields: en, ko, zh, ja, es, fr, de, ar, ru, pt, vi, id, th, ms,
              hi, bn, tl, my, mn.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">cURL</h2>
            <Code>{`curl "${BASE}/api/v1/transliterate?name=Caroline"`}</Code>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">Response</h2>
            <Code>{`{
  "sourceLang": "en-US",
  "variants": [
    {
      "country": "United States",
      "flag": "🇺🇸",
      "options": ["캐롤라인", "캐롤린"],
      "phonetic": "캘로린",
      "ipa": "/ˈkærəlaɪn/"
    }
  ],
  "origin": "A name of French origin meaning 'free woman'."
}`}</Code>
            <p className="text-xs text-slate-500 mt-2">
              OpenAPI spec: <a href="/api/v1/openapi.json" className="text-violet-600 underline">/api/v1/openapi.json</a>
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">Use it from Claude (MCP / CLI)</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              The endpoint is a plain HTTP GET, so you can call it directly from Claude Code, a shell
              script, or any HTTP client. A minimal one-liner you can drop into a script or an MCP
              tool:
            </p>
            <Code>{`# shell
name="Caroline"
curl -s "${BASE}/api/v1/transliterate?name=$name" | jq -r '.variants[0].options[0]'
# → 캐롤라인`}</Code>
            <p className="text-xs text-slate-500 mt-3 leading-relaxed">
              To expose it as a native Claude tool, wrap this call in a small MCP server
              (<code>transliterate_name(name, lang)</code>) that fetches the URL above and returns the
              JSON — then register it with <code>claude mcp add</code>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-2">Notes</h2>
            <ul className="text-sm text-slate-600 space-y-1.5 list-disc list-inside marker:text-violet-400">
              <li>Results are cached, so repeat lookups are instant.</li>
              <li>Transliteration has no single right answer; the first option is the most recommended.</li>
              <li>Already-Hangul input is returned unchanged.</li>
              <li>Free for personal and commercial use. Built by <a href="https://wehome.me" className="text-violet-600 underline">Wehome</a>.</li>
            </ul>
          </section>

          <Link
            href="/"
            className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition"
          >
            ← Back to My Hangul Name
          </Link>
        </div>
      </div>
    </div>
  );
}
