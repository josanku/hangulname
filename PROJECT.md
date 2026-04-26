# My Name in Hangul — 개발 문서

영문 이름 및 다국어 이름을 한글로 변환하는 Next.js 웹 애플리케이션.

---

## 기술 스택

| 항목 | 내용 |
|------|------|
| 프레임워크 | Next.js 16 (App Router, TypeScript) |
| 스타일 | Tailwind CSS v4 |
| AI | Anthropic Claude API (`claude-sonnet-4-6`) |
| 음성 | Web Speech API (브라우저 내장, 무료) |
| 폰트 | 자체 호스팅 woff/woff2 (`public/fonts/`) |

---

## 주요 기능

### 1. 이름 → 한글 변환
- 입력 언어 자동 감지 (영어·중국어·일본어·아랍어·러시아어 등)
- **철자가 아닌 실제 발음(음성학) 기준** 변환
- 국립국어원 외래어 표기법 준수
- Claude API 시스템 프롬프트로 품질 확보

### 2. 국가별 발음 변형
- 같은 이름도 국가마다 발음이 다른 경우 각각 카드로 표시
- 예: Caroline → 🇺🇸 캐롤라인/캐롤린 · 🇫🇷 카롤린 · 🇩🇪 카롤리네

### 3. 한글 표기 옵션 (카드당 최대 3개)
- **주요 표기**: 공식 외래어 표기법 기준
- **대안 표기**: 실제로 통용되는 대안 (복수 존재 시)
- **실제 발음**: 공식 표기와 다를 경우 원음에 가까운 표현

### 4. 발음 듣기 (TTS)
- **원어 발음**: 입력 언어 그대로의 TTS (zh-CN, ja-JP, ar-SA 등)
- **한글 발음**: 변환된 한글을 ko-KR TTS로 재생
- 여성 음성 우선 선택 + pitch 1.1
- 각 표기마다 개별 스피커 버튼

### 5. 폰트 미리보기 팝업 & 이미지 다운로드
복사 버튼 옆 **T 아이콘** → 팝업에서 6가지 폰트로 크게 표시 (볼드)

| 폰트 | 분류 | 파일 |
|------|------|------|
| 궁서 | 송명 계열 (전통 세리프) | JSongMyung.woff2 |
| 명조 | 세리프 | NanumMyeongjo.woff2 + Bold |
| 고딕 | 산세리프 | NanumGothic.woff2 + Bold |
| 훈민정음 (한컴) | **실제 한컴 훈민정음 가로쓰기** | HancomHunminjeongeum.woff |
| 훈민정음 (EBS) | **실제 EBS 훈민정음체** | EBSHunminjeongeum.woff |
| Pretendard | 현대 변수 폰트 | PretendardVariable.woff2 |

- 모든 폰트 `public/fonts/` 자체 호스팅 → 사용자 PC에 폰트 없어도 동작
- **PNG 다운로드**: Canvas 2x 해상도, 한글 이름(볼드) + 원어 이름 하단 표시

### 6. 다국어 UI (19개 언어)
브라우저 언어 자동 감지, 우상단 드롭다운으로 수동 변경

지원: 한국어 · English · 中文 · 日本語 · Español · Français · Deutsch · العربية · Русский · Português · Tiếng Việt · Bahasa Indonesia · ภาษาไทย · Bahasa Melayu · हिन्दी · বাংলা · Filipino · မြန်မာ · Монгол

- 국가명·설명 텍스트도 뷰어 언어로 반환 (API에 `uiLang` 전달)
- 아랍어 접속 시 RTL 레이아웃 자동 전환

### 7. 부가 기능
- **복사 버튼**: 각 표기마다 클립보드 복사
- **변환 카운터**: localStorage 누적 (세션 넘어도 유지)
- **피드백**: 좋아요/아쉬워요 (뷰어 언어로 표시)

---

## 파일 구조

