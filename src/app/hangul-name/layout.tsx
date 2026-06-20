import type { Metadata } from "next";

const BASE_URL = "https://myhangulname.com";

export const metadata: Metadata = {
  title: "What is Hangul Name? Write Any Foreign Name in Korean",
  description:
    "Hangul Name turns any name from 19 languages into its closest natural Korean (Hangul) spelling — with audio, IPA phonetics, 20+ font previews, and Hangul Art. Free and ad-free, by Wehome.",
  keywords: [
    "Hangul name", "name in Korean", "Korean name converter",
    "write my name in Korean", "Hangul transliteration", "Korean alphabet",
    "Hunminjeongeum", "한글이름", "이름 한글로", "Korean name for foreigners",
  ],
  alternates: { canonical: `${BASE_URL}/hangul-name` },
  openGraph: {
    title: "What is Hangul Name? Write Any Foreign Name in Korean",
    description:
      "Turn any name into natural Korean Hangul — audio, IPA, 20+ fonts, and Hangul Art. Free.",
    url: `${BASE_URL}/hangul-name`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "What is Hangul Name?",
    description: "Write any foreign name in Korean Hangul — free, with fonts and Hangul Art.",
  },
};

export default function HangulNameLayout({ children }: { children: React.ReactNode }) {
  return children;
}
