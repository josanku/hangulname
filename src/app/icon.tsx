import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default async function Icon() {
  const font = readFileSync(join(process.cwd(), "public/fonts/NanumGothic-Bold.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: 64, height: 64,
          borderRadius: 14,
          background: "white",
          border: "2px solid #ddd6fe",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* "한" = ㅎ(파랑) + ㅏ(초록) + ㄴ(빨강) — 자모 색상 규칙과 동일 */}
        {/* ㅎ — 파랑 */}
        <div style={{
          position: "absolute", top: 0, left: 6,
          fontSize: 32, fontWeight: 700,
          color: "#2563eb", fontFamily: "NanumGothic", lineHeight: 1,
          display: "flex",
        }}>ㅎ</div>
        {/* ㅏ — 초록 */}
        <div style={{
          position: "absolute", top: 9, right: 6,
          fontSize: 33, fontWeight: 700,
          color: "#16a34a", fontFamily: "NanumGothic", lineHeight: 1,
          display: "flex",
        }}>ㅏ</div>
        {/* ㄴ — 빨강 */}
        <div style={{
          position: "absolute", bottom: 0, left: 6,
          fontSize: 31, fontWeight: 700,
          color: "#dc2626", fontFamily: "NanumGothic", lineHeight: 1,
          display: "flex",
        }}>ㄴ</div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "NanumGothic", data: font, style: "normal", weight: 700 }],
    }
  );
}
