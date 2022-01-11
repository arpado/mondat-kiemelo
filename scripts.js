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

//MENU

//gombok
let toggleInputBtn = document.getElementById('toggle-input-btn');
let toggleSettingsBtn = document.getElementById('toggle-settings-btn');
let toggleHelpBtn = document.getElementById('toggle-help-btn');

//window-k
let inputWindow = document.getElementById('input-window');
let settingsWindow = document.getElementById('settings-window');
let helpWindow = document.getElementById('help-window');

//toggle method
document.addEventListener('click', e => {
    switch (e.target) {
        case toggleInputBtn:
            if (inputWindow.classList.contains('hidden')) {
                inputWindow.classList.remove('hidden');
            } else {
                inputWindow.classList.add('hidden');
            }
            break;
        case toggleSettingsBtn:
            if (settingsWindow.classList.contains('hidden')) {
                settingsWindow.classList.remove('hidden');
            } else {
                settingsWindow.classList.add('hidden');
            }
            break;
        case toggleHelpBtn:
            if (helpWindow.classList.contains('hidden')){
                helpWindow.classList.remove('hidden');        
            } else {
                helpWindow.classList.add('hidden');
            }
    }
});

// pressing the Esc key closes all of the windows
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        helpWindow.classList.add('hidden');
        settingsWindow.classList.add('hidden');
        inputWindow.classList.add('hidden');
    }
};

// ----------------------- BALOLDAL -----------------------//

//setup for btn-s

let previewBtnSection = document.querySelector('.preview-btn');
let btnColorSection = document.querySelector('.color-btn');
let btnTextSection = document.querySelector('.text-btn');

// HTML templates

//let ColorSelectorTemplate = `<input type="color" value="#ff0000">`;
/*`
<select name="colors" class="color-select">
<option value="">--Please choose an option--</option>
<option value="red">Red</option>
<option value="green">Green</option>
<option value="blue">Blue</option>
<option value="cyan">Cyan</option>
<option value="magenta">Magenta</option>
<option value="yellow">Yellow</option>
</select>
`;*/

// btn hozzaadas

let addNewBtnBtn = document.getElementById('add-new-btn');
let lineNumber = 1;

addNewBtnBtn.addEventListener('click', e => {
    let newBtn = document.createElement('button');
    let newColorSelector = document.createElement('input');
    let setNewBtnText = document.createElement('input');
    //add input & select attributes later
    //add class later
    newBtn.setAttribute('id', `button-${lineNumber}`);
    newBtn.setAttribute('class', 'removeBtn')
    previewBtnSection.insertBefore(newBtn, addNewBtnBtn);
    newBtn.innerText = 'Remove Line';

    btnColorSection.append(newColorSelector);
    newColorSelector.setAttribute('id', `color-selector-${lineNumber}`);
    //color pickernek inkabb colorpickert
    //newColorSelector.innerHTML = ColorSelectorTemplate;
    newColorSelector.setAttribute('type', 'color');
    newColorSelector.setAttribute('value', '#ffffff');

    btnTextSection.append(setNewBtnText);
    setNewBtnText.setAttribute('id', `text-input-${lineNumber}`);
    lineNumber++;
});

function getIdNum(id) {
    return idNumber = parseInt((id.replace(/[^\d]/g, '')));
}

// btn remove

previewBtnSection.addEventListener('click', e => {
    // console.log(previewBtnSection.children.item(index))
    // console.log(previewBtnSection.children)
    // console.log(index)
    if (e.target.classList.contains('removeBtn')) {
    //document.querySelector(`#${e.target.id}`).remove();
    //console.log(e.target.id)
    getIdNum(e.target.id);
    //console.log(idNumber)
    document.getElementById(`button-${idNumber}`).remove();
    document.getElementById(`color-selector-${idNumber}`).remove();
    document.getElementById(`text-input-${idNumber}`).remove();
    }
});

// btn text/color update

btnColorSection.addEventListener('input', e => {
    getIdNum(e.target.id);
    let newBtn = document.querySelector(`#button-${idNumber}`)
    newBtn.style.background = e.target.value;
});

btnTextSection.addEventListener('keyup', e => {
    getIdNum(e.target.id);
    let newBtn = document.querySelector(`#button-${idNumber}`);
    newBtn.innerText = e.target.value;
});

//Egy kulon oszlopba remove

