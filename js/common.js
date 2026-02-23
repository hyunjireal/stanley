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

  const header = document.querySelector('header');
  const ham = document.querySelector('.ham');
  const allMenuDim = document.querySelector('.all_menu_dim');

  let lastY = window.scrollY;
  const delta = 8;
  const trigger = 80;

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