"use client";

import Link from "next/link";

export default function LearnHangulPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition mb-6"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Home
          </Link>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-3 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
            Learn Hangul
          </h1>
          <p className="text-xl text-white/90 drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)] font-semibold">
            Master Korean alphabet in 59 seconds
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white/98 backdrop-blur-xl rounded-[2rem] shadow-[0_20px_70px_rgba(0,0,0,0.3)] border border-white/50 p-8 sm:p-12">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg mb-6">
              ⏱️ 59 Seconds Challenge
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              Content coming soon! This page will feature an interactive guide to learn the Korean alphabet (Hangul) in under one minute.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Quick & Easy</h3>
              <p className="text-slate-600 text-sm">
                Learn all 24 basic letters in just 59 seconds with our proven method.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100">
              <div className="text-3xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Visual Learning</h3>
              <p className="text-slate-600 text-sm">
                Understand the logic behind each character's shape and sound.
              </p>
            </div>

            <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl p-6 border border-pink-100">
              <div className="text-3xl mb-3">🔊</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Audio Practice</h3>
              <p className="text-slate-600 text-sm">
                Hear native pronunciation for every letter and word.
              </p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-100">
              <div className="text-3xl mb-3">✅</div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">Start Writing</h3>
              <p className="text-slate-600 text-sm">
                Practice writing your name immediately after learning the basics.
              </p>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-slate-400 mb-4">
              📧 Want to be notified when this course launches?
            </p>
            <p className="text-xs text-slate-400">
              This feature is under development. Check back soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
