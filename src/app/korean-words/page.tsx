import type { Metadata } from "next";
import Link from "next/link";
import { byConsonant, ARTISTS } from "@/lib/kpop";

const BASE = "https://www.myhangulname.com";

export const metadata: Metadata = {
  title: "Korean Words to Know — OED, K-pop, Songs & Beautiful Hangul",
  description:
    "A compact, curated gallery of Korean words: entries in the Oxford English Dictionary, famous Koreans, K-pop groups & members, iconic song titles, words foreigners love, and the most beautiful Hangul words — ordered by initial consonant.",
  alternates: { canonical: `${BASE}/korean-words` },
  openGraph: {
    title: "Korean Words to Know",
    description: "OED Korean words, K-pop members, song titles, and beautiful Hangul — in one compact page.",
    url: `${BASE}/korean-words`,
    type: "article",
  },
};


// ── Curated data ─────────────────────────────────────────────────────────────
const OED = ["한류","대박","먹방","애교","오빠","언니","누나","반찬","불고기","삼겹살","갈비","잡채","김밥","동치미","김치","막걸리","소주","한복","온돌","태권도","콩글리시","만화","트로트","스킨십","파이팅"];
const CELEBS = ["세종대왕","이순신","유관순","안중근","김구","한강","손흥민","이강인","김민재","황희찬","봉준호","박찬욱","송강호","이정재","마동석","박서준","차은우","임영웅","안세영","신유빈","김연아","김연경","박지성","류현진","백종원","유재석"];
const SONGS = ["강남스타일","봄날","좋은 날","벚꽃 엔딩","사건의 지평선","밤편지","첫사랑","너의 의미","빨간 맛","가시나","사랑을 했다","밤하늘의 별을"];
const POPULAR = ["사랑","안녕","감사","행복","친구","오빠","대박","김치","한국","화이팅","예쁘다","맛있다"];
const BEAUTIFUL = ["윤슬","미리내","노을","달빛","햇살","이슬","바람","하늘","별빛","단비","시나브로","그루잠","아름드리","산들바람","마음"];

const KPOP: { slug: string; group: string; members: string[]; words: string[] }[] = [
  { slug: "bts", group: "방탄소년단 (BTS)", members: ["진","슈가","제이홉","RM","지민","뷔","정국"],
    words: ["방탄소년단","보라해","아미","화양연화","피 땀 눈물","불타오르네","작은 것들을 위한 시","쩔어","아이돌"] },
  { slug: "blackpink", group: "블랙핑크 (BLACKPINK)", members: ["지수","제니","로제","리사"],
    words: ["블랙핑크","블링크","뚜두뚜두","마지막처럼"] },
  { slug: "bigbang", group: "빅뱅 (BIGBANG)", members: ["지드래곤","태양","탑","대성"],
    words: ["빅뱅","브이아이피","거짓말","뱅뱅뱅"] },
  { slug: "newjeans", group: "뉴진스 (NewJeans)", members: ["민지","하니","다니엘","해린","혜인"],
    words: ["뉴진스","하입보이","디토","어텐션"] },
  { slug: "aespa", group: "에스파 (aespa)", members: ["카리나","지젤","윈터","닝닝"],
    words: ["에스파","넥스트 레벨","도깨비불","마이"] },
  { slug: "ive", group: "아이브 (IVE)", members: ["안유진","가을","레이","장원영","리즈","이서"],
    words: ["아이브","러브 다이브","일레븐","다이브"] },
  { slug: "twice", group: "트와이스 (TWICE)", members: ["나연","정연","모모","사나","지효","미나","다현","채영","쯔위"],
    words: ["트와이스","원스","치얼업","필스페셜"] },
];

function Chip({ text }: { text: string }) {
  return (
    <Link
      href={`/?name=${encodeURIComponent(text)}`}
      className="px-3 py-1.5 text-sm bg-white border border-violet-100 rounded-full text-slate-700 hover:border-violet-300 hover:text-violet-700 hover:shadow-sm transition"
    >
      {text}
    </Link>
  );
}

