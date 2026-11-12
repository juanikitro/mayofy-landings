(function () {
  var root = document.documentElement;
  if (!('IntersectionObserver' in window)) {
    return;
  }
  root.classList.add('js');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  document.querySelectorAll('.rv').forEach(function (el) {
    io.observe(el);
  });
})();
