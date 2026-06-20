// K-pop / Korean artist data for the dedicated artist pages (/[slug]).

export interface Artist {
  slug: string;
  ko: string;        // Korean name
  en: string;        // English / romanized name
  emoji: string;
  type: "group" | "solo";
  members?: string[];      // groups
  fanWords: string[];      // group name, fandom, signature terms
  songs: string[];         // Korean-title songs
}

export const ARTISTS: Artist[] = [
  // ── Groups ──────────────────────────────────────────────────────────────
  { slug: "bts", ko: "방탄소년단", en: "BTS", emoji: "💜", type: "group",
    members: ["진","슈가","제이홉","RM","지민","뷔","정국"],
    fanWords: ["방탄소년단","보라해","아미","아미밤","화양연화","떼창","컴백","최애"],
    songs: ["봄날","피 땀 눈물","불타오르네","쩔어","작은 것들을 위한 시","아이돌","상남자","소우주"] },
  { slug: "blackpink", ko: "블랙핑크", en: "BLACKPINK", emoji: "🖤", type: "group",
    members: ["지수","제니","로제","리사"],
    fanWords: ["블랙핑크","블링크"],
    songs: ["뚜두뚜두","마지막처럼","휘파람","붐바야","불장난","핑크 베놈","셧 다운"] },
  { slug: "bigbang", ko: "빅뱅", en: "BIGBANG", emoji: "👑", type: "group",
    members: ["지드래곤","태양","탑","대성"],
    fanWords: ["빅뱅","브이아이피"],
    songs: ["거짓말","하루하루","뱅뱅뱅","붉은 노을","꽃 길","마지막 인사","봄여름가을겨울","우리 사랑하지 말아요"] },
  { slug: "exo", ko: "엑소", en: "EXO", emoji: "🐺", type: "group",
    members: ["수호","시우민","레이","백현","첸","찬열","디오","카이","세훈"],
    fanWords: ["엑소","엑소엘"],
    songs: ["으르렁","중독","콜 미 베이비","러브 샷","파워","첫 눈","전야"] },
  { slug: "twice", ko: "트와이스", en: "TWICE", emoji: "🍭", type: "group",
    members: ["나연","정연","모모","사나","지효","미나","다현","채영","쯔위"],
    fanWords: ["트와이스","원스"],
    songs: ["치얼업","티티","낙낙","예스 오어 예스","필 스페셜","팬시","우아하게"] },
  { slug: "red-velvet", ko: "레드벨벳", en: "Red Velvet", emoji: "❤️", type: "group",
    members: ["아이린","슬기","웬디","조이","예리"],
    fanWords: ["레드벨벳","레베럽"],
    songs: ["빨간 맛","피카부","러시안 룰렛","음파음파","사이코","행복","나쁜 녀석"] },
  { slug: "newjeans", ko: "뉴진스", en: "NewJeans", emoji: "🐰", type: "group",
    members: ["민지","하니","다니엘","해린","혜인"],
    fanWords: ["뉴진스","버니즈"],
    songs: ["하입보이","디토","어텐션","쿠키","오엠지","슈퍼 샤이"] },
  { slug: "aespa", ko: "에스파", en: "aespa", emoji: "🦋", type: "group",
    members: ["카리나","지젤","윈터","닝닝"],
    fanWords: ["에스파","마이"],
    songs: ["넥스트 레벨","블랙 맘바","도깨비불","새비지","드라마","스파이시"] },
  { slug: "ive", ko: "아이브", en: "IVE", emoji: "💎", type: "group",
    members: ["안유진","가을","레이","장원영","리즈","이서"],
    fanWords: ["아이브","다이브"],
    songs: ["러브 다이브","일레븐","키치","아이 엠","해야","어트랙티브"] },
  { slug: "seventeen", ko: "세븐틴", en: "SEVENTEEN", emoji: "💎", type: "group",
    members: ["에스쿱스","정한","조슈아","준","호시","원우","우지","디에잇","민규","도겸","승관","버논","디노"],
    fanWords: ["세븐틴","캐럿"],
    songs: ["아주 나이스","박수","울고 싶지 않아","붐붐","손오공","예쁘다","어른아이"] },
  { slug: "stray-kids", ko: "스트레이키즈", en: "Stray Kids", emoji: "🐺", type: "group",
    members: ["방찬","리노","창빈","현진","한","필릭스","승민","아이엔"],
    fanWords: ["스트레이키즈","스테이"],
    songs: ["소리꾼","신메뉴","부작용","특","락","갑자기"] },
  { slug: "snsd", ko: "소녀시대", en: "Girls' Generation", emoji: "✨", type: "group",
    members: ["태연","써니","티파니","효연","유리","수영","윤아","서현"],
    fanWords: ["소녀시대","소원"],
    songs: ["지","소원을 말해봐","다시 만난 세계","오","파티","홀리데이","훗"] },
  { slug: "gidle", ko: "아이들", en: "(G)I-DLE", emoji: "🔥", type: "group",
    members: ["미연","민니","소연","우기","슈화"],
    fanWords: ["아이들","네버랜드"],
    songs: ["라타타","화","톰보이","퀸카","누드","클락션"] },
  { slug: "lesserafim", ko: "르세라핌", en: "LE SSERAFIM", emoji: "🔥", type: "group",
    members: ["김채원","사쿠라","허윤진","카즈하","홍은채"],
    fanWords: ["르세라핌","피어녹스"],
    songs: ["피어리스","안티프래자일","언포기븐","이지","퍼펙트 나이트"] },
  { slug: "itzy", ko: "있지", en: "ITZY", emoji: "⚡", type: "group",
    members: ["예지","리아","류진","채령","유나"],
    fanWords: ["있지","믿지"],
    songs: ["달라달라","아이시","워너비","마피아","스니커즈","체셔"] },
  { slug: "txt", ko: "투모로우바이투게더", en: "TXT", emoji: "🌟", type: "group",
    members: ["연준","수빈","범규","태현","휴닝카이"],
    fanWords: ["투모로우바이투게더","모아"],
    songs: ["세계가 불타버린 밤","오월 오일","어느 날","나쁜 짓","청춘 블라썸"] },
  { slug: "enhypen", ko: "엔하이픈", en: "ENHYPEN", emoji: "🩸", type: "group",
    members: ["정원","희승","제이","제이크","성훈","선우","니키"],
    fanWords: ["엔하이픈","엔진"],
    songs: ["결박","주문","향수병","폴라로이드 러브"] },
  { slug: "mamamoo", ko: "마마무", en: "MAMAMOO", emoji: "🌈", type: "group",
    members: ["솔라","문별","휘인","화사"],
    fanWords: ["마마무","무무"],
    songs: ["데칼코마니","별이 빛나는 밤","음오아예","고고베베","힙","넌 is 뭔들"] },
  { slug: "super-junior", ko: "슈퍼주니어", en: "Super Junior", emoji: "🔵", type: "group",
    members: ["이특","희철","예성","신동","은혁","동해","시원","려욱","규현"],
    fanWords: ["슈퍼주니어","엘프"],
    songs: ["쏘리쏘리","미인아","로꾸거","스파이","마법","블랙 수트"] },
  { slug: "akmu", ko: "악동뮤지션", en: "AKMU", emoji: "🎶", type: "group",
    members: ["이찬혁","이수현"],
    fanWords: ["악동뮤지션","악뮤"],
    songs: ["다이아몬드","오랜 날 오랜 밤","어떻게 이별까지 사랑하겠어","200%","후라이의 꿈","사람들이 움직이는 게"] },

  // ── Solo ────────────────────────────────────────────────────────────────
  { slug: "iu", ko: "아이유", en: "IU", emoji: "🌙", type: "solo",
    fanWords: ["아이유","이지은","유애나"],
    songs: ["좋은 날","밤편지","팔레트","블루밍","에잇","너랑 나","분홍신","삐삐","라일락","celebrity"] },
  { slug: "psy", ko: "싸이", en: "PSY", emoji: "🕺", type: "solo",
    fanWords: ["싸이","박재상"],
    songs: ["강남스타일","젠틀맨","행오버","챔피언","새","흠뻑쇼","연예인"] },
  { slug: "taeyeon", ko: "태연", en: "Taeyeon", emoji: "🎵", type: "solo",
    fanWords: ["태연","김태연"],
    songs: ["만약에","사계","불티","위크엔드","아이","제주도의 푸른 밤"] },
  { slug: "gdragon", ko: "지드래곤", en: "G-Dragon", emoji: "👑", type: "solo",
    fanWords: ["지드래곤","권지용"],
    songs: ["무제","삐딱하게","하트브레이커","쿠데타","파워","니가 뭔데"] },
  { slug: "rain", ko: "비", en: "Rain", emoji: "☔", type: "solo",
    fanWords: ["비","정지훈"],
    songs: ["깡","태양을 피하는 방법","널 붙잡을 노래","레이니즘","사랑 사랑 사랑"] },
  { slug: "boa", ko: "보아", en: "BoA", emoji: "⭐", type: "solo",
    fanWords: ["보아","권보아"],
    songs: ["넘버원","아틀란티스 소녀","발렌티","온리 원","썸데이","걸스 온 톱"] },
  { slug: "sunmi", ko: "선미", en: "Sunmi", emoji: "💃", type: "solo",
    fanWords: ["선미","이선미"],
    songs: ["가시나","주인공","사이렌","보름달","날라리","꼬리"] },
  { slug: "chungha", ko: "청하", en: "Chungha", emoji: "💫", type: "solo",
    fanWords: ["청하","김청하"],
    songs: ["벌써 12시","롤러코스터","스내핑","고스트","바이바이바이","피플"] },
];

export const ARTIST_MAP: Record<string, Artist> = Object.fromEntries(
  ARTISTS.map((a) => [a.slug, a]),
);

// ── Consonant ordering: ㅇㅎ · ㅅㅆㅈㅉㅊ · ㅁㅂㅃㅍ · ㄴㄷㄸㅌㄹ · ㄱㄲㅋ ─────────
const CHO = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const ORDER = "ㅇㅎㅅㅆㅈㅉㅊㅁㅂㅃㅍㄴㄷㄸㅌㄹㄱㄲㅋ";
const RANK: Record<string, number> = {};
[...ORDER].forEach((c, i) => { RANK[c] = i; });

function firstChoseong(word: string): string | null {
  for (const ch of word) {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 0xac00 && code <= 0xd7a3) return CHO[Math.floor((code - 0xac00) / 588)];
  }
  return null;
}
function rank(word: string): number {
  const c = firstChoseong(word);
  return c == null ? 999 : (RANK[c] ?? 900);
}
export function byConsonant(words: string[]): string[] {
  return words.map((w, i) => ({ w, i })).sort((a, b) => rank(a.w) - rank(b.w) || a.i - b.i).map((x) => x.w);
}
