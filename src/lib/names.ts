// Popular given names with their standard Korean (Hangul) spelling.
// Powers the programmatic SEO pages at /name/[slug] ("[Name] in Korean").

export interface NameEntry {
  slug: string;   // lowercase name, URL segment
  name: string;   // display name
  ko: string;     // primary Korean spelling
  alt?: string;   // alternative spelling
}

const raw: [string, string, string?][] = [
  // ── Male ──
  ["Michael", "마이클"], ["David", "데이비드"], ["John", "존"], ["James", "제임스"],
  ["Daniel", "대니얼"], ["Matthew", "매슈"], ["Andrew", "앤드루"], ["Joseph", "조지프"],
  ["Christopher", "크리스토퍼"], ["Anthony", "앤서니"], ["Mark", "마크"], ["Paul", "폴"],
  ["Kevin", "케빈"], ["Brian", "브라이언"], ["Jason", "제이슨"], ["Eric", "에릭"],
  ["Adam", "애덤"], ["Peter", "피터"], ["Charles", "찰스"], ["Henry", "헨리"],
  ["Jack", "잭"], ["Alexander", "알렉산더"], ["Benjamin", "벤저민"], ["Ryan", "라이언"],
  ["Noah", "노아"], ["Ethan", "이선"], ["Liam", "리암"], ["Lucas", "루카스"],
  ["Oliver", "올리버"], ["Leo", "레오"], ["Max", "맥스"], ["Aaron", "에런"],
  ["Nathan", "네이선"], ["Luke", "루크"], ["William", "윌리엄"], ["Thomas", "토머스"],
  ["George", "조지"], ["Robert", "로버트"], ["Steven", "스티븐"], ["Jacob", "제이컵"],
  ["Nicholas", "니컬러스"], ["Justin", "저스틴"], ["Tyler", "타일러"], ["Sean", "션"],
  ["Edward", "에드워드"], ["Samuel", "새뮤얼"], ["Dylan", "딜런"], ["Carlos", "카를로스"],
  ["Juan", "후안"], ["Jose", "호세"], ["Diego", "디에고"], ["Ivan", "이반"],
  ["Pierre", "피에르"], ["Hans", "한스"], ["Mohammed", "무함마드", "모하메드"], ["Ali", "알리"],
  ["Omar", "오마르"], ["Hassan", "하산"],
  // ── Female ──
  ["Mary", "메리"], ["Jennifer", "제니퍼"], ["Elizabeth", "엘리자베스"], ["Sarah", "세라"],
  ["Jessica", "제시카"], ["Emily", "에밀리"], ["Emma", "에마"], ["Olivia", "올리비아"],
  ["Sophia", "소피아"], ["Isabella", "이저벨라"], ["Mia", "미아"], ["Charlotte", "샬럿"],
  ["Amelia", "어밀리아"], ["Ava", "에이바"], ["Grace", "그레이스"], ["Chloe", "클로이"],
  ["Anna", "애나"], ["Hannah", "해나"], ["Lily", "릴리"], ["Ella", "엘라"],
  ["Zoe", "조이"], ["Victoria", "빅토리아"], ["Caroline", "캐롤라인", "캐롤린"], ["Catherine", "캐서린"],
  ["Rachel", "레이철"], ["Laura", "로라"], ["Julia", "줄리아"], ["Natalie", "내털리"],
  ["Rebecca", "리베카"], ["Nicole", "니콜"], ["Amanda", "어맨다"], ["Michelle", "미셸"],
  ["Amy", "에이미"], ["Sophie", "소피"], ["Alice", "앨리스"], ["Luna", "루나"],
  ["Stella", "스텔라"], ["Scarlett", "스칼릿"], ["Maya", "마야"], ["Nora", "노라"],
  ["Aria", "아리아"], ["Rose", "로즈"], ["Eva", "에바"], ["Clara", "클라라"],
  ["Maria", "마리아"], ["Sofia", "소피아"], ["Fatima", "파티마"], ["Aisha", "아이샤"],
];

export const NAMES: NameEntry[] = raw.map(([name, ko, alt]) => ({
  slug: name.toLowerCase(),
  name,
  ko,
  alt,
}));

export const NAME_MAP: Record<string, NameEntry> = Object.fromEntries(NAMES.map((n) => [n.slug, n]));
