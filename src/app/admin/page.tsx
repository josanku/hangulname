"use client";

import { useState, useEffect, useCallback, Fragment } from "react";

interface FeedbackEntry {
  ts: string;
  message: string;
  contact?: string;
  uiLang?: string;
  country?: string;
}

interface Stats {
  storage: "vercel-kv" | "local-files";
  totals: {
    visits: number; conversions: number; shares: number;
    wehomeClicks: number; feedbackUp: number; feedbackCount: number;
    copies: number; cacheSize: number; hangulartDownloads: number;
  };
  daily: [string, number][];
  weekly: [string, number][];
  monthly: [string, number][];
  dailyDetails: [string, { visits: number; conversions: number; hangulartDownloads: number }][];
  dailyNames: [string, [string, number][]][];
  recent: { ts: string; inputName: string; uiLang: string; sourceLang: string; country: string }[];
  langCount: [string, number][];
  sourceLangCount: [string, number][];
  topNames: [string, number][];
  fontCount: [string, number][];
  platformCount: [string, number][];
  countryCount: [string, number][];
  convCountryCount: [string, number][];
}

// ISO 3166-1 alpha-2 → flag emoji
function flag(code: string) {
  if (!code || code.length !== 2 || code === "un") return "🌐";
  return String.fromCodePoint(
    0x1F1E6 + code.toUpperCase().charCodeAt(0) - 65,
    0x1F1E6 + code.toUpperCase().charCodeAt(1) - 65,
  );
}

const COUNTRY_NAMES: Record<string, string> = {
  KR: "대한민국", US: "미국", JP: "일본", CN: "중국", TW: "대만",
  HK: "홍콩", VN: "베트남", TH: "태국", SG: "싱가포르", PH: "필리핀",
  ID: "인도네시아", MY: "말레이시아", IN: "인도", GB: "영국", DE: "독일",
  FR: "프랑스", ES: "스페인", IT: "이탈리아", BR: "브라질", MX: "멕시코",
  RU: "러시아", AU: "호주", CA: "캐나다", SA: "사우디", AE: "UAE",
  TR: "터키", PL: "폴란드", NL: "네덜란드", AR: "아르헨티나", unknown: "기타",
};

