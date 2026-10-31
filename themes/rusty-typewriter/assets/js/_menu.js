(function() {
  "use strict";

  window.addEventListener("DOMContentLoaded", () => {
    let menu = document.getElementById("nav-dropdown-menu");
    const menu_btn = document.getElementById("nav-dropdown-button");
    menu_btn.addEventListener("click", e => {
      e.preventDefault();
      menu.classList.toggle("hidden");

      window.addEventListener("click", () => {});
      window.addEventListener("scroll", () => {});
    });
  });
})();
