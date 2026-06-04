const REVIEW_URL = 'https://chromewebstore.google.com/detail/pdkdjcijjkhhkfdfbdgdfdgobnliphjd/reviews';
const REVIEW_SNOOZE_MS = 30 * 24 * 60 * 60 * 1000;

let _getTimeElapsed = () => 0;

export function setGetTimeElapsed(fn) { _getTimeElapsed = fn; }

export function showReviewPrompt() {
    if (document.getElementById('reviewModal')) return;

    const overlay = document.createElement('div');
    overlay.id = 'reviewModal';
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.background = 'rgba(0,0,0,0.6)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '10001';

    const box = document.createElement('div');
    box.style.maxWidth = '560px';
    box.style.width = '90%';
    box.style.background = '#111';
    box.style.color = '#fff';
    box.style.border = '1px solid #333';
    box.style.borderRadius = '12px';
    box.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
    box.style.padding = '24px';
    box.style.fontFamily = 'Arial, sans-serif';
    box.style.textAlign = 'center';

    const title = document.createElement('div');
    title.style.fontSize = '24px';
    title.style.fontWeight = '600';
    title.style.marginBottom = '12px';
    const lang = typeof getLang === 'function' ? getLang() : (localStorage.getItem('chilltool_lang') || 'en');
    const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : translations.en;
    title.textContent = t.reviewTitle || 'Enjoying ChillTool\'s?';

    const body = document.createElement('div');
    body.style.fontSize = '16px';
    body.style.color = '#ddd';
    body.style.marginBottom = '18px';
    body.textContent = t.reviewBody || 'If you like it, please leave a 5-star review. It helps a lot!';

    const btnRow = document.createElement('div');
    btnRow.style.display = 'flex';
    btnRow.style.gap = '12px';
    btnRow.style.justifyContent = 'center';

    const later = document.createElement('button');
    later.type = 'button';
    later.textContent = t.reviewLater || 'Maybe later';
    later.style.padding = '12px 18px';
    later.style.borderRadius = '10px';
    later.style.border = '1px solid #444';
    later.style.background = '#222';
    later.style.color = '#fff';
    later.style.cursor = 'pointer';
    later.style.fontSize = '15px';

    const ok = document.createElement('button');
    ok.type = 'button';
    ok.textContent = t.reviewOk || 'OK';
    ok.style.padding = '12px 18px';
    ok.style.borderRadius = '10px';
    ok.style.border = '0';
    ok.style.background = '#2563eb';
    ok.style.color = '#fff';
    ok.style.cursor = 'pointer';
    ok.style.fontSize = '15px';

    btnRow.append(later, ok);
    box.append(title, body, btnRow);
    overlay.append(box);
    document.body.append(overlay);

    later.addEventListener('click', () => {
        localStorage.setItem('reviewPromptSnoozeUntil', String(Date.now() + REVIEW_SNOOZE_MS));
        overlay.remove();
    });

    ok.addEventListener('click', () => {
        localStorage.setItem('reviewLeft', 'true');
        overlay.remove();
        if (window.chrome && chrome.tabs && chrome.tabs.create) {
            chrome.tabs.create({ url: REVIEW_URL });
        } else {
            window.open(REVIEW_URL, '_blank', 'noopener');
        }
    });
}

export function checkAndMaybePromptReview() {
    if (localStorage.getItem('reviewLeft') === 'true') return;
    const snoozeUntil = parseInt(localStorage.getItem('reviewPromptSnoozeUntil') || '0', 10);
    if (Date.now() < snoozeUntil) return;
    const totalSeconds = _getTimeElapsed();
    if (totalSeconds >= 3600) {
        showReviewPrompt();
    }
}
