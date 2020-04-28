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





