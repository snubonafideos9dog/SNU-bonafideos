import s from './PriceMatrix.module.css'
import { icons } from '../../lib/icons.js'
import { drugs, priceMatrix, insuranceHint } from '../../data/content.js'

/** 2~5대 (데이터의 minCount~maxCount 합집합) */
const counts = (() => {
  const min = Math.min(...drugs.map((drug) => drug.minCount))
  const max = Math.max(...drugs.map((drug) => drug.maxCount))
  return Array.from({ length: max - min + 1 }, (_, i) => min + i)
})()

const format = (manwon) => `${manwon.toLocaleString('ko-KR')}만`

/**
 * 대수별 "주사제 약제비"만 보여주는 표.
 * 대수는 시술 당일 원장님이 결정하므로 총액을 확정해 제시하지 않는다.
 */
export function PriceMatrix() {
  return `
    <section class="${s.wrap}">
      <h3 class="${s.headline}">${icons.info}<span>${priceMatrix.headline}</span></h3>
      <p class="${s.sub}">${priceMatrix.sub}</p>

      <div class="${s.tableWrap}">
        <table class="${s.table}">
          <thead>
            <tr>
              <th class="${s.rowHead}">${priceMatrix.countLabel}</th>
              ${counts.map((count) => `<th scope="col">${count}대</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${drugs
              .map(
                (drug) => `
              <tr class="${drug.tone === 'premium' ? s.premiumRow : ''}">
                <th scope="row" class="${s.rowHead}">
                  <span class="${s.rowName}">${drug.name}</span>
                  <span class="${s.rowUnit}">1대당 ${format(drug.unitPrice)} 원</span>
                </th>
                ${counts
                  .map((count) => {
                    const usable = count >= drug.minCount && count <= drug.maxCount
                    return `<td>${
                      usable
                        ? `<span class="${s.amount}">${format(drug.unitPrice * count)} 원</span>`
                        : '<span aria-hidden="true">–</span>'
                    }</td>`
                  })
                  .join('')}
              </tr>`
              )
              .join('')}
          </tbody>
        </table>
      </div>

      <p class="${s.footnote}">${icons.info}<span>${priceMatrix.footnote}</span></p>

      <div class="${s.insurance}">
        <span class="${s.insuranceIcon}">${icons.doc}</span>
        <div>
          <p class="${s.insuranceTitle}">${insuranceHint.title}</p>
          <p class="${s.insuranceText}">${insuranceHint.text}</p>
        </div>
      </div>
    </section>
  `
}
