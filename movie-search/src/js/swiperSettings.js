export {mySwiper};

//swiper settings
const mySwiper = new Swiper ('.swiper-container', {
  slidesPerView: 3,
  spaceBetween: 80,
  initialSlide: 0,
  observer: true,
  update: false,

  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },

  
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  breakpoints: {
    // when window width is >= 320px
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    // when window width is >= 480px
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    // when window width is >= 640px
    768: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
})

// $content-width: 1400px;
// $tablet-width: 768px;
// $mobile-big-width: 414px;
// $mobile-small-width: 320px;

