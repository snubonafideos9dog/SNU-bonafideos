import s from './DrugCards.module.css'
import { icons } from '../../lib/icons.js'
import { drugs, drugNotice } from '../../data/content.js'

/** 상담 시 강조해서 읽어주는 핵심 표현 */
const EMPHASIS = [
  '고순도 생체 조직 보충재',
  '가장 경제적이고 효율적인 제재',
  '인체 적합 치료제',
  '실질적인 맞춤 회복 솔루션',
  '물리적인 지지체',
  '회복 기간을 단축'
]

const emphasize = (text) =>
  EMPHASIS.reduce((acc, word) => acc.split(word).join(`<b>${word}</b>`), text)

export function DrugCards() {
  return `
    <p class="${s.notice}">${icons.info}<span>${drugNotice}</span></p>

    <div class="${s.grid}">
      ${drugs
        .map(
          (drug) => `
        <article class="${s.card} ${drug.tone === 'premium' ? s.premium : ''}">
          <span class="${s.tag}">${drug.tag}</span>
          <h3 class="${s.name}">${drug.name}</h3>
          <p class="${s.origin}">
            <b>${drug.origin}</b><span class="${s.volume}">${drug.volume}</span>
          </p>
          <p class="${s.summary}">${drug.summary}</p>

          <div class="${s.priceBox}">
            <div class="${s.priceRow}">
              <span class="${s.priceLabel}">${drug.priceLabel}</span>
              <span class="${s.price}">${drug.price}</span>
            </div>
            <div class="${s.qtyRow}">
              <span>권장 투여</span>
              <span class="${s.qty}">${drug.quantity}</span>
            </div>
          </div>

          <div class="${s.bestFor}">
            <p class="${s.bestForLabel}">이런 분께 권해 드립니다</p>
            <ul class="${s.bestForList}">
              ${drug.bestFor
                .map((item) => `<li class="${s.bestForItem}">${icons.check}${item}</li>`)
                .join('')}
            </ul>
          </div>

          <details class="${s.details}" data-details open>
            <summary class="${s.detailsToggle}">자세한 설명 보기</summary>
            <div class="${s.points}">
              ${drug.points
                .map(
                  (point) => `
                <p class="${s.point}">${icons.check}<span>${emphasize(point)}</span></p>`
                )
                .join('')}
            </div>
          </details>
        </article>`
        )
        .join('')}
    </div>
  `
}
