import { NextRequest, NextResponse } from "next/server";
import { getAllLogs, getCacheSize, usingKV } from "@/lib/store";

const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "wehome2024";

interface LogEntry {
  ts: string;
  type: string;
  inputName?: string;
  uiLang?: string;
  sourceLang?: string;
  name?: string;
  font?: string;
  platform?: string;
  value?: string;
}

function auth(req: NextRequest): boolean {
  const token = (req.headers.get("authorization") ?? "").replace("Bearer ", "");
  return token === ADMIN_PASS;
}

function bucket(ts: string, period: "day" | "week" | "month"): string {
  const d = new Date(ts);
  if (period === "month") return d.toISOString().slice(0, 7);
  if (period === "week") {
    const day = d.getDay();
    const mon = new Date(d);
    mon.setDate(d.getDate() + (day === 0 ? -6 : 1 - day));
    return mon.toISOString().slice(0, 10);
  }
  return d.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const logs = (await getAllLogs()) as unknown as LogEntry[];

  const conversions  = logs.filter((l) => l.type === "conversion");
  const shares       = logs.filter((l) => l.type?.startsWith("share"));
  const feedbacks    = logs.filter((l) => l.type === "feedback" && l.value === "up");
  const copies       = logs.filter((l) => l.type === "copy");
  const fontSelects  = logs.filter((l) => l.type === "font_select");
  const visits       = logs.filter((l) => l.type === "visit");
  const wehomeClicks = logs.filter((l) => l.type === "wehome_click");

  const byPeriod = (period: "day" | "week" | "month") => {
    const map: Record<string, number> = {};
    for (const e of conversions) {
      if (!e.ts) continue;
      const b = bucket(e.ts, period);
      map[b] = (map[b] ?? 0) + 1;
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).slice(-30);
  };

  const tally = <T extends LogEntry>(arr: T[], key: keyof T) => {
    const map: Record<string, number> = {};
    for (const e of arr) {
      const v = String(e[key] ?? "unknown");
      map[v] = (map[v] ?? 0) + 1;
    }
    return Object.entries(map).sort(([, a], [, b]) => b - a);
  };

  const nameCount: Record<string, number> = {};
  for (const e of conversions) {
    if (e.inputName) nameCount[e.inputName] = (nameCount[e.inputName] ?? 0) + 1;
  }

  const platformCount: Record<string, number> = {};
  for (const e of shares) {
    const p = e.platform ?? e.type?.replace("share_", "") ?? "unknown";
    platformCount[p] = (platformCount[p] ?? 0) + 1;
  }

  return NextResponse.json({
    storage: usingKV() ? "vercel-kv" : "local-files",
    totals: {
      visits:       visits.length,
      conversions:  conversions.length,
      shares:       shares.length,
      wehomeClicks: wehomeClicks.length,
      feedbackUp:   feedbacks.length,
      copies:       copies.length,
      cacheSize:    await getCacheSize(),
    },
    daily:   byPeriod("day"),
    weekly:  byPeriod("week"),
    monthly: byPeriod("month"),
    langCount:       tally(conversions, "uiLang"),
    sourceLangCount: tally(conversions.map(e => ({ ...e, sl: e.sourceLang?.split("-")[0] ?? "unknown" })), "sl" as keyof LogEntry),
    topNames: Object.entries(nameCount).sort(([, a], [, b]) => b - a).slice(0, 50),
    fontCount:    tally(fontSelects, "font"),
    platformCount: Object.entries(platformCount).sort(([, a], [, b]) => b - a),
  });
}
