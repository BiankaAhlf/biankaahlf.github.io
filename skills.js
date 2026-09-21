document.addEventListener("DOMContentLoaded", () => {

  const skills = document.querySelectorAll(".skill");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {

      if (!entry.isIntersecting) return;

      const skill = entry.target;
      const fill = skill.querySelector(".skill-fill");
      const percentEl = skill.querySelector(".skill-percent");

      if (!fill || !percentEl) return;

      const targetStr = fill.dataset.width || "0%";
      const target = parseInt(targetStr, 10) || 0;

      // Startzustand
      fill.style.width = "0%";
      percentEl.textContent = "0%";

      // Browser zuerst 0 % darstellen lassen
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {

          fill.style.width = target + "%";

          const duration = 1200;
          const start = performance.now();

          function updateCount(now) {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(progress * target);

            percentEl.textContent = value + "%";

            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              percentEl.textContent = target + "%";
            }
          }

          requestAnimationFrame(updateCount);
        });
      });

      observer.unobserve(skill);
    });
  }, {
    threshold: 0.3
  });

  skills.forEach((skill) => {

    const fill = skill.querySelector(".skill-fill");

    if (fill) {
      fill.style.width = "0%";
    }

    observer.observe(skill);
  });

});
