import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'

import { AppHeader, Hero, headerClasses, textSizes } from './components/AppHeader/AppHeader.js'
import { StageDeck, stageClasses, nextLabelOf } from './components/StageDeck/StageDeck.js'
import { StepSection } from './components/StepSection/StepSection.js'
import { DrugCards } from './components/DrugCards/DrugCards.js'
import {
  CostBoard,
  CostRange,
  RuleCards,
  CostComposition
} from './components/CostBoard/CostBoard.js'
import { PriceMatrix } from './components/PriceMatrix/PriceMatrix.js'
import { DaySchedule } from './components/DaySchedule/DaySchedule.js'
import { DocumentGuide } from './components/DocumentGuide/DocumentGuide.js'
import { AppFooter } from './components/AppFooter/AppFooter.js'
import { FaqList, answeredFaq } from './components/FaqList/FaqList.js'
import { steps, faqStep } from './data/content.js'

const [step1, step2, step3, step4] = steps

/** 상담 모드: 한 화면에 한 주제 */
const stages = [
  { step: step1, body: DrugCards() },
  {
    step: step2,
    body: `
      <div class="${stageClasses.split}">
        <div class="${stageClasses.stack}">
          ${CostRange()}
          ${CostComposition()}
        </div>
        ${PriceMatrix()}
      </div>
      ${RuleCards()}
    `
  },
  { step: step3, body: DaySchedule() },
  { step: step4, body: DocumentGuide() }
]

// 답변이 채워진 질문이 하나라도 있을 때만 "자주 묻는 질문" 화면을 붙인다
if (answeredFaq.length) {
  stages.push({ step: faqStep, body: FaqList() })
}

/** 요약 한 장: 인쇄·전체 조망용 (기존 대시보드) */
const Summary = () => `
  ${Hero()}
  <main class="board">
    ${StepSection({ step: step1, icon: 'syringe', children: DrugCards(), delay: 0 })}
    ${StepSection({ step: step2, icon: 'wallet', children: CostBoard(), delay: 80 })}
    ${StepSection({ step: step3, icon: 'clock', children: DaySchedule(), delay: 40 })}
    ${StepSection({ step: step4, icon: 'doc', children: DocumentGuide(), delay: 120 })}
  </main>
  ${AppFooter()}
`

const App = () => `
  <div class="app">
    ${AppHeader()}
    <div class="views" data-view="stage">
      <div class="stageView">${StageDeck({ stages })}</div>
      <div class="summaryView">${Summary()}</div>
    </div>
  </div>
`

/** 요약 화면 카드 리빌 */
function initReveal() {
  const targets = document.querySelectorAll('[data-reveal]')
  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('isVisible'))
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('isVisible')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
  )

  targets.forEach((el) => observer.observe(el))
}

/** 상담 모드 · 요약 한 장 전환 */
function initModes() {
  const views = document.querySelector('[data-view]')
  const buttons = [...document.querySelectorAll('[data-mode]')]

  const setMode = (mode) => {
    views.dataset.view = mode
    buttons.forEach((button) => {
      const on = button.dataset.mode === mode
      button.classList.toggle(headerClasses.modeOn, on)
      button.setAttribute('aria-pressed', String(on))
    })
    if (mode === 'stage') window.scrollTo({ top: 0, behavior: 'auto' })
  }

  buttons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)))
  setMode(location.hash === '#summary' ? 'summary' : 'stage')
  return setMode
}

