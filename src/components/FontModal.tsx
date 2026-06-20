"use client";

import { useState, useEffect, useCallback } from "react";
import { FONTS, buildFontCanvas, saveCanvasImage } from "@/lib/fontCanvas";

export { FONTS };

interface Props {
  text: string;
  originalName: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onLog?: (data: Record<string, unknown>) => void;
  initialFontId?: string;
  onOpenArt?: (text: string) => void;
}

// ─── SNS icons (inline SVG) ──────────────────────────────────────────────────

function IconX() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function IconFacebook() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function IconLine() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
    </svg>
  );
}

function IconKakao() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 3C6.477 3 2 6.477 2 10.8c0 2.75 1.61 5.17 4.07 6.67l-.96 3.57c-.08.32.27.57.55.38L9.9 18.9c.68.1 1.39.15 2.1.15 5.523 0 10-3.477 10-7.8S17.523 3 12 3z"/>
    </svg>
  );
}

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  );
}

function IconTikTok() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.3a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V9.27a8.19 8.19 0 0 0 4.83 1.55V7.37a4.85 4.85 0 0 1-1.06-.68z"/>
    </svg>
  );
}

// ─── Share Sheet ─────────────────────────────────────────────────────────────

interface ShareSheetProps {
  text: string;
  originalName: string;
  imageDataUrl: string;
  imageBlob: Blob;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onLog?: (data: Record<string, unknown>) => void;
}

