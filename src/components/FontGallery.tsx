"use client";

import { useEffect, useState } from "react";
import { FONTS, buildFontCanvas, downloadCanvasPng, type Font } from "@/lib/fontCanvas";

interface Props {
  text: string;
  originalName: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onPickFont?: (fontId: string) => void;
  onLog?: (data: Record<string, unknown>) => void;
}

interface RenderedFont {
  font: Font;
  dataUrl: string | null;
  error: boolean;
}

export default function FontGallery({ text, originalName, isKo, uiLang, onClose, onPickFont, onLog }: Props) {
  const [rendered, setRendered] = useState<RenderedFont[]>(
    FONTS.map((f) => ({ font: f, dataUrl: null, error: false })),
  );
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [bulkDownloading, setBulkDownloading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const f of FONTS) {
        try {
          const canvas = await buildFontCanvas({ text, originalName, font: f });
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
  }, [text, originalName]);

  const downloadOne = async (font: Font) => {
    setDownloadingId(font.id);
    try {
      const canvas = await buildFontCanvas({ text, originalName, font });
      await downloadCanvasPng(canvas, `${text}_${font.id}.png`);
      onLog?.({ type: "gallery_download_one", name: text, font: font.id, uiLang });
    } finally {
      setDownloadingId(null);
    }
  };

  const downloadAll = async () => {
    setBulkDownloading(true);
    try {
      for (const f of FONTS) {
        const canvas = await buildFontCanvas({ text, originalName, font: f });
        await downloadCanvasPng(canvas, `${text}_${f.id}.png`);
        await new Promise((r) => setTimeout(r, 150));
      }
      onLog?.({ type: "gallery_download_all", name: text, uiLang });
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
        <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              {isKo ? "여러 폰트 이미지" : "All font images"}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5" dir="auto">
              {text}
            </p>
          </div>
          <div className="flex items-center gap-2">
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
