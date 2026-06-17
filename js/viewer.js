/* ─────────────────────────────────────────────
   인라인 뷰어 모듈
   - 이미지/영상 뷰어, 이미지 슬라이더, 유튜브 뷰어
   - 서브메뉴 토글
   ───────────────────────────────────────────── */

/* 공유 상태 */
let currentViewer       = null;
let currentViewerButton = null;
let currentSubMenuEl     = null;
let currentSubMenuBtn    = null;

/* 인라인 뷰어만 닫기 (서브메뉴 열림 상태는 유지) */
function closeInlineViewer(){
  if(currentViewer){
    currentViewer.remove();
    currentViewer = null;
  }
  currentViewerButton = null;
  /* has-sub 버튼(서브메뉴 토글 버튼)의 active는 toggleSubMenu 에서 관리하므로 제외 */
  document.querySelectorAll('.nav-btn:not(.has-sub), .sub-btn').forEach(b => b.classList.remove('active'));
}

/* 서브메뉴 열기/닫기 */
function toggleSubMenu(id, btn){
  const sub    = document.getElementById('sub-' + id);
  const isOpen = sub.classList.contains('open');

  /* 다른 서브메뉴가 열려 있으면 먼저 닫기 */
  if(currentSubMenuEl && currentSubMenuEl !== sub){
    currentSubMenuEl.classList.remove('open');
    if(currentSubMenuBtn) currentSubMenuBtn.classList.remove('active');
    closeInlineViewer();
    currentSubMenuEl  = null;
    currentSubMenuBtn = null;
  }

  if(isOpen){
    sub.classList.remove('open');
    btn.classList.remove('active');
    closeInlineViewer();
    currentSubMenuEl  = null;
    currentSubMenuBtn = null;
  } else {
    sub.classList.add('open');
    btn.classList.add('active');
    currentSubMenuEl  = sub;
    currentSubMenuBtn = btn;
  }
}

/* 슬라이더 뷰어 열기 */
function openSliderViewer(button, title, images){
  const currentTitle = (button.textContent || '').trim() || title || '';
  if(button.classList.contains('active')){
    closeInlineViewer();
    if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');
    return;
  }
  closeInlineViewer();
  button.classList.add('active');
  if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');

  let idx = 0;

  /* 영어 모드: en/<같은 파일명> 우선, 없으면 한국어 이미지로 자동 대체(onerror) */
  const isEn = document.documentElement.lang === 'en';
  const enOf = ko => (isEn && ko) ? 'en/' + ko : ko;

  const imgsHtml = images.map(ko => {
    const s = enOf(ko);
    const onErr = (s !== ko) ? ` onerror="this.onerror=null;this.src='${encodeURI(ko)}'"` : '';
    return `<img src="${encodeURI(s)}"${onErr} alt="${escapeHtml(currentTitle)}" loading="lazy">`;
  }).join('');

  const dotsHtml = images.map((_,i) =>
    `<button class="slider-dot${i===0?' active':''}" onclick="slideTo(${i})"></button>`
  ).join('');

  const sliderDownloadBtns = images.map((ko, i) =>
    `<a href="${encodeURI(enOf(ko))}" download class="download-btn slider-dl" id="sliderDl_${i}" style="${i===0?'':'display:none'}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3v13M7 11l5 5 5-5"/><path d="M5 20h14"/>
      </svg>
      이미지 저장
    </a>`
  ).join('');

  const viewer = document.createElement('div');
  viewer.className = 'inline-viewer';
  viewer.id = 'sliderViewer';
  viewer.innerHTML = `
    <div class="inline-viewer-inner">
      <div class="inline-viewer-head">
        <div class="inline-viewer-title">${escapeHtml(title)}</div>
        <button class="inline-viewer-close" type="button" onclick="closeInlineViewerKeepSub()">×</button>
      </div>
      <div class="slider-wrap">
        <button class="slider-arrow left" onclick="slideBy(-1)">&#8592;</button>
        <div class="slider-track" id="sliderTrack">${imgsHtml}</div>
        <button class="slider-arrow right" onclick="slideBy(1)">&#8594;</button>
      </div>
      <div class="slider-dots" id="sliderDots">${dotsHtml}</div>
      <div id="sliderDlWrap">${sliderDownloadBtns}</div>
    </div>
  `;

  const navItem = button.closest('.nav-item');
  navItem.insertAdjacentElement('afterend', viewer);
  currentViewer = viewer;

  window._sliderCount = images.length;
  window._sliderIdx   = 0;

  setTimeout(() => viewer.scrollIntoView({ behavior:'smooth', block:'nearest' }), 50);
}

function slideTo(i){
  const track = document.getElementById('sliderTrack');
  const dots  = document.querySelectorAll('.slider-dot');
  if(!track) return;
  window._sliderIdx = i;
  track.style.transform = `translateX(-${i * 100}%)`;
  dots.forEach((d,j) => d.classList.toggle('active', j===i));
  /* 다운로드 버튼 전환 */
  document.querySelectorAll('.slider-dl').forEach((el,j) => {
    el.style.display = j===i ? '' : 'none';
  });
}

