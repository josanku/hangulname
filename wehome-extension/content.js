/**
 * Wehome Chrome Extension — Content Script
 * Airbnb 숙소 페이지에 주입되어 위홈 매칭 숙소를 찾고 배너/모달을 표시합니다.
 */

const WEHOME_API = "https://wehome.me/api/v1/ext/match";
const WEHOME_SEARCH = "https://wehome.me/search";
const WEHOME_BASE = "https://wehome.me";

// ─── Airbnb 페이지에서 숙소 정보 추출 ──────────────────────────────────────

function getListingDetails() {
  // 1. 리스팅 ID (URL에서)
  const idMatch = window.location.pathname.match(/\/rooms\/(\d+)/);
  const listingId = idMatch?.[1];
  if (!listingId) return null;

  // 2. 제목
  const title = document.querySelector("h1")?.textContent?.trim() ?? "";

  // 3. 좌표 및 주소 (JSON-LD 스키마에서)
  let lat = null, lng = null, address = "";
  try {
    const ldJsonEl = document.querySelector('script[type="application/ld+json"]');
    if (ldJsonEl) {
      const ld = JSON.parse(ldJsonEl.textContent);
      lat = ld?.geo?.latitude ?? ld?.containsPlace?.geo?.latitude ?? null;
      lng = ld?.geo?.longitude ?? ld?.containsPlace?.geo?.longitude ?? null;
      if (ld?.address) {
        const a = ld.address;
        address = [a.streetAddress, a.addressLocality, a.addressCountry]
          .filter(Boolean).join(", ");
      }
    }
  } catch (_) {}

  // 4. 체크인/아웃 날짜 (URL 파라미터에서)
  const params = new URLSearchParams(window.location.search);
  const checkIn  = params.get("check_in")  ?? "";
  const checkOut = params.get("check_out") ?? "";
  const guests   = params.get("guests")    ?? "1";

  // 5. 가격 (페이지에서)
  const priceEl = document.querySelector('[data-testid="price-and-discounted-price"] span') ??
                  document.querySelector("._tyxjp1");
  const priceText = priceEl?.textContent?.replace(/[^0-9,]/g, "").replace(",", "") ?? "";
  const airbnbPrice = parseInt(priceText) || null;

  return { listingId, title, lat, lng, address, checkIn, checkOut, guests, airbnbPrice };
}

// ─── 위홈 매칭 API 호출 ────────────────────────────────────────────────────

async function findWehomeListing(details) {
  try {
    const res = await fetch(WEHOME_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        airbnb_id:  details.listingId,
        title:      details.title,
        lat:        details.lat,
        lng:        details.lng,
        address:    details.address,
        check_in:   details.checkIn,
        check_out:  details.checkOut,
        guests:     details.guests,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.found) return data; // { found, url, title, wehome_price, ... }
    }
  } catch (_) {}

  // API 없거나 실패 시 → 지역 검색 URL로 fallback
  if (details.lat && details.lng) {
    return {
      found: false,
      url: `${WEHOME_SEARCH}?lat=${details.lat}&lng=${details.lng}&radius=0.3`,
      title: details.title,
      searchOnly: true,
    };
  }
  return null;
}

// ─── 배너 (상단 고정) ────────────────────────────────────────────────────────

function showBanner(wehomeData, details) {
  removeBanner();

  const saving = details.airbnbPrice && wehomeData.wehome_price
    ? details.airbnbPrice - wehomeData.wehome_price
    : null;

  const banner = document.createElement("div");
  banner.id = "wehome-banner";
  banner.innerHTML = `
    <div class="wh-inner">
      <div class="wh-left">
        <span class="wh-logo">위홈</span>
        <div class="wh-text">
          <strong>${wehomeData.searchOnly ? "같은 지역 위홈 숙소 검색" : "🎉 이 숙소, 위홈에 있어요!"}</strong>
          <span>${saving ? `에어비앤비보다 약 ₩${saving.toLocaleString()} 절약 가능` : "Same Home in Better Value than Airbnb"}</span>
        </div>
      </div>
      <a class="wh-btn" href="${wehomeData.url}" target="_blank" rel="noopener">
        ${wehomeData.searchOnly ? "위홈에서 검색" : "위홈에서 보기"}
      </a>
      <button class="wh-close" aria-label="닫기">✕</button>
    </div>
  `;

  banner.querySelector(".wh-close").addEventListener("click", removeBanner);
  document.body.prepend(banner);

  // 배너 높이만큼 Airbnb 상단 여백 추가
  setTimeout(() => {
    const h = banner.offsetHeight;
    document.body.style.paddingTop = `${h}px`;
  }, 100);
}

function removeBanner() {
  const b = document.getElementById("wehome-banner");
  if (b) {
    b.remove();
    document.body.style.paddingTop = "";
  }
}

// ─── 예약 버튼 가로채기 ────────────────────────────────────────────────────

const RESERVE_SELECTORS = [
  '[data-testid="book-it-default"]',
  '[data-testid="homes-pdp-cta-btn"]',
  "button._1mzhry13",   // Airbnb 클래스 (자주 바뀜)
  'a[href*="/book/stays"]',
];

