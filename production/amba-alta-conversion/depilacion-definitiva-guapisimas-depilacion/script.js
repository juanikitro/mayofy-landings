(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window)) {
    root.classList.add('no-observer');
    return;
  }
  root.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  document.querySelectorAll('.reveal-scroll').forEach(function (el) {
    io.observe(el);
  });
})();
