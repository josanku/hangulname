/**
 * Wehome Chrome Extension
 * 브랜드 컬러: #6800cd (공식 wehome-color)
 *
 * 동작:
 * 1. 숙소 페이지: 위홈 매칭 숙소 있으면 wehome.me/profile/[id] 링크
 *                 없으면 호스트에게 "위홈 등록" 메시지 전송 옵션
 * 2. 결제 페이지: 실제 7% 절약 금액 표시
 * 3. 기타 페이지: 심플 배너
 */

const WEHOME = {
  base:       "https://wehome.me",
  matchAPI:   "https://wehome.me/api/v1/ext/match",
  hosting:    "https://wehome.me/hosting",
  messages:   "https://wehome.me/messages",
  discount:   7,
};

// ─── 언어 감지 ────────────────────────────────────────────────────────────────
function detectLang() {
  const l = (navigator.language || "en").toLowerCase().split("-")[0];
  return ["ko","ja","zh","ar","fr","de","es","ru","vi","th","id"].includes(l) ? l : "en";
}

// ─── 페이지 유형 ──────────────────────────────────────────────────────────────
function getPageType() {
  const p = location.pathname;
  if (/\/rooms\/\d+/.test(p))                                  return "listing";
  if (/\/book\/stays|\/book\/confirmation|\/checkout/.test(p)) return "checkout";
  return "other";
}

// ─── Airbnb 리스팅 ID 추출 ────────────────────────────────────────────────────
function getListingId() {
  return location.pathname.match(/\/rooms\/(\d+)/)?.[1] ?? null;
}

// ─── 좌표/제목 추출 (JSON-LD) ─────────────────────────────────────────────────
function getListingMeta() {
  try {
    const ld = document.querySelector('script[type="application/ld+json"]');
    if (!ld) return {};
    const data = JSON.parse(ld.textContent);
    return {
      lat:     data?.geo?.latitude  ?? data?.containsPlace?.geo?.latitude,
      lng:     data?.geo?.longitude ?? data?.containsPlace?.geo?.longitude,
      title:   data?.name ?? document.querySelector("h1")?.textContent?.trim() ?? "",
      address: [data?.address?.streetAddress, data?.address?.addressLocality,
                data?.address?.addressCountry].filter(Boolean).join(", "),
    };
  } catch { return {}; }
}

// ─── 위홈 API 매칭 ───────────────────────────────────────────────────────────
async function findOnWehome(listingId, meta) {
  try {
    const res = await fetch(WEHOME.matchAPI, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ airbnb_id: listingId, ...meta }),
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) return await res.json();
  } catch (_) {}
  return null;
}

// ─── 결제 가격 추출 ───────────────────────────────────────────────────────────
function getCheckoutPrice() {
  const sels = [
    '[data-testid="price-breakdown-total-amount"]',
    '[data-testid="book-it-total-price"]',
    "._6snwwx", "._1k4xcdh", "._y8ard8:last-child",
  ];
  for (const s of sels) {
    const el = document.querySelector(s);
    if (!el) continue;
    const n = parseFloat(el.textContent.replace(/[^\d.]/g, ""));
    if (!isNaN(n) && n > 0) {
      const sym = el.textContent.match(/^[^\d\s]+/)?.[0] ?? "₩";
      return { amount: n, symbol: sym };
    }
  }
  return null;
}

