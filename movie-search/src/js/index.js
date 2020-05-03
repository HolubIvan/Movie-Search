//import js files
import "./swiper";
import {mySwiper} from './swiperSettings';
import {cards, submitButton, formInput, containerForCards,cross,loadingElement,infoOfRequestInDom} from './variables';
import Card from './Card'

//import css and scss files
import '../css/swiperSettings.scss';
import "../css/swiper.css";
import '../css/style.css';
import '../css/base.scss';
import '../css/header.scss';
import '../css/main.scss';
import '../css/variables.scss';
import '../css/footer.scss';
import '../css/loadingElement.scss';
import '../css/crossInputButton.scss';




// clear form input value by click over cross
cross.addEventListener('click', () => {
  formInput.value = '';
  infoOfRequestInDom.textContent = '';
});



//async function that make an api call and return an array of obj films
async function getMovieObj(param, num = 1){
  try{
    const urlFilms = `https://www.omdbapi.com/?s=${param}&apikey=87417931&page=${num}`;
    const respond = await fetch(urlFilms);
    const data = await respond.json();
    if(data.Response === 'False'){
      console.log(data)
    }
    //wait for all promises to complete
    await Promise.all(data.Search.map(async (el)=>{
      //init async rating function to get rating of each film and put in into an object
      el.ratingImdb = await getRatingImdb(el.imdbID);
    }))
    return data.Search;
  } catch(error){
    infoOfRequestInDom.textContent = `No results for '${param}'. Try again please.`;
    return false
  }
}

//get a rating of the film by imdb id of film
async function getRatingImdb(imdbRating){
  const url = `https://www.omdbapi.com/?i=${imdbRating}&apikey=87417931`;
  const respond = await fetch(url);
  const data = await respond.json();
  return data.imdbRating;
}

