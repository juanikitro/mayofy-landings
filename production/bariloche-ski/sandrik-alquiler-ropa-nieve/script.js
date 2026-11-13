// Sandrik — reveals con enhancement progresivo.
// Contenido visible por defecto; solo con JS + IntersectionObserver + movimiento permitido se anima.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".snd-hero__copy",
    ".snd-hero__stage",
    ".snd-head",
    ".snd-svc",
    ".snd-quote",
    ".snd-step",
    ".snd-window__copy",
    ".snd-rack",
    ".snd-contact__main",
    ".snd-hours"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  nodes.forEach(function (el, i) {
    el.setAttribute("data-snd-reveal", "");
    el.style.transitionDelay = (Math.min(i, 7) * 55) + "ms";
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.13, rootMargin: "0px 0px -8% 0px" });

  nodes.forEach(function (el) { io.observe(el); });

  window.setTimeout(function () {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
  }, 2500);
}());
