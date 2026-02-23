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



});