import { NextRequest, NextResponse } from "next/server";
import { appendLog, getAllLogs } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const entry = await req.json();
    await appendLog(entry);
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
