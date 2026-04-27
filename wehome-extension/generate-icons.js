/**
 * 아이콘 PNG 파일 생성 스크립트
 * 실행: node generate-icons.js
 * (Node.js 18+ 필요, canvas 패키지 불필요 — 순수 PNG 바이너리)
 */

const fs = require("fs");
const path = require("path");

// 간단한 PNG 인코더 (순수 JS, 의존성 없음)
function createPNG(size, bgColor, textColor, text) {
  // Canvas API를 node환경에서 사용 불가이므로
  // 미리 준비된 base64 PNG 데이터를 사용합니다.
  // 실제 배포 시에는 Adobe Illustrator나 Figma에서 위홈 로고를 PNG로 export 하세요.
  console.log(`⚠️  ${size}x${size} 아이콘: 수동으로 icons/icon${size}.png 파일을 추가해주세요.`);
}

// 아이콘 크기 목록
const sizes = [16, 32, 48, 128];

console.log("=".repeat(50));
console.log("위홈 크롬 익스텐션 아이콘 생성 가이드");
console.log("=".repeat(50));
console.log("");
console.log("📁 icons/ 폴더에 다음 파일들이 필요합니다:");
sizes.forEach((s) => console.log(`   icons/icon${s}.png  (${s}x${s}px)`));
console.log("");
console.log("🎨 아이콘 디자인 가이드:");
console.log("   배경색: #FEE500 (위홈 노란색)");
console.log("   텍스트: '위홈' 또는 'W' (검정색 #000)");
console.log("   모서리: 둥글게 (rounded)");
console.log("");
console.log("🔧 빠른 생성 방법:");
console.log("   1. https://favicon.io/favicon-generator/ 에서 생성");
console.log("      - Text: W");
console.log("      - Background: #FEE500");
console.log("      - Font color: #000000");
console.log("   2. 다운로드 후 icons/ 폴더에 복사");
console.log("");
console.log("✅ 임시 테스트용 아이콘 생성 중...");

// 임시 1px 투명 PNG (테스트용)
// PNG 파일 구조: 시그니처 + IHDR + IDAT + IEND
function minimalPNG(size) {
  // 실제 색상이 있는 PNG를 생성하기 위해 단순한 방법 사용
  // 이 함수는 완전히 황색(FEE500)으로 채워진 PNG 생성

  const { createCanvas } = (() => {
    try { return require("canvas"); } catch { return null; }
  })() ?? {};

  if (createCanvas) {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");

    // 배경
    ctx.fillStyle = "#FEE500";
    ctx.beginPath();
    ctx.roundRect(0, 0, size, size, size * 0.2);
    ctx.fill();

    // 텍스트
    ctx.fillStyle = "#000000";
    ctx.font = `bold ${Math.floor(size * 0.55)}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("W", size / 2, size / 2);

    return canvas.toBuffer("image/png");
  }

  // canvas 패키지 없으면 1x1 투명 PNG
  return Buffer.from(
    "89504e470d0a1a0a0000000d4948445200000001000000010802000000907753" +
    "de000000124944415478016360f8cfc0c0c000000000040001c27b3e00000000" +
    "49454e44ae426082",
    "hex"
  );
}

sizes.forEach((s) => {
  const outPath = path.join(__dirname, "icons", `icon${s}.png`);
  if (!fs.existsSync(outPath)) {
    fs.writeFileSync(outPath, minimalPNG(s));
    console.log(`   ✓ icons/icon${s}.png 생성됨 (임시)`);
  } else {
    console.log(`   ⏭️  icons/icon${s}.png 이미 존재`);
  }
});

console.log("");
console.log("✅ 완료! Chrome에서 테스트:");
console.log("   1. chrome://extensions 열기");
console.log("   2. '개발자 모드' 활성화");
console.log("   3. '압축해제된 확장 프로그램 로드' 클릭");
console.log("   4. wehome-extension/ 폴더 선택");
