document.addEventListener('DOMContentLoaded', () => {
const categoryItems = document.querySelectorAll('.category_list > li');
const bgImages = document.querySelectorAll('.bg_img img');

categoryItems.forEach(item => {
  item.addEventListener('mouseenter', () => {
    const target = item.dataset.bg;  // li에 있는 data-bg 값

    bgImages.forEach(img => {
      if (img.dataset.bg === target) {
        img.classList.add('on');
      } else {
        img.classList.remove('on');
      }
    });
  });
});

/* 마우스가 카테고리 영역을 벗어나면 기본 1번으로 복귀 */
const categorySection = document.querySelector('.category');
categorySection.addEventListener('mouseleave', () => {
  bgImages.forEach(img => {
    img.classList.remove('on');
  });

  // 첫 번째 이미지 다시 켜기
  bgImages[0].classList.add('on');
});

  // QnA Marquee Swiper
const customerSlide = new Swiper(".qna .swiper", {
  loop: true,
  slidesPerView: 'auto', //아이템 너비만큼 자연 흐름
  spaceBetween: 30,
  speed: 9000, //전체 트랙이 한번 도는 시간 (느리게=크게)
  autoplay: {
    delay: 0,
    reverseDirection: true,
    disableOnInteraction: false,
    pauseOnMouseEnter: false, //마우스 올려도 안 멈추게
  },
  loopAdditionalSlides: 5, //루프 시 빈틈 방지
  on: {
    init: function () {
      this.wrapperEl.style.transitionTimingFunction = 'linear';
    },
    slideChangeTransitionStart: function () {
      this.wrapperEl.style.transitionTimingFunction = 'linear';
    },
  }
});

 const mainSwiper = new Swiper('.mainSwiper', {
    loop: true,                // 추가: 무한 루프
    speed: 900,                // 추가: 전환 속도
    grabCursor: true,          // 추가: 마우스 올리면 손모양(드래그 힌트)
    simulateTouch: true,       // 추가: PC에서도 드래그 슬라이드
    touchRatio: 1,             // 추가: 드래그 감도 기본
    resistanceRatio: 0.85,     // 추가: 드래그 저항감

    autoplay: {                // 추가(선택): 자동 슬라이드
      delay: 4500,
      disableOnInteraction: false, // 드래그 후에도 autoplay 유지
    },
  });


  /* =========================
   MAIN VISUAL SHRINK OUT (scroll progress)
   ========================= */
const mvWrap = document.querySelector('.main_visual_wrap');
const mv = document.querySelector('.main_visual');

function clamp01(v){ return Math.max(0, Math.min(1, v)); }

function updateMainVisualProgress(){
  if (!mvWrap || !mv) return;

  const rect = mvWrap.getBoundingClientRect();
  const total = mvWrap.offsetHeight - mv.offsetHeight; // 래퍼 스크롤 가능한 길이
  if (total <= 0) {
    mv.style.setProperty('--mvP', 0);
    return;
  }

  // rect.top이 0 → 래퍼 시작(=mvP 0), rect.top이 -total → 끝(=mvP 1)
  const progress = clamp01((-rect.top) / total);
  mv.style.setProperty('--mvP', progress);
}

updateMainVisualProgress();
window.addEventListener('scroll', updateMainVisualProgress, { passive: true });
window.addEventListener('resize', updateMainVisualProgress);

function updateMainVisualProgress(){
  if (!mvWrap || !mv) return;

  const rect = mvWrap.getBoundingClientRect();
  const total = mvWrap.offsetHeight - mv.offsetHeight;
  if (total <= 0) { mv.style.setProperty('--mvP', 0); return; }

  const progress = clamp01((-rect.top) / total);
  mv.style.setProperty('--mvP', progress);

  const hint = mv.querySelector('.scroll_hint');
  if (hint) hint.style.opacity = (progress < 0.08) ? '0.85' : '0';
}
/* =========================
   BESTSELLER IN + OUT (scroll progress)
   ========================= */
const best = document.querySelector('.bestseller');

function updateBestsellerProgress() {
  if (!best) return;

  const rect = best.getBoundingClientRect();
  const vh = window.innerHeight;

  // ✅ 등장(Enter): 섹션 top이 화면 85% 지점에 닿으면 시작 → 35% 지점이면 완료
  const inStart = vh * 0.85;
  const inEnd   = vh * 0.35;
  const pIn = clamp01((inStart - rect.top) / (inStart - inEnd));

  // ✅ 퇴장(Exit): 섹션 bottom이 화면 15% 지점에 닿으면 시작 → -15% 지점이면 완료(위로 빠짐)
  const outStart = vh * 0.15;
  const outEnd   = -vh * 0.15;
  const pOut = clamp01((rect.bottom - outEnd) / (outStart - outEnd));
  // pOut: 1(아직 충분히 화면 안) → 0(완전히 위로 지나감)

  // ✅ 최종 opacity: 들어올 때도, 나갈 때도 둘 다 자연스럽게
  const o = Math.min(pIn, pOut);

  // ✅ Y 이동: 들어올 땐 +60 → 0, 나갈 땐 0 → -60
  const enterY = (1 - pIn) * 60;      // 60 -> 0
  const exitY  = -(1 - pOut) * 60;    // 0  -> -60
  const y = enterY + exitY;

  best.style.setProperty('--bsO', o);
  best.style.setProperty('--bsY', `${y}px`);
}

updateBestsellerProgress();
window.addEventListener('scroll', updateBestsellerProgress, { passive: true });
window.addEventListener('resize', updateBestsellerProgress);


});