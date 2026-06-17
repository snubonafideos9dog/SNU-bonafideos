import { defineConfig } from 'vite'

// ─────────────────────────────────────────────
// 경량 개발서버 전용 구성
// - 현재 정적 사이트 구조(런타임 fetch 파셜 + 전역 스크립트)를 그대로 유지
// - `npm run dev` 으로 로컬 미리보기 (file:// 의 CORS 문제 해결)
// - 배포는 기존처럼 GitHub Pages 원본 파일 업로드 방식 유지
//   (이 정적 사이트엔 번들 빌드가 사실상 불필요합니다)
// ─────────────────────────────────────────────
export default defineConfig({
  root: '.',
  // GitHub Pages 등 하위 경로 배포까지 호환되도록 상대 경로 사용
  base: './',
  server: {
    port: 5173,
    open: true,   // dev 서버 실행 시 브라우저 자동 오픈
  },
  preview: {
    port: 4173,
  },
})
