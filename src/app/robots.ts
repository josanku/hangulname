import { MetadataRoute } from "next";

// Explicitly welcome AI search/answer crawlers so the site can be cited.
const AI_BOTS = [
  "GPTBot",            // OpenAI training
  "OAI-SearchBot",     // ChatGPT search
  "ChatGPT-User",      // ChatGPT browsing on user request
  "PerplexityBot",     // Perplexity
  "Perplexity-User",
  "ClaudeBot",         // Anthropic
  "Claude-User",
  "Claude-SearchBot",
  "Google-Extended",   // Gemini / Vertex
  "Applebot-Extended", // Apple Intelligence
  "Amazonbot",
  "CCBot",             // Common Crawl (used by many LLMs)
  "Bytespider",
  "Meta-ExternalAgent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api/"] },
      // AI crawlers: allow everything except admin (APIs are fine to read)
      ...AI_BOTS.map((ua) => ({ userAgent: ua, allow: "/", disallow: ["/admin"] })),
    ],
    sitemap: "https://myhangulname.com/sitemap.xml",
    host: "https://myhangulname.com",
  };
}
