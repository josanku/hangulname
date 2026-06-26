import { MetadataRoute } from "next";
import { ARTISTS } from "@/lib/kpop";
import { NAMES } from "@/lib/names";
import { getAllLogs } from "@/lib/store";

const BASE = "https://www.myhangulname.com";

// Regenerate daily so newly-popular searched names get into the sitemap.
export const revalidate = 86400;

function slugify(s: string): string {
  return s
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // fold accents (José → jose)
    .toLowerCase().trim()
    .replace(/['']/g, "")
    .replace(/[^a-z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const LIKELY_NAME = /^[a-z]+(?:-[a-z]+){0,3}$/;

// Names users actually searched → make their /name/<slug> pages discoverable.
// Capped and frequency-filtered so the sitemap stays clean (no one-off junk).
async function popularNameSlugs(): Promise<string[]> {
  try {
    const logs = await getAllLogs();
    const curated = new Set(NAMES.map((n) => n.slug));
    const count = new Map<string, number>();
    for (const l of logs) {
      if (l.type !== "conversion") continue;
      const input = typeof l.inputName === "string" ? l.inputName : "";
      const slug = slugify(input);
      if (!slug || slug.length < 2 || slug.length > 40) continue;
      if (!LIKELY_NAME.test(slug) || curated.has(slug)) continue;
      count.set(slug, (count.get(slug) ?? 0) + 1);
    }
    return [...count.entries()]
      .filter(([, c]) => c >= 2) // require ≥2 searches → real demand, not noise
      .sort(([, a], [, b]) => b - a)
      .slice(0, 2000)
      .map(([slug]) => slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const popular = await popularNameSlugs();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/hangul-name`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/learn-hangul`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/korean-words`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/korean-sounds`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/word-of-the-day`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
    { url: `${BASE}/borahaehangul`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/name`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...ARTISTS.map((a) => ({
      url: `${BASE}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...NAMES.map((n) => ({
      url: `${BASE}/name/${n.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
    ...popular.map((slug) => ({
      url: `${BASE}/name/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    })),
  ];
}
