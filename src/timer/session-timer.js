let isPausedDueToDisconnect = false;
let disconnectCheckInterval = null;
let _checkAndMaybePromptReview = () => {};

export function setReviewCheck(fn) { _checkAndMaybePromptReview = fn; }

function checkDisconnectStatus() {
    const disconnectMessage = document.querySelector('.disconnectMessage');
    const isCurrentlyDisconnected = disconnectMessage !== null &&
                                 disconnectMessage.textContent.includes('You have disconnected');

    if (isCurrentlyDisconnected && !isPausedDueToDisconnect) {
        localStorage.setItem('lastUpdateTime', Math.floor(Date.now() / 1000).toString());
        isPausedDueToDisconnect = true;
    }
    else if (!isCurrentlyDisconnected && isPausedDueToDisconnect) {
        localStorage.setItem('lastUpdateTime', Math.floor(Date.now() / 1000).toString());
        isPausedDueToDisconnect = false;
    }
}

export function startDisconnectCheck() {
    if (disconnectCheckInterval) clearInterval(disconnectCheckInterval);
    disconnectCheckInterval = setInterval(checkDisconnectStatus, 500);
}

const disconnectObserver = new MutationObserver(() => {
    checkDisconnectStatus();
});

disconnectObserver.observe(document.documentElement, { childList: true, subtree: true });

export function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        secs.toString().padStart(2, '0')
    ].join(':');
}

export function getTimeElapsed() {
    return parseInt(localStorage.getItem('timeElapsed') || '0');
}

export function updateTimeElapsed() {
    const currentTime = Math.floor(Date.now() / 1000);
    const lastUpdate = parseInt(localStorage.getItem('lastUpdateTime') || currentTime);
    const timeDiff = currentTime - lastUpdate;

    const isVideoPage = window.location.pathname.includes('/video');

    const disconnectSelectors = [
        '.disconnectMessage',
        '.information',
        'div[style*="text-align: center"]',
        'div[class*="disconnect"]',
        'div:contains("You have disconnected")',
        'div:contains("disconnected")'
    ];

    let disconnectMessage = null;
    for (const selector of disconnectSelectors) {
        try {
            const elements = document.querySelectorAll(selector);
            for (const element of elements) {
                if (element && (element.textContent.includes('You have disconnected') ||
                             element.textContent.includes('disconnected'))) {
                        disconnectMessage = element;
                        break;
                    }
            }
            if (disconnectMessage) break;
        } catch (e) {}
    }

    const startButton = document.querySelector('.bottomButton.new.outlined.skipButton.noSelect');
    const isInStartState = startButton && startButton.querySelector('.mainText')?.textContent === 'Start';

    const shouldStopTimer = disconnectMessage !== null || isInStartState;

    if (isVideoPage && !shouldStopTimer && timeDiff > 0 && timeDiff < 600) {
        const newTime = getTimeElapsed() + timeDiff;
        localStorage.setItem('timeElapsed', newTime.toString());
    }

    localStorage.setItem('lastUpdateTime', currentTime.toString());

    const timeDisplay = document.getElementById('timeElapsedDisplay');
    if (timeDisplay) {
        const totalSeconds = getTimeElapsed();
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        timeDisplay.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    _checkAndMaybePromptReview();

    return getTimeElapsed();
}
