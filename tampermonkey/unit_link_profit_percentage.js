/** @format */

// ==UserScript==
// @name         unit_link_profit_percentage
// @namespace    http://tampermonkey.net/
// @version      2024-05-05
// @description  Display unit link investment income as a percentage.
// @author       kaibadash
// @match        https://myweb.axa.co.jp/policy/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=axa.co.jp
// @grant        none
// ==/UserScript==

function findElementsByClassStartsWith(startsWith) {
  return document.querySelectorAll(`div[class^="${startsWith}"]`);
}

function extractNumber(text) {
  return parseInt(text.replace(/[^\d]/g, ""), 10);
}

(function () {
  // 特定のパターンを持つクラス名から要素を探す
  const paymentElements = findElementsByClassStartsWith(
    "RefundValueDetailsBoxstyles__AmountBreakdownTotal"
  );
  const resultElements = findElementsByClassStartsWith(
    "RefundValueDetailsBoxstyles__CalcResultItem"
  );

  if (paymentElements.length < 2 || resultElements.length <= 0) {
    alert("必要なデータをページから見つけることができませんでした。");
    return;
  }

  // 数値を抽出
  const totalPayment = extractNumber(paymentElements[0].textContent);
  const totalDeduction = extractNumber(paymentElements[1].textContent);

  // 運用益の計算
  const netProfit = totalPayment - totalDeduction;
  const profitPercentage = (netProfit / totalPayment) * 100;
  // 計算結果の文字列を作成
  const resultText = `${netProfit}円 (${profitPercentage.toFixed(2)}%)`;
  console.log(resultText);

  setTimeout(function () {
    const resultElement = [].slice.call(resultElements).pop();
    resultElement.textContent = resultText;
  }, 500);
})();
