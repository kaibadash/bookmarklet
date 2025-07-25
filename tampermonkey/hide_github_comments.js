// ==UserScript==
// @name         GitHub Hide/Show Comments Toggle
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Toggle visibility of GitHub inline comments
// @author       kaibadash
// @match        https://github.com/*/*/pull/*
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// ==/UserScript==

(function () {
  "use strict";

  let commentsHidden = false;

  function toggleComments() {
    const comments = document.querySelectorAll(".js-inline-comments-container");
    const display = commentsHidden ? "" : "none";

    comments.forEach((el) => {
      el.style.display = display;
    });

    commentsHidden = !commentsHidden;
    updateButtonText();
  }

  function updateButtonText() {
    const button = document.getElementById("toggle-comments-btn");
    if (button) {
      button.textContent = commentsHidden ? "Show Comments" : "Hide Comments";
    }
  }

  function createToggleButton() {
    if (document.getElementById("toggle-comments-btn")) {
      return;
    }

    const button = document.createElement("button");
    button.id = "toggle-comments-btn";
    button.textContent = "Hide Comments";
    button.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 9999;
            padding: 8px 12px;
            background: #24292e;
            color: white;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 14px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        `;

    button.addEventListener("click", toggleComments);
    document.body.appendChild(button);
  }

  // Create button when page loads
  createToggleButton();

  // Re-create button on navigation (for SPAs)
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "childList" &&
        !document.getElementById("toggle-comments-btn")
      ) {
        setTimeout(createToggleButton, 100);
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
