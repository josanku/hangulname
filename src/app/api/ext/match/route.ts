/**
 * Wehome Extension Matching API
 *
 * 크롬 익스텐션에서 Airbnb 숙소 정보를 받아 위홈의 동일 숙소를 찾아 반환합니다.
 *
 * POST /api/ext/match
 * Body: { airbnb_id, title, lat, lng, address, check_in, check_out, guests }
 * Returns: { found, url, title, wehome_price?, airbnb_price? }
 *
 * ── 실제 운영 시 구현 필요 사항 ──────────────────────────────────────────
 * 1. 위홈 숙소 DB에서 에어비앤비 ID 또는 좌표로 매칭 쿼리
 * 2. 같은 주소/좌표 반경 내 위홈 숙소 검색
 * 3. 위홈 숙소 가격 정보 포함
 */

import { NextRequest, NextResponse } from "next/server";

// CORS — 크롬 익스텐션에서 직접 호출 허용
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { airbnb_id, title, lat, lng, address } = body as {
      airbnb_id?: string;
      title?: string;
      lat?: number;
      lng?: number;
      address?: string;
      check_in?: string;
      check_out?: string;
      guests?: string;
    };

    if (!airbnb_id && !lat && !title) {
      return NextResponse.json(
        { found: false, error: "Insufficient data" },
        { status: 400, headers: corsHeaders() }
      );
    }

    // ── TODO: 실제 위홈 DB 조회 로직으로 교체 ──────────────────────────────
    //
    // 예시:
    //   const listing = await db.wehomeListings.findFirst({
    //     where: {
    //       OR: [
    //         { airbnbId: airbnb_id },                  // 에어비앤비 ID 직접 매핑
    //         { lat: { gte: lat-0.001, lte: lat+0.001 }, // 좌표 근접 검색
    //           lng: { gte: lng-0.001, lte: lng+0.001 } },
    //       ]
    //     }
    //   });
    //
    //   if (listing) {
    //     return NextResponse.json({
    //       found: true,
    //       url: `https://wehome.me/rooms/${listing.id}`,
    //       title: listing.title,
    //       wehome_price: listing.pricePerNight,
    //     }, { headers: corsHeaders() });
    //   }
    // ────────────────────────────────────────────────────────────────────────

    // 현재: 한국 좌표 내 숙소면 위홈 검색 URL로 응답
    const isKorea = lat && lng &&
      lat > 33 && lat < 39 &&
      lng > 124 && lng < 132;

    if (isKorea) {
      // 지역 검색 URL (좌표 기반)
      const searchUrl = `https://wehome.me/search?lat=${lat}&lng=${lng}&radius=0.3` +
        (body.check_in ? `&check_in=${body.check_in}` : "") +
        (body.check_out ? `&check_out=${body.check_out}` : "") +
        (body.guests ? `&guests=${body.guests}` : "");

      return NextResponse.json(
        {
          found: false,       // 직접 매칭은 아직 없음
          searchOnly: true,   // 검색 페이지로 연결
          url: searchUrl,
          title: title ?? "",
          message: "위홈 DB 매핑 준비 중. 검색으로 연결합니다.",
        },
        { headers: corsHeaders() }
      );
    }

    // 한국 외 지역
    return NextResponse.json(
      { found: false, message: "Not a Korea listing" },
      { headers: corsHeaders() }
    );
  } catch {
    return NextResponse.json(
      { found: false, error: "Server error" },
      { status: 500, headers: corsHeaders() }
    );
  }
}
