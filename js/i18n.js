/* ─────────────────────────────────────────────
   다국어(한/영) 처리 모듈
   - 버튼 라벨/헤더/푸터/문서 제목 번역
   - 언어 설정 저장(localStorage) 및 적용
   ───────────────────────────────────────────── */

/* 배너 캐시 버전: 배너 이미지를 같은 파일명으로 교체할 때마다 이 값을 올린다. */
const BANNER_VER = '20260828e';

const translationMap = {
  ko: {
    '손상단계별 치료안내 ▾': '손상단계별 치료안내 ▾',
    '족저근막염 치료 안내': '족저근막염 치료 안내',
    '보조기 착용 안내 ▾': '보조기 착용 안내 ▾',
    '특수 치료 안내 ▾': '특수 치료 안내 ▾',
    '소독 및 실밥 제거 후 안내': '소독 및 실밥 제거 후 안내',
    '비급여 항목 안내': '비급여 항목 안내',
    '서류 비용 안내': '서류 비용 안내',
    '안내문을 나중에도 확인하고 싶어요': '안내문을 나중에도 확인하고 싶어요',
    '목': '목', '어깨': '어깨', '팔꿈치': '팔꿈치', '손목': '손목', '손가락': '손가락', '허리': '허리', '고관절': '고관절', '무릎': '무릎', '발목': '발목', '발가락': '발가락',
    '쿨밴드·코반 착용 후 붓기 관리': '쿨밴드·코반 착용 후 붓기 관리',
    '등,허리 보호대 착용법': '등,허리 보호대 착용법', '쇄골 붕대 착용법': '쇄골 붕대 착용법', '어깨 보조기(울트라슬링) 착용법': '어깨 보조기(울트라슬링) 착용법',
    '어깨 보조기(벨포밴드) 착용법': '어깨 보조기(벨포밴드) 착용법', '어깨 보조기(벨포밴드) 푸는 법': '어깨 보조기(벨포밴드) 푸는 법',
    '복대 착용법': '복대 착용법', '손가락 붕대 착용법': '손가락 붕대 착용법', '발목 붕대 착용법': '발목 붕대 착용법', '발가락 붕대 감는 법': '발가락 붕대 감는 법',
    '한 쪽 목발 사용법': '한 쪽 목발 사용법', '양 쪽 목발 사용법': '양 쪽 목발 사용법', '신장분사치료': '신장분사치료', '고출력레이저치료': '고출력레이저치료', '충격파치료': '충격파치료'
  },
  en: {
    '손상단계별 치료안내 ▾': 'Injury-stage treatment guide ▾',
    '족저근막염 치료 안내': 'Plantar fasciitis treatment guide',
    '보조기 착용 안내 ▾': 'Brace-wearing guide ▾',
    '특수 치료 안내 ▾': 'Special treatment guide ▾',
    '소독 및 실밥 제거 후 안내': 'After disinfection and stitch removal guide',
    '비급여 항목 안내': 'Non-covered items guide',
    '서류 비용 안내': 'Document fee guide',
    '안내문을 나중에도 확인하고 싶어요': 'I want to review the guide later',
    '목': 'Neck', '어깨': 'Shoulder', '팔꿈치': 'Elbow', '손목': 'Wrist', '손가락': 'Finger', '허리': 'Lower back', '고관절': 'Hip', '무릎': 'Knee', '발목': 'Ankle', '발가락': 'Toe',
    '쿨밴드·코반 착용 후 붓기 관리': 'Swelling management after wearing cool band/coban',
    '등,허리 보호대 착용법': 'How to wear a back/lumbar brace', '쇄골 붕대 착용법': 'How to wrap a clavicle bandage', '어깨 보조기(울트라슬링) 착용법': 'How to wear an ultra-sling shoulder brace',
    '어깨 보조기(벨포밴드) 착용법': 'How to wear a Velpo band shoulder brace', '어깨 보조기(벨포밴드) 푸는 법': 'How to remove a Velpo band shoulder brace',
    '복대 착용법': 'How to wear a belt support', '손가락 붕대 착용법': 'How to wrap a finger bandage', '발목 붕대 착용법': 'How to wrap an ankle bandage', '발가락 붕대 감는 법': 'How to wrap a toe bandage',
    '한 쪽 목발 사용법': 'How to use one crutch', '양 쪽 목발 사용법': 'How to use two crutches', '신장분사치료': 'Cryotherapy', '고출력레이저치료': 'High-power laser therapy', '충격파치료': 'Shock wave therapy'
  }
};

