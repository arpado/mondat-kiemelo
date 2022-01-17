// input area
let inputSentence = document.querySelector('#input-sentence');

//buttons
let inputBtnBox = document.querySelector('#input-btn-div')

//ezekre lehet, h nincs is szukseg
let createNewSentButton = document.querySelector('#add-new-sentence');
//let createNewSentAndCloseBtn = document.querySelector('#add-new-sentence-and-close');')
let generateLipsumBtn = document.querySelector('#lipsum');
let generateDividedLipsumBtn = document.querySelector('#divided-lipsum');
//let

// letrehozza a foreszben a mondatszerkezetet, lipsumot general - gombok. ezt a reszt jelentosen atirom
inputBtnBox.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'add-new-sentence':
            addNewSentence();
            break;
        case 'add-new-sentence-and-close':
            addNewSentence();
            closeMenuRemoveShine(inputWindow, toggleInputBtn);
            break;
        case 'lipsum':
            generateLipsum();
            break;
        case 'divided-lipsum':
            generateDividedLipsum();
            break;
        case 'clear-input':
            clearInput();
            break;
    }
});
let sentenceCounter = 1;

function addNewSentence() {

    if (inputSentence.value.trim() === '') {
        return inputSentence.value = '';
    }

    //loop a tagomndatokra



    //ide a sub-sentence loop
    let inputSuperSentence = inputSentence.value.trim().split('#')

    for (let i = 0; i < inputSuperSentence.length; i++) {
    
    let sentenceDiv = document.createElement('div');
    container.append(sentenceDiv);
    sentenceDiv.setAttribute('class', 'input-unit-container');

    let rankDiv = document.createElement('div');
    sentenceDiv.append(rankDiv);
    rankDiv.setAttribute('class', 'rank-box');

    let upperRankDiv = document.createElement('div');
    rankDiv.append(upperRankDiv);
    //ID NEM JO - csekkolni, valszeg jo
    upperRankDiv.innerHTML = `<input type="number" name="sentence-rank" class="number-input sentence-counter" id="sentence-rank-${sentenceCounter}">`;
    sentenceCounter++;

    let arrow = document.createElement('div');
    rankDiv.append(arrow);
    arrow.innerHTML = '<i class="fas fa-chevron-up"></i>'

    let lowerRankDiv = document.createElement('div');
    rankDiv.append(lowerRankDiv);
    lowerRankDiv.innerText = i + 1;

    toggleBorder(rankingBoxCollection, 'rankingBoxBorderToggle', 'rankingBoxBorderValueInput', 'rankingBoxBorderUnitInput', 'rankingBoxBorderStyleInput', 'rankingBoxBorderColorInput');
    if (localStorage.getItem('rankingBoxToggle') === '0') {
        rankDiv.classList.add('hidden');
    }

    let subSentenceDiv = document.createElement('div');
    sentenceDiv.append(subSentenceDiv);
    subSentenceDiv.setAttribute('class', 'sentence-box');
    if (localStorage.getItem('sentenceBoxBorderToggle') === '1') {
        subSentenceDiv.style.border = `${localStorage.getItem('sentenceBoxBorderValueInput')}${localStorage.getItem('sentenceBoxBorderUnitInput')} ${localStorage.getItem('sentenceBoxBorderStyleInput')} ${localStorage.getItem('sentenceBoxBorderColorInput')}`;
    }

    // ki
    /*let sentenceIndicatorDiv = document.createElement('div');
    subSentenceDiv.append(sentenceIndicatorDiv);
    sentenceIndicatorDiv.setAttribute('class', 'sentence-indicator');*/

    //ezt atalakitani?? split /n -nel is!!!
    let splitRegEx = /\s|\n|\t/g
    let inputSentenceSplit = inputSuperSentence[i].trim().split(splitRegEx);

    //ki
    /*let tryOut = document.createElement('div');
    tryOut.setAttribute('class', 'try-out')
    subSentenceDiv.append(tryOut);*/

    for (let j = 0; j < inputSentenceSplit.length; j++) {
        //lehet, h a wordcontainer nem is kell majd
        /*let wordDivContainer = document.createElement('div');
        subSentenceDiv.append(wordDivContainer);
        wordDivContainer.setAttribute('class', 'word-container');*/
        if (inputSentenceSplit[j] !== '') {

            let wordDiv = document.createElement('div');
            subSentenceDiv.append(wordDiv);
            wordDiv.setAttribute('class', 'individual-word');
            wordDiv.innerText = inputSentenceSplit[j].trim();
            if (localStorage.getItem('wordBoxBorderToggle') === '1') {
                wordDiv.style.border = `${localStorage.getItem('wordBoxBorderValueInput')}${localStorage.getItem('wordBoxBorderUnitInput')} ${localStorage.getItem('wordBoxBorderStyleInput')} ${localStorage.getItem('wordBoxBorderColorInput')}`;
            }
        }
        //ki
        /*let spaceBetween = document.createElement('div');
        subSentenceDiv.append(spaceBetween);
        spaceBetween.setAttribute('class', 'space-between')
        spaceBetween.innerText = ' ';*/
    }
}

    inputSentence.value = '';
}

function generateLipsum() {
    inputSentence.value = 'Lorem ipsum dolor sit, amet consectetur adipisicing elit, illo voluptatibus, quibusdam nulla tempore velit cumque eaque quia, autem iure itaque repellat, quo quaerat in distinctio fugit provident voluptate eveniet dolores?'
}

function generateDividedLipsum() {
    inputSentence.value = 'Lorem ipsum dolor sit,# amet consectetur adipisicing elit, illo voluptatibus,# quibusdam nulla tempore velit cumque eaque quia, autem iure itaque repellat,# quo quaerat in distinctio fugit provident voluptate eveniet dolores?'
}

function clearInput() {
    inputSentence.value = '';
}