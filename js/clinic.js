/* ─────────────────────────────────────────────
   지점(네트워크) 분기 모듈
   - 반듯한 네트워크의 여러 지점이 "같은 안내문 / 다른 상호·전화·가격표"를 공유한다.
   - 지점 판별은 오직 URL 파라미터(?c=)로만 한다. localStorage 를 쓰지 않는 이유:
     직원 태블릿에서 두 지점 링크를 번갈아 열 때 이전 지점이 남아
     "엉뚱한 지점 가격표"가 보이는 사고를 막기 위함.
   - 기본 지점(서울대입구점)은 파라미터가 없다 → 기존 링크/QR 이 그대로 동작한다.
   - i18n.js / viewer.js 보다 먼저 로드되어야 한다.
   ───────────────────────────────────────────── */

/* 지점 정의: 새 지점이 생기면 여기에 한 덩어리 추가 + clinics/<dir>/ 폴더 생성 */
const CLINICS = {
  /* 서울대입구점 — 기본 지점. dir 가 비어 있으므로 이미지는 지금처럼 루트를 쓴다. */
  snu: {
    id: 'snu',
    dir: '',
    tab:         { ko: '서울대입구점', en: 'SNU Station' },
    displayName: { ko: '반듯한정형외과 서울대입구점', en: 'Bonafide Orthopedic Clinic — SNU Station' },
    name:        { ko: '반듯한정형외과 | Bonafide Orthopedic Clinic', en: 'Bonafide Orthopedic Clinic' },
    titleSuffix: { ko: '반듯한정형외과', en: 'Bonafide Orthopedic Clinic' },
    docTitle:    { ko: '반듯한정형외과 환자 안내', en: 'Bonafide Orthopedic Clinic Patient Guide' },
    tel:   '02-875-7590',
    map:   'https://map.naver.com/p/entry/place/1974407241?placePath=%252Fhome%253Fentry%253Dplt&searchType=place&lng=126.9534376&lat=37.4806869&c=15.00,0,0,0,dh',
    kakao: 'http://pf.kakao.com/_xikLxcxj'
  },

  /* 반듯한365의원 — 전용 자료는 clinics/bonafide365clinic/ 에 같은 파일명으로 넣는다.
     TODO: 네이버 지도 등록 후 map, 카카오채널 개설 후 kakao 채울 것 (비어 있으면 각각 링크·버튼이 자동으로 숨겨짐). */
  bonafide365clinic: {
    id: 'bonafide365clinic',
    dir: 'clinics/bonafide365clinic',
    tab:         { ko: '까치산점', en: 'Kkachisan' },
    displayName: { ko: '반듯한365의원 까치산점', en: 'Bonafide 365 Clinic — Kkachisan' },
    name:        { ko: '반듯한365의원 | Bonafide 365 Clinic', en: 'Bonafide 365 Clinic' },
    titleSuffix: { ko: '반듯한365의원', en: 'Bonafide 365 Clinic' },
    docTitle:    { ko: '반듯한365의원 환자 안내', en: 'Bonafide 365 Clinic Patient Guide' },
    tel:   '02-2696-3650',
    map:   '',
    kakao: ''
  }
};

const DEFAULT_CLINIC_ID = 'snu';
const CLINIC_PARAM      = 'c';

/* 지점마다 반드시 달라야 하는 자료(가격표·서류비용).
   이 목록의 파일은 지점 폴더에 없더라도 다른 지점 이미지로 대체하지 않고
   "준비 중" 안내로 대체한다. 잘못된 가격을 환자에게 보여주는 사고 방지. */
const CLINIC_ONLY_IMAGES = [
  '비급여항목안내 (1).png',
  '비급여항목안내 (2).png',
  '원내서류안내_A4.png'
];

/* 페이지 고유 제목(예: "비급여 및 서류 비용 안내"). 지점명은 런타임에 붙인다. */
const CLINIC_PAGE_TITLE = document.title.includes('|')
  ? document.title.split('|')[0].trim()
  : '';

/* ── 지점 판별 & 링크 ── */

