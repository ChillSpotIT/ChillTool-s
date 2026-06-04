export function getSkipCount() {
    return parseInt(localStorage.getItem('skipCount') || '0');
}

export function incrementSkipCount() {
    const count = getSkipCount() + 1;
    localStorage.setItem('skipCount', count.toString());
    console.log('Skip count incremented to:', count);
    return count;
}

export function setupSkipCounter() {
    let lastButtonState = null;

    const updateSkipCounter = () => {
        const skipButton = document.querySelector('.skipButton .mainText');
        if (!skipButton) return;

        const currentState = skipButton.textContent;

        if (lastButtonState !== null && lastButtonState !== currentState) {
            incrementSkipCount();
        }

        lastButtonState = currentState;
    };

    const skipButtonObserver = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'characterData') {
                updateSkipCounter();
            }
        }
    });

    const skipButton = document.querySelector('.skipButton .mainText');
    if (skipButton) {
        lastButtonState = skipButton.textContent;
        skipButtonObserver.observe(skipButton, {
            childList: true,
            characterData: true,
            subtree: true
        });
    } else {
        const buttonObserver = new MutationObserver(() => {
            const skipButton = document.querySelector('.skipButton .mainText');
            if (skipButton) {
                lastButtonState = skipButton.textContent;
                skipButtonObserver.observe(skipButton, {
                    childList: true,
                    characterData: true,
                    subtree: true
                });
                buttonObserver.disconnect();
            }
        });

        buttonObserver.observe(document.documentElement, { childList: true, subtree: true });
    }
}
