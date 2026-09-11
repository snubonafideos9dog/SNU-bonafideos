import s from './StageDeck.module.css'
import { icons } from '../../lib/icons.js'

export const stageClasses = {
  stageActive: s.stageActive,
  railActive: s.railActive,
  railDone: s.railDone,
  split: s.split,
  stack: s.stack
}

/**
 * 단계별 풀스크린 상담 덱.
 * @param {{stages: {step: object, body: string}[]}} props
 */
export function StageDeck({ stages }) {
  return `
    <div class="${s.deck}" data-deck>
      <nav class="${s.rail}" aria-label="상담 단계">
        ${stages
          .map(
            ({ step }, index) => `
          <button type="button" class="${s.railItem}" data-go="${index}" aria-label="${step.no} ${step.title}">
            <span class="${s.railNo}">${step.no}</span>
            <span class="${s.railTitle}">${step.nav}</span>
          </button>`
          )
          .join('')}
      </nav>

      <div class="${s.stages}">
        ${stages
          .map(
            ({ step, body }, index) => `
          <section class="${s.stage}" data-stage="${index}" aria-labelledby="q-${step.id}">
            <div class="${s.stageHead}">
              <h2 class="${s.question}" id="q-${step.id}">${step.question}</h2>
              <span class="${s.stepTag}"><b>${step.no}</b><i></i>${step.title}</span>
            </div>
            <div class="${s.panel}">${body}</div>
          </section>`
          )
          .join('')}
      </div>

      <div class="${s.controls}">
        <button type="button" class="${s.ctrl}" data-prev>${icons.arrowLeft}이전</button>

        <p class="${s.counter} ${s.center}">
          <b data-counter>1</b> / ${stages.length}
          <span class="${s.hint}">← → 방향키 또는 숫자키 1~${stages.length}</span>
        </p>

        <button type="button" class="${s.ctrl} ${s.next}" data-next>
          <span data-next-label>다음</span>${icons.arrowRight}
        </button>
      </div>
    </div>
  `
}

/** 컨트롤 버튼에 표시할 다음 단계 이름 */
export const nextLabelOf = (stages, index) =>
  index + 1 < stages.length ? `다음 · ${stages[index + 1].step.nav}` : '다음'
