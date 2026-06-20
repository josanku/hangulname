import { NextRequest, NextResponse } from "next/server";
import { transliterateName, TransliterateError } from "@/lib/transliterateCore";

// Public API: https://myhangulname.com/api/v1/transliterate
// CORS-enabled, GET (?name=&lang=) or POST ({name, lang}).

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cache-Control": "public, max-age=3600",
};

// Best-effort per-instance rate limit. Serverless instances are ephemeral, so
// this only throttles within a warm instance; for hard limits use a KV store.
const LIMIT = 30;
const WINDOW_MS = 60_000;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now > e.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  e.count += 1;
  return e.count > LIMIT;
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

async function handle(name: string, lang: string, ip: string) {
  if (rateLimited(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Please try again in a minute." },
      { status: 429, headers: CORS },
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
  return handle(name, lang, clientIp(req));
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name : "";
  const lang = body.lang ?? body.uiLang ?? "en";
  return handle(name, lang, clientIp(req));
}
