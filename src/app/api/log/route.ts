import { NextRequest, NextResponse } from "next/server";
import { appendLog, getAllLogs } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const entry = await req.json();
    // Vercel automatically adds geo headers — enrich every log entry with country
    const country = req.headers.get("x-vercel-ip-country") ?? "unknown";
    const region  = req.headers.get("x-vercel-ip-country-region") ?? "";
    const city    = req.headers.get("x-vercel-ip-city") ?? "";
    await appendLog({ ...entry, country, region, city });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const logs = await getAllLogs();
    return NextResponse.json({ logs });
  } catch {
    return NextResponse.json({ logs: [] });
  }
}
