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
    320: {
      slidesPerView: 1,
      spaceBetween: 20
    },
    600: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40
    }
  }
})

