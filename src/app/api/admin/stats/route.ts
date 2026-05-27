import { NextRequest, NextResponse } from "next/server";
import { getAllLogs, getCacheSize, getAllFeedback, usingKV } from "@/lib/store";

const ADMIN_PASS = process.env.ADMIN_PASSWORD ?? "33hangul";

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

  // Country tally — use visit events (have country from Vercel header)
  const countryCount: Record<string, number> = {};
  for (const e of visits) {
    const c = (e as LogEntry & { country?: string }).country ?? "unknown";
    countryCount[c] = (countryCount[c] ?? 0) + 1;
  }
  // Also tally conversions by country for richer data
  const convCountryCount: Record<string, number> = {};
  for (const e of conversions) {
    const c = (e as LogEntry & { country?: string }).country ?? "unknown";
    convCountryCount[c] = (convCountryCount[c] ?? 0) + 1;
  }

  const allFeedback = await getAllFeedback();

  // Daily detailed stats: visits, conversions, hangul art downloads per day
  const hangulArtDownloads = logs.filter((l) => l.type === "hangulart_download");
  const dailyDetails: Record<string, { visits: number; conversions: number; hangulartDownloads: number }> = {};

  for (const e of visits) {
    if (!e.ts) continue;
    const day = bucket(e.ts, "day");
    if (!dailyDetails[day]) dailyDetails[day] = { visits: 0, conversions: 0, hangulartDownloads: 0 };
    dailyDetails[day].visits++;
  }

  for (const e of conversions) {
    if (!e.ts) continue;
    const day = bucket(e.ts, "day");
    if (!dailyDetails[day]) dailyDetails[day] = { visits: 0, conversions: 0, hangulartDownloads: 0 };
    dailyDetails[day].conversions++;
  }

  for (const e of hangulArtDownloads) {
    if (!e.ts) continue;
    const day = bucket(e.ts, "day");
    if (!dailyDetails[day]) dailyDetails[day] = { visits: 0, conversions: 0, hangulartDownloads: 0 };
    dailyDetails[day].hangulartDownloads++;
  }

  return NextResponse.json({
    storage: usingKV() ? "vercel-kv" : "local-files",
    totals: {
      visits:        visits.length,
      conversions:   conversions.length,
      shares:        shares.length,
      wehomeClicks:  wehomeClicks.length,
      feedbackUp:    feedbacks.length,
      feedbackCount: allFeedback.length,
      copies:        copies.length,
      cacheSize:     await getCacheSize(),
      hangulartDownloads: hangulArtDownloads.length,
    },
    daily:   byPeriod("day"),
    weekly:  byPeriod("week"),
    monthly: byPeriod("month"),
    dailyDetails: Object.entries(dailyDetails)
      .sort(([a], [b]) => b.localeCompare(a)) // Most recent first
      .slice(0, 60), // Last 60 days
    langCount:       tally(conversions, "uiLang"),
    sourceLangCount: tally(conversions.map(e => ({ ...e, sl: e.sourceLang?.split("-")[0] ?? "unknown" })), "sl" as keyof LogEntry),
    topNames: Object.entries(nameCount).sort(([, a], [, b]) => b - a).slice(0, 50),
    fontCount:    tally(fontSelects, "font"),
    platformCount: Object.entries(platformCount).sort(([, a], [, b]) => b - a),
    countryCount:  Object.entries(countryCount).sort(([, a], [, b]) => b - a),
    convCountryCount: Object.entries(convCountryCount).sort(([, a], [, b]) => b - a),
  });
}
