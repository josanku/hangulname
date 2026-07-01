import { NextRequest, NextResponse } from "next/server";
import { transliterateName, TransliterateError } from "@/lib/transliterateCore";

export async function POST(req: NextRequest) {
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
