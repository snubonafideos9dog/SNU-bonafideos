import s from './StepSection.module.css'
import { icons } from '../../lib/icons.js'

/**
 * 단계 카드 셸.
 * @param {{step: {id:string,no:string,title:string}, icon?: keyof typeof icons, children: string, delay?: number}} props
 */
export function StepSection({ step, icon, children, delay = 0 }) {
  return `
    <section id="${step.id}" class="${s.section} reveal" data-reveal style="--reveal-delay:${delay}ms">
      <div class="${s.head}">
        <span class="${s.badge}">${step.no}</span>
        <div class="${s.titleWrap}">
          <h2 class="${s.title}">${step.title}</h2>
        </div>
        ${icon ? `<span class="${s.icon}">${icons[icon]}</span>` : ''}
      </div>
      <div class="${s.body}">${children}</div>
    </section>
  `
}
