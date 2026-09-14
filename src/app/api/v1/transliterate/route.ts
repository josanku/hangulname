import { NextRequest, NextResponse } from "next/server";
import { transliterateName, TransliterateError } from "@/lib/transliterateCore";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

// Public API: https://www.myhangulname.com/api/v1/transliterate
// CORS-enabled, GET (?name=&lang=) or POST ({name, lang}).

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=3600",
};

// Shared, KV-backed limits. The previous in-memory Map reset on every cold
// start, so a parallel caller was never actually throttled — see rateLimit.ts.
const POLICY = { perMinute: 10, perDay: 200 };

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

async function handle(name: string, lang: string, ip: string) {
  const verdict = await checkRateLimit("api", ip, POLICY);
  if (!verdict.ok) {
    const detail =
      verdict.limit === "day"
        ? "Daily quota exceeded. Try again tomorrow."
        : "Rate limit exceeded. Please try again in a minute.";
    return NextResponse.json(
      { error: detail },
      { status: 429, headers: { ...CORS, "Retry-After": String(verdict.retryAfter) } },
    );
  }
  try {
    const data = await transliterateName(name, lang);
    return NextResponse.json(data, { headers: CORS });
  } catch (e) {
    const status = e instanceof TransliterateError ? e.status : 500;
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status, headers: CORS });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const name = searchParams.get("name") ?? "";
  const lang = searchParams.get("lang") ?? searchParams.get("uiLang") ?? "en";
  return handle(name, lang, clientIp(req.headers));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name : "";
  const lang = body.lang ?? body.uiLang ?? "en";
  return handle(name, lang, clientIp(req.headers));
}
