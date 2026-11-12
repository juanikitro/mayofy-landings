(function () {
  var root = document.documentElement;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion) {
    root.classList.add('js');
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('in');
    });
    return;
  }

  if (!('IntersectionObserver' in window)) {
    return;
  }

  root.classList.add('js');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.08
  });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();
