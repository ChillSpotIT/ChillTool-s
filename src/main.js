// Core
import { injectToHead, injectToBody, insertAdjacentHTMLToBody, updateModalBlockedChrome, setIsMobile, CHILL_TOOLBAR_DEFAULT_Z_INDEX } from './core/dom.js';
import { getCookie, CURRENT_VERSION } from './core/state.js';

// i18n
import translations from './i18n/translations.js';

// UI
import { injectCoreStyles } from './ui/styles.js';
import { showNotification, showWelcomeNotification, setGetLang as setToastGetLang } from './ui/toast.js';
import { isMobile, isVideoPage, updateToolbarVisibility, createToolbar, restartConnection, clickSkipButton, doubleSkipButton, unblurToolbar, setDeps as setToolbarDeps } from './ui/toolbar.js';

// Modals
import { showSettings, setDeps as setSettingsDeps } from './ui/modals/settings.js';
import { displayBannedUsers, setDeps as setBanListDeps } from './ui/modals/ban-list.js';
import { showCountryFilterModal, getSelectedCountries, saveSelectedCountries, setDeps as setCountryFilterDeps } from './ui/modals/country-filter.js';
import { showCountryLeaderboard, setDeps as setLeaderboardModalDeps } from './ui/modals/country-leaderboard.js';
import { displayHistory, setDeps as setHistoryDeps } from './ui/modals/history.js';
import { showScreenshot, downloadImage, setDeps as setScreenshotViewerDeps } from './ui/modals/screenshot-viewer.js';
import { showInfoWithoutScreenshot, setDeps as setInfoDeps } from './ui/modals/info-without-screenshot.js';
import { showUserStylesModal, setDeps as setUserStylesDeps } from './ui/modals/userstyles.js';
import { showGalleryModal, setDeps as setGalleryDeps } from './ui/modals/gallery.js';
import { showStatistics, setDeps as setStatisticsDeps } from './ui/modals/statistics.js';
import { showTosModal, setDeps as setTosDeps } from './ui/modals/tos.js';
import { showReviewPrompt, checkAndMaybePromptReview, setGetTimeElapsed as setReviewGetTimeElapsed } from './ui/modals/review-prompt.js';

// Theme
import { checkBackgroundColor, setupBackgroundObserver, getChatBoxColor } from './ui/theme/dark-light.js';
import { showColorModal, restoreColorStyle, setDeps as setColorPickerDeps } from './ui/theme/color-picker.js';
import predefinedStyles from './ui/theme/userstyles-data.js';

// Features
import { getLocation, getOrCreateIpBox, setDeps as setIpDisplayDeps } from './features/ip-display.js';
import { handleNewIP, setDeps as setIpHandlerDeps } from './features/ip-handler.js';
import { captureAndStoreScreenshot, currentSession, connectionHistory } from './features/screenshot.js';
import { getBannedUsers, saveBannedUsers } from './features/ban.js';
import { incrementPeopleCount, updatePeopleCounter, getPeopleCount } from './features/people-counter.js';
import { getSkipCount, setupSkipCounter } from './features/skip-counter.js';
import { incrementLeaderboardForCurrentPartner, getSortedCountryLeaderboard } from './features/country-leaderboard.js';
import { compareVersions, checkOutdatedVersion, setGetLang as setVersionGetLang } from './features/version-check.js';

// Timer
import { formatTime, getTimeElapsed, updateTimeElapsed, setReviewCheck } from './timer/session-timer.js';
import { initVideoTabTimer, setDeps as setVideoTabTimerDeps } from './timer/video-tab-timer.js';

// Branding
import { addLogo, replaceLogo, replaceUmingle, setDeps as setLogoDeps } from './branding/logo.js';

// ===== SHARED STATE =====
const translationsRef = translations;
let currentLang = () => localStorage.getItem('lang') || 'en';

// ===== WIRE DEPENDENCIES =====

// Toolbar
setToolbarDeps({
    getLang: currentLang,
    translations: translationsRef,
    showSettings,
    displayHistory,
    displayBannedUsers,
    showCountryFilterModal,
    getBannedUsers,
    saveBannedUsers,
    currentSession,
    showNotification,
    updateModalBlockedChrome,
});

// Common deps for modals
const commonDeps = { getLang: currentLang, translations: translationsRef, showNotification, insertAdjacentHTMLToBody, unblurToolbar };

// Modal wiring
setSettingsDeps({
    ...commonDeps,
    injectToHead,
    showUserStylesModal,
    showTosModal,
    showStatistics,
    setIpDisplayPreference: () => {},
    getIpDisplayPreference: () => false,
    saveButtonChoice: () => {},
    updateButtonTitles: () => {},
    isMobile
});
setBanListDeps({ ...commonDeps, showScreenshot });
setCountryFilterDeps(commonDeps);
setLeaderboardModalDeps({ ...commonDeps, getSortedCountryLeaderboard });
setHistoryDeps({ ...commonDeps, showScreenshot, showInfoWithoutScreenshot, connectionHistory });
setScreenshotViewerDeps({
    ...commonDeps,
    connectionHistory,
    getBannedUsers,
    saveBannedUsers,
    isUmingle: window.location.hostname.includes('umingle')
});
setInfoDeps(commonDeps);
setUserStylesDeps({ ...commonDeps, injectToHead, showGalleryModal });
setGalleryDeps({ ...commonDeps, injectToHead, predefinedStyles });
setStatisticsDeps({ ...commonDeps, formatTime, getTimeElapsed, getPeopleCount, getSkipCount, showCountryLeaderboard });
setTosDeps({ ...commonDeps, injectToBody });
setColorPickerDeps(commonDeps);
setReviewGetTimeElapsed(getTimeElapsed);

