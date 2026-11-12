// Nestor Ski — reveals con enhancement progresivo.
// El contenido es visible por defecto (sin JS o con reduced-motion no se oculta nada);
// solo con JS + IntersectionObserver + movimiento permitido se anima al entrar en viewport.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".nst-pass__stub",
    ".nst-pass__photo",
    ".nst-head",
    ".nst-spec__row",
    ".nst-locker__inner",
    ".nst-step",
    ".nst-reviews__intro",
    ".nst-quote",
    ".nst-cite",
    ".nst-topo",
    ".nst-board",
    ".nst-slot"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  nodes.forEach(function (el, i) {
    el.setAttribute("data-nst-reveal", "");
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
