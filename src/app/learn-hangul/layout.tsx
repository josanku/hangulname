import type { Metadata } from "next";

const BASE_URL = "https://www.myhangulname.com";

export const metadata: Metadata = {
  title: "Learn Hangul in 59 Seconds — Korean Alphabet Guide",
  description:
    "Learn to read the Korean alphabet (Hangul) in under a minute. A quick, visual guide to the 24 basic letters, their shapes and sounds — then write your own name in Korean.",
  keywords: [
    "learn Hangul", "learn Korean alphabet", "Hangul in 59 seconds",
    "how to read Korean", "Korean letters", "Hangul guide", "한글 배우기",
  ],
  alternates: { canonical: `${BASE_URL}/learn-hangul` },
  openGraph: {
    title: "Learn Hangul in 59 Seconds",
    description: "A quick visual guide to the Korean alphabet — read Hangul in under a minute.",
    url: `${BASE_URL}/learn-hangul`,
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn Hangul in 59 Seconds",
    description: "Master the Korean alphabet fast, then write your name in Korean.",
  },
};

export default function LearnHangulLayout({ children }: { children: React.ReactNode }) {
  return children;
}
