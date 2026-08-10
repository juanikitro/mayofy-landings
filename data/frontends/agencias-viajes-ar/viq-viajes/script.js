(function () {
  "use strict";
  var root = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  // El contenido es visible por defecto: solo activamos el motion cuando hay JS.
  root.classList.add("js-on");

  var hero = document.querySelector(".viq-hero");
  if (hero) requestAnimationFrame(function () { hero.classList.add("is-on"); });

  var items = document.querySelectorAll("[data-reveal]");
  var show = function (el) { el.classList.add("is-on"); };

  if (!("IntersectionObserver" in window)) {
    Array.prototype.forEach.call(items, show);
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      show(entry.target);
      io.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });

  Array.prototype.forEach.call(items, function (el) { io.observe(el); });

  // Red de seguridad: si algo impide que el observer dispare, mostramos todo.
  window.setTimeout(function () { Array.prototype.forEach.call(items, show); }, 2600);
})();
