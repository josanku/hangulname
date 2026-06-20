import type { Metadata } from "next";
import Link from "next/link";
import { NAMES } from "@/lib/names";

const BASE = "https://www.myhangulname.com";

export const metadata: Metadata = {
  title: "Names in Korean — Write Any Name in Hangul",
  description:
    "See how popular names are written in Korean (Hangul): Michael 마이클, Emma 에마, Caroline 캐롤라인 and more. Pick a name or convert your own — free, with fonts and Hangul Art.",
  alternates: { canonical: `${BASE}/name` },
  openGraph: {
    title: "Names in Korean (Hangul)",
    description: "How popular names are written in Korean — pick one or convert your own.",
    url: `${BASE}/name`,
    type: "website",
  },
};

export default function NamesHubPage() {
  const sorted = [...NAMES].sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6">
      <div className="max-w-2xl mx-auto pt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </Link>

        <header className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-1.5">
            Names in Korean <span className="text-violet-400">· 한글로 이름 쓰기</span>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            How popular names are written in Korean (Hangul). Tap a name — or{" "}
            <Link href="/" className="text-violet-600 underline">convert your own</Link>.
          </p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/40 p-5 sm:p-6">
          <div className="flex flex-wrap gap-1.5">
            {sorted.map((n) => (
              <Link key={n.slug} href={`/name/${n.slug}`} className="px-3 py-1.5 text-sm bg-white border border-violet-100 rounded-full text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:shadow-sm transition">
                {n.name} · <span lang="ko" className="text-violet-500">{n.ko}</span>
              </Link>
            ))}
          </div>
        </div>

        <Link href="/" className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition mt-6">
          Convert your own name →
        </Link>
      </div>
    </div>
  );
}
