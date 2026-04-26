"use client";

import { useState, useEffect, useCallback } from "react";

export const FONTS = [
  {
    id: "gungsuh",
    labelKo: "궁서",
    labelEn: "Gungsuh",
    css: "JSongMyung, serif",
  },
  {
    id: "myeongjo",
    labelKo: "명조",
    labelEn: "Myeongjo",
    css: "NanumMyeongjo, serif",
  },
  {
    id: "gothic",
    labelKo: "고딕",
    labelEn: "Gothic",
    css: "NanumGothic, sans-serif",
  },
  {
    id: "hunmin-hancom",
    labelKo: "훈민정음\n(한컴)",
    labelEn: "Hunminjeongeum\n(Hancom)",
    css: "HancomHunminjeongeum, serif",
  },
  {
    id: "hunmin-ebs",
    labelKo: "훈민정음\n(EBS)",
    labelEn: "Hunminjeongeum\n(EBS)",
    css: "EBSHunminjeongeum, serif",
  },
  {
    id: "pretendard",
    labelKo: "Pretendard",
    labelEn: "Pretendard",
    css: "Pretendard, sans-serif",
  },
] as const;

interface Props {
  text: string;
  originalName: string;
  isKo: boolean;
  onClose: () => void;
}

export default function FontModal({ text, originalName, isKo, onClose }: Props) {
  const [selectedFont, setSelectedFont] = useState<string>(FONTS[1].id);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const font = FONTS.find((f) => f.id === selectedFont) ?? FONTS[1];
  const fontLabel = isKo
    ? font.labelKo.replace("\n", " ")
    : font.labelEn.replace("\n", " ");

  const downloadImage = useCallback(async () => {
    setDownloading(true);
    try {
      await document.fonts.load(`bold 80px ${font.css}`);

      const SCALE = 2;
      const W = 640, H = 360;
      const canvas = document.createElement("canvas");
      canvas.width = W * SCALE;
      canvas.height = H * SCALE;
      const ctx = canvas.getContext("2d")!;
      ctx.scale(SCALE, SCALE);

      // 배경
      const grad = ctx.createLinearGradient(0, 0, W, H);
      grad.addColorStop(0, "#f8fafc");
      grad.addColorStop(1, "#eff6ff");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(0, 0, W, H, 24);
      ctx.fill();

      // 한글 이름: 공백 기준으로 두 줄 분리
      const parts = text.trim().split(/\s+/);
      const lines = parts.length >= 2
        ? [parts[0], parts.slice(1).join(" ")]
        : [text];

      const longestLen = Math.max(...lines.map((l) => l.length));
      const fontSize = Math.min(100, Math.floor(W * 0.88 / Math.max(longestLen, 1) * 1.3));
      const fs = Math.min(fontSize, 100);
      const lineH = fs * 1.25;

      ctx.font = `bold ${fs}px ${font.css}`;
      ctx.fillStyle = "#1e293b";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const totalH = lines.length * lineH;
      const startY = H / 2 - totalH / 2 - 10;
      lines.forEach((line, idx) => {
        ctx.fillText(line, W / 2, startY + lineH * idx + lineH / 2);
      });

      // 원어 이름 (작게, 아래)
      ctx.font = `400 18px NanumGothic, sans-serif`;
      ctx.fillStyle = "#94a3b8";
      ctx.fillText(originalName, W / 2, startY + totalH + 32);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${text}.png`;
        a.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    } finally {
      setDownloading(false);
    }
  }, [font, text, originalName]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg flex flex-col items-center gap-5 p-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition p-1"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* 이름 대형 표시 (볼드, 두 줄) */}
        <div
          className="w-full bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl flex items-center justify-center"
          style={{ minHeight: "220px", padding: "2rem" }}
        >
          <div style={{ textAlign: "center" }}>
            {text.trim().split(/\s+/).map((part, i, arr) => (
              <div
                key={i}
                style={{
                  fontFamily: font.css,
                  fontWeight: 700,
                  fontSize: arr.length >= 2
                    ? "clamp(2.8rem, 12vw, 5rem)"
                    : "clamp(3.5rem, 15vw, 6.5rem)",
                  lineHeight: 1.25,
                  color: "#1e293b",
                  letterSpacing: "0.04em",
                }}
              >
                {i === 0 ? part : arr.slice(1).join(" ")}
              </div>
            )).filter((_, i) => i < 2)}
          </div>
        </div>

        {/* 현재 폰트 이름 + 다운로드 버튼 */}
        <div className="flex items-center gap-3 w-full justify-between px-1">
          <span className="text-xs text-slate-400">{fontLabel}</span>
          <button
            onClick={downloadImage}
            disabled={downloading}
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

        {/* 폰트 선택 */}
        <div className="grid grid-cols-3 gap-2 w-full">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => setSelectedFont(f.id)}
              style={{ fontFamily: f.css, fontWeight: 700 }}
              className={`py-3 px-2 rounded-xl text-sm transition border leading-snug whitespace-pre-line
                ${selectedFont === f.id
                  ? "border-blue-400 bg-blue-50 text-blue-600"
                  : "border-slate-100 bg-white text-slate-600 hover:border-blue-200"
                }`}
            >
              {isKo ? f.labelKo : f.labelEn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
