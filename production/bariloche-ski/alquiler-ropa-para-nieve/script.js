// Alquiler Ropa Para Nieve — reveals con enhancement progresivo.
// Contenido visible por defecto; solo con JS + IntersectionObserver + movimiento permitido se anima.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".noc-hero__copy",
    ".noc-hero__media",
    ".noc-head",
    ".noc-card",
    ".noc-route__step",
    ".noc-reviews__intro",
    ".noc-quote",
    ".noc-cite",
    ".noc-fotos__grid",
    ".noc-contact__main",
    ".noc-board"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  nodes.forEach(function (el, i) {
    el.setAttribute("data-noc-reveal", "");
    el.style.transitionDelay = (Math.min(i, 6) * 60) + "ms";
  });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  nodes.forEach(function (el) { io.observe(el); });

  window.setTimeout(function () {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
  }, 2500);
}());
