javascript: (function () {
  /* https://s-check.elpis.life/ のデフォルト値として回答が多そうな一番左のradioにチェックを入れる */
  var radios = document.querySelectorAll('input[type="radio"][value="1"]');
  radios.forEach(function (radio) {
    radio.click();
  });

  /* spanをlabelに変換する */
  var radios = document.querySelectorAll('input[type="radio"]');
  radios.forEach(function (radio) {
    var span = radio.nextElementSibling;
    if (span && span.tagName.toLowerCase() === "span") {
      var label = document.createElement("label");
      label.htmlFor = radio.id;
      label.innerText = span.innerText;
      span.parentNode.replaceChild(label, span);
    }
  });
})();
