// Service Worker — 탭 변경 감지, 스토리지 관리

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    // Airbnb 숙소 페이지가 아닌 곳으로 이동하면 스토리지 초기화
    if (!/airbnb\.(com|co\.kr)\/rooms\/\d+/.test(tab.url)) {
      chrome.storage.local.remove("currentListing");
    }
  }
});
