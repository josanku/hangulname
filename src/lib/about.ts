import type { Lang } from "./i18n";

export interface FaqEntry {
  q: string;
  a: string;
}

export interface AboutContent {
  menuLabel: string;
  hangulnameTitle: string;
  hangulnameBody: string;
  wehomeTitle: string;
  wehomeBody: string;
  wehomeCta: string;
  faqTitle: string;
  faqEntries: FaqEntry[];
  close: string;
}

const KO: AboutContent = {
  menuLabel: "정보",
  hangulnameTitle: "한글이름이란?",
  hangulnameBody:
    "외국 이름을 한국어 발음으로 어떻게 표기하면 좋을지 알려주는 무료 도구입니다. 19개 언어를 지원하며, 변환 결과마다 한글 표기·음성 듣기·IPA 발음기호·여러 폰트 미리보기·한글아트 생성을 제공합니다. 한국 친구나 동료의 이름을 명함, 청첩장, 학교 등록 서류, SNS 프로필 등에 정확히 표기하고 싶을 때 사용해보세요.",
  wehomeTitle: "Wehome.me 소개",
  wehomeBody:
    "위홈은 한국 정부에 합법 등록된 공유숙박 플랫폼입니다. AI 기반 로컬 추천 시스템으로 여행객에게 최적의 숙소를 제안하고, 24/7 한국어·영어 현지 고객지원을 제공합니다. 한국 문화와 라이프스타일을 경험할 수 있는 다양한 숙소를 만나보세요. \"Your Home in Korea\" — 한국에서의 나만의 집, 위홈에서.",
  wehomeCta: "Wehome.me 방문하기 →",
  faqTitle: "한글이름 FAQ",
  faqEntries: [
    {
      q: "변환 결과가 정확한가요?",
      a: "음역(transliteration)은 절대 정답이 없습니다. 같은 이름이라도 한국에서 사람마다 다르게 표기하는 경우가 많아요. 본 도구는 한국어 화자가 가장 자연스럽게 발음할 수 있는 표기를 우선으로 제시하며, 가능한 경우 대안 표기도 함께 보여드립니다.",
    },
    {
      q: "같은 이름인데 결과가 여러 개 나와요. 어떤 게 맞나요?",
      a: "이름의 출신 언어/국가에 따라 발음이 다르기 때문입니다. 예를 들어 \"Caroline\"은 영어·프랑스어·독일어에서 모두 다르게 발음됩니다. 본인이나 상대방의 출신 언어를 기준으로 선택하시는 것을 추천합니다. 첫 번째(파란 테두리)가 가장 권장되는 표기입니다.",
    },
    {
      q: "변환 결과를 어디에 써도 되나요?",
      a: "자유롭게 사용하셔도 됩니다. 명함, 학교/회사 등록 서류, 청첩장, 출입증, SNS 프로필, 한국어 학습 노트 등 어디든 가능합니다. 출처 표기는 필수가 아니지만 \"name.hangulmaru.com\"으로 공유해주시면 감사드려요.",
    },
    {
      q: "어떤 폰트를 선택해야 하나요?",
      a: "용도에 맞춰 고르시면 됩니다. 명함·서류는 명조나 고딕(가독성 우수), 청첩장·증서는 궁서(전통미), SNS·캐주얼 용도는 나눔붓글씨나 개구체(친근감)를 추천합니다. \"폰트 갤러리\" 버튼으로 12개 폰트를 한 번에 비교하실 수 있고, \"한글아트\" 버튼으로 생성형 한글 예술 작품도 만들 수 있습니다.",
    },
    {
      q: "음성 입력(마이크)이 동작하지 않아요.",
      a: "Web Speech API를 사용하는데, 데스크탑/모바일 Chrome 및 Edge에서 가장 잘 동작합니다. Firefox와 일부 iOS Safari는 제한적이거나 미지원입니다. 마이크 권한이 차단되어 있지 않은지도 확인해주세요.",
    },
    {
      q: "한자, 베트남어, 아랍어, 힌디어 이름도 변환되나요?",
      a: "네, 총 19개 언어를 지원합니다. 입력창에 그 언어 그대로 입력하시면 한국어 발음으로 자동 변환합니다. 입력 예시는 placeholder를 참고하세요 (예: 习近平, محمد, राज).",
    },
    {
      q: "변환 결과가 잘못된 것 같아요.",
      a: "표기에 절대 정답은 없지만, 명백한 오류라면 화면 우측 하단 피드백 버튼으로 알려주세요. 사전 개선에 반영해 다음 변환부터 더 자연스럽게 표시되도록 하겠습니다.",
    },
    {
      q: "이 서비스는 누가 만들었나요? 유료인가요?",
      a: "한국의 합법 공유숙박 플랫폼 Wehome.me 가 운영합니다. 완전 무료이며 광고도 없습니다. 한국을 방문하시거나 한국에 거주하시는 외국인분들에게 \"이름\"이라는 작은 첫 인사를 더 편하게 만들어드리고 싶었습니다.",
    },
  ],
  close: "닫기",
};

