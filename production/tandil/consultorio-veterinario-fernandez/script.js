(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  root.classList.add("js");

  function showAll() {
    items.forEach(function (item) {
      item.classList.add("in");
    });
  }

  if (reduceMotion || !("IntersectionObserver" in window)) {
    showAll();
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
    threshold: 0.08
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
