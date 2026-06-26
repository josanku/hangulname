import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { NAMES, NAME_MAP } from "@/lib/names";
import { transliterateName } from "@/lib/transliterateCore";

const BASE = "https://www.myhangulname.com";

// Curated names are pre-rendered at build; any other plausible name is rendered
// on demand and cached (ISR). This turns every searched name into a crawlable,
// citable "[Name] in Korean" page — the core of our long-tail SEO/AEO surface.
export const dynamicParams = true;
export const revalidate = 604800; // 7 days

export function generateStaticParams() {
  return NAMES.map((n) => ({ slug: n.slug }));
}

type Resolved = {
  name: string;
  ko: string;
  alt?: string;
  origin?: string;
  ipa?: string;
  curated: boolean;
};

// Cheap gate so crawlers can't trigger LLM calls for junk slugs (digits, gibberish,
// over-long): letters + up to 4 hyphen-joined words, 2–40 chars.
function isLikelyName(slug: string): boolean {
  return /^[a-z]+(?:-[a-z]+){0,3}$/.test(slug) && slug.length >= 2 && slug.length <= 40;
}

function slugToName(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// Deduped across generateMetadata + the page render within one request.
const resolve = cache(async (slug: string): Promise<Resolved | null> => {
  const curated = NAME_MAP[slug];
  if (curated) {
    return { name: curated.name, ko: curated.ko, alt: curated.alt, curated: true };
  }
  if (!isLikelyName(slug)) return null;
  try {
    const name = slugToName(slug);
    const data = await transliterateName(name, "en", false); // false → don't log as a user conversion
    const v = data.variants?.[0];
    const ko = v?.options?.[0] || v?.phonetic;
    if (!ko) return null;
    return { name, ko, alt: v?.options?.[1], origin: data.origin, ipa: v?.ipa, curated: false };
  } catch {
    return null;
  }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = await resolve(slug);
  if (!n) return {};
  const title = `${n.name} in Korean — ${n.ko} | How to Write & Say`;
  const description = `${n.name} in Korean (Hangul) is ${n.ko}${n.alt ? ` or ${n.alt}` : ""}. Learn how to write and pronounce ${n.name} in Korean, see it in 20+ fonts, and make a shareable Hangul name card — free.`;
  const ogImage = `${BASE}/api/og?name=${encodeURIComponent(n.ko)}&orig=${encodeURIComponent(n.name)}`;
  return {
    title,
    description,
    keywords: [`${n.name} in Korean`, `${n.name} Hangul`, `${n.name} 한글`, n.ko, `how to write ${n.name} in Korean`],
    alternates: { canonical: `${BASE}/name/${slug}` },
    openGraph: {
      title: `${n.name} in Korean · ${n.ko}`,
      description,
      url: `${BASE}/name/${slug}`,
      type: "article",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${n.name} in Korean: ${n.ko}` }],
    },
    twitter: { card: "summary_large_image", title: `${n.name} in Korean · ${n.ko}`, description, images: [ogImage] },
  };
}

export default async function NameInKoreanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = await resolve(slug);
  if (!n) notFound();

  // Related names: neighbors for curated, a popular sample otherwise.
  const idx = NAMES.findIndex((x) => x.slug === slug);
  const related = idx >= 0
    ? [...NAMES.slice(idx + 1), ...NAMES.slice(0, idx)].slice(0, 12)
    : NAMES.slice(0, 12);

  const spelled = n.alt ? `${n.ko} (also ${n.alt})` : n.ko;
  const faq = [
    {
      q: `How do you write ${n.name} in Korean?`,
      a: `${n.name} in Korean (Hangul) is written ${spelled}. The spelling is based on the actual pronunciation of ${n.name}, following Korea's official 외래어 표기법 (foreign-word transcription) rules.`,
    },
    {
      q: `How do you pronounce ${n.name} in Korean?`,
      a: `${n.ko} sounds close to the original ${n.name}${n.ipa ? ` (${n.ipa})` : ""}. You can hear it spoken aloud and copy the spelling at myhangulname.com.`,
    },
    {
      q: n.alt ? `Is it ${n.ko} or ${n.alt}?` : `Is ${n.ko} the standard spelling for ${n.name}?`,
      a: n.alt
        ? `Both ${n.ko} and ${n.alt} are used for ${n.name}; ${n.ko} is the most common.`
        : `Yes — ${n.ko} is the recommended Korean spelling for ${n.name}. Minor variants may exist depending on pronunciation.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${n.name} in Korean`,
        url: `${BASE}/name/${slug}`,
        inLanguage: "en",
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "My Hangul Name", item: BASE },
            { "@type": "ListItem", position: 2, name: "Names", item: `${BASE}/name` },
            { "@type": "ListItem", position: 3, name: `${n.name} in Korean`, item: `${BASE}/name/${slug}` },
          ],
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-2xl mx-auto pt-6">
        <Link href="/name" className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          All names
        </Link>

        <article className="bg-white rounded-2xl shadow-lg shadow-violet-200/40 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-5">
            {n.name} in Korean
          </h1>

          <div className="bg-gradient-to-br from-violet-50 to-fuchsia-50 border border-violet-100 rounded-2xl p-8 text-center mb-6">
            <div className="text-5xl sm:text-6xl font-bold text-violet-900 mb-2" lang="ko">{n.ko}</div>
            {n.alt && <div className="text-xl text-slate-400" lang="ko">{n.alt}</div>}
            <div className="text-sm text-violet-400 mt-3">{n.name} → Hangul</div>
          </div>

          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            <strong>{n.name}</strong> is written <strong lang="ko">{n.ko}</strong>
            {n.alt ? <> (also <span lang="ko">{n.alt}</span>)</> : null} in Korean (Hangul).
            The spelling follows the actual pronunciation of {n.name}, based on Korea&apos;s standard
            외래어 표기법 (foreign-word transcription rules). Tap below to hear it spoken, see {n.name} in
            20+ Korean fonts, or make a shareable Hangul name card.
          </p>

          <div className="grid sm:grid-cols-2 gap-2 mt-6">
            <Link href={`/?name=${encodeURIComponent(n.name)}`} className="text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition">
              ✨ See fonts, art &amp; name card
            </Link>
            <Link href={`/?name=${encodeURIComponent(n.name)}`} className="text-center bg-white border border-violet-200 hover:bg-violet-50 text-violet-600 text-sm font-medium px-4 py-3 rounded-xl transition">
              🔊 Hear the pronunciation
            </Link>
          </div>
        </article>

        {/* FAQ — visible answers mirror the FAQPage schema for AI/search citation */}
        <section className="mt-7 bg-white rounded-2xl border border-violet-100 p-6">
          <h2 className="text-sm font-semibold text-violet-900 mb-4">FAQ</h2>
          <div className="space-y-4">
            {faq.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-semibold text-slate-700 mb-1">{f.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-7">
          <h2 className="text-xs font-semibold text-slate-500 mb-2 px-1">More names in Korean</h2>
          <div className="flex flex-wrap gap-1.5">
            {related.map((r) => (
              <Link key={r.slug} href={`/name/${r.slug}`} className="px-2.5 py-1 text-xs bg-white border border-violet-100 rounded-full text-violet-500 hover:border-violet-300 hover:bg-violet-50 transition">
                {r.name} · <span lang="ko">{r.ko}</span>
              </Link>
            ))}
          </div>
        </section>

        <Link href="/" className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition mt-6">
          Convert your own name →
        </Link>
      </div>
    </div>
  );
}
