// ==UserScript==
// @name         FixTrivaboTitle
// @namespace    http://tampermonkey.net/
// @version      2025-02-20
// @description  Fixing an eyesore trivago title
// @author       kaibadash
// @match        https://www.trivago.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=trivago.jp
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.title = "";
    const observer = new MutationObserver(() => {
        if (document.title !== "") {
            document.title = "";
        }
    });

    observer.observe(document.querySelector('title'), { childList: true });
})();
