"use client";

import { useState } from "react";
import { GALLERY, type GalleryItem, type GalleryCategory } from "@/lib/gallery";
import HangulArtModal from "@/components/HangulArtModal";

interface Props {
  isKo: boolean;
  uiLang: string;
  // Limit how many items per category appear (e.g. 4 on the home preview, all on /gallery).
  // Pass `Infinity` (or omit) for "show all".
  itemsPerCategory?: number;
  // When true, render a compact heading suitable for embedding under the result card.
  compact?: boolean;
  // Optional logger for analytics
  onLog?: (data: Record<string, unknown>) => void;
}

function PreviewTile({
  item,
  isKo,
  onOpen,
}: {
  item: GalleryItem;
  isKo: boolean;
  onOpen: (text: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item.text)}
      className="group relative flex flex-col items-center gap-1 bg-white border border-slate-100 rounded-2xl p-3 transition hover:border-pink-200 hover:shadow-md hover:-translate-y-0.5"
      title={isKo ? `${item.text} 한글아트로 보기` : `View ${item.text} as Hangul Art`}
    >
      <div className="aspect-square w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-pink-50/40 rounded-xl mb-1">
        <span
          className="text-3xl sm:text-4xl font-bold text-slate-700 group-hover:text-pink-600 transition tracking-wide"
          style={{ fontFamily: "'NanumGothic', sans-serif" }}
        >
          {item.text}
        </span>
      </div>
      {item.sub && (
        <span className="text-[10px] text-slate-400 text-center leading-tight truncate w-full">
          {item.sub}
        </span>
      )}
      <span className="absolute top-1.5 right-1.5 text-[9px] bg-pink-50 text-pink-600 px-1.5 py-0.5 rounded-md opacity-0 group-hover:opacity-100 transition">
        {isKo ? "아트" : "Art"}
      </span>
    </button>
  );
}

function CategorySection({
  cat,
  limit,
  isKo,
  onOpen,
}: {
  cat: GalleryCategory;
  limit: number;
  isKo: boolean;
  onOpen: (text: string) => void;
}) {
  const items = cat.items.slice(0, limit);
  return (
    <section className="mb-6 last:mb-0">
      <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
        <span>{cat.emoji}</span>
        <span>{isKo ? cat.labelKo : cat.labelEn}</span>
        <span className="text-[10px] text-slate-300 font-normal">
          {cat.items.length > limit ? `${items.length}/${cat.items.length}` : ""}
        </span>
      </h3>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
        {items.map((it) => (
          <PreviewTile key={cat.id + "-" + it.text} item={it} isKo={isKo} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
}

export default function HangulArtGallery({
  isKo,
  uiLang,
  itemsPerCategory = Infinity,
  compact = false,
  onLog,
}: Props) {
  const [openText, setOpenText] = useState<string | null>(null);

  const handleOpen = (text: string) => {
    setOpenText(text);
    onLog?.({ type: "gallery_item_open", name: text, uiLang });
  };

  return (
    <>
      <div className={compact ? "" : "max-w-4xl mx-auto"}>
        {!compact && (
          <header className="mb-5">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">
              {isKo ? "인기 한글아트 갤러리" : "Popular Hangul Art Gallery"}
            </h2>
            <p className="text-sm text-slate-500">
              {isKo
                ? "아이돌 이름·한국 이름·인기 단어를 한글아트로 만들어 보세요. 클릭하면 아트가 열리고 공유·다운로드할 수 있습니다."
                : "Tap any name or word to see it as Hangul Art — share or download instantly."}
            </p>
          </header>
        )}
        {compact && (
          <header className="mb-3">
            <h2 className="text-base font-semibold text-slate-700">
              {isKo ? "🎨 한글아트로 인기있는 이름·단어" : "🎨 Popular names & words to art"}
            </h2>
          </header>
        )}
        {GALLERY.map((cat) => (
          <CategorySection
            key={cat.id}
            cat={cat}
            limit={itemsPerCategory}
            isKo={isKo}
            onOpen={handleOpen}
          />
        ))}
      </div>

      {openText !== null && (
        <HangulArtModal
          text={openText}
          originalName={openText}
          isKo={isKo}
          uiLang={uiLang}
          onClose={() => setOpenText(null)}
          onLog={onLog}
        />
      )}
    </>
  );
}