// ─── 다국어 콘텐츠 ───────────────────────────────────────────────────────────
const T = {
  // 숙소 페이지 — 3가지 가치 (매칭 여부 관계없이 항상 표시)
  matched: {
    ko: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "위홈에서 예약",
      bullets: ["내국인 합법 공유숙박은 위홈", "숙박료 즉시 7% 할인", "현지 신속 고객지원"],
    }),
    en: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Book on Wehome",
      bullets: ["7% Instant Discount on Room Rate", "Fast Local Support 24/7", "Gov't Certified Legal Stays"],
    }),
    ja: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Wehomeで予約",
      bullets: ["宿泊料金から即時7%割引", "迅速な現地サポート24/7", "政府認定の合法民泊"],
    }),
    zh: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "在Wehome预订",
      bullets: ["立即享受7%住宿折扣", "快速本地客户支持24/7", "政府认证合法民宿"],
    }),
    fr: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Réserver sur Wehome",
      bullets: ["7% de réduction immédiate", "Assistance locale 24/7", "Hébergements légaux certifiés"],
    }),
    de: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Auf Wehome buchen",
      bullets: ["7% Sofortrabatt auf den Preis", "Schneller lokaler Support 24/7", "Staatlich zertifizierte Unterkünfte"],
    }),
    es: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Reservar en Wehome",
      bullets: ["7% descuento instantáneo", "Soporte local rápido 24/7", "Alojamientos legales certificados"],
    }),
    ar: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "احجز على Wehome",
      bullets: ["خصم فوري 7%", "دعم محلي سريع 24/7", "إقامات قانونية معتمدة"],
    }),
    ru: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Забронировать",
      bullets: ["Мгновенная скидка 7%", "Быстрая поддержка 24/7", "Официально сертифицированное жильё"],
    }),
    vi: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Đặt trên Wehome",
      bullets: ["Giảm ngay 7%", "Hỗ trợ địa phương nhanh 24/7", "Chỗ ở hợp pháp được chứng nhận"],
    }),
    th: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "จองบน Wehome",
      bullets: ["ส่วนลดทันที 7%", "บริการลูกค้าท้องถิ่น 24/7", "ที่พักถูกกฎหมายรับรองโดยรัฐ"],
    }),
    id: (save) => ({
      title:   "wehome.me — Your Home in Korea",
      cta:     "Pesan di Wehome",
      bullets: ["Diskon langsung 7%", "Dukungan lokal cepat 24/7", "Akomodasi legal bersertifikat"],
    }),
  },

  // 숙소 페이지 — 위홈 미등록
  notMatched: {
    ko: { title: "이 숙소는 아직 위홈에 없어요", sub: "호스트에게 위홈 등록을 알려주세요!", cta: "호스트에게 메시지", cta2: "위홈 둘러보기" },
    en: { title: "This listing isn't on Wehome yet", sub: "Let the host know about Wehome!", cta: "Message the Host", cta2: "Explore Wehome" },
    ja: { title: "このお部屋はWehomeにまだありません", sub: "ホストにWehomeを紹介しましょう！", cta: "ホストにメッセージ", cta2: "Wehomeを見る" },
    zh: { title: "此房源尚未在Wehome上", sub: "告诉房东关于Wehome的信息！", cta: "联系房东", cta2: "浏览Wehome" },
    fr: { title: "Ce logement n'est pas encore sur Wehome", sub: "Prévenez l'hôte de Wehome !", cta: "Envoyer un message", cta2: "Explorer Wehome" },
    de: { title: "Dieses Angebot ist noch nicht auf Wehome", sub: "Erzählen Sie dem Gastgeber von Wehome!", cta: "Nachricht an Gastgeber", cta2: "Wehome entdecken" },
    es: { title: "Este alojamiento aún no está en Wehome", sub: "¡Dile al anfitrión sobre Wehome!", cta: "Mensaje al anfitrión", cta2: "Explorar Wehome" },
    ar: { title: "هذا المكان ليس على Wehome بعد", sub: "أخبر المضيف عن Wehome!", cta: "راسل المضيف", cta2: "استكشف Wehome" },
    ru: { title: "Этого жилья ещё нет на Wehome", sub: "Расскажите хозяину о Wehome!", cta: "Написать хозяину", cta2: "Смотреть Wehome" },
    vi: { title: "Chỗ ở này chưa có trên Wehome", sub: "Hãy giới thiệu Wehome với chủ nhà!", cta: "Nhắn tin chủ nhà", cta2: "Khám phá Wehome" },
    th: { title: "ที่พักนี้ยังไม่มีบน Wehome", sub: "แนะนำ Wehome ให้เจ้าของที่พัก!", cta: "ส่งข้อความเจ้าของ", cta2: "สำรวจ Wehome" },
    id: { title: "Properti ini belum ada di Wehome", sub: "Beritahu tuan rumah tentang Wehome!", cta: "Pesan ke Tuan Rumah", cta2: "Jelajahi Wehome" },
  },

  // 결제 페이지
  checkout: {
    ko: (save) => `위홈에서 예약하면 지금 바로 ${save} 절약!`,
    en: (save) => `Book on Wehome — Save ${save} instantly!`,
    ja: (save) => `Wehomeで予約して ${save} を今すぐ節約！`,
    zh: (save) => `在Wehome预订可节省 ${save}！`,
    fr: (save) => `Réservez sur Wehome — Économisez ${save} !`,
    de: (save) => `Auf Wehome buchen — Sparen Sie ${save}!`,
    es: (save) => `Reserve en Wehome — ¡Ahorre ${save} ya!`,
    ar: (save) => `احجز على Wehome ووفر ${save} الآن!`,
    ru: (save) => `Бронируйте на Wehome — сэкономьте ${save}!`,
    vi: (save) => `Đặt trên Wehome — Tiết kiệm ${save} ngay!`,
    th: (save) => `จองบน Wehome — ประหยัด ${save} ทันที!`,
    id: (save) => `Pesan di Wehome — Hemat ${save} sekarang!`,
  },

  // 기타 페이지
  other: {
    ko: "위홈 — 대한민국 1등 합법 공유숙박. 같은 숙소, 더 저렴하게!",
    en: "Wehome — Your Home in Korea. Same Room, Better Value Than Airbnb.",
    ja: "Wehome — 韓国の合法民泊No.1。Airbnbより安く泊まれます。",
    zh: "Wehome — 韩国最佳合法民宿。比Airbnb更划算！",
    fr: "Wehome — Votre maison en Corée. Même chambre, meilleur prix.",
    de: "Wehome — Ihr Zuhause in Korea. Gleiche Unterkunft, besserer Preis.",
    es: "Wehome — Tu hogar en Corea. Misma habitación, mejor precio.",
    ar: "Wehome — منزلك في كوريا. نفس الغرفة، سعر أفضل من Airbnb.",
    ru: "Wehome — Ваш дом в Корее. То же жильё, лучше цена.",
    vi: "Wehome — Ngôi nhà của bạn ở Hàn Quốc. Cùng phòng, giá tốt hơn.",
    th: "Wehome — บ้านของคุณในเกาหลี ห้องเดียวกัน ราคาดีกว่า",
    id: "Wehome — Rumah Anda di Korea. Kamar sama, harga lebih baik.",
  },

  // 호스트에게 보낼 메시지 템플릿
  hostMsg: {
    ko: "안녕하세요! 혹시 위홈(wehome.me) 알고 계신가요? 대한민국 정부 인증 공유숙박 플랫폼으로, 에어비앤비와 함께 등록하시면 내국인 고객도 만나실 수 있어요. 위홈에서는 7% 즉시 할인으로 더 많은 예약을 유도합니다. 참고하세요! 😊",
    en: "Hi! Have you heard of Wehome (wehome.me)? It's Korea's #1 government-certified home-sharing platform. Listing your property on Wehome alongside Airbnb can attract more local Korean guests. Wehome offers a 7% instant discount to boost bookings. Worth checking out! 😊",
    ja: "こんにちは！Wehome（wehome.me）はご存知ですか？韓国政府認定の民泊プラットフォームで、Airbnbと同時に掲載することで韓国人ゲストにもアプローチできます。7%即時割引でより多くの予約を獲得できます！😊",
    zh: "您好！您了解Wehome（wehome.me）吗？这是韩国政府认证的民宿平台，与Airbnb同时登记可吸引更多韩国本地客人。Wehome提供7%即时折扣来增加预订量，值得一试！😊",
  },
};

