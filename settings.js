

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
//EZT MEG NEM MENTI LOCALBA!

let backgroundImg = localStorage.getItem('backgroundImg');

//localStorage.setItem('backgroundImg', toggleBackgroundImageInput.value);

function toggleBackgroundImage(status) {
    let body = document.querySelector('body')
    if(status === '1') {
       return body.style.backgroundImage = 'url("img/parchment.jpeg")';
    } else {
        return body.style.backgroundImage = 'none';
    }
}


// background img
let toggleBackgroundImageInput = document.querySelector('#toggle-background-img');

// main
let mainWindow = document.querySelector('.main');

// fontsize
let fontSizeInput = document.querySelector('#font-size');
let fontSizeInputUnits = document.querySelector('#font-size-units');

//set font color
let setFontColorInput = document.querySelector('#font-color');

// set font family
let setFontFamilyInput = document.querySelector('#font-family');

// btn font color
let setBtnFontColorInput = document.querySelector('#btn-font-color');


// word box border // ezt csekkolni
let wordBoxCollection = document.getElementsByClassName('individual-word');

//let wordBox = document.querySelectorAll('.individual-word');
let setWordBoxBorderNumInput = document.querySelector('#word-border-thickness-number');
let setWordBoxBorderUnitInput = document.querySelector('#word-border-thickness-unit');
let setWordBoxBorderStyleInput = document.querySelector('#word-border-color');
let setWordBoxBorderColorInput = document.querySelector('#word-border-style');

// sentence box border
let sentenceBoxCollection = document.getElementsByClassName('sentence-box');
let setSentenceBoxBorderNumInput = document.querySelector('#sentence-border-thickness-number');
let setSentenceBoxBorderUnitInput = document.querySelector('#sentence-border-thickness-unit');
let setSentenceBoxBorderColorInput = document.querySelector('#sentence-border-color');
let setSentenceBoxBorderStyleInput = document.querySelector('#sentence-border-style');


function pushSettings() {
    //fontsize
    localStorage.setItem('fontSizeInputValue', fontSizeInput.value);
    localStorage.setItem('fontSizeInputUnits', fontSizeInputUnits.value);
    // font color
    localStorage.setItem('fontColorInput', setFontColorInput.value);
    // font family
    localStorage.setItem('fontFamilyInput', setFontFamilyInput.value);
    // btn font color
    localStorage.setItem('btnFontColor', setBtnFontColorInput.value);
    // word box border
    localStorage.setItem('wordBoxBorderValueInput', setWordBoxBorderNumInput.value);
    localStorage.setItem('wordBoxBorderUnitInput', setWordBoxBorderUnitInput.value);
    localStorage.setItem('wordBoxBorderStyleInput', setWordBoxBorderStyleInput.value);
    localStorage.setItem('wordBoxBorderColorInput', setWordBoxBorderColorInput.value);
    // sentence box border
    localStorage.setItem('sentenceBoxBorderNumInput', setSentenceBoxBorderNumInput.value);
    localStorage.setItem('sentenceBoxBorderUnitInput', setSentenceBoxBorderUnitInput.value);
    localStorage.setItem('sentenceBoxBorderStyleInput', setSentenceBoxBorderStyleInput.value);
    localStorage.setItem('sentenceBoxBorderColorInput', setSentenceBoxBorderColorInput.value);
}

function applyPreferences() {
    //fontsize
    mainWindow.style.fontSize = localStorage.getItem('fontSizeInputValue') + localStorage.getItem('fontSizeInputUnits');
    //font color
    mainWindow.style.color = localStorage.getItem('fontColorInput');
    // set font family
    mainWindow.style.fontFamily = localStorage.getItem('fontFamilyInput');
    // btn font color
    buttonContainer.style.color = localStorage.getItem('btnFontColor');

    //sentence box border ---- ez unit container
    if (sentenceBoxCollection.length > 0) {
        for (sentenceBox of sentenceBoxCollection) {
            sentenceBox.style.border = `${localStorage.getItem('sentenceBoxBorderNumInput')}${localStorage.getItem('sentenceBoxBorderUnitInput')} ${localStorage.getItem('sentenceBoxBorderStyleInput')} ${localStorage.getItem('sentenceBoxBorderColorInput')}`;
        }
    }

    // word box border
    //let wordBoxCollection = document.getElementsByClassName('individual-word');
    if (wordBoxCollection.length > 0) {
        for (wordBox of wordBoxCollection) {
            wordBox.style.border = `${localStorage.getItem('wordBoxBorderValueInput')}${localStorage.getItem('wordBoxBorderUnitInput')} ${localStorage.getItem('wordBoxBorderStyleInput')} ${localStorage.getItem('wordBoxBorderColorInput')}`;
        }
    }

}

