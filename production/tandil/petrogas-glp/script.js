(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));

  if (reduced) {
    revealEls.forEach(function (el) {
      el.classList.add('in');
    });
    return;
  }

  window.requestAnimationFrame(function () {
    revealEls.slice(0, 6).forEach(function (el) {
      el.classList.add('load-in');
    });
  });

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) {
      el.classList.add('in');
    });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