// Feature wiring
setIpDisplayDeps({ getChatBoxColor, checkBackgroundColor });
setIpHandlerDeps({ getLang: currentLang, translations: translationsRef, doubleSkipButton, getSelectedCountries, showNotification });
setVersionGetLang(currentLang);
setLogoDeps({
    isMobile,
    isUmingle: window.location.hostname.includes('umingle'),
    isUhmegle: window.location.hostname.includes('uhmegle'),
    baseUrl: window.location.hostname.includes('umingle') ? 'https://umingle.com' : 'https://uhmegle.com'
});

// Timer wiring
setReviewCheck(checkAndMaybePromptReview);
setVideoTabTimerDeps({ isMobile, formatTime, injectToBody });

// DOM wiring
setIsMobile(isMobile);

// ===== CORE CSS =====
injectCoreStyles();

// ===== VIDEO BORDER COLOR (pre-toolbar) =====
if (window.location.pathname.includes('/video')) {
    const savedColor = getCookie('videoBorderColor') || localStorage.getItem('videoBorderColor');
    if (savedColor) {
        const styleElement = document.createElement('style');
        styleElement.id = 'rightBoxStyle';
        styleElement.textContent = `
            .dark-mode .rightBox, .dark-mode .bottomButton, .dark-mode header,
            .dark-mode .inputContainer textarea, .dark-mode .gif, .dark-mode .inputContainer {
                background-color: ${savedColor} !important;
                transition: background-color 0.3s ease;
            }
            .rightBox, .bottomButton, header, .inputContainer textarea, .gif, .inputContainer {
                background-color: ${savedColor} !important;
                transition: background-color 0.3s ease;
            }
        `;
        injectToHead(styleElement);
    }
}

// ===== FONTAWESOME =====
(function loadFontAwesome() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
    link.onerror = () => { link.href = 'https://stackpath.bootstrapcdn.com/font-awesome/5.15.4/css/all.min.css'; };
    injectToHead(link);
})();

// ===== SITE DETECTION =====
const isUhmegle = window.location.hostname.includes('uhmegle');
const isUmingle = window.location.hostname.includes('umingle');
const baseUrl = isUmingle ? 'https://umingle.com' : 'https://uhmegle.com';

// ===== HOMEPAGE/TEXT NOTIFICATIONS =====
if (window.location.pathname === '/' || window.location.pathname === '') {
    setTimeout(() => {
        showNotification(
            translations[currentLang()]?.switchToVideoModeTitle || 'Switch to Video Mode',
            translations[currentLang()]?.switchToVideoModeMessage || 'This extension only works in video mode',
            { type: 'warning', duration: 8000, onClick: () => { window.location.href = baseUrl + '/video'; } }
        );
    }, 2000);
}
if (window.location.pathname.includes('/text')) {
    setTimeout(() => {
        showNotification(
            translations[currentLang()]?.textModeNotSupportedTitle || 'Text Mode Not Supported',
            translations[currentLang()]?.textModeNotSupportedMessage || 'This extension only works in video mode',
            { type: 'warning', duration: 8000 }
        );
    }, 2000);
}

// ===== SESSION + IP EVENT =====
window.addEventListener('chilltools-ip-found', (e) => {
    handleNewIP(e.detail.ip);
});

// ===== SKIP COUNTER =====
setupSkipCounter();

// ===== MODAL OBSERVER =====
const modalObserver = new MutationObserver(() => updateModalBlockedChrome());
modalObserver.observe(document.documentElement, { childList: true, subtree: true });

// ===== INIT =====
function init() {
    const pollForChat = setInterval(() => {
        const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow');
        if (chatContainer) {
            clearInterval(pollForChat);
            checkBackgroundColor();
            createToolbar();
            addLogo();
            replaceLogo();
            replaceUmingle();
            setupBackgroundObserver();

            const savedStyles = localStorage.getItem('chilltool_userStyles');
            if (savedStyles) {
                const existing = document.getElementById('chilltool-user-styles');
                if (existing) existing.remove();
                const style = document.createElement('style');
                style.id = 'chilltool-user-styles';
                style.textContent = savedStyles;
                injectToHead(style);
            }
        }
    }, 500);
}

function checkAndShowTos() {
    if (!localStorage.getItem('tosAccepted')) {
        showTosModal();
    }
}

// ===== BOOT SEQUENCE =====
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        updateToolbarVisibility();
        init();
        checkAndShowTos();
    });
} else {
    updateToolbarVisibility();
    init();
    checkAndShowTos();
}

// ===== FINAL INIT =====
if (!localStorage.getItem('lastUpdateTime')) {
    localStorage.setItem('lastUpdateTime', Math.floor(Date.now() / 1000).toString());
}
setInterval(updateTimeElapsed, 1000);
updateTimeElapsed();

// Statistics button click delegation
document.addEventListener('click', function(e) {
    if (e.target && e.target.id === 'showStatisticsBtn') {
        showStatistics();
    }
});

// Version check after 3s
setTimeout(checkOutdatedVersion, 3000);

// Welcome notification after 1s
setTimeout(showWelcomeNotification, 1000);
