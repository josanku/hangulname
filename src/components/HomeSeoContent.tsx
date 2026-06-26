// Server-rendered (no "use client") so its text is in the initial HTML — readable
// by search crawlers and AI answer engines that don't run JS. The visible Q&A
// mirrors the FAQPage JSON-LD in layout.tsx, which is exactly what answer engines
// reward (schema backed by on-page content).

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

export default function HomeSeoContent() {
  return (
    <section
      dir="ltr"
      aria-label="About My Hangul Name"
      className="mt-12 max-w-2xl mx-auto px-1 text-left"
    >
      <h2 className="text-lg font-bold text-violet-900 mb-2">
        Write your name in Korean (Hangul)
      </h2>
      <p className="text-sm text-slate-500 leading-relaxed mb-6">
        <strong>My Hangul Name</strong> is a free tool that converts any name, from any
        language, into its natural Korean (Hangul) spelling — based on real pronunciation and
        Korea&apos;s official 외래어 표기법 transcription rules. It&apos;s used worldwide by K-pop
        fans, Korean-language learners, and travelers to Korea. Built and operated by{" "}
        <a href="https://wehome.me" className="text-violet-500 underline-offset-2 hover:underline">
          Wehome
        </a>
        , Korea&apos;s government-authorized home-sharing platform.
      </p>

      <h2 className="text-base font-bold text-violet-900 mb-3">Frequently asked questions</h2>
      <div className="space-y-4">
        {FAQ.map((f) => (
          <div key={f.q}>
            <h3 className="text-sm font-semibold text-slate-700 mb-1">{f.q}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
