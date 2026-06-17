/* ─────────────────────────────────────────────
   앱 부트스트랩 (컴포넌트 로더)
   - [data-component] 마운트 지점에 HTML 파셜을 fetch 하여 조립
   - 조립 완료 후 다국어 적용
   주의: fetch 기반이라 file:// 직접 열기로는 동작하지 않습니다.
         로컬 확인 시 간단한 정적 서버(예: npx serve)를 사용하세요.
   ───────────────────────────────────────────── */

async function mountComponent(el){
  const name = el.getAttribute('data-component');
  const res  = await fetch(`components/${name}.html`);
  if(!res.ok) throw new Error(`컴포넌트 로드 실패: ${name} (${res.status})`);
  const html = await res.text();
  const tpl  = document.createElement('template');
  tpl.innerHTML = html.trim();
  el.replaceWith(tpl.content);
}

async function bootstrap(){
  const mounts = Array.from(document.querySelectorAll('[data-component]'));
  try {
    /* 마운트 지점이 교체되며 사라지므로 미리 배열로 복사해 순차 처리 */
    for(const el of mounts){
      await mountComponent(el);
    }
    applyLanguage();
  } catch (err){
    console.error('[bootstrap] 컴포넌트 조립 중 오류:', err);
    document.body.insertAdjacentHTML('afterbegin',
      `<p style="color:#fff;text-align:center;padding:16px;">페이지를 불러오지 못했습니다. 정적 서버에서 실행해 주세요.</p>`);
  }
}

document.addEventListener('DOMContentLoaded', bootstrap);
