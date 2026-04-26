"use client";

import { useState, useEffect, useCallback } from "react";
import { translations, LANG_LABELS, detectLang, type Lang } from "@/lib/i18n";
import FontModal from "@/components/FontModal";

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

// 여성 목소리 우선 선택
function getVoice(lang: string): SpeechSynthesisVoice | undefined {
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

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [currentInput, setCurrentInput] = useState(""); // 결과와 짝을 이루는 입력값
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [playing, setPlaying] = useState<string | null>(null);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [count, setCount] = useState(0);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const [modalText, setModalText] = useState<string | null>(null);

  useEffect(() => {
    setLang(detectLang());
    const stored = parseInt(localStorage.getItem("convertCount") ?? "0", 10);
    setCount(stored);
    // voices는 비동기 로드되므로 한번 트리거
    window.speechSynthesis.getVoices();
  }, []);

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
      localStorage.setItem("convertCount", String(next));
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
  };

  const speakText = useCallback((id: string, text: string, speakLang: string) => {
    window.speechSynthesis.cancel();
    if (playing === id) { setPlaying(null); return; }

    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = speakLang;
    utt.rate = 0.85;
    utt.pitch = 1.1;

    // voices가 로드됐을 때만 선택
    const voice = getVoice(speakLang);
    if (voice) utt.voice = voice;

    utt.onstart = () => setPlaying(id);
    utt.onend = () => setPlaying(null);
    utt.onerror = () => setPlaying(null);
    window.speechSynthesis.speak(utt);
  }, [playing]);

  return (
    <>
    <main
      dir={t.dir}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6"
      onClick={() => setShowLangMenu(false)}
    >
      <div className="w-full max-w-lg">
        {/* 상단 바: 언어 선택 + 변환 횟수 */}
        <div className={`flex items-center justify-between mb-6`}>
          {/* 변환 카운터 */}
          <div className="text-xs text-slate-400 bg-white border border-slate-100 rounded-xl px-3 py-1.5">
            {count > 0 ? (
              <span dangerouslySetInnerHTML={{
                __html: t.counter.replace("{n}", `<span class="font-semibold text-blue-500">${count.toLocaleString()}</span>`)
              }} />
            ) : (
              <span>{t.counterFirst}</span>
            )}
          </div>

          {/* 언어 선택 */}
          <div className="relative">
            <button
              onClick={(e) => { e.stopPropagation(); setShowLangMenu(!showLangMenu); }}
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
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800 mb-1">{t.title}</h1>
          <p className="text-sm text-slate-400">{t.subtitle}</p>
        </div>

        {/* Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && convert()}
              placeholder={t.placeholder}
              dir="auto"
              className="flex-1 text-slate-700 placeholder:text-slate-300 focus:outline-none text-base"
              autoFocus
            />
            <button
              onClick={convert}
              disabled={loading || !input.trim()}
              className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 disabled:bg-blue-200 text-white px-5 py-2 rounded-xl font-medium transition text-sm whitespace-nowrap"
            >
              {loading ? (
                <span className="flex items-center gap-1.5">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  {t.converting}
                </span>
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
              <p className="text-xs text-slate-400 px-1">{result.origin}</p>
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
                  {/* 국가 헤더 */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{v.flag}</span>
                    <span className="text-sm font-medium text-slate-500">{v.country}</span>
                    {v.ipa && (
                      <span className="text-xs text-slate-300 font-mono ml-auto">{v.ipa}</span>
                    )}
                  </div>

                  {/* 한글 표기 옵션들 */}
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
                        {/* 폰트 미리보기 버튼 */}
                        <button
                          onClick={() => setModalText(opt)}
                          title="폰트로 보기"
                          className="flex-shrink-0 p-2 rounded-xl text-slate-300 hover:text-purple-400 hover:bg-purple-50 transition"
                        >
                          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="4 7 4 4 20 4 20 7" />
                            <line x1="9" y1="20" x2="15" y2="20" />
                            <line x1="12" y1="4" x2="12" y2="20" />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* 실제 발음 행 (있을 때만) */}
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
                        onClick={() => setModalText(v.phonetic)}
                        title="폰트로 보기"
                        className="flex-shrink-0 p-2 rounded-xl text-amber-200 hover:text-purple-400 hover:bg-purple-50 transition"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="4 7 4 4 20 4 20 7" />
                          <line x1="9" y1="20" x2="15" y2="20" />
                          <line x1="12" y1="4" x2="12" y2="20" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            {/* 피드백 */}
            <div className="flex items-center justify-center gap-3 pt-1">
              <span className="text-xs text-slate-300">{t.feedbackQ}</span>
              <button
                onClick={() => setFeedback(feedback === "up" ? null : "up")}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl transition
                  ${feedback === "up"
                    ? "bg-green-100 text-green-600 font-medium"
                    : "bg-white border border-slate-100 text-slate-400 hover:border-green-200 hover:text-green-500"}`}
              >
                {t.feedbackYes}
              </button>
              <button
                onClick={() => setFeedback(feedback === "down" ? null : "down")}
                className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl transition
                  ${feedback === "down"
                    ? "bg-red-100 text-red-500 font-medium"
                    : "bg-white border border-slate-100 text-slate-400 hover:border-red-200 hover:text-red-400"}`}
              >
                {t.feedbackNo}
              </button>
              {feedback && (
                <span className="text-xs text-slate-400">
                  {feedback === "up" ? t.feedbackThanks : t.feedbackBetter}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </main>

    {modalText !== null && (
      <FontModal
        text={modalText}
        originalName={currentInput}
        isKo={lang === "ko"}
        onClose={() => setModalText(null)}
      />
    )}
    </>
  );
}
