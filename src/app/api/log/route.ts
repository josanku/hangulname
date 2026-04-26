import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "data", "conversions.jsonl");

function ensureDataDir() {
  const dir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export async function POST(req: NextRequest) {
  try {
    const entry = await req.json();
    const line = JSON.stringify({ ...entry, ts: new Date().toISOString() }) + "\n";
    console.log("[HANGULNAME_LOG]", line.trim());
    try {
      ensureDataDir();
      fs.appendFileSync(LOG_FILE, line);
    } catch {
      // read-only filesystem (production) — console.log above is enough
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    if (!fs.existsSync(LOG_FILE)) return NextResponse.json({ logs: [] });
    const content = fs.readFileSync(LOG_FILE, "utf-8");
    const logs = content
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((l) => JSON.parse(l));
    return NextResponse.json({ logs });
  } catch {
    return NextResponse.json({ logs: [] });
  }
}
