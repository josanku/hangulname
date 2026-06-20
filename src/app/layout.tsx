import type { Metadata } from "next";
import "./globals.css";

const BASE_URL = "https://myhangulname.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "My Hangul Name | 내 이름을 한글로 — Korean Name Converter",
    template: "%s | My Hangul Name",
  },

  description:
    "Convert any name from any language into Korean Hangul pronunciation — free, instant, accurate. Perfect for K-pop fans, Korean learners, tourists visiting Korea, and anyone curious about the Korean alphabet. 어떤 언어의 이름이든 한글로 바꿔드립니다.",

  keywords: [
    // ── English ──────────────────────────────────────────────────
    "my name in Korean", "Korean name converter", "Hangul name generator",
    "how to write my name in Korean", "name in Korean characters",
    "Korean alphabet name", "Korean pronunciation guide",
    "English name in Korean", "Hangul transliteration",
    "K-pop Korean name", "Korean name for foreigners",
    "Korean character name", "convert name to Korean",
    "Korean writing system", "Hangul alphabet converter",
    "BTS name Korean", "BLACKPINK Korean name", "Korean fan name",
    "visit Korea", "travel Korea name card", "Korean business card",
    "learn Korean", "Korean language tool", "Hallyu Korean name",
    // ── Korean ───────────────────────────────────────────────────
    "한글 이름", "내 이름 한글로", "이름 한글로 변환",
    "외국이름 한글", "영어이름 한글", "이름 한글 표기",
    "한글 발음 변환기", "외래어 한글 표기법", "이름 한글화",
    "한글 변환기", "한글 이름 만들기", "한국어 이름 변환",
    // ── Chinese ──────────────────────────────────────────────────
    "韩文名字", "我的名字韩文", "韩语名字转换", "名字韩国语",
    "韩文名字生成器", "中文名字韩语", "韩国名字",
    // ── Japanese ─────────────────────────────────────────────────
    "ハングル名前", "韓国語名前変換", "名前をハングルで書く",
    "ハングル変換", "韓国語名前ジェネレーター",
    // ── Spanish ──────────────────────────────────────────────────
    "mi nombre en coreano", "nombre en hangul", "convertir nombre coreano",
    "nombre coreano gratis",
    // ── French ───────────────────────────────────────────────────
    "mon prénom en coréen", "nom en hangul", "convertisseur coréen",
    "écrire mon nom en coréen",
    // ── German ───────────────────────────────────────────────────
    "Name auf Hangul", "koreanischer Name", "Hangul Namenskonverter",
    // ── Arabic ───────────────────────────────────────────────────
    "اسمي بالهانغول", "الاسم بالكورية", "تحويل الاسم للكورية",
    // ── Russian ──────────────────────────────────────────────────
    "имя на хангыле", "корейское имя", "конвертер имён корейский",
    // ── Portuguese ───────────────────────────────────────────────
    "meu nome em coreano", "nome em hangul", "conversor nome coreano",
    // ── Vietnamese ───────────────────────────────────────────────
    "tên tiếng Hàn", "tên bằng tiếng Hàn", "chuyển đổi tên Hàn Quốc",
    // ── Indonesian/Malay ─────────────────────────────────────────
    "nama dalam bahasa Korea", "nama hangul", "konversi nama Korea",
    // ── Thai ─────────────────────────────────────────────────────
    "ชื่อภาษาเกาหลี", "แปลชื่อเป็นเกาหลี", "ฮันกึลชื่อ",
    // ── Hindi ────────────────────────────────────────────────────
    "कोरियाई नाम", "हांगुल नाम परिवर्तक",
    // ── Brand / Wehome ───────────────────────────────────────────
    "wehome", "wehome.me", "Korea travel", "Korean culture",
    "한글이름", "HangulName", "Hangul",
  ],

  authors: [{ name: "Wehome.me", url: "https://wehome.me" }],
  creator: "Wehome.me",
  publisher: "Wehome.me",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "My Hangul Name | 한글이름",
    title: "My Hangul Name — Convert Any Name to Korean Hangul",
    description:
      "Free tool to convert any name from any language into Korean Hangul. Instant, accurate, with pronunciation guide. Used by K-pop fans, Korean learners & Korea travelers worldwide.",
    locale: "en_US",
    alternateLocale: ["ko_KR", "zh_CN", "ja_JP", "es_ES", "fr_FR", "de_DE", "ar_SA", "ru_RU"],
  },

  twitter: {
    card: "summary_large_image",
    site: "@wehomeme",
    creator: "@wehomeme",
    title: "My Hangul Name | 내 이름을 한글로",
    description:
      "Convert any name to Korean Hangul for free. Instant pronunciation guide. Perfect for K-pop fans & Korea travelers.",
  },

  alternates: {
    canonical: BASE_URL,
    languages: {
      en: BASE_URL,
      ko: BASE_URL,
      zh: BASE_URL,
      ja: BASE_URL,
      es: BASE_URL,
      fr: BASE_URL,
      de: BASE_URL,
      ar: BASE_URL,
      ru: BASE_URL,
      "x-default": BASE_URL,
    },
  },

  category: "tools",

  other: {
    "google-site-verification": "",   // ← add Google Search Console token here
    "naver-site-verification": "",    // ← add Naver Webmaster token here
  },
};

