"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { translations, LANG_LABELS, detectLang, type Lang } from "@/lib/i18n";
import { ABOUT_CONTENT } from "@/lib/about";
import FontModal from "@/components/FontModal";
import FontGallery from "@/components/FontGallery";
import HangulArtModal from "@/components/HangulArtModal";
import NameCardModal from "@/components/NameCardModal";
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

const JAMO_STEPS = [
  // 홀소리(모음) 라인 먼저
  { jamo: "ㅣㅡ", label: "모음" },
  { jamo: "ㅏㅓㅑㅕ", label: "양성" },
  { jamo: "ㅗㅜㅛㅠ", label: "음성" },
  // 닿소리(자음) 라인
  { jamo: "ㅇㅎ", label: "후음" },
  { jamo: "ㅅㅈㅊ", label: "치음" },
  { jamo: "ㅁㅂㅍ", label: "순음" },
  { jamo: "ㄱㄴㄷㅌㄹ", label: "설음" },
];

// 진행 표시 도형: ㅇ(원)·ㅅ(세모)·ㅁ(네모) 한 쌍을 3쌍 — 파스텔 blue·green·red
const PROGRESS_LEN = 9; // 3 triples
const SHAPE_COLORS = ["#93c5fd", "#86efac", "#fca5a5"]; // blue / green / red (pastel)
function ProgressShape({ idx, active, prev }: { idx: number; active: boolean; prev: boolean }) {
  const kind = idx % 3;
  const color = SHAPE_COLORS[kind];
  const motion = `${active ? "scale-125 opacity-100 drop-shadow-md" : prev ? "scale-105 opacity-70" : "scale-90 opacity-40"} transition-all duration-300`;
  if (kind === 0) return <span className={`block w-4 h-4 rounded-full ${motion}`} style={{ background: color }} />;
  if (kind === 2) return <span className={`block w-4 h-4 rounded-[3px] ${motion}`} style={{ background: color }} />;
  return (
    <svg className={`w-4 h-4 ${motion}`} viewBox="0 0 24 24" aria-hidden>
      <polygon points="12,3 22,21 2,21" fill={color} />
    </svg>
  );
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

// Voice-first prompts (English fallback for languages not listed)
const SAY_NAME: Record<string, string> = {
  ko: "이름을 말해보세요", en: "Say your name", zh: "说出你的名字",
  ja: "名前を話してください", es: "Di tu nombre", fr: "Dites votre nom",
  de: "Sag deinen Namen", ar: "قل اسمك", ru: "Назовите ваше имя",
  pt: "Diga seu nome", vi: "Nói tên của bạn", id: "Sebutkan nama Anda",
  th: "พูดชื่อของคุณ", ms: "Sebut nama anda", hi: "अपना नाम बोलें",
};
const LISTENING: Record<string, string> = {
  ko: "듣는 중…", en: "Listening…", zh: "聆听中…", ja: "聞き取り中…",
  es: "Escuchando…", fr: "Écoute…", de: "Hört zu…", ar: "يستمع…",
  ru: "Слушаю…", pt: "Ouvindo…", vi: "Đang nghe…", id: "Mendengarkan…",
  th: "กำลังฟัง…", ms: "Mendengar…", hi: "सुन रहे हैं…",
};
const trv = (m: Record<string, string>, l: string) => m[l] ?? m.en;

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
  const [cardData, setCardData] = useState<{ korean: string; original: string; pronun?: string; tagline?: string } | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [micSupported, setMicSupported] = useState(false);
  // input area collapses after a conversion; user can expand it again
  const [showInput, setShowInput] = useState(true);
  const recognitionRef = useRef<MinimalSpeechRecognition | null>(null);
  // Always points at the latest convert() so the (mount-time) mic handler isn't stale
  const convertRef = useRef<(name?: string) => void>(() => {});
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
        const intentUrl =
          `intent://${window.location.host}${window.location.pathname}${window.location.search}` +
          `#Intent;scheme=https;action=android.intent.action.VIEW;` +
          `category=android.intent.category.BROWSABLE;end`;
        window.location.replace(intentUrl);
        return;
      } else {
        setKakaoIOS(true);
      }
    }

    const detectedLang = detectLang();
    setLang(detectedLang);
    const stored = parseInt(safeStorageGet("convertCount", "0"), 10);
    setCount(stored);

    if (hasSpeech()) window.speechSynthesis.getVoices();

    if (!safeSessionGet("hg_visited")) {
      safeSessionSet("hg_visited", "1");
      fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "visit", uiLang: detectedLang }),
      }).catch(() => {});
    }

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
      setIsListening(false);
      // Voice-first: speaking a name converts it immediately
      if (cleaned) convertRef.current(cleaned);
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

  const goHome = () => {
    setInput("");
    setResult(null);
    setError("");
    setFeedback(null);
    setCurrentInput("");
    setShowInput(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    logAction({ type: "go_home", uiLang: lang });
  };

  const t = translations[lang];

  const convert = async (override?: string) => {
    const name = (override ?? input).trim();
    if (!name) return;
    if (override !== undefined) setInput(name);
    setLoading(true);
    setError("");
    setResult(null);
    setFeedback(null);
    setJamoIndex(0);

    let idx = 0;
    const jamoInterval = setInterval(() => {
      idx = (idx + 1) % PROGRESS_LEN;
      setJamoIndex(idx);
    }, 220);

    try {
      const res = await fetch("/api/transliterate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, uiLang: lang }),
      });
      const data = await res.json();
      clearInterval(jamoInterval);
      if (!res.ok) throw new Error(data.error);
      setResult(data);
      setCurrentInput(name);
      setShowInput(false); // collapse the input area after a successful conversion

      const next = count + 1;
      setCount(next);
      safeStorageSet("convertCount", String(next));

      logAction({
        type: "conversion",
        inputName: name,
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
  convertRef.current = convert;

  const copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 1500);
    logAction({ type: "copy", name: text, inputName: currentInput, uiLang: lang });
  };


  const speakText = useCallback((id: string, text: string, speakLang: string) => {
    if (!hasSpeech()) return;
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
      className="min-h-screen px-5 pt-12 sm:pt-20 pb-12 relative z-10"
      onClick={() => { setShowLangMenu(false); setShowInfoMenu(false); }}
    >
      <div className="w-full max-w-lg mx-auto">
        {/* Hangulmaru mark */}
        <div className="flex flex-col items-center mb-8">
          <a
            href="https://hangulmaru.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:opacity-80"
            title={lang === "ko" ? "한글마루 메인페이지" : "Hangulmaru home"}
            onClick={() => logAction({ type: "hangulmaru_mark_click", uiLang: lang })}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hangulmaru-osm.svg"
              alt={lang === "ko" ? "한글마루 ㅇㅅㅁ" : "Hangulmaru"}
              className="h-7 w-auto"
            />
          </a>
        </div>

        {/* Hero — brand title doubles as a return-to-main link */}
        <div className="mb-10 text-center">
          <button
            onClick={goHome}
            title={lang === "ko" ? "메인으로" : "Home"}
            className="inline-block transition hover:opacity-80"
          >
            <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight">
              My Hangul Name
            </h1>
            <p className="text-xl sm:text-2xl text-violet-500 font-semibold mt-1">내 한글 이름</p>
          </button>
        </div>

        {/* Voice-first: prominent mic CTA (when supported) */}
        {showInput && micSupported && (
          <div className="flex flex-col items-center gap-2.5 mb-4">
            <button
              onClick={toggleMic}
              aria-label={isListening ? (lang === "ko" ? "녹음 중지" : "Stop recording") : trv(SAY_NAME, lang)}
              className={`flex items-center justify-center w-20 h-20 rounded-full transition shadow-lg
                ${isListening
                  ? "bg-red-500 text-white animate-pulse shadow-red-300/50"
                  : "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-300/40 hover:scale-105"}`}
            >
              {isListening ? (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              ) : (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>
            <p className="text-sm font-medium text-violet-600">
              {isListening ? trv(LISTENING, lang) : trv(SAY_NAME, lang)}
            </p>
          </div>
        )}

        {/* Menu bar */}
        <div className="flex items-center justify-end mb-2">
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); setShowInfoMenu(false); }}
                className="flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-600 border border-violet-200 hover:border-violet-400 rounded-lg px-3 py-1.5 transition"
              >
                <span>{LANG_LABELS[lang]}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showLangMenu && (
                <div
                  className="absolute top-full mt-1 right-0 bg-white/95 backdrop-blur-xl border border-violet-200 rounded-xl shadow-xl shadow-violet-200/30 py-1 z-10 min-w-40 max-h-80 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLangMenu(false); }}
                      className={`w-full text-left px-3 py-2 text-xs transition
                        ${l === lang
                          ? "text-violet-600 bg-violet-50 font-semibold"
                          : "text-slate-500 hover:bg-violet-50 hover:text-violet-700"}`}
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
                className="text-violet-400 hover:text-violet-600 border border-violet-200 hover:border-violet-400 rounded-lg p-1.5 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7"  x2="20" y2="7"  />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>

              {showInfoMenu && (
                <div
                  className="absolute top-full mt-1 right-0 bg-white/95 backdrop-blur-xl border border-violet-200 rounded-xl shadow-xl shadow-violet-200/30 py-1 z-10 min-w-48"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={`/hangul-name?lang=${lang}`}
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "hangulname", uiLang: lang });
                    }}
                    className="block w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    Hangul Name
                  </a>
                  <button
                    onClick={() => {
                      setAboutOpen("hunminjeong");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "hunminjeong", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    {ABOUT_CONTENT[lang].hunminjeongeum}
                  </button>
                  <a
                    href="/gallery"
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "gallery_menu_click", uiLang: lang });
                    }}
                    className="flex items-center gap-2 w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    <svg className="w-3.5 h-3.5 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="13.5" cy="6.5" r="1.5" />
                      <circle cx="17.5" cy="10.5" r="1.5" />
                      <circle cx="8.5" cy="7.5" r="1.5" />
                      <circle cx="6.5" cy="12.5" r="1.5" />
                      <path d="M12 2a10 10 0 0 0 0 20c1.5 0 2.5-1 2.5-2.5 0-1-.5-1.5-.5-2.5 0-1 1-2 2-2H18a4 4 0 0 0 4-4 10 10 0 0 0-10-10z" />
                    </svg>
                    {lang === "ko" ? "한글아트 갤러리" : "Hangul Art Gallery"}
                  </a>
                  <a
                    href="/learn-hangul"
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "learn_hangul_click", uiLang: lang });
                    }}
                    className="block w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    {lang === "ko" ? "59초 한글 배우기" : "Learn Hangul in 59s"}
                  </a>
                  <a
                    href="/korean-words"
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "korean_words_click", uiLang: lang });
                    }}
                    className="block w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    {lang === "ko" ? "알아두면 좋은 한글 단어" : "Korean Words to Know"}
                  </a>
                  <a
                    href="/korean-sounds"
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "korean_sounds_click", uiLang: lang });
                    }}
                    className="block w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    {lang === "ko" ? "한글 소리결말 모양결말" : "Onomatopoeia · Ideophone"}
                  </a>
                  <a
                    href="/api-docs"
                    onClick={() => {
                      setShowInfoMenu(false);
                      logAction({ type: "api_docs_click", uiLang: lang });
                    }}
                    className="block w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    API
                  </a>
                  <button
                    onClick={() => {
                      setAboutOpen("faq");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "faq", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    {ABOUT_CONTENT[lang].faqTitle}
                  </button>
                  <button
                    onClick={() => {
                      setShareOpen("site");
                      setShowInfoMenu(false);
                      logAction({ type: "page_share_open", source: "menu", uiLang: lang });
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 text-violet-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                    className="w-full text-left px-3 py-2 text-xs text-slate-500 hover:text-violet-700 hover:bg-violet-50 transition"
                  >
                    {ABOUT_CONTENT[lang].wehomeTitle}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Input — type your name (collapses after a conversion) */}
        {!showInput ? (
          <button
            onClick={() => setShowInput(true)}
            className="w-full flex items-center justify-center gap-2 bg-white/70 hover:bg-white border border-violet-200 rounded-xl px-4 py-2.5 mb-4 text-sm text-violet-500 hover:text-violet-700 transition"
          >
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 20h9" />
              <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
            <span className="truncate">
              {currentInput
                ? `${currentInput} — ${lang === "ko" ? "다른 이름 입력" : "try another name"}`
                : (lang === "ko" ? "이름 입력하기" : "Enter a name")}
            </span>
          </button>
        ) : (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-violet-200 p-4 mb-3 shadow-sm transition-shadow focus-within:border-violet-400 focus-within:shadow-[0_0_0_3px_rgba(139,92,246,0.1)]">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && convert()}
              placeholder={t.placeholder}
              dir="auto"
              className="flex-1 min-w-0 text-violet-900 placeholder:text-violet-300 focus:outline-none text-base bg-transparent"
              autoFocus={!micSupported}
            />
            <button
              onClick={() => convert()}
              disabled={loading || !input.trim()}
              className="shrink-0 bg-violet-600 hover:bg-violet-500 disabled:bg-violet-100 disabled:text-violet-300 text-white px-5 py-2.5 rounded-lg font-medium transition text-sm min-w-[80px]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-1">
                  {JAMO_STEPS.map((_, idx) => (
                    <span
                      key={idx}
                      className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                        idx <= jamoIndex
                          ? "bg-white scale-125"
                          : "bg-white/30"
                      }`}
                    />
                  ))}
                </span>
              ) : t.convert}
            </button>
          </div>
        </div>
        )}

        {/* Loading progress indicator — 3 sets of ㅇ·ㅅ·ㅁ (원세네 세쌍) + 자모 라인 */}
        {loading && (
          <div className="flex flex-col items-center gap-3 py-6 mb-2">
            <div className="flex items-center justify-center gap-4">
              {[0, 1, 2].map((g) => (
                <div key={g} className="flex items-end gap-1.5">
                  {[0, 1, 2].map((s) => {
                    const i = g * 3 + s;
                    return (
                      <ProgressShape
                        key={i}
                        idx={i}
                        active={i === jamoIndex}
                        prev={i === (jamoIndex - 1 + PROGRESS_LEN) % PROGRESS_LEN}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
            {/* 닿소리 라인 → 줄바꿈 → ㆍ로 시작하는 홀소리 라인 (EBS 훈민정음) */}
            <div
              className="text-center text-sm text-violet-400 leading-relaxed tracking-wide"
              style={{ fontFamily: "EBSHunminjeongeum, serif" }}
            >
              <div>ㅇㅎ ㅅㅈㅊ ㅁㅂㅍ ㄴㄷㅌㄹ ㄱㅋ</div>
              <div>ㆍ ㅣ ㅡ ㅏ ㅓ ㅗ ㅜ ㅑ ㅕ ㅛ ㅠ</div>
            </div>
          </div>
        )}

        {/* Quick Examples */}
        {showInput && (
        <div className="flex flex-wrap justify-center gap-1.5 mb-8">
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
                setGalleryText(item.text);
                logAction({ type: "example_category_click", text: item.text, dest: "fontgallery", uiLang: lang });
              }}
              className="px-3 py-1 text-xs border border-violet-200 hover:border-violet-400 rounded-full text-violet-400 hover:text-violet-600 hover:bg-violet-50 transition"
            >
              {item.emoji} {item.text}
            </button>
          ))}
        </div>
        )}

        {/* Discover — small text link */}
        {showInput && (
          <div className="text-center mb-8">
            <a
              href="/korean-words"
              onClick={() => logAction({ type: "korean_words_click", source: "home_link", uiLang: lang })}
              className="text-xs text-violet-400 hover:text-violet-600 underline underline-offset-2 transition"
            >
              {lang === "ko" ? "알아두면 좋은 한글 단어 · K-POP · 아름다운 한글 →" : "Korean words to know · K-pop · beautiful Hangul →"}
            </a>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="grid gap-3">
            {/* 원어 발음 카드 */}
            <div className="bg-violet-50/60 border border-violet-200 rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="flex-1 min-w-0">
                <div className="text-xl font-bold text-violet-900 truncate" dir="auto">
                  {currentInput}
                </div>
                {result.sourceLang && (
                  <div className="text-xs text-violet-400 mt-0.5">{result.sourceLang}</div>
                )}
              </div>
              <button
                onClick={() => speakText("original", currentInput, result.sourceLang ?? "en-US")}
                title={t.listenOriginal}
                className={`flex-shrink-0 p-2 rounded-lg transition
                  ${playing === "original"
                    ? "text-violet-600 bg-violet-100"
                    : "text-violet-300 hover:text-violet-500 hover:bg-violet-100"}`}
              >
                <SpeakerIcon active={playing === "original"} />
              </button>
            </div>

            {/* 입력한 이름에 대한 설명은 카드 아래에 */}
            {result.origin && (
              <p className="text-xs text-violet-400 px-1 -mt-1">{result.origin}</p>
            )}

            {/* 한글 변환 카드들 */}
            {result.variants.map((v, i) => {
              const options = v.options ?? [];
              const hasPhonetic = v.phonetic && !options.includes(v.phonetic);
              return (
                <div
                  key={i}
                  className={`w-full rounded-xl px-5 py-5
                    ${i === 0
                      ? "bg-white shadow-lg shadow-violet-200/40 border border-violet-100"
                      : "bg-white/95 shadow-md shadow-violet-100/30 border border-violet-50"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg">{v.flag}</span>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{v.country}</span>
                    {v.ipa && (
                      <span className="text-xs text-slate-400 font-mono ml-auto">{v.ipa}</span>
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
                            ${j === 0 ? "text-3xl text-violet-900" : "text-xl text-slate-400"}`}>
                            {opt}
                          </div>
                        </div>
                        <button
                          onClick={() => speakText(`ko-${i}-${j}`, opt, "ko-KR")}
                          title={t.listen}
                          className={`p-2 rounded-lg transition flex-shrink-0
                            ${playing === `ko-${i}-${j}`
                              ? "text-violet-600 bg-violet-50"
                              : "text-violet-300 hover:text-violet-500 hover:bg-violet-50"}`}
                        >
                          <SpeakerIcon active={playing === `ko-${i}-${j}`} />
                        </button>
                        <button
                          onClick={() => copy(opt)}
                          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition
                            ${copied === opt
                              ? "bg-violet-600 text-white"
                              : "bg-violet-50 text-violet-500 hover:bg-violet-100"}`}
                        >
                          {copied === opt ? t.copied : t.copy}
                        </button>
                      </div>
                    ))}
                  </div>

                  {hasPhonetic && (
                    <div className="bg-amber-50 rounded-xl p-3 mb-3 border border-amber-200/60">
                      <div className="flex items-center gap-2">
                        <div className="flex-1">
                          <div className="text-[10px] text-amber-600 mb-0.5">{t.actualPronun}</div>
                          <div className="text-xl font-bold text-amber-700 tracking-tight">
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
                              ? "bg-violet-600 text-white"
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
                      className="flex items-center justify-center gap-1.5 text-xs bg-violet-600 hover:bg-violet-500 text-white px-3 py-2.5 rounded-lg transition font-medium"
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
                      className="flex items-center justify-center gap-1.5 text-xs bg-violet-50 text-violet-600 hover:bg-violet-600 hover:text-white px-3 py-2.5 rounded-lg transition font-medium border border-violet-200 hover:border-violet-600"
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

            {/* ✨ 한글 네임카드 — 공유용 포토카드 */}
            <button
              onClick={() => {
                const v = result.variants[0];
                setCardData({
                  korean: v?.options?.[0] ?? v?.phonetic ?? currentInput,
                  original: currentInput,
                  pronun: v?.ipa || undefined,
                  tagline: result.origin ? result.origin.slice(0, 70) : undefined,
                });
                logAction({ type: "namecard_open", name: currentInput, uiLang: lang });
              }}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-500 hover:from-violet-500 hover:to-fuchsia-400 text-white text-sm font-semibold px-4 py-3 rounded-xl shadow-md shadow-violet-300/40 transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M7 15l2.5-3 2 2.5L14 11l3 4" />
                <circle cx="8.5" cy="9.5" r="1" />
              </svg>
              {lang === "ko" ? "✨ 한글 네임카드 만들기" : "✨ Make a Name Card"}
            </button>

          </div>
        )}

        {/* 공유 + 좋아요 — 작은 링크 메뉴 (입력 전에도 항상 노출) */}
        <div className="flex items-center justify-center gap-4 mt-4 text-xs">
          <button
            onClick={() => {
              const kind: ShareKind = currentInput && result ? "result" : "site";
              setShareOpen(kind);
              logAction({ type: "page_share_open", source: kind, inputName: currentInput, uiLang: lang });
            }}
            className="flex items-center gap-1 text-violet-400 hover:text-violet-600 transition"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            {lang === "ko" ? "공유" : "Share"}
          </button>
          <span className="text-violet-200" aria-hidden>·</span>
          <button
            onClick={() => {
              const next = feedback === "up" ? null : "up";
              setFeedback(next);
              if (next === "up") logAction({ type: "feedback", value: "up", inputName: currentInput, uiLang: lang });
            }}
            className={`flex items-center gap-1 transition ${
              feedback === "up" ? "text-green-600" : "text-violet-400 hover:text-violet-600"
            }`}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill={feedback === "up" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
            </svg>
            {feedback === "up" ? t.feedbackThanks : t.feedbackYes}
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-12 pb-6 text-center" dir="ltr">
          <a
            href="https://wehome.me"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => logAction({ type: "wehome_footer_click", uiLang: lang })}
            className="inline-block transition hover:opacity-80"
          >
            <Image
              src="/wehome-logo.png"
              alt="Welcome Home Wehome"
              width={1982}
              height={1021}
              className="h-9 w-auto mx-auto opacity-90"
            />
            <p className="text-violet-500 text-sm font-medium mt-2.5">Your Home in Korea</p>
            <p className="text-violet-400 text-xs mt-0.5">Live Locally, Stay Safely.</p>
            <p className="text-slate-400 text-[10px] leading-relaxed max-w-xs mx-auto mt-2.5">
              Powered by Wehome.me, Korea&apos;s only government-authorized home sharing platform.
            </p>
          </a>
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
        onOpenArt={(t) => { setModalText(null); setModalInitialFont(undefined); setArtText(t); }}
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
        onOpenArt={(t) => { setGalleryText(null); setArtText(t); }}
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
        onOpenFontGallery={(t) => { setArtText(null); setGalleryText(t); }}
      />
    )}

    {cardData !== null && (
      <NameCardModal
        korean={cardData.korean}
        original={cardData.original}
        pronun={cardData.pronun}
        tagline={cardData.tagline}
        isKo={lang === "ko"}
        uiLang={lang}
        onClose={() => setCardData(null)}
        onLog={logAction}
      />
    )}

    {shareOpen !== null && (() => {
      const origin = typeof window !== "undefined" ? window.location.origin : "https://www.myhangulname.com";
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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
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
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-violet-100">
            <h2 className="text-lg font-bold text-violet-900">
              {aboutOpen === "hangulname" && ABOUT_CONTENT[lang].hangulnameTitle}
              {aboutOpen === "hunminjeong" && ABOUT_CONTENT[lang].hunminjeongTitle}
              {aboutOpen === "wehome" && ABOUT_CONTENT[lang].wehomeTitle}
              {aboutOpen === "faq" && ABOUT_CONTENT[lang].faqTitle}
            </h2>
            <button
              onClick={() => setAboutOpen(null)}
              aria-label={ABOUT_CONTENT[lang].close}
              className="text-violet-300 hover:text-violet-600 transition p-1"
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
                  className="group border border-violet-100 rounded-xl bg-violet-50/30 open:bg-white open:border-violet-200 transition"
                >
                  <summary className="cursor-pointer list-none px-4 py-3 flex items-center justify-between gap-3 text-sm font-medium text-slate-700">
                    <span className="flex-1">{entry.q}</span>
                    <svg className="w-4 h-4 text-violet-300 transition group-open:rotate-180 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                className="block w-full text-center bg-violet-600 hover:bg-violet-500 active:bg-violet-700 text-white px-4 py-2.5 rounded-xl font-medium transition text-sm"
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
