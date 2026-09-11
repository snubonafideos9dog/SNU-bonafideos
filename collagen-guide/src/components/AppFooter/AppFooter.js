import s from './AppFooter.module.css'
import { icons } from '../../lib/icons.js'
import { footerNote, meta } from '../../data/content.js'

export function AppFooter() {
  return `
    <footer class="${s.footer}">
      <p class="${s.note}">${icons.info}<span>${footerNote}</span></p>
      <span class="${s.stamp}"><i class="${s.dot}"></i>${meta.updatedLabel}</span>
    </footer>
  `
}
