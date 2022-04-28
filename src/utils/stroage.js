const EMPTY_TYPE = {
  String: "",
  Array: [],
  Object: {},
};

export function setCookie(name, value, days) {
  var d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
  window.document.cookie =
    name + "=" + value + ";path=/;expires=" + d.toGMTString();
}

export function getCookie(name) {
  var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
  return v ? v[2] : null;
}

export function delCookie(name) {
  setCookie(name, "", -1);
}

export function setSessionStorage(name, value) {
  let v = value ? JSON.stringify(value) : "";
  sessionStorage.setItem(name, v);
}

export function getSessionStorage(name, type = "Object") {
  let v = sessionStorage.getItem(name);
  return v ? JSON.parse(v) : EMPTY_TYPE[type];
}

export function delSessionStorage(name) {
  sessionStorage.removeItem(name);
}

export function setLocalStorage(name, value) {
  let v = value ? JSON.stringify(value) : "";
  localStorage.setItem(name, v);
}

export function getLocalStorage(name, type = "Object") {
  let v = localStorage.getItem(name);
  return v ? JSON.parse(v) : EMPTY_TYPE[type];
}

export function delLocalStorage(name) {
  localStorage.removeItem(name);
}
