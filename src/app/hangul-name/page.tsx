"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface Section { h: string; b: string }
interface Content {
  title: string;
  subtitle: string;
  intro: string;
  featuresTitle: string;
  features: { t: string; d: string }[];
  howTitle: string;
  how: string[];
  useTitle: string;
  uses: string[];
  langTitle: string;
  langBody: string;
  sections: Section[];
  wehomeTitle: string;
  wehomeBody: string;
  wehomeCta: string;
  back: string;
  cta: string;
}

const EN: Content = {
  title: "Hangul Name",
  subtitle: "Write any foreign name in Korean — the natural way.",
  intro:
    "Hangul Name is a free tool that turns any name from 19 languages into its closest natural Korean (Hangul) spelling. Transliteration has no single right answer — the same name is often written differently by different Korean speakers — so for every name we surface the spelling a native speaker would pronounce closest to the original, plus useful alternatives, audio, phonetics, font previews, and generative Hangul Art.",
  featuresTitle: "What you get for every name",
  features: [
    { t: "Natural Hangul spelling", d: "The primary spelling a native Korean speaker would say, with alternative spellings where they help." },
    { t: "Listen out loud", d: "Text-to-speech for both the original name and its Korean pronunciation." },
    { t: "IPA phonetics", d: "Phonetic notation so you can see exactly how each result sounds." },
    { t: "20+ font previews", d: "Compare your name across 20+ Korean fonts — from Hunminjeongeum to Baemin styles — and download any as an image." },
    { t: "Hangul Art", d: "Generate one-of-a-kind artistic compositions of your name and share or download them." },
    { t: "Optional jamo colors", d: "Toggle color to see consonants and vowels by category — a window into how Hangul is built." },
  ],
  howTitle: "How to use it",
  how: [
    "Type a name in its own language — Latin, 한글, 漢字, العربية, हिन्दी and more.",
    "Read the converted cards: the first (highlighted) card is the most recommended spelling.",
    "Tap the speaker to hear it, or copy the spelling you like.",
    "Open Font Gallery to preview every font, or Hangul Art to make a shareable image.",
  ],
  useTitle: "Where people use it",
  uses: [
    "Business cards and email signatures",
    "Wedding invitations and certificates",
    "School, university and company registration forms",
    "ID badges, name tags and visitor passes",
    "Social media profiles and handles",
    "Korean language study notes",
  ],
  langTitle: "19 languages supported",
  langBody:
    "English, Korean, Chinese, Japanese, Spanish, French, German, Arabic, Russian, Portuguese, Vietnamese, Indonesian, Thai, Malay, Hindi, Bengali, Tagalog, Burmese and Mongolian. Type a name in its native script and Hangul Name returns the Korean pronunciation.",
  sections: [
    {
      h: "Why spellings differ",
      b: "A name's pronunciation depends on its origin language. \"Caroline\" sounds different in English, French and German, so the same letters can map to different Hangul. Pick the result whose language matches the name's origin — the first card is our top recommendation.",
    },
    {
      h: "Rooted in Hunminjeongeum",
      b: "Hangul was created by King Sejong the Great in 1443 as Hunminjeongeum — \"the correct sounds for the instruction of the people.\" Its consonants mimic the shape of the speech organs and its vowels embody Heaven, Earth and Humanity, making it one of the most scientific writing systems in the world and a UNESCO Memory of the World.",
    },
  ],
  wehomeTitle: "Made by Wehome",
  wehomeBody:
    "Hangul Name is built and run by Wehome.me, Korea's only government-authorized home sharing platform. It is completely free and ad-free — our way of making the first hello a little easier for visitors and residents in Korea. Your Home in Korea. Live Locally, Stay Safely.",
  wehomeCta: "Visit Wehome.me →",
  back: "Back",
  cta: "Try it — convert a name →",
};

