

// ----------------------- BALOLDAL -----------------------//

//setup for btn-s

let previewBtnSection = document.querySelector('.preview-btn-section');
let btnColorSection = document.querySelector('.color-btn-section');
let btnTextSection = document.querySelector('.text-btn-section');
let removeBtnSection = document.querySelector('.remove-btn-section');

// btn hozzaadas

let addNewBtnBtn = document.getElementById('add-new-btn');
let lineNumber = 1;

addNewBtnBtn.addEventListener('click', e => {
    createPreviewBtn(lineNumber);
    lineNumber++;
});

function createPreviewBtn(idNum, text = 'Preview', color = '#ffffff') {
    let newBtn = document.createElement('button');
    let newColorSelector = document.createElement('input');
    let setNewBtnText = document.createElement('input');
    let removeBtn = document.createElement('button');
    //add input & select attributes later
    //add class later
    newBtn.setAttribute('id', `button-${idNum}`);
    newBtn.setAttribute('class', 'preview-btn');
    previewBtnSection.insertBefore(newBtn, addNewBtnBtn);
    newBtn.innerText = text;
    newBtn.style.background = color;

    btnColorSection.append(newColorSelector);
    newColorSelector.setAttribute('id', `color-selector-${idNum}`);
    //color pickernek inkabb colorpickert
    //newColorSelector.innerHTML = ColorSelectorTemplate;
    newColorSelector.setAttribute('type', 'color');
    newColorSelector.setAttribute('value', color);

    btnTextSection.append(setNewBtnText);
    setNewBtnText.setAttribute('id', `text-input-${idNum}`);

    removeBtnSection.append(removeBtn);
    removeBtn.setAttribute('id', `remove-button-${idNum}`);
    removeBtn.setAttribute('class', 'removeBtn');
    removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
}

function getIdNum(id) {
    return idNumber = parseInt((id.replace(/[^\d]/g, '')));
}

// btn text/color update

btnColorSection.addEventListener('input', e => {
    getIdNum(e.target.id);
    let newBtn = document.querySelector(`#button-${idNumber}`)
    newBtn.style.background = e.target.value;
});

btnTextSection.addEventListener('keyup', e => {
    getIdNum(e.target.id);
    let newBtn = document.querySelector(`#button-${idNumber}`);
    if (e.target.value !== '') {
        newBtn.innerText = e.target.value;
    } else {
        newBtn.innerText = 'Preview';
    }
});

// btn remove

removeBtnSection.addEventListener('click', e => {
    if (e.target.classList.contains('removeBtn')) {
        getIdNum(e.target.id);
        document.getElementById(`button-${idNumber}`).remove();
        document.getElementById(`color-selector-${idNumber}`).remove();
        document.getElementById(`text-input-${idNumber}`).remove();
        document.getElementById(`remove-button-${idNumber}`).remove();
    }
});

// gombok mentese

