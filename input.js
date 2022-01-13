// input area
let inputSentence = document.querySelector('#input-sentence');

//buttons
let inputBtnBox = document.querySelector('#input-btn-div')

//ezekre lehet, h nincs is szukseg
let createNewSentButton = document.querySelector('#add-new-sentence');
let generateLipsumBtn = document.querySelector('#lipsum');
let generateDividedLipsumBtn = document.querySelector('#divided-lipsum')

// letrehozza a foreszben a mondatszerkezetet, lipsumot general - gombok. ezt a reszt jelentosen atirom
inputBtnBox.addEventListener('click', (e) => {
    switch (e.target.id) {
        case 'add-new-sentence':
            addNewSentence();
            break;
        case 'lipsum':
            generateLipsum();
            break;
        case 'divided-lipsum':
            generateDividedLipsum();
            break;
    }
});

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
    upperRankDiv.innerText = i + 1;
    let arrow = document.createElement('div');
    rankDiv.append(arrow);
    arrow.innerText = '->'
    let lowerRankDiv = document.createElement('div');
    rankDiv.append(lowerRankDiv);
    lowerRankDiv.innerText = 'Later'

    let subSentenceDiv = document.createElement('div');
    sentenceDiv.append(subSentenceDiv);
    subSentenceDiv.setAttribute('class', 'sentence-box');

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
        wordDiv.style.border = `${localStorage.getItem('wordBoxBorderValueInput')}${localStorage.getItem('wordBoxBorderUnitInput')} ${localStorage.getItem('wordBoxBorderStyleInput')} ${localStorage.getItem('wordBoxBorderColorInput')}`;
        
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