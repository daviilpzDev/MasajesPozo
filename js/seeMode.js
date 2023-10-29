function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(';');
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === ' ') {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}
function toggleDarkMode() {
  var isDarkMode = document.body.classList.contains("whitemode");
  document.body.classList.toggle("whitemode");
  if (isDarkMode) {
    var iconSeeMode = document.querySelector(".icon-sun");
    iconSeeMode.classList.remove("icon-sun");
    iconSeeMode.classList.add("icon-brightness-contrast");
    setCookie("darkMode", "true", 30);
  } else {
    var iconSeeMode = document.querySelector(".icon-brightness-contrast");
    iconSeeMode.classList.remove("icon-brightness-contrast");
    iconSeeMode.classList.add("icon-sun");
    setCookie("darkMode", "false", 30);
  }
}
var iconSeeMode = document.querySelector(".icon-brightness-contrast");
iconSeeMode.onclick = toggleDarkMode;
var menuUserSeeMode = document.querySelector(".menuUser .icon-brightness-contrast");
menuUserSeeMode.onclick = toggleDarkMode;
window.onload = function () {
  var darkModeCookie = getCookie("darkMode");
  if (darkModeCookie === "false") {
    toggleDarkMode();
  }
};
