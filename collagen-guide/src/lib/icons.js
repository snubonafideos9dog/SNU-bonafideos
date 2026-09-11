/** 인라인 SVG 아이콘 (외부 아이콘 라이브러리 의존 없음) */
const svg = (paths, extra = '') =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"
    stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${paths}</svg>`

export const icons = {
  logo: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" width="18" height="18">
    <path d="M12 3.2 4.8 6.4v5.1c0 4.3 2.9 8.3 7.2 9.6 4.3-1.3 7.2-5.3 7.2-9.6V6.4L12 3.2Z"
      stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
    <path d="M9.2 12.1h5.6M12 9.3v5.6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/>
  </svg>`,
  print: svg(
    `<path d="M7 9V4h10v5"/><rect x="4" y="9" width="16" height="7" rx="2"/><path d="M7 14h10v6H7z"/>`,
    'width="16" height="16"'
  ),
  info: svg(`<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.8h.01"/>`, 'width="17" height="17"'),
  syringe: svg(
    `<path d="m14.5 4.5 5 5M17 7 8.5 15.5 6 19l-2 1 1-2 3.5-2.5L17 7Z"/><path d="m11 8 5 5M9.5 12.5 12 15"/>`,
    'width="18" height="18"'
  ),
  brace: svg(
    `<path d="M12 3.2 5.5 6v5.2c0 4 2.6 7.7 6.5 8.8 3.9-1.1 6.5-4.8 6.5-8.8V6L12 3.2Z"/><path d="m9.5 12 1.8 1.8 3.4-3.5"/>`,
    'width="18" height="18"'
  ),
  therapy: svg(
    `<circle cx="8.5" cy="6" r="2.2"/><path d="M4.6 20v-4.3l-1.3-3A2 2 0 0 1 5 10h4l2.6 2.4"/><path d="M14.6 20v-5l3-1.2M17.4 8.6a1.9 1.9 0 1 0 0-3.8 1.9 1.9 0 0 0 0 3.8Z"/>`,
    'width="18" height="18"'
  ),
  wallet: svg(
    `<rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10h18M16.5 14.5h1.5"/>`,
    'width="18" height="18"'
  ),
  clock: svg(`<circle cx="12" cy="12" r="9"/><path d="M12 7.5V12l3 1.8"/>`, 'width="18" height="18"'),
  doc: svg(
    `<path d="M13.5 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8.5L13.5 3Z"/><path d="M13.3 3.2V9h5.5M8.8 13h6.4M8.8 16.5h4.4"/>`,
    'width="18" height="18"'
  ),
  check: svg(`<path d="m4.5 12.5 5 5 10-11"/>`, 'width="14" height="14"'),
  arrowLeft: svg('<path d="M14.5 5.5 8 12l6.5 6.5"/>', 'width="17" height="17"'),
  arrowRight: svg('<path d="m9.5 5.5 6.5 6.5-6.5 6.5"/>', 'width="17" height="17"'),
  layers: svg(
    '<path d="m12 3.6 8 4.2-8 4.2-8-4.2 8-4.2Z"/><path d="m4.4 12.4 7.6 4 7.6-4M4.4 16.4l7.6 4 7.6-4"/>',
    'width="16" height="16"'
  ),
  slides: svg(
    '<rect x="3.2" y="4.5" width="17.6" height="11.5" rx="2"/><path d="M12 16v3.5M8.8 19.5h6.4"/>',
    'width="16" height="16"'
  ),
  spark: svg(`<path d="M12 3.5 13.9 9l5.6 1.9-5.6 2L12 18.5l-1.9-5.6L4.5 11 10.1 9 12 3.5Z"/>`, 'width="14" height="14"')
}
