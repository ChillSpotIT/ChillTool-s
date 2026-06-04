export function checkBackgroundColor() {
    const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow') || document.body;
    const bgColor = window.getComputedStyle(chatContainer).backgroundColor;
    
    const rgb = bgColor.match(/\d+/g);
    const isLight = chatContainer.classList.contains('theme-light') || 
                bgColor.includes('255, 255, 255') || 
                bgColor.includes('255,255,255') || 
                bgColor.includes('#fff') || 
                bgColor.includes('#ffffff') ||
                (rgb && rgb.length >= 3 && 
                    parseInt(rgb[0]) > 200 && 
                    parseInt(rgb[1]) > 200 && 
                    parseInt(rgb[2]) > 200);

    const elementsToStyle = document.querySelectorAll('#ipDisplayBox, #ipDisplayBox *, #historyModal, #screenshotModal, .history-entry');
    elementsToStyle.forEach(el => {
        if (isLight) {
            el.classList.add('chilltool-light-mode');
            if (el.id === 'ipDisplayBox' || el.closest('#ipDisplayBox')) {
                el.classList.add('chilltool-dark-text');
            }
        } else {
            el.classList.remove('chilltool-light-mode');
            el.classList.remove('chilltool-dark-text');
        }
    });

    document.querySelectorAll('#chillToolbar button, #closeHistory, #settingsModal button').forEach(btn => {
        if (isLight) {
            btn.classList.add('chilltool-light-mode-btn');
        } else {
            btn.classList.remove('chilltool-light-mode-btn');
        }
    });
}

export function setupBackgroundObserver() {
    const targetNode = document.querySelector('.chat-container') || document.querySelector('.chatWindow') || document.body;
    if (!targetNode) return;

    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes' && 
            (mutation.attributeName === 'style' || 
                mutation.attributeName === 'class')) {
                checkBackgroundColor();
            }
        });
    });

    observer.observe(targetNode, {
        attributes: true,
        attributeFilter: ['style', 'class'],
        subtree: true
    });

    checkBackgroundColor();
    
    setInterval(checkBackgroundColor, 1000);
}

export function getChatBoxColor() {
    const textBox = document.querySelector('.chatWindow') || document.querySelector('.chat-container');
    return textBox ? window.getComputedStyle(textBox).backgroundColor : '#000';
}