// ==UserScript==
// @name         Linear Remove Title From Issue URL
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Remove title slug from Linear issue URL (/team/issue/FOX-62/title -> /team/issue/FOX-62)
// @author       kaibadash
// @match        https://linear.app/*
// @run-at       document-start
// @grant        none
// @icon         https://www.google.com/s2/favicons?sz=64&domain=linear.app
// ==/UserScript==

(function () {
  "use strict";

  // https://linear.app/YOUR_TEAM/issue/ABC-62/1-title
  const ISSUE_URL_WITH_TITLE = /^(\/[^/]+\/issue\/[A-Za-z0-9]+-\d+)\/[^/]+\/?$/;

  const originalReplaceState = history.replaceState.bind(history);

  function removeTitleFromUrl() {
    const match = location.pathname.match(ISSUE_URL_WITH_TITLE);
    if (!match) {
      return;
    }
    originalReplaceState(
      history.state,
      "",
      match[1] + location.search + location.hash,
    );
  }

  ["pushState", "replaceState"].forEach((method) => {
    const original = history[method].bind(history);
    history[method] = function (...args) {
      const result = original(...args);
      removeTitleFromUrl();
      return result;
    };
  });

  window.addEventListener("popstate", removeTitleFromUrl);
  removeTitleFromUrl();
})();
