//class Card that make an object of film and create html markup for that
export default class Card {
    constructor(options){
      this.img = options.Poster;
      this.title = options.Title;
      this.year = options.Year;
      this.imdbID = options.imdbID;
      this.rating = options.ratingImdb;
    }
  
    makeCardForHtml(){
      const markup = 
        `<div class="swiper-slide card">
          <div class="card__image" style="background-image: url(${this.img});"></div>
          <a href="https://www.imdb.com/title/${this.imdbID}/videogallery/" class="card__title" target="_blank">${this.title}
          </a>
          <p class="card__year">${this.year}</p>
          <span class="card__wrapper_for_star">
            <img src="./../img/goldstar.png" class="star" alt="rating-star">
            <p class="card__rating">${this.rating}</p>
          </span>
        </div>`;
        return markup;
    }
  }