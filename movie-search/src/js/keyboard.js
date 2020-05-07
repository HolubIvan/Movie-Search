/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
import {cards, submitButton, formInput, containerForCards, cross,loadingElement, infoOfRequestInDom, keyboardIcon,mainContainer} from './variables';
import {createCardsClickSearchButton} from './index';
export {initVirtualKeyboard, deleteVirtualKeyboard, listenClickOnVirtualKeyboard, capsLockVirtualKeyboard,langOnLoad};

const eventCode = ['Backquote', 'Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0', 'Minus', 'Equal', 'Backspace', 'Tab', 'KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'BracketLeft', 'BracketRight', 'Backslash', 'CapsLock', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'Semicolon', 'Quote', 'Enter', 'ShiftLeft', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM', 'Comma', 'Period', 'Slash', 'ArrowUp', 'ControlLeft', 'AltLeft', 'MetaLeft', 'Space', 'MetaRight', 'AltRight', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];

const eventKeyEng = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', 'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '|', 'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', '▲', 'Ctr', 'Alt', 'Lang', ' ', 'Lang', 'Alt', '◄', '▼', '►'];

const eventKeyRus = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=',
  'Backspace', 'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', 'ё', 'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 'Shift', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '/', '▲', 'Ctr', 'Alt', 'Lang', ' ', 'Lang', 'Alt', '◄', '▼', '►'];

// final key array
const keyOnInput = [];


// add keys from array to html markup

function addAllKeys(arr, arr1) {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    const button = document.createElement('button');
    button.classList.add('keyboard__key');
    button.setAttribute('data', arr[i]);
    if (button.getAttribute('data') === 'Space') {
      button.classList.add('keyboard__key-wide');
    } else if (button.getAttribute('data') === 'ShiftLeft' || button.getAttribute('data') === 'Enter' || button.getAttribute('data') === 'Backspace' || button.getAttribute('data') === 'Tab') {
      button.classList.add('keyboard__key-middle');
    } else if(button.getAttribute('data')  === 'ArrowUp'){
        button.classList.add('keyboard__key-middle-up');
    } else if (button.getAttribute('data') === 'CapsLock') {
      button.classList.add('keyboard__key-short');
    }
    button.textContent = arr1[i];
    result.push(button);
  }
  return result;
}

// init function: create keyboard, add keys from html markup key and add to document

function initVirtualKeyboard() {

  const keyboard = document.createElement('div');
  keyboard.classList.add('keyboard');

  const keyboardKeys = document.createElement('div');
  keyboardKeys.classList.add('keyboard__keys');

  keyboard.append(keyboardKeys);
  keyboardKeys.append(...addAllKeys(eventCode, eventKeyEng));
  mainContainer.append(keyboard);
}

function deleteVirtualKeyboard(){
    document.querySelector('.keyboard').remove();
}

// listen for click on keyboard and add key to textarea

function listenClickOnVirtualKeyboard() {
  document.querySelectorAll('.keyboard__key').forEach((el) => {
    // eslint-disable-next-line consistent-return
    el.addEventListener('click', (event) => {
      // listen for delete
      if (event.target.textContent === 'Backspace') {
        keyOnInput.pop();
        formInput.value = formInput.value.slice(0, -1);
      } else if (event.target.textContent === 'Ctr' || event.target.textContent === 'Alt' || event.target.textContent === 'Shift') {
        return false;
      } else if(event.target.textContent === 'Lang'){
        changeLanguageOuter();
      }else if (event.target.textContent === 'Enter') {
        if(formInput.value === ''){
            return false;
          }else{    
            createCardsClickSearchButton(formInput.value);
          }
      } else if (event.target.textContent === 'Tab') {
        event.preventDefault();
        keyOnInput.push(' ', ' ');
        formInput.value += '  ';
      } else if (event.target.textContent === 'CapsLock') {
        capsLock();
      } else if (event.target.textContent === '►') {
        changeInputFocusRight();
        return false
        console.log(formInput.value.length)
      } else if (event.target.textContent === '◄') {
        changeInputFocusLeft();
      } else if (event.target.textContent === '▲' || event.target.textContent === '▼') {
        return false;
      } else {
        keyOnInput.push(event.target.textContent);
        formInput.value += keyOnInput[keyOnInput.length - 1];
      }
    });
  });
}
let n = 1;
const changeInputFocusLeft = ()=>{
  let inputLengthValue = formInput.value.length;
  formInput.focus()
  formInput.setSelectionRange(inputLengthValue-n, inputLengthValue-n);
  n += 1;
}

const changeInputFocusRight = ()=>{
  let inputLengthValue = formInput.value.length;
  formInput.focus()
  formInput.setSelectionRange(inputLengthValue-n+2, inputLengthValue-n+2);
  n -= 1;
}



// click event for CapsLock

let isCapsLock = false;

function capsLockVirtualKeyboard() {
  if (!isCapsLock) {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.textContent.length === 1) {
        el.textContent = el.textContent.toUpperCase();
      }
    });
    isCapsLock = true;
  } else {
    document.querySelectorAll('.keyboard__key').forEach((el) => {
      if (el.textContent.length === 1) {
        el.textContent = el.textContent.toLowerCase();
      }
    });
    isCapsLock = false;
  }
}


// change language on load what language was before

function langOnLoad() {
  if (localStorage.getItem('isEng') === 'true') {
    changeToEng();
  } else if (localStorage.getItem('isEng') === 'false') {
    changeToRus();
  }
}


// changing language functions: working with control + shift

const pressed = [];
let isEng = true;

function changeLanguageOuter() {
  if (!isEng) {
    isEng = true;
    localStorage.setItem('isEng', isEng);
    changeToEng();
  } else {
    isEng = false;
    localStorage.setItem('isEng', isEng);
    changeToRus();
  }
}

function changeToRus() {
  document.querySelectorAll('.keyboard__key').forEach((el, i) => {
    el.textContent = eventKeyRus[i];
  });
  pressed.length = 0;
}

function changeToEng() {
  document.querySelectorAll('.keyboard__key').forEach((el, i) => {
    el.textContent = eventKeyEng[i];
  });
  pressed.length = 0;
}
