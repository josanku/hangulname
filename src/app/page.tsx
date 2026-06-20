import type { Metadata } from "next";
import { getCached } from "@/lib/store";
import HomeClient from "./HomeClient";

const BASE_URL = "https://www.myhangulname.com";

type Props = {
  searchParams: Promise<{ name?: string }>;
};

// Dynamic OG meta per name — Facebook / Twitter / etc. will show rich preview
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { name } = await searchParams;
  if (!name?.trim()) return {};

  const nameTrimmed = name.trim();
  const cached = (await getCached(nameTrimmed.toLowerCase())) as {
    variants?: Array<{ options: string[]; country: string }>;
  } | null;

  const koreanName = cached?.variants?.[0]?.options?.[0];
  if (!koreanName) return {};

  const title = `${nameTrimmed} → ${koreanName} 🇰🇷 | My Hangul Name`;
  const description =
    `${nameTrimmed} is "${koreanName}" in Korean Hangul! ` +
    `Find out what your name looks like in Korean. #Hangul #한글 #HangulName`;

  const ogImage = `${BASE_URL}/api/og?name=${encodeURIComponent(koreanName)}&orig=${encodeURIComponent(nameTrimmed)}`;
  const pageUrl = `${BASE_URL}/?name=${encodeURIComponent(nameTrimmed)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: pageUrl,
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${nameTrimmed} in Korean: ${koreanName}` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Page({ searchParams }: Props) {
  const { name } = await searchParams;
  return <HomeClient initialName={name?.trim()} />;
}
