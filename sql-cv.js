document.addEventListener("DOMContentLoaded", () => {
  const sqlBlocks =
 document.querySelectorAll(".typewriter");
  const sqlResults =
 document.querySelectorAll(".sql-result");
 
  sqlBlocks.forEach((block) => {
   block.dataset.source = block.innerHTML.replace(/"/g, '&quot;');
   block.innerHTML ="";
   block.style.opacity= "0";
   block.style.transition= "opacity 0.2s ease";
  });

  sqlResults.forEach((result) => {
   result.style.opacity = "0";
   result.style.transform = "translateY(8px)";
   result.style.transition="opacity 0.4s ease, transform 0.4s ease";
});

   let index = 0;

   function typeHtml(element, speed, done) {
    const originalHtml = element.dataset.source||"";
    const tempText = document.createElement("div");
    tempText.innerHTML = originalHtml;
    const originalText = tempText.textContent||"";

   element.innerHTML = "";
   element.classList.add("typing");
  
  let i = 0;

  function rebuildPartialHtml (sourceHtml, visibleChars) {
   const temp=
  document.createElement("div");
   temp.innerHTML = sourceHtml;

  let count = 0;

  function walk(node){
   if (node.nodeType === Node.TEXT_NODE) {
    const full = node.textContent || "";
    if (count >= visibleChars) {
     node.textContent = "";
    }else if (count + full.length > visibleChars)
{
     node.textContent = full.slice (0, visibleChars - count);
     count = visibleChars;
    } else {
      count += full.length;
     }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
    Array.from(node.childNodes).forEach(walk);
     }
    }
   
    Array.from(temp.childNodes).forEach(walk);
     return temp.innerHTML;
   }

   function step () {
    if (i <= originalText.length) {
     element.innerHTML = rebuildPartialHtml(originalHtml, i);
     i++;

    let delay = speed + Math.random() * 40;
   
    if (
     originalText.slice(0, i).endsWith("SELECT") ||
     originalText.slice(0, i).endsWith("FROM") ||
     originalText.slice(0, i).endsWith("WHERE") 
   ) {
    delay += 200;
  }
     setTimeout(step, delay);
    } else {
      element.classList.remove("typing");
      if (done) done();
     }
    }

    step();
   }
     function startBlock(index) {
    const block = sqlBlocks[index];
    const result = sqlResults[index];

     if(!block ||block.dataset.started === "true") return;

     block.dataset.started = "true";
     block.style.opacity = "1";

   typeHtml(block, 18, () => {
    if (result) {
     result.style.opacity = "1";
     result.style.transform = "translateY(0)"; 
    }
   });
  }
    function checkBlocksOnScroll() {
     sqlBlocks.forEach((block, index) => {
      if (block.dataset.started === "true") return;
     
      const rect = block.getBoundingClientRect();
      const triggerLine = window.innerHeight * 0.9;
 
      if (rect.top <= triggerLine && rect.bottom > 0) {
     startBlock(index);
    }
   });
  }

  window.addEventListener("scroll", checkBlocksOnScroll);
  window.addEventListener("resize", checkBlocksOnScroll);
  startBlock(0);
 checkBlocksOnScroll();
});
