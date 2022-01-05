let container = document.querySelector('.container');
let createNewSentButton = document.querySelector('.new');
let inputSentence = document.querySelector('#input-sentence');
let wordSelected = '';

let buttonContent = ['red', 'blue', 'green'];
let numberOfButtons = 6;
let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button-container');


function makeButtons(locX, locY, buttonContent) {
    container.appendChild(buttonContainer);
    buttonContainer.style.left = locX + 'px';
    buttonContainer.style.top = locY + 'px';

    for (let i = 0; i < buttonContent.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('class', 'button');
        button.setAttribute('id', buttonContent[i]);
        button.innerText = buttonContent[i];
        buttonContainer.append(button);
    }
}

function clearSelectedWord() {
    if (document.querySelector('#wordSelected')) {
        wordSelected = document.querySelector('#wordSelected');
        wordSelected.removeAttribute('id');
    }
}

function closeButtonMenu() {
    buttonContainer.innerHTML = '';
    buttonContainer.remove();
}

createNewSentButton.addEventListener('click', () => {
    if (inputSentence.value === '') {
        return;
    }

    let sentenceDiv = document.createElement('div');
    container.append(sentenceDiv);
    sentenceDiv.setAttribute('class', 'sentence-box');

    let sentenceIndicatorDiv = document.createElement('div');
    sentenceDiv.append(sentenceIndicatorDiv);
    sentenceIndicatorDiv.setAttribute('class', 'sentence-indicator');

    let inputSentenceSplit = inputSentence.value.trim().split(' ');

    for (let i = 0; i < inputSentenceSplit.length; i++) {
        //lehet, h a wordcontainer nem is kell majd
        let wordDivContainer = document.createElement('div');
        sentenceDiv.append(wordDivContainer);
        wordDivContainer.setAttribute('class', 'word-container');

        let wordDiv = document.createElement('div');
        wordDivContainer.append(wordDiv);
        wordDiv.setAttribute('class', 'individual-word');
        wordDiv.innerText = inputSentenceSplit[i] + ' ';
    }

    inputSentence.value = '';
});

document.addEventListener('click', e => {

    if (buttonContainer) {
        closeButtonMenu();
    }

    if (e.target.classList.contains('individual-word')) {
        // ez a clearSelect csak biztonsagbol van itt, elvileg redundans
        clearSelectedWord();
        makeButtons(e.pageX, e.pageY, buttonContent);
        e.target.setAttribute('id', 'wordSelected');
    } else if (e.target.classList.contains('button')) {
        wordSelected = document.querySelector('#wordSelected');
        let color = e.target.id;
        wordSelected.style.background = color;
        clearSelectedWord();
        closeButtonMenu();
    } else {
        clearSelectedWord();
        closeButtonMenu();
    }
});