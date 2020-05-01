//class Card that make an object of film and create html markup for that
export default class Card {
    constructor(options){
      this.img = options.Poster;
      this.title = options.Title;
      this.year = options.Year;
      this.rating = options.ratingImdb;
    }
  
    makeCardForHtml(){
      const markup = 
        `<div class="swiper-slide card">
          <div class="card__image" style="background-image: url(${this.img});"></div>
          <a href="#" class="card__title">${this.title}
          </a>
          <p class="card__year">${this.year}</p>
          <p class="card__rating">${this.rating}</p>
        </div>`;
        return markup;
    }
  }