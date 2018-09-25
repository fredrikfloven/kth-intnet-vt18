"use strict";
function showCurtain(text) {
    //Get curtain element
    var curtainElem = $("#curtain");

    //Set curtain text
    curtainElem.text(text);

    curtainElem.show();
}

function addCurtainClickHandler() {

    //Get curtain element
    var curtainElem = $("#curtain");
    //Hide the curtain initially
    curtainElem.hide();
    //Register event handler for click
    curtainElem.on("click", function (e) {
        //Prevent that other elements register the click
        e.preventDefault();
        curtainElem.hide();
    });
}