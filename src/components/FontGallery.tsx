"use client";

import { useEffect, useState } from "react";
import { FONTS, buildFontCanvas, downloadCanvasPng, type Font } from "@/lib/fontCanvas";
import ShareLinkModal from "@/components/ShareLinkModal";

interface Props {
  text: string;
  originalName: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onPickFont?: (fontId: string) => void;
  onLog?: (data: Record<string, unknown>) => void;
  onOpenArt?: (text: string) => void;
}

// "Various Korean fonts" — translated per UI language (falls back to en)
const VARIOUS_FONTS_LABEL: Record<string, string> = {
  ko: "다양한 한글 폰트",
  en: "Various Korean fonts",
  zh: "多种韩文字体",
  ja: "様々なハングルフォント",
  es: "Diversas fuentes coreanas",
  fr: "Différentes polices coréennes",
  de: "Verschiedene koreanische Schriftarten",
  ar: "خطوط كورية متنوعة",
  ru: "Разные корейские шрифты",
  pt: "Várias fontes coreanas",
  vi: "Các kiểu chữ tiếng Hàn khác nhau",
  id: "Berbagai font Korea",
  th: "ฟอนต์เกาหลีหลากหลายแบบ",
  ms: "Pelbagai jenis fon Korea",
  hi: "विभिन्न कोरियाई फ़ॉन्ट",
  bn: "বিভিন্ন কোরিয়ান ফন্ট",
  tl: "Iba't ibang Korean fonts",
  my: "ကိုရီးယားဖောင့်အမျိုးမျိုး",
  mn: "Янз бүрийн солонгос фонт",
};

const SHARE_BUTTON_LABEL: Record<string, string> = {
  ko: "공유", en: "Share", zh: "分享", ja: "シェア", es: "Compartir",
  fr: "Partager", de: "Teilen", ar: "مشاركة", ru: "Поделиться",
  pt: "Compartilhar", vi: "Chia sẻ", id: "Bagikan", th: "แชร์",
  ms: "Kongsi", hi: "शेयर", bn: "শেয়ার", tl: "Ibahagi",
  my: "မျှဝေပါ", mn: "Хуваалцах",
};

const SHARE_MODAL_TITLE: Record<string, string> = {
  ko: "한글 폰트 모음 공유", en: "Share Korean font gallery",
  zh: "分享韩文字体集", ja: "ハングルフォント集を共有",
  es: "Compartir galería de fuentes", fr: "Partager la galerie de polices",
  de: "Schriftarten-Galerie teilen", ar: "مشاركة معرض الخطوط",
  ru: "Поделиться галереей шрифтов", pt: "Compartilhar galeria de fontes",
  vi: "Chia sẻ thư viện phông chữ", id: "Bagikan galeri font",
  th: "แชร์แกลเลอรีฟอนต์", ms: "Kongsi galeri fon",
  hi: "फ़ॉन्ट गैलरी शेयर करें", bn: "ফন্ট গ্যালারি শেয়ার করুন",
  tl: "Ibahagi ang font gallery", my: "ဖောင့်ပြခန်းကို မျှဝေပါ",
  mn: "Фонтын галерейг хуваалцах",
};

function tr(map: Record<string, string>, lang: string): string {
  return map[lang] ?? map.en;
}

interface RenderedFont {
  font: Font;
  dataUrl: string | null;
  error: boolean;
}

