/**
 * Wehome Chrome Extension — Smart Banner
 * 페이지 유형 × 사용자 언어에 따라 최적화된 배너 표시
 */

// ─── 위홈 설정 ────────────────────────────────────────────────────────────────
const WEHOME = {
  url:      "https://wehome.me",
  chat:     "https://wehome.me/messages",       // 1:1 메시지
  discount: 7,                                   // 할인율 (%)
};

// ─── 언어 감지 ────────────────────────────────────────────────────────────────
function detectLang() {
  const l = (navigator.language || "en").toLowerCase().split("-")[0];
  return ["ko","ja","zh","ar","fr","de","es","ru"].includes(l) ? l : "en";
}

// ─── 페이지 유형 감지 ─────────────────────────────────────────────────────────
function getPageType() {
  const p = location.pathname;
  if (/\/rooms\/\d+/.test(p))                                    return "listing";
  if (/\/book\/stays|\/book\/confirmation|\/payment/.test(p))    return "checkout";
  return "other";
}

// ─── 콘텐츠 (언어 × 페이지) ──────────────────────────────────────────────────
const COPY = {
  listing: {
    ko: {
      title:   "위홈 — 대한민국 1등 합법 공유숙박",
      bullets: ["내국인 합법 공유숙박은 위홈", "숙박료 즉시 7% 할인", "현지 신속 고객지원"],
      cta:     "위홈 바로가기",
    },
    en: {
      title:   "Wehome — Your Home in Korea",
      bullets: ["7% Instant Discount on Room Rate", "Fast Local Customer Support 24/7", "Gov't Certified Legal Stays"],
      cta:     "Go to Wehome",
    },
    ja: {
      title:   "Wehome — 韓国の合法民泊No.1",
      bullets: ["宿泊料金から即時7%割引", "迅速な現地サポート", "政府認定の合法民泊"],
      cta:     "Wehomeへ",
    },
    zh: {
      title:   "Wehome — 韩国最佳合法民宿",
      bullets: ["立即享受7%住宿折扣", "快速本地客户支持", "政府认证合法民宿"],
      cta:     "前往Wehome",
    },
    ar: {
      title:   "Wehome — إقامتك في كوريا",
      bullets: ["خصم فوري 7% على سعر الإيجار", "دعم محلي سريع 24/7", "إقامات قانونية معتمدة حكومياً"],
      cta:     "زيارة Wehome",
    },
    fr: {
      title:   "Wehome — Votre maison en Corée",
      bullets: ["7% de réduction immédiate", "Assistance locale rapide 24/7", "Hébergements légaux certifiés"],
      cta:     "Aller sur Wehome",
    },
    de: {
      title:   "Wehome — Ihr Zuhause in Korea",
      bullets: ["7% Sofortrabatt auf den Zimmerpreis", "Schneller lokaler Support 24/7", "Staatlich zertifizierte Unterkünfte"],
      cta:     "Zu Wehome",
    },
    es: {
      title:   "Wehome — Tu hogar en Corea",
      bullets: ["7% descuento instantáneo en la habitación", "Soporte local rápido 24/7", "Alojamientos legales certificados"],
      cta:     "Ir a Wehome",
    },
    ru: {
      title:   "Wehome — Ваш дом в Корее",
      bullets: ["Мгновенная скидка 7%", "Быстрая местная поддержка 24/7", "Официально сертифицированное жильё"],
      cta:     "Перейти на Wehome",
    },
  },
  other: {
    ko: { text: "위홈 — 대한민국 공유숙박 1등. 에어비앤비보다 더 저렴하게!",   cta: "위홈 바로가기" },
    en: { text: "Your Home in Korea — Same Room in Better Value Than Airbnb", cta: "Visit Wehome" },
    ja: { text: "韓国の民泊ならWehome。Airbnbより安く泊まれます",              cta: "Wehomeへ" },
    zh: { text: "在韩国住民宿，选Wehome。比Airbnb更划算！",                   cta: "访问Wehome" },
    ar: { text: "Wehome — نفس الغرفة بسعر أفضل من Airbnb في كوريا",         cta: "زيارة Wehome" },
    fr: { text: "Wehome — Même chambre, meilleur prix qu'Airbnb en Corée",   cta: "Visiter Wehome" },
    de: { text: "Wehome — Gleiche Unterkunft, besserer Preis als Airbnb",     cta: "Wehome besuchen" },
    es: { text: "Wehome — Misma habitación, mejor precio que Airbnb en Corea", cta: "Visitar Wehome" },
    ru: { text: "Wehome — То же жильё, лучше цена чем Airbnb в Корее",       cta: "Посетить Wehome" },
  },
};

