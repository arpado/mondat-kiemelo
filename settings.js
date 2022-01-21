

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

            case ('background-user-gradient'):
                console.log('poop')
                body.style.background = `${localStorage.getItem('backgroundColorUserGradient')}(${localStorage.getItem('backgroundColorUserText')})`;
                break;
        }
    }
}

// background type selector
let backgroundTypeSelector = () => {
    for (elem of radioBtnCollection) {
        if (elem.checked) {
            return elem.id;
        }
    }
}

// theme selector
let themeSelector = document.querySelector('.theme-selector');

// main
let mainWindow = document.querySelector('.main');

// --------------------------- INPUT FIELDS ------------------------------//

// background inputs
// background img
let toggleBackgroundImage = new Input('toggleBackgroundImage', '#toggle-background-img');
// background color plain
let backgroundColorPlain = new Input('backgroundColorPlain', '#plain-color');
// background user grandient
let backgroundColorUserGradient = new Input('backgroundColorUserGradient', '#background-user-gradient-select');
let backgroundColorUserText = new Input('backgroundColorUserText', '#background-user-gradient-text');
// font inputs
// fontsize
let fontSizeValue = new Input('fontSizeValue', '#font-size');
let fontSizeUnits = new Input('fontSizeUnits', '#font-size-units');
// font weight
let fontWeight = new Input('fontWeight', '#font-weight');
// set font color
let fontColor = new Input('fontColor', '#font-color');
// set font family
let fontFamily = new Input('fontFamily', '#font-family');
// btn font color
let btnFontColor = new Input('btnFontColor', '#btn-font-color');
// sentence box border toggle
let sentenceBoxBorderToggle = new Input('sentenceBoxBorderToggle', '#toggle-sentence-box-border');
// sentence box border
let sentenceBoxBorderValue = new Input('sentenceBoxBorderValue', '#sentence-border-thickness-number');
let sentenceBoxBorderUnit = new Input('sentenceBoxBorderUnit', '#sentence-border-thickness-unit');
let sentenceBoxBorderColor = new Input('sentenceBoxBorderColor', '#sentence-border-color');
let sentenceBoxBorderStyle = new Input('sentenceBoxBorderStyle', '#sentence-border-style');
// word box border toggle
let wordBoxBorderToggle = new Input('wordBoxBorderToggle', '#toggle-word-box-border');
// word box border
let wordBoxBorderValue = new Input('wordBoxBorderValue', '#word-border-thickness-number');
let wordBoxBorderUnit = new Input('wordBoxBorderUnit', '#word-border-thickness-unit');
let wordBoxBorderColor = new Input('wordBoxBorderColor', '#word-border-color');
let wordBoxBorderStyle = new Input('wordBoxBorderStyle', '#word-border-style');
// word box background toggle
let wordBoxBackgroundToggle = new Input('wordBoxBackgroundToggle', '#toggle-word-box-background');
let wordBoxBackground = new Input('wordBoxBackground', '#word-box-background-color');
// ranking box toggle
let rankingBoxToggle = new Input('rankingBoxToggle', '#toggle-ranking-box');
// ranking box border toggle
let rankingBoxBorderToggle = new Input('rankingBoxBorderToggle', '#toggle-ranking-box-border');
// ranking box border
let rankingBoxBorderValue = new Input('rankingBoxBorderValue', '#ranking-border-thickness-number');
let rankingBoxBorderUnit = new Input('rankingBoxBorderUnit', '#ranking-border-thickness-unit');
let rankingBoxBorderColor = new Input('rankingBoxBorderColor', '#ranking-border-color');
let rankingBoxBorderStyle = new Input('rankingBoxBorderStyle', '#ranking-border-style');

// pref combined
let backgroundPrefs = [toggleBackgroundImage, backgroundColorPlain, backgroundColorUserGradient, backgroundColorUserText];
let fontPrefs = [fontSizeValue, fontSizeUnits, fontWeight, fontColor, fontFamily, btnFontColor];
let sentencePrefs = [sentenceBoxBorderToggle, sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle];
let wordBoxPrefs = [wordBoxBorderToggle, wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle, wordBoxBackgroundToggle, wordBoxBackground];
let rankingBoxPrefs = [rankingBoxToggle, rankingBoxBorderToggle, rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle];

