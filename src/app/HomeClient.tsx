"use client";

import { useState, useEffect, useCallback } from "react";
import { translations, LANG_LABELS, detectLang, type Lang } from "@/lib/i18n";
import { ABOUT_CONTENT } from "@/lib/about";
import FontModal from "@/components/FontModal";
import KoreaBackground from "@/components/KoreaBackground";
import FeedbackButton from "@/components/FeedbackButton";

type AboutKey = "hangulname" | "wehome";

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
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState<"up" | null>(null);
  const [modalText, setModalText] = useState<string | null>(null);
  const [kakaoIOS, setKakaoIOS] = useState(false);

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

  const t = translations[lang];

  const convert = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setFeedback(null);

    try {
      const res = await fetch("/api/transliterate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: input.trim(), uiLang: lang }),
      });
      const data = await res.json();
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

  const openModal = (text: string) => {
    setModalText(text);
    logAction({ type: "font_modal_open", name: text, inputName: currentInput, uiLang: lang });
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

  const FontIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="4 7 4 4 20 4 20 7" />
      <line x1="9" y1="20" x2="15" y2="20" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  );

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
        {/* 상단 바 */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-xs text-slate-400 bg-white border border-slate-100 rounded-xl px-3 py-1.5">
            {count > 0 ? (
              <span dangerouslySetInnerHTML={{
                __html: t.counter.replace("{n}", `<span class="font-semibold text-blue-500">${count.toLocaleString()}</span>`)
              }} />
            ) : (
              <span>{t.counterFirst}</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); setShowInfoMenu(false); }}
                className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-xl px-3 py-1.5 transition"
              >
                <span>{LANG_LABELS[lang]}</span>
                <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {showLangMenu && (
                <div
                  className="absolute top-full mt-1 right-0 bg-white border border-slate-100 rounded-2xl shadow-lg py-1 z-10 min-w-40 max-h-80 overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {(Object.keys(LANG_LABELS) as Lang[]).map((l) => (
                    <button
                      key={l}
                      onClick={() => { setLang(l); setShowLangMenu(false); }}
                      className={`w-full text-left px-4 py-2 text-sm transition
                        ${l === lang ? "text-blue-600 bg-blue-50 font-medium" : "text-slate-600 hover:bg-slate-50"}`}
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
                className="flex items-center text-slate-500 hover:text-slate-700 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 transition"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="4" y1="7"  x2="20" y2="7"  />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="17" x2="20" y2="17" />
                </svg>
              </button>

              {showInfoMenu && (
                <div
                  className="absolute top-full mt-1 right-0 bg-white border border-slate-100 rounded-2xl shadow-lg py-1 z-10 min-w-52"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => {
                      setAboutOpen("hangulname");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "hangulname", uiLang: lang });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition"
                  >
                    {ABOUT_CONTENT[lang].hangulnameTitle}
                  </button>
                  <button
                    onClick={() => {
                      setAboutOpen("wehome");
                      setShowInfoMenu(false);
                      logAction({ type: "about_open", target: "wehome", uiLang: lang });
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition"
                  >
                    {ABOUT_CONTENT[lang].wehomeTitle}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{t.title}</h1>
          <p className="text-sm text-white/80 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">{t.subtitle}</p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && convert()}
              placeholder={t.placeholder}
              dir="auto"
              className="flex-1 min-w-0 text-slate-700 placeholder:text-slate-300 focus:outline-none text-base"
              autoFocus
            />
            <button
              onClick={convert}
              disabled={loading || !input.trim()}
              className="shrink-0 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 text-white px-4 py-2.5 rounded-xl font-medium transition text-sm"
            >
              {loading ? (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : t.convert}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-100 rounded-xl px-4 py-3 mb-4">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="grid gap-2">
            {result.origin && (
              <p className="text-xs text-white/70 px-1 drop-shadow-sm">{result.origin}</p>
            )}

            {/* 원어 발음 카드 */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl px-5 py-4 flex items-center gap-4">
              <div className="flex-shrink-0 text-center w-14">
                <div className="text-lg mb-0.5">🗣️</div>
                <div className="text-xs text-amber-500">{t.listenOriginal}</div>
              </div>
              <div className="w-px h-10 bg-amber-100 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="text-xl font-semibold text-amber-800 truncate" dir="auto">
                  {currentInput}
                </div>
                {result.sourceLang && (
                  <div className="text-xs text-amber-400 mt-0.5">{result.sourceLang}</div>
                )}
              </div>
              <button
                onClick={() => speakText("original", currentInput, result.sourceLang ?? "en-US")}
                title={t.listenOriginal}
                className={`flex-shrink-0 p-2 rounded-xl transition
                  ${playing === "original"
                    ? "text-amber-600 bg-amber-100"
                    : "text-amber-300 hover:text-amber-500 hover:bg-amber-100"}`}
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
                  className={`w-full bg-white rounded-2xl border px-5 py-4
                    ${i === 0 ? "border-blue-200 shadow-sm" : "border-slate-100"}`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{v.flag}</span>
                    <span className="text-sm font-medium text-slate-500">{v.country}</span>
                    {v.ipa && (
                      <span className="text-xs text-slate-300 font-mono ml-auto">{v.ipa}</span>
                    )}
                  </div>

                  <div className="grid gap-2 mb-1">
                    {options.map((opt, j) => (
                      <div key={j} className="flex items-center gap-3">
                        <div className="flex-1">
                          {options.length > 1 && (
                            <div className="text-xs text-slate-300 mb-0.5">
                              {j === 0 ? t.primarySpelling : `${t.altSpelling} ${j}`}
                            </div>
                          )}
                          <div className={`font-bold tracking-wide
                            ${j === 0
                              ? `text-2xl ${i === 0 ? "text-blue-600" : "text-slate-700"}`
                              : "text-xl text-slate-500"}`}>
                            {opt}
                          </div>
                        </div>
                        <button
                          onClick={() => speakText(`ko-${i}-${j}`, opt, "ko-KR")}
                          title={t.listen}
                          className={`p-2 rounded-xl transition flex-shrink-0
                            ${playing === `ko-${i}-${j}`
                              ? "text-blue-500 bg-blue-50"
                              : "text-slate-300 hover:text-blue-400 hover:bg-blue-50"}`}
                        >
                          <SpeakerIcon active={playing === `ko-${i}-${j}`} />
                        </button>
                        <button
                          onClick={() => copy(opt)}
                          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition
                            ${copied === opt
                              ? "bg-green-100 text-green-600"
                              : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
                        >
                          {copied === opt ? t.copied : t.copy}
                        </button>
                        <button
                          onClick={() => openModal(opt)}
                          title="폰트로 보기"
                          className="flex-shrink-0 p-2 rounded-xl text-slate-300 hover:text-purple-400 hover:bg-purple-50 transition"
                        >
                          <FontIcon />
                        </button>
                      </div>
                    ))}
                  </div>

                  {hasPhonetic && (
                    <div className="flex items-center gap-3 pt-2 border-t border-slate-50">
                      <div className="flex-1">
                        <div className="text-xs text-amber-400 mb-0.5">{t.actualPronun}</div>
                        <div className="text-xl font-semibold text-amber-600 tracking-wide">
                          {v.phonetic}
                        </div>
                      </div>
                      <button
                        onClick={() => speakText(`ph-${i}`, v.phonetic, "ko-KR")}
                        title={t.listen}
                        className={`p-2 rounded-xl transition flex-shrink-0
                          ${playing === `ph-${i}`
                            ? "text-amber-500 bg-amber-50"
                            : "text-amber-200 hover:text-amber-400 hover:bg-amber-50"}`}
                      >
                        <SpeakerIcon active={playing === `ph-${i}`} />
                      </button>
                      <button
                        onClick={() => copy(v.phonetic)}
                        className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg transition
                          ${copied === v.phonetic
                            ? "bg-green-100 text-green-600"
                            : "bg-slate-100 text-slate-400 hover:bg-slate-200"}`}
                      >
                        {copied === v.phonetic ? t.copied : t.copy}
                      </button>
                      <button
                        onClick={() => openModal(v.phonetic)}
                        title="폰트로 보기"
                        className="flex-shrink-0 p-2 rounded-xl text-amber-200 hover:text-purple-400 hover:bg-purple-50 transition"
                      >
                        <FontIcon />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 피드백 — 좋아요만 */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="text-xs text-white/60">{t.feedbackQ}</span>
              <button
                onClick={() => {
                  const next = feedback === "up" ? null : "up";
                  setFeedback(next);
                  if (next === "up") logAction({ type: "feedback", value: "up", inputName: currentInput, uiLang: lang });
                }}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl transition
                  ${feedback === "up"
                    ? "bg-green-100 text-green-600 font-medium"
                    : "bg-white border border-slate-100 text-slate-400 hover:border-green-200 hover:text-green-500"}`}
              >
                {t.feedbackYes}
              </button>
              {feedback === "up" && (
                <span className="text-xs text-white/70">{t.feedbackThanks}</span>
              )}
            </div>
          </div>
        )}

        {/* Wehome 바이라인 */}
        <footer className="mt-10 pb-2 text-center space-y-0.5" dir="ltr">
          <p className="text-[11px] text-white/40 font-medium tracking-wide uppercase">
            Powered by
          </p>
          <p className="text-xs text-white/70">
            <a
              href="https://wehome.me"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 font-semibold transition"
              onClick={() => logAction({ type: "wehome_click", uiLang: lang })}
            >
              Wehome.me
            </a>
            {", Your Home in Korea"}
          </p>
          {t.wehomeTagline1 && (
            <p className="text-xs text-white/60">{t.wehomeTagline1}</p>
          )}
          <p className="text-xs text-white/60">{t.wehomeTagline2}</p>
        </footer>
      </div>
    </main>

    {modalText !== null && (
      <FontModal
        text={modalText}
        originalName={currentInput}
        isKo={lang === "ko"}
        uiLang={lang}
        onClose={() => setModalText(null)}
        onLog={logAction}
      />
    )}

    {aboutOpen !== null && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        onClick={() => setAboutOpen(null)}
        role="dialog"
        aria-modal="true"
      >
        <div
          className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[85vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
          dir={t.dir}
        >
          <div className="flex items-center justify-between px-6 pt-5 pb-3 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-800">
              {aboutOpen === "hangulname"
                ? ABOUT_CONTENT[lang].hangulnameTitle
                : ABOUT_CONTENT[lang].wehomeTitle}
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
          <div className="px-6 py-5 space-y-4">
            <p className="text-sm leading-relaxed text-slate-600 whitespace-pre-line">
              {aboutOpen === "hangulname"
                ? ABOUT_CONTENT[lang].hangulnameBody
                : ABOUT_CONTENT[lang].wehomeBody}
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
        </div>
      </div>
    )}

    <FeedbackButton lang={lang} />
    </>
  );
}
