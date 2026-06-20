import { NextRequest, NextResponse } from "next/server";
import { transliterateName, TransliterateError } from "@/lib/transliterateCore";

export async function POST(req: NextRequest) {
  try {
    const { name, uiLang = "en" } = await req.json();
    const data = await transliterateName(name, uiLang);
    return NextResponse.json(data);
  } catch (e) {
    const status = e instanceof TransliterateError ? e.status : 500;
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status });
  }
}
