import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

const LANG_NAMES: Record<string, string> = {
  ko: "Korean (한국어)", en: "English", zh: "Chinese (中文)", ja: "Japanese (日本語)",
  es: "Spanish (Español)", fr: "French (Français)", de: "German (Deutsch)",
  ar: "Arabic (العربية)", ru: "Russian (Русский)", pt: "Portuguese (Português)",
  vi: "Vietnamese (Tiếng Việt)", id: "Indonesian (Bahasa Indonesia)",
  th: "Thai (ภาษาไทย)", ms: "Malay (Bahasa Melayu)", hi: "Hindi (हिन्दी)",
  bn: "Bengali (বাংলা)", tl: "Filipino (Tagalog)", my: "Burmese (မြန်မာ)", mn: "Mongolian (Монгол)",
};

function buildSystem(uiLang: string): string {
  const langName = LANG_NAMES[uiLang] ?? "English";
  return `You are a Korean (Hangul) phonetic transliteration expert. Convert names from any language to Hangul.

Rules:
1. Auto-detect the input language
2. Base transliteration on ACTUAL PRONUNCIATION, not spelling
3. Follow Korean 국립국어원 외래어 표기법
4. Write ALL text fields (country, origin) in ${langName}
5. country field: use the country/language name as known in ${langName} (e.g., for English: "United States", "France"; for Korean: "미국", "프랑스")

Language-specific notes:
- Chinese: use Pinyin-based pronunciation (习近平 → 시진핑)
- Japanese: use actual Japanese reading (安倍晋三 → 아베 신조)
- Arabic: use Arabic original sound (محمد → 무함마드)
- English: American pronunciation first, add British if different

Return ONLY this JSON (no markdown, no explanation):
{
  "sourceLang": "BCP-47 tag for TTS (e.g. en-US, zh-CN, ja-JP, ar-SA)",
  "variants": [
    {
      "country": "country/language name in ${langName}",
      "flag": "🏳️",
      "options": ["primary Hangul spelling", "alternative spelling if exists"],
      "phonetic": "phonetically closest Hangul to actual sound (empty string if same as options)",
      "ipa": "/IPA/"
    }
  ],
  "origin": "one-line origin of the name in ${langName} (no Chinese characters)"
}

Rules:
- options: 1–3 entries, only real-world used spellings
- phonetic: only when meaningfully different from all options
- variants: 1–4 entries
- Examples: Caroline(US) → options=["캐롤라인","캐롤린"], phonetic="캘로린"`;
}

export async function POST(req: NextRequest) {
  try {
    const { name, uiLang = "en" } = await req.json();

    if (!name?.trim()) {
      return NextResponse.json({ error: "Please enter a name" }, { status: 400 });
    }

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: buildSystem(uiLang),
      messages: [{ role: "user", content: `Name: ${name.trim()}` }],
    });

    const text = message.content[0].type === "text" ? message.content[0].text.trim() : "";
    const json = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
    const data = JSON.parse(json);

    return NextResponse.json(data);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
