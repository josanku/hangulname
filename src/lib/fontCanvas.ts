export const FONTS = [
  // 훈민정음 두 종을 맨 앞에
  { id: "hunmin-hancom", labelKo: "훈민정음(한컴)", labelEn: "Hunminjeongeum(Hancom)", css: "HancomHunminjeongeum, serif" },
  { id: "hunmin-ebs",    labelKo: "훈민정음(EBS)", labelEn: "Hunminjeongeum(EBS)",   css: "EBSHunminjeongeum, serif" },
  { id: "gungsuh",       labelKo: "궁서",          labelEn: "Gungsuh",               css: "JSongMyung, serif" },
  { id: "myeongjo",      labelKo: "명조",          labelEn: "Myeongjo",              css: "NanumMyeongjo, serif" },
  { id: "gothic",        labelKo: "고딕",          labelEn: "Gothic",                css: "NanumGothic, sans-serif" },
  { id: "pretendard",    labelKo: "Pretendard",    labelEn: "Pretendard",            css: "Pretendard, sans-serif" },
  { id: "gowun-batang",  labelKo: "고운바탕",  labelEn: "Gowun Batang",  css: "GowunBatang, serif" },
  { id: "hahmlet",       labelKo: "함렛",      labelEn: "Hahmlet",       css: "Hahmlet, serif" },
  { id: "brush",         labelKo: "나눔붓글씨", labelEn: "Brush Script",  css: "'Nanum Brush Script', cursive" },
  { id: "black-han",     labelKo: "검은고딕",  labelEn: "Black Han",     css: "'Black Han Sans', sans-serif" },
  { id: "gaegu",         labelKo: "개구",      labelEn: "Gaegu",         css: "Gaegu, cursive" },
  { id: "do-hyeon",      labelKo: "배민 도현체", labelEn: "Do Hyeon",      css: "'Do Hyeon', sans-serif" },
  // 인기 폰트 (배민체 등)
  { id: "jua",           labelKo: "배민 주아체",  labelEn: "Jua",            css: "'Jua', sans-serif" },
  { id: "yeon-sung",     labelKo: "배민 연성체",  labelEn: "Yeon Sung",      css: "'Yeon Sung', cursive" },
  { id: "kirang",        labelKo: "배민 기랑해랑", labelEn: "Kirang Haerang", css: "'Kirang Haerang', cursive" },
  { id: "nanum-pen",     labelKo: "나눔손글씨 펜", labelEn: "Nanum Pen",      css: "'Nanum Pen Script', cursive" },
  { id: "gugi",          labelKo: "구기",         labelEn: "Gugi",           css: "'Gugi', cursive" },
  { id: "gamja",         labelKo: "감자꽃",       labelEn: "Gamja Flower",   css: "'Gamja Flower', cursive" },
  { id: "hi-melody",     labelKo: "하이멜로디",   labelEn: "Hi Melody",      css: "'Hi Melody', cursive" },
  { id: "single-day",    labelKo: "싱글데이",     labelEn: "Single Day",     css: "'Single Day', cursive" },
  // 상상꽃길체는 맨 끝
  { id: "flower-road",   labelKo: "상상꽃길체",   labelEn: "SangSang Flower Road", css: "SangSangFlowerRoad, cursive" },
] as const;

export type Font = typeof FONTS[number];

interface BuildArgs {
  text: string;
  originalName: string;
  font: Font;
  // When true, color each jamo by category; default renders plain black.
  colorize?: boolean;
  // Optional text/background overrides; default keeps the dark-on-gradient look.
  textColor?: string;
  bgColor?: string;
}

// ─── Jamo coloring (오방색 계열, 발음 위치 기준) ──────────────────────────────
type JamoColor = "blue" | "green" | "red" | "default";

const JAMO_COLORS: Record<JamoColor, string> = {
  blue: "#2563eb",
  green: "#16a34a",
  red: "#dc2626",
  default: "#1e293b",
};

