/**
 * 상담 가이드의 모든 문구는 이 파일에서만 관리합니다.
 * 원장님/데스크 요청으로 금액·문구가 바뀌면 여기만 수정하면 전체 화면에 반영됩니다.
 */

export const meta = {
  title: '콜라겐 재생 치료 및 입원 당일 가이드',
  subtitle: '시술 종류부터 퇴원 서류까지, 입원 당일의 모든 과정을 한 장에 정리했습니다.',
  eyebrow: 'PATIENT CONSULTATION GUIDE',
  updatedLabel: '환자 상담용 요약지'
}

/** question = 상담 모드에서 각 단계 상단에 띄우는 "환자의 질문" */
export const steps = [
  {
    id: 'step-1',
    no: '1단계',
    title: '콜라겐 주사제 종류',
    nav: '주사제 종류',
    question: '어떤 주사제를 맞게 되나요?'
  },
  {
    id: 'step-2',
    no: '2단계',
    title: '입원 총비용 및 시술 후 필수 수칙',
    nav: '비용 · 수칙',
    question: '비용은 얼마나 드나요?'
  },
  {
    id: 'step-3',
    no: '3단계',
    title: '당일 입원 진행 일정',
    nav: '당일 일정',
    question: '입원 당일, 하루가 어떻게 진행되나요?'
  },
  {
    id: 'step-4',
    no: '4단계',
    title: '퇴원 서류 발급 관련 안내',
    nav: '퇴원 서류',
    question: '보험 서류는 어떻게 받나요?'
  }
]

export const drugNotice =
  '의료진이 시술 시 초음파로 직접 확인 후 수를 결정하며, 안내가는 모두 1대당 단가입니다.'

export const drugs = [
  {
    key: 'collashield',
    name: '콜라쉴드',
    origin: '돼지 유래 콜라겐',
    volume: '1.0cc',
    priceLabel: '1대당',
    price: '50만 원',
    /** 약제비 표 계산용 (단위: 만 원) */
    unitPrice: 50,
    minCount: 2,
    maxCount: 5,
    quantity: '2-5대',
    tone: 'standard',
    tag: '집중 보충형',
    summary: '결손 부위 1곳을 집중적으로 채우는, 가장 부담이 적은 선택',
    /** 환자가 "나는 어느 쪽인가"를 바로 판단할 수 있게 (원문 설명을 환자 언어로 정리) */
    bestFor: ['결손 부위가 1곳으로 뚜렷한 분', '비용 부담을 줄이고 싶은 분'],
    points: [
      '인대·힘줄·연골 등 결손된 부위에 직접 들어가 물리적인 지지체를 형성해 주는 고순도 생체 조직 보충재',
      '특정 인대 파열, 부분 마모 등 집중적인 1곳의 결손 부위에 맞춤형으로 주입하기에 가장 경제적이고 효율적인 제재'
    ]
  },
  {
    key: 'saesallo',
    name: '새살로',
    origin: '인간 유래 콜라겐',
    volume: '3cc',
    priceLabel: '1대당',
    price: '200만 원',
    unitPrice: 200,
    minCount: 2,
    maxCount: 5,
    quantity: '2-5대',
    tone: 'premium',
    tag: '인체 적합형',
    summary: '몸에 더 잘 맞고, 회복 기간까지 줄여 주는 선택',
    bestFor: ['면역이 민감하거나 고령이신 분', '일상 복귀를 빨리 하셔야 하는 분'],
    points: [
      '이물·거부 반응에 대한 부담을 낮춰 면역 민감 환자 및 고령층도 안심하고 맞는 인체 적합 치료제',
      '단순 조직 재생을 넘어 상처 회복을 촉진해 치료 후 회복 기간을 단축하고 빠른 일상 복귀를 돕는 실질적인 맞춤 회복 솔루션'
    ]
  }
]

export const cost = {
  label: '입원 총비용 예상 범위',
  range: '400만 ~ 1,300만 원',
  note: '약품 종류는 환자분이 직접 결정하십니다.',
  composition:
    '수액 + 콜라쉴드 or 새살로 + 초음파 + 보조기 + 비급여 물리치료(신장분사) + 관절수동술 + 신경차단술 + 치료재료대 등'
}

