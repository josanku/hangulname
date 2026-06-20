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

// 한글 색상 테마
const THEMES = [
  { name: "단청", bg: "#FFFFFF", fg: "#DC2626", accent: "#0EA5E9" },
  { name: "한복", bg: "#FEF3C7", fg: "#DC2626", accent: "#EF4444" },
  { name: "청자", bg: "#DBEAFE", fg: "#1E40AF", accent: "#60A5FA" },
  { name: "백자", bg: "#F8FAFC", fg: "#334155", accent: "#64748B" },
  { name: "먹", bg: "#0F172A", fg: "#F1F5F9", accent: "#94A3B8" },
  { name: "분홍", bg: "#FCE7F3", fg: "#BE185D", accent: "#EC4899" },
];

export default function HangulQRModal({ text, originalName, isKo, uiLang, onClose, onLog }: Props) {
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<any>(null);
  const [url, setUrl] = useState("");
  const [themeIdx, setThemeIdx] = useState(0);
  const [downloading, setDownloading] = useState(false);

  const currentTheme = THEMES[themeIdx];
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/?name=${encodeURIComponent(originalName)}`
    : "";

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // QR 코드 생성
  useEffect(() => {
    if (!qrRef.current || typeof window === "undefined") return;

    const loadQR = async () => {
      const QRCodeStylingModule = (await import("qr-code-styling")).default;

      const qrCode = new QRCodeStylingModule({
        width: 600,
        height: 600,
        data: shareUrl || "https://myhangulname.com",
        margin: 20,
        qrOptions: {
          typeNumber: 0,
          mode: "Byte",
          errorCorrectionLevel: "H",
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.4,
          margin: 8,
        },
        dotsOptions: {
          type: "rounded",
          color: currentTheme.fg,
          gradient: {
            type: "radial",
            colorStops: [
              { offset: 0, color: currentTheme.fg },
              { offset: 1, color: currentTheme.accent },
            ],
          },
        },
        backgroundOptions: {
          color: currentTheme.bg,
        },
        cornersSquareOptions: {
          type: "extra-rounded",
          color: currentTheme.accent,
        },
        cornersDotOptions: {
          type: "dot",
          color: currentTheme.fg,
        },
      });

      qrCodeRef.current = qrCode;
      if (qrRef.current) {
        qrRef.current.innerHTML = "";
        qrCode.append(qrRef.current);
      }
    };

    loadQR();
  }, [shareUrl, themeIdx, currentTheme]);

  const downloadQR = async () => {
    if (!qrCodeRef.current) return;
    setDownloading(true);
    try {
      await qrCodeRef.current.download({
        name: `${text}-qr`,
        extension: "png",
      });
      onLog?.({ type: "qr_download", text, originalName, theme: currentTheme.name, uiLang });
    } catch (err) {
      console.error("QR download failed:", err);
    } finally {
      setDownloading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(shareUrl);
    onLog?.({ type: "qr_copy_url", text, originalName, uiLang });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              {isKo ? "한글 QR 아트" : "Hangul QR Art"}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {isKo ? `${text} — 예술적인 QR 코드` : `${text} — Artistic QR Code`}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition p-2"
            aria-label={isKo ? "닫기" : "Close"}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* QR Code Display */}
        <div className="p-6">
          <div
            ref={qrRef}
            className="flex items-center justify-center rounded-2xl overflow-hidden shadow-xl mx-auto"
            style={{ maxWidth: "600px", backgroundColor: currentTheme.bg }}
          />

          {/* Theme Selector */}
          <div className="mt-6">
            <p className="text-sm font-medium text-slate-600 mb-3">
              {isKo ? "색상 테마" : "Color Theme"}
            </p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {THEMES.map((theme, idx) => (
                <button
                  key={idx}
                  onClick={() => setThemeIdx(idx)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                    idx === themeIdx
                      ? "bg-blue-500 text-white shadow-md"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {theme.name}
                </button>
              ))}
            </div>
          </div>

          {/* URL Display */}
          <div className="mt-6 bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 mb-2">
              {isKo ? "QR 코드 링크" : "QR Code URL"}
            </p>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={shareUrl}
                readOnly
                className="flex-1 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none"
              />
              <button
                onClick={copyUrl}
                className="shrink-0 bg-slate-200 hover:bg-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition"
              >
                {isKo ? "복사" : "Copy"}
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={downloadQR}
              disabled={downloading}
              className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-slate-300 disabled:to-slate-400 text-white px-6 py-4 rounded-xl font-bold transition shadow-lg disabled:shadow-none flex items-center justify-center gap-2"
            >
              {downloading ? (
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : (
                <>
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  {isKo ? "QR 이미지 다운로드" : "Download QR Image"}
                </>
              )}
            </button>
          </div>

          {/* Info */}
          <p className="text-xs text-slate-400 mt-4 text-center">
            {isKo
              ? "스캔하면 이 결과 페이지로 이동합니다"
              : "Scan to view this result page"}
          </p>
        </div>
      </div>
    </div>
  );
}
