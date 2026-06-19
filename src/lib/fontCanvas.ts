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

interface Jamo { ch: string; color: JamoColor }
interface Group { jamos: Jamo[]; space: boolean }

function mk(ch: string): Jamo {
  return { ch, color: jamoColor(ch) };
}

// 음절을 초성/중성/종성 자모로 분리하고, 음절 단위 그룹 배열로 반환
function toGroups(text: string): Group[] {
  const groups: Group[] = [];
  for (const ch of text) {
    const code = ch.codePointAt(0) ?? 0;
    if (code >= 0xac00 && code <= 0xd7a3) {
      const s = code - 0xac00;
      const l = Math.floor(s / 588);
      const v = Math.floor((s % 588) / 28);
      const t = s % 28;
      const jamos = [mk(CHOSEONG[l]), mk(JUNGSEONG[v])];
      if (t > 0) jamos.push(mk(JONGSEONG[t]));
      groups.push({ jamos, space: false });
    } else if (code >= 0x3131 && code <= 0x3163) {
      groups.push({ jamos: [mk(ch)], space: false });
    } else if (/\s/.test(ch)) {
      groups.push({ jamos: [{ ch: " ", color: "default" }], space: true });
    } else {
      groups.push({ jamos: [{ ch, color: "default" }], space: false });
    }
  }
  return groups;
}

export async function buildFontCanvas({ text, originalName, font }: BuildArgs): Promise<HTMLCanvasElement> {
  await document.fonts.load(`bold 80px ${font.css}`);

  const SCALE = 2;
  const W = 640, H = 360;
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);

  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#f8fafc");
  grad.addColorStop(1, "#eff6ff");
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, 24);
  ctx.fill();

  const groups = toGroups(text.trim());
  const weight = font.id === "hunmin-ebs" ? "900" : "bold";
  const maxW = W * 0.9;

  // 주어진 글자 크기로 그룹을 측정하고 줄바꿈한다
  type Item = { jamos: Jamo[]; w: number; space: boolean; gapBefore: number };
  const layout = (fs: number) => {
    ctx.font = `${weight} ${fs}px ${font.css}`;
    const intra = fs * 0.04;   // 음절 내 자모 간격
    const inter = fs * 0.30;   // 음절 간 간격
    const spaceW = fs * 0.45;  // 공백 폭
    const lines: { items: Item[]; width: number }[] = [];
    let cur: Item[] = [];
    let curW = 0;
    for (const g of groups) {
      let w: number;
      if (g.space) {
        w = spaceW;
      } else {
        w = 0;
        g.jamos.forEach((j, i) => { w += ctx.measureText(j.ch).width + (i > 0 ? intra : 0); });
      }
      const gap = cur.length ? inter : 0;
      if (cur.length && curW + gap + w > maxW) {
        lines.push({ items: cur, width: curW });
        cur = [];
        curW = 0;
      }
      const gapBefore = cur.length ? inter : 0;
      cur.push({ jamos: g.jamos, w, space: g.space, gapBefore });
      curW += gapBefore + w;
    }
    if (cur.length) lines.push({ items: cur, width: curW });
    return { lines, intra };
  };

  // 세로로도 들어맞을 때까지 글자 크기를 줄인다
  let fs = 96;
  let lay = layout(fs);
  while (lay.lines.length * fs * 1.3 > H * 0.6 && fs > 30) {
    fs -= 6;
    lay = layout(fs);
  }

  ctx.font = `${weight} ${fs}px ${font.css}`;
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const lineH = fs * 1.3;
  const blockH = lay.lines.length * lineH;
  const startY = (H - blockH) / 2 - 16;

  lay.lines.forEach((line, idx) => {
    const y = startY + lineH * idx + lineH / 2;
    let x = (W - line.width) / 2;
    for (const item of line.items) {
      x += item.gapBefore;
      if (item.space) { x += item.w; continue; }
      item.jamos.forEach((j, i) => {
        if (i > 0) x += lay.intra;
        ctx.fillStyle = JAMO_COLORS[j.color];
        ctx.fillText(j.ch, x, y);
        x += ctx.measureText(j.ch).width;
      });
    }
  });

  ctx.textAlign = "center";
  ctx.font = `400 18px NanumGothic, sans-serif`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(originalName, W / 2, startY + blockH + 30);

  ctx.font = `400 13px NanumGothic, sans-serif`;
  ctx.fillStyle = "#cbd5e1";
  ctx.textAlign = "right";
  ctx.fillText("name.hangulmaru.com", W - 20, H - 14);

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
