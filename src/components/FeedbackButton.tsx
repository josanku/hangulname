"use client";

import { useState, useEffect } from "react";
import { type Lang } from "@/lib/i18n";

const T = {
  ko: {
    btn: "피드백",
    title: "피드백 보내기",
    msgLabel: "메시지",
    msgPlaceholder: "서비스 개선사항, 오류 신고, 궁금한 점을 자유롭게 남겨주세요.",
    contactLabel: "연락처 (선택)",
    contactPlaceholder: "이메일 또는 전화번호",
    send: "보내기",
    sending: "전송 중...",
    done: "감사합니다! 소중한 의견을 받았습니다 😊",
    required: "메시지를 입력해주세요.",
  },
  en: {
    btn: "Feedback",
    title: "Send Feedback",
    msgLabel: "Message",
    msgPlaceholder: "Share your thoughts, report issues, or ask questions.",
    contactLabel: "Contact (optional)",
    contactPlaceholder: "Email or phone number",
    send: "Send",
    sending: "Sending...",
    done: "Thank you! Your feedback was received 😊",
    required: "Please enter a message.",
  },
  zh: {
    btn: "反馈",
    title: "发送反馈",
    msgLabel: "消息",
    msgPlaceholder: "请分享您的想法、报告问题或提问。",
    contactLabel: "联系方式（可选）",
    contactPlaceholder: "邮箱或电话",
    send: "发送",
    sending: "发送中...",
    done: "感谢您的反馈！😊",
    required: "请输入消息。",
  },
  ja: {
    btn: "フィードバック",
    title: "フィードバック送信",
    msgLabel: "メッセージ",
    msgPlaceholder: "ご意見、不具合報告、ご質問を自由にお書きください。",
    contactLabel: "連絡先（任意）",
    contactPlaceholder: "メールまたは電話番号",
    send: "送信",
    sending: "送信中...",
    done: "フィードバックありがとうございます！😊",
    required: "メッセージを入力してください。",
  },
  es: {
    btn: "Comentarios",
    title: "Enviar comentarios",
    msgLabel: "Mensaje",
    msgPlaceholder: "Comparte tus opiniones, reporta problemas o haz preguntas.",
    contactLabel: "Contacto (opcional)",
    contactPlaceholder: "Correo o teléfono",
    send: "Enviar",
    sending: "Enviando...",
    done: "¡Gracias por tus comentarios! 😊",
    required: "Por favor ingresa un mensaje.",
  },
  ar: {
    btn: "ملاحظات",
    title: "إرسال ملاحظات",
    msgLabel: "رسالة",
    msgPlaceholder: "شارك أفكارك أو أبلغ عن مشكلة أو اطرح سؤالاً.",
    contactLabel: "جهة الاتصال (اختياري)",
    contactPlaceholder: "البريد الإلكتروني أو رقم الهاتف",
    send: "إرسال",
    sending: "جارٍ الإرسال...",
    done: "شكراً على ملاحظاتك! 😊",
    required: "الرجاء إدخال رسالة.",
  },
} as const;

type TLang = keyof typeof T;

function getT(lang: string) {
  return T[(lang as TLang)] ?? T.en;
}

interface Props {
  lang: Lang;
}

export default function FeedbackButton({ lang }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  const t = getT(lang);
  const isRtl = lang === "ar";

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open]);

  const send = async () => {
    if (!message.trim()) { setError(t.required); return; }
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: message.trim(), contact: contact.trim(), uiLang: lang }),
      });
      if (!res.ok) throw new Error();
      setDone(true);
      setTimeout(() => {
        setDone(false);
        setOpen(false);
        setMessage("");
        setContact("");
      }, 2500);
    } catch {
      setError("Error. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* 플로팅 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-5 z-40 flex items-center gap-1.5 bg-white/90 hover:bg-white border border-white/50 backdrop-blur-sm text-slate-700 text-xs font-medium px-3 py-2 rounded-full shadow-lg transition"
      >
        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
        {t.btn}
      </button>

      {/* 모달 */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl w-full sm:max-w-md p-6 flex flex-col gap-4"
            dir={isRtl ? "rtl" : "ltr"}
            onClick={(e) => e.stopPropagation()}
          >
            {/* 닫기 */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-slate-300 hover:text-slate-500 transition p-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>

            <h2 className="text-base font-semibold text-slate-800">{t.title}</h2>

            {done ? (
              <div className="py-6 text-center text-sm text-green-600 font-medium">
                {t.done}
              </div>
            ) : (
              <>
                {/* 메시지 */}
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">{t.msgLabel}</label>
                  <textarea
                    value={message}
                    onChange={(e) => { setMessage(e.target.value); setError(""); }}
                    placeholder={t.msgPlaceholder}
                    rows={4}
                    className="w-full text-sm text-slate-700 placeholder:text-slate-300 border border-slate-200 rounded-xl p-3 focus:outline-none focus:border-blue-400 resize-none"
                    autoFocus
                  />
                  {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                </div>

                {/* 연락처 */}
                <div>
                  <label className="text-xs text-slate-500 mb-1 block">{t.contactLabel}</label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t.contactPlaceholder}
                    className="w-full text-sm text-slate-700 placeholder:text-slate-300 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:border-blue-400"
                  />
                </div>

                {/* 전송 */}
                <button
                  onClick={send}
                  disabled={sending || !message.trim()}
                  className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-200 text-white text-sm font-medium py-2.5 rounded-xl transition"
                >
                  {sending ? t.sending : t.send}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
