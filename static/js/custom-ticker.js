document.addEventListener("DOMContentLoaded", function () {
  const tickerContainer = document.querySelector("#dynamic-ticker");
  if (!tickerContainer || !window.tickerData || window.tickerData.length === 0) return;

  const data = window.tickerData.slice(0, 5);
  const N = data.length;
  
  tickerContainer.innerHTML = '';
  tickerContainer.classList.add('announcement-ticker');
  
  // Allow clicks to pass through to the links
  tickerContainer.style.pointerEvents = "auto"; 
  tickerContainer.parentElement.style.pointerEvents = "auto"; // Preact might block it

  if (N === 1) {
    const span = document.createElement("span");
    const link = document.createElement("a");
    link.href = data[0].url;
    link.textContent = data[0].title;
    link.style.color = "inherit";
    link.style.textDecoration = "underline";
    link.style.textUnderlineOffset = "4px";
    
    span.style.opacity = 1;
    span.style.transform = "translateY(0)";
    
    span.appendChild(link);
    tickerContainer.appendChild(span);
    return;
  }

  const timePerItem = 5;
  const totalDuration = N * timePerItem;
  
  const visiblePercent = (1 / N) * 100;
  const fadePercent = (0.2 / N) * 100;

  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes dynamic-ticker-anim {
      0% { opacity: 0; transform: translateY(15px); pointer-events: none; }
      ${fadePercent}% { opacity: 1; transform: translateY(0); pointer-events: auto; }
      ${visiblePercent - fadePercent}% { opacity: 1; transform: translateY(0); pointer-events: auto; }
      ${visiblePercent}% { opacity: 0; transform: translateY(-15px); pointer-events: none; }
      100% { opacity: 0; transform: translateY(-15px); pointer-events: none; }
    }
  `;
  document.head.appendChild(style);

  data.forEach((item, index) => {
    const span = document.createElement("span");
    const link = document.createElement("a");
    link.href = item.url;
    link.textContent = item.title;
    link.style.color = "inherit";
    link.style.textDecoration = "underline";
    link.style.textUnderlineOffset = "4px";
    
    span.style.animation = `dynamic-ticker-anim ${totalDuration}s infinite`;
    span.style.animationDelay = `${index * timePerItem}s`;
    
    span.appendChild(link);
    tickerContainer.appendChild(span);
  });
});