function ShareSheet({ text, originalName, imageDataUrl, imageBlob, isKo, uiLang, onClose, onLog }: ShareSheetProps) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [nativeSharing, setNativeSharing] = useState(false);

  const shareUrl = `${window.location.origin}/?name=${encodeURIComponent(originalName)}`;
  const shareTitle = isKo ? "내 이름을 한글로" : "My Hangul Name";

  // 플랫폼별 최적화된 공유 텍스트
  const mainMsg = isKo
    ? `${originalName} → ${text} 🇰🇷 내 이름도 한글로 확인해보세요!`
    : `${originalName} → ${text} 🇰🇷 Find your name in Korean Hangul!`;

  // 메신저용 (WhatsApp/Telegram/LINE): 해시태그 + URL 포함
  const fullMsg = `${mainMsg}\n#Hangul #한글 #한글이름 #HangulName\n${shareUrl}`;

  const enc = encodeURIComponent;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const downloadImage = () => {
    const url = URL.createObjectURL(imageBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${text}.png`;
    if (/iP(hone|ad|od)/i.test(navigator.userAgent)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  // Instagram/TikTok: download image then open site
  const shareImageApp = (platform: "Instagram" | "TikTok") => {
    downloadImage();
    const msg = isKo
      ? `이미지를 저장했습니다. ${platform}에서 업로드하세요!`
      : `Image saved! Upload it on ${platform}.`;
    showToast(msg);
    setTimeout(() => {
      window.open(platform === "Instagram" ? "https://www.instagram.com/" : "https://www.tiktok.com/", "_blank", "noopener,noreferrer");
    }, 400);
    onLog?.({ type: "share_sns", platform, name: text, uiLang });
  };

  // KakaoTalk: SDK 없이는 클립보드 복사가 유일한 신뢰할 수 있는 방법
  const shareKakao = async () => {
    await navigator.clipboard.writeText(fullMsg).catch(() => {});
    showToast(isKo
      ? "복사됐습니다! 카카오톡 채팅창에 붙여넣기 하세요 😊"
      : "Copied! Paste into a KakaoTalk chat.");
    onLog?.({ type: "share_sns", platform: "KakaoTalk", name: text, uiLang });
  };

  // URL 공유 플랫폼 — 새 탭으로 열기 (popup dimension 제거: 모바일 차단 방지)
  const openShare = (url: string, platform: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
    onLog?.({ type: "share_sns", platform, name: text, uiLang });
  };

  type UrlSNS = { kind: "url"; name: string; bg: string; icon: React.ReactNode; url: string };
  type ActionSNS = { kind: "action"; name: string; bg: string; icon: React.ReactNode; action: () => void };
  type SNSItem = UrlSNS | ActionSNS;

  const SNS: SNSItem[] = [
    {
      // X: text(본문) + url(별도) + hashtags(쉼표구분, # 없이) — 세 파라미터 분리가 표준
      kind: "url", name: "X", bg: "#000000", icon: <IconX />,
      url: `https://x.com/intent/tweet?text=${enc(mainMsg)}&url=${enc(shareUrl)}&hashtags=Hangul,HangulName,한글이름`,
    },
    {
      // Facebook: u(URL)만 지원. quote 파라미터는 무시됨. OG 태그로 미리보기 표시
      kind: "url", name: "Facebook", bg: "#1877F2", icon: <IconFacebook />,
      url: `https://www.facebook.com/sharer.php?u=${enc(shareUrl)}&hashtag=${enc("#Hangul")}`,
    },
    {
      // WhatsApp: text에 메시지+URL 전부 포함 (wa.me 표준)
      kind: "url", name: "WhatsApp", bg: "#25D366", icon: <IconWhatsApp />,
      url: `https://wa.me/?text=${enc(fullMsg)}`,
    },
    {
      // LINE: line.me/R/msg/text/ 형식이 모바일 앱 연동 표준
      kind: "url", name: "Line", bg: "#00B900", icon: <IconLine />,
      url: `https://line.me/R/msg/text/?${enc(fullMsg)}`,
    },
    {
      // Telegram: url + text 분리 파라미터 (공식 표준)
      kind: "url", name: "Telegram", bg: "#2AABEE", icon: <IconTelegram />,
      url: `https://t.me/share/url?url=${enc(shareUrl)}&text=${enc(mainMsg + "\n#Hangul #한글이름 #HangulName")}`,
    },
    { kind: "action", name: "KakaoTalk", bg: "#FEE500", icon: <IconKakao />, action: shareKakao },
    { kind: "action", name: "Instagram", bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", icon: <IconInstagram />, action: () => shareImageApp("Instagram") },
    { kind: "action", name: "TikTok",    bg: "#010101", icon: <IconTikTok />, action: () => shareImageApp("TikTok") },
  ];

  const copyLink = async () => {
    await navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    onLog?.({ type: "share_copy_link", name: text, uiLang });
  };

  const nativeShare = async () => {
    setNativeSharing(true);
    try {
      const file = new File([imageBlob], `${text}.png`, { type: "image/png" });
      const canShareFiles = navigator.canShare?.({ files: [file] });
      if (canShareFiles) {
        await navigator.share({ title: shareTitle, text: mainMsg, url: shareUrl, files: [file] });
      } else {
        await navigator.share({ title: shareTitle, text: mainMsg, url: shareUrl });
      }
      onLog?.({ type: "share_native", name: text, uiLang });
    } catch {
      // cancelled
    } finally {
      setNativeSharing(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-sm p-6 flex flex-col gap-4"
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

        <p className="text-sm font-semibold text-slate-700 text-center">
          {isKo ? "공유하기" : "Share"}
        </p>

        {/* 이미지 미리보기 */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageDataUrl} alt={text} className="w-full rounded-2xl shadow-sm" />

        {/* Toast */}
        {toast && (
          <div className="bg-slate-800 text-white text-xs rounded-xl px-4 py-2.5 text-center">
            {toast}
          </div>
        )}

        {/* SNS 버튼 — 4×2 그리드 */}
        <div className="grid grid-cols-4 gap-3">
          {SNS.map((s) => (
            <button
              key={s.name}
              onClick={() => {
                if (s.kind === "url") openShare(s.url, s.name);
                else s.action();
              }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-sm"
                style={{ background: s.bg }}
              >
                {/* KakaoTalk icon is dark on yellow */}
                <span className={s.name === "KakaoTalk" ? "text-[#3C1E1E]" : "text-white"}>
                  {s.icon}
                </span>
              </div>
              <span className="text-[9px] text-slate-400 leading-tight text-center">{s.name}</span>
            </button>
          ))}
        </div>

        {/* 링크 복사 + 앱 공유 */}
        <div className="flex gap-2">
          <button
            onClick={copyLink}
            className={`flex-1 flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-xl transition border
              ${copied
                ? "bg-green-50 border-green-200 text-green-600"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"}`}
          >
            {copied ? (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                {isKo ? "복사됨!" : "Copied!"}
              </>
            ) : (
              <>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                </svg>
                {isKo ? "링크 복사" : "Copy Link"}
              </>
            )}
          </button>

          {typeof navigator !== "undefined" && "share" in navigator && (
            <button
              onClick={nativeShare}
              disabled={nativeSharing}
              className="flex-1 flex items-center justify-center gap-1.5 text-xs py-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-500 hover:bg-blue-100 transition disabled:opacity-50"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                <polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/>
              </svg>
              {isKo ? "앱으로 공유" : "Share via App"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Font Modal ───────────────────────────────────────────────────────────────

const TEXT_SWATCHES = ["#1e293b", "#000000", "#ffffff", "#6d28d9", "#2563eb", "#16a34a", "#dc2626", "#db2777", "#f59e0b"];
// null = default gradient
const BG_SWATCHES: (string | null)[] = [null, "#ffffff", "#0f172a", "#fff7ed", "#ecfdf5", "#eff6ff", "#fdf2f8", "#f5f3ff", "#fee2e2"];

export default function FontModal({ text, originalName, isKo, uiLang, onClose, onLog, initialFontId, onOpenArt }: Props) {
  const [selectedFont, setSelectedFont] = useState<string>(initialFontId ?? FONTS[1].id);
  const [downloading, setDownloading] = useState(false);
  const [shareData, setShareData] = useState<{ dataUrl: string; blob: Blob } | null>(null);
  const [generatingShare, setGeneratingShare] = useState(false);
  const [textColor, setTextColor] = useState<string>("#1e293b");
  const [bgColor, setBgColor] = useState<string | null>(null); // null = default gradient
  const [fontScale, setFontScale] = useState<number>(1);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleFontSelect = (fontId: string) => {
    setSelectedFont(fontId);
    onLog?.({ type: "font_select", name: text, font: fontId, uiLang });
  };

  const font = FONTS.find((f) => f.id === selectedFont) ?? FONTS[1];
  const fontLabel = isKo ? font.labelKo : font.labelEn;

  const buildCanvas = useCallback(
    (targetFont: typeof FONTS[number]) => buildFontCanvas({ text, originalName, font: targetFont, textColor, bgColor: bgColor ?? undefined, fontScale }),
    [text, originalName, textColor, bgColor, fontScale],
  );

  const downloadImage = useCallback(async () => {
    setDownloading(true);
    try {
      const canvas = await buildCanvas(font);
      await saveCanvasImage(canvas, `${text}.png`);
      onLog?.({ type: "download", name: text, font: selectedFont, uiLang });
    } finally {
      setDownloading(false);
    }
  }, [buildCanvas, font, text, selectedFont, uiLang, onLog]);

  const openShareSheet = useCallback(async () => {
    setGeneratingShare(true);
    try {
      const canvas = await buildCanvas(font);
      const dataUrl = canvas.toDataURL("image/png");
      const blob = await new Promise<Blob>((res, rej) =>
        canvas.toBlob((b) => b ? res(b) : rej(new Error("blob failed")), "image/png")
      );
      setShareData({ dataUrl, blob });
      onLog?.({ type: "share_open", name: text, font: selectedFont, uiLang });
    } catch {
      // ignore
    } finally {
      setGeneratingShare(false);
    }
  }, [buildCanvas, font, text, selectedFont, uiLang, onLog]);

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

        <div
          className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* 닫기 — 모바일에서도 잘 보이도록 크게 */}
          <button
            onClick={onClose}
            aria-label={isKo ? "닫기" : "Close"}
            className="absolute top-3 right-3 z-10 flex items-center justify-center w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* 스크롤 영역 — 폰트가 많아도 전부 볼 수 있도록 */}
          <div className="overflow-y-auto flex flex-col items-center gap-5 p-8 w-full">
          {/* 이름 대형 표시 */}
          <div
            className={`w-full rounded-2xl flex items-center justify-center ${bgColor ? "" : "bg-gradient-to-br from-slate-50 to-blue-50"}`}
            style={{ minHeight: "220px", padding: "2rem", background: bgColor ?? undefined }}
          >
            <div style={{ textAlign: "center" }}>
              {text.trim().split(/\s+/).map((part, i, arr) => (
                <div
                  key={i}
                  style={{
                    fontFamily: font.css,
                    fontWeight: font.id === "hunmin-ebs" ? 900 : 700,
                    fontSize: arr.length >= 2
                      ? `calc(clamp(2.8rem, 12vw, 5rem) * ${fontScale})`
                      : `calc(clamp(3.5rem, 15vw, 6.5rem) * ${fontScale})`,
                    lineHeight: 1.25,
                    color: textColor,
                    letterSpacing: "0.04em",
                  }}
                >
                  {i === 0 ? part : arr.slice(1).join(" ")}
                </div>
              )).filter((_, i) => i < 2)}
            </div>
          </div>

          {/* 글자색 · 배경색 · 글자크기 */}
          <div className="w-full flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 w-8 shrink-0">{isKo ? "글자" : "Text"}</span>
              <div className="flex items-center gap-1.5 py-0.5">
                {TEXT_SWATCHES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setTextColor(c)}
                    aria-label={`text ${c}`}
                    className={`w-4 h-4 shrink-0 rounded-full border transition ${textColor === c ? "ring-2 ring-blue-400 border-transparent" : "border-slate-200"}`}
                    style={{ background: c }}
                  />
                ))}
                <label className="w-4 h-4 shrink-0 rounded-full border border-slate-200 overflow-hidden cursor-pointer relative" title={isKo ? "직접 선택" : "Custom"}>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] text-slate-400 pointer-events-none">+</span>
                  <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="opacity-0 w-full h-full cursor-pointer" />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-slate-400 w-8 shrink-0">{isKo ? "배경" : "BG"}</span>
              <div className="flex items-center gap-1.5 py-0.5">
                {BG_SWATCHES.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setBgColor(c)}
                    aria-label={c ? `bg ${c}` : "default"}
                    title={c === null ? (isKo ? "기본" : "Default") : undefined}
                    className={`w-4 h-4 shrink-0 rounded-full border transition ${bgColor === c ? "ring-2 ring-blue-400 border-transparent" : "border-slate-200"} ${c === null ? "bg-gradient-to-br from-slate-50 to-blue-50" : ""}`}
                    style={c ? { background: c } : undefined}
                  />
                ))}
                <label className="w-4 h-4 shrink-0 rounded-full border border-slate-200 overflow-hidden cursor-pointer relative" title={isKo ? "직접 선택" : "Custom"}>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] text-slate-400 pointer-events-none">+</span>
                  <input type="color" value={bgColor ?? "#ffffff"} onChange={(e) => setBgColor(e.target.value)} className="opacity-0 w-full h-full cursor-pointer" />
                </label>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-0.5">
              <span className="text-[10px] text-slate-400 w-8 shrink-0">{isKo ? "크기" : "Size"}</span>
              <span className="text-[10px] text-slate-300 shrink-0 leading-none">가</span>
              <input
                type="range"
                min={0.6}
                max={1.5}
                step={0.05}
                value={fontScale}
                onChange={(e) => setFontScale(parseFloat(e.target.value))}
                aria-label={isKo ? "글자 크기" : "Font size"}
                className="flex-1 h-1.5 accent-blue-500 cursor-pointer"
              />
              <span className="text-base text-slate-400 shrink-0 leading-none">가</span>
            </div>
          </div>

          {/* 폰트 이름 + 버튼 — 모바일에서는 줄을 나눠 버튼이 가리지 않게 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full px-1">
            <span className="text-xs text-slate-400">{fontLabel}</span>
            <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
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
              {onOpenArt && (
                <button
                  onClick={() => onOpenArt(text)}
                  className="flex items-center gap-1.5 text-xs bg-violet-50 hover:bg-violet-100 text-violet-600 border border-violet-200 px-4 py-2 rounded-xl transition"
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
                onClick={openShareSheet}
                disabled={generatingShare}
                className="flex items-center gap-1.5 text-xs bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-300 text-white px-4 py-2 rounded-xl transition"
              >
                {generatingShare ? (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                ) : (
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                )}
                {isKo ? "공유하기" : "Share"}
              </button>
            </div>
          </div>

          {/* 폰트 선택 — 서체 이름(작게) + 해당 서체로 이름 미리보기 */}
          <div className="grid grid-cols-3 gap-2 w-full">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => handleFontSelect(f.id)}
                className={`py-3 px-3 rounded-xl transition border flex flex-col items-center gap-1
                  ${selectedFont === f.id
                    ? "border-blue-400 bg-blue-50"
                    : "border-slate-100 bg-white hover:border-blue-200"
                  }`}
              >
                <span
                  className="text-[10px] text-slate-400 leading-none"
                  style={{ fontFamily: "system-ui, sans-serif", fontWeight: 400 }}
                >
                  {isKo ? f.labelKo : f.labelEn}
                </span>
                <span
                  style={{ fontFamily: f.css, fontWeight: f.id === "hunmin-ebs" ? 900 : 700, fontSize: "1.05rem", lineHeight: 1.3 }}
                  className={selectedFont === f.id ? "text-blue-600" : "text-slate-700"}
                >
                  {text}
                </span>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="w-full mt-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-sm font-medium transition"
          >
            {isKo ? "닫기 (메인으로)" : "Close"}
          </button>
          </div>
        </div>
      </div>

      {/* Share Sheet — rendered above the modal */}
      {shareData && (
        <ShareSheet
          text={text}
          originalName={originalName}
          imageDataUrl={shareData.dataUrl}
          imageBlob={shareData.blob}
          isKo={isKo}
          uiLang={uiLang}
          onClose={() => setShareData(null)}
          onLog={onLog}
        />
      )}
    </>
  );
}
