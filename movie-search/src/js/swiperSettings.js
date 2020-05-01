export {initSlider};

function initSlider(param){
const mySwiper = new Swiper ('.swiper-container', {
  
    loop: true,
    slidesPerView: 3,
    spaceBetween: 80,
  
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    on: {
      reachEnd: function () {
        console.log('end')
        createCards('movie')
      }
    }
  })
}