const KO: Content = {
  title: "한글이름 (Hangul Name)",
  subtitle: "외국 이름을, 한국인이 부르는 가장 자연스러운 한글로.",
  intro:
    "한글이름은 19개 언어의 어떤 이름이든 가장 자연스러운 한글 표기로 바꿔주는 무료 도구입니다. 음역(transliteration)에는 절대 정답이 없어요 — 같은 이름도 한국인마다 다르게 적곤 합니다. 그래서 이름마다 한국어 화자가 원음에 가장 가깝게 발음할 표기를 우선 제시하고, 유용한 대안 표기와 함께 음성 듣기·IPA 발음기호·폰트 미리보기·한글아트까지 제공합니다.",
  featuresTitle: "이름마다 제공되는 것",
  features: [
    { t: "자연스러운 한글 표기", d: "한국인이 가장 자연스럽게 발음할 대표 표기와, 도움이 될 때 대안 표기까지." },
    { t: "소리 내어 듣기", d: "원어 이름과 한글 발음 모두 음성으로 들려드립니다." },
    { t: "IPA 발음기호", d: "각 결과가 정확히 어떻게 소리 나는지 음성기호로 확인." },
    { t: "20여 종 폰트 미리보기", d: "훈민정음부터 배민체까지 20여 폰트로 이름을 비교하고 이미지로 저장." },
    { t: "한글아트", d: "세상에 하나뿐인 한글 예술 작품을 만들어 공유·다운로드." },
    { t: "자모 색상 옵션", d: "켜면 닿소리·홀소리를 분류별 색으로 표시 — 한글이 만들어지는 원리를 한눈에." },
  ],
  howTitle: "사용 방법",
  how: [
    "이름을 그 언어 그대로 입력 — 로마자, 한글, 漢字, العربية, हिन्दी 등.",
    "변환 카드를 확인하세요. 첫 번째(강조된) 카드가 가장 권장되는 표기입니다.",
    "스피커를 눌러 들어보거나, 마음에 드는 표기를 복사하세요.",
    "폰트 갤러리로 모든 폰트를 미리 보거나, 한글아트로 공유용 이미지를 만드세요.",
  ],
  useTitle: "이렇게 쓰여요",
  uses: [
    "명함·이메일 서명",
    "청첩장·증서",
    "학교·대학·회사 등록 서류",
    "출입증·이름표·방문증",
    "SNS 프로필·아이디",
    "한국어 학습 노트",
  ],
  langTitle: "19개 언어 지원",
  langBody:
    "영어·한국어·중국어·일본어·스페인어·프랑스어·독일어·아랍어·러시아어·포르투갈어·베트남어·인도네시아어·태국어·말레이어·힌디어·벵골어·타갈로그어·버마어·몽골어. 그 언어의 문자 그대로 입력하면 한글 발음으로 변환해 드립니다.",
  sections: [
    {
      h: "표기가 여러 개인 이유",
      b: "이름의 발음은 출신 언어에 따라 달라집니다. \"Caroline\"은 영어·프랑스어·독일어에서 모두 다르게 발음되어 같은 철자라도 한글이 달라져요. 이름의 출신 언어에 맞는 결과를 고르세요 — 첫 번째 카드가 가장 권장하는 표기입니다.",
    },
    {
      h: "훈민정음에 뿌리를 둔 글자",
      b: "한글은 1443년 세종대왕이 훈민정음 — \"백성을 가르치는 바른 소리\" — 으로 창제했습니다. 자음은 발음기관의 모양을, 모음은 천·지·인을 담아 설계된, 세계에서 가장 과학적인 문자 중 하나이며 유네스코 세계기록유산입니다.",
    },
  ],
  wehomeTitle: "위홈이 만듭니다",
  wehomeBody:
    "한글이름은 한국 정부가 인증한 유일한 공유숙박 플랫폼 Wehome.me 가 만들고 운영합니다. 완전 무료, 광고 없음 — 한국을 찾거나 한국에 사는 분들의 첫 인사를 조금 더 편하게 만들고 싶었습니다. Your Home in Korea. Live Locally, Stay Safely.",
  wehomeCta: "Wehome.me 방문하기 →",
  back: "뒤로",
  cta: "직접 변환해보기 →",
};

export default function HangulNamePage() {
  const [c, setC] = useState<Content>(EN);

  useEffect(() => {
    const lang = new URLSearchParams(window.location.search).get("lang");
    setC(lang === "ko" ? KO : EN);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6">
      <div className="max-w-2xl mx-auto pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-8"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {c.back}
        </Link>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/40 p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-2">
            {c.title}
          </h1>
          <p className="text-sm text-violet-400 mb-6">{c.subtitle}</p>

          <p className="text-sm text-slate-600 leading-relaxed mb-8">{c.intro}</p>

          <h2 className="text-base font-semibold text-slate-800 mb-3">{c.featuresTitle}</h2>
          <div className="grid sm:grid-cols-2 gap-3 mb-8">
            {c.features.map((f) => (
              <div key={f.t} className="bg-violet-50/60 rounded-xl p-4 border border-violet-100">
                <h3 className="text-sm font-semibold text-violet-800 mb-1">{f.t}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          <h2 className="text-base font-semibold text-slate-800 mb-3">{c.howTitle}</h2>
          <ol className="list-decimal list-inside space-y-1.5 mb-8 text-sm text-slate-600 marker:text-violet-400 marker:font-semibold">
            {c.how.map((s, i) => <li key={i} className="leading-relaxed">{s}</li>)}
          </ol>

          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3">{c.useTitle}</h2>
              <ul className="space-y-1.5 text-sm text-slate-600">
                {c.uses.map((u) => (
                  <li key={u} className="flex items-start gap-2">
                    <span className="text-violet-400 mt-0.5">·</span>
                    <span>{u}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800 mb-3">{c.langTitle}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{c.langBody}</p>
            </div>
          </div>

          {c.sections.map((s) => (
            <div key={s.h} className="mb-6">
              <h2 className="text-base font-semibold text-slate-800 mb-2">{s.h}</h2>
              <p className="text-sm text-slate-600 leading-relaxed">{s.b}</p>
            </div>
          ))}

          <div className="bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl p-6 text-white mb-8">
            <h2 className="text-lg font-bold mb-2">{c.wehomeTitle}</h2>
            <p className="text-sm text-white/85 leading-relaxed mb-4">{c.wehomeBody}</p>
            <a
              href="https://wehome.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-violet-700 text-sm font-semibold px-4 py-2 rounded-xl hover:bg-violet-50 transition"
            >
              {c.wehomeCta}
            </a>
          </div>

          <Link
            href="/"
            className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition"
          >
            {c.cta}
          </Link>
        </div>
      </div>
    </div>
  );
}
