"use client";

import Link from "next/link";

export default function LearnHangulPage() {
  return (
    <div className="min-h-screen bg-zinc-950 p-6">
      <div className="max-w-2xl mx-auto pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/70 text-xs font-medium transition mb-8"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>

        <div className="bg-white rounded-xl shadow-lg shadow-black/20 p-6 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-semibold text-zinc-900 tracking-tight mb-1.5">
            Learn Hangul
          </h1>
          <p className="text-sm text-zinc-500 mb-8">
            Master the Korean alphabet in 59 seconds
          </p>

          <div className="text-center mb-8">
            <div className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg font-medium text-sm mb-4">
              59 Seconds Challenge
            </div>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-md mx-auto">
              Content coming soon. This page will feature an interactive guide to learn the Korean alphabet (Hangul) in under one minute.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { title: "Quick & Easy", desc: "Learn all 24 basic letters in just 59 seconds with our proven method." },
              { title: "Visual Learning", desc: "Understand the logic behind each character’s shape and sound." },
              { title: "Audio Practice", desc: "Hear native pronunciation for every letter and word." },
              { title: "Start Writing", desc: "Practice writing your name immediately after learning the basics." },
            ].map((item) => (
              <div key={item.title} className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
                <h3 className="text-sm font-semibold text-zinc-800 mb-1">{item.title}</h3>
                <p className="text-zinc-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-zinc-400">
            This feature is under development. Check back soon.
          </p>
        </div>
      </div>
    </div>
  );
}
