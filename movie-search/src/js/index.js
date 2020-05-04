//import js files
import "./swiper";
import {mySwiper} from './swiperSettings';
import {cards, submitButton, formInput, containerForCards,cross,loadingElement,infoOfRequestInDom} from './variables';
import Card from './Card';

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
import '../css/mixins.scss';



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


// function to create and render cards when search button clicked 
async function createCardsClickSearchButton (param, num){
  loadingElement.style.display = 'inline-block';

  //wait to have translation from rus to eng
  const getTitleInEnglish = await translateFilmTitle(param);

  const cardsObjects = await getMovieObj(getTitleInEnglish, num);
  if(cardsObjects){
    
    loadingElement.style.display = 'none';
    containerForCards.innerHTML = '';

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


// function to create and render cards when slider has reached the end
async function createCardsWhenSliderReachEnd (param, num){
  loadingElement.style.display = 'inline-block';

  //wait to have translation from rus to eng
  const getTitleInEnglish = await translateFilmTitle(param);

  const cardsObjects = await getMovieObj(getTitleInEnglish, num);
  if(cardsObjects){
    
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

  createCardsClickSearchButton(formInput.value);
  
})


//make a basic request and render films when window has loaded
window.addEventListener('load', ()=>{
  createCardsClickSearchButton('titaniC');
})


//set currentPage and activeIndex variables to manipulate slider
let currentPage = 1;
let activeIndex = 7;

//set event for slider for slideChange to get next 10 films after slide end
mySwiper.on('slideChange', ()=>{
  if(formInput.value === ''){
    return false;
  } else {
    if(mySwiper.activeIndex == activeIndex){
      currentPage += 1; 
      activeIndex += 10; 
      createCardsWhenSliderReachEnd(formInput.value, currentPage);
    }
  }
})

//update slider after refresh input
mySwiper.on('update', ()=>{
  mySwiper.slideTo(activeIndex-10, 600, false);
})
