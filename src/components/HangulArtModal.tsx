"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  text: string;
  originalName: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onLog?: (data: Record<string, unknown>) => void;
}

export default function HangulArtModal({ text, originalName, isKo, uiLang, onClose, onLog }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  // Bump `nonce` to force iframe to reload (regenerate art)
  const [nonce, setNonce] = useState(0);

  const src = `/hangulart/index.html?text=${encodeURIComponent(text)}&n=${nonce}`;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const regenerate = () => {
    setLoaded(false);
    setNonce((n) => n + 1);
    onLog?.({ type: "hangulart_regenerate", name: text, uiLang });
  };

  const download = async () => {
    setDownloading(true);
    try {
      const iframe = iframeRef.current;
      const canvas = iframe?.contentDocument?.querySelector("canvas") as HTMLCanvasElement | null;
      if (!canvas) return;
      await new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (!blob) { resolve(); return; }
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${text}_hangulart.png`;
          if (/iP(hone|ad|od)/i.test(navigator.userAgent)) {
            a.target = "_blank";
            a.rel = "noopener";
          }
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          setTimeout(() => { URL.revokeObjectURL(url); resolve(); }, 1000);
        }, "image/png");
      });
      onLog?.({ type: "hangulart_download", name: text, uiLang });
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-800 truncate" dir="auto" title={text}>
              {text}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {isKo
                ? "한글아트 — 탭하거나 새로 만들기를 누르면 다른 작품이 나옵니다"
                : "Hangul Art — tap the canvas or press Regenerate for a new variation"}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label={isKo ? "닫기" : "Close"}
            className="text-slate-400 hover:text-slate-700 transition p-1 shrink-0"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="relative bg-slate-50" style={{ aspectRatio: "1 / 1" }}>
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="animate-spin w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </div>
          )}
          <iframe
            key={nonce}
            ref={iframeRef}
            src={src}
            title={`Hangul Art for ${text}`}
            className="block w-full h-full border-0"
            onLoad={() => {
              setLoaded(true);
              onLog?.({ type: "hangulart_open", name: text, originalName, uiLang });
            }}
          />
        </div>

        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-white">
          <button
            onClick={regenerate}
            className="flex items-center gap-1.5 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 px-4 py-2 rounded-xl transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="23 4 23 10 17 10" />
              <polyline points="1 20 1 14 7 14" />
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
            </svg>
            {isKo ? "새로 만들기" : "Regenerate"}
          </button>
          <button
            onClick={download}
            disabled={!loaded || downloading}
            className="flex items-center gap-1.5 text-xs bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white px-4 py-2 rounded-xl transition"
          >
            {downloading ? (
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
            PNG
          </button>
        </div>
      </div>
    </div>
  );
}
