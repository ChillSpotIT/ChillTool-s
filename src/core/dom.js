export const injectToHead = (element) => {
    if (document.head) {
        document.head.appendChild(element);
    } else {
        const observer = new MutationObserver(() => {
            if (document.head) {
                document.head.appendChild(element);
                observer.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
};

export const injectToBody = (element) => {
    if (document.body) {
        document.body.appendChild(element);
        updateModalBlockedChrome();
    } else {
        const observer = new MutationObserver(() => {
            if (document.body) {
                document.body.appendChild(element);
                updateModalBlockedChrome();
                observer.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
};

export const insertAdjacentHTMLToBody = (position, html) => {
    if (document.body) {
        document.body.insertAdjacentHTML(position, html);
        updateModalBlockedChrome();
    } else {
        const observer = new MutationObserver(() => {
            if (document.body) {
                document.body.insertAdjacentHTML(position, html);
                updateModalBlockedChrome();
                observer.disconnect();
            }
        });
        observer.observe(document.documentElement, { childList: true, subtree: true });
    }
};

export const CHILL_MODAL_SELECTOR = [
    '#settingsModal',
    '#tosModal',
    '#historyModal',
    '#screenshotModal',
    '#infoModal',
    '#bannedUsersModal',
    '#userStylesModal',
    '#galleryModal',
    '#countryFilterModal',
    '#countryLeaderboardModal',
    '#colorModal',
    '#reviewModal',
    '#statisticsModal'
].join(', ');

export const CHILL_TOOLBAR_DEFAULT_Z_INDEX = '10000';
export const CHILL_TOOLBAR_BLOCKED_Z_INDEX = '9998';

export function hasOpenChillModal() {
    return document.querySelector(CHILL_MODAL_SELECTOR) !== null;
}

export function updateModalBlockedChrome() {
    const modalOpen = hasOpenChillModal();
    const toolbar = document.getElementById('chillToolbar');
    const logo = document.getElementById('chillLogo');

    if (toolbar) {
        toolbar.classList.toggle('chill-blur', modalOpen);
        toolbar.style.zIndex = modalOpen
            ? CHILL_TOOLBAR_BLOCKED_Z_INDEX
            : (_isMobile() ? '999' : CHILL_TOOLBAR_DEFAULT_Z_INDEX);
        toolbar.style.pointerEvents = modalOpen ? 'none' : '';
        toolbar.querySelectorAll('button').forEach(button => {
            button.style.pointerEvents = modalOpen ? 'none' : '';
        });
    }

    if (logo) {
        logo.classList.toggle('chill-blur', modalOpen);
    }
}

let _isMobile = () => false;
export function setIsMobile(fn) { _isMobile = fn; }
