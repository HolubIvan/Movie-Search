import {cards, submitButton, formInput, containerForCards,cross,loadingElement,infoOfRequestInDom, mainContainer, keyboardIcon,microphoneIcon} from './variables';
import {createCardsClickSearchButton} from './index';

export {microphoneListener};

//function to recognize voice and create cards of films
const microphoneListener = ()=>{

        let urlAudio = require('./../audio/audioQuestion.mp3')
        const audio = new Audio(urlAudio);
        audio.play();
        
        setTimeout(()=>{
            const recognition = new SpeechRecognition();
            recognition.interimResults = true;
            recognition.start();

            recognition.onresult = (event)=>{
                const transcript = Array.from(event.results)
                    .map(el => el[0])
                    .map(el => el.transcript)
                    .join('')
                    formInput.value = transcript;
                    createCardsClickSearchButton(transcript);
            }
        },2000)   
}


