import Anthropic from "@anthropic-ai/sdk";
import { getCached, setCached, appendLog } from "@/lib/store";

const client = new Anthropic();

export interface TransliterateResult {
  sourceLang: string;
  variants: Array<{
    country: string;
    flag: string;
    options: string[];
    phonetic: string;
    ipa: string;
  }>;
  origin: string;
}

export class TransliterateError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.status = status;
  }
}

const LANG_NAMES: Record<string, string> = {
  ko: "Korean (한국어)", en: "English", zh: "Chinese (中文)", ja: "Japanese (日本語)",
  es: "Spanish (Español)", fr: "French (Français)", de: "German (Deutsch)",
  ar: "Arabic (العربية)", ru: "Russian (Русский)", pt: "Portuguese (Português)",
  vi: "Vietnamese (Tiếng Việt)", id: "Indonesian (Bahasa Indonesia)",
  th: "Thai (ภาษาไทย)", ms: "Malay (Bahasa Melayu)", hi: "Hindi (हिन्दी)",
  bn: "Bengali (বাংলা)", tl: "Filipino (Tagalog)", my: "Burmese (မြန်မာ)", mn: "Mongolian (Монгол)",
};

function cacheKey(name: string): string {
  return name.trim().toLowerCase();
}

function isHangul(text: string): boolean {
  return /[가-힣ᄀ-ᇿ㄰-㆏]/.test(text);
}

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

/**
 * Core name → Hangul transliteration, shared by the internal and public APIs.
 * Throws TransliterateError (with an HTTP status) on bad input or upstream failure.
 */
export async function transliterateName(rawName: string, uiLang = "en", log = true): Promise<TransliterateResult> {
  const name = (rawName ?? "").trim();
  if (!name) throw new TransliterateError("Please provide a name", 400);
  if (name.length > 60) throw new TransliterateError("Name is too long (max 60 chars)", 400);

  // Already Hangul → return as-is
  if (isHangul(name)) {
    const data: TransliterateResult = {
      sourceLang: "ko-KR",
      variants: [{
        country: uiLang === "ko" ? "한국" : "Korea",
        flag: "🇰🇷",
        options: [name],
        phonetic: "",
        ipa: "",
      }],
      origin: uiLang === "ko" ? "이미 한글로 입력되었습니다" : "Already in Hangul (Korean script)",
    };
    if (log) await appendLog({ type: "conversion", inputName: name, uiLang, sourceLang: "ko-KR", cached: false });
    return data;
  }

  const key = cacheKey(name);
  const cached = await getCached(key);
  if (cached) {
    const data = cached as unknown as TransliterateResult;
    if (log) await appendLog({ type: "conversion", inputName: name, uiLang, sourceLang: data.sourceLang, cached: true });
    return data;
  }

  let message;
  try {
    message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 600,
      system: buildSystem(uiLang),
      messages: [{ role: "user", content: `Name: ${name}` }],
    });
  } catch {
    throw new TransliterateError("Transliteration service unavailable", 502);
  }

  const text = message.content[0].type === "text" ? message.content[0].text.trim() : "";
  const json = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  let data: TransliterateResult;
  try {
    data = JSON.parse(json);
  } catch {
    throw new TransliterateError("Could not parse transliteration result", 502);
  }

  await setCached(key, data as unknown as Record<string, unknown>);
  if (log) await appendLog({ type: "conversion", inputName: name, uiLang, sourceLang: data.sourceLang, cached: false });
  return data;
}
