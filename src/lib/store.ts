/**
 * Storage abstraction:
 *  - Production (Vercel KV configured): uses @vercel/kv (Redis) — persists across deployments
 *  - Development / fallback: uses local JSON files in data/
 *
 * To enable persistent storage on Vercel:
 *   Vercel dashboard → Project → Storage → Create KV database → Connect to project
 *   (KV_REST_API_URL and KV_REST_API_TOKEN are then auto-added as env vars)
 */

import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const LOGS_FILE = path.join(DATA_DIR, "conversions.jsonl");
const CACHE_FILE = path.join(DATA_DIR, "cache.json");

// KV keys
const KV_LOGS = "hg:logs";
const KV_CACHE = "hg:cache";
const KV_MAX_LOGS = 200_000;

function isKVConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

async function getKV() {
  if (!isKVConfigured()) return null;
  try {
    const mod = await import("@vercel/kv");
    return mod.kv;
  } catch {
    return null;
  }
}

async function ensureDataDir() {
  try { await fs.mkdir(DATA_DIR, { recursive: true }); } catch { /* ignore */ }
}

/**
 * @vercel/kv (Upstash) has automaticDeserialization ON by default, so values we
 * store as JSON strings come back already parsed as objects. The old read code
 * also called JSON.parse on them, which threw on the now-object value and made
 * the surrounding try/catch return [] — silently wiping every stat. coerce()
 * accepts either shape so existing KV data stays readable after this fix.
 */
function coerce(x: unknown): Record<string, unknown> | null {
  if (x && typeof x === "object") return x as Record<string, unknown>;
  if (typeof x === "string") {
    try { return JSON.parse(x) as Record<string, unknown>; } catch { return null; }
  }
  return null;
}

// ─── Logs ─────────────────────────────────────────────────────────────────────

export async function appendLog(entry: Record<string, unknown>): Promise<void> {
  const record = { ...entry, ts: new Date().toISOString() };
  console.log("[HANGULNAME_LOG]", JSON.stringify(record));

  const kv = await getKV();
  if (kv) {
    try {
      await kv.lpush(KV_LOGS, JSON.stringify(record));
      await kv.ltrim(KV_LOGS, 0, KV_MAX_LOGS - 1);
    } catch (e) { console.error("KV appendLog error:", e); }
    return;
  }

  try {
    await ensureDataDir();
    await fs.appendFile(LOGS_FILE, JSON.stringify(record) + "\n");
  } catch { /* read-only fs in production without KV */ }
}

export async function getAllLogs(): Promise<Record<string, unknown>[]> {
  const kv = await getKV();
  if (kv) {
    try {
      const items = await kv.lrange(KV_LOGS, 0, -1) as unknown[];
      // lrange returns newest-first (lpush order); reverse for chronological.
      // Entries come back already deserialized by @vercel/kv — see coerce().
      return items.reverse().map(coerce).filter(Boolean) as Record<string, unknown>[];
    } catch { return []; }
  }

  try {
    const content = await fs.readFile(LOGS_FILE, "utf-8");
    return content.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch { return []; }
}

// ─── Name cache ───────────────────────────────────────────────────────────────

export async function getCached(key: string): Promise<Record<string, unknown> | null> {
  const kv = await getKV();
  if (kv) {
    try {
      const val = await kv.hget(KV_CACHE, key);
      return coerce(val);
    } catch { return null; }
  }

  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    const cache = JSON.parse(raw) as Record<string, unknown>;
    return (cache[key] as Record<string, unknown>) ?? null;
  } catch { return null; }
}

export async function setCached(key: string, value: Record<string, unknown>): Promise<void> {
  const kv = await getKV();
  if (kv) {
    try {
      await kv.hset(KV_CACHE, { [key]: JSON.stringify(value) });
    } catch { /* ignore */ }
    return;
  }

  try {
    await ensureDataDir();
    let cache: Record<string, unknown> = {};
    try {
      const raw = await fs.readFile(CACHE_FILE, "utf-8");
      cache = JSON.parse(raw);
    } catch { /* first write */ }
    cache[key] = value;
    await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2));
  } catch { /* read-only fs */ }
}

export async function getCacheSize(): Promise<number> {
  const kv = await getKV();
  if (kv) {
    try { return await kv.hlen(KV_CACHE); } catch { return 0; }
  }

  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    return Object.keys(JSON.parse(raw)).length;
  } catch { return 0; }
}

export const usingKV = isKVConfigured;

// ─── Feedback ─────────────────────────────────────────────────────────────────

const KV_FEEDBACK = "hg:feedback";
const FEEDBACK_FILE = path.join(DATA_DIR, "feedback.jsonl");

export async function appendFeedback(entry: Record<string, unknown>): Promise<void> {
  const record = { ...entry, ts: new Date().toISOString() };

  const kv = await getKV();
  if (kv) {
    try {
      await kv.lpush(KV_FEEDBACK, JSON.stringify(record));
      await kv.ltrim(KV_FEEDBACK, 0, 9999);
    } catch (e) { console.error("KV feedback error:", e); }
    return;
  }

  try {
    await ensureDataDir();
    await fs.appendFile(FEEDBACK_FILE, JSON.stringify(record) + "\n");
  } catch { /* read-only fs */ }
}

export async function getAllFeedback(): Promise<Record<string, unknown>[]> {
  const kv = await getKV();
  if (kv) {
    try {
      const items = await kv.lrange(KV_FEEDBACK, 0, -1) as unknown[];
      return items.reverse().map(coerce).filter(Boolean) as Record<string, unknown>[];
    } catch { return []; }
  }

  try {
    const content = await fs.readFile(FEEDBACK_FILE, "utf-8");
    return content.trim().split("\n").filter(Boolean).map((l) => JSON.parse(l));
  } catch { return []; }
}
