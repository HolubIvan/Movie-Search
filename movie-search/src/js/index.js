//import js files
import "./swiper";
import {initSlider} from './swiperSettings';
import {cards, submitButton, formInput, containerForCards,cross,loadingElement} from './variables';
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
});



//async function that make an api call and return an array of obj films
async function getMovieObj(param){
  const urlFilms = `https://www.omdbapi.com/?s=${param}&apikey=9b67fc54`;
  const respond = await fetch(urlFilms);
  const data = await respond.json();
  //wait for all promises to complete
  await Promise.all(data.Search.map(async (el)=>{
    //init async rating function to get rating of each film and put in into an object
    el.ratingImdb = await getRatingImdb(el.imdbID);
  }))
  return data.Search;
}


//get a rating of the film by imdb id of film
async function getRatingImdb(imdbRating){
  const url = `https://www.omdbapi.com/?i=${imdbRating}&apikey=9b67fc54`;
  const respond = await fetch(url);
  const data = await respond.json();
  return data.imdbRating;
}


// function that's wait for an array of objects and then iterate 
//over them and render to html
async function createCards (param){
const cardsObjects = await getMovieObj(param);

  cardsObjects.forEach((el)=>{
    //make new card with html markup and insert it to dom
    const card = new Card(el).makeCardForHtml();
    containerForCards.insertAdjacentHTML('beforeend', card);
})
  //init slider after container of cards is ready
  initSlider();
}



//handler function to watch a click at input search button
submitButton.addEventListener('click', (event)=>{

  event.preventDefault();
  containerForCards.innerHTML = '';

  //create cards function 
  createCards(formInput.value);
})


//make a basic request and render films when window has loaded
window.addEventListener('load', ()=>{
  createCards('titanic');
})



















//alternate method to insert html card to dom

// async function createCards (param){
//   const cardsObjects = await getMovieObj(param);
  
//     cardsObjects.forEach((el)=>{
  
//       const card = new Card(el).makeCardForHtml();
//       containerForCards.insertAdjacentHTML('beforeend', card);
  
  
    
    // const node = document.createElement('div');
    // node.classList.add('swiper-slide');
    // node.classList.add('card');
    // const img = document.createElement('div');
    // img.classList.add('card__image');
    // img.style.backgroundImage = `url(${el.Poster})`;
    // const title = document.createElement('a');
    // title.classList.add('card__title');
    // title.setAttribute('href', `https://www.imdb.com/title/${el.imdbID}/videogallery/`);
    // title.setAttribute('target', '_blank')
    // title.innerText = el.Title;
    // const year = document.createElement('p');
    // year.classList.add('card__year');
    // year.textContent = el.Year;
    // const rating = document.createElement('p');
    // rating.classList.add('card__rating');
    // rating.textContent = el.ratingImdb;
    // node.append(img);
    // node.append(title);
    // node.append(year);
    // node.append(rating);
    // containerForCards.append(node)
    
  // })
  //   initSlider();
  // }