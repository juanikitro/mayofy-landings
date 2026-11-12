(function () {
  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) {
    root.classList.add("no-observer");
    return;
  }

  if (!("IntersectionObserver" in window)) {
    root.classList.add("no-observer");
    return;
  }

  root.classList.add("js");

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -10% 0px",
    threshold: 0.08
  });

  document.querySelectorAll(".reveal-scroll").forEach(function (element, index) {
    element.style.transitionDelay = Math.min(index * 80, 240) + "ms";
    observer.observe(element);
  });
})();