function Section({ emoji, title, sub, words }: { emoji: string; title: string; sub: string; words: string[] }) {
  return (
    <section className="mb-7 last:mb-0">
      <h2 className="text-base font-semibold text-slate-800 flex items-center gap-1.5 mb-0.5">
        <span>{emoji}</span><span>{title}</span>
      </h2>
      <p className="text-xs text-slate-400 mb-2.5">{sub}</p>
      <div className="flex flex-wrap gap-1.5">
        {byConsonant(words).map((w) => <Chip key={w} text={w} />)}
      </div>
    </section>
  );
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Korean Words to Know",
  url: `${BASE}/korean-words`,
  hasPart: ARTISTS.map((a) => ({ "@type": "MusicGroup", name: a.en, alternateName: a.ko, url: `${BASE}/${a.slug}` })),
};

export default function KoreanWordsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 via-white to-purple-50/50 p-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-2xl mx-auto pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-violet-400 hover:text-violet-600 text-xs font-medium transition mb-6"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link>

        <header className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-violet-900 tracking-tight mb-1.5">
            Korean Words to Know <span className="text-violet-400">· 한글 단어</span>
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed">
            Tap any word to see it in Korean fonts and Hangul Art. Ordered by initial consonant —
            <span className="font-medium text-violet-500"> ㅇㅎ · ㅅㅈㅊ · ㅁㅂㅍ · ㄴㄷㅌㄹ · ㄱㅋ</span>.
          </p>
        </header>

        {/* Explore — related content pages */}
        <nav className="flex flex-wrap gap-1.5 mb-5">
          <Link href="/korean-sounds" className="px-3 py-1.5 text-xs font-medium bg-violet-600 text-white rounded-full hover:bg-violet-500 transition">
            🔊 소리결말·모양결말 (Onomatopoeia)
          </Link>
          <Link href="/name" className="px-3 py-1.5 text-xs font-medium bg-white border border-violet-200 text-violet-600 rounded-full hover:bg-violet-50 transition">
            🔤 Names in Korean
          </Link>
          <a href="#kpop" className="px-3 py-1.5 text-xs font-medium bg-white border border-violet-200 text-violet-600 rounded-full hover:bg-violet-50 transition">
            🎤 K-pop
          </a>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg shadow-violet-200/40 p-6 sm:p-8">
          <Section emoji="📖" title="Oxford English Dictionary" sub="옥스포드 영어 사전에 등재된 한글 단어" words={OED} />
          <Section emoji="⭐" title="Famous Koreans" sub="한국 유명인" words={CELEBS} />

          <section className="mb-7 scroll-mt-4" id="kpop">
            <h2 className="text-base font-semibold text-slate-800 flex items-center gap-1.5 mb-0.5">
              <span>🎤</span><span>K-pop Members</span>
            </h2>
            <p className="text-xs text-slate-400 mb-3">K-POP 그룹별 가수</p>
            <div className="space-y-4">
              {KPOP.map((g) => (
                <div key={g.group}>
                  <div className="text-xs font-medium text-violet-500 mb-1.5">
                    <Link href={`/${g.slug}`} className="hover:underline">{g.group} →</Link>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {byConsonant(g.members).map((m) => <Chip key={g.group + m} text={m} />)}
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                    <span className="text-[10px] text-slate-400 mr-0.5">자주 쓰는 말</span>
                    {byConsonant(g.words).map((w) => (
                      <Link
                        key={g.group + w}
                        href={`/?name=${encodeURIComponent(w)}`}
                        className="px-2.5 py-1 text-xs bg-violet-50 border border-violet-100 rounded-full text-violet-600 hover:border-violet-300 hover:bg-violet-100 transition"
                      >
                        {w}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <Section emoji="🎵" title="Iconic Song Titles" sub="주요 한글 노래 제목" words={SONGS} />
          <Section emoji="💜" title="Words Foreigners Love" sub="외국인들에게 인기 있는 단어" words={POPULAR} />
          <Section emoji="🌸" title="Beautiful Hangul Words" sub="아름다운 한글 단어 (순우리말)" words={BEAUTIFUL} />
        </div>

        <Link
          href="/"
          className="block text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition mt-6"
        >
          ← My Hangul Name
        </Link>
      </div>
    </div>
  );
}
