javascript: [".color-fg-closed", ".color-fg-done"].forEach((sel) => {
  /* target page: https://github.com/notifications */
  document.querySelectorAll(sel).forEach((it) => {
    div = it.closest(".flex-row");
    console.log(div);
    c = div.querySelector("input");
    c.click();
  });
});
document.querySelector("button[data-hotkey='e']").click();
