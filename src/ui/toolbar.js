import { injectToBody, CHILL_TOOLBAR_DEFAULT_Z_INDEX, hasOpenChillModal } from '../core/dom.js';

let _showSettings = () => {};
let _displayHistory = () => {};
let _displayBannedUsers = () => {};
let _showCountryFilterModal = () => {};
let _getBannedUsers = () => [];
let _saveBannedUsers = () => {};
let _currentSession = {};
let _showNotification = () => {};
let _getLang = () => 'en';
let _translations = {};
let _updateModalBlockedChrome = () => {};

export function setDeps(deps) {
    if (deps.showSettings !== undefined) _showSettings = deps.showSettings;
    if (deps.displayHistory !== undefined) _displayHistory = deps.displayHistory;
    if (deps.displayBannedUsers !== undefined) _displayBannedUsers = deps.displayBannedUsers;
    if (deps.showCountryFilterModal !== undefined) _showCountryFilterModal = deps.showCountryFilterModal;
    if (deps.getBannedUsers !== undefined) _getBannedUsers = deps.getBannedUsers;
    if (deps.saveBannedUsers !== undefined) _saveBannedUsers = deps.saveBannedUsers;
    if (deps.currentSession !== undefined) _currentSession = deps.currentSession;
    if (deps.showNotification !== undefined) _showNotification = deps.showNotification;
    if (deps.getLang !== undefined) _getLang = deps.getLang;
    if (deps.translations !== undefined) _translations = deps.translations;
    if (deps.updateModalBlockedChrome !== undefined) _updateModalBlockedChrome = deps.updateModalBlockedChrome;
}

export const isMobile = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

export const isVideoPage = () => window.location.pathname.includes('/video/');

export const updateToolbarVisibility = () => {
    const toolbar = document.getElementById('chillToolbar');
    if (isVideoPage()) {
        if (!toolbar) createToolbar();
    } else if (toolbar) {
        toolbar.remove();
    }
};

const urlObserver = new MutationObserver(updateToolbarVisibility);
urlObserver.observe(document.documentElement, { childList: true, subtree: true });

window.addEventListener('popstate', updateToolbarVisibility);