function saveButtons() {
    let collection = document.querySelectorAll('.preview-btn');
    collection.forEach(element => {
        if (element.style.background === '') {
            element.style.background = '#ffffff';
        }
        localStorage.setItem(element.id, JSON.stringify({
            text: element.innerText,
            color: element.style.background
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

function findLocalItems(query) {
    var i, results = [];
    for (i in localStorage) {
        if (localStorage.hasOwnProperty(i)) {
            if (i.match(query) || (!query && typeof i === 'string')) {
                value = JSON.parse(localStorage.getItem(i));
                results.push({ key: i, val: value });
            }
        }
    }
    return results;
}

// compare a gombok sortjahoz

function compare(a, b) {
    if (a.key < b.key) {
        return -1;
    }
    if (a.key > b.key) {
        return 1;
    }
    return 0;
}

// szinalakito rgb -> hex

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

//localstoregaebol feltolti a savot

function fillPreviewBtns() {
    for (elem of sortedButtonArray) {
        let rgb = elem.val.color.slice(4, -1).split(',');
        let r = parseInt(rgb[0]);
        let g = parseInt(rgb[1]);
        let b = parseInt(rgb[2]);
        let colorHex = rgbToHex(r, g, b);
        createPreviewBtn(getIdNum(elem.key), elem.val.text, colorHex);
    }
    return lineNumber = sortedButtonArray.length + 1;
}


// ---------------------- JOBBOLDAL (PREFERENCES) --------------------------- //



let settingsRightColumn = document.querySelector('.column-right');

// toggle background image
//EZT MEG NEM MENTI LOCALBA!

let backgroundImg = localStorage.getItem('backgroundImg');
let radioBtnCollection = document.querySelectorAll('.background-radio');

//localStorage.setItem('backgroundImg', toggleBackgroundImageInput.value);
let body = document.querySelector('body');

function toggleBackgroundImage() {

    if (localStorage.getItem('toggleBackgroundImageInput') === '1') {
        body.style.backgroundImage = 'url("img/parchment.jpeg")';
    } else {
        body.style.backgroundImage = 'none';
        switch (localStorage.getItem('backgroundTypeSelector')) {
            case ('background-plain'):
                body.style.background = localStorage.getItem('backgroundColorPlain');
                break;
            /*case ('background-linear-gradient'):
                console.log('poop')
                body.style.background = `linear-gradient(${localStorage.getItem('backgroundColorLinearDegree')}deg, ${localStorage.getItem('backgroundColorLinearColor1')} ${localStorage.getItem('backgroundColorLinearPerc1')}%, ${localStorage.getItem('backgroundColorLinearColor2')} ${localStorage.getItem('backgroundColorLinearPerc2')}%)`;
                break;
            case ('background-radial-gradient'):
                console.log('poop2')
                break;*/
            case ('background-user-gradient'):
                console.log('poop')
                body.style.background = `${localStorage.getItem('backgroundColorUserGradient')}(${localStorage.getItem('backgroundColorUserText')})`;
                break;
        }
    }
}

// theme selector
let themeSelector = document.querySelector('.theme-selector');

// main
let mainWindow = document.querySelector('.main');

// background img
let toggleBackgroundImageInput = document.querySelector('#toggle-background-img');

// background type selector
let backgroundTypeSelector = () => {
    for (elem of radioBtnCollection) {
        if (elem.checked) {
            return elem.id;
        }
    }
}

//background color plain
let backgroundColorPlain = document.querySelector('#plain-color');

/*
// background color linear
let backgroundColorLinearDegree = document.querySelector('#linear-degree');
let backgroundColorLinearColor1 = document.querySelector('#linear-color-1');
let backgroundColorLinearPerc1 = document.querySelector('#linear-perc-1');
let backgroundColorLinearColor2 = document.querySelector('#linear-color-2');
let backgroundColorLinearPerc2 = document.querySelector('#linear-perc-2');

//backgorund color radial
let backgroundColorRadial = document.querySelector('#radial-degree');
*/


//background user grandient
let backgroundColorUserGradient = document.querySelector('#background-user-gradient-select');
let backgroundColorUserText = document.querySelector('#background-user-gradient-text');

// font inputs
// fontsize
let fontSizeInput = document.querySelector('#font-size');
let fontSizeInputUnits = document.querySelector('#font-size-units');
//font weight
let fontWeight = document.querySelector('#font-weight');
//set font color
let fontColor = document.querySelector('#font-color');
// set font family
let fontFamily = document.querySelector('#font-family')
// btn font color
let btnFontColor = document.querySelector('#btn-font-color');

let fontPrefs = [fontSizeInput, fontSizeInputUnits, fontWeight, fontColor, fontFamily, btnFontColor];

// sentence box border toggle
let sentenceBoxBorderToggle = document.querySelector('#toggle-sentence-box-border');

// sentence box border
let sentenceBoxBorderValue = document.querySelector('#sentence-border-thickness-number');
let sentenceBoxBorderUnit = document.querySelector('#sentence-border-thickness-unit');
let sentenceBoxBorderColor = document.querySelector('#sentence-border-color');
let sentenceBoxBorderStyle = document.querySelector('#sentence-border-style');

// ezt lehet, h dinamikusan kene hivni majd
let sentenceBoxCollection = document.getElementsByClassName('sentence-box');

let sentencePrefs = [sentenceBoxBorderToggle, sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle];

// word box border toggle
let wordBoxBorderToggle = document.querySelector('#toggle-word-box-border');
// word box border
let wordBoxBorderValue = document.querySelector('#word-border-thickness-number');
let wordBoxBorderUnit = document.querySelector('#word-border-thickness-unit');
let wordBoxBorderColor = document.querySelector('#word-border-color');
let wordBoxBorderStyle = document.querySelector('#word-border-style');
//word box background toggle
let wordBoxBackgroundToggle = document.querySelector('#toggle-word-box-background');
let wordBoxBackground = document.querySelector('#word-box-background-color');

//ezt is dinamikusan
let wordBoxCollection = document.getElementsByClassName('individual-word');

let wordBoxPrefs = [wordBoxBorderToggle, wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle, wordBoxBackgroundToggle, wordBoxBackground];

// ranking box toggle
let rankingBoxToggle = document.querySelector('#toggle-ranking-box');

// ranking box border toggle
let rankingBoxBorderToggle = document.querySelector('#toggle-ranking-box-border');

//ranking box border

let rankingBoxBorderValue = document.querySelector('#ranking-border-thickness-number');
let rankingBoxBorderUnit = document.querySelector('#ranking-border-thickness-unit');
let rankingBoxBorderColor = document.querySelector('#ranking-border-color');
let rankingBoxBorderStyle = document.querySelector('#ranking-border-style');

let rankingBoxPrefs = [rankingBoxToggle, rankingBoxBorderToggle, rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle];

//dinamikusan
let rankingBoxCollection = document.querySelectorAll('.rank-box');

let settings = [fontPrefs, sentencePrefs, wordBoxPrefs, rankingBoxPrefs].flat(Infinity);

// --------------------------- PUSH -------------------------------//

function pushSettings() {
    // nem megy, elóbb objektumot kell belőle csinálnom, utána tudom csak a nevét használni, meg obj.node-ba bele a query-t, aztán működni fog
    /*for (element of settings) {
        localStorage.setItem(element.toString(), element.value); 
    }*/

    // BackgroundType
    localStorage.setItem('backgroundTypeSelector', backgroundTypeSelector())

    
    //background img
    localStorage.setItem('toggleBackgroundImageInput', toggleBackgroundImageInput.value);
    
    // background color plain
    localStorage.setItem('backgroundColorPlain', backgroundColorPlain.value);
    /*
    // background color linear
    localStorage.setItem('backgroundColorLinearDegree', backgroundColorLinearDegree.value);
    localStorage.setItem('backgroundColorLinearColor1', backgroundColorLinearColor1.value);
    localStorage.setItem('backgroundColorLinearPerc1', backgroundColorLinearPerc1.value);
    localStorage.setItem('backgroundColorLinearColor2', backgroundColorLinearColor2.value);
    localStorage.setItem('backgroundColorLinearPerc2', backgroundColorLinearPerc2.value);
    */
    // background user gradient
    localStorage.setItem('backgroundColorUserGradient', backgroundColorUserGradient.value);
    localStorage.setItem('backgroundColorUserText', backgroundColorUserText.value);
    //fontsize
    localStorage.setItem('fontSizeInputValue', fontSizeInput.value);
    localStorage.setItem('fontSizeInputUnits', fontSizeInputUnits.value);
    // font weight
    localStorage.setItem('fontWeight', fontWeight.value);
    // font color
    localStorage.setItem('fontColorInput', setFontColorInput.value);
    // font family
    localStorage.setItem('fontFamilyInput', setFontFamilyInput.value);
    // btn font color
    localStorage.setItem('btnFontColor', setBtnFontColorInput.value);
    // sentence box toggle & border
    localStorage.setItem('sentenceBoxBorderToggle', sentenceBoxBorderToggle.value);
    localStorage.setItem('sentenceBoxBorderValueInput', setSentenceBoxBorderValueInput.value);
    localStorage.setItem('sentenceBoxBorderUnitInput', setSentenceBoxBorderUnitInput.value);
    localStorage.setItem('sentenceBoxBorderStyleInput', setSentenceBoxBorderStyleInput.value);
    localStorage.setItem('sentenceBoxBorderColorInput', setSentenceBoxBorderColorInput.value);
    // word box toggle & border
    localStorage.setItem('wordBoxBorderToggle', wordBoxBorderToggle.value);
    localStorage.setItem('wordBoxBorderValueInput', setWordBoxBorderValueInput.value);
    localStorage.setItem('wordBoxBorderUnitInput', setWordBoxBorderUnitInput.value);
    localStorage.setItem('wordBoxBorderStyleInput', setWordBoxBorderStyleInput.value);
    localStorage.setItem('wordBoxBorderColorInput', setWordBoxBorderColorInput.value);
    localStorage.setItem('wordBoxBackgroundToggle', wordBoxBackgroundToggle.value);
    localStorage.setItem('wordBoxBackground', wordBoxBackground.value);

    // rankings box toggle & border
    localStorage.setItem('rankingBoxToggle', rankingBoxToggle.value);
    localStorage.setItem('rankingBoxBorderToggle', rankingBoxBorderToggle.value);
    localStorage.setItem('rankingBoxBorderValueInput', rankingBoxBorderValueInput.value);
    localStorage.setItem('rankingBoxBorderUnitInput', rankingBoxBorderUnitInput.value);
    localStorage.setItem('rankingBoxBorderColorInput', rankingBoxBorderColorInput.value);
    localStorage.setItem('rankingBoxBorderStyleInput', rankingBoxBorderStyleInput.value);
    
}

// ------------------------- APPLY -----------------------------//

function applyPreferences() {
    //background img
    toggleBackgroundImage();
    //ide egy if, h melyik volt chekkolva
    //background color plain
    //body.style.background = localStorage.getItem('backgroundColorPlain');
    // background color linear
    switch (localStorage.getItem('backgroundTypeSelector')) {
        case 'background-plain':
            disableInput('toggle', backgroundColorUserGradient, backgroundColorUserText);
            enableInput('toggle', backgroundColorPlain);
            break;
        /*
        case 'background-linear-gradient':
            disableInput('toggle', backgroundColorPlain, backgroundColorRadial);
            enableInput ('toggle', backgroundColorLinearDegree, backgroundColorLinearColor1, backgroundColorLinearPerc1, backgroundColorLinearColor2, backgroundColorLinearPerc2);
            break;
    
        case 'background-radial-gradient':
            disableInput('toggle', backgroundColorPlain, backgroundColorLinearDegree, backgroundColorLinearColor1, backgroundColorLinearPerc1, backgroundColorLinearColor2, backgroundColorLinearPerc2);
            enableInput ('toggle', backgroundColorRadial);
            break;
        */
        case 'background-user-gradient':
            disableInput('toggle', backgroundColorPlain);
            enableInput('toggle', backgroundColorUserGradient, backgroundColorUserText);
            break;
    }

    //fontsize
    mainWindow.style.fontSize = localStorage.getItem('fontSizeInputValue') + localStorage.getItem('fontSizeInputUnits');
    //font weight
    mainWindow.style.fontWeight = localStorage.getItem('fontWeight');
    //font color
    mainWindow.style.color = localStorage.getItem('fontColorInput');
    // set font family
    mainWindow.style.fontFamily = localStorage.getItem('fontFamilyInput');
    // btn font color
    buttonContainer.style.color = localStorage.getItem('btnFontColor');

    //sentence box border ---- ez unit container - elvileg rendben, de csekkolni

    toggleBorder(sentenceBoxCollection, 'sentenceBoxBorderToggle', 'sentenceBoxBorderValueInput', 'sentenceBoxBorderUnitInput', 'sentenceBoxBorderStyleInput', 'sentenceBoxBorderColorInput');

    // word box border

    toggleBorder(wordBoxCollection, 'wordBoxBorderToggle', 'wordBoxBorderValueInput', 'wordBoxBorderUnitInput', 'wordBoxBorderStyleInput', 'wordBoxBorderColorInput');

    // word box highlight
    if (localStorage.getItem('wordBoxBackgroundToggle') === '1') {
        enableInput('toggle', wordBoxBackground)
    } else {
        disableInput('toggle', wordBoxBackground)
    }

    //toggle ranking box EZ ITT NEM JO

    rankingBoxCollection = document.querySelectorAll('.rank-box');

    if (rankingBoxCollection.length > 0 && localStorage.getItem('rankingBoxToggle') === '1') {

        /*let counter = 1;
        let sentenceDivCollection = document.querySelectorAll('.input-unit-container')
        for (element of sentenceDivCollection) {
            let rankDiv = document.createElement('div');
            element.prepend(rankDiv);
            rankDiv.setAttribute('class', 'rank-box');

            let upperRankDiv = document.createElement('div');
            rankDiv.append(upperRankDiv);
            upperRankDiv.innerText = counter;
            let arrow = document.createElement('div');
            rankDiv.append(arrow);
            arrow.innerText = '->'
            let lowerRankDiv = document.createElement('div');
            rankDiv.append(lowerRankDiv);
            lowerRankDiv.innerText = 'Later'
            counter++;
        }*/

        // document.querySelectorAll('.rank-box').classList.remove('hidden');

        for (element of rankingBoxCollection) {
            element.classList.remove('hidden');
        }

    } else if (rankingBoxCollection.length > 0 && localStorage.getItem('rankingBoxToggle') === '0') {
        for (element of rankingBoxCollection) {
            element.classList.add('hidden');
        }
        /*for (e of document.querySelectorAll('.rank-box')) {e.remove()}*/
    }

    // ranking box border

    toggleBorder(rankingBoxCollection, 'rankingBoxBorderToggle', 'rankingBoxBorderValueInput', 'rankingBoxBorderUnitInput', 'rankingBoxBorderStyleInput', 'rankingBoxBorderColorInput');
}

function toggleBorder(collection, toggleValue, borderValue, borderUnit, color, style) {
    if (collection.length > 0 && localStorage.getItem(toggleValue) === '1') {
        for (element of collection) {
            element.style.border = `${localStorage.getItem(borderValue)}${localStorage.getItem(borderUnit)} ${localStorage.getItem(color)} ${localStorage.getItem(style)}`;
        }
    } else if (localStorage.getItem(toggleValue) === '0') {
        for (element of collection) {
            element.style.border = '0px';
        }
    }
}

// ------------------------ PULL ----------------------------//

function pullSettings() {

    /*for (elem of Object.keys(localStorage)) {
        //document.querySelector(`#${elem}`)
        elem.value = localStorage.getItem('elem'); 
        console.log(elem)
    }*/

    /*for (elem of settings) {
        elem.value = localStorage.getItem('elem');
    }*/

    //background type
    document.querySelector(`#${localStorage.getItem('backgroundTypeSelector')}`).checked = true;
    
    
    //background img
    toggleBackgroundImageInput.value = localStorage.getItem('toggleBackgroundImageInput');

    // background color plain
    backgroundColorPlain.value = localStorage.getItem('backgroundColorPlain');
    //background color linear
    /*
    backgroundColorLinearDegree.value = localStorage.getItem('backgroundColorLinearDegree');
    backgroundColorLinearColor1.value = localStorage.getItem('backgroundColorLinearColor1');
    backgroundColorLinearPerc1.value = localStorage.getItem('backgroundColorLinearPerc1');
    backgroundColorLinearColor2.value = localStorage.getItem('backgroundColorLinearColor2');
    backgroundColorLinearPerc2.value = localStorage.getItem('backgroundColorLinearPerc2');
    */
    
    // backgrund color user
    backgroundColorUserGradient.value = localStorage.getItem('backgroundColorUserGradient');
    backgroundColorUserText.value = localStorage.getItem('backgroundColorUserText');
    //fontsize
    fontSizeInput.value = localStorage.getItem('fontSizeInputValue');
    fontSizeInputUnits.value = localStorage.getItem('fontSizeInputUnits');
    //font weight
    fontWeight.value = localStorage.getItem('fontWeight');
    //font color
    fontColor.value = localStorage.getItem('fontColorInput');
    // set font family
    fontFamily.value = localStorage.getItem('fontFamilyInput');
    // btn font color
    btnFontColor.value = localStorage.getItem('btnFontColor');
    // word box border toggle
    wordBoxBorderToggle.value = localStorage.getItem('wordBoxBorderToggle');
    //sentence box toggle & border
    sentenceBoxBorderToggle.value = localStorage.getItem('sentenceBoxBorderToggle');
    sentenceBoxBorderValue.value = localStorage.getItem('sentenceBoxBorderValue');
    sentenceBoxBorderUnit.value = localStorage.getItem('sentenceBoxBorderUnit');
    sentenceBoxBorderStyle.value = localStorage.getItem('sentenceBoxBorderStyle');
    sentenceBoxBorderColor.value = localStorage.getItem('sentenceBoxBorderColor');
    // word box toggle & border
    wordBoxBorderToggle.value = localStorage.getItem('wordBoxBorderToggle');
    wordBoxBorderValue.value = localStorage.getItem('wordBoxBorderValue');
    wordBoxBorderUnit.value = localStorage.getItem('wordBoxBorderUnit');
    wordBoxBorderStyle.value = localStorage.getItem('wordBoxBorderStyle');
    wordBoxBorderColor.value = localStorage.getItem('wordBoxBorderColor');
    wordBoxBackgroundToggle.value = localStorage.getItem('wordBoxBackgroundToggle');
    wordBoxBackground.value = localStorage.getItem('wordBoxBackground');
    // rankings box toggle & border
    rankingBoxToggle.value = localStorage.getItem('rankingBoxToggle');
    rankingBoxBorderToggle.value = localStorage.getItem('rankingBoxBorderToggle');
    rankingBoxBorderValue.value = localStorage.getItem('rankingBoxBorderValue');
    rankingBoxBorderUnit.value = localStorage.getItem('rankingBoxBorderUnit');
    rankingBoxBorderColor.value = localStorage.getItem('rankingBoxBorderColor');
    rankingBoxBorderStyle.value = localStorage.getItem('rankingBoxBorderStyle');  
}

// btn font color live preview
//ez rosszul van bekotve

/*setFontColorInput.addEventListener('change', e => {
    btnColorSection.children.style.color = e.target.value;
});*/

settingsRightColumn.addEventListener('click', e => {
    console.log(e.target.id)
    switch (e.target.id) {
        case 'toggle-background-img-label':
            if (toggleBackgroundImageInput.value === '0') {
                toggleBackgroundImageInput.value = '1';
            } else {
                toggleBackgroundImageInput.value = '0';
            }
            break;

        case 'background-plain':
            disableInput('toggle', backgroundColorUserGradient, backgroundColorUserText);
            enableInput('toggle', backgroundColorPlain);
            break;
        /*
        case 'background-linear-gradient':
            disableInput('toggle', backgroundColorPlain, backgroundColorRadial);
            enableInput ('toggle', backgroundColorLinearDegree, backgroundColorLinearColor1, backgroundColorLinearPerc1, backgroundColorLinearColor2, backgroundColorLinearPerc2);
            break;
    
        case 'background-radial-gradient':
            disableInput('toggle', backgroundColorPlain, backgroundColorLinearDegree, backgroundColorLinearColor1, backgroundColorLinearPerc1, backgroundColorLinearColor2, backgroundColorLinearPerc2);
            enableInput ('toggle', backgroundColorRadial);
            break;
        */
        case 'background-radial-gradient':
            disableInput('toggle', backgroundColorPlain);
            enableInput('toggle', backgroundColorUserGradient, backgroundColorUserText);
            break;

        case 'toggle-sentence-box-border':
            if (sentenceBoxBorderToggle.value === '0') {
                disableInput(sentenceBoxBorderToggle, setSentenceBoxBorderValueInput, setSentenceBoxBorderUnitInput, setSentenceBoxBorderColorInput, setSentenceBoxBorderStyleInput);
            } else {
                enableInput(sentenceBoxBorderToggle, setSentenceBoxBorderValueInput, setSentenceBoxBorderUnitInput, setSentenceBoxBorderColorInput, setSentenceBoxBorderStyleInput);
            }
            break;

        case 'toggle-word-box-border':
            if (wordBoxBorderToggle.value === '0') {
                disableInput(wordBoxBorderToggle, setWordBoxBorderValueInput, setWordBoxBorderUnitInput, setWordBoxBorderColorInput, setWordBoxBorderStyleInput);
            } else {
                enableInput(wordBoxBorderToggle, setWordBoxBorderValueInput, setWordBoxBorderUnitInput, setWordBoxBorderColorInput, setWordBoxBorderStyleInput);
            }
            break;

        case 'toggle-ranking-box-border':
            if (rankingBoxBorderToggle.value === '0') {
                disableInput(rankingBoxBorderToggle, rankingBoxBorderValueInput, rankingBoxBorderUnitInput, rankingBoxBorderColorInput, rankingBoxBorderStyleInput);
            } else {
                enableInput(rankingBoxBorderToggle, rankingBoxBorderValueInput, rankingBoxBorderUnitInput, rankingBoxBorderColorInput, rankingBoxBorderStyleInput);
            }
            break;
    }
});

// save pref

function disableInput(toggle, ...args) {
    //toggle.value = '0';
    for (arg of args) {
        arg.setAttribute('disabled', true);
    }
}

function enableInput(toggle, ...args) {
    //toggle.value = '1';
    for (arg of args) {
        arg.removeAttribute('disabled');
    }
}

function disableInputOnStart() {
    if (localStorage.getItem('sentenceBoxBorderToggle') === '0') {
        disableInput(sentenceBoxBorderToggle, setSentenceBoxBorderValueInput, setSentenceBoxBorderUnitInput, setSentenceBoxBorderColorInput, setSentenceBoxBorderStyleInput);
    }
    if (localStorage.getItem('wordBoxBorderToggle') === '0') {
        disableInput(wordBoxBorderToggle, setWordBoxBorderValueInput, setWordBoxBorderUnitInput, setWordBoxBorderColorInput, setWordBoxBorderStyleInput);
    }
    if (localStorage.getItem('rankingBoxToggle') === '0' || localStorage.getItem('rankingBoxBorderToggle') === '0') {
        disableInput(rankingBoxBorderToggle, rankingBoxBorderValueInput, rankingBoxBorderUnitInput, rankingBoxBorderColorInput, rankingBoxBorderStyleInput);
    }
}

let savePreferences = document.querySelector('#save-preferences');

savePreferences.addEventListener('click', (e) => {
    localStorage.clear();
    pushSettings(settings);
    applyPreferences();
    saveButtons();
    loadButtons();
    pullSettings(settings);
});
