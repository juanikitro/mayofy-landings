// Epic Bariloche — reveals con enhancement progresivo.
// El contenido es visible por defecto (sin JS o con reduced-motion no se oculta nada);
// solo si hay JS + IntersectionObserver + movimiento permitido, se anima al entrar en viewport.
(function () {
  "use strict";
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".epx-hero__panel",
    ".epx-readout",
    ".epx-lead-head",
    ".epx-spec__row",
    ".epx-route__step",
    ".epx-resenas__intro",
    ".epx-quote",
    ".epx-cite",
    ".epx-fotos__shot",
    ".epx-board",
    ".epx-contacto__main",
    ".epx-board2"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  // Ocultar solo ahora que sabemos que vamos a revelar.
  nodes.forEach(function (el, i) {
    el.setAttribute("data-epx-reveal", "");
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

  // Failsafe: si algo no dispara, revelar todo tras 2.5s.
  window.setTimeout(function () {
    nodes.forEach(function (el) { el.classList.add("is-in"); });
  }, 2500);
}());
