import s from './DocumentGuide.module.css'
import { icons } from '../../lib/icons.js'
import { documents, documentFlow } from '../../data/content.js'

export function DocumentGuide() {
  return `
    <article class="${s.card}">
      <div class="${s.head}">
        <span class="${s.headIcon}">${icons.doc}</span>
        <h3 class="${s.title}">${documents.title}</h3>
        <span class="${s.oneStop}">${icons.check}ONE-STOP</span>
      </div>

      <p class="${s.lead}">${documents.lead}</p>
      <p class="${s.body}">
        ${documents.body.replace('일괄 교부해 드립니다', '<b>일괄 교부해 드립니다</b>')}
      </p>

      <p class="${s.docsLabel}">발급 가능 서류</p>
      <div class="${s.docs}">
        ${documents.items.map((item) => `<span class="${s.doc}">${icons.check}${item}</span>`).join('')}
        <span class="${s.etc}">등 요청하신 모든 서류</span>
      </div>
      <ol class="${s.flow}" data-stage-only>
        ${documentFlow
          .map(
            (item, index) => `
          <li class="${s.flowItem}">
            <span class="${s.flowNo}">${index + 1}</span>
            <div>
              <p class="${s.flowWhen}">${item.when}</p>
              <p class="${s.flowText}">${item.text}</p>
            </div>
          </li>`
          )
          .join('')}
      </ol>
    </article>
  `
}
