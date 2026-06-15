import type { Metadata } from "next";
import Link from "next/link";
import GalleryClient from "./GalleryClient";

const BASE_URL = "https://hangulname.vercel.app";

export const metadata: Metadata = {
  title: "한글아트 갤러리 — K-POP 아이돌·한국 이름·인기 단어",
  description:
    "BTS, BLACKPINK, NewJeans, aespa, IVE 한국 이름과 인기 한국 이름·단어를 한글아트(Hangul Art)로 만들어 보세요. 클릭 한 번으로 공유·다운로드.",
  keywords: [
    "Hangul Art", "한글아트", "Korean name art", "BTS Korean name",
    "BLACKPINK Korean name", "NewJeans 멤버 한글", "Korean character art",
    "Korean calligraphy", "Hangul typography", "K-pop name",
  ],
  alternates: { canonical: `${BASE_URL}/gallery` },
  openGraph: {
    title: "한글아트 갤러리 | Hangul Art Gallery",
    description:
      "K-POP 아이돌과 한국 이름·단어의 한글아트 — 클릭해서 공유/다운로드.",
    url: `${BASE_URL}/gallery`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hangul Art Gallery",
    description:
      "K-pop idols, Korean names and beloved Korean words as generative Hangul Art.",
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 sm:py-12">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8 text-sm">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 transition text-xs font-medium"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back</span>
          </Link>
        </nav>
        <div className="bg-white rounded-xl p-6 shadow-lg shadow-black/20">
          <GalleryClient />
        </div>
      </div>
    </main>
  );
}
