import s from './DaySchedule.module.css'
import { icons } from '../../lib/icons.js'
import { schedule } from '../../data/content.js'

export function DaySchedule() {
  return `
    <ol class="${s.list}">
      ${schedule
        .map(
          (item, index) => `
        <li class="${s.item} ${item.highlight ? s.highlight : ''}">
          <span class="${s.dot}">${index + 1}</span>
          <span class="${s.text}">${item.text}</span>
          ${item.highlight ? `<span class="${s.keyTag}">${icons.spark}핵심 단계</span>` : ''}
        </li>`
        )
        .join('')}
    </ol>
  `
}
