import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTISTS, ARTIST_MAP, byConsonant } from "@/lib/kpop";

const BASE = "https://myhangulname.com";

export const dynamicParams = false;

export function generateStaticParams() {
  return ARTISTS.map((a) => ({ artist: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ artist: string }> }): Promise<Metadata> {
  const { artist } = await params;
  const a = ARTIST_MAP[artist];
  if (!a) return {};
  const title = `${a.en} in Hangul — ${a.ko}${a.type === "group" ? " members" : ""}, names & songs`;
  const description = `${a.en} (${a.ko}) in Korean: ${a.type === "group" ? "member names, " : ""}fan words and song titles — tap any to see it in Korean fonts and Hangul Art.`;
  return {
    title,
    description,
    keywords: [`${a.en} Korean`, a.ko, `${a.en} in Hangul`, ...a.fanWords],
    alternates: { canonical: `${BASE}/${a.slug}` },
    openGraph: { title: `${a.en} · ${a.ko}`, description, url: `${BASE}/${a.slug}`, type: "article" },
  };
}

function Pills({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {byConsonant(words).map((w) => (
        <Link
          key={w}
          href={`/?name=${encodeURIComponent(w)}`}
          className="px-3 py-1.5 text-sm bg-white border border-violet-100 rounded-full text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:shadow-sm transition"
        >
          {w}
        </Link>
      ))}
    </div>
  );
}

function Section({ title, sub, words }: { title: string; sub: string; words: string[] }) {
  if (!words.length) return null;
  return (
    <section>
      <h2 className="text-base font-semibold text-slate-800 mb-0.5">{title}</h2>
      <p className="text-xs text-slate-400 mb-3">{sub}</p>
      <Pills words={words} />
    </section>
  );
}

export default async function ArtistPage({ params }: { params: Promise<{ artist: string }> }) {
  const { artist } = await params;
  const a = ARTIST_MAP[artist];
  if (!a) notFound();

  // other artists for the footer nav
  const others = ARTISTS.filter((x) => x.slug !== a.slug);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-white to-purple-50/50 p-6">
      <div className="max-w-2xl mx-auto pt-6">
        <Link
          href="/korean-words"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Korean words
        </Link>

        <header className="text-center mb-6">
          <div className="text-4xl mb-2">{a.emoji}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-violet-900 tracking-tight">
            {a.en} <span className="text-violet-500">· {a.ko}</span>
          </h1>
          <p className="text-sm text-violet-400 mt-1.5">tap any word to see it in Korean fonts &amp; Hangul Art</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/50 p-6 sm:p-8 space-y-7">
          {a.type === "group" && a.members?.length ? (
            <Section title="Members · 멤버" sub="ㅇㅎ ㅅㅈㅊ ㅁㅂㅍ ㄴㄷㅌㄹ ㄱㅋ 순" words={a.members} />
          ) : null}
          <Section title="Fan Words · 자주 쓰는 말" sub="이름 · 팬덤 · 시그니처" words={a.fanWords} />
          <Section title="Songs · 대표곡" sub="한글 노래 제목" words={a.songs} />
        </div>

        {/* Explore other artists */}
        <section className="mt-7">
          <h2 className="text-xs font-semibold text-slate-500 mb-2 px-1">More artists</h2>
          <div className="flex flex-wrap gap-1.5">
            {others.map((x) => (
              <Link
                key={x.slug}
                href={`/${x.slug}`}
                className="px-2.5 py-1 text-xs bg-white/70 border border-violet-100 rounded-full text-violet-500 hover:bg-white hover:border-violet-300 transition"
              >
                {x.emoji} {x.ko}
              </Link>
            ))}
          </div>
        </section>

        <Link
          href="/"
          className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition mt-6"
        >
          My Hangul Name →
        </Link>
      </div>
    </div>
  );
}
