import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const name = searchParams.get("name") ?? "";   // Korean name e.g. "캐롤라인"
  const orig = searchParams.get("orig") ?? "";   // Original name e.g. "Caroline"

  const fontBold = readFileSync(join(process.cwd(), "public/fonts/NanumGothic-Bold.ttf"));
  const fontReg  = readFileSync(join(process.cwd(), "public/fonts/NanumGothic.ttf"));

  // Font size: shrink for long names
  const len = Math.max(...name.split(/\s+/).map((w) => w.length), 1);
  const fontSize = Math.min(160, Math.max(60, Math.floor(900 / len)));

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          background: "linear-gradient(135deg, #f0f9ff 0%, #dbeafe 45%, #eff6ff 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "NanumGothic",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background decorative char */}
        <div style={{
          position: "absolute", right: -20, top: -80,
          fontSize: 400, fontWeight: 700,
          color: "rgba(59,130,246,0.05)",
          fontFamily: "NanumGothic", lineHeight: 1, display: "flex",
        }}>
          {name[0] ?? "한"}
        </div>

        {/* Korean name — large, bold */}
        <div style={{
          fontSize, fontWeight: 700, color: "#1e293b",
          fontFamily: "NanumGothic",
          letterSpacing: "0.05em",
          lineHeight: 1.15,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          {name.trim().split(/\s+/).map((word, i) => (
            <span key={i}>{word}</span>
          ))}
        </div>

        {/* Original name */}
        {orig && (
          <div style={{
            fontSize: 36, fontWeight: 400, color: "#64748b",
            fontFamily: "NanumGothic", marginTop: 24, display: "flex",
          }}>
            {orig}
          </div>
        )}

        {/* Tagline */}
        <div style={{
          fontSize: 22, fontWeight: 400, color: "#94a3b8",
          fontFamily: "NanumGothic", marginTop: 36, display: "flex",
          padding: "8px 28px",
          background: "rgba(59,130,246,0.08)",
          borderRadius: 999,
        }}>
          My Hangul Name · myhangulname.com
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "NanumGothic", data: fontBold, style: "normal", weight: 700 },
        { name: "NanumGothic", data: fontReg,  style: "normal", weight: 400 },
      ],
    }
  );
}