function getT(obj, lang) { return obj[lang] || obj.en; }

// ─── 배너 제거 ────────────────────────────────────────────────────────────────
function removeBanner() {
  document.getElementById("wh-banner")?.remove();
  document.body.style.marginTop = "";
}
function removeAll() {
  removeBanner();
  document.getElementById("wh-chat-btn")?.remove();
  document.getElementById("wh-host-modal")?.remove();
}

// ─── 호스트 메시지 모달 ───────────────────────────────────────────────────────
function showHostModal(lang) {
  document.getElementById("wh-host-modal")?.remove();
  const msg = getT(T.hostMsg, lang) || T.hostMsg.en;
  const modal = document.createElement("div");
  modal.id = "wh-host-modal";
  modal.innerHTML = `
    <div class="wh-modal-bg"></div>
    <div class="wh-modal-box">
      <button class="wh-modal-x">✕</button>
      <div class="wh-modal-logo">wehome</div>
      <h3 class="wh-modal-h">호스트에게 위홈을 알려주세요!</h3>
      <p class="wh-modal-desc">아래 메시지를 복사해서 에어비앤비 메시지로 호스트에게 보내주세요.</p>
      <textarea class="wh-modal-msg" readonly>${msg}</textarea>
      <button class="wh-modal-copy">메시지 복사하기</button>
      <a class="wh-modal-host-link" href="${WEHOME.hosting}" target="_blank" rel="noopener">
        위홈 호스트 등록 페이지 →
      </a>
    </div>
  `;
  modal.querySelector(".wh-modal-bg").onclick = () => modal.remove();
  modal.querySelector(".wh-modal-x").onclick  = () => modal.remove();
  modal.querySelector(".wh-modal-copy").onclick = async function() {
    await navigator.clipboard.writeText(msg).catch(() => {});
    this.textContent = "✓ 복사됐습니다!";
    this.style.background = "#1da129";
    setTimeout(() => {
      this.textContent = "메시지 복사하기";
      this.style.background = "";
    }, 2000);
  };
  document.body.appendChild(modal);
}

