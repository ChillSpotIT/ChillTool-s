let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
}

export function showInfoWithoutScreenshot(entry) {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];
    const info = entry.info || {};
    const modalHTML = `
    <div id="infoModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #1a1a1a; border-radius: 10px; width: 90%; max-width: 500px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.8); border: 1px solid #333;">
            <div class="history-text" style="color: white; margin-bottom: 15px;">
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.ip}:</span> <span style="user-select: all;">${entry.ip}</span></div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.time}:</span> ${entry.timestamp}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.city}:</span> ${info.city || '-'}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.region}:</span> ${info.region || '-'}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.country}:</span> ${info.country || '-'}</div>
                <div><span style="color: #4dabf7; font-weight: bold;">${t.coordinates}:</span> (${info.latitude || '-'}, ${info.longitude || '-'})</div>
            </div>
            <button onclick="document.getElementById('infoModal').remove()" style="background: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#0069d9'" onmouseout="this.style.background='#007bff'">
                <i class="fas fa-times"></i> ${t.close}
            </button>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody('beforeend', modalHTML);
}
