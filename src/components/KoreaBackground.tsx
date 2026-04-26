"use client";

import { useState, useEffect, useRef } from "react";

// 20 representative Korean landmark photos — Wikimedia Commons (CC licensed)
const PHOTOS = [
  "https://upload.wikimedia.org/wikipedia/commons/3/35/Gyeongbokgung_Palace.jpg",                                         // 경복궁
  "https://upload.wikimedia.org/wikipedia/commons/3/3d/Korea_Gyeongbokgung.jpg",                                          // 경복궁 야경
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Bukchon_Hanok_Village.jpg/1920px-Bukchon_Hanok_Village.jpg", // 북촌 한옥마을
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Changdeokgung.jpg/1920px-Changdeokgung.jpg",                 // 창덕궁
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Seoul_tower.jpg/1920px-Seoul_tower.jpg",                     // N서울타워
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Seoul_at_night.jpg/1920px-Seoul_at_night.jpg",               // 서울 야경
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Myeongdong_at_night.jpg/1920px-Myeongdong_at_night.jpg",    // 명동
  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Hongdae_Street.jpg/1920px-Hongdae_Street.jpg",              // 홍대
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Cheonggyecheon.jpg/1920px-Cheonggyecheon.jpg",              // 청계천
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Jeju_Island.jpg/1920px-Jeju_Island.jpg",                    // 제주도
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Jeju_Hallasan.jpg/1920px-Jeju_Hallasan.jpg",                // 한라산
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Seoraksan.jpg/1920px-Seoraksan.jpg",                        // 설악산
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Bukhansan.jpg/1920px-Bukhansan.jpg",                        // 북한산
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bukhansan_National_Park.jpg/1920px-Bukhansan_National_Park.jpg", // 북한산 국립공원
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Bulguksa_01.jpg/1920px-Bulguksa_01.jpg",                    // 불국사
  "https://upload.wikimedia.org/wikipedia/commons/2/20/Gyeongju_Cheomseongdae.jpg",                                      // 경주 첨성대
  "https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/Haeinsa.jpg/1920px-Haeinsa.jpg",                            // 해인사
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Hwaseong_Fortress.jpg/1920px-Hwaseong_Fortress.jpg",        // 화성
  "https://upload.wikimedia.org/wikipedia/commons/2/27/Korean_Hanbok.jpg",                                               // 한복
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Incheon_Airport.jpg/1920px-Incheon_Airport.jpg",            // 인천공항
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function KoreaBackground() {
  const [photos] = useState(() => shuffle(PHOTOS));
  const [curr, setCurr] = useState(0);
  const [outgoing, setOutgoing] = useState<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const advance = () => {
      setCurr((c) => {
        setOutgoing(c);
        return (c + 1) % photos.length;
      });
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setOutgoing(null), 2000);
    };

    const id = setInterval(advance, 9000);
    return () => {
      clearInterval(id);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [photos.length]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Current photo — always visible as base layer */}
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${photos[curr]})` }}
      />

      {/* Outgoing photo — fades out over 2s via CSS animation */}
      {outgoing !== null && (
        <div
          key={outgoing}
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${photos[outgoing]})`,
            animation: "hg-fadeout 2s ease-in-out forwards",
          }}
        />
      )}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.3)_100%)]" />
    </div>
  );
}
