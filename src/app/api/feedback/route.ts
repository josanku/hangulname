import { NextRequest, NextResponse } from "next/server";
import { appendFeedback, getAllFeedback } from "@/lib/store";

const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "33hangul";

export async function POST(req: NextRequest) {
  try {
    const { message, contact, uiLang } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }
    const country = req.headers.get("x-vercel-ip-country") ?? "unknown";
    await appendFeedback({
      message: message.trim(),
      contact: contact?.trim() ?? "",
      uiLang: uiLang ?? "unknown",
      country,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
  if (token !== ADMIN_PASS) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const feedbacks = await getAllFeedback();
    return NextResponse.json({ feedbacks });
  } catch {
    return NextResponse.json({ feedbacks: [] });
  }
}