const EN: AboutContent = {
  menuLabel: "About",
  hangulnameTitle: "What is hangulname?",
  hangulnameBody:
    "A free tool that helps you write any foreign name in Korean (Hangul) with the closest natural pronunciation. Supports 19 languages and provides audio playback, IPA phonetics, multiple font previews, and generative Hangul Art for every result. Useful for business cards, wedding invites, school registrations, social media profiles, or anywhere you need to render a non-Korean name in Hangul cleanly.",
  wehomeTitle: "About Wehome.me",
  wehomeBody:
    "Wehome is a government-registered legal short-term rental platform in Korea. Our AI-powered local recommendation system matches travelers with the perfect accommodations, backed by 24/7 local support in Korean and English. Experience authentic Korean culture and lifestyle through our diverse selection of homes. \"Your Home in Korea\" — Wehome.me.",
  wehomeCta: "Visit Wehome.me →",
  faqTitle: "hangulname FAQ",
  faqEntries: [
    {
      q: "How accurate are the results?",
      a: "Transliteration is never absolute — the same name is often written differently by different Korean speakers. This tool prioritizes the spelling that a native Korean speaker would naturally pronounce closest to the original, and shows alternative spellings where useful.",
    },
    {
      q: "Why are there multiple results for one name?",
      a: "The same spelling is pronounced differently across languages. For example, \"Caroline\" sounds different in English, French, and German. Pick the result whose language matches the name's origin. The first card (blue border) is the most recommended spelling.",
    },
    {
      q: "Can I use the results anywhere?",
      a: "Yes, freely. Business cards, school/work registration, wedding invitations, ID badges, social media profiles, Korean study notes — wherever you need it. Attribution isn't required but a mention of \"name.hangulmaru.com\" is appreciated.",
    },
    {
      q: "Which font should I pick?",
      a: "Match it to the use case. For business cards or formal documents try Myeongjo or Gothic (clean and readable). For wedding invitations or certificates, Gungsuh has a classic feel. For social or casual use, Nanum Brush Script or Gaegu feel friendly. Use the \"Font Gallery\" button to compare all 12 fonts at once, and the \"Hangul Art\" button to generate unique artistic compositions.",
    },
    {
      q: "The microphone input doesn't work for me.",
      a: "Voice input uses the Web Speech API, which works best on desktop and mobile Chrome / Edge. Firefox and some iOS Safari versions have limited or no support. Also check that your browser hasn't blocked microphone permissions.",
    },
    {
      q: "Does it work for Chinese, Vietnamese, Arabic, Hindi names?",
      a: "Yes — 19 languages total. Type the name in its native script and the tool will give you the Korean pronunciation. See the placeholder for examples (习近平, محمد, राज, …).",
    },
    {
      q: "A result looks wrong. What should I do?",
      a: "There's no single correct transliteration, but if you spot a clear error please send feedback via the button at the bottom-right. It feeds into the dictionary so future conversions improve.",
    },
    {
      q: "Who runs this site? Is it free?",
      a: "It's run by Wehome.me, a Korean legal short-term rental platform. The tool is completely free and ad-free. We wanted to make the simple first step — saying someone's name — a little easier for visitors and residents in Korea.",
    },
  ],
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
