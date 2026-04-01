
document.addEventListener("DOMContentLoaded", () => {

 const hwSection = document.querySelector("#hardware"); 
 const swSection = document.querySelector("#software"); 

 const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => { 
   if (!entry.isIntersecting) return;

   animateSection(entry.target, 0); 

   const skills = entry.target.querySelectorAll(".skill.reveal"); 
   skills.forEach((el, i) => { 
    el.style.transitionDelay = `${i * 120}ms`;
    el.style.willChange = "transform";
    el.classList.add("is-visible");
   }); 
   sectionObserver.unobserve(entry.target);
 });
}, {  
 rootMargin: "-0px 0px -66% 0px"
});

 if (hwSection) {
sectionObserver.observe(hwSection);
}
 if (swSection) {
sectionObserver.observe(swSection);
}

 function animateSection(sectionEl, baseDelayMs = 0) { 

  if (sectionEl.dataset.animated === "1") return; 
  sectionEl.dataset.animated = "1";
 
const skills = sectionEl.querySelectorAll(".skill"); 

skills.forEach((skill, index) => {
 const fill = skill.querySelector(".skill-fill"); 
 const percentEl = skill.querySelector(".skill-percent");
 if (!fill || !percentEl) return;
  if (fill.dataset.done === "1") return;
  fill.dataset.done = "1";

 const targetStr = fill.dataset.width || "0%"; 
 const target = parseInt(targetStr, 10) || 0;
 
  fill.style.width = "0%"; 
fill.offsetWidth;
 const delay = baseDelayMs + index * 250; 
console.log("delay=", delay, "target=", target,"fill=", fill);
 setTimeout(() => { 

  fill.style.width = target + "%"; 

 if (target <= 0) { 
   percentEl.textContent = "0%"; 
   return;
  }   
   const duration = 1200;
   const start = performance.now();

   function updateCount(now) {

   const progress = Math.min((now - start) / duration, 1);
   const value = Math.floor(progress * target);

   percentEl.textContent = value + "%";

   if (progress< 1) {
    requestAnimationFrame(updateCount);
   }
  }
   
  requestAnimationFrame(updateCount);

}, delay);
});
}
});

