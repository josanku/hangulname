"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { wordForDay, kstDayNumber } from "@/lib/wordOfDay";
import type { SoundEntry } from "@/lib/sounds";

export default function WordOfTheDayPage() {
  const [w, setW] = useState<SoundEntry | null>(null);
  const [dateLabel, setDateLabel] = useState("");

  useEffect(() => {
    setW(wordForDay());
    // KST date label
    const kst = new Date(Date.now() + 9 * 3600 * 1000);
    setDateLabel(`${kst.getUTCFullYear()}.${String(kst.getUTCMonth() + 1).padStart(2, "0")}.${String(kst.getUTCDate()).padStart(2, "0")} (KST)`);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-100 via-white to-purple-50/50 p-6">
      <div className="max-w-xl mx-auto pt-6">
        <Link href="/" className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6">
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
          Back
        </Link>

        <header className="text-center mb-5">
          <div className="text-sm text-violet-400">오늘의 한글 단어 · Word of the Day</div>
          {dateLabel && <div className="text-xs text-slate-400 mt-0.5">{dateLabel}</div>}
        </header>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/50 p-7 sm:p-9 text-center min-h-[260px] flex flex-col items-center justify-center">
          {w ? (
            <>
              <div className="text-5xl sm:text-6xl font-bold text-violet-900 mb-2" lang="ko">{w.word}</div>
              {w.romaja && <div className="text-base text-slate-400">{w.romaja}{w.ipa ? ` · ${w.ipa}` : ""}</div>}

              <div className="mt-5 space-y-1">
                {w.descKo && <p className="text-base text-slate-700" lang="ko">{w.descKo}</p>}
                {w.descEn && <p className="text-sm text-slate-500">{w.descEn}</p>}
              </div>

              {(w.exKo || w.exEn) && (
                <div className="mt-5 bg-violet-50/70 border border-violet-100 rounded-xl px-4 py-3 w-full">
                  <div className="text-[10px] text-violet-400 mb-1">예문 · Example</div>
                  {w.exKo && <p className="text-sm font-medium text-violet-900" lang="ko">{w.exKo}</p>}
                  {w.exEn && <p className="text-xs text-slate-500 mt-0.5">{w.exEn}</p>}
                </div>
              )}

              <Link
                href={`/?name=${encodeURIComponent(w.word)}`}
                className="mt-6 w-full text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold px-4 py-3 rounded-xl transition"
              >
                ✨ See it in fonts &amp; make a name card
              </Link>
            </>
          ) : (
            <svg className="animate-spin w-8 h-8 text-violet-300" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
          )}
        </div>

        <div className="flex gap-2 mt-6">
          <Link href="/korean-sounds" className="flex-1 text-center bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 text-sm font-medium px-4 py-3 rounded-xl transition">
            한글 소리결말 모양결말 →
          </Link>
          <Link href="/korean-words" className="flex-1 text-center bg-white border border-violet-200 text-violet-600 hover:bg-violet-50 text-sm font-medium px-4 py-3 rounded-xl transition">
            Korean words →
          </Link>
        </div>
      </div>
    </div>
  );
}
