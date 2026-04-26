import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Name in Hangul — 내 이름을 한글로",
  description: "Convert any name to Korean Hangul pronunciation. Find out what your name looks like in Korean!",
  openGraph: {
    title: "My Name in Hangul — 내 이름을 한글로",
    description: "Convert any name to Korean Hangul pronunciation. Find out what your name looks like in Korean!",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Name in Hangul — 내 이름을 한글로",
    description: "Convert any name to Korean Hangul pronunciation. Find out what your name looks like in Korean!",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