/** 단계 이동: 레일 클릭 · 이전/다음 · 방향키 · 숫자키 */
function initDeck() {
  const deck = document.querySelector('[data-deck]')
  if (!deck) return

  const stageEls = [...deck.querySelectorAll('[data-stage]')]
  const railEls = [...deck.querySelectorAll('[data-go]')]
  const prev = deck.querySelector('[data-prev]')
  const next = deck.querySelector('[data-next]')
  const nextLabel = deck.querySelector('[data-next-label]')
  const counter = deck.querySelector('[data-counter]')
  const last = stageEls.length - 1
  let current = -1

  const go = (index) => {
    const target = Math.max(0, Math.min(last, index))
    if (target === current) return
    current = target

    stageEls.forEach((el, i) => {
      const on = i === target
      el.classList.toggle(stageClasses.stageActive, on)
      el.setAttribute('aria-hidden', String(!on))
    })

    railEls.forEach((el, i) => {
      el.classList.toggle(stageClasses.railActive, i === target)
      el.classList.toggle(stageClasses.railDone, i < target)
      el.setAttribute('aria-current', i === target ? 'step' : 'false')
    })

    counter.textContent = String(target + 1)
    history.replaceState(null, '', `#stage-${target + 1}`)
    prev.disabled = target === 0
    next.disabled = target === last
    nextLabel.textContent = nextLabelOf(stages, target)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  railEls.forEach((el, i) => el.addEventListener('click', () => go(i)))
  prev.addEventListener('click', () => go(current - 1))
  next.addEventListener('click', () => go(current + 1))

  document.addEventListener('keydown', (event) => {
    if (document.querySelector('[data-view]')?.dataset.view !== 'stage') return
    if (event.metaKey || event.ctrlKey || event.altKey) return

    if (event.key === 'ArrowRight' || event.key === 'PageDown') go(current + 1)
    else if (event.key === 'ArrowLeft' || event.key === 'PageUp') go(current - 1)
    else if (/^[1-9]$/.test(event.key)) go(Number(event.key) - 1)
    else return

    event.preventDefault()
  })

  const fromHash = () => {
    const matched = /^#stage-([0-9]+)$/.exec(location.hash)
    return matched ? Number(matched[1]) - 1 : 0
  }

  go(fromHash())
  window.addEventListener('hashchange', () => go(fromHash()))
}

/**
 * 글자 크기 조절.
 * 환자 연령대가 높은 편이라 상담 중에도 바로 키울 수 있어야 한다.
 * 선택값은 브라우저에 저장해 다음 상담에서도 유지된다.
 */
function initTextSize() {
  const buttons = [...document.querySelectorAll('[data-size]')]
  if (!buttons.length) return

  const STORAGE_KEY = 'guide:textSize'
  const BASE_PX = 16

  const apply = (key, persist) => {
    const size = textSizes.find((item) => item.key === key) ?? textSizes[0]
    document.documentElement.style.fontSize = `${BASE_PX * size.scale}px`
    buttons.forEach((button) => {
      const on = button.dataset.size === size.key
      button.classList.toggle(headerClasses.sizeOn, on)
      button.setAttribute('aria-pressed', String(on))
    })
    if (!persist) return
    try {
      localStorage.setItem(STORAGE_KEY, size.key)
    } catch {
      /* 사생활 보호 모드 등에서 저장이 막혀도 동작에는 영향이 없다 */
    }
  }

  buttons.forEach((button) => button.addEventListener('click', () => apply(button.dataset.size, true)))

  let saved = null
  try {
    saved = localStorage.getItem(STORAGE_KEY)
  } catch {
    /* 무시 */
  }
  apply(saved ?? 'base', false)
}

/** 상담 모드에서는 전문 설명을 접어 두고, 요약 한 장(인쇄본)에서는 펼쳐 둔다 */
function initDetails() {
  document
    .querySelectorAll('.stageView [data-details]')
    .forEach((element) => (element.open = false))
}

function initPrint() {
  document.querySelector('[data-print]')?.addEventListener('click', () => window.print())
}

/** 헤더가 고정되면 그림자·구분선 표시 */
function initStickyHeader() {
  const nav = document.querySelector('[data-nav]')
  if (!nav) return

  const onScroll = () => nav.classList.toggle(headerClasses.navStuck, window.scrollY > 8)
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
}

document.querySelector('#app').innerHTML = App()
initModes()
initDeck()
initReveal()
initStickyHeader()
initTextSize()
initDetails()
initPrint()
