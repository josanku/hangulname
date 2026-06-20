import { SOUNDS, type SoundEntry } from "@/lib/sounds";

// Word-of-the-day pool — reuses the curated 한글 소리결말·모양결말 DB
// (each entry has romanization, Korean/English meaning and an example),
// giving a year-plus of daily words with no repeat within a year.
export const WOTD_POOL: SoundEntry[] = SOUNDS;

// SOUNDS.length (457) is prime, so a coprime stride visits every entry once
// before repeating — scattering categories day to day.
const STRIDE = 113;

/** KST day number (changes at Korea midnight). */
export function kstDayNumber(now: number = Date.now()): number {
  return Math.floor((now + 9 * 3600 * 1000) / 86400000);
}

/** Deterministic word for a given KST day. */
export function wordForDay(day: number = kstDayNumber()): SoundEntry {
  const i = ((day * STRIDE) % WOTD_POOL.length + WOTD_POOL.length) % WOTD_POOL.length;
  return WOTD_POOL[i];
}
