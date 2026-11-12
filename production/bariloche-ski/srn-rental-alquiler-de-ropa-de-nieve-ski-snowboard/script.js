// SRN.Rental — mast fijado al hacer scroll + reveals con enhancement progresivo.
// Contenido visible por defecto; el mast solo gana fondo al desplazar y los reveals
// solo animan con JS + IntersectionObserver + movimiento permitido.
(function () {
  "use strict";

  // Mast: fondo translúcido al bajar (no depende de reduced-motion, es un cambio de estado).
  var mast = document.querySelector("[data-srn-mast]");
  if (mast) {
    var onScroll = function () {
      if (window.scrollY > 24) {
        mast.setAttribute("data-srn-mast", "pinned");
      } else {
        mast.setAttribute("data-srn-mast", "");
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !("IntersectionObserver" in window)) return;

  var selector = [
    ".srn-hero__text",
    ".srn-hero__figure",
    ".srn-feature__head",
    ".srn-feature__body",
    ".srn-rulehead",
    ".srn-list__row",
    ".srn-process__head",
    ".srn-step",
    ".srn-pull",
    ".srn-note",
    ".srn-essay__head",
    ".srn-vignette",
    ".srn-contact__main",
    ".srn-card"
  ].join(",");

  var nodes = Array.prototype.slice.call(document.querySelectorAll(selector));
  if (!nodes.length) return;

  nodes.forEach(function (el, i) {
    el.setAttribute("data-srn-reveal", "");
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
