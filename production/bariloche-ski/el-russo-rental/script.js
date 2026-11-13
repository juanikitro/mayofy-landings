(function(){
  "use strict";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce||!("IntersectionObserver" in window))return;
  var nodes=Array.prototype.slice.call(document.querySelectorAll(".rus-hero__text,.rus-polaroid,.rus-patch,.rus-hangers article,.rus-process li,.rus-scraps figure,.rus-fotos,.rus-contact>div,.rus-contact aside"));
  if(!nodes.length)return;
  nodes.forEach(function(el,i){el.setAttribute("data-rus-reveal","");el.style.transitionDelay=Math.min(i,7)*60+"ms";});
  var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("is-in");io.unobserve(entry.target);}});},{threshold:.13,rootMargin:"0px 0px -9% 0px"});
  nodes.forEach(function(el){io.observe(el);});
  window.setTimeout(function(){nodes.forEach(function(el){el.classList.add("is-in");});},2400);
}());
