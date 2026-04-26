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
          border: "2.5px solid #e2e8f0",
          display: "flex",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* ㅎ — 파랑 */}
        <div style={{
          position: "absolute", top: 1, left: 4,
          fontSize: 28, fontWeight: 700,
          color: "#3b82f6", fontFamily: "NanumGothic", lineHeight: 1,
          display: "flex",
        }}>ㅎ</div>
        {/* ㅏ — 라임 */}
        <div style={{
          position: "absolute", top: 14, right: 5,
          fontSize: 23, fontWeight: 700,
          color: "#65a30d", fontFamily: "NanumGothic", lineHeight: 1,
          display: "flex",
        }}>ㅏ</div>
        {/* ㄴ — 빨강 */}
        <div style={{
          position: "absolute", bottom: 2, left: 5,
          fontSize: 23, fontWeight: 700,
          color: "#ef4444", fontFamily: "NanumGothic", lineHeight: 1,
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
