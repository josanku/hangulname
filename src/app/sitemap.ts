import { MetadataRoute } from "next";
import { ARTISTS } from "@/lib/kpop";
import { NAMES } from "@/lib/names";
import { popularSearchedNames } from "@/lib/popularNames";

const BASE = "https://www.myhangulname.com";

// Regenerate daily so newly-popular searched names get into the sitemap.
export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const popular = (await popularSearchedNames(2000)).map((p) => p.slug);
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
