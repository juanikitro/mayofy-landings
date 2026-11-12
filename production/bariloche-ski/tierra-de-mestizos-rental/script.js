// Tierra de Mestizos Rental — reveals con enhancement progresivo.
// Contenido visible por defecto; solo con JS + IntersectionObserver + movimiento permitido se anima.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".tdm-hero__copy",
    ".tdm-hero__media",
    ".tdm-readout div",
    ".tdm-head",
    ".tdm-row",
    ".tdm-first__intro",
    ".tdm-steps li",
    ".tdm-reviews__intro",
    ".tdm-quote",
    ".tdm-cite",
    ".tdm-fotos__copy",
    ".tdm-kit li",
    ".tdm-contact__main",
    ".tdm-ficha"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  nodes.forEach(function (el, i) {
    el.setAttribute("data-tdm-reveal", "");
    el.style.transitionDelay = (Math.min(i, 6) * 55) + "ms";
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
