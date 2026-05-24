"use client";

export default function KoreaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* 한국 전통색 기반 그라데이션 */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />

      {/* 한글 자음·모음 패턴 (subtle) */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='40' font-size='48' fill='white' font-family='sans-serif'%3Eㄱ%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px'
      }} />

      {/* 부드러운 빛 효과 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(147,197,253,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(196,181,253,0.15),transparent_50%)]" />
    </div>
  );
}