function getClinicId(){
  const id = new URLSearchParams(location.search).get(CLINIC_PARAM);
  return (id && CLINICS[id]) ? id : DEFAULT_CLINIC_ID;
}

function getClinic(){
  return CLINICS[getClinicId()];
}

function currentLangCode(){
  return document.documentElement.lang === 'en' ? 'en' : 'ko';
}

/* 내부 페이지 이동 시 지점 파라미터를 잃지 않도록 경로를 감싼다. */
function clinicUrl(path){
  const id = getClinicId();
  if(id === DEFAULT_CLINIC_ID) return path;
  return path + (path.includes('?') ? '&' : '?') + CLINIC_PARAM + '=' + encodeURIComponent(id);
}

/* 안내 페이지 새 탭으로 열기 (기존 window.open('x.html','_blank') 대체) */
function openPage(path){
  window.open(clinicUrl(path), '_blank');
}

/* 같은 탭 이동 (기존 location.href='x.html' 대체) */
function goPage(path){
  location.href = clinicUrl(path);
}

/* 지점별 외부 링크(카카오채널·지도) 열기 */
function openClinicLink(key){
  const url = getClinic()[key];
  if(!url){
    alert(currentLangCode() === 'en'
      ? 'This link is being prepared for this clinic.'
      : '해당 지점 링크는 준비 중입니다.');
    return;
  }
  window.open(url, '_blank');
}

function clinicTelHref(tel){
  return 'tel:' + String(tel).replace(/[^0-9+]/g, '');
}

/* ── 이미지 경로 해석 ──
   지점 × 언어 조합을 폴백 체인으로 처리한다.
     clinics/<지점>/en/<파일>  →  clinics/<지점>/<파일>  →  en/<파일>  →  <파일>
   지점 폴더에 없는 이미지는 자동으로 공용(루트) 원본을 쓰므로,
   지점 폴더에는 "정말 다른 파일"만 넣으면 된다. */

function clinicCacheVer(){
  try { return (typeof BANNER_VER !== 'undefined') ? ('?v=' + BANNER_VER) : ''; }
  catch(e){ return ''; }
}

function clinicImageCandidates(koFile){
  if(!koFile) return [];
  const clinic = getClinic();
  const isEn   = currentLangCode() === 'en';
  const only   = CLINIC_ONLY_IMAGES.includes(koFile);
  const list   = [];

  if(clinic.dir){
    if(isEn) list.push(clinic.dir + '/en/' + koFile);
    list.push(clinic.dir + '/' + koFile);
  }
  /* 지점 전용 자료는 공용 원본으로 내려가지 않는다 (다른 지점 가격표 노출 방지) */
  if(!(only && clinic.dir)){
    if(isEn) list.push('en/' + koFile);
    list.push(koFile);
  }

  const ver = clinicCacheVer();
  return list.map(p => encodeURI(p) + ver);
}

function clinicImgSrc(koFile){
  return clinicImageCandidates(koFile)[0] || '';
}

/* HTML 문자열 안에서 쓰는 형태: src="..." + 폴백 체인 */
function clinicImgAttrs(koFile){
  const list = clinicImageCandidates(koFile);
  if(!list.length) return 'src=""';
  const rest = JSON.stringify(list.slice(1))
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;');
  return 'src="' + list[0].replaceAll('&', '&amp;') + '" data-fallback="' + rest + '" onerror="clinicImageFallback.call(this)"';
}

/* DOM 으로 만든 <img> 에 폴백 체인 붙이기 */
function clinicBindImage(img, koFile){
  const list = clinicImageCandidates(koFile);
  if(!list.length) return;
  img.dataset.fallback = JSON.stringify(list.slice(1));
  img.onerror = clinicImageFallback;
  img.src = list[0];
}

/* onerror 핸들러: 다음 후보로 넘어가고, 후보가 떨어지면 "준비 중"으로 대체 */
function clinicImageFallback(){
  const img = this;
  let list = [];
  try { list = JSON.parse(img.dataset.fallback || '[]'); } catch(e){ list = []; }
  const next = list.shift();
  img.dataset.fallback = JSON.stringify(list);
  if(next === undefined){
    img.onerror = null;
    clinicMarkMissing(img);
    return;
  }
  img.src = next;
}

