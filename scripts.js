let container = document.querySelector('.main');

// -------------------- MENUS ------------------------ //

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
                helpWindow.classList.add('hidden');
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

// -------------------- HIGHLIGHTER ------------------------ //

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

initialize();