// ─── 배너 빌드 ────────────────────────────────────────────────────────────────
function buildBanner({ lang, pageType, wehomeData, checkoutPrice }) {

  const banner = document.createElement("div");
  banner.id = "wh-banner";

  if (pageType === "listing") {
    // ── 숙소 페이지: 매칭 여부와 관계없이 항상 3가지 가치 표시 ──
    const bullets = getT(T.matched, lang)(null).bullets ?? getT(T.matched, "en")(null).bullets;
    const isMatched = wehomeData?.found && wehomeData?.wehome_id;

    // 매칭 숙소면 절약 금액 계산
    const saveAmt = (wehomeData?.airbnb_price && wehomeData?.wehome_price)
      ? `${wehomeData.currency ?? "₩"}${Math.round(wehomeData.airbnb_price - wehomeData.wehome_price).toLocaleString()}`
      : null;

    // 링크 목적지
    const destUrl  = isMatched ? `${WEHOME.base}/profile/${wehomeData.wehome_id}` : WEHOME.base;
    const destLabel = isMatched
      ? (getT(T.matched, lang)(saveAmt).cta + " →")
      : (getT(T.notMatched, lang).cta2 + " →");

    // 헤드라인
    const headline = isMatched
      ? (saveAmt
          ? (lang === "ko" ? `위홈에서 예약하면 ${saveAmt} 절약!` : getT(T.matched, lang)(saveAmt).title)
          : getT(T.matched, lang)(null).title)
      : (lang === "ko" ? "wehome.me — Your Home in Korea" : "wehome.me — Your Home in Korea");

    const badgeHtml = isMatched
      ? `<span class="wh-badge wh-badge-match">✓ 위홈 등록 숙소</span>`
      : "";

    banner.innerHTML = `
      <div class="wh-inner">
        <div class="wh-logo">wehome</div>
        <div class="wh-body">
          <div class="wh-row">
            ${badgeHtml}
            <strong class="wh-title">${headline}</strong>
          </div>
          <div class="wh-bullets">
            ${bullets.map((b, i) => `<span class="wh-bullet"><span class="wh-num">${i+1}</span>${b}</span>`).join("")}
          </div>
        </div>
        <div class="wh-actions">
          <a class="wh-cta" href="${destUrl}" target="_blank" rel="noopener">${destLabel}</a>
          ${!isMatched ? `<button class="wh-cta wh-cta-host" id="wh-host-msg-btn">${getT(T.notMatched, lang).cta}</button>` : ""}
        </div>
        <button class="wh-close">✕</button>
      </div>
    `;
    if (!isMatched) {
      banner.querySelector("#wh-host-msg-btn").onclick = () => showHostModal(lang);
    }

  } else if (pageType === "checkout" && checkoutPrice) {
    // ── 결제 페이지 ──
    const disc = Math.round(checkoutPrice.amount * WEHOME.discount / 100);
    const saveStr = `${checkoutPrice.symbol}${disc.toLocaleString()}`;
    const fn = getT(T.checkout, lang);
    const msg = typeof fn === "function" ? fn(saveStr) : fn;

    banner.innerHTML = `
      <div class="wh-inner">
        <div class="wh-logo">wehome</div>
        <div class="wh-body">
          <strong class="wh-checkout-msg">${msg}</strong>
          <div class="wh-sub">Same Room · Better Value · wehome.me</div>
        </div>
        <a class="wh-cta" href="${WEHOME.base}" target="_blank" rel="noopener">Wehome →</a>
        <button class="wh-close">✕</button>
      </div>
    `;

  } else {
    // ── 기타 페이지 ──
    const text = getT(T.other, lang);
    banner.innerHTML = `
      <div class="wh-inner">
        <div class="wh-logo">wehome</div>
        <div class="wh-body">
          <span class="wh-other-text">${text}</span>
        </div>
        <a class="wh-cta wh-cta-ghost" href="${WEHOME.base}" target="_blank" rel="noopener">wehome.me →</a>
        <button class="wh-close">✕</button>
      </div>
    `;
  }

  banner.querySelector(".wh-close").onclick = (e) => {
    e.stopPropagation();
    removeBanner();
    sessionStorage.setItem("wh-dismissed-" + pageType, "1");
  };

  return banner;
}

