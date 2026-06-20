import { FONTS } from "@/lib/fontCanvas";

// Fonts offered on the name card (a curated, pretty subset).
export const CARD_FONT_IDS = ["flower-road", "brush", "nanum-pen", "myeongjo", "gothic", "jua"] as const;
export const CARD_FONTS = CARD_FONT_IDS
  .map((id) => FONTS.find((f) => f.id === id))
  .filter(Boolean) as typeof FONTS[number][];

interface CardArgs {
  korean: string;
  original: string;
  pronun?: string;
  tagline?: string;
  font: typeof FONTS[number];
  qr?: HTMLImageElement | null;
}

function roundRectPath(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

/** Render a shareable K-pop-photocard-style name card (vertical 2:3). */
export async function buildNameCard({ korean, original, pronun, tagline, font, qr }: CardArgs): Promise<HTMLCanvasElement> {
  await document.fonts.load(`bold 120px ${font.css}`);
  await document.fonts.load(`600 26px NanumGothic, sans-serif`);

  const SCALE = 2;
  const W = 750, H = 1125;
  const canvas = document.createElement("canvas");
  canvas.width = W * SCALE;
  canvas.height = H * SCALE;
  const ctx = canvas.getContext("2d")!;
  ctx.scale(SCALE, SCALE);

  // Card background — pastel holographic gradient
  const grad = ctx.createLinearGradient(0, 0, W, H);
  grad.addColorStop(0, "#eef2ff");
  grad.addColorStop(0.45, "#faf5ff");
  grad.addColorStop(1, "#fde7f3");
  roundRectPath(ctx, 0, 0, W, H, 40);
  ctx.fillStyle = grad;
  ctx.fill();

  // Glossy diagonal highlight (holographic feel)
  ctx.save();
  roundRectPath(ctx, 0, 0, W, H, 40);
  ctx.clip();
  const gloss = ctx.createLinearGradient(0, 0, W, H);
  gloss.addColorStop(0.0, "rgba(255,255,255,0)");
  gloss.addColorStop(0.45, "rgba(255,255,255,0.35)");
  gloss.addColorStop(0.5, "rgba(255,255,255,0.0)");
  ctx.fillStyle = gloss;
  ctx.beginPath();
  ctx.moveTo(-200, H); ctx.lineTo(W * 0.45, 0); ctx.lineTo(W * 0.62, 0); ctx.lineTo(-40, H);
  ctx.fill();

  // Faint big 한
  ctx.font = `bold 360px NanumGothic, serif`;
  ctx.fillStyle = "rgba(139,92,246,0.06)";
  ctx.textAlign = "right";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("한", W + 30, H - 40);
  ctx.restore();

  // Inner border
  roundRectPath(ctx, 14, 14, W - 28, H - 28, 30);
  ctx.strokeStyle = "rgba(139,92,246,0.28)";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Header label
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `600 24px NanumGothic, sans-serif`;
  ctx.fillStyle = "#a78bfa";
  try { ctx.letterSpacing = "7px"; } catch { /* older browsers */ }
  ctx.fillText("MY HANGUL NAME", W / 2 + 4, 92);
  try { ctx.letterSpacing = "0px"; } catch { /* noop */ }

  // ㅇㅅㅁ brand shapes
  const cy = 150, sz = 22, gap = 26;
  const total = sz * 3 + gap * 2;
  let sx = W / 2 - total / 2;
  ctx.fillStyle = "#2563eb"; ctx.beginPath(); ctx.arc(sx + sz / 2, cy, sz / 2, 0, Math.PI * 2); ctx.fill(); sx += sz + gap;
  ctx.fillStyle = "#16a34a"; ctx.beginPath(); ctx.moveTo(sx + sz / 2, cy - sz / 2); ctx.lineTo(sx + sz, cy + sz / 2); ctx.lineTo(sx, cy + sz / 2); ctx.closePath(); ctx.fill(); sx += sz + gap;
  ctx.fillStyle = "#dc2626"; roundRectPath(ctx, sx, cy - sz / 2, sz, sz, 4); ctx.fill();

  // Main Korean name — auto-fit
  const maxW = W * 0.82;
  const weight = font.id === "hunmin-ebs" ? "900" : "bold";
  let fs = 168;
  ctx.font = `${weight} ${fs}px ${font.css}`;
  while (ctx.measureText(korean).width > maxW && fs > 56) {
    fs -= 6;
    ctx.font = `${weight} ${fs}px ${font.css}`;
  }
  ctx.fillStyle = "#3b1d8f";
  ctx.fillText(korean, W / 2, 440);

  // Original name
  ctx.font = `400 34px NanumGothic, sans-serif`;
  ctx.fillStyle = "#64748b";
  ctx.fillText(original, W / 2, 600);

  let y = 662;
  // Pronunciation pill
  if (pronun) {
    ctx.font = `500 25px NanumGothic, sans-serif`;
    const pw = ctx.measureText(pronun).width + 44;
    roundRectPath(ctx, W / 2 - pw / 2, y - 24, pw, 48, 24);
    ctx.fillStyle = "rgba(139,92,246,0.12)";
    ctx.fill();
    ctx.fillStyle = "#7c3aed";
    ctx.fillText(pronun, W / 2, y);
    y += 70;
  }

  // Tagline (wrap to 2 lines)
  if (tagline) {
    ctx.font = `400 23px NanumGothic, sans-serif`;
    ctx.fillStyle = "#94a3b8";
    const words = tagline.split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const t = cur ? cur + " " + w : w;
      if (ctx.measureText(t).width > maxW && cur) { lines.push(cur); cur = w; }
      else cur = t;
    }
    if (cur) lines.push(cur);
    lines.slice(0, 2).forEach((ln, i) => ctx.fillText(ln, W / 2, y + i * 30));
  }

  // Footer: url (left) + QR (bottom-right)
  ctx.textAlign = "left";
  ctx.font = `600 26px NanumGothic, sans-serif`;
  ctx.fillStyle = "#7c3aed";
  ctx.fillText("myhangulname.com", 56, H - 92);
  ctx.font = `400 20px NanumGothic, sans-serif`;
  ctx.fillStyle = "#a78bfa";
  ctx.fillText("Your name in Korean ✨", 56, H - 60);

  if (qr) {
    const q = 132;
    ctx.drawImage(qr, W - 56 - q, H - 56 - q, q, q);
  }

  return canvas;
}

/** Build a QR image (qr-code-styling) for the share URL, drawn onto the card. */
export async function makeQrImage(url: string): Promise<HTMLImageElement | null> {
  try {
    const QRCodeStyling = (await import("qr-code-styling")).default;
    const qr = new QRCodeStyling({
      width: 300, height: 300, data: url, margin: 0,
      dotsOptions: { color: "#4c1d95", type: "rounded" },
      cornersSquareOptions: { color: "#7c3aed", type: "extra-rounded" },
      backgroundOptions: { color: "#ffffff" },
    });
    const raw = await qr.getRawData("png");
    if (!raw) return null;
    const blob = raw instanceof Blob ? raw : new Blob([raw as BlobPart], { type: "image/png" });
    const dataUrl = await new Promise<string>((res) => {
      const fr = new FileReader();
      fr.onload = () => res(fr.result as string);
      fr.readAsDataURL(blob);
    });
    return await new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.onload = () => res(img);
      img.onerror = rej;
      img.src = dataUrl;
    });
  } catch {
    return null;
  }
}
