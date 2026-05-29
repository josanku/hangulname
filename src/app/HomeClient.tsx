"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { translations, LANG_LABELS, detectLang, type Lang } from "@/lib/i18n";
import { ABOUT_CONTENT } from "@/lib/about";
import FontModal from "@/components/FontModal";
import FontGallery from "@/components/FontGallery";
import HangulArtModal from "@/components/HangulArtModal";
import HangulArtGallery from "@/components/HangulArtGallery";
import ShareLinkModal from "@/components/ShareLinkModal";
import KoreaBackground from "@/components/KoreaBackground";
import FeedbackButton from "@/components/FeedbackButton";

type AboutKey = "hangulname" | "hunminjeong" | "wehome" | "faq";
type ShareKind = "site" | "result";

const SPEECH_LANG: Record<Lang, string> = {
  ko: "ko-KR", en: "en-US", zh: "zh-CN", ja: "ja-JP", es: "es-ES",
  fr: "fr-FR", de: "de-DE", ar: "ar-SA", ru: "ru-RU", pt: "pt-BR",
  vi: "vi-VN", id: "id-ID", th: "th-TH", ms: "ms-MY", hi: "hi-IN",
  bn: "bn-BD", tl: "fil-PH", my: "my-MM", mn: "mn-MN",
};

interface MinimalSpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((ev: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: ((ev: unknown) => void) | null;
  onend: (() => void) | null;
}
type SRConstructor = new () => MinimalSpeechRecognition;

interface Variant {
  country: string;
  flag: string;
  options: string[];
  phonetic: string;
  ipa: string;
}

interface Result {
  sourceLang: string;
  variants: Variant[];
  origin: string;
}

function SpeakerIcon({ active }: { active: boolean }) {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      {active && <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />}
    </svg>
  );
}

// ─── Safe API helpers ─────────────────────────────────────────────────────────

function hasSpeech(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window && !!window.speechSynthesis;
}

function safeStorageGet(key: string, fallback = ""): string {
  try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; }
}
function safeStorageSet(key: string, value: string): void {
  try { localStorage.setItem(key, value); } catch { /* blocked */ }
}
function safeSessionGet(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}
function safeSessionSet(key: string, value: string): void {
  try { sessionStorage.setItem(key, value); } catch { /* blocked */ }
}

function getVoice(lang: string): SpeechSynthesisVoice | undefined {
  if (!hasSpeech()) return undefined;
  const voices = window.speechSynthesis.getVoices();
  const prefix = lang.split("-")[0];
  const langVoices = voices.filter((v) => v.lang.startsWith(prefix));
  const femaleHints = [
    "yuna", "kyoko", "meijia", "tingting", "nora", "sara",
    "female", "woman", "fiona", "karen", "samantha", "victoria",
    "amélie", "zosia", "mónica", "joanna", "amy", "emma", "kate",
    "여성", "여자",
  ];
  return (
    langVoices.find((v) =>
      femaleHints.some((h) => v.name.toLowerCase().includes(h))
    ) ?? langVoices[0]
  );
}

