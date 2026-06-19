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

  const parts = text.trim().split(/\s+/);
  const lines = parts.length >= 2 ? [parts[0], parts.slice(1).join(" ")] : [text];
  const longestLen = Math.max(...lines.map((l) => l.length));
  const fontSize = Math.min(100, Math.floor(W * 0.88 / Math.max(longestLen, 1) * 1.3));
  const fs = Math.min(fontSize, 100);
  const lineH = fs * 1.25;

  const fontWeightStr = font.id === "hunmin-ebs" ? "900" : "bold";
  ctx.font = `${fontWeightStr} ${fs}px ${font.css}`;
  ctx.fillStyle = "#1e293b";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const totalH = lines.length * lineH;
  const startY = H / 2 - totalH / 2 - 10;
  lines.forEach((line, idx) => {
    ctx.fillText(line, W / 2, startY + lineH * idx + lineH / 2);
  });

  ctx.font = `400 18px NanumGothic, sans-serif`;
  ctx.fillStyle = "#94a3b8";
  ctx.fillText(originalName, W / 2, startY + totalH + 32);

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
