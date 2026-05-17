import type { Lang } from "./i18n";

export interface AboutContent {
  menuLabel: string;
  hangulnameTitle: string;
  hangulnameBody: string;
  wehomeTitle: string;
  wehomeBody: string;
  wehomeCta: string;
  close: string;
}

const KO: AboutContent = {
  menuLabel: "정보",
  hangulnameTitle: "한글이름이란?",
  hangulnameBody:
    "외국 이름을 한국어 발음으로 어떻게 표기하면 좋을지 알려주는 무료 도구입니다. 19개 언어를 지원하며, 변환 결과마다 한글 표기·음성 듣기·IPA 발음기호·여러 폰트 미리보기를 제공합니다. 한국 친구나 동료의 이름을 명함, 청첩장, 학교 등록 서류 등에 정확히 표기하고 싶을 때 사용해보세요.",
  wehomeTitle: "Wehome.me 소개",
  wehomeBody:
    "위홈은 한국 정부에 합법 등록된 공유숙박 플랫폼입니다. 에어비앤비와 동일한 숙소를 평균 7% 더 저렴한 즉시 할인 가격으로 예약할 수 있고, 한국어·영어 24/7 현지 고객지원이 제공됩니다. \"Your Home in Korea\" — 한국에서의 나만의 집, 위홈에서.",
  wehomeCta: "Wehome.me 방문하기 →",
  close: "닫기",
};

const EN: AboutContent = {
  menuLabel: "About",
  hangulnameTitle: "What is hangulname?",
  hangulnameBody:
    "A free tool that helps you write any foreign name in Korean (Hangul) with the closest natural pronunciation. Supports 19 languages and provides audio playback, IPA phonetics, and multiple font previews for every result. Useful for business cards, wedding invites, school registrations, or anywhere you need to render a non-Korean name in Hangul cleanly.",
  wehomeTitle: "About Wehome.me",
  wehomeBody:
    "Wehome is a government-registered legal short-term rental platform in Korea. Book the same homes you'd find on Airbnb at an instant 7% discount on average, with 24/7 local support in Korean and English. \"Your Home in Korea\" — Wehome.me.",
  wehomeCta: "Visit Wehome.me →",
  close: "Close",
};

export const ABOUT_CONTENT: Record<Lang, AboutContent> = {
  ko: KO,
  en: EN,
  zh: EN,
  ja: EN,
  es: EN,
  fr: EN,
  de: EN,
  ar: EN,
  ru: EN,
  pt: EN,
  vi: EN,
  id: EN,
  th: EN,
  ms: EN,
  hi: EN,
  bn: EN,
  tl: EN,
  my: EN,
  mn: EN,
};
