// Curated Hangul gallery — popular names, K-pop idols, and beloved Korean words.
// Each entry's `text` is the exact Hangul that gets fed to the Hangul Art renderer.
// `sub` (optional) is shown beneath as a small caption (English/romanization/credit).

export interface GalleryItem {
  text: string;
  sub?: string;
}

export interface GalleryCategory {
  id: string;
  labelKo: string;
  labelEn: string;
  emoji: string;
  items: GalleryItem[];
}

export const GALLERY: GalleryCategory[] = [
  {
    id: "kpop",
    labelKo: "K-POP 아이돌",
    labelEn: "K-POP Idols",
    emoji: "🎤",
    items: [
      { text: "정국",   sub: "Jungkook · BTS" },
      { text: "지민",   sub: "Jimin · BTS" },
      { text: "뷔",     sub: "V · BTS" },
      { text: "진",     sub: "Jin · BTS" },
      { text: "슈가",   sub: "Suga · BTS" },
      { text: "제이홉", sub: "J-Hope · BTS" },
      { text: "알엠",   sub: "RM · BTS" },
      { text: "지수",   sub: "Jisoo · BLACKPINK" },
      { text: "제니",   sub: "Jennie · BLACKPINK" },
      { text: "로제",   sub: "Rosé · BLACKPINK" },
      { text: "리사",   sub: "Lisa · BLACKPINK" },
      { text: "민지",   sub: "Minji · NewJeans" },
      { text: "하니",   sub: "Hanni · NewJeans" },
      { text: "다니엘", sub: "Danielle · NewJeans" },
      { text: "혜린",   sub: "Haerin · NewJeans" },
      { text: "혜인",   sub: "Hyein · NewJeans" },
      { text: "카리나", sub: "Karina · aespa" },
      { text: "윈터",   sub: "Winter · aespa" },
      { text: "지젤",   sub: "Giselle · aespa" },
      { text: "닝닝",   sub: "Ningning · aespa" },
      { text: "장원영", sub: "Wonyoung · IVE" },
      { text: "안유진", sub: "Yujin · IVE" },
      { text: "가을",   sub: "Gaeul · IVE" },
      { text: "리즈",   sub: "Liz · IVE" },
      { text: "이서",   sub: "Leeseo · IVE" },
      { text: "레이",   sub: "Rei · IVE" },
      { text: "태연",   sub: "Taeyeon · SNSD" },
      { text: "윤아",   sub: "YoonA · SNSD" },
      { text: "제니",   sub: "Jenny · BP" },
      { text: "엑소",   sub: "EXO" },
    ],
  },
  {
    id: "classic-names",
    labelKo: "한국 이름",
    labelEn: "Korean Names",
    emoji: "👤",
    items: [
      { text: "민준", sub: "Min-jun" },
      { text: "서연", sub: "Seo-yeon" },
      { text: "지우", sub: "Ji-woo" },
      { text: "예준", sub: "Ye-jun" },
      { text: "하윤", sub: "Ha-yoon" },
      { text: "도윤", sub: "Do-yoon" },
      { text: "시우", sub: "Si-woo" },
      { text: "수아", sub: "Su-a" },
      { text: "지호", sub: "Ji-ho" },
      { text: "은우", sub: "Eun-woo" },
      { text: "유나", sub: "Yu-na" },
      { text: "지안", sub: "Ji-an" },
      { text: "서준", sub: "Seo-jun" },
      { text: "민서", sub: "Min-seo" },
      { text: "하준", sub: "Ha-jun" },
      { text: "지훈", sub: "Ji-hoon" },
      { text: "은서", sub: "Eun-seo" },
      { text: "예은", sub: "Ye-eun" },
      { text: "시윤", sub: "Si-yoon" },
      { text: "주원", sub: "Ju-won" },
      { text: "지유", sub: "Ji-yu" },
      { text: "하은", sub: "Ha-eun" },
      { text: "민재", sub: "Min-jae" },
      { text: "서우", sub: "Seo-woo" },
    ],
  },
  {
    id: "words",
    labelKo: "한글 한 글자",
    labelEn: "One-Syllable Words",
    emoji: "✨",
    items: [
      { text: "꽃", sub: "flower" },
      { text: "별", sub: "star" },
      { text: "달", sub: "moon" },
      { text: "꿈", sub: "dream" },
      { text: "복", sub: "blessing" },
      { text: "빛", sub: "light" },
      { text: "봄", sub: "spring" },
      { text: "맘", sub: "heart" },
      { text: "숲", sub: "forest" },
      { text: "춤", sub: "dance" },
      { text: "삶", sub: "life" },
      { text: "정", sub: "affection" },
      { text: "하늘", sub: "sky" },
      { text: "바다", sub: "sea" },
      { text: "구름", sub: "cloud" },
      { text: "바람", sub: "wind" },
      { text: "눈", sub: "snow" },
      { text: "비", sub: "rain" },
      { text: "길", sub: "road" },
      { text: "집", sub: "home" },
      { text: "산", sub: "mountain" },
      { text: "강", sub: "river" },
      { text: "나무", sub: "tree" },
      { text: "돌", sub: "stone" },
    ],
  },
  {
    id: "phrases",
    labelKo: "K-드라마 단어",
    labelEn: "K-Drama Words",
    emoji: "💬",
    items: [
      { text: "안녕",   sub: "Hello / Bye" },
      { text: "사랑",   sub: "Love" },
      { text: "행복",   sub: "Happiness" },
      { text: "감사",   sub: "Thanks" },
      { text: "친구",   sub: "Friend" },
      { text: "화이팅", sub: "Cheer up!" },
      { text: "오빠",   sub: "Oppa" },
      { text: "언니",   sub: "Unnie" },
      { text: "한국",   sub: "Korea" },
      { text: "서울",   sub: "Seoul" },
      { text: "김치",   sub: "Kimchi" },
      { text: "한글",   sub: "Hangul" },
      { text: "고마워", sub: "Thank you" },
      { text: "미안해", sub: "Sorry" },
      { text: "괜찮아", sub: "It's okay" },
      { text: "사랑해", sub: "I love you" },
      { text: "보고싶어", sub: "I miss you" },
      { text: "잘자",   sub: "Good night" },
      { text: "대박",   sub: "Awesome!" },
      { text: "진짜",   sub: "Really" },
      { text: "이뻐",   sub: "Pretty" },
      { text: "멋져",   sub: "Cool" },
      { text: "귀여워", sub: "Cute" },
      { text: "맛있어", sub: "Delicious" },
    ],
  },
];

export function getAllItems(): GalleryItem[] {
  return GALLERY.flatMap((c) => c.items);
}

export function getCategory(id: string): GalleryCategory | undefined {
  return GALLERY.find((c) => c.id === id);
}
