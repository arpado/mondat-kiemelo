let container = document.querySelector('.container');
let createNewSentButton = document.querySelector('.new');
let inputSentence = document.querySelector('#input-sentence');
let wordSelected = '';

//container a gombok szamara
let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button-container');

let buttonContent = ['red', 'blue', 'green'];
let numberOfButtons = 6;

// legordulo gombsavot letrehozza
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

// a kijelolt szo (amit a gombokkal valtoztat) jelolesenek torlese
function clearSelectedWord() {
    if (document.querySelector('#wordSelected')) {
        wordSelected = document.querySelector('#wordSelected');
        wordSelected.removeAttribute('id');
    }
}

// bezarja a gombsavot
function closeButtonMenu() {
    buttonContainer.innerHTML = '';
    buttonContainer.remove();
}

// letrehozza a foreszben a mondatszerkezetet, ezt a reszt jelentosen atirom
createNewSentButton.addEventListener('click', () => {
    if (inputSentence.value.trim() === '') {
        return inputSentence.value = '';
    }

    let sentenceDiv = document.createElement('div');
    container.append(sentenceDiv);
    sentenceDiv.setAttribute('class', 'sentence-box');

    let sentenceIndicatorDiv = document.createElement('div');
    sentenceDiv.append(sentenceIndicatorDiv);
    sentenceIndicatorDiv.setAttribute('class', 'sentence-indicator');

    let inputSentenceSplit = inputSentence.value.trim().split(' ');
    let tryOut = document.createElement('div');
    tryOut.setAttribute('class', 'try-out')
    sentenceDiv.append(tryOut);

    for (let i = 0; i < inputSentenceSplit.length; i++) {
        //lehet, h a wordcontainer nem is kell majd
        /*let wordDivContainer = document.createElement('div');
        sentenceDiv.append(wordDivContainer);
        wordDivContainer.setAttribute('class', 'word-container');*/

        let wordDiv = document.createElement('div');
        sentenceDiv.append(wordDiv);
        wordDiv.setAttribute('class', 'individual-word');
        wordDiv.innerText = inputSentenceSplit[i];
        let spaceBetween = document.createElement('div');
        sentenceDiv.append(spaceBetween);
        spaceBetween.setAttribute('class', 'space-between')
        spaceBetween.innerText = ' ';
    }

    inputSentence.value = '';
});

// a majdnem teljes oldalon talalhato kattra figyel, kivetel a beviteli mezo es a hozzatartozo gomb
document.addEventListener('click', e => {

    //ha meg lenne nyitva a gombsav, akkor lecsukja eloszor
    if (buttonContainer) {
        closeButtonMenu();
    }

    // ha a hasznalo valid szora kattint, megnyitja a gombsavot
    if (e.target.classList.contains('individual-word')) {
        // ez a clearSelect csak biztonsagbol van itt, elvileg redundans
        clearSelectedWord();
        makeButtons(e.pageX, e.pageY, buttonContent);
        e.target.setAttribute('id', 'wordSelected');
    } 
    
    // ha a gombra kattint valtoztatasok, majd torli a szelekciot
    else if (e.target.classList.contains('button')) {
        wordSelected = document.querySelector('#wordSelected');
        let color = e.target.id;
        wordSelected.style.background = color;
        clearSelectedWord();
        closeButtonMenu();
    } 
    
    // invalid katt, torli a jelolest, lecsukja a gombsavot
    else {
        clearSelectedWord();
        closeButtonMenu();
    }
});