"use client";

import { useEffect, useRef, useState } from "react";
import { buildNameCard, makeQrImage, CARD_FONTS } from "@/lib/nameCard";
import { saveCanvasImage } from "@/lib/fontCanvas";

interface Props {
  korean: string;
  original: string;
  pronun?: string;
  tagline?: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onLog?: (data: Record<string, unknown>) => void;
}

export default function NameCardModal({ korean, original, pronun, tagline, isKo, uiLang, onClose, onLog }: Props) {
  const [fontId, setFontId] = useState<string>(CARD_FONTS[0]?.id ?? "gothic");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [busy, setBusy] = useState<"download" | "share" | null>(null);
  const qrRef = useRef<HTMLImageElement | null>(null);

  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?name=${encodeURIComponent(original || korean)}`
    : `https://www.myhangulname.com/?name=${encodeURIComponent(original || korean)}`;

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  // Prepare QR once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const img = await makeQrImage(shareUrl);
      if (!cancelled) qrRef.current = img;
      // trigger a re-render of the card now that QR is ready
      if (!cancelled) render(fontId);
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const render = async (fid: string) => {
    const font = CARD_FONTS.find((f) => f.id === fid) ?? CARD_FONTS[0];
    const canvas = await buildNameCard({ korean, original, pronun, tagline, font, qr: qrRef.current });
    setDataUrl(canvas.toDataURL("image/png"));
  };

  useEffect(() => { render(fontId); /* eslint-disable-next-line */ }, [fontId]);

  const download = async () => {
    setBusy("download");
    try {
      const font = CARD_FONTS.find((f) => f.id === fontId) ?? CARD_FONTS[0];
      const canvas = await buildNameCard({ korean, original, pronun, tagline, font, qr: qrRef.current });
      await saveCanvasImage(canvas, `${korean}_namecard.png`);
      onLog?.({ type: "namecard_download", name: korean, font: fontId, uiLang });
    } finally { setBusy(null); }
  };

  const share = async () => {
    setBusy("share");
    try {
      const font = CARD_FONTS.find((f) => f.id === fontId) ?? CARD_FONTS[0];
      const canvas = await buildNameCard({ korean, original, pronun, tagline, font, qr: qrRef.current });
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), "image/png"));
      const file = blob ? new File([blob], `${korean}_namecard.png`, { type: "image/png" }) : null;
      const nav = navigator as Navigator & { canShare?: (d?: ShareData) => boolean };
      if (file && nav.canShare?.({ files: [file] })) {
        await navigator.share({
          files: [file],
          title: `${korean} — My Hangul Name`,
          text: isKo ? `${original} → ${korean} 🇰🇷 내 한글 이름 카드!` : `${original} → ${korean} 🇰🇷 My name in Korean!`,
        });
        onLog?.({ type: "namecard_share", name: korean, font: fontId, uiLang });
      } else {
        await download();
      }
    } catch {
      /* user cancelled */
    } finally { setBusy(null); }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-sm max-h-[94vh] flex flex-col overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label={isKo ? "닫기" : "Close"}
          className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-white/80 text-slate-500 hover:bg-white hover:text-slate-700 transition shadow"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className="overflow-y-auto p-5 flex flex-col items-center gap-4">
          {/* Card preview */}
          <div className="w-full aspect-[2/3] rounded-2xl overflow-hidden bg-violet-50 flex items-center justify-center shadow-lg">
            {dataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={dataUrl} alt={`${korean} name card`} className="w-full h-full object-contain" />
            ) : (
              <svg className="animate-spin w-8 h-8 text-violet-300" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
            )}
          </div>

          {/* Font picker */}
          <div className="flex flex-wrap justify-center gap-1.5">
            {CARD_FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFontId(f.id)}
                className={`px-3 py-1 text-xs rounded-full border transition ${
                  fontId === f.id ? "bg-violet-600 text-white border-violet-600" : "bg-white text-slate-500 border-slate-200 hover:border-violet-300"
                }`}
              >
                {isKo ? f.labelKo : f.labelEn}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex w-full gap-2">
            <button
              onClick={share}
              disabled={busy !== null || !dataUrl}
              className="flex-1 flex items-center justify-center gap-1.5 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-300 text-white text-sm font-medium px-4 py-2.5 rounded-xl transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              {isKo ? "공유" : "Share"}
            </button>
            <button
              onClick={download}
              disabled={busy !== null || !dataUrl}
              className="flex-1 flex items-center justify-center gap-1.5 bg-white border border-violet-200 hover:bg-violet-50 text-violet-600 text-sm font-medium px-4 py-2.5 rounded-xl transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {isKo ? "저장" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