// ─── 가격 추출 (결제 페이지) ──────────────────────────────────────────────────
function extractCheckoutPrice() {
  const selectors = [
    '[data-testid="price-breakdown-total-amount"]',
    '[data-testid="book-it-total-price"]',
    "._6snwwx",
    "._1k4xcdh",
    '._y8ard8:last-child',
    '[class*="totalPrice"]',
  ];
  for (const sel of selectors) {
    const el = document.querySelector(sel);
    if (!el) continue;
    const text = el.textContent.replace(/[^\d,.]/g, "");
    const num = parseFloat(text.replace(/,/g, ""));
    if (!isNaN(num) && num > 0) return num;
  }
  return null;
}

// 통화 기호 추출
function extractCurrencySymbol() {
  const el = document.querySelector('[data-testid="price-breakdown-total-amount"]') ||
             document.querySelector('._6snwwx');
  const text = el?.textContent ?? "";
  const match = text.match(/^([^\d\s]+)/);
  return match ? match[1] : "₩";
}

// ─── 배너 제거 ────────────────────────────────────────────────────────────────
function removeBanner() {
  const b = document.getElementById("wh-banner");
  if (b) { b.remove(); document.body.style.marginTop = ""; }
}

// ─── 배너 생성 ────────────────────────────────────────────────────────────────
function buildBanner(lang, pageType) {
  const banner = document.createElement("div");
  banner.id = "wh-banner";
  banner.setAttribute("data-lang", lang);
  banner.setAttribute("data-page", pageType);

  if (pageType === "listing") {
    const c = COPY.listing[lang] || COPY.listing.en;
    banner.innerHTML = `
      <div class="wh-inner wh-listing">
        <a class="wh-brand-area" href="${WEHOME.url}" target="_blank" rel="noopener">
          <span class="wh-logo">wehome</span>
          <div class="wh-content">
            <div class="wh-title">${c.title}</div>
            <div class="wh-bullets">
              ${c.bullets.map((b, i) => `<span class="wh-bullet"><span class="wh-num">${i+1}</span>${b}</span>`).join("")}
            </div>
          </div>
          <span class="wh-cta">${c.cta} →</span>
        </a>
        <button class="wh-close" aria-label="닫기">✕</button>
      </div>
    `;
  } else if (pageType === "checkout") {
    const price = extractCheckoutPrice();
    const symbol = extractCurrencySymbol();
    const discount = price ? Math.round(price * WEHOME.discount / 100) : null;
    const savings = discount ? `${symbol}${discount.toLocaleString()}` : `${WEHOME.discount}%`;

    const msgs = {
      ko: { txt: `위홈에서 예약하면 지금 바로 `, save: `${savings} 절약!`, sub: "같은 숙소, 에어비앤비보다 저렴하게" },
      en: { txt: "Book on Wehome — Save ", save: `${savings} now!`, sub: "Same room, better value" },
      ja: { txt: "Wehomeで予約して ", save: `${savings}お得！`, sub: "同じ部屋、Airbnbより安く" },
      zh: { txt: "在Wehome预订可省 ", save: `${savings}！`, sub: "同一房间，价格更优惠" },
      ar: { txt: "احجز على Wehome ووفر ", save: `${savings}!`, sub: "نفس الغرفة، سعر أفضل" },
      fr: { txt: "Réservez sur Wehome — Économisez ", save: `${savings} !`, sub: "Même chambre, meilleur prix" },
      de: { txt: "Auf Wehome buchen — Sparen Sie ", save: `${savings}!`, sub: "Gleiches Zimmer, besserer Preis" },
      es: { txt: "Reserve en Wehome — Ahorre ", save: `${savings}!`, sub: "Misma habitación, mejor precio" },
      ru: { txt: "Забронируйте на Wehome — сэкономьте ", save: `${savings}!`, sub: "Тот же номер, лучшая цена" },
    };
    const m = msgs[lang] || msgs.en;

    banner.innerHTML = `
      <div class="wh-inner wh-checkout">
        <a class="wh-brand-area" href="${WEHOME.url}" target="_blank" rel="noopener">
          <span class="wh-logo">wehome</span>
          <div class="wh-content">
            <div class="wh-checkout-msg">
              <span>${m.txt}</span><strong class="wh-savings">${m.save}</strong>
            </div>
            <div class="wh-checkout-sub">${m.sub}</div>
          </div>
          <span class="wh-cta wh-cta-checkout">Wehome →</span>
        </a>
        <button class="wh-close" aria-label="닫기">✕</button>
      </div>
    `;
  } else {
    // other pages
    const c = COPY.other[lang] || COPY.other.en;
    banner.innerHTML = `
      <div class="wh-inner wh-other">
        <a class="wh-brand-area" href="${WEHOME.url}" target="_blank" rel="noopener">
          <span class="wh-logo">wehome</span>
          <span class="wh-other-text">${c.text}</span>
          <span class="wh-cta">${c.cta} →</span>
        </a>
        <button class="wh-close" aria-label="닫기">✕</button>
      </div>
    `;
  }

  banner.querySelector(".wh-close").addEventListener("click", (e) => {
    e.stopPropagation();
    removeBanner();
    sessionStorage.setItem("wh-closed-" + pageType, "1");
  });

  return banner;
}

