// Wehome Extension — Airbnb 숙소 페이지 상단 배너

const WEHOME_URL = "https://wehome.me";

function showBanner() {
  if (document.getElementById("wehome-ext-banner")) return;

  const banner = document.createElement("div");
  banner.id = "wehome-ext-banner";
  banner.innerHTML = `
    <a href="${WEHOME_URL}" target="_blank" rel="noopener noreferrer" id="wehome-ext-link">
      <span class="wh-logo">위홈</span>
      <span class="wh-msg">
        <strong>같은 숙소, 에어비앤비보다 저렴하게!</strong>
        <span>위홈(Wehome.me)에서 직접 예약하세요 — Your Home in Korea</span>
      </span>
      <span class="wh-cta">위홈 바로가기 →</span>
    </a>
    <button id="wehome-ext-close" aria-label="닫기">✕</button>
  `;

  banner.querySelector("#wehome-ext-close").addEventListener("click", (e) => {
    e.stopPropagation();
    banner.remove();
    document.body.style.marginTop = "";
  });

  document.body.prepend(banner);

  // 배너 높이만큼 페이지 밀어내기
  const h = banner.offsetHeight;
  document.body.style.marginTop = h + "px";
}

// 즉시 실행
showBanner();

// Airbnb는 SPA — URL 변경 감지해서 숙소 페이지로 이동 시 배너 재표시
let lastUrl = location.href;
new MutationObserver(() => {
  if (location.href !== lastUrl) {
    lastUrl = location.href;
    if (/\/rooms\/\d+/.test(location.href)) {
      setTimeout(showBanner, 800);
    } else {
      document.getElementById("wehome-ext-banner")?.remove();
      document.body.style.marginTop = "";
    }
  }
}).observe(document, { subtree: true, childList: true });
