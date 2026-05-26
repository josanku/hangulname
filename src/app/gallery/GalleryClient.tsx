"use client";

import { useState } from "react";
import { GALLERY } from "@/lib/gallery";
import HangulArtModal from "@/components/HangulArtModal";

export default function GalleryClient() {
  const [artText, setArtText] = useState<string | null>(null);

  return (
    <>
      <div className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          한글아트 갤러리
        </h1>
        <p className="text-white/90 text-base sm:text-lg drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          원하는 이름이나 단어를 클릭해서 한글아트로 만들어 보세요
        </p>
      </div>

      <div className="space-y-10">
        {GALLERY.map((category) => (
          <section
            key={category.id}
            className="bg-white/95 backdrop-blur rounded-3xl shadow-xl border border-white/50 p-6 sm:p-8"
          >
            <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
              <span className="text-4xl">{category.emoji}</span>
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  {category.labelKo}
                </h2>
                <p className="text-sm text-slate-400">{category.labelEn}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
              {category.items.map((item) => (
                <button
                  key={item.text}
                  onClick={() => setArtText(item.text)}
                  className="group relative aspect-square bg-gradient-to-br from-slate-50 to-pink-50/40 hover:from-pink-50 hover:to-rose-50 rounded-2xl border-2 border-slate-100 hover:border-pink-300 transition-all duration-300 hover:scale-105 hover:shadow-lg flex flex-col items-center justify-center p-3"
                >
                  <span className="text-lg sm:text-xl font-bold text-slate-700 group-hover:text-pink-600 transition tracking-tight leading-tight text-center break-keep">
                    {item.text}
                  </span>
                  {item.sub && (
                    <span className="absolute bottom-1 left-0 right-0 text-[9px] text-slate-400 text-center leading-tight truncate px-1">
                      {item.sub}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
                    <svg className="w-4 h-4 text-pink-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="13.5" cy="6.5" r="1.5" />
                      <circle cx="17.5" cy="10.5" r="1.5" />
                      <circle cx="8.5" cy="7.5" r="1.5" />
                      <circle cx="6.5" cy="12.5" r="1.5" />
                      <path d="M12 2a10 10 0 0 0 0 20c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.5-.5-2.5 0-1 1-2 2-2H18a4 4 0 0 0 4-4 10 10 0 0 0-10-10z" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </section>
        ))}
      </div>

      {artText && (
        <HangulArtModal
          text={artText}
          originalName={artText}
          isKo={true}
          uiLang="ko"
          onClose={() => setArtText(null)}
        />
      )}
    </>
  );
}
