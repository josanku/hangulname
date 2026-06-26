import { NextRequest, NextResponse } from "next/server";
import { transliterateName, TransliterateError } from "@/lib/transliterateCore";

// Minimal Model Context Protocol (MCP) server over Streamable HTTP, with no
// external dependencies. Exposes one tool — transliterate_name — so MCP clients
// (Claude Desktop / Claude Code "custom connectors", and other agents) can use
// the Hangul converter as a native tool. JSON-RPC 2.0; stateless.

const SERVER_INFO = { name: "my-hangul-name", version: "1.0.0" };
const DEFAULT_PROTOCOL = "2025-06-18";

const TOOLS = [
  {
    name: "transliterate_name",
    description:
      "Convert a personal name from any language into its natural Korean (Hangul) spelling, with pronunciation (IPA) and a short origin note. Free, no API key.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "The name to convert, in any language (max 60 chars)." },
        lang: { type: "string", description: "Optional UI language for text fields (en, ko, ja, zh, es, fr, …). Default en." },
      },
      required: ["name"],
    },
  },
];

const CORS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Mcp-Session-Id, Mcp-Protocol-Version",
};

type RpcId = string | number | null;
interface RpcMessage {
  jsonrpc?: string;
  id?: RpcId;
  method?: string;
  params?: Record<string, unknown>;
}

function result(id: RpcId, res: unknown, extraHeaders?: Record<string, string>) {
  return NextResponse.json({ jsonrpc: "2.0", id, result: res }, { headers: { ...CORS, ...extraHeaders } });
}
function error(id: RpcId, code: number, message: string) {
  return NextResponse.json({ jsonrpc: "2.0", id, error: { code, message } }, { headers: CORS });
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS });
}

export function GET() {
  // No server-initiated SSE stream is offered; clients use POST request/response.
  return new NextResponse("Method Not Allowed", { status: 405, headers: CORS });
}

export async function POST(req: NextRequest) {
  let msg: RpcMessage;
  try {
    msg = (await req.json()) as RpcMessage;
  } catch {
    return error(null, -32700, "Parse error");
  }
  if (Array.isArray(msg)) return error(null, -32600, "Batch requests are not supported");

  const { id = null, method, params } = msg ?? {};

  // Notifications (e.g. notifications/initialized) carry no id and expect no body.
  if (method?.startsWith("notifications/") || msg?.id === undefined) {
    return new NextResponse(null, { status: 202, headers: CORS });
  }

  switch (method) {
    case "initialize": {
      const protocolVersion = (params?.protocolVersion as string) ?? DEFAULT_PROTOCOL;
      return result(
        id,
        {
          protocolVersion,
          capabilities: { tools: { listChanged: false } },
          serverInfo: SERVER_INFO,
          instructions: "Use transliterate_name to convert any name into its Korean (Hangul) spelling.",
        },
        { "Mcp-Session-Id": crypto.randomUUID() },
      );
    }
    case "ping":
      return result(id, {});
    case "tools/list":
      return result(id, { tools: TOOLS });
    case "tools/call": {
      const toolName = params?.name as string | undefined;
      const args = (params?.arguments as Record<string, unknown>) ?? {};
      if (toolName !== "transliterate_name") return error(id, -32602, `Unknown tool: ${toolName}`);
      const name = typeof args.name === "string" ? args.name : "";
      const lang = typeof args.lang === "string" ? args.lang : "en";
      try {
        const data = await transliterateName(name, lang, false); // false → don't log as a user conversion
        const primary = data.variants?.[0]?.options?.[0] ?? "";
        return result(id, {
          content: [
            { type: "text", text: `${name} in Korean (Hangul): ${primary}` },
            { type: "text", text: JSON.stringify(data) },
          ],
        });
      } catch (e) {
        const message = e instanceof TransliterateError ? e.message : "Transliteration failed";
        return result(id, { content: [{ type: "text", text: message }], isError: true });
      }
    }
    default:
      return error(id, -32601, `Method not found: ${method}`);
  }
}
