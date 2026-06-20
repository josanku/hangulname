"use client";

import { useEffect, useRef, useState } from "react";
import ShareLinkModal from "@/components/ShareLinkModal";

interface Props {
  text: string;
  originalName: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onLog?: (data: Record<string, unknown>) => void;
  onOpenFontGallery?: (text: string) => void;
}

export default function HangulArtModal({ text, originalName, isKo, uiLang, onClose, onLog, onOpenFontGallery }: Props) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [downloading, setDownloading] = useState(false);
  // text rendered in iframe — starts as the converted name, can be changed via input
  const [currentText, setCurrentText] = useState(text);
  // value in the input box
  const [draft, setDraft] = useState(text);
  // bump to force iframe reload (regenerate art for same text)
  const [nonce, setNonce] = useState(0);
  const [shareOpen, setShareOpen] = useState(false);
  const [whiteBackground, setWhiteBackground] = useState(true); // Default: white background

  const src = `/hangulart/index.html?text=${encodeURIComponent(currentText)}&n=${nonce}&bg=${whiteBackground ? 'white' : 'default'}`;
  const isCustom = currentText !== text;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const apply = () => {
    const t = draft.trim();
    if (!t || t === currentText) return;
    setLoaded(false);
    setCurrentText(t);
    setNonce((n) => n + 1);
    onLog?.({ type: "hangulart_apply_custom", text: t, originalName, uiLang });
  };

  const regenerate = () => {
    setLoaded(false);
    setNonce((n) => n + 1);
    onLog?.({ type: "hangulart_regenerate", text: currentText, originalName, uiLang });
  };

  const resetToOriginal = () => {
    setLoaded(false);
    setDraft(text);
    setCurrentText(text);
    setNonce((n) => n + 1);
    onLog?.({ type: "hangulart_reset_original", text, originalName, uiLang });
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
          a.download = `${currentText}_hangulart.png`;
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
      onLog?.({ type: "hangulart_download", text: currentText, uiLang });
    } finally {
      setDownloading(false);
    }
  };

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?name=${encodeURIComponent(originalName || currentText)}`
    : `https://www.myhangulname.com/?name=${encodeURIComponent(originalName || currentText)}`;
  const shareText = isKo
    ? `${originalName ? originalName + " → " : ""}${currentText} 🎨 한글아트로 만들어 보세요!`
    : `${originalName ? originalName + " → " : ""}${currentText} 🎨 Make it as Hangul Art!`;

  return (
    <>
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
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold text-slate-800 truncate" dir="auto" title={currentText}>
              {currentText}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <p className="text-xs text-slate-400">
                {isKo
                  ? "한글아트 — 캔버스를 탭하거나 새로 만들기를 눌러 다른 작품을 만들어 보세요"
                  : "Hangul Art — tap the canvas or press Regenerate for a new variation"}
              </p>
              <button
                onClick={() => {
                  setWhiteBackground(!whiteBackground);
                  setLoaded(false);
                  onLog?.({ type: "hangulart_toggle_background", white: !whiteBackground, text: currentText, uiLang });
                }}
                className={`shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition ${
                  whiteBackground
                    ? "bg-slate-700 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
                title={isKo ? "배경색 전환" : "Toggle background"}
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={whiteBackground ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                </svg>
                <span>{isKo ? "하얀배경" : "White"}</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            {onOpenFontGallery && (
              <button
                onClick={() => onOpenFontGallery(currentText)}
                className="flex items-center gap-1.5 text-xs bg-violet-50 hover:bg-violet-100 text-violet-600 border border-violet-200 px-3 py-2 rounded-xl transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
                {isKo ? "한글폰트" : "Hangul Fonts"}
              </button>
            )}
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
        </div>

        {/* Input row */}
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
              className="flex-1 min-w-0 bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm text-slate-700 placeholder:text-slate-300 focus:outline-none focus:border-pink-300"
            />
            <button
              onClick={apply}
              disabled={!draft.trim() || draft.trim() === currentText}
              className="shrink-0 bg-pink-500 hover:bg-pink-600 disabled:bg-pink-200 text-white text-xs px-4 py-2 rounded-xl transition font-medium"
            >
              {isKo ? "만들기" : "Apply"}
            </button>
            {isCustom && (
              <button
                onClick={resetToOriginal}
                title={isKo ? `${text}으로 돌아가기` : `Back to ${text}`}
                className="shrink-0 flex items-center gap-1 bg-white border border-slate-200 hover:border-pink-300 text-slate-500 hover:text-pink-600 text-xs px-3 py-2 rounded-xl transition"
              >
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 14 4 9 9 4" />
                  <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
                </svg>
                <span className="truncate max-w-[6rem]">{isKo ? `${text} 다시` : text}</span>
              </button>
            )}
          </div>
        </div>

        {/* Canvas iframe - scrollable to show full content */}
        <div className="relative flex-1 overflow-auto bg-slate-50">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="animate-spin w-8 h-8 text-slate-300" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
            </div>
          )}
          <div className="w-full min-h-full flex items-center justify-center p-4">
            <iframe
              key={nonce + "-" + currentText}
              ref={iframeRef}
              src={src}
              title={`Hangul Art for ${currentText}`}
              className="block w-full aspect-square max-w-full border-0 rounded-xl shadow-lg"
              onLoad={() => {
                setLoaded(true);
                onLog?.({ type: "hangulart_open", text: currentText, originalName, uiLang });
              }}
            />
          </div>
        </div>

        {/* Action bar */}
        <div className="flex items-center justify-end gap-2 px-6 py-3 border-t border-slate-100 bg-white">
          <button
            onClick={() => {
              setShareOpen(true);
              onLog?.({ type: "hangulart_share_open", text: currentText, uiLang });
            }}
            className="flex items-center gap-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl transition"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            {isKo ? "공유" : "Share"}
          </button>
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

    {shareOpen && (
      <ShareLinkModal
        url={shareUrl}
        shareText={shareText}
        hashtags="#Hangul #한글아트 #HangulArt #HangulName"
        title={isKo ? "한글아트 공유" : "Share Hangul Art"}
        isKo={isKo}
        uiLang={uiLang}
        onClose={() => setShareOpen(false)}
        onLog={onLog}
      />
    )}
    </>
  );
}