const CHOSEONG = ["ㄱ","ㄲ","ㄴ","ㄷ","ㄸ","ㄹ","ㅁ","ㅂ","ㅃ","ㅅ","ㅆ","ㅇ","ㅈ","ㅉ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];
const JUNGSEONG = ["ㅏ","ㅐ","ㅑ","ㅒ","ㅓ","ㅔ","ㅕ","ㅖ","ㅗ","ㅘ","ㅙ","ㅚ","ㅛ","ㅜ","ㅝ","ㅞ","ㅟ","ㅠ","ㅡ","ㅢ","ㅣ"];
const JONGSEONG = ["","ㄱ","ㄲ","ㄳ","ㄴ","ㄵ","ㄶ","ㄷ","ㄹ","ㄺ","ㄻ","ㄼ","ㄽ","ㄾ","ㄿ","ㅀ","ㅁ","ㅂ","ㅄ","ㅅ","ㅆ","ㅇ","ㅈ","ㅊ","ㅋ","ㅌ","ㅍ","ㅎ"];

const C_BLUE = new Set(["ㅇ", "ㅎ"]);          // 후음 (throat)
const C_GREEN = new Set(["ㅅ", "ㅆ", "ㅈ", "ㅉ", "ㅊ"]); // 치음 (teeth)
const V_RED = new Set(["ㅡ", "ㅗ", "ㅜ", "ㅛ", "ㅠ"]);   // 가로(천지) 계열 모음

function jamoColor(ch: string): JamoColor {
  const code = ch.codePointAt(0) ?? 0;
  const isConsonant = code >= 0x3131 && code <= 0x314e; // ㄱ..ㅎ
  const isVowel = code >= 0x314f && code <= 0x3163;     // ㅏ..ㅣ
  if (isConsonant) {
    if (C_BLUE.has(ch)) return "blue";
    if (C_GREEN.has(ch)) return "green";
    return "red"; // 순음·설음·아음 및 겹받침
  }
  if (isVowel) return V_RED.has(ch) ? "red" : "green"; // 세로 계열은 초록
  return "default";
}

// 가로(아래 배치) 모음 / 복합 모음의 중성 인덱스 (JUNGSEONG 기준)
const HORIZ_V = new Set([8, 12, 13, 17, 18]);          // ㅗ ㅛ ㅜ ㅠ ㅡ
const COMPLEX_V = new Set([9, 10, 11, 14, 15, 16, 19]); // ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ

interface Region { x0: number; y0: number; x1: number; y1: number; color: JamoColor }

// 음절 글자는 온전히 유지하되, 초성·중성·종성이 놓이는 위치별로
// 클립 영역을 나눠 각각의 자모 색으로 칠한다.
function syllableRegions(
  l: number, v: number, t: number,
  L: number, T: number, R: number, B: number,
): Region[] {
  const Wd = R - L, H = B - T;
  const cInit = jamoColor(CHOSEONG[l]);
  const cVow = jamoColor(JUNGSEONG[v]);
  const cFin = t > 0 ? jamoColor(JONGSEONG[t]) : "default";
  const hasT = t > 0;
  const out: Region[] = [];
  const push = (x0: number, y0: number, x1: number, y1: number, color: JamoColor) =>
    out.push({ x0, y0, x1, y1, color });

  if (HORIZ_V.has(v)) {
    // 가로 모음: 초성(위) · 중성(중간) · [종성(아래)]
    if (hasT) {
      const y1 = T + H * 0.40, y2 = B - H * 0.30;
      push(L, T, R, y1, cInit);
      push(L, y1, R, y2, cVow);
      push(L, y2, R, B, cFin);
    } else {
      const y1 = T + H * 0.52;
      push(L, T, R, y1, cInit);
      push(L, y1, R, B, cVow);
    }
  } else if (COMPLEX_V.has(v)) {
    // 복합 모음(ㅘ 등): 근사 — 초성(좌상) · 중성(우측+좌하) · [종성(아래)]
    const splitX = L + Wd * 0.5;
    const by = hasT ? B - H * 0.30 : B;
    const midY = T + H * 0.55;
    push(L, T, splitX, midY, cInit);
    push(splitX, T, R, by, cVow);
    push(L, midY, splitX, by, cVow);
    if (hasT) push(L, by, R, B, cFin);
  } else {
    // 세로 모음: 초성(좌) · 중성(우) · [종성(아래)]
    const splitX = L + Wd * 0.55;
    if (hasT) {
      const by = B - H * 0.30;
      push(L, T, splitX, by, cInit);
      push(splitX, T, R, by, cVow);
      push(L, by, R, B, cFin);
    } else {
      push(L, T, splitX, B, cInit);
      push(splitX, T, R, B, cVow);
    }
  }
  return out;
}

export async function buildFontCanvas({ text, originalName, font, colorize = false, textColor, bgColor }: BuildArgs): Promise<HTMLCanvasElement> {
  const weight = font.id === "hunmin-ebs" ? "900" : "bold";
  // Load the regular (400) face first so single-weight fonts (brush, Baemin,
  // etc.) actually load — otherwise requesting only the bold face, which they
  // lack, leaves the font unloaded and the canvas falls back to a default font.
  await document.fonts.load(`80px ${font.css}`);
  try { await document.fonts.load(`${weight} 80px ${font.css}`); } catch { /* no bold/heavy face */ }
  // give font registration a tick to settle (some browsers resolve load() early)
  if (document.fonts.status !== "loaded") { try { await document.fonts.ready; } catch { /* noop */ } }

  const SCALE = 2;
  const W = 640, H = 360;
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);

  const baseColor = textColor ?? JAMO_COLORS.default;

  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 24);
  if (bgColor) {
    ctx.fillStyle = bgColor;
  } else {
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#f8fafc");
    grad.addColorStop(1, "#eff6ff");
    ctx.fillStyle = grad;
  }
  ctx.fill();

  const chars = Array.from(text.trim());
  const maxW = W * 0.9;

  // 주어진 글자 크기로 음절을 줄바꿈 (한글은 공백이 없어 글자 단위로 줄넘김)
  const layout = (fs: number) => {
    ctx.font = `${weight} ${fs}px ${font.css}`;
    const lines: { items: { ch: string; w: number }[]; width: number }[] = [];
    let cur: { ch: string; w: number }[] = [];
    let curW = 0;
    for (const ch of chars) {
      const w = ctx.measureText(ch).width;
      if (cur.length && curW + w > maxW) {
        lines.push({ items: cur, width: curW });
        cur = [];
        curW = 0;
      }
      cur.push({ ch, w });
      curW += w;
    }
    if (cur.length) lines.push({ items: cur, width: curW });
    return lines;
  };

  // 세로로도 들어맞을 때까지 글자 크기를 줄인다
  let fs = 100;
  let lines = layout(fs);
  while (lines.length * fs * 1.28 > H * 0.62 && fs > 32) {
    fs -= 6;
    lines = layout(fs);
  }

  ctx.font = `${weight} ${fs}px ${font.css}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const lineH = fs * 1.28;
  const blockH = lines.length * lineH;
  const startY = (H - blockH) / 2 - 16;

  // 한 글자를 그린다 (colorize일 때만 위치별 색 적용)
  const drawChar = (ch: string, penX: number, cy: number) => {
    if (!colorize) {
      ctx.fillStyle = baseColor;
      ctx.fillText(ch, penX, cy);
      return;
    }
    const code = ch.codePointAt(0) ?? 0;
    const m = ctx.measureText(ch);
    const aT = m.actualBoundingBoxAscent || fs * 0.5;
    const aD = m.actualBoundingBoxDescent || fs * 0.18;
    const T = cy - aT, B = cy + aD;
    const L = penX, R = penX + m.width;

    if (code >= 0xac00 && code <= 0xd7a3) {
      const s = code - 0xac00;
      const l = Math.floor(s / 588);
      const v = Math.floor((s % 588) / 28);
      const t = s % 28;
      for (const rg of syllableRegions(l, v, t, L, T, R, B)) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(rg.x0, rg.y0, rg.x1 - rg.x0, rg.y1 - rg.y0);
        ctx.clip();
        ctx.fillStyle = JAMO_COLORS[rg.color];
        ctx.fillText(ch, penX, cy);
        ctx.restore();
      }
    } else {
      // 낱자모·기타 문자: 한 색으로
      ctx.fillStyle = JAMO_COLORS[jamoColor(ch)];
      ctx.fillText(ch, penX, cy);
    }
  };

  lines.forEach((line, idx) => {
    const y = startY + lineH * idx + lineH / 2;
    let x = (W - line.width) / 2;
    for (const item of line.items) {
      drawChar(item.ch, x, y);
      x += item.w;
    }
  });

  ctx.textAlign = "center";
  ctx.font = `400 18px NanumGothic, sans-serif`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(originalName, W / 2, startY + blockH + 30);

  ctx.font = `400 13px NanumGothic, sans-serif`;
  ctx.fillStyle = "#cbd5e1";
  ctx.textAlign = "right";
  ctx.fillText("myhangulname.com", W - 20, H - 14);

  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement): Promise<Blob> {
  return new Promise((resolve, reject) =>
    canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("blob failed"))), "image/png")
  );
}

export function downloadCanvasPng(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) { resolve(); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      if (/iP(hone|ad|od)/i.test(navigator.userAgent)) {
        a.target = "_blank";
        a.rel = "noopener";
      }
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => { URL.revokeObjectURL(url); resolve(); }, 1000);
    }, "image/png");
  });
}

function isMobileLike(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iP(hone|ad|od)|Mobile/i.test(navigator.userAgent);
}

/**
 * Save a canvas image. On mobile, opens the native share sheet so the user
 * can "Save to Photos / 이미지 저장"; on desktop (or if share is unavailable),
 * falls back to a normal file download.
 */
export async function saveCanvasImage(canvas: HTMLCanvasElement, filename: string): Promise<void> {
  const blob = await new Promise<Blob | null>((res) => canvas.toBlob((b) => res(b), "image/png"));
  if (!blob) return;
  const file = new File([blob], filename, { type: "image/png" });
  const nav = navigator as Navigator & { canShare?: (d?: ShareData) => boolean };
  if (isMobileLike() && nav.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return; // user cancelled
      // otherwise fall through to download
    }
  }
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  if (/iP(hone|ad|od)/i.test(navigator.userAgent)) { a.target = "_blank"; a.rel = "noopener"; }
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
