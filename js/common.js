document.addEventListener('DOMContentLoaded', () => {

  AOS.init({
    disable: false,
    startEvent: 'DOMContentLoaded',
    initClassName: 'aos-init',
    animatedClassName: 'aos-animate',
    useClassNames: false,
    disableMutationObserver: false,
    debounceDelay: 50,
    throttleDelay: 99
  });

  /* =========================
   INTRO MOTION (0s~1.6s)
   ========================= */
const siteHeader = document.querySelector('header');      // ✅ 기존 header 변수와 겹치지 않게
const mainVisualEl = document.querySelector('.main_visual');

if (siteHeader && mainVisualEl) {
  // STEP 1: 로딩 직후 (0s~0.8s)
  siteHeader.classList.add('intro-hide');
  mainVisualEl.classList.add('intro-bg'); // ✅ 배경 페이드인 시작

  // STEP 2: 텍스트 등장 (0.8s~1.6s)
  window.setTimeout(() => {
    mainVisualEl.classList.add('intro-text');
  }, 800);


}
  const header = document.querySelector('header');
  const ham = document.querySelector('.ham');
  const allMenuDim = document.querySelector('.all_menu_dim');

  let lastY = window.scrollY;
  const delta = 8;
  const trigger = 80;

  /* =========================
   FIRST SCROLL → HEADER SHOW
   ========================= */
let introActive = true;

window.addEventListener('scroll', () => {

  if (!introActive) return;

  if (window.scrollY > 50) {   // 10px 이상 움직이면
    siteHeader.classList.remove('intro-hide');
    introActive = false;       // 한 번만 실행
  }

}, { passive: true });

  /* =========================
     SCROLL HEADER CONTROL
     ========================= */
  window.addEventListener('scroll', () => {

    // ✅ 전체 메뉴 열려있으면 스크롤 숨김 로직 멈춤
    if (header.classList.contains('open')) return;

    const y = window.scrollY;

    if (y <= trigger) {
      header.classList.remove('bottom-hide');
      lastY = y;
      return;
    }

    if (y > lastY + delta) {
      header.classList.add('bottom-hide');
    }
    else if (y < lastY - delta) {
      header.classList.remove('bottom-hide');
    }

    lastY = y;

  }, { passive: true });

  /* =========================
     FULL MENU TOGGLE
     ========================= */

  if (ham) {
    ham.addEventListener('click', () => {

      header.classList.toggle('open');

      // ✅ 헤더 숨김 방지
      header.classList.remove('bottom-hide');

      // ✅ 스크롤 락
      document.body.classList.toggle(
        'no-scroll',
        header.classList.contains('open')
      );

    });
  }

  /* =========================
     DIM CLICK CLOSE
     ========================= */
  if (allMenuDim) {
    allMenuDim.addEventListener('click', () => {
      header.classList.remove('open');
      document.body.classList.remove('no-scroll');
    });
  }

  /* =========================
     ESC KEY CLOSE
     ========================= */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      header.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }
  });

});