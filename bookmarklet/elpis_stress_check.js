javascript: (function () {
  var radios = document.querySelectorAll('input[type="radio"][value="1"]');
  radios.forEach(function (radio) {
    radio.click();
  });
})();
