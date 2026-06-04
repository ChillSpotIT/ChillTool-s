let isSaveButtonChoiceEnabled = localStorage.getItem('saveButtonChoice') === 'true';
let _isIpDisplayEnabled = true;

if (isSaveButtonChoiceEnabled) {
    const savedIpDisplay = localStorage.getItem('ipDisplayEnabled');
    if (savedIpDisplay !== null) {
        _isIpDisplayEnabled = savedIpDisplay === 'true';
    }
}

export function getIsIpDisplayEnabled() { return _isIpDisplayEnabled; }
export function setIsIpDisplayEnabled(val) { _isIpDisplayEnabled = val; }
export { isSaveButtonChoiceEnabled };

export function getCookie(name) {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
}

export const CURRENT_VERSION = '4.0.2';
export const COUNTRY_LEADERBOARD_STORAGE_KEY = 'countryLeaderboardCounts';
export let lastCountryCountedIP = null;
export let currentStreakCountry = null;
export let currentStreakCount = 0;

export function getIpDisplayPreference() {
    return false;
}

export function setIpDisplayPreference(show) {
    const ipDisplayBox = document.getElementById('ipDisplayBox');
    if (ipDisplayBox) {
        ipDisplayBox.style.display = show ? 'block' : 'none';
        if (!show && _isIpDisplayEnabled) {
            ipDisplayBox.style.display = 'block';
        }
    }
}

export function saveButtonChoice(buttonId, action) {
    if (!isSaveButtonChoiceEnabled) return;

    const choices = JSON.parse(localStorage.getItem('buttonChoices') || '{}');
    choices[buttonId] = action;
    localStorage.setItem('buttonChoices', JSON.stringify(choices));
}

export function loadButtonChoice(buttonId) {
    if (!isSaveButtonChoiceEnabled) return null;

    const choices = JSON.parse(localStorage.getItem('buttonChoices') || '{}');
    return choices[buttonId] || null;
}
