const COUNTRY_LEADERBOARD_STORAGE_KEY = 'countryLeaderboardCounts';

let lastCountryCountedIP = null;
let currentStreakCountry = null;
let currentStreakCount = 0;

function safeJsonParse(value, fallback) {
    try {
        if (value == null) return fallback;
        return JSON.parse(value);
    } catch (_) {
        return fallback;
    }
}

function normalizeCountryKey(countryName) {
    if (!countryName) return null;
    const s = String(countryName).trim();
    if (!s) return null;
    return s;
}

function getCountryCounts() {
    const raw = localStorage.getItem(COUNTRY_LEADERBOARD_STORAGE_KEY);
    const parsed = safeJsonParse(raw, {});
    if (!parsed || typeof parsed !== 'object') return {};
    return parsed;
}

function setCountryCounts(counts) {
    if (!counts || typeof counts !== 'object') return;
    localStorage.setItem(COUNTRY_LEADERBOARD_STORAGE_KEY, JSON.stringify(counts));
}

function incrementCountryCount(countryName) {
    const key = normalizeCountryKey(countryName);
    if (!key) return;
    const counts = getCountryCounts();
    const current = parseInt(counts[key] || '0', 10) || 0;
    counts[key] = current + 1;
    setCountryCounts(counts);
}

function getPartnerCountryFromDom() {
    try {
        const el = document.getElementById('countryName');
        if (!el) return null;
        const name = (el.textContent || '').trim();
        return name || null;
    } catch (_) {
        return null;
    }
}

function incrementLeaderboardForCurrentPartner(ip, fallbackCountryName) {
    if (!ip) return;
    if (lastCountryCountedIP === ip) return;

    const fromDom = getPartnerCountryFromDom();
    const countryToUse = fromDom || fallbackCountryName;
    if (!countryToUse) return;

    incrementCountryCount(countryToUse);
    lastCountryCountedIP = ip;
}

function updateCountryStreak(country) {
    if (!country || country === 'N/A') return;
    if (country === currentStreakCountry) {
        currentStreakCount++;
    } else {
        currentStreakCountry = country;
        currentStreakCount = 1;
    }
}

function getStreakBadgeHtml() {
    if (currentStreakCount < 3) return '';
    const emoji = currentStreakCount >= 10 ? '🔥' : currentStreakCount >= 5 ? '⚡' : '🔁';
    return `<span style="
        display: inline-block;
        margin-left: 8px;
        background: linear-gradient(to right, #f7971e, #ffd200);
        color: #000;
        font-size: 11px;
        font-weight: 800;
        padding: 2px 7px;
        border-radius: 10px;
        vertical-align: middle;
        text-shadow: none;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    ">${emoji} x${currentStreakCount}</span>`;
}

function getSortedCountryLeaderboard() {
    const counts = getCountryCounts();
    const entries = Object.entries(counts)
        .map(([country, count]) => ({ country, count: parseInt(count, 10) || 0 }))
        .filter(e => e.country && e.count > 0)
        .sort((a, b) => b.count - a.count || a.country.localeCompare(b.country));

    const total = entries.reduce((sum, e) => sum + e.count, 0);
    return { entries, total };
}

export {
    safeJsonParse,
    normalizeCountryKey,
    getCountryCounts,
    setCountryCounts,
    incrementCountryCount,
    getPartnerCountryFromDom,
    incrementLeaderboardForCurrentPartner,
    updateCountryStreak,
    getStreakBadgeHtml,
    getSortedCountryLeaderboard
};