// ─── 플로팅 메시지 버튼 ───────────────────────────────────────────────────────
function buildChatBtn(lang) {
  const labels = {
    ko:"1:1 문의", en:"Chat", ja:"チャット", zh:"咨询",
    ar:"دردشة", fr:"Chat", de:"Chat", es:"Chat",
    ru:"Чат", vi:"Chat", th:"แชท", id:"Chat",
  };
  const btn = document.createElement("a");
  btn.id = "wh-chat-btn";
  btn.href = WEHOME.messages;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
    </svg>
    <span>${labels[lang] || labels.en}</span>
  `;
  return btn;
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
async function main() {
  const lang     = detectLang();
  const pageType = getPageType();

  // 닫은 배너는 재표시 안 함
  if (sessionStorage.getItem("wh-dismissed-" + pageType)) {
    if (!document.getElementById("wh-chat-btn"))
      document.body.appendChild(buildChatBtn(lang));
    return;
  }

  removeBanner();

  let wehomeData    = null;
  let checkoutPrice = null;

  if (pageType === "listing") {
    const id   = getListingId();
    const meta = getListingMeta();
    if (id) wehomeData = await findOnWehome(id, meta);
  } else if (pageType === "checkout") {
    checkoutPrice = getCheckoutPrice();
  }

  const banner = buildBanner({ lang, pageType, wehomeData, checkoutPrice });
  document.body.prepend(banner);
  requestAnimationFrame(() => {
    document.body.style.marginTop = banner.offsetHeight + "px";
  });

  if (!document.getElementById("wh-chat-btn"))
    document.body.appendChild(buildChatBtn(lang));
}

// SPA 라우팅 감지
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href === lastUrl) return;
  lastUrl = location.href;
  setTimeout(main, getPageType() === "checkout" ? 2000 : 800);
}).observe(document, { subtree: true, childList: true });

setTimeout(main, getPageType() === "checkout" ? 2000 : 0);
