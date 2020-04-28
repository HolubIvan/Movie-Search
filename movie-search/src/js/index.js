import '../css/style.css';
import '../css/base.scss';
import '../css/header.scss';
import '../css/main.scss';
import '../css/variables.scss';
import '../css/footer.scss';
import {cards, arrowRight , arrowLeft, submitButton, formInput, containerForCards} from './variables';






// slider functions
let currentItem = 0;




arrowRight.addEventListener('click', function(){
  const cardsArray = Array.from(cards);
  if(currentItem < cardsArray.length){
    cardsArray[currentItem].style.display = 'none';
    currentItem+=1;
  } else {
      return false
  }
})

arrowLeft.addEventListener('click', function(){
    const cardsArray = Array.from(cards);
    if(currentItem > 0){
        cardsArray[currentItem-1].style.display = 'block';
        currentItem-=1;
    }
  })












async function createCards (param){
const cardsObjects = await getMovieObj(param);
console.log(cardsObjects[0])
console.log(cardsObjects[0].ratingImdb)

  cardsObjects.forEach((el)=>{
  
  const node = document.createElement('div');
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
}


submitButton.addEventListener('click', (event)=>{
event.preventDefault();
containerForCards.innerHTML = '';
createCards(formInput.value);
})


