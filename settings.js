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
                settingsWindow.classList.add('hidden');
                inputWindow.classList.remove('hidden');
            } else {
                inputWindow.classList.add('hidden');
            }
            break;
        case toggleSettingsBtn:
            if (settingsWindow.classList.contains('hidden')) {
                inputWindow.classList.add('hidden');
                helpWindow.classList.add('hidden');
                settingsWindow.classList.remove('hidden');
            } else {
                settingsWindow.classList.add('hidden');
            }
            break;
        case toggleHelpBtn:
            if (helpWindow.classList.contains('hidden')){
                inputWindow.classList.add('hidden');
                settingsWindow.classList.add('hidden');
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

// main
let mainWindow = document.querySelector('.main');

function pushSettings() {

}

//ez mar letezik!!!
function applyPreferences() {

}

function pullSettings() {
    
}

// toggle background image

let backgroundImg = localStorage.getItem('backgroundImg');

localStorage.setItem('backgroundImg', toggleBackgroundImageInput.value);

function toggleBackgroundImage(status) {
    let body = document.querySelector('body')
    if(status === '1') {
       return body.style.backgroundImage = 'url("img/parchment.jpeg")';
    } else {
        return body.style.backgroundImage = 'none';
    }
}



let toggleBackgroundImageInput = document.querySelector('#toggle-background-img');

// fontsize

let fontSizeInput = document.querySelector('#font-size');
let fontSizeInputUnits = document.querySelector('#font-size-units');

function pushFontSize() {
    localStorage.setItem('fontSizeInputValue', fontSizeInput.value);
    localStorage.setItem('fontSizeInputUnits', fontSizeInputUnits.value);
}

function setFontSize() {
    mainWindow.style.fontSize = localStorage.getItem('fontSizeInputValue') + localStorage.getItem('fontSizeInputUnits');
}

function pullFontSize() {
    fontSizeInput.value = localStorage.getItem('fontSizeInputValue');
    fontSizeInputUnits.value = localStorage.getItem('fontSizeInputUnits');
}


//set font color

let setFontColorInput = document.querySelector('#font-color');

function pushFontColor() {
    localStorage.setItem('fontColorInput', setFontColorInput.value);
}

function setFontColor() {
    mainWindow.style.color = localStorage.getItem('fontColorInput');
}

function pullFontColor() {
    setFontColorInput.value = localStorage.getItem('fontColorInput');
}


// set font family

let setFontFamilyInput = document.querySelector('#font-family');

function pushFontFamily() {
    localStorage.setItem('fontFamilyInput', setFontFamilyInput.value)
}

function setFontFamily() {
    mainWindow.style.fontFamily = localStorage.getItem('fontFamilyInput');
}

function pullFontFamily() {
    setFontFamilyInput.value = localStorage.getItem('fontFamilyInput')
}

// btn font color

let setBtnFontColorInput = document.querySelector('#btn-font-color');

function pushBtnFontColor() {
    localStorage.setItem('btnFontColor', setBtnFontColorInput.value);
}

function setBtnFontColor() {
    buttonContainer.style.color = localStorage.getItem('btnFontColor');
}

function pullBtnFontColor() {
    setBtnFontColorInput.value = localStorage.getItem('btnFontColor');
}

// btn font color live preview

setFontColorInput.addEventListener('change', e => {
    btnColorSection.children.style.color = e.target.value;
});

// word box border // ezt csekkolni

let wordBoxBorder = document.querySelectorAll('individual-word');
let setWordBoxBorderNumInput = document.querySelector('#word-border-thickness-number');
let setWordBoxBorderUnitInput = document.querySelector('#word-border-thickness-unit');
let setWordBoxBorderStyleInput = document.querySelector('#word-border-color');
let setWordBoxBorderColorInput = document.querySelector('#word-border-style');

/* width | style | color */

function  pushWordBoxBorder() {
    localStorage.setItem('wordBoxBorderValueInput', setWordBoxBorderNumInput.value);
    localStorage.setItem('WordBoxBorderUnitInput', setWordBoxBorderUnitInput.value);
    localStorage.setItem('WordBoxBorderStyleInput', setWordBoxBorderStyleInput.value);
    localStorage.setItem('WordBoxBorderColorInput', setWordBoxBorderColorInput.value);
}

function setWordBoxBorder() {
    WordBoxBorder.style.border = localStorage.getItem('wordBoxBorder') + localStorage.getItem('WordBoxBorderUnitInput') + ' ' + localStorage.getItem('WordBoxBorderStyleInput') + ' ' + localStorage.getItem('WordBoxBorderColorInput');
}

function pullWordBoxBorder() {
    setWordBoxBorderNumInput.value = localStorage.getItem('wordBoxBorderValueInput');
    setWordBoxBorderUnitInput.value = localStorage.getItem('WordBoxBorderUnitInput');
    setWordBoxBorderStyleInput.value = localStorage.getItem('WordBoxBorderStyleInput');
    setWordBoxBorderColorInput.value = localStorage.getItem('WordBoxBorderColorInput');
}

// sentence box border

let sentenceBox = document.querySelectorAll('.sentence-box')

let setSentenceBoxBorderNumInput = document.querySelector('#sentence-border-thickness-number').value;
let setSentenceBoxBorderUnitInput = document.querySelector('#sentence-border-thickness-unit').value;
let setSentenceBoxBorderStyleInput = document.querySelector('#sentence-border-color').value;
let setSentenceBoxBorderColorInput = document.querySelector('#sentence-border-style').value;

function pushSentenceBoxBorder() {
    localStorage.setItem('setSentenceBoxBorderNumInput', setSentenceBoxBorderNumInput);
    localStorage.setItem('setSentenceBoxBorderUnitInput', setSentenceBoxBorderUnitInput);
    localStorage.setItem('setSentenceBoxBorderStyleInput', setSentenceBoxBorderStyleInput);
    localStorage.setItem('setSentenceBoxBorderColorInput', setSentenceBoxBorderColorInput);
}

function setSentenceBoxBorder() {
    SentenceBoxBorderStyle = `${localStorage.getItem('setSentenceBoxBorderNumInput')}${localStorage.getItem('setSentenceBoxBorderUnitInput')} ${localStorage.getItem('setSentenceBoxBorderStyleInput')} ${localStorage.getItem('setSentenceBoxBorderColorInput')}`
}

function pullSentenceBoxBorder() {
    setSentenceBoxBorderNumInput = localStorage.getItem('setSentenceBoxBorderNumInput');
    setSentenceBoxBorderUnitInput = localStorage.getItem('setSentenceBoxBorderUnitInput');
    setSentenceBoxBorderStyleInput = localStorage.getItem('setSentenceBoxBorderStyleInput');
    setSentenceBoxBorderColorInput = localStorage.getItem('setSentenceBoxBorderColorInput');   
}

// save pref

let savePreferences = document.querySelector('#save-preferences');

savePreferences.addEventListener('click', (e) => {
    localStorage.clear();

    //localStorage.setItem()
    //localStorage.setItem('', '');
    
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


function initialize() {
    if (localStorage.length === 0) {
        localStorage.setItem('fontSizeInputValue', '5');
        localStorage.setItem('fontSizeInputUnits', 'em');
        pullFontSize();
        setFontSize();
    } else {
        pullFontSize();
        setFontSize();
    }
}
