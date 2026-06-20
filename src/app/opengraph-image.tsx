import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "My Hangul Name — 내 이름을 한글로";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  const fontBold = readFileSync(join(process.cwd(), "public/fonts/NanumGothic-Bold.ttf"));
  const fontRegular = readFileSync(join(process.cwd(), "public/fonts/NanumGothic.ttf"));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 40%, #eff6ff 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "NanumGothic",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* 배경 장식 — 반투명 큰 '한' */}
        <div style={{
          position: "absolute", right: -30, top: -80,
          fontSize: 420, fontWeight: 700,
          color: "rgba(59,130,246,0.06)",
          fontFamily: "NanumGothic", lineHeight: 1, display: "flex",
        }}>한</div>

        {/* 세 자모 색 장식 */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#3b82f6", fontFamily: "NanumGothic", lineHeight: 1 }}>ㅎ</span>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#65a30d", fontFamily: "NanumGothic", lineHeight: 1 }}>ㅏ</span>
          <span style={{ fontSize: 56, fontWeight: 700, color: "#ef4444", fontFamily: "NanumGothic", lineHeight: 1 }}>ㄴ</span>
        </div>

        {/* 타이틀 */}
        <div style={{
          fontSize: 100, fontWeight: 700,
          color: "#1e293b",
          fontFamily: "NanumGothic",
          letterSpacing: "0.05em",
          lineHeight: 1, display: "flex",
        }}>한글이름</div>

        <div style={{
          fontSize: 50, fontWeight: 700,
          color: "#3b82f6",
          fontFamily: "NanumGothic",
          marginTop: 10, display: "flex",
        }}>My Hangul Name</div>

        <div style={{
          fontSize: 24, fontWeight: 400,
          color: "#64748b",
          fontFamily: "NanumGothic",
          marginTop: 22, display: "flex",
        }}>어떤 언어의 이름도 한글로 · Convert any name to Korean Hangul</div>

        {/* Wehome 배지 */}
        <div style={{
          display: "flex",
          marginTop: 36,
          padding: "8px 24px",
          background: "rgba(59,130,246,0.1)",
          borderRadius: 24,
          fontSize: 18, fontWeight: 400,
          color: "#3b82f6", fontFamily: "NanumGothic",
        }}>Powered by wehome.me</div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "NanumGothic", data: fontBold, style: "normal", weight: 700 },
        { name: "NanumGothic", data: fontRegular, style: "normal", weight: 400 },
      ],
    }
  );
}