export const createToolbar = () => {
    if (!isVideoPage()) return null;

    const existingToolbar = document.getElementById('chillToolbar');
    if (existingToolbar) return existingToolbar;
    const toolbar = document.createElement("div");
    toolbar.id = "chillToolbar";
    toolbar.style.position = "fixed";
    toolbar.style.top = "20px";
    toolbar.style.right = "250px";
    toolbar.style.display = "flex";
    toolbar.style.gap = "10px";
    toolbar.style.zIndex = CHILL_TOOLBAR_DEFAULT_Z_INDEX;
    toolbar.style.width = "auto";
    toolbar.style.justifyContent = "flex-start";

    if (isMobile()) {
        toolbar.style.position = "absolute";
        toolbar.style.top = "5px";
        toolbar.style.left = "5px";
        toolbar.style.right = "auto";
        toolbar.style.gap = "6px";
        toolbar.style.padding = "5px 8px";
        toolbar.style.borderRadius = "12px";
        toolbar.style.zIndex = "999";
        const buttons = toolbar.querySelectorAll('button');
        buttons.forEach(button => {
            button.style.marginTop = '0';
            button.style.marginBottom = '0';
            button.style.padding = '8px 10px';
        });
    }

    toolbar.addEventListener('click', function(e) {
        if (hasOpenChillModal()) {
            e.preventDefault();
            e.stopImmediatePropagation();
        }
    }, true);

    const leftButtons = document.createElement("div");
    leftButtons.style.display = "flex";
    leftButtons.style.gap = "10px";
    leftButtons.style.flexGrow = "1";

    const rightButtons = document.createElement("div");
    rightButtons.style.display = "flex";
    rightButtons.style.gap = "10px";
    rightButtons.style.marginLeft = "auto";

    const historyBtn = document.createElement("button");
    historyBtn.id = "chillHistoryBtn";
    historyBtn.innerHTML = '<i class="fas fa-clock"></i>';
    historyBtn.style.background = isMobile() ? "#007bff" : "#007bff";
    historyBtn.style.color = "white";
    historyBtn.style.border = "none";
    historyBtn.style.borderRadius = isMobile() ? "8px" : "5px";
    historyBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
    historyBtn.style.cursor = "pointer";
    historyBtn.style.fontSize = isMobile() ? "16px" : "inherit";
    historyBtn.title = _translations[_getLang()]?.history ?? '';

    let isHistoryVisible = false;
    historyBtn.addEventListener("click", function() {
        const existingModal = document.getElementById("historyModal");
        if (existingModal) existingModal.remove();
        _displayHistory();
        isHistoryVisible = true;
    });
    leftButtons.appendChild(historyBtn);

    const banBtn = document.createElement("button");
    banBtn.id = "chillBanBtn";

    const settingsBtn = document.createElement("button");
    settingsBtn.id = "chillSettingsBtn";
    settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
    settingsBtn.style.background = "#6c757d";
    settingsBtn.style.color = "white";
    settingsBtn.style.border = "none";
    settingsBtn.style.borderRadius = isMobile() ? "8px" : "5px";
    settingsBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
    settingsBtn.style.cursor = "pointer";
    settingsBtn.style.fontSize = isMobile() ? "16px" : "inherit";
    settingsBtn.title = _translations[_getLang()]?.settings ?? '';
    settingsBtn.addEventListener("click", function() {
        _showSettings();
    });

    rightButtons.appendChild(settingsBtn);

    toolbar.appendChild(leftButtons);
    toolbar.appendChild(rightButtons);
    banBtn.innerHTML = '<i class="fas fa-user-slash"></i>';
    banBtn.style.background = "#dc3545";
    banBtn.style.color = "white";
    banBtn.style.border = "none";
    banBtn.style.borderRadius = isMobile() ? "8px" : "5px";
    banBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
    banBtn.style.cursor = "pointer";
    banBtn.style.fontSize = isMobile() ? "16px" : "inherit";
    banBtn.title = _translations[_getLang()]?.ban ?? '';
    banBtn.disabled = true;
    banBtn.addEventListener("click", function() {
        if (_currentSession.ip) {
            const bannedUsers = _getBannedUsers();
            const userToBan = {
                ip: _currentSession.ip,
                info: _currentSession.info,
                screenshot: _currentSession.screenshot,
                timestamp: new Date().toLocaleString(),
                note: ''
            };
            bannedUsers.push(userToBan);
            _saveBannedUsers(bannedUsers);
            restartConnection();
        }
    });
    leftButtons.appendChild(banBtn);

    const bannedListBtn = document.createElement("button");
    bannedListBtn.id = "chillBannedListBtn";
    bannedListBtn.innerHTML = '<i class="fas fa-list"></i>';
    bannedListBtn.style.background = "#ffc107";
    bannedListBtn.style.color = "black";
    bannedListBtn.style.border = "none";
    bannedListBtn.style.borderRadius = isMobile() ? "8px" : "5px";
    bannedListBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
    bannedListBtn.style.cursor = "pointer";
    bannedListBtn.style.fontSize = isMobile() ? "16px" : "inherit";
    bannedListBtn.title = _translations[_getLang()]?.bannedUsers ?? '';
    bannedListBtn.addEventListener("click", function() {
        _displayBannedUsers();
    });
    leftButtons.appendChild(bannedListBtn);

    const countryFilterBtn = document.createElement("button");
    countryFilterBtn.id = "chillCountryFilterBtn";
    countryFilterBtn.innerHTML = '<i class="fas fa-globe"></i>';
    countryFilterBtn.style.background = "#17a2b8";
    countryFilterBtn.style.color = "white";
    countryFilterBtn.style.border = "none";
    countryFilterBtn.style.borderRadius = isMobile() ? "8px" : "5px";
    countryFilterBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
    countryFilterBtn.style.cursor = "pointer";
    countryFilterBtn.style.fontSize = isMobile() ? "16px" : "inherit";
    countryFilterBtn.title = _translations[_getLang()]?.countryFilter ?? '';
    countryFilterBtn.addEventListener("click", function() {
        _showCountryFilterModal();
    });
    leftButtons.appendChild(countryFilterBtn);

    if (isVideoPage()) {
        injectToBody(toolbar);
        return toolbar;
    }
    return null;
};

export function restartConnection() {
    const chatWindow = document.querySelector('.chatWindow') || document.querySelector('.chat-container');
    if (chatWindow) {
        doubleSkipButton();
    }
}

export function clickSkipButton() {
    const candidates = [
        '.bottomButton.skipButton',
        '.bottomButton.outlined.skipButton',
        '.bottomButton.new.skipButton',
        '.bottomButton.new.outlined.skipButton',
        '.bottomButton.new.outlined.skipButton.noSelect',
        '.skipButton'
    ];

    let el = null;
    for (const sel of candidates) {
        el = document.querySelector(sel);
        if (el) break;
    }

    if (!el) {
        const mainText = document.querySelector('.skipButton .mainText');
        if (mainText && typeof mainText.closest === 'function') {
            el = mainText.closest('button') || mainText.closest('.bottomButton') || mainText.closest('.skipButton');
        }
    }

    if (!el) return false;

    try {
        if (typeof el.click === 'function') el.click();
        const evOpts = { bubbles: true, cancelable: true, view: window };
        el.dispatchEvent(new MouseEvent('mousedown', evOpts));
        el.dispatchEvent(new MouseEvent('mouseup', evOpts));
        el.dispatchEvent(new MouseEvent('click', evOpts));
        return true;
    } catch (_) {
        return false;
    }
}

export function doubleSkipButton() {
    clickSkipButton();
    setTimeout(() => {
        clickSkipButton();
    }, 300);
}

export function unblurToolbar() {
    _updateModalBlockedChrome();
}