let settings = [backgroundPrefs, fontPrefs, sentencePrefs, wordBoxPrefs, rankingBoxPrefs].flat(Infinity);

// ezt lehet, h dinamikusan kene hivni majd
let sentenceBoxCollection = document.getElementsByClassName('sentence-box');
let wordBoxCollection = document.getElementsByClassName('individual-word');
let rankingBoxCollection = document.querySelectorAll('.rank-box');

// --------------------------- PUSH -------------------------------//

function pushSettings() {
    for (element of settings) {
        element.intoLS()
    }
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
            disableInput(backgroundColorUserGradient, backgroundColorUserText);
            enableInput(backgroundColorPlain);
            break;

        case 'background-user-gradient':
            disableInput(backgroundColorPlain);
            enableInput(backgroundColorUserGradient, backgroundColorUserText);
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
        enableInput(wordBoxBackground);
        for (elem of wordBoxCollection) {
            elem.style.background = localStorage.getItem('wordBoxBackground')
        }
    } else {
        disableInput(wordBoxBackground);
        for (elem of wordBoxCollection) {
            elem.style.background = 'transparent';
        }
    }

    //toggle ranking box EZ ITT NEM JO

    rankingBoxCollection = document.querySelectorAll('.rank-box');

    if (rankingBoxCollection.length > 0 && localStorage.getItem('rankingBoxToggle') === '1') {
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
        element.setValue();
    }
    //background type
    //document.querySelector(`#${localStorage.getItem('backgroundTypeSelector')}`).checked = true;
}

// event listnerek changere

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

        case 'background-user-gradient':
            disableInput(backgroundColorPlain);
            enableInput(backgroundColorUserGradient, backgroundColorUserText);
            break;

        case 'toggle-sentence-box-border':
            if (sentenceBoxBorderToggle.value === '0') {
                disableInput(sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle);
            } else {
                enableInput(sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle);
            }
            break;

        case 'toggle-word-box-border':
            if (wordBoxBorderToggle.value === '0') {
                disableInput(wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle);
            } else {
                enableInput(wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle);
            }
            break;
        
        case 'toggle-word-box-background':
            if (wordBoxBackgroundToggle.value === '0') {
                disableInput(wordBoxBackground);
            } else {
                enableInput(wordBoxBackground);
            }

        case 'toggle-ranking-box-border':
            if (rankingBoxBorderToggle.value === '0') {
                disableInput(rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle);
            } else {
                enableInput(rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle);
            }
            break;
    }
});

// enable-disable

function disableInput(...args) {
    for (arg of args) {
        arg.node.setAttribute('disabled', true);
    }
}

function enableInput(...args) {
    for (arg of args) {
        arg.node.removeAttribute('disabled');
    }
}

function disableInputOnStart() {
    if (localStorage.getItem('sentenceBoxBorderToggle') === '0') {
        disableInput(sentenceBoxBorderValue, sentenceBoxBorderUnit, sentenceBoxBorderColor, sentenceBoxBorderStyle);
    }
    if (localStorage.getItem('wordBoxBorderToggle') === '0') {
        disableInput(wordBoxBorderValue, wordBoxBorderUnit, wordBoxBorderColor, wordBoxBorderStyle);
    }
    if (localStorage.getItem('rankingBoxToggle') === '0' || localStorage.getItem('rankingBoxBorderToggle') === '0') {
        disableInput(rankingBoxBorderValue, rankingBoxBorderUnit, rankingBoxBorderColor, rankingBoxBorderStyle);
    }
}

// save pref

let savePreferences = document.querySelector('#save-preferences');

savePreferences.addEventListener('click', (e) => {
    localStorage.clear();
    pushSettings(settings);
    
    saveButtons();
    loadButtons();
    pullSettings(settings);
    applyPreferences();
});
