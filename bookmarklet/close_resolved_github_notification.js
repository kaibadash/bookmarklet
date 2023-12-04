/* target page: https://github.com/notifications */
javascript: [".color-fg-closed", ".color-fg-done"].forEach((sel) => {
  document.querySelectorAll(sel).forEach((it) => {
    div = it.closest(".flex-row");
    console.log(div);
    c = div.querySelector("input");
    c.click();
  });
});
document.querySelector("button[title='Done']").click();
