(function () {
  var root = document.documentElement;
  var prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealItems = document.querySelectorAll(".reveal");

  root.classList.add("js");

  if (prefersReducedMotion) {
    revealItems.forEach(function (item) {
      item.classList.add("in");
    });
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("in");
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: "0px 0px -12% 0px",
    threshold: 0.1
  });

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
})();
