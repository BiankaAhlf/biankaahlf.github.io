
document.addEventListener("DOMContentLoaded", () => {
  const sqlBlocks = document.querySelectorAll(".typewriter");
  const sqlResults = document.querySelectorAll(".sql-result");

  // -------------------------------------------------------
  //  Initial Setup
  // -------------------------------------------------------
  sqlBlocks.forEach((block) => {
    block.dataset.source = block.innerHTML;
    block.innerHTML = "";
    block.style.opacity = "0";
    block.style.transition = "opacity 0.2s ease";
  });

  sqlResults.forEach((result) => {
    result.style.opacity = "0";
    result.style.transform = "translateY(8px)";
    result.style.transition = "opacity 0.4s ease, transform 0.4s ease";
  });

  // -------------------------------------------------------
  //  TYPEWRITER (optimiert & performant)
  // -------------------------------------------------------
  function typeHtml(element, speed, done) {
    const originalHtml = element.dataset.source || "";

    // HTML einmal parsen
    const wrapper = document.createElement("div");
    wrapper.innerHTML = originalHtml;

    // Textknoten sammeln
    const textNodes = [];
    function collect(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
      } else {
        node.childNodes.forEach(collect);
      }
    }
    collect(wrapper);

    // Gesamten Text extrahieren
    const fullText = textNodes.map(n => n.textContent).join("");

    let charIndex = 0;
    element.innerHTML = "";
    element.classList.add("typing");

    // HTML-Struktur in das Ziel kopieren
    element.appendChild(wrapper.cloneNode(true));

    // Live-Textknoten im Ziel sammeln
    const liveNodes = [];
    function collectLive(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        liveNodes.push(node);
      } else {
        node.childNodes.forEach(collectLive);
      }
    }
    collectLive(element);

    // Alle Textknoten leeren
    liveNodes.forEach(n => n.textContent = "");

    function step() {
      if (charIndex > fullText.length) {
        element.classList.remove("typing");
        if (done) done();
        return;
      }

      let remaining = charIndex;
      liveNodes.forEach((node, i) => {
        const original = textNodes[i].textContent;
        if (remaining <= 0) {
          node.textContent = "";
        } else if (remaining < original.length) {
          node.textContent = original.slice(0, remaining);
          remaining = 0;
        } else {
          node.textContent = original;
          remaining -= original.length;
        }
      });

      charIndex++;

      // Natürlichere Tippgeschwindigkeit
      let delay = speed + Math.random() * 40;

      // SQL Keyword Pause
      const lastWord = fullText.slice(0, charIndex).trim().split(/\s+/).pop().toUpperCase();
      if (["SELECT", "FROM", "WHERE", "JOIN", "GROUP", "ORDER"].includes(lastWord)) {
        delay += 200;
      }

      setTimeout(step, delay);
    }

    step();
  }

  // -------------------------------------------------------
  //  Start eines Blocks
  // -------------------------------------------------------
  function startBlock(index) {
    const block = sqlBlocks[index];
    const result = sqlResults[index];

    if (!block || block.dataset.started === "true") return;

    block.dataset.started = "true";
    block.style.opacity = "1";

    typeHtml(block, 18, () => {
      if (result) {
        result.style.opacity = "1";
        result.style.transform = "translateY(0)";
      }
    });
  }

  // -------------------------------------------------------
  //  Automatischer Start beim Scrollen
  //  (Block muss vollständig sichtbar sein)
  // -------------------------------------------------------
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.intersectionRatio === 1) { 
        const index = Array.from(sqlBlocks).indexOf(entry.target);
        startBlock(index);
        observer.unobserve(entry.target); // nur einmal starten
      }
    });
  }, {
    threshold: 1.0 // Block muss zu 100% sichtbar sein
  });

  // Alle Blöcke beobachten
  sqlBlocks.forEach(block => observer.observe(block));

  // Ersten Block sofort starten
  startBlock(0);
});