export default function FontGallery({ text, originalName, isKo, uiLang, onClose, onPickFont, onLog, onOpenArt }: Props) {
  const [rendered, setRendered] = useState<RenderedFont[]>(
    FONTS.map((f) => ({ font: f, dataUrl: null, error: false })),
  );
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [bulkDownloading, setBulkDownloading] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  // text rendered across the fonts — starts as the converted name, editable via input
  const [currentText, setCurrentText] = useState(text);
  const [draft, setDraft] = useState(text);
  // off by default: plain black. When on, color each jamo by category.
  const [colorize, setColorize] = useState(false);
  const isCustom = currentText !== text;
  // when custom Hangul is typed, the romanized original no longer applies as subtitle
  const effectiveOriginal = isCustom ? "" : originalName;

  const subtitleLabel = tr(VARIOUS_FONTS_LABEL, uiLang);
  const shareLabel = tr(SHARE_BUTTON_LABEL, uiLang);
  const shareTitle = tr(SHARE_MODAL_TITLE, uiLang);
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?name=${encodeURIComponent(originalName)}`
    : `https://name.hangulmaru.com/?name=${encodeURIComponent(originalName)}`;
  const shareText = `${isCustom ? "" : originalName + " → "}${currentText} 🇰🇷 — ${subtitleLabel}`;

  const apply = () => {
    const t = draft.trim();
    if (!t || t === currentText) return;
    setCurrentText(t);
    onLog?.({ type: "gallery_apply_custom", text: t, originalName, uiLang });
  };

  const resetToOriginal = () => {
    setDraft(text);
    setCurrentText(text);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    setRendered(FONTS.map((f) => ({ font: f, dataUrl: null, error: false })));
    (async () => {
      for (const f of FONTS) {
        try {
          const canvas = await buildFontCanvas({ text: currentText, originalName: effectiveOriginal, font: f, colorize });
          if (cancelled) return;
          const dataUrl = canvas.toDataURL("image/png");
          setRendered((prev) => prev.map((r) => r.font.id === f.id ? { ...r, dataUrl } : r));
        } catch {
          if (cancelled) return;
          setRendered((prev) => prev.map((r) => r.font.id === f.id ? { ...r, error: true } : r));
        }
      }
    })();
    return () => { cancelled = true; };
  }, [currentText, effectiveOriginal, colorize]);

  const downloadOne = async (font: Font) => {
    setDownloadingId(font.id);
    try {
      const canvas = await buildFontCanvas({ text: currentText, originalName: effectiveOriginal, font, colorize });
      await downloadCanvasPng(canvas, `${currentText}_${font.id}.png`);
      onLog?.({ type: "gallery_download_one", name: currentText, font: font.id, uiLang });
    } finally {
      setDownloadingId(null);
    }
  };

  const downloadAll = async () => {
    setBulkDownloading(true);
    try {
      for (const f of FONTS) {
        const canvas = await buildFontCanvas({ text: currentText, originalName: effectiveOriginal, font: f, colorize });
        await downloadCanvasPng(canvas, `${currentText}_${f.id}.png`);
        await new Promise((r) => setTimeout(r, 150));
      }
      onLog?.({ type: "gallery_download_all", name: currentText, uiLang });
    } finally {
      setBulkDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-800 truncate" dir="auto" title={currentText}>
              {currentText}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {subtitleLabel}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenArt && (
              <button
                onClick={() => onOpenArt(currentText)}
                className="flex items-center gap-1.5 text-xs bg-violet-50 hover:bg-violet-100 text-violet-600 border border-violet-200 px-3 py-2 rounded-xl transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="13.5" cy="6.5" r="1.5" />
                  <circle cx="17.5" cy="10.5" r="1.5" />
                  <circle cx="8.5" cy="7.5" r="1.5" />
                  <circle cx="6.5" cy="12.5" r="1.5" />
                  <path d="M12 2a10 10 0 0 0 0 20c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.5-.5-2.5 0-1 1-2 2-2H18a4 4 0 0 0 4-4 10 10 0 0 0-10-10z" />
                </svg>
                {isKo ? "한글아트" : "Hangul Art"}
              </button>
            )}
            <button
              onClick={() => {
                setShareOpen(true);
                onLog?.({ type: "gallery_share_open", name: text, uiLang });
              }}
              className="flex items-center gap-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-xl transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
              {shareLabel}
            </button>
            <button
              onClick={downloadAll}
              disabled={bulkDownloading}
              className="flex items-center gap-1.5 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-3 py-2 rounded-xl transition"
            >
              {bulkDownloading ? (
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
              )}
              {isKo ? "전체 다운로드" : "Download all"}
            </button>
            <button
              onClick={onClose}
              aria-label={isKo ? "닫기" : "Close"}
              className="text-slate-400 hover:text-slate-700 transition p-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Input row — type Hangul to preview across every font */}
        <div className="px-6 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") apply(); }}
              placeholder={isKo ? "한글 입력 후 만들기" : "Type Hangul and press Apply"}
              dir="auto"
              maxLength={20}
              className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-violet-300"
            />
            <button
              onClick={apply}
              disabled={!draft.trim() || draft.trim() === currentText}
              className="shrink-0 bg-violet-500 hover:bg-violet-600 disabled:bg-violet-200 text-white text-xs px-4 py-2 rounded-xl transition font-medium"
            >
              {isKo ? "만들기" : "Apply"}
            </button>
            {isCustom && (
              <button
                onClick={resetToOriginal}
                title={isKo ? `${text}으로 돌아가기` : `Back to ${text}`}
                className="shrink-0 flex items-center gap-1 bg-white border border-slate-200 hover:border-violet-300 text-slate-500 hover:text-violet-600 text-xs px-3 py-2 rounded-xl transition"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 14 4 9 9 4" />
                  <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                </svg>
                <span className="truncate max-w-[6rem]">{isKo ? `${text} 다시` : text}</span>
              </button>
            )}
            <button
              onClick={() => {
                setColorize((v) => !v);
                onLog?.({ type: "gallery_toggle_colorize", on: !colorize, name: currentText, uiLang });
              }}
              title={isKo ? "자모 색상 (닿소리·홀소리)" : "Jamo colors (consonant/vowel)"}
              aria-pressed={colorize}
              className={`shrink-0 flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl border transition ${
                colorize
                  ? "bg-violet-50 border-violet-300 text-violet-600"
                  : "bg-white border-slate-200 text-slate-500 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="13.5" cy="6.5" r="2.5" fill="#2563eb" stroke="none" />
                <circle cx="7" cy="12" r="2.5" fill="#16a34a" stroke="none" />
                <circle cx="15" cy="15" r="2.5" fill="#dc2626" stroke="none" />
              </svg>
              {isKo ? "색상" : "Color"}
            </button>
          </div>
        </div>

        {shareOpen && (
          <ShareLinkModal
            url={shareUrl}
            shareText={shareText}
            hashtags="#Hangul #한글이름 #HangulName"
            title={shareTitle}
            isKo={isKo}
            uiLang={uiLang}
            onClose={() => setShareOpen(false)}
            onLog={onLog}
          />
        )}

        <div className="overflow-y-auto px-6 py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rendered.map(({ font, dataUrl, error }) => {
              const label = isKo ? font.labelKo : font.labelEn;
              return (
                <div key={font.id} className="border border-slate-100 rounded-2xl overflow-hidden bg-slate-50 flex flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      onPickFont?.(font.id);
                      onLog?.({ type: "gallery_pick_font", name: text, font: font.id, uiLang });
                    }}
                    className="block w-full aspect-[16/9] bg-white relative group focus:outline-none"
                    title={isKo ? "크게 보기" : "View larger"}
                  >
                    {dataUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={dataUrl} alt={`${text} — ${label}`} className="w-full h-full object-contain" />
                    ) : error ? (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-red-400">
                        {isKo ? "렌더 실패" : "Render failed"}
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="animate-spin w-5 h-5 text-slate-300" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                      </div>
                    )}
                  </button>
                  <div className="flex items-center justify-between px-3 py-2 border-t border-slate-100 bg-white">
                    <span className="text-xs text-slate-500 truncate">{label}</span>
                    <button
                      onClick={() => downloadOne(font)}
                      disabled={downloadingId === font.id || !dataUrl}
                      className="flex items-center gap-1 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 disabled:opacity-50 text-slate-500 px-2.5 py-1 rounded-lg transition"
                      title={isKo ? "PNG 다운로드" : "Download PNG"}
                    >
                      {downloadingId === font.id ? (
                        <svg className="animate-spin w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="7 10 12 15 17 10"/>
                          <line x1="12" y1="15" x2="12" y2="3"/>
                        </svg>
                      )}
                      PNG
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
