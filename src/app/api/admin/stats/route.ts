import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const LOG_FILE = path.join(process.cwd(), "data", "conversions.jsonl");
const CACHE_FILE = path.join(process.cwd(), "data", "cache.json");
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
  results?: Array<{ country: string; options: string[] }>;
}

function auth(req: NextRequest): boolean {
  const header = req.headers.get("authorization") ?? "";
  const token = header.replace("Bearer ", "");
  return token === ADMIN_PASS;
}

function readLogs(): LogEntry[] {
  try {
    if (!fs.existsSync(LOG_FILE)) return [];
    const content = fs.readFileSync(LOG_FILE, "utf-8");
    return content.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch {
    return [];
  }
}

function bucket(ts: string, period: "day" | "week" | "month"): string {
  const d = new Date(ts);
  if (period === "day") return d.toISOString().slice(0, 10);
  if (period === "month") return d.toISOString().slice(0, 7);
  // week: Monday of that week
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day);
  const mon = new Date(d);
  mon.setDate(d.getDate() + diff);
  return mon.toISOString().slice(0, 10);
}

export async function GET(req: NextRequest) {
  if (!auth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const logs = readLogs();
  const conversions = logs.filter((l) => l.type === "conversion");
  const shares = logs.filter((l) => l.type?.startsWith("share"));
  const feedbacks = logs.filter((l) => l.type === "feedback" && l.value === "up");
  const copies = logs.filter((l) => l.type === "copy");
  const fontSelects = logs.filter((l) => l.type === "font_select");

  // daily / weekly / monthly conversion counts
  const byPeriod = (period: "day" | "week" | "month") => {
    const map: Record<string, number> = {};
    for (const e of conversions) {
      if (!e.ts) continue;
      const b = bucket(e.ts, period);
      map[b] = (map[b] ?? 0) + 1;
    }
    return Object.entries(map).sort(([a], [b]) => a.localeCompare(b)).slice(-30);
  };

  // language usage
  const langCount: Record<string, number> = {};
  for (const e of conversions) {
    const l = e.uiLang ?? "unknown";
    langCount[l] = (langCount[l] ?? 0) + 1;
  }

  // source language (name origin)
  const sourceLangCount: Record<string, number> = {};
  for (const e of conversions) {
    const s = e.sourceLang?.split("-")[0] ?? "unknown";
    sourceLangCount[s] = (sourceLangCount[s] ?? 0) + 1;
  }

  // top searched names
  const nameCount: Record<string, number> = {};
  for (const e of conversions) {
    if (e.inputName) nameCount[e.inputName] = (nameCount[e.inputName] ?? 0) + 1;
  }
  const topNames = Object.entries(nameCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 50);

  // font selection
  const fontCount: Record<string, number> = {};
  for (const e of fontSelects) {
    if (e.font) fontCount[e.font] = (fontCount[e.font] ?? 0) + 1;
  }

  // share platform
  const platformCount: Record<string, number> = {};
  for (const e of shares) {
    const p = e.platform ?? e.type?.replace("share_", "") ?? "unknown";
    platformCount[p] = (platformCount[p] ?? 0) + 1;
  }

  // cache size
  let cacheSize = 0;
  try {
    if (fs.existsSync(CACHE_FILE)) {
      const c = JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
      cacheSize = Object.keys(c).length;
    }
  } catch { /* ignore */ }

  return NextResponse.json({
    totals: {
      conversions: conversions.length,
      shares: shares.length,
      feedbackUp: feedbacks.length,
      copies: copies.length,
      cacheSize,
    },
    daily: byPeriod("day"),
    weekly: byPeriod("week"),
    monthly: byPeriod("month"),
    langCount: Object.entries(langCount).sort(([, a], [, b]) => b - a),
    sourceLangCount: Object.entries(sourceLangCount).sort(([, a], [, b]) => b - a),
    topNames,
    fontCount: Object.entries(fontCount).sort(([, a], [, b]) => b - a),
    platformCount: Object.entries(platformCount).sort(([, a], [, b]) => b - a),
  });
}
