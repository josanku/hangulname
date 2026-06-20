import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "My Hangul Name — 나의 한글 이름";
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
          background: "linear-gradient(135deg, #f5f3ff 0%, #ede9fe 48%, #faf5ff 100%)",
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
          position: "absolute", right: -40, top: -90,
          fontSize: 440, fontWeight: 700,
          color: "rgba(139,92,246,0.08)",
          fontFamily: "NanumGothic", lineHeight: 1, display: "flex",
        }}>한</div>

        {/* 브랜드 도형: ㅇ(파랑 원) · ㅅ(초록 세모) · ㅁ(빨강 네모) */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: 26 }}>
          <div style={{ width: 46, height: 46, borderRadius: 46, background: "#2563eb", display: "flex" }} />
          <svg width="50" height="46" viewBox="0 0 50 46">
            <polygon points="25,2 48,44 2,44" fill="#16a34a" />
          </svg>
          <div style={{ width: 44, height: 44, borderRadius: 8, background: "#dc2626", display: "flex" }} />
        </div>

        {/* 타이틀 */}
        <div style={{
          fontSize: 104, fontWeight: 700,
          color: "#4c1d95",
          fontFamily: "NanumGothic",
          letterSpacing: "-0.01em",
          lineHeight: 1, display: "flex",
        }}>My Hangul Name</div>

        <div style={{
          fontSize: 58, fontWeight: 700,
          color: "#8b5cf6",
          fontFamily: "NanumGothic",
          marginTop: 14, display: "flex",
        }}>나의 한글 이름</div>

        <div style={{
          fontSize: 27, fontWeight: 400,
          color: "#64748b",
          fontFamily: "NanumGothic",
          marginTop: 26, display: "flex",
        }}>어떤 이름이든 한글로 · Convert any name to Korean Hangul</div>

        {/* Wehome 배지 */}
        <div style={{
          display: "flex",
          marginTop: 40,
          padding: "9px 26px",
          background: "rgba(139,92,246,0.12)",
          borderRadius: 24,
          fontSize: 19, fontWeight: 400,
          color: "#7c3aed", fontFamily: "NanumGothic",
        }}>Powered by Wehome.me</div>
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
