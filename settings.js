

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

function toggleBackgroundImageFunction() {

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
//let toggleBackgroundImageInput = document.querySelector('#toggle-background-img');
let toggleBackgroundImage = new Input('toggleBackgroundImage', '#toggle-background-img');

// background type selector
let backgroundTypeSelector = () => {
    for (elem of radioBtnCollection) {
        if (elem.checked) {
            return elem.id;
        }
    }
}

//background color plain
//let backgroundColorPlain = document.querySelector('#plain-color');
let backgroundColorPlain = new Input('backgroundColorPlain', '#plain-color');

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
//let backgroundColorUserGradient = document.querySelector('#background-user-gradient-select');
//let backgroundColorUserText = document.querySelector('#background-user-gradient-text');
let backgroundColorUserGradient = new Input('backgroundColorUserGradient', '#background-user-gradient-select');
let backgroundColorUserText = new Input('backgroundColorUserText', '#background-user-gradient-text');

let backgroundPrefs = [toggleBackgroundImage, backgroundColorPlain, backgroundColorUserGradient, backgroundColorUserText];

// font inputs
// fontsize
//let fontSizeValue = document.querySelector('#font-size');
//let fontSizeUnits = document.querySelector('#font-size-units');
let fontSizeValue = new Input('fontSizeValue', '#font-size');
let fontSizeUnits = new Input('fontSizeUnits', '#font-size-units');

//font weight
//let fontWeight = document.querySelector('#font-weight');
let fontWeight = new Input ('fontWeight', '#font-weight');

//set font color
//let fontColor = document.querySelector('#font-color');
let fontColor = new Input('fontColor', '#font-color');

// set font family
//let fontFamily = document.querySelector('#font-family')
let fontFamily = new Input('fontFamily', '#font-family');

// btn font color
//let btnFontColor = document.querySelector('#btn-font-color');
let btnFontColor = new Input('btnFontColor', '#btn-font-color');

let fontPrefs = [fontSizeValue, fontSizeUnits, fontWeight, fontColor, fontFamily, btnFontColor];

// sentence box border toggle
//let sentenceBoxBorderToggle = document.querySelector('#toggle-sentence-box-border');
let sentenceBoxBorderToggle = new Input('sentenceBoxBorderToggle', '#toggle-sentence-box-border');

// sentence box border
//let sentenceBoxBorderValue = document.querySelector('#sentence-border-thickness-number');
//let sentenceBoxBorderUnit = document.querySelector('#sentence-border-thickness-unit');
//let sentenceBoxBorderColor = document.querySelector('#sentence-border-color');
//let sentenceBoxBorderStyle = document.querySelector('#sentence-border-style');
let sentenceBoxBorderValue = new Input('sentenceBoxBorderValue', '#sentence-border-thickness-number');
let sentenceBoxBorderUnit = new Input('sentenceBoxBorderUnit', '#sentence-border-thickness-unit');
let sentenceBoxBorderColor = new Input('sentenceBoxBorderColor', '#sentence-border-color');
let sentenceBoxBorderStyle = new Input('sentenceBoxBorderStyle', '#sentence-border-style');


// ezt lehet, h dinamikusan kene hivni majd
let sentenceBoxCollection = document.getElementsByClassName('sentence-box');

let sentencePrefs = [sentenceBoxBorderToggle, sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle];

// word box border toggle
//let wordBoxBorderToggle = document.querySelector('#toggle-word-box-border');
let wordBoxBorderToggle = new Input('wordBoxBorderToggle', '#toggle-word-box-border');

// word box border
//let wordBoxBorderValue = document.querySelector('#word-border-thickness-number');
//let wordBoxBorderUnit = document.querySelector('#word-border-thickness-unit');
//let wordBoxBorderColor = document.querySelector('#word-border-color');
//let wordBoxBorderStyle = document.querySelector('#word-border-style');
let wordBoxBorderValue = new Input('wordBoxBorderValue', '#word-border-thickness-number');
let wordBoxBorderUnit = new Input('wordBoxBorderUnit', '#word-border-thickness-unit');
let wordBoxBorderColor = new Input('wordBoxBorderColor', '#word-border-color');
let wordBoxBorderStyle = new Input('wordBoxBorderStyle', '#word-border-style');

//word box background toggle
//let wordBoxBackgroundToggle = document.querySelector('#toggle-word-box-background');
//let wordBoxBackground = document.querySelector('#word-box-background-color');
let wordBoxBackgroundToggle = new Input('wordBoxBackgroundToggle', '#toggle-word-box-background');
let wordBoxBackground = new Input('wordBoxBackground', '#word-box-background-color');

//ezt is dinamikusan, de ha igen akkor applyban
let wordBoxCollection = document.getElementsByClassName('individual-word');

let wordBoxPrefs = [wordBoxBorderToggle, wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle, wordBoxBackgroundToggle, wordBoxBackground];

// ranking box toggle
//let rankingBoxToggle = document.querySelector('#toggle-ranking-box');
let rankingBoxToggle = new Input('rankingBoxToggle', '#toggle-ranking-box');

// ranking box border toggle
//let rankingBoxBorderToggle = document.querySelector('#toggle-ranking-box-border');
let rankingBoxBorderToggle = new Input('rankingBoxBorderToggle', '#toggle-ranking-box-border');

//ranking box border

//let rankingBoxBorderValue = document.querySelector('#ranking-border-thickness-number');
//let rankingBoxBorderUnit = document.querySelector('#ranking-border-thickness-unit');
//let rankingBoxBorderColor = document.querySelector('#ranking-border-color');
//let rankingBoxBorderStyle = document.querySelector('#ranking-border-style');
let rankingBoxBorderValue = new Input('rankingBoxBorderValue', '#ranking-border-thickness-number');
let rankingBoxBorderUnit = new Input('rankingBoxBorderUnit', '#ranking-border-thickness-unit');
let rankingBoxBorderColor = new Input('rankingBoxBorderColor', '#ranking-border-color');
let rankingBoxBorderStyle = new Input('rankingBoxBorderStyle', '#ranking-border-style');

let rankingBoxPrefs = [rankingBoxToggle, rankingBoxBorderToggle, rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle];

//dinamikusan
let rankingBoxCollection = document.querySelectorAll('.rank-box');

let settings = [backgroundPrefs, fontPrefs, sentencePrefs, wordBoxPrefs, rankingBoxPrefs].flat(Infinity);

// --------------------------- PUSH -------------------------------//

function pushSettings() {
    // nem megy, elóbb objektumot kell belőle csinálnom, utána tudom csak a nevét használni, meg obj.node-ba bele a query-t, aztán működni fog
    for (element of settings) {
        element.intoLS()
    }

    /*
    // BackgroundType
    localStorage.setItem('backgroundTypeSelector', backgroundTypeSelector())

    
    //background img
    localStorage.setItem('toggleBackgroundImage', toggleBackgroundImage.value);
    
    // background color plain
    localStorage.setItem('backgroundColorPlain', backgroundColorPlain.value);
    /*
    // background color linear
    localStorage.setItem('backgroundColorLinearDegree', backgroundColorLinearDegree.value);
    localStorage.setItem('backgroundColorLinearColor1', backgroundColorLinearColor1.value);
    localStorage.setItem('backgroundColorLinearPerc1', backgroundColorLinearPerc1.value);
    localStorage.setItem('backgroundColorLinearColor2', backgroundColorLinearColor2.value);
    localStorage.setItem('backgroundColorLinearPerc2', backgroundColorLinearPerc2.value);
    
    // background user gradient
    localStorage.setItem('backgroundColorUserGradient', backgroundColorUserGradient.value);
    localStorage.setItem('backgroundColorUserText', backgroundColorUserText.value);
    //fontsize
    localStorage.setItem('fontSizeValue', fontSizeValue.value);
    localStorage.setItem('fontSizeUnits', fontSizeUnits.value);
    // font weight
    localStorage.setItem('fontWeight', fontWeight.value);
    // font color
    localStorage.setItem('fontColor', fontColor.value);
    // font family
    localStorage.setItem('fontFamily', fontFamily.value);
    // btn font color
    localStorage.setItem('btnFontColor', btnFontColor.value);
    // sentence box toggle & border
    localStorage.setItem('sentenceBoxBorderToggle', sentenceBoxBorderToggle.value);
    localStorage.setItem('sentenceBoxBorderValue', sentenceBoxBorderValue.value);
    localStorage.setItem('sentenceBoxBorderUnit', sentenceBoxBorderUnit.value);
    localStorage.setItem('sentenceBoxBorderStyle', sentenceBoxBorderStyle.value);
    localStorage.setItem('sentenceBoxBorderColor', sentenceBoxBorderColor.value);
    // word box toggle & border
    localStorage.setItem('wordBoxBorderToggle', wordBoxBorderToggle.value);
    localStorage.setItem('wordBoxBorderValue', wordBoxBorderValue.value);
    localStorage.setItem('wordBoxBorderUnit', wordBoxBorderUnit.value);
    localStorage.setItem('wordBoxBorderStyle', wordBoxBorderStyle.value);
    localStorage.setItem('wordBoxBorderColor', wordBoxBorderColor.value);
    localStorage.setItem('wordBoxBackgroundToggle', wordBoxBackgroundToggle.value);
    localStorage.setItem('wordBoxBackground', wordBoxBackground.value);

    // rankings box toggle & border
    localStorage.setItem('rankingBoxToggle', rankingBoxToggle.value);
    localStorage.setItem('rankingBoxBorderToggle', rankingBoxBorderToggle.value);
    localStorage.setItem('rankingBoxBorderValue', rankingBoxBorderValue.value);
    localStorage.setItem('rankingBoxBorderUnit', rankingBoxBorderUnit.value);
    localStorage.setItem('rankingBoxBorderColor', rankingBoxBorderColor.value);
    localStorage.setItem('rankingBoxBorderStyle', rankingBoxBorderStyle.value);
    */
}

// ------------------------- APPLY -----------------------------//

function applyPreferences() {
    //background img
    toggleBackgroundImageFunction();
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
    mainWindow.style.fontSize = localStorage.getItem('fontSizeValue') + localStorage.getItem('fontSizeUnits');
    //font weight
    mainWindow.style.fontWeight = localStorage.getItem('fontWeight');
    //font color
    mainWindow.style.color = localStorage.getItem('fontColor');
    // set font family
    mainWindow.style.fontFamily = localStorage.getItem('fontFamily');
    // btn font color
    let previewBtn = document.querySelectorAll('.preview-btn');
    if (previewBtn.length > 0) {
        for (elem of previewBtn) {
            elem.style.color = localStorage.getItem('btnFontColor');
        }
    }

    //sentence box border ---- ez unit container - elvileg rendben, de csekkolni

    toggleBorder(sentenceBoxCollection, 'sentenceBoxBorderToggle', 'sentenceBoxBorderValue', 'sentenceBoxBorderUnit', 'sentenceBoxBorderStyle', 'sentenceBoxBorderColor');

    // word box border

    toggleBorder(wordBoxCollection, 'wordBoxBorderToggle', 'wordBoxBorderValue', 'wordBoxBorderUnit', 'wordBoxBorderStyle', 'wordBoxBorderColor');

    // word box highlight
    if (localStorage.getItem('wordBoxBackgroundToggle') === '1') {
        enableInput('toggle', wordBoxBackground);
        for (elem of wordBoxCollection) {
            elem.style.background = localStorage.getItem('wordBoxBackground')
        }
    } else {
        disableInput('toggle', wordBoxBackground);
        for (elem of wordBoxCollection) {
            elem.style.background = 'transparent';
        }
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

    toggleBorder(rankingBoxCollection, 'rankingBoxBorderToggle', 'rankingBoxBorderValue', 'rankingBoxBorderUnit', 'rankingBoxBorderStyle', 'rankingBoxBorderColor');
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

    for (element of settings) {
        setValue();
    }

    //background type
    //document.querySelector(`#${localStorage.getItem('backgroundTypeSelector')}`).checked = true;
    
    /*
    //background img
    toggleBackgroundImage.value = localStorage.getItem('toggleBackgroundImage');

    // background color plain
    backgroundColorPlain.value = localStorage.getItem('backgroundColorPlain');
    //background color linear
    /*
    backgroundColorLinearDegree.value = localStorage.getItem('backgroundColorLinearDegree');
    backgroundColorLinearColor1.value = localStorage.getItem('backgroundColorLinearColor1');
    backgroundColorLinearPerc1.value = localStorage.getItem('backgroundColorLinearPerc1');
    backgroundColorLinearColor2.value = localStorage.getItem('backgroundColorLinearColor2');
    backgroundColorLinearPerc2.value = localStorage.getItem('backgroundColorLinearPerc2');
    
    
    // backgrund color user
    backgroundColorUserGradient.value = localStorage.getItem('backgroundColorUserGradient');
    backgroundColorUserText.value = localStorage.getItem('backgroundColorUserText');
    //fontsize
    fontSizeValue.value = localStorage.getItem('fontSizeValue');
    fontSizeUnits.value = localStorage.getItem('fontSizeUnits');
    //font weight
    fontWeight.value = localStorage.getItem('fontWeight');
    //font color
    fontColor.value = localStorage.getItem('fontColor');
    // set font family
    fontFamily.value = localStorage.getItem('fontFamily');
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
    */
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
        case 'background-user-gradient':
            disableInput('toggle', backgroundColorPlain);
            enableInput('toggle', backgroundColorUserGradient, backgroundColorUserText);
            break;

        case 'toggle-sentence-box-border':
            if (sentenceBoxBorderToggle.value === '0') {
                disableInput(sentenceBoxBorderToggle, sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle);
            } else {
                enableInput(sentenceBoxBorderToggle, sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle);
            }
            break;

        case 'toggle-word-box-border':
            if (wordBoxBorderToggle.value === '0') {
                disableInput(wordBoxBorderToggle, wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle);
            } else {
                enableInput(wordBoxBorderToggle, wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle);
            }
            break;
        
        case 'toggle-word-box-background':
            if (wordBoxBackgroundToggle.value === '0') {
                disableInput('toggle', wordBoxBackground);
            } else {
                enableInput('toggle', wordBoxBackground);
            }

        case 'toggle-ranking-box-border':
            if (rankingBoxBorderToggle.value === '0') {
                disableInput(rankingBoxBorderToggle, rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle);
            } else {
                enableInput(rankingBoxBorderToggle, rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle);
            }
            break;
    }
});

// save pref

function disableInput(toggle, ...args) {
    //toggle.value = '0';
    for (arg of args) {
        arg.node.setAttribute('disabled', true);
    }
}

function enableInput(toggle, ...args) {
    //toggle.value = '1';
    for (arg of args) {
        arg.node.removeAttribute('disabled');
    }
}

function disableInputOnStart() {
    if (localStorage.getItem('sentenceBoxBorderToggle') === '0') {
        disableInput(sentenceBoxBorderToggle, sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle);
    }
    if (localStorage.getItem('wordBoxBorderToggle') === '0') {
        disableInput(wordBoxBorderToggle, wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle);
    }
    if (localStorage.getItem('rankingBoxToggle') === '0' || localStorage.getItem('rankingBoxBorderToggle') === '0') {
        disableInput(rankingBoxBorderToggle, rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle);
    }
}

let savePreferences = document.querySelector('#save-preferences');

savePreferences.addEventListener('click', (e) => {
    localStorage.clear();
    pushSettings(settings);
    
    saveButtons();
    loadButtons();
    pullSettings(settings);
    applyPreferences();
});