/** 비용이 "범위"로 안내될 수밖에 없는 이유 (상담 모드 비용 화면의 핵심 메시지) */
export const priceMatrix = {
  headline: '주사제 대수는 시술 당일 원장님이 초음파로 직접 확인한 뒤 결정됩니다.',
  sub: '그래서 오늘은 확정 금액이 아닌 범위로 안내드리며, 아래는 대수가 정해졌을 때의 주사제 약제비입니다.',
  countLabel: '대수',
  footnote:
    '위 금액은 주사제 약제비만 계산한 것으로, 수액·초음파·보조기·물리치료·시술 비용 등 입원 비용이 별도로 더해집니다.'
}

/** 큰 금액을 본 직후 환자가 가장 먼저 떠올리는 질문에 대한 답 (4단계 내용을 비용 화면에서 미리 안내) */
export const insuranceHint = {
  title: '실손보험 청구에 필요한 서류는 퇴원 시 모두 발급해 드립니다.',
  text: '영수증·세부내역서·입퇴원확인서 등 보험사에서 요청하는 서류를 데스크에서 한 번에 받아 가십니다. 자세한 내용은 4단계에서 안내드립니다.'
}

export const rules = [
  {
    icon: 'brace',
    title: '보조기 착용',
    body: '관절 움직임 제한을 통한 콜라겐 안착 및 조직 재생 촉진'
  },
  {
    icon: 'therapy',
    title: '4층 물리치료 연계',
    body: '치료사 1:1 상세 상담 후 맞춤 재활 프로그램 설계'
  }
]

export const schedule = [
  { text: '3층 입원수속 및 10층 입원실 안내 후 환복' },
  { text: '혈압 측정 후 수액 연결' },
  { text: '치료실 이동, 원장님 병변 확인 후 정밀 시술', highlight: true },
  { text: '입원실 침상 안정 / 혈압 측정 및 상태 확인, 집중 회복' },
  { text: '맞춤형 물리치료 프로그램 진행' },
  { text: '원장님 진료 및 시술부위 초음파 확인' },
  { text: '10층 환복 및 짐 정리 후 퇴원 수속(수납·서류 발급) 및 외래 진료 예약' }
]

export const documents = {
  title: '퇴원 시 실비 서류 원스톱 발급',
  lead: '입원 수속 시 보험사에서 필요한 서류를 데스크에 말씀해주세요.',
  body: '따로 내원하실 필요 없이 퇴원 시 요청하신 모든 서류를 일괄 교부해 드립니다.',
  items: ['영수증', '세부내역서', '입퇴원확인서', '진료기록지']
}

/** 서류 발급 절차 (상담 모드 4단계 화면) */
export const documentFlow = [
  {
    when: '입원 수속 시',
    text: '보험사에서 필요하다고 안내받은 서류를 데스크에 말씀해 주세요.'
  },
  {
    when: '퇴원 수속 시',
    text: '수납과 함께 요청하신 서류를 한 번에 받아 가십니다.'
  },
  {
    when: '이후',
    text: '서류 때문에 다시 내원하실 필요가 없습니다.'
  }
]

/**
 * 환자가 상담 중 가장 자주 묻는 질문.
 *
 * ★ answer 를 채우면 상담 모드에 "자주 묻는 질문" 화면이 자동으로 생깁니다.
 *   답이 비어 있는 항목은 화면에 나오지 않습니다.
 *   (확인되지 않은 의료 정보가 환자에게 보이면 안 되므로 이렇게 처리했습니다.)
 */
export const faqStep = {
  id: 'step-faq',
  no: '추가 안내',
  title: '자주 묻는 질문',
  nav: '자주 묻는 질문',
  question: '이런 점도 궁금하실 겁니다'
}

export const faq = [
  { icon: 'clock', question: '몇 시에 오고, 언제쯤 끝나나요?', answer: '' },
  { icon: 'clock', question: '당일 퇴원인가요, 하루 자고 가나요?', answer: '' },
  { icon: 'info', question: '전날부터 금식해야 하나요?', answer: '' },
  { icon: 'therapy', question: '보호자가 함께 와야 하나요? 직접 운전해도 되나요?', answer: '' },
  { icon: 'syringe', question: '시술할 때 많이 아픈가요?', answer: '' },
  { icon: 'brace', question: '보조기는 며칠 착용하고, 언제부터 일상생활이 가능한가요?', answer: '' },
  { icon: 'doc', question: '당일에 무엇을 챙겨 와야 하나요?', answer: '' }
]

export const footerNote =
  '본 요약지는 환자분의 안전하고 신속한 회복을 돕기 위해 제작되었습니다. 문의사항은 언제든 원내 직원에게 말씀해 주세요.'