// ── JSON-LD structured data ──────────────────────────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": `${BASE_URL}/#app`,
      name: "My Hangul Name",
      alternateName: ["한글이름", "내 이름을 한글로", "Korean Name Converter", "Hangul Name Generator"],
      url: BASE_URL,
      description:
        "Convert any name from any language to Korean Hangul pronunciation. Free, instant, accurate.",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web Browser",
      browserRequirements: "Requires JavaScript",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Convert names from 19+ languages to Korean Hangul",
        "Multiple spelling options with pronunciation guide",
        "Text-to-speech Korean pronunciation",
        "Download name as stylized image",
        "Share on social media",
        "20+ Korean font styles",
      ],
      inLanguage: ["en", "ko", "zh", "ja", "es", "fr", "de", "ar", "ru", "pt", "vi", "id", "th", "ms", "hi", "bn", "tl", "my", "mn"],
      author: {
        "@type": "Organization",
        name: "Wehome.me",
        url: "https://wehome.me",
        sameAs: ["https://wehome.me"],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "My Hangul Name",
      description: "Korean Hangul name converter for people worldwide",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${BASE_URL}/?name={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${BASE_URL}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How do I write my name in Korean Hangul?",
          acceptedAnswer: {
            "@type": "Answer",
            text: `Enter your name at ${BASE_URL} and get an instant Korean Hangul transliteration based on actual pronunciation, following official Korean 국립국어원 romanization rules.`,
          },
        },
        {
          "@type": "Question",
          name: "Is the Korean name converter free?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, completely free. No registration required.",
          },
        },
        {
          "@type": "Question",
          name: "What languages does it support?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It supports names from any language including English, Chinese, Japanese, Arabic, Russian, Spanish, French, German, Vietnamese, and more — automatically detected.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use my Korean name for K-pop or K-drama?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! This tool is popular among K-pop fans who want to know how their name would be written in Korean. You can also download a stylized image of your Korean name.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      "@id": `${BASE_URL}/#howto`,
      name: "How to write your name in Korean (Hangul)",
      description: "Convert any name into its closest natural Korean Hangul spelling in seconds.",
      totalTime: "PT15S",
      step: [
        { "@type": "HowToStep", position: 1, name: "Enter your name", text: "Type or say your name (e.g. Caroline Smith) in any language at myhangulname.com." },
        { "@type": "HowToStep", position: 2, name: "Read the result", text: "The first card shows the recommended Hangul spelling; other cards show spellings by language of origin." },
        { "@type": "HowToStep", position: 3, name: "Listen & copy", text: "Tap the speaker to hear the Korean pronunciation, then copy the spelling you like." },
        { "@type": "HowToStep", position: 4, name: "Fonts & art", text: "Open the Font Gallery to preview 20+ Korean fonts, or make shareable Hangul Art." },
      ],
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
