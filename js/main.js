document.addEventListener('DOMContentLoaded', () => {

  /* catergory section js */
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

/* qna marquee swiper */
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
   BESTSELLER ENTER ONLY (no disappear on scroll up)
   ========================= */
const bestsellerSection = document.querySelector('.bestseller');

function handleBestsellerEnterOnly() {
  if (!bestsellerSection) return;

  const rect = bestsellerSection.getBoundingClientRect();
  const vh = window.innerHeight;

  const startPoint = vh * 0.85;
  const endPoint   = vh * 0.35;

  const progress = clamp01((startPoint - rect.top) / (startPoint - endPoint));

  bestsellerSection.style.setProperty('--bsO', progress);
  bestsellerSection.style.setProperty('--bsY', `${(1 - progress) * 60}px`);
}

/* =========================
   QNA ENTER ONLY (no disappear on scroll up)
   ========================= */
const qnaSection = document.querySelector('.qna');

function handleQnaEnterOnly(){
  if (!qnaSection) return;

  const rect = qnaSection.getBoundingClientRect();
  const vh = window.innerHeight;

  // 아래에서 등장: top이 85% 지점 닿으면 시작 → 35%에서 완료
  const startPoint = vh * 0.85;
  const endPoint   = vh * 0.35;

  const progress = clamp01((startPoint - rect.top) / (startPoint - endPoint));

  // 섹션 자체 페이드
  qnaSection.style.setProperty('--qnaO', progress);

  // 오버레이는 등장할수록 사라짐(어둠 → 밝음)
  qnaSection.style.setProperty('--qnaDim', (1 - progress) * 0.6);
}

/* =========================
   BESTSELLER + QNA reveal (IO)
   ========================= */
function addRevealIO(selector, options){
  const el = document.querySelector(selector);
  if(!el) return;

  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      el.classList.add('is-in');
      observer.unobserve(entry.target); // 한 번만
    });
  }, options);

  io.observe(el);
}

/* bestseller: 조금 일찍 뜨게 */
addRevealIO('.bestseller', {
  threshold: 0,
  rootMargin: "0px 0px -60% 0px"
});

/* qna: 조금 늦게(또는 동일하게) */
addRevealIO('.qna', {
  threshold: 0,
  rootMargin: "0px 0px -55% 0px"
});


/* =========================
   CATEGORY title fade-in (enter)
   ========================= */
const categorySection2 = document.querySelector('.category');
if (categorySection2) {
  const ioCategory = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      categorySection2.classList.add('is-in');
      observer.unobserve(entry.target); // 한 번만
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -60% 0px"
  });

  ioCategory.observe(categorySection2);
}
 /* =========================
     SNS ENTER ONLY (drop-bounce once)
     ========================= */
  const snsSection = document.querySelector('.sns');
  if (snsSection) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        snsSection.classList.add('is-in');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0,
      rootMargin: "-10% 0px -90% 0px"
    });

    io.observe(snsSection);
  }

  /* =========================
     BRAND reveal (필수!)
     ========================= */
  const brandSection = document.querySelector('.brand');
  if (brandSection) {
    const brandObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        brandSection.classList.add('show');
        // 한 번만이면 아래 줄 유지 / 반복이면 제거
        brandObserver.unobserve(entry.target);
      });
    }, { threshold: 0.3 });

    brandObserver.observe(brandSection);
  }
});