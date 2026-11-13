// Aluguel Ropa para nieve — reveals con enhancement progresivo.
// Contenido visible por defecto; solo con JS + IntersectionObserver + movimiento permitido se anima.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".alu-hero__text",
    ".alu-frame",
    ".alu-head",
    ".alu-row",
    ".alu-lang__intro",
    ".alu-steps li",
    ".alu-quote",
    ".alu-cite",
    ".alu-photos__text",
    ".alu-locator",
    ".alu-contact__main",
    ".alu-ficha"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  nodes.forEach(function (el, i) {
    el.setAttribute("data-alu-reveal", "");
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
