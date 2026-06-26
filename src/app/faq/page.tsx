import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://www.myhangulname.com";

const INTRO =
  "My Hangul Name is a free tool that converts any name, from any language, into its natural Korean (Hangul) spelling — based on real pronunciation and Korea's official 외래어 표기법 transcription rules. It's used worldwide by K-pop fans, Korean-language learners, and travelers to Korea. Built and operated by Wehome, Korea's government-authorized home-sharing platform.";

const FAQ: { q: string; a: string }[] = [
  {
    q: "How do I write my name in Korean?",
    a: "Type your name at myhangulname.com and you instantly get its Korean (Hangul) spelling based on how the name is actually pronounced — following Korea's official 국립국어원 외래어 표기법 (foreign-word transcription) rules. You also get alternative spellings, an IPA pronunciation guide, and audio.",
  },
  {
    q: "Is the Korean name converter free?",
    a: "Yes — it's completely free, with no sign-up and no ads. You can convert unlimited names, hear them spoken, preview 20+ Korean fonts, and download a shareable name card or Hangul art image at no cost.",
  },
  {
    q: "Which languages can it convert from?",
    a: "Names from 19 languages are supported and auto-detected: English, Chinese, Japanese, Spanish, French, German, Arabic, Russian, Portuguese, Vietnamese, Indonesian, Thai, Malay, Hindi, Bengali, Filipino, Burmese, Mongolian, and Korean.",
  },
  {
    q: "How accurate is the Korean spelling?",
    a: "Each name is transliterated from its real pronunciation (not its spelling) and follows Korea's standard 외래어 표기법, the same rules used for foreign names in Korean media and publishing. When more than one spelling is commonly used, all accepted options are shown.",
  },
  {
    q: "Can I use my Korean name for K-pop or K-drama fandom?",
    a: "Absolutely. It's popular with K-pop and K-drama fans who want their name in Hangul for fan accounts, lightsticks, banners, and bios. You can download your name as stylized Hangul art to share on Instagram, TikTok, or X.",
  },
  {
    q: "Can I hear how my Korean name sounds?",
    a: "Yes. Every result has a speaker button that reads the Hangul aloud with Korean text-to-speech, so you can learn to pronounce your name the Korean way.",
  },
];

export const metadata: Metadata = {
  title: "FAQ — Write Your Name in Korean (Hangul)",
  description:
    "Frequently asked questions about My Hangul Name: how to write your name in Korean, supported languages, accuracy, pronunciation, K-pop fan use, and more — free, no sign-up.",
  alternates: { canonical: `${BASE}/faq` },
  openGraph: {
    title: "My Hangul Name — FAQ",
    description: "How to write your name in Korean (Hangul): everything you need to know.",
    url: `${BASE}/faq`,
    type: "article",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "My Hangul Name", item: BASE },
        { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE}/faq` },
      ],
    },
  ],
};

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6" dir="ltr">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-2xl mx-auto pt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Back to converter
        </Link>

        <article className="bg-white rounded-2xl shadow-lg shadow-violet-200/40 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-3">
            Write your name in Korean (Hangul)
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed mb-8">
            {INTRO.split("Wehome")[0]}
            <a href="https://wehome.me" className="text-violet-500 underline-offset-2 hover:underline">Wehome</a>
            {INTRO.split("Wehome")[1]}
          </p>

          <h2 className="text-lg font-bold text-violet-900 mb-4">Frequently asked questions</h2>
          <div className="space-y-5">
            {FAQ.map((f) => (
              <div key={f.q}>
                <h3 className="text-sm font-semibold text-slate-700 mb-1">{f.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </article>

        <Link href="/" className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition mt-6">
          Convert your name →
        </Link>
      </div>
    </div>
  );
}
