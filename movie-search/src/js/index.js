//import js files
import "../css/swiper.css";
import "./swiper";
import {initSlider} from './swiperSettings';

//import css and scss files
import '../css/swiperSettings.scss';
import '../css/style.css';
import '../css/base.scss';
import '../css/header.scss';
import '../css/main.scss';
import '../css/variables.scss';
import '../css/footer.scss';
import {cards, submitButton, formInput, containerForCards} from './variables';










// class Card {
//   constructor(options){
//     this.img = options.Poster;
//     this.title = options.Title;
//     this.year = options.Year;
//     this.id = options.imdbID;
//     this.rating = options.ratingImdb;
//   }
// }


async function getMovieObj(param){
  const urlFilms = `https://www.omdbapi.com/?s=${param}&apikey=9b67fc54`;
  const respond = await fetch(urlFilms);
  const data = await respond.json();
  await Promise.all(data.Search.map(async (el)=>{
    el.ratingImdb = await getRatingImdb(el.imdbID);
  }))
  return data.Search;
}



async function getRatingImdb(imdbRating){
  const url = `https://www.omdbapi.com/?i=${imdbRating}&apikey=9b67fc54`;
  const respond = await fetch(url);
  const data = await respond.json();
  return data.imdbRating;
}



async function createCards (param){
const cardsObjects = await getMovieObj(param);

  cardsObjects.forEach((el)=>{
  
  const node = document.createElement('div');
  node.classList.add('swiper-slide');
  node.classList.add('card');
  const img = document.createElement('div');
  img.classList.add('card__image');
  img.style.backgroundImage = `url(${el.Poster})`;
  const title = document.createElement('a');
  title.classList.add('card__title');
  title.setAttribute('href', `https://www.imdb.com/title/${el.imdbID}/videogallery/`);
  title.setAttribute('target', '_blank')
  title.innerText = el.Title;
  const year = document.createElement('p');
  year.classList.add('card__year');
  year.textContent = el.Year;
  const rating = document.createElement('p');
  rating.classList.add('card__rating');
  rating.textContent = el.ratingImdb;
  node.append(img);
  node.append(title);
  node.append(year);
  node.append(rating);
  containerForCards.append(node)
  
})
  initSlider();
}


submitButton.addEventListener('click', (event)=>{
event.preventDefault();
containerForCards.innerHTML = '';
createCards(formInput.value);
})