function pullSettings() {
    //fontsize
    fontSizeInput.value = localStorage.getItem('fontSizeInputValue');
    fontSizeInputUnits.value = localStorage.getItem('fontSizeInputUnits');
    //font color
    setFontColorInput.value = localStorage.getItem('fontColorInput');
    // set font family
    setFontFamilyInput.value = localStorage.getItem('fontFamilyInput');
    // btn font color
    setBtnFontColorInput.value = localStorage.getItem('btnFontColor');
    // word box border
    setWordBoxBorderNumInput.value = localStorage.getItem('wordBoxBorderValueInput');
    setWordBoxBorderUnitInput.value = localStorage.getItem('wordBoxBorderUnitInput');
    setWordBoxBorderStyleInput.value = localStorage.getItem('wordBoxBorderStyleInput');
    setWordBoxBorderColorInput.value = localStorage.getItem('wordBoxBorderColorInput');
    //sentence box border
    setSentenceBoxBorderNumInput.value = localStorage.getItem('sentenceBoxBorderNumInput');
    setSentenceBoxBorderUnitInput.value = localStorage.getItem('sentenceBoxBorderUnitInput');
    setSentenceBoxBorderStyleInput.value = localStorage.getItem('sentenceBoxBorderStyleInput');
    setSentenceBoxBorderColorInput.value = localStorage.getItem('sentenceBoxBorderColorInput'); 
}

// btn font color live preview
//ez rosszul van bekotve

setFontColorInput.addEventListener('change', e => {
    btnColorSection.children.style.color = e.target.value;
});

// save pref

let savePreferences = document.querySelector('#save-preferences');

savePreferences.addEventListener('click', (e) => {
    localStorage.clear();
    pushSettings();
    applyPreferences();
    saveButtons();
    loadButtons();
    pullSettings();
});

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
    //valami if-et, h ures array eseten ne dobjon hibat
    return sortedButtonArray = findLocalItems('button-').sort(compare);
}

//gombok kikeresese
//ezt atirni, megerteni, h mi a fene
//https://gist.github.com/n0m4dz/77f08d3de1b9115e905c
//https://gist.github.com/ungoldman/7533774/revisions

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


function initialize() {
    if (localStorage.length === 0) {
        // fintsize
        localStorage.setItem('fontSizeInputValue', '1');
        localStorage.setItem('fontSizeInputUnits', 'rem');
        // font color
        localStorage.setItem('fontColorInput', '#000000');
        // font family
        localStorage.setItem('fontFamilyInput', '"Arial, Helvetica, sans-serif"');
        // btn font color
        localStorage.setItem('btnFontColor', '#000000');
        // word box border
        localStorage.setItem('wordBoxBorderValueInput', '1');
        localStorage.setItem('wordBoxBorderUnitInput', 'px');
        localStorage.setItem('wordBoxBorderStyleInput', 'solid');
        localStorage.setItem('wordBoxBorderColorInput', '#000000');
        // sentence box border
        localStorage.setItem('sentenceBoxBorderNumInput', '1');
        localStorage.setItem('sentenceBoxBorderUnitInput', 'px');
        localStorage.setItem('sentenceBoxBorderStyleInput', 'solid');
        localStorage.setItem('sentenceBoxBorderColorInput', '#000000');
        applyPreferences();
        pullSettings();
    } else {
        applyPreferences();
        pullSettings();
    }
}
