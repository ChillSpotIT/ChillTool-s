import { CURRENT_VERSION } from '../core/state.js';
import { showNotification } from '../ui/toast.js';
import translations from '../i18n/translations.js';

let _getLang = () => 'en';
export function setGetLang(fn) { _getLang = fn; }

export function compareVersions(a, b) {
    const pa = String(a).split('.').map(n => parseInt(n, 10) || 0);
    const pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
        const x = pa[i] || 0;
        const y = pb[i] || 0;
        if (x > y) return 1;
        if (x < y) return -1;
    }
    return 0;
}

export function showOutdatedToast() {
    const lang = _getLang();
    const t = translations[lang] || translations.en;
    const msg = t.outdatedExtension || 'Extension is outdated!';
    showNotification('ChillTools', msg, {
        type: 'error',
        duration: 10000,
        pulse: true,
        onClick: () => {
            window.open('https://github.com/ChillSpotIT/ChillTool-s', '_blank');
        }
    });
}

export function showBetaTesterToast() {
    const lang = _getLang();
    const t = translations[lang] || translations.en;
    const msg = t.betaWelcome || 'Welcome Aboard, Beta Tester!';
    showNotification('ChillTools', msg, {
        type: 'info',
        duration: 5000,
        pulse: true
    });
}

export async function checkOutdatedVersion() {
    try {
        const path = (window.location && window.location.pathname) ? window.location.pathname : '';
        if (!path || !path.startsWith('/video')) return;
        const res = await fetch('https://raw.githubusercontent.com/ChillSpotIT/ChillTool-s/refs/heads/version/version', { cache: 'no-store' });
        if (!res.ok) return;
        const text = (await res.text()) || '';
        const latest = text.replace(/^\uFEFF/, '').replace(/^v/i, '').trim();
        const current = String(CURRENT_VERSION).trim();
        if (!latest) return;
        const cmp = compareVersions(current, latest);
        if (cmp === 0) return;
        if (cmp < 0) {
            showOutdatedToast();
        } else if (cmp > 0) {
            showBetaTesterToast();
        }
    } catch (e) {
    }
}
