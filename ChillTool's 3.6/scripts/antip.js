const removePopupAndOverlay = () => {
    
    const popupOverlay = document.getElementById("faceOverlay");
    if (popupOverlay) {
      popupOverlay.remove(); 
    }
  
   
    document.body.style.overflow = ""; 
  
 
    const disabledElements = document.querySelectorAll("[disabled]");
    disabledElements.forEach((element) => {
      element.disabled = false; 
    });
  };
  
  
  const observer = new MutationObserver(() => {
    removePopupAndOverlay();
  });
  

  observer.observe(document.body, { childList: true, subtree: true });
  

  document.addEventListener("DOMContentLoaded", removePopupAndOverlay);