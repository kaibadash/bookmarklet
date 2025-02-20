// ==UserScript==
// @name         Replace Kaonavi User Icon
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Replace user icon URL with Gravatar URL
// @author       You
// @match        https://service.kaonavi.jp/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // 置き換える対象のURLのパターン
  const targetUrl =
    "https://static.kaonavi.jp/user/k1234/image/display/little/202404/20240423151905_1234_1234.jpg";
  // 置き換える画像URL
  const imageUrl = "https://dummyimage.com/100x100/000/ffffff.png&text=Me";

  // 画像置き換え関数
  const replaceImage = (img) => {
    if (img.src.indexOf(targetUrl) === 0) {
      console.log("replace", img.src);
      img.src = imageUrl;
    }
  };

  // 既存の画像を置き換え
  document.querySelectorAll("img").forEach(replaceImage);

  // MutationObserverの設定
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeName === "IMG") {
          replaceImage(node);
        }
        if (node.querySelectorAll) {
          node.querySelectorAll("img").forEach(replaceImage);
        }
      });
    });
  });

  // DOM変更の監視を開始
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
