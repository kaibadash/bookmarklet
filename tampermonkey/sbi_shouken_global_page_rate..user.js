// ==UserScript==
// @name         SBI証券外貨建てページ評価損益率
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  評価損益率をDOMに追加表示する
// @match        https://global.sbisec.co.jp/account/summary
// @grant        none
// ==/UserScript==
(function () {
  'use strict';

  // DOMが完全にロードされるのを待つ関数
  function waitForElement(selector, callback, maxWaitTime = 10000) {
    const startTime = Date.now();
    
    function checkElement() {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        callback(elements);
        return;
      }
      
      if (Date.now() - startTime > maxWaitTime) {
        console.log('要素の待機がタイムアウトしました:', selector);
        return;
      }
      
      setTimeout(checkElement, 300);
    }
    
    checkElement();
  }

  function addProfitRateToDOM(listItems) {
    console.log('要素が見つかりました:', listItems.length);
    listItems.forEach((item) => {
      const cells = item.querySelectorAll('div.item-right label');
      if (cells.length < 4) return;

      // 数字部分だけ抽出する関数
      const parseUSD = (str) =>
        parseFloat(str.replace(/[^\d.-]/g, ''));

      // 数字のみのセルを見つけて処理を開始
      for (let i = 0; i < cells.length - 3; i++) {
        const currentText = cells[i].innerText;
        // 数字のみかチェック（通貨記号や単位がないかどうか）
        const isQuantityCell = /^[\d,.]+$/.test(currentText.trim());
        if (!isQuantityCell) continue;
        
        // 保有数量セルを見つけた
        const quantity = parseFloat(currentText.replace(/[,]/g, ''));
        console.log('保有数量:', quantity);
        
        // その次のセルが取得単価、現在値、評価損益
        if (i + 3 >= cells.length) continue;
        
        const costText = cells[i + 1].innerText;
        const currentValueText = cells[i + 2].innerText;
        const profitLabel = cells[i + 3];
        
        const cost = parseUSD(costText);
        const current = parseUSD(currentValueText);
        console.log('取得単価:', cost, '現在値:', current);
        
        if (!cost || !current) continue;
        
        // 評価損益率計算
        const rate = ((current - cost) / cost) * 100;
        const rateText = `(${rate.toFixed(2)}%)`;
        
        // 評価損益の隣に追加（既に追加済みでなければ）
        if (profitLabel.querySelector('span.profit-rate')) continue;
        
        const rateSpan = document.createElement('span');
        rateSpan.textContent = ' ' + rateText;
        rateSpan.className = 'profit-rate';
        rateSpan.style.marginLeft = '4px';
        rateSpan.style.fontWeight = 'bold';
        rateSpan.style.color = rate >= 0 ? 'green' : 'red';
        profitLabel.appendChild(rateSpan);
      }
    });
  }

  // 要素が見つかるまで待機
  waitForElement('ul.grid-table li', addProfitRateToDOM);
})();