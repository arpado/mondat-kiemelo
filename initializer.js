function initialize() {
    if (localStorage.length === 0) {
        // background
        localStorage.setItem('toggleBackgroundImage', '1');
        // background type
        localStorage.setItem('backgroundTypeSelector', 'background-plain');
        localStorage.setItem('backgroundColorPlain', '#0000ff');
        localStorage.setItem('backgroundColorUserGradient', 'linear-gradient');
        localStorage.setItem('backgroundColorUserText', '45deg, blue, red');
        // fontsize
        localStorage.setItem('fontSizeValue', '1');
        localStorage.setItem('fontSizeUnits', 'rem');
        // font weight
        localStorage.setItem('fontWeight', '500');
        // font color
        localStorage.setItem('fontColor', '#000000');
        // font family
        localStorage.setItem('fontFamily', 'Arial, Helvetica, sans-serif');
        // btn font color
        localStorage.setItem('btnFontColor', '#000000');
        // sentence box toggle & border
        localStorage.setItem('sentenceBoxBorderToggle', '1');
        localStorage.setItem('sentenceBoxBorderValue', '1');
        localStorage.setItem('sentenceBoxBorderUnit', 'px');
        localStorage.setItem('sentenceBoxBorderStyle', 'solid');
        localStorage.setItem('sentenceBoxBorderColor', '#000000');
        // word box toggle & border
        localStorage.setItem('wordBoxBorderToggle', '1');
        localStorage.setItem('wordBoxBorderValue', '1');
        localStorage.setItem('wordBoxBorderUnit', 'px');
        localStorage.setItem('wordBoxBorderStyle', 'solid');
        localStorage.setItem('wordBoxBorderColor', '#000000');
        localStorage.setItem('wordBoxBackgroundToggle', '1');
        localStorage.setItem('wordBoxBackground', '#ffffff');
        // word ranking box toggle & border
        localStorage.setItem('rankingBoxToggle', '1');
        localStorage.setItem('rankingBoxBorderToggle', '1');
        localStorage.setItem('rankingBoxBorderValue', '1');
        localStorage.setItem('rankingBoxBorderUnit', 'px');
        localStorage.setItem('rankingBoxBorderStyle', 'solid');
        localStorage.setItem('rankingBoxBorderColor', '#000000');

        // BTN!
        localStorage.setItem('button-1', '{"text":"Subject","color":"rgb(255, 0, 0)"}');
        localStorage.setItem('button-2', '{"text":"Predicate","color":"rgb(0, 0, 255)"}');
        localStorage.setItem('button-3', '{"text":"Object","color":"rgb(0, 255, 0)"}');
        localStorage.setItem('button-4', '{"text":"Complement","color":"rgb(255, 255, 0)"}');

       
        loadButtons();
        fillPreviewBtns();
        pullSettings();
        applyPreferences();
    } else {
        disableInputOnStart();
        
        loadButtons();
        fillPreviewBtns();
        pullSettings();
        applyPreferences();
    }
}