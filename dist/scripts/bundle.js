(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//google tag manager
//if iframe appears on page
//loop through iframes an each one that contains player.vimeo add ga click event 
var iframeElement = document.getElementsByTagName('iframe'),
    iframeElementLength = iframeElement.length,
    iframeCurrent = void 0,
    parentP = void 0;
var vimeoplayer = 'player.vimeo';
var pageURL = window.location.href;
if (iframeElementLength > 0) {
    for (var i = 0; i < iframeElementLength; i++) {
        iframeCurrent = iframeElement[i];
        parentP = iframeCurrent.parentElement;
        console.log(i + ' ' + iframeCurrent + ' ' + parentP);
        var attrCreation = function attrCreation(domevent) {
            parentP.setAttribute(domevent, 'ga(\u2018send\u2019, \u2018event\u2019, \u2018Vimeo Video Played\u2019, \u2018Played Video\u2019, \u2018' + iframeCurrent.getAttribute('src') + '\u2019, \u2018' + pageURL + '\u2019);');
        };
        if (iframeCurrent.getAttribute('src').includes(vimeoplayer)) {
            console.log(iframeCurrent);
            iframeCurrent.setAttribute("class", 'vimeoVideo');
            attrCreation('onkeydown');
            attrCreation('onclick');
            attrCreation('ontouchstart');
        }
    }
}
// window.onload = function () {}

},{}]},{},[1])

//# sourceMappingURL=bundle.js.map
