import { MetadataRoute } from "next";
import { ARTISTS } from "@/lib/kpop";

const BASE = "https://www.myhangulname.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/hangul-name`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/gallery`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/learn-hangul`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/api-docs`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/korean-words`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...ARTISTS.map((a) => ({
      url: `${BASE}/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
