javascript: (function () {
  /* https://s-check.elpis.life/ のデフォルト値として回答が多そうな一番左のradioにチェックを入れる */
  var radios = document.querySelectorAll('input[type="radio"][value="1"]');
  radios.forEach(function (radio) {
    radio.click();
  });
})();
