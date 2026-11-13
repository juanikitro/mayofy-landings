(function () {
  var root = document.documentElement;
  var items = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (items.length === 0) {
    return;
  }

  root.classList.add('js');

  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (item) {
      item.classList.add('in');
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
  }, {
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.08
  });

  items.forEach(function (item) {
    observer.observe(item);
  });
})();
