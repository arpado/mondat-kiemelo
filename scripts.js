let container = document.querySelector('.container');
let createNewSentButton = document.querySelector('.new');
let inputSentence = document.querySelector('#input-sentence');

//let pointerX = -1;
//let pointerY = -1;

let buttonContent = ['red', 'blue', 'green'];
//console.log(buttonContent)
let numberOfButtons = 6;
let buttonContainer = document.createElement('div');
buttonContainer.setAttribute('class', 'button-container');
//container.appendChild(buttonContainer);

function makeButtons(locX, locY, buttonContent) {
    //let buttonContainer = document.createElement('div');
    //buttonContainer.setAttribute('class', 'button-container');
    container.appendChild(buttonContainer);
    buttonContainer.style.left = locX+'px';
    buttonContainer.style.top = locY+'px';
    
    for (let i = 0; i < buttonContent.length; i++) {
        let button = document.createElement('button');
        button.setAttribute('class', 'button')
        button.setAttribute('id', buttonContent[i]);
        button.innerText = buttonContent[i];
        buttonContainer.append(button);
        /*let button1X = pointerX + 100;
        let button1Y = pointerY + (100 * i);
        console.log(button1Y)
        button.style.top = button1X+'px';
        button.style.left = button1Y+'px';*/
    }
}

function clearSelectedWord() {
    if (document.querySelector('#wordSelected')){
        wordSelected = document.querySelector('#wordSelected');
        wordSelected.removeAttribute('id');
    }
}

function closeButtonMenu() {
    buttonContainer.innerHTML = '';
    buttonContainer.remove();
}
/*
let button1 = document.createElement('button');
button1.setAttribute('class', 'button1');
button1.innerText = 'BUTTON1';
let button2 = document.createElement('button');
button2.setAttribute('class', 'button2');
button2.innerText = 'BUTTON2';
*/

let wordSelected = '';
//let wordIndicatorSelected = '';

createNewSentButton.addEventListener('click', () => {
    if (inputSentence.value === '') {
        return;
    }

    let sentenceDiv = document.createElement('div');
    container.append(sentenceDiv);
    sentenceDiv.setAttribute('class', 'sentence-box');

    let sentenceIndicatorDiv = document.createElement('div');
    sentenceDiv.append(sentenceIndicatorDiv);
    sentenceIndicatorDiv.setAttribute('class', 'sentence-indicator');

    let inputSentenceSplit = inputSentence.value.trim().split(' ');

    for (let i=0; i < inputSentenceSplit.length; i++){
        let wordDivContainer = document.createElement('div');
        sentenceDiv.append(wordDivContainer);
        wordDivContainer.setAttribute('class', 'word-container');

        let wordDiv = document.createElement('div');
        wordDivContainer.append(wordDiv);
        wordDiv.setAttribute('class', 'individual-word');
        wordDiv.innerText = inputSentenceSplit[i] + ' ';

        /*let wordIndicatorDiv = document.createElement('div');
        wordDivContainer.append(wordIndicatorDiv);
        wordIndicatorDiv.setAttribute('class', 'word-indicator');*/
    }
    inputSentence.value = '';
});

document.addEventListener('click', e => {
   
    if (buttonContainer) {
        closeButtonMenu()
    }
    //leszedi mielott alkalmazni tundna a style-t
    

    if (e.target.classList.contains('individual-word') /*|| e.target.classList.contains('word-indicator')*/) {
        //pointerX = e.pageX;
        //pointerY = e.pageY;
        

        clearSelectedWord()

        makeButtons(e.pageX, e.pageY, buttonContent);

        e.target.setAttribute('id', 'wordSelected');



        /*container.append(button1);
        let button1X = pointerX - 100;
        let button1Y = pointerY + 30;
        button1.style.left = button1X+'px';
        button1.style.top = button1Y+'px';

        container.append(button2);
        let button2X = pointerX + 100;
        let button2Y = pointerY + 30;
        button2.style.left = button2X+'px';
        button2.style.top = button2Y+'px';*/

        /*if (e.target.classList.contains('individual-word')){
            e.target.setAttribute('id', 'wordSelected');
            //e.target.nextElementSibling.setAttribute('id', 'wordIndicatorSelected');
        } */
        
        /*else if (e.target.classList.contains('word-indicator')) {
            e.target.setAttribute('id', 'wordIndicatorSelected');
            e.target.previousElementSibling.setAttribute('id', 'wordSelected');
        }*/

    }    else if (e.target.classList.contains('button')) {
        wordSelected = document.querySelector('#wordSelected');
        console.log(wordSelected)
        //wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        let color = e.target.id;
        //console.log(color.id)
        wordSelected.style.background = color;
        clearSelectedWord()
        //wordIndicatorSelected.removeAttribute('id');
        //button1.remove();
        //button2.remove();
        closeButtonMenu()
    } else {
        clearSelectedWord()
        closeButtonMenu()
    } 
});

/*document.addEventListener('click', e => {
 
    if (e.target.classList.contains('button1')) {
        wordSelected = document.querySelector('#wordSelected');
        wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        wordSelected.style.textDecoration = "underline dashed";
        wordSelected.removeAttribute('id');
        wordIndicatorSelected.removeAttribute('id');
        button1.remove();
        button2.remove();
    } else if (e.target.classList.contains('button2')) {
        wordSelected = document.querySelector('#wordSelected');
        wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        wordIndicatorSelected.style.background = "blue";
        //wordIndicatorSelected.style.textDecoration = "underline dashed";
        wordSelected.removeAttribute('id');
        wordIndicatorSelected.removeAttribute('id');
        button1.remove();
        button2.remove();
    } 
    /*else {
        wordSelected = document.querySelector('#wordSelected');
        wordIndicatorSelected = document.querySelector('#wordIndicatorSelected');
        wordSelected.removeAttribute('id');
        wordIndicatorSelected.removeAttribute('id');
        button1.remove();
        button2.remove();
    }
    
    
});*/

//something different