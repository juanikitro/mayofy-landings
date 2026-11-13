(function(){
  "use strict";
  var reduce=window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduce||!("IntersectionObserver" in window))return;
  var nodes=Array.prototype.slice.call(document.querySelectorAll(".tvs-copy,.tvs-photo,.tvs-wayline,.tvs-waypoints article,.tvs-services,.tvs-log figure,.tvs-fotos,.tvs-contact>div,.tvs-contact aside"));
  if(!nodes.length)return;
  nodes.forEach(function(el,i){el.setAttribute("data-tvs-reveal","");el.style.transitionDelay=Math.min(i,8)*55+"ms";});
  var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("is-in");io.unobserve(entry.target);}});},{threshold:.13,rootMargin:"0px 0px -9% 0px"});
  nodes.forEach(function(el){io.observe(el);});
  window.setTimeout(function(){nodes.forEach(function(el){el.classList.add("is-in");});},2400);
}());
