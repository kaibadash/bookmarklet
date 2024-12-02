// ==UserScript==
// @name         Suica Date Formatter
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Convert date format to yyyy/mm/dd(Day) based on selected year/month in Select1
// @match        https://www.mobilesuica.com/iq/ir/SuicaDisp.aspx?*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  // 年月の選択要素を取得
  const selectYearMonth = document.getElementById("Select1");

  if (selectYearMonth) {
    // 選択された年月を取得 (例: 2024/10)
    const selectedYearMonth = selectYearMonth.value;
    // 年月の値を配列に分割
    let [year, month] = selectedYearMonth.split("/");
    // 本日は月初だったら先月を選択
    if (new Date().getDate() <= 5) {
      month--;
    }
    if (month == 0) {
      month = 12;
      year--;
    }
    // 月日セルを取得 (例: 10/01)
    const dateCells = document.querySelectorAll("td .whtbg");
    // 日付を更新
    dateCells.forEach((cell) => {
      const originalDate = cell.innerText; // 例: "10/01"
      if (/\d{2}\/\d{2}/.test(originalDate)) {
        const [m, d] = originalDate.split("/");
        const fullDate = new Date(`${year}-${month}-${d}`);
        const dayName = fullDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        // yyyy/mm/dd(Day)形式で表示
        cell.innerText = `${year}/${month}/${d}(${dayName})`;
      }
    });
  }
})();
