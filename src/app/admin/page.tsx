"use client";

import { useState, useEffect, useCallback } from "react";

interface Stats {
  storage: "vercel-kv" | "local-files";
  totals: { visits: number; conversions: number; shares: number; wehomeClicks: number; feedbackUp: number; copies: number; cacheSize: number };
  daily: [string, number][];
  weekly: [string, number][];
  monthly: [string, number][];
  langCount: [string, number][];
  sourceLangCount: [string, number][];
  topNames: [string, number][];
  fontCount: [string, number][];
  platformCount: [string, number][];
}

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

function HBar({ data, color = "#3b82f6", maxItems = 15 }: { data: [string, number][]; color?: string; maxItems?: number }) {
  const sliced = data.slice(0, maxItems);
  const max = Math.max(...sliced.map(([, v]) => v), 1);
  return (
    <div className="space-y-1.5">
      {sliced.map(([label, val]) => (
        <div key={label} className="flex items-center gap-2">
          <span className="text-xs text-slate-500 w-28 truncate shrink-0">{label}</span>
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

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily");

  const fetchStats = useCallback(async (pass: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats", {
        headers: { Authorization: `Bearer ${pass}` },
      });
      if (res.status === 401) { setAuthError(true); return; }
      const data = await res.json();
      setStats(data);
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

  // auto-refresh every 60s
  useEffect(() => {
    if (!authed || !password) return;
    const id = setInterval(() => fetchStats(password), 60_000);
    return () => clearInterval(id);
  }, [authed, password, fetchStats]);

  if (!authed) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 w-full max-w-sm">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Admin</h1>
          <p className="text-sm text-slate-400 mb-6">My Name in Hangul — 통계 대시보드</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="관리자 비밀번호"
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

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-800">통계 대시보드</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <p className="text-xs text-slate-400">My Name in Hangul · 60초마다 자동 갱신</p>
              {stats && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  stats.storage === "vercel-kv"
                    ? "bg-green-100 text-green-600"
                    : "bg-amber-100 text-amber-600"
                }`}>
                  {stats.storage === "vercel-kv" ? "Vercel KV ✓" : "⚠ 로컬 파일 — 배포 시 초기화"}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => fetchStats(password)}
            className="text-xs text-blue-500 hover:text-blue-600 border border-blue-200 rounded-xl px-3 py-1.5 transition"
          >
            새로고침
          </button>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: "방문자", value: stats.totals.visits, color: "text-sky-600" },
            { label: "총 변환", value: stats.totals.conversions, color: "text-blue-600" },
            { label: "공유", value: stats.totals.shares, color: "text-emerald-600" },
            { label: "위홈 클릭", value: stats.totals.wehomeClicks, color: "text-orange-500" },
            { label: "좋아요", value: stats.totals.feedbackUp, color: "text-green-600" },
            { label: "복사", value: stats.totals.copies, color: "text-purple-600" },
            { label: "캐시 항목", value: stats.totals.cacheSize, color: "text-amber-600" },
          ].map((item) => (
            <div key={item.label} className="bg-white rounded-2xl border border-slate-100 p-4 text-center">
              <div className={`text-2xl font-bold ${item.color}`}>{item.value.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mt-0.5">{item.label}</div>
            </div>
          ))}
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
          {/* UI language */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">UI 언어별 사용 횟수</h2>
            <HBar data={stats.langCount} color="#8b5cf6" />
          </div>

          {/* Source language (name origin) */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">검색 이름 언어별</h2>
            <HBar data={stats.sourceLangCount} color="#f59e0b" />
          </div>

          {/* Font selection */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">선택 폰트</h2>
            <HBar data={stats.fontCount} color="#10b981" />
          </div>

          {/* Share platforms */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5">
            <h2 className="text-sm font-semibold text-slate-700 mb-4">공유 플랫폼</h2>
            <HBar data={stats.platformCount} color="#ec4899" />
          </div>
        </div>

        {/* Top names */}
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
      </div>
    </div>
  );
}
