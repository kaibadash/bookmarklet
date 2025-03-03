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

    // 月日セルを取得 (例: 10/01)
    const dateCells = document.querySelectorAll("td .whtbg");
    // 日付を更新
    dateCells.forEach((cell) => {
      const originalDate = cell.innerText; // 例: "10/01"
      if (/\d{2}\/\d{2}/.test(originalDate)) {
        const [m, d] = originalDate.split("/");
        const fullDate = new Date(`${year}-${m}-${d}`);
        const dayName = fullDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        // 曜日に応じて色を設定（土日は赤色）
        const dayOfWeek = fullDate.getDay();
        if (dayOfWeek === 0 || dayOfWeek === 6) {
          // 0=日曜日, 6=土曜日
          cell.style.color = "red";
        }

        // yyyy/mm/dd(Day)形式で表示
        cell.innerText = `${year}/${m}/${d}(${dayName})`;

        // 左寄せに設定
        cell.style.textAlign = "left";
      }
    });
  }
})();
