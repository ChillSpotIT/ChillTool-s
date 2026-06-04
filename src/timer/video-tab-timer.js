import { formatTime } from './session-timer.js';

let _isMobile = () => false;
let _formatTime = (s) => '00:00:00';
let _injectToBody = (el) => document.body.appendChild(el);

export function setDeps(deps) {
    if (deps.isMobile) _isMobile = deps.isMobile;
    if (deps.formatTime) _formatTime = deps.formatTime;
    if (deps.injectToBody) _injectToBody = deps.injectToBody;
}

export let videoTabTimerInterval = null;
export let videoTabOpenTimeMs = null;

export function createVideoTabTimerDisplay() {
    if (_isMobile()) return null;

    const existingTimer = document.getElementById('videoTabTimerContainer');
    if (existingTimer) {
        existingTimer.remove();
    }

    const timerContainer = document.createElement('div');
    timerContainer.id = 'videoTabTimerContainer';

    timerContainer.style.position = 'fixed';
    timerContainer.style.top = '15px';
    timerContainer.style.right = '15px';
    timerContainer.style.zIndex = '9999';
    timerContainer.style.padding = '8px 15px';
    timerContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    timerContainer.style.color = 'white';
    timerContainer.style.borderRadius = '20px';
    timerContainer.style.fontFamily = 'Arial, sans-serif';
    timerContainer.style.fontSize = '14px';
    timerContainer.style.fontWeight = 'bold';
    timerContainer.style.display = 'flex';
    timerContainer.style.alignItems = 'center';
    timerContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.3)';

    const icon = document.createElement('i');
    icon.className = 'fas fa-clock';
    icon.style.marginRight = '5px';
    icon.style.fontSize = '16px';

    const timerDisplay = document.createElement('span');
    timerDisplay.id = 'videoTabTimeElapsedDisplay';
    timerDisplay.textContent = '00:00:00';

    const infoIcon = document.createElement('i');
    infoIcon.className = 'fas fa-info-circle';
    infoIcon.style.marginLeft = '8px';
    infoIcon.style.fontSize = '12px';
    infoIcon.style.opacity = '0.85';
    infoIcon.style.cursor = 'help';
    infoIcon.title = 'this is the time you have spent on this page only and resets when you refresh or close the page';

    timerContainer.appendChild(icon);
    timerContainer.appendChild(timerDisplay);
    timerContainer.appendChild(infoIcon);

    const chatWindow = document.querySelector('.chatWindow') || document.querySelector('.chat-container');
    if (chatWindow) {
        timerContainer.style.position = 'absolute';
        timerContainer.style.top = '10px';
        timerContainer.style.right = '10px';
        chatWindow.style.position = 'relative';
        chatWindow.prepend(timerContainer);
    } else {
        _injectToBody(timerContainer);
    }

    return timerContainer;
}

export function initVideoTabTimer() {
    if (_isMobile()) return;

    const isVideoPage = window.location.pathname.includes('/video');
    if (!isVideoPage) {
        const existingTimer = document.getElementById('videoTabTimerContainer');
        if (existingTimer) existingTimer.remove();
        if (videoTabTimerInterval) {
            clearInterval(videoTabTimerInterval);
            videoTabTimerInterval = null;
        }
        videoTabOpenTimeMs = null;
        return;
    }

    videoTabOpenTimeMs = Date.now();

    createVideoTabTimerDisplay();

    const tick = () => {
        if (!window.location.pathname.includes('/video')) return;
        if (!videoTabOpenTimeMs) return;
        const elapsed = Math.max(0, Math.floor((Date.now() - videoTabOpenTimeMs) / 1000));

        const timeDisplay = document.getElementById('videoTabTimeElapsedDisplay');
        if (timeDisplay) {
            timeDisplay.textContent = formatTime(elapsed);
        } else {
            createVideoTabTimerDisplay();
        }
    };

    if (videoTabTimerInterval) {
        clearInterval(videoTabTimerInterval);
    }
    videoTabTimerInterval = setInterval(tick, 1000);
    tick();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVideoTabTimer);
} else {
    initVideoTabTimer();
}
