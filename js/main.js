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

});