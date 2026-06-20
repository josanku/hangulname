import type { Metadata } from "next";

const BASE = "https://www.myhangulname.com";

export const metadata: Metadata = {
  title: "Word of the Day — 오늘의 한글 단어",
  description:
    "A new Korean word every day with romanization, meaning and an example sentence. Learn one 한글 단어 a day and see it in Korean fonts and Hangul Art.",
  keywords: ["Korean word of the day", "오늘의 한글 단어", "learn Korean daily", "Korean vocabulary", "한글 단어"],
  alternates: { canonical: `${BASE}/word-of-the-day` },
  openGraph: {
    title: "Word of the Day · 오늘의 한글 단어",
    description: "A new Korean word every day — meaning, example, and fonts.",
    url: `${BASE}/word-of-the-day`,
    type: "article",
  },
};

export default function WordOfDayLayout({ children }: { children: React.ReactNode }) {
  return children;
}