// ─── 플로팅 메시지 버튼 ───────────────────────────────────────────────────────
function showChatButton(lang) {
  if (document.getElementById("wh-chat-btn")) return;

  const labels = {
    ko: "1:1 문의", en: "Chat", ja: "チャット", zh: "咨询",
    ar: "محادثة", fr: "Chat", de: "Chat", es: "Chat", ru: "Чат",
  };

  const btn = document.createElement("a");
  btn.id = "wh-chat-btn";
  btn.href = WEHOME.chat;
  btn.target = "_blank";
  btn.rel = "noopener";
  btn.setAttribute("aria-label", "Wehome 1:1 메시지");
  btn.innerHTML = `
    <span class="wh-chat-icon">
      <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
      </svg>
    </span>
    <span class="wh-chat-label">${labels[lang] || labels.en}</span>
  `;

  document.body.appendChild(btn);
}

// ─── 메인 ────────────────────────────────────────────────────────────────────
function main() {
  const lang     = detectLang();
  const pageType = getPageType();

  // 같은 페이지 유형에서 닫은 경우 배너 표시 안 함
  if (sessionStorage.getItem("wh-closed-" + pageType)) {
    showChatButton(lang);
    return;
  }

  removeBanner();
  const banner = buildBanner(lang, pageType);
  document.body.prepend(banner);

  requestAnimationFrame(() => {
    const h = banner.offsetHeight;
    document.body.style.marginTop = h + "px";
  });

  showChatButton(lang);
}

// SPA 라우팅 감지
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href === lastUrl) return;
  lastUrl = location.href;
  setTimeout(main, 1000);
}).observe(document, { subtree: true, childList: true });

// 결제 페이지는 가격 로딩 대기
const delay = getPageType() === "checkout" ? 2000 : 0;
setTimeout(main, delay);
