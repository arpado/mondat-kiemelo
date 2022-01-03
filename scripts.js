let container = document.querySelector('.container');
let createNewSentButton = document.querySelector('.new');
let inputSentence = document.querySelector('#input-sentence');

let pointerX = -1;
let pointerY = -1;

let buttonContent = [];
let numberOfButtons = 6;

function makeButtons() {
    for (let i = 0; i < buttonContent.length; i++) {
        
    }
}

let button1 = document.createElement('button');
button1.setAttribute('class', 'button1');
button1.innerText = 'BUTTON1';
let button2 = document.createElement('button');
button2.setAttribute('class', 'button2');
button2.innerText = 'BUTTON2';

let wordSelected = '';
let wordIndicatorSelected = '';

createNewSentButton.addEventListener('click', () => {

    let sentenceDiv = document.createElement('div');
    container.append(sentenceDiv);
    sentenceDiv.setAttribute('class', 'sentence-box');

    let sentenceIndicatorDiv = document.createElement('div');
    sentenceDiv.append(sentenceIndicatorDiv);
    sentenceIndicatorDiv.setAttribute('class', 'sentence-indicator');

    let inputSentenceSplit = inputSentence.value.trim().split(' ');

    for (i=0; i < inputSentenceSplit.length; i++){
        let wordDivContainer = document.createElement('div');
        sentenceDiv.append(wordDivContainer);
        wordDivContainer.setAttribute('class', 'word-container');

        let wordDiv = document.createElement('div');
        wordDivContainer.append(wordDiv);
        wordDiv.setAttribute('class', 'individual-word');
        wordDiv.innerText = inputSentenceSplit[i] + ' ';

        let wordIndicatorDiv = document.createElement('div');
        wordDivContainer.append(wordIndicatorDiv);
        wordIndicatorDiv.setAttribute('class', 'word-indicator');
    }
    inputSentence.value = '';
});

document.addEventListener('click', e => {
    if (e.target.classList.contains('individual-word') || e.target.classList.contains('word-indicator')) {
        pointerX = e.pageX;
        pointerY = e.pageY;

        container.append(button1);
        let button1X = pointerX - 100;
        let button1Y = pointerY + 30;
        button1.style.left = button1X+'px';
        button1.style.top = button1Y+'px';

        container.append(button2);
        let button2X = pointerX + 100;
        let button2Y = pointerY + 30;
        button2.style.left = button2X+'px';
        button2.style.top = button2Y+'px';

        if (e.target.classList.contains('individual-word')){
            e.target.setAttribute('id', 'wordSelected');
            e.target.nextElementSibling.setAttribute('id', 'wordIndicatorSelected');
        } else if (e.target.classList.contains('word-indicator')) {
            e.target.setAttribute('id', 'wordIndicatorSelected');
            e.target.previousElementSibling.setAttribute('id', 'wordSelected');
        }
    }
});

document.addEventListener('click', e => {
 
    if (e.target.classList.contains('button1')) {
        wordSelected = document.querySelector('#wordSelected');
        wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        wordSelected.style.textDecoration = "underline dashed";
        wordSelected.removeAttribute('id');
        wordIndicatorSelected.removeAttribute('id');
        button1.remove();
        button2.remove();
    } else if (e.target.classList.contains('button2')) {
        wordSelected = document.querySelector('#wordSelected');
        wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        wordIndicatorSelected.style.background = "blue";
        //wordIndicatorSelected.style.textDecoration = "underline dashed";
        wordSelected.removeAttribute('id');
        wordIndicatorSelected.removeAttribute('id');
        button1.remove();
        button2.remove();
    } 
    /*else {
        wordSelected = document.querySelector('#wordSelected');
        wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        wordSelected.removeAttribute('id');
        wordIndicatorSelected.removeAttribute('id');
        button1.remove();
        button2.remove();
    }*/
    
    
});