```
sky/
├── src/
│   ├── app/
│   │   ├── api/transliterate/route.ts   # Claude API, 다국어 국가명 처리
│   │   ├── page.tsx                      # 메인 UI
│   │   ├── layout.tsx                    # HTML 레이아웃
│   │   └── globals.css                   # @font-face (자체 호스팅)
│   ├── components/
│   │   └── FontModal.tsx                 # 폰트 미리보기 + PNG 다운로드
│   └── lib/
│       ├── i18n.ts                       # 19개 언어 번역 + 언어 감지
│       └── transliterate.ts              # (미사용) 규칙 기반 변환 초기 버전
├── public/
│   └── fonts/                            # 자체 호스팅 폰트 파일들
│       ├── JSongMyung.woff2              # 궁서 (송명체)
│       ├── NanumMyeongjo.woff2           # 명조 Regular
│       ├── NanumMyeongjo-Bold.woff2      # 명조 Bold
│       ├── NanumGothic.woff2             # 고딕 Regular
│       ├── NanumGothic-Bold.woff2        # 고딕 Bold
│       ├── HancomHunminjeongeum.woff     # 한컴 훈민정음 가로쓰기 (실제)
│       ├── EBSHunminjeongeum.woff        # EBS 훈민정음체 (실제)
│       ├── NotoSerifKR.woff2             # (미사용, 보관)
│       ├── GowunBatang.woff2             # (미사용, 보관)
│       ├── Hahmlet.woff2                 # (미사용, 보관)
│       └── PretendardVariable.woff2      # Pretendard 변수 폰트
├── .env.local                            # ANTHROPIC_API_KEY (git 제외)
└── PROJECT.md                            # 이 문서
```

---

## 환경 설정

```bash
# .env.local
ANTHROPIC_API_KEY=sk-ant-...

# 개발 서버
npm run dev       # http://localhost:3000

# 프로덕션 빌드
npm run build && npm start
```

---

## API 스펙

### `POST /api/transliterate`

**Request**
```json
{ "name": "Caroline", "uiLang": "en" }
```

**Response**
```json
{
  "sourceLang": "en-US",
  "variants": [
    {
      "country": "United States",
      "flag": "🇺🇸",
      "options": ["캐롤라인", "캐롤린"],
      "phonetic": "캘로린",
      "ipa": "/ˈkærəlaɪn/"
    },
    {
      "country": "France",
      "flag": "🇫🇷",
      "options": ["카롤린"],
      "phonetic": "",
      "ipa": "/kaʁɔlin/"
    }
  ],
  "origin": "Feminine form of Carolus (Charles), widely used across Europe"
}
```

---

## 폰트 출처 및 라이선스

| 폰트 파일 | 출처 | 라이선스 |
|-----------|------|---------|
| JSongMyung.woff2 | projectnoonnu/noonfonts_2110 | OFL |
| NanumMyeongjo*.woff2 | @fontsource/nanum-myeongjo | OFL |
| NanumGothic*.woff2 | @fontsource/nanum-gothic | OFL |
| HancomHunminjeongeum.woff | projectnoonnu/2406-1 (한글과컴퓨터) | 공개 배포 |
| EBSHunminjeongeum.woff | projectnoonnu/noonfonts_one (EBS) | 공개 배포 |
| PretendardVariable.woff2 | orioncactus/pretendard (npm) | OFL |

---

## 개발 히스토리

| 날짜 | 작업 |
|------|------|
| 2026-04-25 | Next.js 초기화, 규칙 기반 변환 구현 |
| | Claude API 연동, 음성학 기반 변환 전환 |
| | 국가별 발음 변형 카드 UI |
| | Web Speech API TTS (원어 + 한글) |
| | 19개 언어 i18n, 아랍어 RTL 지원 |
| | 폰트 미리보기 팝업 + PNG 다운로드 |
| | 폰트 자체 호스팅 (public/fonts/) |
| | 국가명·설명 다국어화 (uiLang) |
| 2026-04-26 | 한컴 훈민정음 가로쓰기 실제 폰트 적용 |
| | PNG 다운로드에 원어 이름 표시 |
| | 모든 이름 볼드 표시 |
| | 작업 내용 최종 커밋 |
