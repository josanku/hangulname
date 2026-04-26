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
      const items = await kv.lrange(KV_LOGS, 0, -1) as string[];
      // lrange returns newest-first (lpush order); reverse for chronological
      return items.reverse().map((s) => JSON.parse(s));
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
      const val = await kv.hget(KV_CACHE, key) as string | null;
      return val ? JSON.parse(val) : null;
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
