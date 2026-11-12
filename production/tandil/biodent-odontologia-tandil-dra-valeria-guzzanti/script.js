(function () {
  var root = document.documentElement;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    root.classList.add('no-motion');
    return;
  }

  if (!('IntersectionObserver' in window)) {
    root.classList.add('no-observer');
    return;
  }

  root.classList.add('js');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.08
  });

  document.querySelectorAll('.reveal').forEach(function (element) {
    observer.observe(element);
  });
})();
