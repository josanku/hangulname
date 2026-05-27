"use client";

export default function KoreaBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Modern vibrant gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600" />

      {/* Subtle Hangul pattern overlay */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='55' font-size='52' fill='white' font-family='sans-serif' font-weight='bold'%3E한%3C/text%3E%3C/svg%3E")`,
        backgroundSize: '140px 140px'
      }} />

      {/* Radial light effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(167,139,250,0.2),transparent_50%)]" />

      {/* Animated glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.1),transparent_70%)] animate-pulse" style={{ animationDuration: '4s' }} />
    </div>
  );
}
