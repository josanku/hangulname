import { NextRequest, NextResponse } from "next/server";
import { transliterateName, TransliterateError } from "@/lib/transliterateCore";
import { checkRateLimit, clientIp } from "@/lib/rateLimit";

// Throttle for the site's own UI. Looser than the public API because a real
// visitor converts a handful of names per session, but still bounded.
const POLICY = { perMinute: 20, perDay: 300 };

export async function POST(req: NextRequest) {
  const verdict = await checkRateLimit("web", clientIp(req.headers), POLICY);
  if (!verdict.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down and try again shortly." },
      { status: 429, headers: { "Retry-After": String(verdict.retryAfter) } },
    );
  }

  try {
    const { name, uiLang = "en" } = await req.json();
    // log=false: the web client logs this conversion itself via /api/log, which
    // enriches it with Vercel geo headers (country). Logging here too would
    // double-count every web conversion (once without geo, once with).
    const data = await transliterateName(name, uiLang, false);
    return NextResponse.json(data);
  } catch (e) {
    const status = e instanceof TransliterateError ? e.status : 500;
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status });
  }
}
