"use client";

import { useState } from "react";
import HangulArtGallery from "@/components/HangulArtGallery";
import { detectLang, type Lang } from "@/lib/i18n";

export default function GalleryClient() {
  // Lazy init keeps the lint rule happy and avoids the post-mount re-render
  // jump that `useEffect + setLang` causes.
  const [lang] = useState<Lang>(() => detectLang());

  const logAction = async (data: Record<string, unknown>) => {
    try {
      await fetch("/api/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch { /* ignore */ }
  };

  return <HangulArtGallery isKo={lang === "ko"} uiLang={lang} onLog={logAction} />;
}
