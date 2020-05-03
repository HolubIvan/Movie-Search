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
  }
})
