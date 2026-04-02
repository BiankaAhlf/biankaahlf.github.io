
document.addEventListener("DOMContentLoaded", () => {
  const scanLayer=
 document.querySelector(".scan-layer");
  if (!scanLayer) return;

  let x = 0;
  let y = 0;
  let direction = 1;
  let scanSpeed = 1;
  let turboActive = false;

  const lineHeight = 32;
  const pointSize = 10;
  const speed = 2;

  function animatePoint() {
   const maxX = window.innerWidth - pointSize;
   const maxY = window.innerHeight - pointSize;

   x += speed*scanSpeed*direction;

   if (x>=maxX) {
    x = maxX;
    direction = -1;
    y += lineHeight;
   }
    if (x <= 0) {
    x = 0;
    direction = 1;
    y += lineHeight;
   }

   if (y > maxY) {
    y = 0;
   }

   scanLayer.style.setProperty("--scan-x", x + "px");
   scanLayer.style.setProperty("--scan-y", y + "px");
   scanLayer.style.setProperty("--trail-angle",
    direction === 1 ? "90deg" : "270deg");
   scanLayer.style.setProperty("--trail-offset",
    direction === 1 ? "6px" : "0px");
   scanLayer.style.setProperty("--pointer-x",
    direction === 1 ? "48px" : "5px");

   requestAnimationFrame(animatePoint);
  }


  const eggTarget = "console";
   let eggProgress = "";

 document.querySelectorAll(".easter-letter").forEach((letter) =>{
  letter.addEventListener("click", () =>{

   const clickedLetter = letter.dataset.letter?.toLowerCase();
   
   if (!clickedLetter) return;
  
  const expectedLetter =
 eggTarget[eggProgress.length];

   if (clickedLetter === expectedLetter) {
    eggProgress += clickedLetter;
   
  letter.classList.add("easter-hit");

   setTimeout(() =>{ 
  letter.classList.remove("easter-hit");
  }, 700);
 
  } else {
     eggProgress = "";

  document.querySelectorAll(".easter-letter").forEach((letter)=>{
    letter.classList.remove ("easter-hit");
   });
    return;
   }
  
   if (eggProgress === eggTarget) {
    
    const eggMsg = document.createElement("div");
      eggMsg.textContent = "EASTEREGG DETECTED";

  eggMsg.style.position="fixed";
  eggMsg.style.top="56px";
  eggMsg.style.right="20px";
  eggMsg.style.padding="6px 12px";
  eggMsg.style.fontFamily="monospace";
  eggMsg.style.fontSize="12px";
  eggMsg.style.color="#22c55e";
  eggMsg.style.border="1px solid #22c55e";
  eggMsg.style.background="rgba(0,0,0,0.6)";
  eggMsg.style.zIndex="9999";
  eggMsg.style.boxShadow="0 0 12px";

  scanLayer.style.filter = "brightness(1.6)";
  document.body.appendChild(eggMsg);

setTimeout(() =>{
  scanLayer.style.filter = "brightness(1)";
  eggMsg.remove();
  }, 2000);
   eggProgress = "";

document.querySelectorAll(".easter-letter").forEach((letter) =>{
   letter.style.textShadow = "";
    });
   }
  });
 });
   animatePoint();
});

console.log("%cWenn du das liest, weißt du vermutlich, was du tust.",
"color:#6bdcff;font-size:16px;font-weight:bold");

console.log("%c-gebaut ohne Framework, nur HTML, css und JS.",
"color:#94a3b8;");

console.log("%ceasteregg detected",
"color:#22c55e;");