function BarChart({ data, color = "#3b82f6", maxBars = 20 }: { data: [string, number][]; color?: string; maxBars?: number }) {
  const sliced = data.slice(-maxBars);
  const max = Math.max(...sliced.map(([, v]) => v), 1);
  return (
    <div className="flex items-end gap-1 h-28 w-full overflow-x-auto">
      {sliced.map(([label, val]) => (
        <div key={label} className="flex flex-col items-center gap-0.5 flex-1 min-w-[28px]">
          <span className="text-[9px] text-slate-400">{val}</span>
          <div
            className="w-full rounded-t-sm transition-all"
            style={{ height: `${Math.round((val / max) * 80)}px`, background: color }}
          />
          <span className="text-[8px] text-slate-400 truncate w-full text-center leading-tight">
            {label.length > 6 ? label.slice(5) : label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HBar({ data, color = "#3b82f6", maxItems = 15, renderLabel }: {
  data: [string, number][];
  color?: string;
  maxItems?: number;
  renderLabel?: (key: string) => React.ReactNode;
}) {
  const sliced = data.slice(0, maxItems);
  const max = Math.max(...sliced.map(([, v]) => v), 1);
  return (
    <div className="space-y-1.5">
      {sliced.map(([label, val]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-xs text-slate-500 w-32 truncate shrink-0">
            {renderLabel ? renderLabel(label) : label}
          </span>
          <div className="flex-1 bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{ width: `${Math.round((val / max) * 100)}%`, background: color }}
            />
          </div>
          <span className="text-xs text-slate-400 w-8 text-right shrink-0">{val}</span>
        </div>
      ))}
    </div>
  );
}

type Tab = "stats" | "feedback";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [feedbacks, setFeedbacks] = useState<FeedbackEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");
  const [tab, setTab] = useState<Tab>("stats");
  const [expandedDay, setExpandedDay] = useState<string | null>(null);

  const fetchStats = useCallback(async (pass: string) => {
    setLoading(true);
    try {
      const [statsRes, fbRes] = await Promise.all([
        fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${pass}` } }),
        fetch("/api/feedback",    { headers: { Authorization: `Bearer ${pass}` } }),
      ]);
      if (statsRes.status === 401) { setAuthError(true); return; }
      setStats(await statsRes.json());
      const fbData = await fbRes.json();
      setFeedbacks(fbData.feedbacks ?? []);
      setAuthed(true);
      setAuthError(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStats(password);
  };

  useEffect(() => {
    if (!authed || !password) return;
    const id = setInterval(() => fetchStats(password), 60_000);
    return () => clearInterval(id);
  }, [authed, password, fetchStats]);

  // ── Login ──────────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Admin</h1>
          <p className="text-sm text-slate-400 mb-6">My Hangul Name — 관리자</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-400"
              autoFocus
            />
            {authError && <p className="text-xs text-red-500">비밀번호가 올바르지 않습니다.</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2.5 rounded-xl text-sm font-medium transition"
            >
              {loading ? "확인 중..." : "로그인"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const chartData = period === "daily" ? stats.daily : period === "weekly" ? stats.weekly : stats.monthly;
  const namesByDay: Record<string, [string, number][]> = Object.fromEntries(stats.dailyNames ?? []);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">관리자 대시보드</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400">My Hangul Name · 60초 자동 갱신</p>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                stats.storage === "vercel-kv"
                  ? "bg-green-100 text-green-600"
                  : "bg-amber-100 text-amber-600"
              }`}>
                {stats.storage === "vercel-kv" ? "Vercel KV ✓" : "⚠ 로컬 파일"}
              </span>
            </div>
          </div>
          <button
            onClick={() => fetchStats(password)}
            className="text-xs text-blue-500 hover:text-blue-600 border border-blue-200 rounded-xl px-3 py-1.5 transition"
          >
            새로고침
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-slate-100 rounded-xl p-1 w-fit">
          {([["stats", "📊 통계"], ["feedback", `💬 피드백 (${feedbacks.length})`]] as [Tab, string][]).map(([t, label]) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`text-sm px-4 py-1.5 rounded-lg transition font-medium ${
                tab === t ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── 통계 탭 ── */}
        {tab === "stats" && (
          <>
            {/* Totals */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "방문자",         value: stats.totals.visits,              color: "text-sky-600" },
                { label: "변환",           value: stats.totals.conversions,         color: "text-blue-600" },
                { label: "한글아트 다운",  value: stats.totals.hangulartDownloads, color: "text-pink-600" },
                { label: "공유",           value: stats.totals.shares,              color: "text-emerald-600" },
                { label: "위홈클릭",       value: stats.totals.wehomeClicks,        color: "text-orange-500" },
                { label: "좋아요",         value: stats.totals.feedbackUp,          color: "text-green-600" },
                { label: "피드백",         value: stats.totals.feedbackCount,       color: "text-violet-600" },
                { label: "복사",           value: stats.totals.copies,              color: "text-purple-600" },
                { label: "캐시",           value: stats.totals.cacheSize,           color: "text-amber-600" },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
                  <div className={`text-2xl font-bold ${item.color}`}>{item.value.toLocaleString()}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Recent activity feed */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                </span>
                <h2 className="text-sm font-bold text-slate-800">최근 변환 활동</h2>
                <span className="text-xs text-slate-400">최근 {(stats.recent ?? []).length}건</span>
              </div>
              {(stats.recent ?? []).length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-sm">아직 변환 기록이 없습니다.</div>
              ) : (
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-50">
                  {(stats.recent ?? []).map((r, i) => (
                    <div key={i} className="flex items-center gap-3 px-5 py-2.5 hover:bg-slate-50 transition">
                      <span className="text-base shrink-0">{flag(r.country)}</span>
                      <span className="text-sm font-medium text-slate-700 truncate flex-1">{r.inputName || "—"}</span>
                      {r.uiLang && <span className="text-[10px] uppercase text-slate-400 shrink-0">{r.uiLang}</span>}
                      <span className="text-xs text-slate-400 shrink-0 tabular-nums">
                        {r.ts ? new Date(r.ts).toLocaleString("ko-KR", { month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit" }) : ""}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Daily Details Table */}
            <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
              <div className="p-5 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
                <h2 className="text-sm font-bold text-slate-800">📅 일별 상세 통계</h2>
                <p className="text-xs text-slate-500 mt-0.5">오늘부터 최근 60일 · 날짜를 누르면 그날 변환한 이름이 펼쳐집니다</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">날짜</th>
                      <th className="text-left px-4 py-3 text-xs font-semibold text-slate-600">요일</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-sky-600">방문자</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-blue-600">변환</th>
                      <th className="text-right px-4 py-3 text-xs font-semibold text-pink-600">한글아트 다운</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {stats.dailyDetails.map(([date, data]) => {
                      const d = new Date(date + "T00:00:00");
                      const isToday = date === new Date().toISOString().slice(0, 10);
                      const dayOfWeek = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
                      const [, month, day] = date.split("-");
                      const names = namesByDay[date] ?? [];
                      const isOpen = expandedDay === date;
                      return (
                        <Fragment key={date}>
                          <tr
                            onClick={() => names.length && setExpandedDay(isOpen ? null : date)}
                            className={`transition ${names.length ? "cursor-pointer hover:bg-slate-50" : ""} ${isToday ? "bg-blue-50/50" : ""} ${isOpen ? "bg-blue-50" : ""}`}
                          >
                            <td className="px-4 py-3 font-mono text-slate-700">
                              <span className={isToday ? "font-bold text-blue-600" : ""}>
                                {names.length > 0 && (
                                  <span className="inline-block text-slate-300 mr-1 text-[10px]">{isOpen ? "▼" : "▶"}</span>
                                )}
                                {month}/{day}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-slate-500">
                              <span className={`inline-block px-2 py-0.5 rounded text-xs ${
                                dayOfWeek === "토" ? "bg-blue-100 text-blue-600" :
                                dayOfWeek === "일" ? "bg-red-100 text-red-600" :
                                "bg-slate-100 text-slate-600"
                              }`}>
                                {dayOfWeek}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-sky-600">
                              {data.visits.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-blue-600">
                              {data.conversions.toLocaleString()}
                            </td>
                            <td className="px-4 py-3 text-right font-semibold text-pink-600">
                              {data.hangulartDownloads.toLocaleString()}
                            </td>
                          </tr>
                          {isOpen && names.length > 0 && (
                            <tr className="bg-slate-50/70">
                              <td colSpan={5} className="px-4 py-3">
                                <div className="text-[11px] text-slate-400 mb-2">{month}/{day} 변환한 이름 ({names.length}종)</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {names.map(([name, count]) => (
                                    <span key={name} className="inline-flex items-center gap-1 bg-white border border-slate-200 rounded-full px-2.5 py-1 text-xs text-slate-700">
                                      {name}
                                      {count > 1 && <span className="text-[10px] text-blue-500 font-semibold">×{count}</span>}
                                    </span>
                                  ))}
                                </div>
                              </td>
                            </tr>
                          )}
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Conversion trend */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-slate-700">변환 추이</h2>
                <div className="flex gap-1">
                  {(["daily", "weekly", "monthly"] as const).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`text-xs px-3 py-1 rounded-lg transition
                        ${period === p ? "bg-blue-500 text-white" : "text-slate-400 hover:bg-slate-100"}`}
                    >
                      {p === "daily" ? "일별" : p === "weekly" ? "주별" : "월별"}
                    </button>
                  ))}
                </div>
              </div>
              <BarChart data={chartData} color="#3b82f6" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* 국가별 방문자 */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4">🌍 국가별 방문자</h2>
                <HBar
                  data={stats.countryCount}
                  color="#0ea5e9"
                  renderLabel={(code) => (
                    <span>{flag(code)} {COUNTRY_NAMES[code.toUpperCase()] ?? code.toUpperCase()}</span>
                  )}
                />
              </div>

              {/* 국가별 변환 */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4">🌍 국가별 변환</h2>
                <HBar
                  data={stats.convCountryCount}
                  color="#6366f1"
                  renderLabel={(code) => (
                    <span>{flag(code)} {COUNTRY_NAMES[code.toUpperCase()] ?? code.toUpperCase()}</span>
                  )}
                />
              </div>

              {/* UI 언어 */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4">UI 언어별 사용</h2>
                <HBar data={stats.langCount} color="#8b5cf6" />
              </div>

              {/* 이름 원어 */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4">검색 이름 언어</h2>
                <HBar data={stats.sourceLangCount} color="#f59e0b" />
              </div>

              {/* 폰트 */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4">선택 폰트</h2>
                <HBar data={stats.fontCount} color="#10b981" />
              </div>

              {/* 공유 플랫폼 */}
              <div className="bg-white rounded-2xl border border-slate-100 p-5">
                <h2 className="text-sm font-semibold text-slate-700 mb-4">공유 플랫폼</h2>
                <HBar data={stats.platformCount} color="#ec4899" />
              </div>
            </div>

            {/* 인기 이름 */}
            <div className="bg-white rounded-2xl border border-slate-100 p-5">
              <h2 className="text-sm font-semibold text-slate-700 mb-4">인기 검색 이름 Top 50</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {stats.topNames.map(([name, count], i) => (
                  <div key={name} className="flex items-center gap-2 py-1.5 px-3 bg-slate-50 rounded-xl">
                    <span className="text-xs text-slate-300 w-5 shrink-0">{i + 1}</span>
                    <span className="text-sm font-medium text-slate-700 truncate flex-1">{name}</span>
                    <span className="text-xs text-slate-400 shrink-0">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── 피드백 탭 ── */}
        {tab === "feedback" && (
          <div className="space-y-3">
            {feedbacks.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
                아직 피드백이 없습니다.
              </div>
            ) : (
              feedbacks.map((fb, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 whitespace-pre-wrap">{fb.message}</p>
                      {fb.contact && (
                        <p className="text-xs text-blue-500 mt-2">
                          📬 {fb.contact}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0 text-xs text-slate-400 space-y-0.5">
                      <div>{fb.ts ? new Date(fb.ts).toLocaleString("ko-KR") : ""}</div>
                      <div className="flex items-center justify-end gap-1">
                        {fb.country && fb.country !== "unknown" && (
                          <span>{flag(fb.country)}</span>
                        )}
                        {fb.uiLang && <span className="uppercase">{fb.uiLang}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
}
