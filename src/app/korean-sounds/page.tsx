import type { Metadata } from "next";
import Link from "next/link";
import { SOUNDS, CAT_EN, CAT_ORDER, type SoundEntry } from "@/lib/sounds";

const BASE = "https://www.myhangulname.com";

export const metadata: Metadata = {
  title: "Korean Onomatopoeia — 의성어·의태어 Sound & Mimetic Words",
  description:
    "457 Korean onomatopoeia and mimetic words (의성어·의태어): 두근두근 (thump thump), 콩닥콩닥 (pit-a-pat), 반짝반짝 (twinkle) and more — with romanization, meaning and examples. Tap any to see it in Korean fonts and Hangul Art.",
  keywords: ["Korean onomatopoeia", "의성어", "의태어", "Korean sound words", "Korean mimetic words", "두근두근", "반짝반짝", "Korean expressions"],
  alternates: { canonical: `${BASE}/korean-sounds` },
  openGraph: {
    title: "Korean Onomatopoeia · 의성어·의태어",
    description: "457 Korean sound & mimetic words with meanings and examples — tap to see them in Hangul fonts & art.",
    url: `${BASE}/korean-sounds`,
    type: "article",
  },
};

function Card({ s }: { s: SoundEntry }) {
  return (
    <Link
      href={`/?name=${encodeURIComponent(s.word)}`}
      title={s.exKo ? `${s.exKo}${s.exEn ? ` — ${s.exEn}` : ""}` : undefined}
      className="flex flex-col bg-white border border-violet-100 rounded-xl px-3 py-2.5 hover:border-violet-300 hover:shadow-sm transition"
    >
      <div className="flex items-baseline gap-1.5">
        <span className="text-base font-bold text-violet-900" lang="ko">{s.word}</span>
        {s.romaja && <span className="text-[10px] text-slate-400">{s.romaja}</span>}
      </div>
      <div className="flex items-center gap-1.5 mt-0.5">
        {s.en && <span className="text-[10px] bg-fuchsia-50 text-fuchsia-600 px-1.5 py-0.5 rounded">{s.en}</span>}
        <span className="text-[11px] text-slate-500 leading-tight line-clamp-1">{s.descEn || s.descKo}</span>
      </div>
    </Link>
  );
}

export default function KoreanSoundsPage() {
  const byCat = CAT_ORDER.map((cat) => ({
    cat,
    en: CAT_EN[cat] || cat,
    items: SOUNDS.filter((s) => s.cat === cat),
  })).filter((g) => g.items.length);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Korean Onomatopoeia & Mimetic Words",
    url: `${BASE}/korean-sounds`,
    description: "Korean onomatopoeia (의성어) and mimetic words (의태어) with romanization, meaning and examples.",
    inLanguage: ["en", "ko"],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-3xl mx-auto pt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-5">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </Link>

        <header className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-1.5">
            Korean Onomatopoeia <span className="text-violet-400">· 의성어·의태어</span>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            {SOUNDS.length} Korean sound &amp; mimetic words — 두근두근 (thump thump), 반짝반짝 (twinkle), 살금살금 (sneakily).
            Tap any word to see it in Korean fonts and Hangul Art.
          </p>
        </header>

        <div className="space-y-6">
          {byCat.map((g) => (
            <section key={g.cat}>
              <h2 className="text-sm font-semibold text-slate-700 mb-2 flex items-baseline gap-2">
                <span>{g.cat}</span>
                <span className="text-xs font-normal text-slate-400">{g.en} · {g.items.length}</span>
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {g.items.map((s, i) => <Card key={g.cat + i} s={s} />)}
              </div>
            </section>
          ))}
        </div>

        <Link href="/" className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition mt-7">
          Convert your own name →
        </Link>
      </div>
    </div>
  );
}