function slideBy(dir){
  const count = window._sliderCount || 1;
  const next  = ((window._sliderIdx || 0) + dir + count) % count;
  slideTo(next);
}

function buildViewerHtml(button){
  const title = (button.textContent || '').trim() || button.dataset.title || '';
  const koSrc = button.dataset.img || '';
  const isEn  = document.documentElement.lang === 'en';
  /* 영어 모드: en/<같은 파일명> 을 먼저 시도하고, 파일이 없으면 한국어 이미지로 자동 대체(onerror) */
  const src   = (isEn && koSrc) ? 'en/' + koSrc : koSrc;
  const onErr = (src !== koSrc) ? ` onerror="this.onerror=null;this.src='${encodeURI(koSrc)}'"` : '';
  const isVideo = /\.(mp4|mov|webm|ogg)$/i.test(src);
  const mediaHtml = isVideo
    ? `<video class="inline-viewer-img" src="${encodeURI(src)}" controls playsinline style="background:#000;"></video>`
    : `<img class="inline-viewer-img" src="${encodeURI(src)}"${onErr} alt="${escapeHtml(title)}">`;
  const downloadBtn = !isVideo ? `
    <a href="${encodeURI(src)}" download class="download-btn">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3v13M7 11l5 5 5-5"/><path d="M5 20h14"/>
      </svg>
      이미지 저장
    </a>` : '';
  return `
    <div class="inline-viewer-inner">
      <div class="inline-viewer-head">
        <div class="inline-viewer-title">${escapeHtml(title)}</div>
        <button class="inline-viewer-close" type="button" onclick="closeInlineViewerKeepSub()">×</button>
      </div>
      ${mediaHtml}
      ${downloadBtn}
    </div>`;
}

function refreshCurrentViewer(){
  if(!currentViewer || !currentViewerButton) return;
  currentViewer.innerHTML = buildViewerHtml(currentViewerButton);
}

/* 유튜브 인라인 뷰어 열기 */
function openYoutubeViewer(button){
  const title = (button.textContent || '').trim() || button.dataset.title || '';
  const ytUrl = button.dataset.yt || '';

  if(button.classList.contains('active')){
    closeInlineViewer();
    if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');
    return;
  }
  closeInlineViewer();
  button.classList.add('active');
  if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');

  const viewer = document.createElement('div');
  viewer.className = 'inline-viewer';
  viewer.innerHTML = `
    <div class="inline-viewer-inner">
      <div class="inline-viewer-head">
        <div class="inline-viewer-title">${escapeHtml(title)}</div>
        <button class="inline-viewer-close" type="button" onclick="closeInlineViewerKeepSub()">×</button>
      </div>
      <div style="position:relative;width:100%;padding-bottom:177.78%;height:0;border-radius:16px;overflow:hidden;box-shadow:0 10px 28px rgba(0,0,0,0.18);">
        <iframe src="${ytUrl}?rel=0&playsinline=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allow="encrypted-media" allowfullscreen loading="lazy"></iframe>
      </div>
    </div>
  `;

  const navItem = button.closest('.nav-item');
  navItem.insertAdjacentElement('afterend', viewer);
  currentViewer = viewer;
  setTimeout(() => viewer.scrollIntoView({ behavior:'smooth', block:'nearest' }), 50);
}

/* 이미지 인라인 뷰어 열기 */
function openInlineViewer(button){
  const title = (button.textContent || '').trim() || button.dataset.title || '';
  const src   = button.dataset.img   || '';
  currentViewerButton = button;

  if(button.classList.contains('active')){
    closeInlineViewer();
    /* 서브메뉴 버튼이면 닫힌 후에도 서브메뉴 헤더 active 복원 */
    if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');
    return;
  }

  closeInlineViewer();
  button.classList.add('active');

  /* 서브메뉴 헤더 버튼 active 유지 */
  if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');

  const viewer = document.createElement('div');
  viewer.className = 'inline-viewer';
  viewer.innerHTML = buildViewerHtml(button);

  const navItem = button.closest('.nav-item');
  navItem.insertAdjacentElement('afterend', viewer);
  currentViewer = viewer;

  setTimeout(() => viewer.scrollIntoView({ behavior:'smooth', block:'nearest' }), 50);
}

/* × 버튼 전용: 뷰어만 닫고 서브메뉴 헤더 active 복원 */
function closeInlineViewerKeepSub(){
  closeInlineViewer();
  if(currentSubMenuBtn) currentSubMenuBtn.classList.add('active');
}

function escapeHtml(str){
  return String(str)
    .replaceAll('&','&amp;')
    .replaceAll('<','&lt;')
    .replaceAll('>','&gt;')
    .replaceAll('"','&quot;')
    .replaceAll("'",'&#039;');
}
