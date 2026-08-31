javascript: (function () {
  var text = document.title + "\n" + location.href;
  var listener = function (e) {
    e.clipboardData.setData("text/plain", text);
    e.preventDefault();
  };
  document.addEventListener("copy", listener);
  var ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (e) {
    console.error(e);
  }
  document.removeEventListener("copy", listener);

  if (!ok) {
    return;
  }
  var toast = document.createElement("div");
  toast.textContent = "Copied!";
  toast.style.cssText =
    "position:fixed;top:20px;right:20px;background:rgba(0,100,0,0.8);" +
    "color:#fff;padding:10px 16px;border-radius:6px;font-size:14px;" +
    "z-index:999999;transition:opacity 0.3s;opacity:0;font-family:sans-serif;" +
    "pointer-events:none;";

  document.body.appendChild(toast);
  setTimeout(function () {
    toast.style.opacity = "1";
  }, 10);
  setTimeout(function () {
    toast.style.opacity = "0";
    setTimeout(function () {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 300);
  }, 2000);
})();
