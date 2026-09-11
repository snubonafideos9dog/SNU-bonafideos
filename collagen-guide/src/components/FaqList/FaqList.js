import s from './FaqList.module.css'
import { icons } from '../../lib/icons.js'
import { faq } from '../../data/content.js'

/** 답변이 채워진 질문만 노출한다 (확인되지 않은 안내가 환자에게 보이지 않도록) */
export const answeredFaq = faq.filter((item) => item.answer.trim() !== '')

export function FaqList() {
  return `
    <div class="${s.list}">
      ${answeredFaq
        .map(
          (item) => `
        <article class="${s.item}">
          <span class="${s.icon}">${icons[item.icon] ?? icons.info}</span>
          <div>
            <h3 class="${s.question}">${item.question}</h3>
            <p class="${s.answer}">${item.answer}</p>
          </div>
        </article>`
        )
        .join('')}
    </div>
  `
}
