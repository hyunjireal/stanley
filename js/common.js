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

  let lastY = window.scrollY;
  const delta = 8;       // 작은 흔들림(미세 스크롤) 무시용
  const trigger = 80;    // 이 값 이하는 항상 Bottom 보이게

  window.addEventListener('scroll', () => {
    const y = window.scrollY;

    // 맨 위쪽(예: hero 구간)에서는 항상 Bottom 보여주기
    if (y <= trigger) {
      header.classList.remove('bottom-hide');
      lastY = y;
      return;
    }

    // 아래로 스크롤 중이면 숨김
    if (y > lastY + delta) {
      header.classList.add('bottom-hide');
    }
    // 위로 스크롤 중이면 표시
    else if (y < lastY - delta) {
      header.classList.remove('bottom-hide');
    }

    lastY = y;
  }, { passive: true });



});