function clinicMarkMissing(img){
  const msg = document.createElement('p');
  msg.className = 'clinic-missing';
  msg.textContent = currentLangCode() === 'en'
    ? 'This guide is being prepared for this clinic.'
    : '해당 지점 안내문은 준비 중입니다.';
  img.replaceWith(msg);
}

/* ── 지점 전환 UI ── */

function buildClinicSwitch(){
  const lang = currentLangCode();
  const cur  = getClinicId();
  const btns = Object.keys(CLINICS).map(function(id){
    const c = CLINICS[id];
    return '<button type="button" class="clinic-btn' + (id === cur ? ' active' : '') +
           '" data-clinic="' + id + '" onclick="setClinic(\'' + id + '\')">' + c.tab[lang] + '</button>';
  }).join('');
  return '<div class="clinic-switch" aria-label="Clinic switch">' +
         '<span class="clinic-switch-label">' + (lang === 'en' ? 'Clinic' : '지점') + '</span>' +
         btns + '</div>';
}

function mountClinicSwitch(){
  const container = document.querySelector('.container');
  if(!container || container.querySelector('.clinic-switch')) return;
  container.insertAdjacentHTML('afterbegin', buildClinicSwitch());
}

/* 지점 전환: 주소창 링크를 바꿔주고(이 링크를 그대로 해당 지점 QR 로 쓰면 된다) 화면을 다시 그린다. */
function setClinic(id){
  if(!CLINICS[id] || id === getClinicId()) return;

  const url = new URL(location.href);
  if(id === DEFAULT_CLINIC_ID) url.searchParams.delete(CLINIC_PARAM);
  else                         url.searchParams.set(CLINIC_PARAM, id);
  history.replaceState(null, '', url);

  /* 열려 있던 뷰어는 이전 지점 이미지이므로 닫는다 */
  if(typeof closeInlineViewer === 'function') closeInlineViewer();

  applyClinic();
  if(typeof applyLanguage === 'function') applyLanguage(currentLangCode());
}

/* 지점에 따라 달라지는 화면 요소 갱신 (언어 적용 때마다 함께 호출됨) */
function applyClinic(){
  const lang   = currentLangCode();
  const cur    = getClinicId();
  const clinic = getClinic();

  document.querySelectorAll('.clinic-btn').forEach(function(btn){
    const id = btn.getAttribute('data-clinic');
    btn.classList.toggle('active', id === cur);
    if(CLINICS[id]) btn.textContent = CLINICS[id].tab[lang];
  });
  const label = document.querySelector('.clinic-switch-label');
  if(label) label.textContent = lang === 'en' ? 'Clinic' : '지점';

  /* 배너 아래 지점 표기 줄: 상호 + 전화.
     배너 이미지는 지점 공통 한 장으로 통일하고, 지점마다 달라지는 정보는 이 텍스트가 담당한다.
     (지점이 늘어도 배너를 다시 만들 필요가 없다) */
  const identity = document.querySelector('.clinic-identity');
  if(identity){
    const name = '<span class="clinic-identity-name">' + clinic.displayName[lang] + '</span>';
    const tel  = clinic.tel
      ? '<span class="clinic-identity-sep">·</span><a class="clinic-identity-tel" href="' + clinicTelHref(clinic.tel) + '">' + clinic.tel + '</a>'
      : '';
    identity.innerHTML = name + tel;
  }

  /* 지점별 링크 버튼(카카오채널 등) — 주소가 준비되지 않은 지점에서는 감춘다 */
  document.querySelectorAll('[data-clinic-link]').forEach(function(el){
    const key  = el.getAttribute('data-clinic-link');
    const item = el.closest('.nav-item') || el;
    item.style.display = clinic[key] ? '' : 'none';
  });
}

function clinicDocTitle(lang){
  const c = getClinic();
  return CLINIC_PAGE_TITLE ? (CLINIC_PAGE_TITLE + ' | ' + c.titleSuffix[lang]) : c.docTitle[lang];
}

document.addEventListener('DOMContentLoaded', mountClinicSwitch);
