let container = document.querySelector('.main');
let createNewSentButton = document.querySelector('.new');
let inputSentence = document.querySelector('#input-sentence');
let wordSelected = '';

//container a gombok szamara
let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button-container');

//let buttonContent = ['red', 'blue', 'green'];
// buttoncontent 
//let numberOfButtons = 6;

// id-t megtalani
//let buttonId = buttonArray[i].key;
// kell egz szortirozas regexel a id-ra, uj arraybe sorbarakni oket

//let buttonColor = buttonArray[i].val.color;
//let buttonText = buttonArray[i].val.text;

// legordulo gombsavot letrehozza
function makeButtons(locX, locY, sortedButtonArray) {
    container.appendChild(buttonContainer);
    buttonContainer.style.left = locX + 'px';
    buttonContainer.style.top = locY + 'px';

    for (let i = 0; i < sortedButtonArray.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('class', 'color-picker-button');
        button.setAttribute('id', `${sortedButtonArray[i].key}-main`);
        button.innerText = sortedButtonArray[i].val.text;
        button.style.background = sortedButtonArray[i].val.color;
        buttonContainer.append(button);
    }

    let button = document.createElement('button');
    button.setAttribute('class', 'color-picker-button');
    button.setAttribute('id', 'clear-main');
    button.innerText = 'Clear';
    button.style.background = 'transparent';
    buttonContainer.append(button);
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

    //loop a tagomndatokra

    let sentenceDiv = document.createElement('div');
    container.append(sentenceDiv);
    sentenceDiv.setAttribute('class', 'sentence-box');

    let rankDiv = document.createElement('div');
    sentenceDiv.append(rankDiv);
    rankDiv.setAttribute('class', 'rank-box');

    let subSentenceDiv = document.createElement('div');
    sentenceDiv.append(subSentenceDiv);
    subSentenceDiv.setAttribute('class', 'word-box');

    // ki
    /*let sentenceIndicatorDiv = document.createElement('div');
    subSentenceDiv.append(sentenceIndicatorDiv);
    sentenceIndicatorDiv.setAttribute('class', 'sentence-indicator');*/

    //ezt atalakitani?? split /n -nel is!!!
    let inputSentenceSplit = inputSentence.value.trim().split(' ');

    //ki
    /*let tryOut = document.createElement('div');
    tryOut.setAttribute('class', 'try-out')
    subSentenceDiv.append(tryOut);*/

    for (let i = 0; i < inputSentenceSplit.length; i++) {
        //lehet, h a wordcontainer nem is kell majd
        /*let wordDivContainer = document.createElement('div');
        subSentenceDiv.append(wordDivContainer);
        wordDivContainer.setAttribute('class', 'word-container');*/

        let wordDiv = document.createElement('div');
        subSentenceDiv.append(wordDiv);
        wordDiv.setAttribute('class', 'individual-word');
        wordDiv.innerText = inputSentenceSplit[i];

        //ki
        /*let spaceBetween = document.createElement('div');
        subSentenceDiv.append(spaceBetween);
        spaceBetween.setAttribute('class', 'space-between')
        spaceBetween.innerText = ' ';*/
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
        makeButtons(e.pageX, e.pageY, sortedButtonArray);
        e.target.setAttribute('id', 'wordSelected');
    } 
    
    // ha a gombra kattint valtoztatasok, majd torli a szelekciot
    else if (e.target.classList.contains('color-picker-button')) {
        wordSelected = document.querySelector('#wordSelected');
        let color = e.target.style.background;
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

// INIT

initialize()