function findReserveButton() {
  for (const sel of RESERVE_SELECTORS) {
    const el = document.querySelector(sel);
    if (el) return el;
  }
  // 텍스트로 폴백
  return [...document.querySelectorAll("button")].find(
    (b) => /reserve|예약하기|예약/i.test(b.textContent.trim()) &&
           b.offsetParent !== null // 화면에 표시된 버튼
  );
}

function attachReserveInterceptor(wehomeData) {
  let handled = false;

  const observer = new MutationObserver(() => {
    if (handled) return;
    const btn = findReserveButton();
    if (!btn || btn.dataset.whHandled) return;

    btn.dataset.whHandled = "true";
    btn.addEventListener("click", (e) => {
      if (wehomeData?.found && !wehomeData.searchOnly) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showModal(wehomeData);
      }
      // searchOnly면 Airbnb 예약 그대로 진행 (모달 없음)
    }, true);

    handled = true;
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // 즉시 한 번 시도
  const btn = findReserveButton();
  if (btn && !btn.dataset.whHandled) {
    btn.dataset.whHandled = "true";
    btn.addEventListener("click", (e) => {
      if (wehomeData?.found && !wehomeData.searchOnly) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showModal(wehomeData);
      }
    }, true);
  }
}

// ─── 모달 (Reserve 클릭 시) ──────────────────────────────────────────────────

function showModal(wehomeData) {
  removeModal();

  const overlay = document.createElement("div");
  overlay.id = "wehome-modal";

  overlay.innerHTML = `
    <div class="wh-modal-bg"></div>
    <div class="wh-modal-box" role="dialog" aria-modal="true">
      <button class="wh-modal-close" aria-label="닫기">✕</button>

      <div class="wh-modal-logo">위홈</div>
      <h2 class="wh-modal-title">🏠 위홈에서 더 저렴하게 예약하세요!</h2>
      <p class="wh-modal-sub">Same Home in Better Value than Airbnb</p>

      ${wehomeData.wehome_price && wehomeData.airbnb_price ? `
        <div class="wh-price-compare">
          <div class="wh-price-item wh-price-airbnb">
            <span class="wh-price-label">Airbnb</span>
            <span class="wh-price-value">₩${Number(wehomeData.airbnb_price).toLocaleString()}</span>
          </div>
          <div class="wh-price-arrow">→</div>
          <div class="wh-price-item wh-price-wehome">
            <span class="wh-price-label">위홈</span>
            <span class="wh-price-value">₩${Number(wehomeData.wehome_price).toLocaleString()}</span>
          </div>
        </div>
        <p class="wh-saving">약 ₩${(wehomeData.airbnb_price - wehomeData.wehome_price).toLocaleString()} 절약!</p>
      ` : ""}

      <div class="wh-modal-actions">
        <a class="wh-modal-primary" href="${wehomeData.url}" target="_blank" rel="noopener">
          위홈에서 예약하기
        </a>
        <button class="wh-modal-secondary" id="wh-continue-airbnb">
          Airbnb 계속 진행
        </button>
      </div>

      <p class="wh-modal-note">
        위홈(wehome.me)은 대한민국 공유숙박 플랫폼으로<br>
        같은 숙소를 더 저렴하게 연결해드립니다.
      </p>
    </div>
  `;

  overlay.querySelector(".wh-modal-bg").addEventListener("click", removeModal);
  overlay.querySelector(".wh-modal-close").addEventListener("click", removeModal);
  overlay.querySelector("#wh-continue-airbnb").addEventListener("click", () => {
    removeModal();
    // Airbnb Reserve 버튼을 다시 클릭 (가로채기 없이)
    const btn = findReserveButton();
    if (btn) {
      delete btn.dataset.whHandled;
      btn.click();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") removeModal();
  }, { once: true });

  document.body.appendChild(overlay);
}

function removeModal() {
  document.getElementById("wehome-modal")?.remove();
}

// ─── 메인 실행 ───────────────────────────────────────────────────────────────

async function main() {
  const details = getListingDetails();
  if (!details) return;

  // 한국 숙소인지 간단히 필터 (주소에 Korea/한국 포함 또는 좌표 기반)
  const isKorea = details.address.includes("Korea") ||
                  details.address.includes("한국") ||
                  details.address.includes("KR") ||
                  (details.lat && details.lat > 33 && details.lat < 39 &&
                   details.lng && details.lng > 124 && details.lng < 132);

  if (!isKorea) return; // 한국 숙소만 처리

  // 위홈 매칭 검색
  const wehomeData = await findWehomeListing(details);
  if (!wehomeData) return;

  // 배너 표시
  showBanner(wehomeData, details);

  // 예약 버튼 가로채기
  attachReserveInterceptor(wehomeData);

  // 현재 탭에 위홈 데이터 저장 (팝업에서 사용)
  chrome.storage.local.set({
    currentListing: {
      ...details,
      wehomeData,
      timestamp: Date.now(),
    },
  });
}

// SPA 라우팅 감지 (Airbnb는 React SPA)
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    removeBanner();
    removeModal();
    if (/\/rooms\/\d+/.test(location.href)) {
      setTimeout(main, 1500); // 페이지 렌더링 대기
    }
  }
}).observe(document, { subtree: true, childList: true });

// 초기 실행
main();
