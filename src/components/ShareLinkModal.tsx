"use client";

import { useEffect, useState } from "react";

interface Props {
  /** URL to share (absolute, includes any name param) */
  url: string;
  /** Headline text included in social shares */
  shareText: string;
  /** Hashtags appended for messenger shares (no leading #, space-separated as needed by callers) */
  hashtags?: string;
  /** Modal title shown at the top */
  title: string;
  isKo: boolean;
  uiLang: string;
  onClose: () => void;
  onLog?: (data: Record<string, unknown>) => void;
}

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

export default function ShareLinkModal({ url, shareText, hashtags, title, isKo, uiLang, onClose, onLog }: Props) {
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState("");
  const [nativeSharing, setNativeSharing] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const hashtagSegment = hashtags ? `\n${hashtags}` : "";
  const fullMsg = `${shareText}${hashtagSegment}\n${url}`;
  const enc = encodeURIComponent;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const openShare = (target: string, platform: string) => {
    window.open(target, "_blank", "noopener,noreferrer");
    onLog?.({ type: "page_share", platform, uiLang });
  };

  const shareKakao = async () => {
    try { await navigator.clipboard.writeText(fullMsg); } catch { /* noop */ }
    showToast(isKo
      ? "복사됐습니다! 카카오톡 채팅창에 붙여넣기 하세요 😊"
      : "Copied! Paste into a KakaoTalk chat.");
    onLog?.({ type: "page_share", platform: "KakaoTalk", uiLang });
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onLog?.({ type: "page_share_copy_link", uiLang });
    } catch { /* noop */ }
  };

  const nativeShare = async () => {
    setNativeSharing(true);
    try {
      await navigator.share({ title, text: shareText, url });
      onLog?.({ type: "page_share_native", uiLang });
    } catch {
      // cancelled
    } finally {
      setNativeSharing(false);
    }
  };

  type UrlSNS = { kind: "url"; name: string; bg: string; icon: React.ReactNode; url: string };
  type ActionSNS = { kind: "action"; name: string; bg: string; icon: React.ReactNode; action: () => void };
  type SNSItem = UrlSNS | ActionSNS;

  const headlineHashtags = hashtags?.replace(/#/g, "").split(/\s+/).filter(Boolean).join(",") ?? "";

  const SNS: SNSItem[] = [
    {
      kind: "url", name: "X", bg: "#000000", icon: <IconX />,
      url: `https://x.com/intent/tweet?text=${enc(shareText)}&url=${enc(url)}${headlineHashtags ? `&hashtags=${enc(headlineHashtags)}` : ""}`,
    },
    {
      kind: "url", name: "Facebook", bg: "#1877F2", icon: <IconFacebook />,
      url: `https://www.facebook.com/sharer.php?u=${enc(url)}`,
    },
    {
      kind: "url", name: "WhatsApp", bg: "#25D366", icon: <IconWhatsApp />,
      url: `https://wa.me/?text=${enc(fullMsg)}`,
    },
    {
      kind: "url", name: "Line", bg: "#00B900", icon: <IconLine />,
      url: `https://line.me/R/msg/text/?${enc(fullMsg)}`,
    },
    {
      kind: "url", name: "Telegram", bg: "#2AABEE", icon: <IconTelegram />,
      url: `https://t.me/share/url?url=${enc(url)}&text=${enc(shareText + (hashtagSegment || ""))}`,
    },
    { kind: "action", name: "KakaoTalk", bg: "#FEE500", icon: <IconKakao />, action: shareKakao },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-sm p-6 flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label={isKo ? "닫기" : "Close"}
          className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition p-1"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div>
          <p className="text-sm font-semibold text-slate-700 text-center">{title}</p>
          <p className="text-xs text-slate-400 text-center mt-1 break-all" dir="ltr">{url}</p>
        </div>

        {toast && (
          <div className="bg-slate-800 text-white text-xs rounded-xl px-4 py-2.5 text-center">
            {toast}
          </div>
        )}

        <div className="grid grid-cols-3 gap-3">
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
                <span className={s.name === "KakaoTalk" ? "text-[#3C1E1E]" : "text-white"}>
                  {s.icon}
                </span>
              </div>
              <span className="text-[10px] text-slate-400 leading-tight text-center">{s.name}</span>
            </button>
          ))}
        </div>

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
