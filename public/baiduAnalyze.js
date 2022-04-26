

// 禁止右键
document.addEventListener("contextmenu", function () {
  return false;
});
document.oncontextmenu = function () {
  return false;
};
// 禁止 F12
document.onkeydown = function (event) {
  if (window.event && window.event.keyCode === 123) {
    event.keyCode = 0;
    event.returnValue = false;
    return false;
  }
}
