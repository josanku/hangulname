import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Name in Hangul",
  description: "Convert any name to Korean Hangul pronunciation",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
