import type { Metadata } from "next";
import Link from "next/link";

const BASE = "https://myhangulname.com";

export const metadata: Metadata = {
  title: "BTS in Hangul — 방탄소년단 Members, Fan Words & Songs",
  description:
    "BTS (방탄소년단) in Korean: member names (정국, 뷔, 지민, RM, 진, 슈가, 제이홉), fan words like 보라해 and 아미, and iconic song titles — tap any to see it in Korean fonts and Hangul Art.",
  keywords: ["BTS Korean", "방탄소년단", "BTS members Hangul", "보라해", "아미", "BTS name in Korean", "정국 한글", "borahae"],
  alternates: { canonical: `${BASE}/bts` },
  openGraph: {
    title: "BTS in Hangul · 방탄소년단",
    description: "BTS members, 보라해, 아미 and song titles in Korean — tap to see fonts & Hangul Art.",
    url: `${BASE}/bts`,
    type: "article",
  },
};

// ── Consonant ordering: ㅇㅎ → ㅅㅈㅊ → ㅁㅂㅍ → ㄴㄷㅌㄹ → ㄱㅋ ──────────────
const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const GROUP_RANK: Record<string, number> = {};
[["ㅇ","ㅎ"], ["ㅅ","ㅆ","ㅈ","ㅉ","ㅊ"], ["ㅁ","ㅂ","ㅃ","ㅍ"], ["ㄴ","ㄷ","ㄸ","ㅌ","ㄹ"], ["ㄱ","ㄲ","ㅋ"]]
  .forEach((g, i) => g.forEach((c) => { GROUP_RANK[c] = i; }));

function firstChoseong(word: string): string | null {
  for (const ch of word) {
    const code = ch.codePointAt(0)!;
    if (code >= 0xac00 && code <= 0xd7a3) return CHO[Math.floor((code - 0xac00) / 588)];
  }
  return null;
}
function rank(word: string): number {
  const c = firstChoseong(word);
  return c == null ? 99 : (GROUP_RANK[c] ?? 90);
}
function byRank<T>(items: T[], key: (t: T) => string): T[] {
  return items.map((t, i) => ({ t, i })).sort((a, b) => rank(key(a.t)) - rank(key(b.t)) || a.i - b.i).map((x) => x.t);
}

// ── BTS data ─────────────────────────────────────────────────────────────────
const MEMBERS: { stage: string; real: string }[] = [
  { stage: "정국", real: "전정국" },
  { stage: "뷔", real: "김태형" },
  { stage: "지민", real: "박지민" },
  { stage: "진", real: "김석진" },
  { stage: "슈가", real: "민윤기" },
  { stage: "제이홉", real: "정호석" },
  { stage: "RM", real: "김남준" },
];
const FAN_WORDS = ["방탄소년단","보라해","아미","아미밤","화양연화","떼창","컴백","최애","덕질"];
const SONGS = ["봄날","피 땀 눈물","불타오르네","쩔어","작은 것들을 위한 시","아이돌","상남자","호르몬 전쟁","소우주","약속","친구","등불"];

function Chip({ text, sub }: { text: string; sub?: string }) {
  return (
    <Link
      href={`/?name=${encodeURIComponent(text)}`}
      className="flex flex-col items-center px-3 py-1.5 bg-white border border-violet-100 rounded-xl text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:shadow-sm transition"
    >
      <span className="text-sm font-medium">{text}</span>
      {sub && <span className="text-[10px] text-slate-400 leading-none mt-0.5">{sub}</span>}
    </Link>
  );
}

function PillRow({ words }: { words: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {byRank(words, (w) => w).map((w) => (
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

export default function BtsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-white to-purple-50/50 p-6">
      <div className="max-w-2xl mx-auto pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>

        <header className="text-center mb-6">
          <div className="text-4xl mb-2">💜</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-violet-900 tracking-tight">
            BTS <span className="text-violet-500">· 방탄소년단</span>
          </h1>
          <p className="text-sm text-violet-400 mt-1.5">보라해 — tap any word to see it in Korean fonts &amp; Hangul Art</p>
        </header>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/50 p-6 sm:p-8 space-y-7">
          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-0.5">Members · 멤버</h2>
            <p className="text-xs text-slate-400 mb-3">활동명 (본명) — ㅇㅎ ㅅㅈㅊ ㅁㅂㅍ ㄴㄷㅌㄹ ㄱㅋ 순</p>
            <div className="flex flex-wrap gap-1.5">
              {byRank(MEMBERS, (m) => m.stage).map((m) => (
                <Chip key={m.stage} text={m.stage} sub={m.real} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-0.5">Fan Words · 자주 쓰는 말</h2>
            <p className="text-xs text-slate-400 mb-3">방탄소년단 · 보라해 · 아미 …</p>
            <PillRow words={FAN_WORDS} />
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-800 mb-0.5">Songs · 대표곡</h2>
            <p className="text-xs text-slate-400 mb-3">한글 노래 제목</p>
            <PillRow words={SONGS} />
          </section>
        </div>

        <div className="flex gap-2 mt-6">
          <Link
            href="/korean-words"
            className="flex-1 text-center bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 text-sm font-medium px-4 py-3 rounded-xl transition"
          >
            More Korean words
          </Link>
          <Link
            href="/"
            className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition"
          >
            My Hangul Name →
          </Link>
        </div>
      </div>
    </div>
  );
}