// ---------------------- JOBBOLDAL (PREFERENCES) --------------------------- //


// toggle background image

function toggleBackgroundImage(status) {
    let body = document.querySelector('body')
    if(status === '1') {
        body.style.backgroundImage = 'url("img/parchment.jpeg")';
    } else {
        body.style.backgroundImage = 'none';
    }
}

let toggleBackgroundImageInput = document.querySelector('#toggle-background-img');

// set fontsize
function setFontSize() {
    let main = document.querySelector('.main');
    main.style.fontSize = setFontSizeInputNum.value + setFontSizeInputUnits.value;
}

let setFontSizeInputNum = document.querySelector('#font-size');
let setFontSizeInputUnits = document.querySelector('#font-size-units');

//set font color

function setFontColor() {
    let main = document.querySelector('.main');
    main.style.color = setFontColorInput.value;
}

let setFontColorInput = document.querySelector('#font-color');

// set font family

function setFontFamily() {
    let main = document.querySelector('.main');
    main.style.fontFamily = setFontFamilyInput.value;
}

let setFontFamilyInput = document.querySelector('#font-family');

// btn font color

function setBtnFontColor() {
    //document.querySelectorAll('.color-picker-button').style.color = setBtnFontColorInput.value;
    buttonContainer.style.color = setBtnFontColorInput.value;
    //ezt a removebuttont majd frissiteni kell, sot, event listnerbe kitenni, h previewban is latszodjon
    
}

let setBtnFontColorInput = document.querySelector('#btn-font-color');
setFontColorInput.addEventListener('change', e => {
    btnColorSection.children.style.color = e.target.value;
});

// word box border

let WordBoxBorder = document.querySelectorAll('.wordDiv')

/* width | style | color */
function setWordBoxBorder() {
    let setWordBoxBorderNumInput = document.querySelector('#word-border-thickness-number').value;
    let setWordBoxBorderUnitInput = document.querySelector('#word-border-thickness-unit').value;
    let setWordBoxBorderStyleInput = document.querySelector('#word-border-color').value;
    let setWordBoxBorderColorInput = document.querySelector('#word-border-style').value;
    return WordBoxBorderStyle = `${setWordBoxBorderNumInput}${setWordBoxBorderUnitInput} ${setWordBoxBorderStyleInput} ${setWordBoxBorderColorInput}`
}

// sentence box border

// save pref

let savePreferences = document.querySelector('#save-preferences');

savePreferences.addEventListener('click', (e) => {
    localStorage.clear();
    localStorage.setItem('backgroundImg', toggleBackgroundImageInput.value);
    localStorage.setItem('wordBoxBorder', setWordBoxBorder())
    //localStorage.setItem('', '');
    let backgroundImg = localStorage.getItem('backgroundImg');
    //let localStorage.setItem('', '');
    applyPreferences(backgroundImg);
    saveButtons();
    loadButtons();

    //setWordBoxBorder()
});

function applyPreferences(backgroundImg) {
    // az ertekeket a localstoragebol kell vennie
    toggleBackgroundImage(backgroundImg);
    /*setFontSize();
    setFontColor();
    setFontFamily();
    setBtnFontColor();*/


}

// gombok mentese

function saveButtons() {
    let collection = document.querySelectorAll('.removeBtn');
    collection.forEach(element => {
        if (element.style.background === '') {
            element.style.background = '#ffffff';
        }
        localStorage.setItem(element.id, JSON.stringify({
            text : element.innerText, 
            color : element.style.background
        }))
    });
}

// gombok hozzarendelese

function loadButtons() {
    return sortedButtonArray = findLocalItems('button-').sort(compare);
}

//gombok kikeresese
//ezt atirni, megerteni, h mi a fene
//https://gist.github.com/n0m4dz/77f08d3de1b9115e905c

function findLocalItems (query) {
    var i, results = [];
    for (i in localStorage) {
      if (localStorage.hasOwnProperty(i)) {
        if (i.match(query) || (!query && typeof i === 'string')) {
          value = JSON.parse(localStorage.getItem(i));
          results.push({key:i,val:value});
        }
      }
    }
    return results;
  }


// compare a gombok sortjahoz

function compare(a, b) {
    if (a.key < b.key){
      return -1;
    }
    if (a.key > b.key){
      return 1;
    }
    return 0;
  }









// if localstorage.length === 0 -> setDefaultPref