function translateLabel(text, lang){
  return translationMap[lang] && translationMap[lang][text] ? translationMap[lang][text] : text;
}

function getPreferredLanguage(){
  /* 기본값은 항상 한국어. 영어는 페이지에서 ENG 버튼을 눌렀을 때만 적용한다.
     (브라우저 언어/이전 저장값을 따르지 않음 → 새 창을 열어도 한국어로 시작) */
  return 'ko';
}

function applyLanguage(lang = getPreferredLanguage()){
  const isEnglish = String(lang).toLowerCase().startsWith('en');
  const currentLang = isEnglish ? 'en' : 'ko';

  document.documentElement.lang = currentLang;
  document.querySelectorAll('.nav-btn, .sub-btn').forEach(btn => {
    const rawText = (btn.textContent || '').trim();
    const translated = translateLabel(rawText, currentLang);
    if (translated !== rawText) {
      btn.textContent = translated;
    }
  });
  document.querySelectorAll('[data-ko][data-en]').forEach(btn => {
    const text = currentLang === 'en' ? btn.getAttribute('data-en') : btn.getAttribute('data-ko');
    if (text) btn.textContent = text;
  });

  /* 이미지의 지점·언어별 전환은 clinic.js(clinicImgAttrs/clinicImgSrc)가 폴백 체인으로 처리하고
     viewer.js 가 그것을 그대로 쓰므로, 여기서는 열려 있는 뷰어만 다시 그려주면 됩니다. */
  refreshCurrentViewer();

  document.querySelectorAll('[data-title-ko][data-title-en]').forEach(btn => {
    btn.dataset.title = currentLang === 'en' ? btn.getAttribute('data-title-en') : btn.getAttribute('data-title-ko');
  });

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === currentLang);
  });

  /* 지점 전환 버튼 라벨/활성 상태, 지점별 링크 버튼 노출 여부 갱신 */
  applyClinic();

  /* 섹션 배너(스트레칭/위생교육) + 헤더 배너: 지점 × 언어 폴백 체인은 clinic.js 가 처리한다.
     (clinics/<지점>/en/X → clinics/<지점>/X → en/X → X)
     배너 파일명이 그대로 교체되는 경우가 많아, 버전 쿼리로 브라우저 캐시를 무력화한다. (교체 시 BANNER_VER 갱신) */
  document.querySelectorAll('.header-banner, .stretch-banner').forEach(img => {
    const koBanner = img.getAttribute('data-img');
    if (!koBanner) return;
    clinicBindImage(img, koBanner);
  });

  /* 푸터의 상호명·전화·지도 링크는 지점마다 다르므로 clinic.js 의 지점 정보에서 가져온다. */
  const clinic = getClinic();
  const footerTitle = document.querySelector('footer p[data-i18n="footer-title"]');
  const footerNote = document.querySelector('footer p[data-i18n="footer-note"]');
  const footerPhone = document.querySelector('footer p[data-i18n="footer-phone"]');
  if (footerTitle) {
    const label = '<strong>' + clinic.name[currentLang] + '</strong>';
    footerTitle.innerHTML = clinic.map
      ? '<a href="' + clinic.map + '" target="_blank" rel="noopener" style="color:inherit;text-decoration:none;">' + label + '</a>'
      : label;
  }
  if (footerNote) footerNote.textContent = currentLang === 'en' ? 'Please contact staff if you have any questions.' : '궁금하신 사항은 직원에게 언제든지 문의해주세요.';
  if (footerPhone) {
    /* 전화번호가 아직 등록되지 않은 지점에서는 잘못된 번호를 노출하지 않도록 줄 자체를 감춘다. */
    footerPhone.style.display = clinic.tel ? '' : 'none';
    if (clinic.tel) {
      footerPhone.innerHTML = 'TEL : <a href="' + clinicTelHref(clinic.tel) + '" style="color:inherit;text-decoration:underline;">' + clinic.tel + '</a>';
    }
  }

  document.title = clinicDocTitle(currentLang);
}

function setLanguage(lang){
  localStorage.setItem('guide-lang', lang);
  applyLanguage(lang);
}
