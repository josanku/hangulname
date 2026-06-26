import { getAllLogs } from "@/lib/store";
import { NAMES } from "@/lib/names";

// Shared slug + popularity helpers used by the sitemap and the /name hub so the
// long-tail /name/[slug] pages (generated on demand) are both discoverable
// (sitemap) and internally linked (hub) instead of orphaned.

export function slugifyName(s: string): string {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // fold accents (José → jose)
    .toLowerCase().trim()
    .replace(/['']/g, "")
    .replace(/[^a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const LIKELY_NAME = /^[a-z]+(?:-[a-z]+){0,3}$/;

export function isLikelyNameSlug(slug: string): boolean {
  return LIKELY_NAME.test(slug) && slug.length >= 2 && slug.length <= 40;
}

export interface PopularName {
  slug: string;
  name: string; // representative display form as users typed it
  count: number;
}

/**
 * Names users actually searched (excluding curated ones), ranked by frequency.
 * Filtered to plausible names searched at least `minCount` times so output is
 * real demand, not one-off noise.
 */
export async function popularSearchedNames(limit: number, minCount = 2): Promise<PopularName[]> {
  try {
    const logs = await getAllLogs();
    const curated = new Set(NAMES.map((n) => n.slug));
    const agg = new Map<string, { name: string; count: number }>();
    for (const l of logs) {
      if (l.type !== "conversion") continue;
      const input = typeof l.inputName === "string" ? l.inputName.trim() : "";
      if (!input) continue;
      const slug = slugifyName(input);
      if (!isLikelyNameSlug(slug) || curated.has(slug)) continue;
      const e = agg.get(slug) ?? { name: input, count: 0 };
      e.count += 1;
      agg.set(slug, e);
    }
    return [...agg.entries()]
      .filter(([, v]) => v.count >= minCount)
      .sort(([, a], [, b]) => b.count - a.count)
      .slice(0, limit)
      .map(([slug, v]) => ({ slug, name: v.name, count: v.count }));
  } catch {
    return [];
  }
}
