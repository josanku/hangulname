function show(id) {
  document.querySelectorAll(".state").forEach((el) => el.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}

async function init() {
  show("state-loading");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  const url = tab?.url ?? "";

  // Airbnb 숙소 페이지가 아니면
  if (!/airbnb\.(com|co\.kr)\/rooms\/\d+/.test(url)) {
    show("state-idle");
    return;
  }

  // 스토리지에서 현재 숙소 데이터 읽기
  const { currentListing } = await chrome.storage.local.get("currentListing");

  if (!currentListing) {
    // 페이지는 맞지만 아직 콘텐츠 스크립트가 실행 안됨
    show("state-idle");
    return;
  }

  const { wehomeData, title, airbnbPrice } = currentListing;

  if (!wehomeData) {
    show("state-foreign");
    return;
  }

  if (wehomeData.found && !wehomeData.searchOnly) {
    // 매칭 숙소 있음
    document.getElementById("match-title").textContent =
      wehomeData.title || title || "현재 숙소";

    const btnMatch = document.getElementById("btn-match");
    btnMatch.href = wehomeData.url;

    // 가격 비교 (데이터가 있을 때만)
    if (wehomeData.wehome_price && (airbnbPrice || wehomeData.airbnb_price)) {
      const ap = wehomeData.airbnb_price || airbnbPrice;
      const wp = wehomeData.wehome_price;
      document.getElementById("airbnb-price").textContent = `₩${Number(ap).toLocaleString()}`;
      document.getElementById("wehome-price").textContent = `₩${Number(wp).toLocaleString()}`;
      document.getElementById("price-compare").classList.remove("hidden");
    }

    show("state-match");
  } else {
    // 검색 폴백
    document.getElementById("btn-search").href = wehomeData.url;
    show("state-search");
  }
}

init();
