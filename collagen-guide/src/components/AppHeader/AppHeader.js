import s from './AppHeader.module.css'
import { icons } from '../../lib/icons.js'
import { meta, cost } from '../../data/content.js'

/** main.js에서 상태 토글에 사용하는 스코프 클래스 */
export const headerClasses = {
  navStuck: s.navStuck,
  modeOn: s.modeOn,
  sizeOn: s.sizeOn
}

/** 글자 크기 단계 (환자 연령대를 고려해 화면에서 바로 키울 수 있게) */
export const textSizes = [
  { key: 'base', label: '가', scale: 1 },
  { key: 'large', label: '가', scale: 1.15 },
  { key: 'xlarge', label: '가', scale: 1.3 }
]

const modes = [
  { key: 'stage', icon: 'slides', label: '상담 모드' },
  { key: 'summary', icon: 'layers', label: '요약 한 장' }
]

const highlights = [
  { label: '콜라쉴드 · 1대당', value: '50', unit: '만 원' },
  { label: '새살로 · 1대당', value: '200', unit: '만 원' },
  { label: cost.label, value: '400~1,300', unit: '만 원' }
]

/** 상단 고정 바: 브랜드 · 모드 전환 · 인쇄 */
export function AppHeader() {
  return `
    <header class="${s.nav}" data-nav>
      <div class="${s.brand}">
        <span class="${s.mark}">${icons.logo}</span>
        <span class="${s.brandText}">콜라겐 재생 치료 가이드</span>
      </div>

      <div class="${s.modes}" role="group" aria-label="화면 모드">
        ${modes
          .map(
            (mode) => `
          <button type="button" class="${s.mode}" data-mode="${mode.key}">
            ${icons[mode.icon]}<span>${mode.label}</span>
          </button>`
          )
          .join('')}
      </div>

      <div class="${s.sizes}" role="group" aria-label="글자 크기">
        <span class="${s.sizesLabel}">글자</span>
        ${textSizes
          .map(
            (size, index) => `
          <button type="button" class="${s.size}" data-size="${size.key}"
            style="font-size:${0.78 + index * 0.14}rem" aria-label="글자 크기 ${index + 1}단계">
            ${size.label}
          </button>`
          )
          .join('')}
      </div>

      <button class="${s.printBtn}" type="button" data-print>
        ${icons.print}<span>인쇄 / PDF</span>
      </button>
    </header>
  `
}

/** 요약 한 장 상단 히어로 */
export function Hero() {
  return `
    <section class="${s.hero}">
      <p class="${s.eyebrow}">${meta.eyebrow}</p>
      <h1 class="${s.title}">콜라겐 재생 치료 및<br /><strong>입원 당일 가이드</strong></h1>
      <p class="${s.subtitle}">${meta.subtitle}</p>

      <div class="${s.highlights}">
        ${highlights
          .map(
            (item) => `
          <div class="${s.highlight}">
            <p class="${s.highlightLabel}">${item.label}</p>
            <p class="${s.highlightValue}">${item.value}<span class="${s.highlightUnit}">${item.unit}</span></p>
          </div>`
          )
          .join('')}
      </div>
    </section>
  `
}
