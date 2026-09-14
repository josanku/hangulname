/**
 * Request throttling for every route that can spend Claude credits.
 *
 * Counters live in Vercel KV so they are shared across serverless instances —
 * the previous per-instance Map reset to zero on every cold start, which meant
 * a parallel caller was never actually limited.
 *
 * When KV is unavailable (local dev, or a KV outage) we fall back to a
 * per-instance Map. That is weaker than the KV path but strictly better than
 * no limit, and it keeps the site serving rather than failing closed on a
 * storage hiccup — the global spend cap in transliterateCore is the backstop.
 */

import { bumpCounter } from "@/lib/store";

export interface RateLimitPolicy {
  /** Max requests per rolling minute bucket, per client. */
  perMinute: number;
  /** Max requests per UTC day, per client. */
  perDay: number;
}

export interface RateLimitVerdict {
  ok: boolean;
  /** Seconds the client should wait before retrying. */
  retryAfter: number;
  limit?: "minute" | "day";
}

const MEMORY_MAX_KEYS = 5_000;
const memory = new Map<string, { count: number; reset: number }>();

function memoryBump(key: string, windowMs: number): number {
  const now = Date.now();
  const entry = memory.get(key);
  if (entry && now <= entry.reset) {
    entry.count += 1;
    return entry.count;
  }
  // Cheap bound on the fallback map so a flood of distinct IPs can't grow it
  // without limit inside a warm instance.
  if (memory.size >= MEMORY_MAX_KEYS) memory.clear();
  memory.set(key, { count: 1, reset: now + windowMs });
  return 1;
}

async function bump(key: string, ttlSeconds: number): Promise<number> {
  const shared = await bumpCounter(key, ttlSeconds);
  return shared ?? memoryBump(key, ttlSeconds * 1000);
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("x-real-ip") || "anon";
}

export async function checkRateLimit(
  scope: string,
  ip: string,
  policy: RateLimitPolicy,
): Promise<RateLimitVerdict> {
  const now = Date.now();

  const minuteBucket = Math.floor(now / 60_000);
  const perMinute = await bump(`hg:rl:${scope}:m:${minuteBucket}:${ip}`, 120);
  if (perMinute > policy.perMinute) {
    return { ok: false, retryAfter: 60 - Math.floor((now % 60_000) / 1000), limit: "minute" };
  }

  const day = new Date(now).toISOString().slice(0, 10);
  const perDay = await bump(`hg:rl:${scope}:d:${day}:${ip}`, 172_800);
  if (perDay > policy.perDay) {
    return { ok: false, retryAfter: 3_600, limit: "day" };
  }

  return { ok: true, retryAfter: 0 };
}
