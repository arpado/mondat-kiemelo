let container = document.querySelector('.main');

// -------------------- MENUS ------------------------ //

//gombok
let toggleInputBtn = document.getElementById('toggle-input-btn');
let toggleSettingsBtn = document.getElementById('toggle-settings-btn');
let toggleHelpBtn = document.getElementById('toggle-help-btn');

//window-k
let clearBody = document.getElementById('clear-body');
let inputWindow = document.getElementById('input-window');
let settingsWindow = document.getElementById('settings-window');
let helpWindow = document.getElementById('help-window');

//toggle method
document.addEventListener('click', e => {
    switch (e.target) {
        case toggleInputBtn:
            if (inputWindow.classList.contains('hidden')) {
                openMenu(inputWindow, settingsWindow, helpWindow);
                shine(toggleInputBtn, toggleSettingsBtn, toggleHelpBtn);
            } else {
                closeMenuRemoveShine(inputWindow, toggleInputBtn);
            }
            break;
        case toggleSettingsBtn:
            if (settingsWindow.classList.contains('hidden')) {
                openMenu(settingsWindow, inputWindow, helpWindow);
                shine(toggleSettingsBtn, toggleInputBtn, toggleHelpBtn);
            } else {
                closeMenuRemoveShine(settingsWindow, toggleSettingsBtn);
            }
            break;
        case toggleHelpBtn:
            if (helpWindow.classList.contains('hidden')){
                openMenu(helpWindow, inputWindow, settingsWindow);
                shine(toggleHelpBtn, toggleInputBtn, toggleSettingsBtn);
            } else {
                closeMenuRemoveShine(helpWindow, toggleHelpBtn);
            }
            break;
        case clearBody:
            if (container.innerHTML !== '') {
                if (window.confirm('Are you sure you wish to delete all input?')) {
                    container.innerHTML = '';
                }
            }
            break;
    }
});

// pressing the Esc key closes all of the windows

document.onkeydown = function(evt) {
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

function openMenu(selected, ...args) {
    selected.classList.remove('hidden');
    for (elem of args) {
        elem.classList.add('hidden');
    }
}

function shine(selected, ...rest) {
    selected.classList.add('shine');
    for (elem of rest) {
        elem.classList.remove('shine');
    }
}

function closeMenuRemoveShine(menu, button) {
    menu.classList.add('hidden');
    button.classList.remove('shine');
}

// -------------------- HIGHLIGHTER ------------------------ //

let wordSelected = '';

//container a gombok szamara
let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button-container');

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
        button.style.color = localStorage.getItem('btnFontColor');
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


// a majdnem teljes oldalon talalhato kattra figyel, kivetel a beviteli mezo es a hozzatartozo gomb
container.addEventListener('click', e => {

    //ha meg lenne nyitva a gombsav, akkor lecsukja eloszor
    if (buttonContainer) {
        closeButtonMenu();
    }

    // ha a hasznalo valid szora kattint, megnyitja a gombsavot
    if (e.target.classList.contains('individual-word')) {
        // ez a clearSelect csak biztonsagbol van itt, elvileg redundans
        clearSelectedWord();
        makeButtons(e.layerX, e.layerY, sortedButtonArray);
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

initialize();