export default function HomeClient({ initialName }: { initialName?: string }) {
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [currentInput, setCurrentInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showInfoMenu, setShowInfoMenu] = useState(false);
  const [aboutOpen, setAboutOpen] = useState<AboutKey | null>(null);
  const [shareOpen, setShareOpen] = useState<ShareKind | null>(null);
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState<"up" | null>(null);
  const [modalText, setModalText] = useState<string | null>(null);
  const [modalInitialFont, setModalInitialFont] = useState<string | undefined>(undefined);
  const [galleryText, setGalleryText] = useState<string | null>(null);
  const [artText, setArtText] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null);
  const [kakaoIOS, setKakaoIOS] = useState(false);
  const [jamoIndex, setJamoIndex] = useState(0);

  const logAction = useCallback(async (data: Record<string, unknown>) => {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const ua = navigator.userAgent;

    // ── KakaoTalk 인앱 브라우저 처리 ───────────────────────────────────────
    if (/KAKAOTALK/i.test(ua)) {
      if (/Android/i.test(ua)) {
        // Android: intent URL로 기본 브라우저(Chrome 등)에서 자동으로 열기
        const intentUrl =
          `intent://${window.location.host}${window.location.pathname}${window.location.search}` +
          `#Intent;scheme=https;action=android.intent.action.VIEW;` +
          `category=android.intent.category.BROWSABLE;end`;
        window.location.replace(intentUrl);
        return; // 이 후 코드는 실행하지 않음
      } else {
        // iOS: 자동 redirect 불가 → 배너로 안내
        setKakaoIOS(true);
      }
    }

    const detectedLang = detectLang();
    setLang(detectedLang);
    const stored = parseInt(safeStorageGet("convertCount", "0"), 10);
    setCount(stored);

    // speechSynthesis는 지원 여부 확인 후 호출
    if (hasSpeech()) window.speechSynthesis.getVoices();

    // 방문자 로그 (세션당 1회)
    if (!safeSessionGet("hg_visited")) {
      safeSessionSet("hg_visited", "1");
      fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visit", uiLang: detectedLang }),
      }).catch(() => {});
    }

    // Auto-convert: prefer server-provided initialName, fallback to URL param
    const nameParam = initialName ?? new URLSearchParams(window.location.search).get("name") ?? null;
    if (nameParam) {
      setInput(nameParam);
      setLoading(true);
      fetch("/api/transliterate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nameParam.trim(), uiLang: detectedLang }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data.variants) {
            setResult(data);
            setCurrentInput(nameParam.trim());
            const next = stored + 1;
            setCount(next);
            safeStorageSet("convertCount", String(next));
          } else if (data.error) {
            setError(data.error);
          }
        })
        .catch(() => setError("An error occurred"))
        .finally(() => setLoading(false));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Speech Recognition (STT) setup ──────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as unknown as { SpeechRecognition?: SRConstructor; webkitSpeechRecognition?: SRConstructor };
    const SR = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SR) { setMicSupported(false); return; }
    setMicSupported(true);
    const rec = new SR();
    rec.continuous = false;
    rec.interimResults = false;
    rec.onresult = (event) => {
      const transcript = event.results[0]?.[0]?.transcript ?? "";
      const cleaned = transcript.replace(/[.,]/g, "").trim();
      if (cleaned) setInput(cleaned);
      setIsListening(false);
    };
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    recognitionRef.current = rec;
    return () => { try { rec.abort(); } catch { /* noop */ } };
  }, []);

  const toggleMic = () => {
    const rec = recognitionRef.current;
    if (!rec) return;
    if (isListening) {
      try { rec.stop(); } catch { /* noop */ }
      setIsListening(false);
      return;
    }
    rec.lang = SPEECH_LANG[lang] ?? "en-US";
    try {
      rec.start();
      setIsListening(true);
      logAction({ type: "mic_start", uiLang: lang, speechLang: rec.lang });
    } catch {
      setIsListening(false);
    }
  };

  const openGallery = (text: string) => {
    setGalleryText(text);
    logAction({ type: "gallery_open", name: text, inputName: currentInput, uiLang: lang });
  };

  const openArt = (text: string) => {
    setArtText(text);
    logAction({ type: "hangulart_button_click", name: text, inputName: currentInput, uiLang: lang });
  };

  const openModalForFont = (text: string, fontId: string) => {
    setModalInitialFont(fontId);
    setModalText(text);
  };

  const t = translations[lang];

  const convert = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setFeedback(null);
    setJamoIndex(0);

    // Animate Jamo sequence
    const jamoSequence = ["ㅇㅎ", "ㅅㅈㅊ", "ㅁㅂㅍ", "ㄱㄴㄷㅌㄹ", "ㅣㅡ", "ㅏㅓㅑㅕ", "ㅗㅜㅛㅠ"];
    let idx = 0;
    const jamoInterval = setInterval(() => {
      idx++;
      setJamoIndex(idx);
      if (idx >= jamoSequence.length) clearInterval(jamoInterval);
    }, 150);

    try {
      const res = await fetch("/api/transliterate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input.trim(), uiLang: lang }),
      });
      const data = await res.json();
      clearInterval(jamoInterval);
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      setCurrentInput(input.trim());

      const next = count + 1;
      setCount(next);
      safeStorageSet("convertCount", String(next));

      logAction({
        type: "conversion",
        inputName: input.trim(),
        uiLang: lang,
        sourceLang: data.sourceLang,
        results: data.variants?.map((v: Variant) => ({ country: v.country, options: v.options })),
      });
    } catch (e) {
      clearInterval(jamoInterval);
      setError(e instanceof Error ? e.message : t.errorGeneral);
    } finally {
      setLoading(false);
    }
  };

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
    logAction({ type: "copy", name: text, inputName: currentInput, uiLang: lang });
  };


  const speakText = useCallback((id: string, text: string, speakLang: string) => {
    if (!hasSpeech()) return; // speechSynthesis 미지원 환경(KakaoTalk WebView 등)
    window.speechSynthesis.cancel();
    if (playing === id) { setPlaying(null); return; }

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = speakLang;
    utt.rate = 0.85;
    utt.pitch = 1.1;

    const voice = getVoice(speakLang);
    if (voice) utt.voice = voice;

    utt.onstart = () => setPlaying(id);
    utt.onend = () => setPlaying(null);
    utt.onerror = () => setPlaying(null);
    window.speechSynthesis.speak(utt);
  }, [playing]);

  return (
    <>
    <KoreaBackground />

    {/* iOS KakaoTalk: 자동 redirect 불가 — 배너로 안내 */}
    {kakaoIOS && (
      <div className="fixed top-0 inset-x-0 z-50 bg-[#FEE500] text-slate-900 py-3 px-4 text-center shadow-lg">
        <p className="text-sm font-bold">카카오톡 브라우저에서는 일부 기능이 제한됩니다</p>
        <p className="text-xs mt-0.5">
          우측 하단 <strong>···</strong> 메뉴 → <strong>다른 브라우저로 열기</strong>를 탭하세요
        </p>
      </div>
    )}
    <main
      dir={t.dir}
      className="min-h-screen flex items-center justify-center p-6 relative z-10"
      onClick={() => { setShowLangMenu(false); setShowInfoMenu(false); }}
    >
      <div className="w-full max-w-lg">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 tracking-tight">
            {t.title}
          </h1>
          <p className="text-lg text-indigo-200/90 font-medium">
            {t.subtitle}
          </p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && convert()}
              placeholder={t.placeholder}
              dir="auto"
              className="flex-1 min-w-0 text-slate-800 placeholder:text-slate-400 focus:outline-none text-lg font-medium"
              autoFocus
            />
            {micSupported && (
              <button
                onClick={toggleMic}
                aria-label={isListening ? (lang === "ko" ? "녹음 중지" : "Stop recording") : (lang === "ko" ? "음성으로 입력" : "Speak to input")}
                className={`shrink-0 rounded-xl p-2.5 transition
                  ${isListening
                    ? "bg-red-500 text-white animate-pulse"
                    : "text-slate-400 hover:text-indigo-500 hover:bg-indigo-50"}`}
              >
                {isListening ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="6" width="12" height="12" rx="2" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                )}
              </button>
            )}
            <button
              onClick={convert}
              disabled={loading || !input.trim()}
              className="shrink-0 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-300 text-white px-5 py-2.5 rounded-xl font-semibold transition text-sm min-w-[80px]"
            >
              {loading ? (
                <span className="text-base font-bold animate-pulse">
                  {["ㅇㅎ", "ㅅㅈㅊ", "ㅁㅂㅍ", "ㄱㄴㄷㅌㄹ", "ㅣㅡ", "ㅏㅓㅑㅕ", "ㅗㅜㅛㅠ"][jamoIndex] || "ㅇㅎ"}
                </span>
              ) : t.convert}
            </button>
          </div>
        </div>

        {/* Quick Examples */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-6">
          {[
            { text: "한글", emoji: "📖" },
            { text: "김치", emoji: "🌶️" },
            { text: "사랑", emoji: "❤️" },
            { text: "정국", emoji: "💜" },
            { text: "지수", emoji: "🖤" },
            { text: "민지", emoji: "🐰" },
          ].map((item) => (
            <button
              key={item.text}
              onClick={() => {
                setArtText(item.text);
                logAction({ type: "example_category_click", text: item.text, uiLang: lang });
              }}
              className="px-3 py-1 text-xs bg-white/8 hover:bg-white/15 border border-white/10 hover:border-white/25 rounded-full text-white/70 hover:text-white transition"
            >
              {item.emoji} {item.text}
            </button>
          ))}
        </div>

        {/* Meta bar */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-xs text-white/60">
            {count > 0 ? (
              <span dangerouslySetInnerHTML={{
                __html: t.counter.replace("{n}", `<span class="text-indigo-300 font-semibold">${count.toLocaleString()}</span>`)
              }} />
            ) : (
              <span>{t.counterFirst}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); setShowInfoMenu(false); }}
                className="flex items-center gap-1.5 text-xs text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-lg px-3 py-1.5 transition"
              >
                <span>{LANG_LABELS[lang]}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showLangMenu && (
                <div
                  className="absolute bottom-full mb-1 right-0 bg-[#1e1e2e] border border-white/10 rounded-xl shadow-xl py-1 z-10 min-w-40 max-h-80 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLangMenu(false); }}
                      className={`w-full text-left px-3 py-2 text-xs transition
                        ${l === lang
                          ? "text-indigo-300 bg-indigo-500/10 font-semibold"
                          : "text-white/70 hover:bg-white/5"}`}
                    >
                      {LANG_LABELS[l]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowInfoMenu(!showInfoMenu); setShowLangMenu(false); }}
                aria-label={ABOUT_CONTENT[lang].menuLabel}
                title={ABOUT_CONTENT[lang].menuLabel}
                className="text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-lg p-1.5 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7"  x2="20" y2="7"  />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>

              {showInfoMenu && (
                <div
                  className="absolute bottom-full mb-1 right-0 bg-[#1e1e2e] border border-white/10 rounded-xl shadow-xl py-1 z-10 min-w-48"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setAboutOpen("hangulname");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "hangulname", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    {ABOUT_CONTENT[lang].hangulnameTitle}
                  </button>
                  <button
                    onClick={() => {
                      setAboutOpen("hunminjeong");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "hunminjeong", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    {ABOUT_CONTENT[lang].hunminjeongeum}
                  </button>
                  <a
                    href="/learn-hangul"
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "learn_hangul_click", uiLang: lang });
                    }}
                    className="block w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    {lang === "ko" ? "59초 한글 배우기" : "Learn Hangul in 59s"}
                  </a>
                  <button
                    onClick={() => {
                      setAboutOpen("faq");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "faq", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    {ABOUT_CONTENT[lang].faqTitle}
                  </button>
                  <button
                    onClick={() => {
                      setShareOpen("site");
                      setShowInfoMenu(false);
                      logAction({ type: "page_share_open", source: "menu", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                    {lang === "ko" ? "사이트 공유" : "Share this site"}
                  </button>
                  <button
                    onClick={() => {
                      setAboutOpen("wehome");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "wehome", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition"
                  >
                    {ABOUT_CONTENT[lang].wehomeTitle}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 mb-4">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="grid gap-2">
            {result.origin && (
              <p className="text-xs text-white/50 px-1">{result.origin}</p>
            )}

            {/* 원어 발음 카드 */}
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xl font-bold text-white truncate" dir="auto">
                  {currentInput}
                </div>
                {result.sourceLang && (
                  <div className="text-xs text-white/40 mt-0.5">{result.sourceLang}</div>
                )}
              </div>
              <button
                onClick={() => speakText("original", currentInput, result.sourceLang ?? "en-US")}
                title={t.listenOriginal}
                className={`flex-shrink-0 p-2 rounded-lg transition
                  ${playing === "original"
                    ? "text-indigo-300 bg-indigo-500/20"
                    : "text-white/40 hover:text-white/80 hover:bg-white/5"}`}
              >
                <SpeakerIcon active={playing === "original"} />
              </button>
            </div>

            {/* 한글 변환 카드들 */}
            {result.variants.map((v, i) => {
              const options = v.options ?? [];
              const hasPhonetic = v.phonetic && !options.includes(v.phonetic);
              return (
                <div
                  key={i}
                  className={`w-full rounded-2xl px-5 py-5
                    ${i === 0
                      ? "bg-white shadow-lg"
                      : "bg-white/95 shadow-md"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{v.flag}</span>
                    <span className="text-sm font-medium text-slate-600">{v.country}</span>
                    {v.ipa && (
                      <span className="text-xs text-slate-300 font-mono ml-auto">{v.ipa}</span>
                    )}
                  </div>

                  <div className="space-y-2 mb-3">
                    {options.map((opt, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="flex-1">
                          {options.length > 1 && (
                            <div className="text-[10px] text-slate-400 mb-0.5">
                              {j === 0 ? t.primarySpelling : `${t.altSpelling} ${j}`}
                            </div>
                          )}
                          <div className={`font-bold tracking-tight
                            ${j === 0 ? "text-2xl text-slate-800" : "text-xl text-slate-500"}`}>
                            {opt}
                          </div>
                        </div>
                        <button
                          onClick={() => speakText(`ko-${i}-${j}`, opt, "ko-KR")}
                          title={t.listen}
                          className={`p-2 rounded-lg transition flex-shrink-0
                            ${playing === `ko-${i}-${j}`
                              ? "text-indigo-500 bg-indigo-50"
                              : "text-slate-300 hover:text-indigo-500 hover:bg-indigo-50"}`}
                        >
                          <SpeakerIcon active={playing === `ko-${i}-${j}`} />
                        </button>
                        <button
                          onClick={() => copy(opt)}
                          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition
                            ${copied === opt
                              ? "bg-green-500 text-white"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}
                        >
                          {copied === opt ? t.copied : t.copy}
                        </button>
                      </div>
                    ))}
                  </div>

                  {hasPhonetic && (
                    <div className="bg-amber-50 rounded-xl p-3 mb-3 border border-amber-100">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="text-[10px] text-amber-500 mb-0.5">{t.actualPronun}</div>
                          <div className="text-xl font-bold text-amber-600 tracking-tight">
                            {v.phonetic}
                          </div>
                        </div>
                        <button
                          onClick={() => speakText(`ph-${i}`, v.phonetic, "ko-KR")}
                          title={t.listen}
                          className={`p-2 rounded-lg transition flex-shrink-0
                            ${playing === `ph-${i}`
                              ? "text-amber-600 bg-amber-100"
                              : "text-amber-300 hover:text-amber-500 hover:bg-amber-100"}`}
                        >
                          <SpeakerIcon active={playing === `ph-${i}`} />
                        </button>
                        <button
                          onClick={() => copy(v.phonetic)}
                          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition
                            ${copied === v.phonetic
                              ? "bg-green-500 text-white"
                              : "bg-white text-slate-500 hover:bg-slate-50"}`}
                        >
                          {copied === v.phonetic ? t.copied : t.copy}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => openGallery(options[0] ?? v.phonetic)}
                      className="flex items-center justify-center gap-1.5 text-xs bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-2.5 rounded-lg transition font-semibold"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <rect x="3" y="3" width="7" height="7" rx="1" />
                        <rect x="14" y="3" width="7" height="7" rx="1" />
                        <rect x="3" y="14" width="7" height="7" rx="1" />
                        <rect x="14" y="14" width="7" height="7" rx="1" />
                      </svg>
                      {lang === "ko" ? "폰트 갤러리" : "Font Gallery"}
                    </button>

                    <button
                      onClick={() => openArt(options[0] ?? v.phonetic)}
                      className="flex items-center justify-center gap-1.5 text-xs bg-pink-500 hover:bg-pink-600 text-white px-3 py-2.5 rounded-lg transition font-semibold"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="13.5" cy="6.5" r="1.5" />
                        <circle cx="17.5" cy="10.5" r="1.5" />
                        <circle cx="8.5" cy="7.5" r="1.5" />
                        <circle cx="6.5" cy="12.5" r="1.5" />
                        <path d="M12 2a10 10 0 0 0 0 20c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.5-.5-2.5 0-1 1-2 2-2H18a4 4 0 0 0 4-4 10 10 0 0 0-10-10z" />
                      </svg>
                      {lang === "ko" ? "한글아트" : "Hangul Art"}
                    </button>
                  </div>
                </div>
              );
            })}

            {/* 결과 공유 + 피드백 */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setShareOpen("result");
                  logAction({ type: "page_share_open", source: "result", inputName: currentInput, uiLang: lang });
                }}
                className="flex-1 flex items-center justify-center gap-2 text-sm bg-white/10 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 hover:border-white/20 px-4 py-2.5 rounded-xl transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                {lang === "ko" ? "공유하기" : "Share"}
              </button>
              <button
                onClick={() => {
                  const next = feedback === "up" ? null : "up";
                  setFeedback(next);
                  if (next === "up") logAction({ type: "feedback", value: "up", inputName: currentInput, uiLang: lang });
                }}
                className={`flex items-center gap-1 text-xs px-3 py-2.5 rounded-xl transition
                  ${feedback === "up"
                    ? "bg-green-500/20 text-green-300 border border-green-500/30"
                    : "bg-white/10 border border-white/10 text-white/50 hover:text-white/80"}`}
              >
                {feedback === "up" ? t.feedbackThanks : t.feedbackYes}
              </button>
            </div>
          </div>
        )}

        {/* Hangul Art Gallery preview */}
        <section className="mt-8 mb-2 bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-5">
          <HangulArtGallery
            isKo={lang === "ko"}
            uiLang={lang}
            itemsPerCategory={4}
            compact
            onLog={logAction}
          />
          <div className="mt-3 text-right">
            <a
              href="/gallery"
              onClick={() => logAction({ type: "gallery_full_link_click", uiLang: lang })}
              className="inline-flex items-center gap-1 text-xs text-indigo-300 hover:text-indigo-200 transition"
            >
              {lang === "ko" ? "전체 갤러리 보기" : "View full gallery"}
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-10 pb-4 text-center" dir="ltr">
          <a
            href="https://wehome.me"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:opacity-80"
            onClick={() => logAction({ type: "wehome_footer_logo_click", uiLang: lang })}
          >
            <Image
              src="/wehome-logo.png"
              alt="Wehome"
              width={1982}
              height={1021}
              className="h-6 w-auto brightness-0 invert opacity-50"
            />
          </a>
          <p className="text-white/40 text-[11px] mt-1.5">Your Home in Korea</p>
        </footer>
      </div>
    </main>

    {modalText !== null && (
      <FontModal
        text={modalText}
        originalName={currentInput}
        isKo={lang === "ko"}
        uiLang={lang}
        initialFontId={modalInitialFont}
        onClose={() => { setModalText(null); setModalInitialFont(undefined); }}
        onLog={logAction}
      />
    )}

    {galleryText !== null && (
      <FontGallery
        text={galleryText}
        originalName={currentInput}
        isKo={lang === "ko"}
        uiLang={lang}
        onClose={() => setGalleryText(null)}
        onPickFont={(fontId) => {
          openModalForFont(galleryText, fontId);
          setGalleryText(null);
        }}
        onLog={logAction}
      />
    )}

    {artText !== null && (
      <HangulArtModal
        text={artText}
        originalName={currentInput}
        isKo={lang === "ko"}
        uiLang={lang}
        onClose={() => setArtText(null)}
        onLog={logAction}
      />
    )}

    {shareOpen !== null && (() => {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://name.hangulmaru.com";
      const isResult = shareOpen === "result" && currentInput && result;
      const primaryHangul = isResult ? (result.variants[0]?.options[0] ?? result.variants[0]?.phonetic ?? "") : "";
      const shareUrl = isResult
        ? `${origin}/?name=${encodeURIComponent(currentInput)}`
        : `${origin}/`;
      const shareText = isResult
        ? (lang === "ko"
            ? `${currentInput} → ${primaryHangul} 🇰🇷 내 이름도 한글로 확인해보세요!`
            : `${currentInput} → ${primaryHangul} 🇰🇷 Find your name in Korean Hangul!`)
        : (lang === "ko"
            ? "한글이름 — 외국 이름을 한글 발음으로 변환! 19개 언어 지원, 폰트 이미지 다운로드까지 무료."
            : "hangulname — convert any foreign name to Korean Hangul pronunciation. 19 languages, free font image downloads.");
      const title = isResult
        ? (lang === "ko" ? "결과 공유하기" : "Share this result")
        : (lang === "ko" ? "사이트 공유하기" : "Share this site");
      return (
        <ShareLinkModal
          url={shareUrl}
          shareText={shareText}
          hashtags="#Hangul #한글이름 #HangulName"
          title={title}
          isKo={lang === "ko"}
          uiLang={lang}
          onClose={() => setShareOpen(null)}
          onLog={logAction}
        />
      );
    })()}

    {aboutOpen !== null && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setAboutOpen(null)}
        role="dialog"
        aria-modal="true"
      >
        <div
          className={`bg-white rounded-2xl shadow-xl w-full max-h-[85vh] overflow-y-auto
            ${aboutOpen === "faq" ? "max-w-2xl" : "max-w-md"}`}
          onClick={(e) => e.stopPropagation()}
          dir={t.dir}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">
              {aboutOpen === "hangulname" && ABOUT_CONTENT[lang].hangulnameTitle}
              {aboutOpen === "hunminjeong" && ABOUT_CONTENT[lang].hunminjeongTitle}
              {aboutOpen === "wehome" && ABOUT_CONTENT[lang].wehomeTitle}
              {aboutOpen === "faq" && ABOUT_CONTENT[lang].faqTitle}
            </h2>
            <button
              onClick={() => setAboutOpen(null)}
              aria-label={ABOUT_CONTENT[lang].close}
              className="text-slate-400 hover:text-slate-700 transition p-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          {aboutOpen === "faq" ? (
            <div className="px-6 py-4 space-y-2">
              {ABOUT_CONTENT[lang].faqEntries.map((entry, i) => (
                <details
                  key={i}
                  className="group border border-slate-100 rounded-xl bg-slate-50/50 open:bg-white open:border-blue-100 transition"
                >
                  <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                    <span className="flex-1">{entry.q}</span>
                    <svg className="w-4 h-4 text-slate-400 transition group-open:rotate-180 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </summary>
                  <p className="px-4 pb-4 text-sm leading-relaxed text-slate-600">
                    {entry.a}
                  </p>
                </details>
              ))}
            </div>
          ) : (
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
              {aboutOpen === "hangulname" && ABOUT_CONTENT[lang].hangulnameBody}
              {aboutOpen === "hunminjeong" && ABOUT_CONTENT[lang].hunminjeongBody}
              {aboutOpen === "wehome" && ABOUT_CONTENT[lang].wehomeBody}
            </p>
            {aboutOpen === "wehome" && (
              <a
                href="https://wehome.me"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => logAction({ type: "wehome_modal_cta_click", uiLang: lang })}
                className="block w-full text-center bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-medium transition text-sm"
              >
                {ABOUT_CONTENT[lang].wehomeCta}
              </a>
            )}
          </div>
          )}
        </div>
      </div>
    )}

    <FeedbackButton lang={lang} />
    </>
  );
}
