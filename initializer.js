function initialize() {
    if (localStorage.length === 0) {
        // background
        localStorage.setItem('toggleBackgroundImageInput', '1');
        // background type
        localStorage.setItem('backgroundTypeSelector', 'background-plain');
        

        // fontsize
        localStorage.setItem('fontSizeInput', '1');
        localStorage.setItem('fontSizeInputUnits', 'rem');
        // font weight
        localStorage.setItem('fontWeight', '500');
        // font color
        localStorage.setItem('fontColor', '#000000');
        // font family
        localStorage.setItem('fontFamily', '"Arial, Helvetica, sans-serif"');
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
        

        // word ranking box toggle & border
        localStorage.setItem('rankingBoxToggle', '1');
        localStorage.setItem('rankingBoxBorderToggle', '1');
        localStorage.setItem('rankingBoxBorderValue', '1');
        localStorage.setItem('rankingBoxBorderUnit', 'px');
        localStorage.setItem('rankingBoxBorderStyle', 'solid');
        localStorage.setItem('rankingBoxBorderColor', '#000000');
        applyPreferences();
        loadButtons();
        fillPreviewBtns();
        pullSettings();
    } else {
        disableInputOnStart();
        applyPreferences();
        loadButtons();
        fillPreviewBtns();
        pullSettings();
    }
}