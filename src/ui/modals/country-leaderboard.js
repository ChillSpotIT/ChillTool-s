let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};
let _getSortedCountryLeaderboard = () => ({ entries: [], total: 0 });
let _resetLeaderboardDedup = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.getSortedCountryLeaderboard) _getSortedCountryLeaderboard = deps.getSortedCountryLeaderboard;
    if (deps.resetLeaderboardDedup) _resetLeaderboardDedup = deps.resetLeaderboardDedup;
}

const COUNTRY_LEADERBOARD_STORAGE_KEY = 'countryLeaderboardCounts';

export function showCountryLeaderboard() {
    const lang = _getLang();
    const t = _translations[lang] || _translations['en'];
    const tEn = _translations['en'] || {};

    const existing = document.getElementById('countryLeaderboardModal');
    if (existing) existing.remove();

    const { entries, total } = _getSortedCountryLeaderboard();
    const uniqueCountries = entries.length;

    const rowsHtml = entries.length === 0
        ? `<div style="color:#aaa; text-align:center; padding: 10px 0;">${t.countryLeaderboardNoData || tEn.countryLeaderboardNoData || 'No data'}</div>`
        : entries.map((e, idx) => {
            const pct = total > 0 ? ((e.count / total) * 100) : 0;
            const pctText = `${pct.toFixed(4)}%`;

            const medalColor = idx === 0 ? '#d4af37' : idx === 1 ? '#c0c0c0' : idx === 2 ? '#cd7f32' : null;
            const rankColorStyle = medalColor ? `color:${medalColor}; font-weight:800;` : 'color:#666;';
            const countryColorStyle = medalColor ? `color:${medalColor}; font-weight:800;` : 'color:#fff; font-weight:600;';
            return `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="display:flex; flex-direction:column; gap:2px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="${rankColorStyle} min-width: 24px; text-align:right;">${idx + 1}.</span>
                            <div data-country="${e.country}" style="${countryColorStyle}">${e.country}</div>
                        </div>
                        <div style="color:#777; font-size:12px; padding-left:32px;">${pctText}</div>
                    </div>
                    <div style="color:#fff; font-weight:700;">${e.count}</div>
                </div>
            `;
        }).join('');

    const modalHtml = `
        <div id="countryLeaderboardModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 10001; display: flex; justify-content: center; align-items: center;">
            <div style="background: #111; border-radius: 10px; width: 92%; max-width: 540px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display:flex; flex-direction:column;">
                <div style="padding: 15px; background: linear-gradient(to right, #11998e, #38ef7d); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                    <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-globe"></i> ${t.countryLeaderboardTitle || tEn.countryLeaderboardTitle || 'Country leaderboard'}
                    </h3>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button id="clearCountryLeaderboardBtn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 12px; cursor: pointer; padding: 4px 10px; border-radius: 4px;" title="${t.countryLeaderboardClear || tEn.countryLeaderboardClear || 'Clear leaderboard'}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button id="closeCountryLeaderboardBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
                    </div>
                </div>
                <div style="padding: 16px 20px; overflow-y:auto; flex-grow:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                        <span style="color:#aaa;">${t.countryLeaderboardTotalCountries || tEn.countryLeaderboardTotalCountries || 'Total countries encountered:'}</span>
                        <span style="color:#fff; font-weight:700;">${uniqueCountries}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px 15px;">
                        ${rowsHtml}
                    </div>
                </div>
                <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    chilltools.it
                </div>
            </div>
        </div>
    `;

    _insertAdjacentHTMLToBody('beforeend', modalHtml);

    const close = () => {
        const modal = document.getElementById('countryLeaderboardModal');
        if (modal) modal.remove();
    };

    const closeBtn = document.getElementById('closeCountryLeaderboardBtn');
    if (closeBtn) closeBtn.onclick = close;

    const clearBtn = document.getElementById('clearCountryLeaderboardBtn');
    if (clearBtn) clearBtn.onclick = function() {
        if (confirm(t.countryLeaderboardClearConfirm || tEn.countryLeaderboardClearConfirm || 'Clear the entire country leaderboard?')) {
            localStorage.removeItem(COUNTRY_LEADERBOARD_STORAGE_KEY);
            _resetLeaderboardDedup();
            close();
        }
    };

    const modal = document.getElementById('countryLeaderboardModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === this) close();
        };
    }
}
