import s from './CostBoard.module.css'
import { icons } from '../../lib/icons.js'
import { cost, rules } from '../../data/content.js'

const compositionChips = cost.composition
  .split('+')
  .map((item) => item.trim())
  .filter(Boolean)

/** 총비용 예상 범위 (요약·상담 모드 공용) */
export function CostRange() {
  return `
    <article class="${s.costCard}">
      <p class="${s.costLabel}">${icons.wallet}<span>${cost.label}</span></p>
      <p class="${s.costValue}">${cost.range}</p>

      <div class="${s.costBar}"><span class="${s.costBarFill}"></span></div>
      <div class="${s.costScale}"><span>400만</span><span>1,300만</span></div>

      <p class="${s.costNote}">${cost.note}</p>
    </article>
  `
}

/** 시술 후 필수 수칙 */
export function RuleCards() {
  return `
    <div class="${s.rules}">
      ${rules
        .map(
          (rule) => `
        <article class="${s.rule}">
          <span class="${s.ruleIcon}">${icons[rule.icon]}</span>
          <div>
            <h3 class="${s.ruleTitle}">${rule.title}</h3>
            <p class="${s.ruleBody}">${rule.body}</p>
          </div>
        </article>`
        )
        .join('')}
    </div>
  `
}

/** 입원 비용 구성 항목 */
export function CostComposition() {
  return `
    <div class="${s.composition}">
      <p class="${s.compositionLabel}">입원 비용 구성 항목</p>
      <div class="${s.chips}">
        ${compositionChips.map((chip) => `<span class="${s.chip}">${chip}</span>`).join('')}
      </div>
    </div>
  `
}

/** 요약 한 장에서 쓰는 조합 */
export function CostBoard() {
  return `
    <div class="${s.wrap}">
      ${CostRange()}
      ${RuleCards()}
      ${CostComposition()}
    </div>
  `
}