//get translated movie title from rus to eng
async function translateFilmTitle(param){
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T111130Z.f0857897fdf97e6d.b9e9f0290f59eeeebfcf97d7e15ff30a61b06aa3&text=${param}&lang=ru-en`;
  const respond = await fetch(url);
  const data = await respond.json();

  //check if request was in russian language
  if (/^[а-яА-Я]+$/.test(param)){
    infoOfRequestInDom.textContent = `Shoving results for : ${data.text[0]}`;
  } else if(/^[a-zA-Z]+$/.test(param)){
    infoOfRequestInDom.textContent = ``;
  }

  return data.text[0];
}


// function that's wait for an array of objects and then iterate 
//over them and render to html
async function createCards (param, num){
  loadingElement.style.display = 'inline-block';

  //wait to have translation from rus to eng
  const getTitleInEnglish = await translateFilmTitle(param);

  //wait to have an array of objects
  const cardsObjects = await getMovieObj(getTitleInEnglish, num);
  if(cardsObjects){
    
    //remove loading element and clear container for cards
    loadingElement.style.display = 'none';

    cardsObjects.forEach((el)=>{
      //make new card with html markup and insert it to dom
      const card = new Card(el).makeCardForHtml();
      containerForCards.insertAdjacentHTML('beforeend', card);
    })
    mySwiper.update()

    
  } else {
    loadingElement.style.display = 'none';
    return false;
  }
}



//handler function to watch a click at input search button
submitButton.addEventListener('click', (event)=>{

  //set current page and active index of slide to change
  currentPage = 1;
  activeIndex = 6;

  event.preventDefault();

  containerForCards.innerHTML = '';

  //create cards function 
  createCards(formInput.value);
  
})


//make a basic request and render films when window has loaded
window.addEventListener('load', ()=>{
  createCards('titaniC');
})








//set currentPage and activeIndex variables to manipulate slider
let currentPage = 1;
let activeIndex = 7;

//set event for slider for slideChange to get next 10 films after slide end
mySwiper.on('slideChange', ()=>{
  console.log(mySwiper.activeIndex ) 
  if(formInput.value === ''){
    return false
  } else {
    if(mySwiper.activeIndex == activeIndex){
      console.log('end');
      currentPage += 1; 
      activeIndex += 10; 
      createCards(formInput.value, currentPage)
    }
  }
})

//update slider after refresh input
mySwiper.on('update', ()=>{
  mySwiper.slideTo(activeIndex-10, 600, false);
})














// --------------------------------------


// // clear form input value by click over cross
// cross.addEventListener('click', () => {
//   formInput.value = '';
//   infoOfRequestInDom.textContent = '';
// });



// //async function that make an api call and return an array of obj films
// async function getMovieObj(param, num = 1){
//   try{
//     const urlFilms = `https://www.omdbapi.com/?s=${param}&apikey=87417931&page=${num}`;
//     const respond = await fetch(urlFilms);
//     const data = await respond.json();
//     if(data.Response === 'False'){
//       console.log(data)
//     }
//     //wait for all promises to complete
//     await Promise.all(data.Search.map(async (el)=>{
//       //init async rating function to get rating of each film and put in into an object
//       el.ratingImdb = await getRatingImdb(el.imdbID);
//     }))
//     return data.Search;
//   } catch(error){
//     infoOfRequestInDom.textContent = `No results for '${param}'. Try again please.`;
//     return false
//   }
// }

// //get a rating of the film by imdb id of film
// async function getRatingImdb(imdbRating){
//   const url = `https://www.omdbapi.com/?i=${imdbRating}&apikey=87417931`;
//   const respond = await fetch(url);
//   const data = await respond.json();
//   return data.imdbRating;
// }

// //get translated movie title from rus to eng
// async function translateFilmTitle(param){
//   const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200501T111130Z.f0857897fdf97e6d.b9e9f0290f59eeeebfcf97d7e15ff30a61b06aa3&text=${param}&lang=ru-en`;
//   const respond = await fetch(url);
//   const data = await respond.json();

//   //check if request was in russian language
//   if (/^[а-яА-Я]+$/.test(param)){
//     infoOfRequestInDom.textContent = `Shoving results for : ${data.text[0]}`;
//   } else if(/^[a-zA-Z]+$/.test(param)){
//     infoOfRequestInDom.textContent = ``;
//   }

//   return data.text[0];
// }


// // function that's wait for an array of objects and then iterate 
// //over them and render to html
// async function createCards (param, num){
//   loadingElement.style.display = 'inline-block';

//   //wait to have translation from rus to eng
//   const getTitleInEnglish = await translateFilmTitle(param);

//   //wait to have an array of objects
//   const cardsObjects = await getMovieObj(getTitleInEnglish, num);
//   if(cardsObjects){
    
//     //remove loading element and clear container for cards
//     loadingElement.style.display = 'none';
//     containerForCards.innerHTML = '';

//     cardsObjects.forEach((el)=>{
//       //make new card with html markup and insert it to dom
//       const card = new Card(el).makeCardForHtml();
//       containerForCards.insertAdjacentHTML('beforeend', card);
//     })
//     mySwiper.init()
//     mySwiper.slideTo(0, 400, false);
    
//   } else {
//     loadingElement.style.display = 'none';
//     return false;
//   }
// }



// //handler function to watch a click at input search button
// submitButton.addEventListener('click', (event)=>{

//   event.preventDefault();

//   //create cards function 
//   createCards(formInput.value);
// })


// //make a basic request and render films when window has loaded
// window.addEventListener('load', ()=>{
//   createCards('titanic');
// })






// const mySwiper = new Swiper ('.swiper-container', {
//   init: false,
//   // loop: true,
//   slidesPerView: 3,
//   spaceBetween: 80,
//   initialSlide: 0,
//   observer: true,
//   reachEnd: false,

//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   },

  
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },

//   breakpoints: {
//       // when window width is >= 320px
//       320: {
//         slidesPerView: 1,
//       //   spaceBetween: 20
//       },
//       // when window width is >= 480px
//       800: {
//         slidesPerView: 2,
//       //   spaceBetween: 30
//       },
//       // when window width is >= 640px
//       1200: {
//         slidesPerView: 3,
//       //   spaceBetween: 40
//       }
//     },

//   on: {
//     reachEnd: function () {
//       console.log('swiper end');
//     }
//   }
// })