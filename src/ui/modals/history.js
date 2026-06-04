let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};
let _connectionHistory = [];
let _showScreenshot = () => {};
let _showInfoWithoutScreenshot = () => {};
let _isHistoryVisible = false;

import { escapeHtml } from '../../core/dom.js';

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.connectionHistory) _connectionHistory = deps.connectionHistory;
    if (deps.showScreenshot) _showScreenshot = deps.showScreenshot;
    if (deps.showInfoWithoutScreenshot) _showInfoWithoutScreenshot = deps.showInfoWithoutScreenshot;
    if (deps.isHistoryVisible !== undefined) _isHistoryVisible = deps.isHistoryVisible;
}

export function setIsHistoryVisible(val) {
    _isHistoryVisible = val;
}

export function displayHistory() {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];

    let initialHistoryLength = _connectionHistory.length;
    let historyUpdateInterval = null;

    const refreshHistoryContent = () => {
        const historyContainer = document.querySelector('#historyModal > div > div:nth-child(2)');
        const footer = document.querySelector('#historyModal > div > div:last-child');
        if (!historyContainer) return;

        const newLength = _connectionHistory.length;
        if (newLength !== initialHistoryLength) {
            initialHistoryLength = newLength;

            historyContainer.innerHTML = `
                <div style="color: #777; font-size: 12px; text-align: center; margin-bottom: 10px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.historyLimit}
                </div>
                ${_connectionHistory.length ?
                    _connectionHistory.map((entry, index, arr) => {
                        const photoAvailable = index < 30;
                        return `
                        <div class="history-entry${!photoAvailable ? ' history-entry-disabled' : ''}" style="margin-bottom: 10px; padding: 12px; background: #1a1a1a; border-radius: 5px; transition: all 0.2s; border-left: 4px solid ${entry.hasScreenshot && photoAvailable ? '#007bff' : '#ff4444'};${!photoAvailable ? ' pointer-events: none; opacity: 0.7; cursor: default;' : ' cursor: pointer;'}" data-ip="${escapeHtml(entry.ip)}" data-has-screenshot="${photoAvailable && entry.hasScreenshot}" data-screenshot="${photoAvailable && entry.hasScreenshot ? (entry.screenshot || '') : ''}">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                <div style="flex: 1; min-width: 0;">
                                    <div class="history-text" style="font-size: 11px; color: #777; margin-bottom: 5px;">${escapeHtml(entry.timestamp)}</div>
                                    <div>
                                        <span style="color: ${entry.hasScreenshot && photoAvailable ? '#007bff' : '#ff4444'}; margin-right: 8px; text-shadow: none;">
                                            ${arr.length - index}.
                                        </span>
                                        <span class="history-text" style="font-weight: bold; color: #4dabf7;">${escapeHtml(entry.ip)}</span>
                                    </div>
                                    <div class="history-text" style="font-size: 13px; color: #aaa; margin-top: 5px;">
                                        ${escapeHtml(entry.info?.city) || '-'}, ${escapeHtml(entry.info?.region) || '-'}, ${escapeHtml(entry.info?.country) || '-'}
                                    </div>
                                </div>
                                ${entry.hasScreenshot && photoAvailable ?
                                    `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; overflow: hidden; border: 1px solid #333; flex-shrink: 0;">
                                        <img src="${entry.screenshot}" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>` :
                                    `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; background: #222; display: flex; justify-content: center; align-items: center; color: #555; font-size: 20px; flex-shrink: 0;">
                                        <i class="fas fa-user-slash"></i>
                                    </div>`}
                            </div>
                            ${!photoAvailable ? `<div style='background:#ff4444; color:white; font-size:15px; margin-top:10px; border-radius:6px; padding:6px 12px; display:flex; align-items:center; gap:6px;'><i class='fas fa-exclamation-triangle' style='font-size:16px'></i> ${t.skip25Msg}</div>` : ''}
                        </div>
                        `;
                    }).join('') :
                    `<div style="text-align: center; color: #777; padding: 40px 20px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-inbox" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>
                        ${t.emptyHistory}<br><small>${t.connectToStart}</small></div>`}
            `;

            if (footer) {
                footer.innerHTML = `${_connectionHistory.length === 0 ? t.zero : _connectionHistory.length + ' ' + (_connectionHistory.length === 1 ? t.entry : t.entries)}`;
            }

            document.querySelectorAll('.history-entry').forEach(entry => {
                if(entry.classList.contains('history-entry-disabled')) return;
                entry.addEventListener('click', function() {
                    const ip = this.getAttribute('data-ip');
                    const hasScreenshot = this.getAttribute('data-has-screenshot') === 'true';
                    const screenshot = this.getAttribute('data-screenshot');
                    const historyItem = _connectionHistory.find(item => item.ip === ip);
                    if (historyItem) {
                        if (hasScreenshot) {
                            const entryIndex = _connectionHistory.findIndex(item => item.ip === historyItem.ip && item.timestamp === historyItem.timestamp);
                            _showScreenshot(screenshot, historyItem, entryIndex);
                        } else if(historyItem.hasScreenshot) {
                            alert(t.photoNotAvailable + "\n\n" + t.skip25Msg);
                        } else {
                            _showInfoWithoutScreenshot(historyItem);
                        }
                    }
                });
            });
        }
    };

    const modalHTML = `
    <div id="historyModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 600px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #007bff, #6610f2); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-history"></i> ${t.history}
                </h3>
                <button id="closeHistory" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
            </div>
            <div style="padding: 15px; overflow-y: scroll; flex-grow: 1; min-height: 150px;">
                <div style="color: #777; font-size: 12px; text-align: center; margin-bottom: 10px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.historyLimit}
                </div>
                ${_connectionHistory.length ?
                    _connectionHistory.map((entry, index, arr) => {
                        const photoAvailable = index < 30;
                        return `
                        <div class="history-entry${!photoAvailable ? ' history-entry-disabled' : ''}" style="margin-bottom: 10px; padding: 12px; background: #1a1a1a; border-radius: 5px; transition: all 0.2s; border-left: 4px solid ${entry.hasScreenshot && photoAvailable ? '#007bff' : '#ff4444'};${!photoAvailable ? ' pointer-events: none; opacity: 0.7; cursor: default;' : ' cursor: pointer;'}" data-ip="${escapeHtml(entry.ip)}" data-has-screenshot="${photoAvailable && entry.hasScreenshot}" data-screenshot="${photoAvailable && entry.hasScreenshot ? (entry.screenshot || '') : ''}">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                <div style="flex: 1; min-width: 0;">
                                    <div class="history-text" style="font-size: 11px; color: #777; margin-bottom: 5px;">${escapeHtml(entry.timestamp)}</div>
                                    <div>
                                        <span style="color: ${entry.hasScreenshot && photoAvailable ? '#007bff' : '#ff4444'}; margin-right: 8px; text-shadow: none;">
                                            ${arr.length - index}.
                                        </span>
                                        <span class="history-text" style="font-weight: bold; color: #4dabf7;">${escapeHtml(entry.ip)}</span>
                                    </div>
                                    <div class="history-text" style="font-size: 13px; color: #aaa; margin-top: 5px;">
                                        ${escapeHtml(entry.info?.city) || '-'}, ${escapeHtml(entry.info?.region) || '-'}, ${escapeHtml(entry.info?.country) || '-'}
                                    </div>
                                </div>
                                ${entry.hasScreenshot && photoAvailable ?
                                    `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; overflow: hidden; border: 1px solid #333; flex-shrink: 0;">
                                        <img src="${entry.screenshot}" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>` :
                                    `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; background: #222; display: flex; justify-content: center; align-items: center; color: #555; font-size: 20px; flex-shrink: 0;">
                                        <i class="fas fa-user-slash"></i>
                                    </div>`}
                            </div>
                            ${!photoAvailable ? `<div style='background:#ff4444; color:white; font-size:15px; margin-top:10px; border-radius:6px; padding:6px 12px; display:flex; align-items:center; gap:6px;'><i class='fas fa-exclamation-triangle' style='font-size:16px'></i> ${t.skip25Msg}</div>` : ''}
                        </div>
                        `;
                    }).join('') :
                    `<div style="text-align: center; color: #777; padding: 40px 20px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-inbox" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>
                        ${t.emptyHistory}<br><small>${t.connectToStart}</small></div>`}
            </div>
            <div style="padding: 10px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                ${_connectionHistory.length === 0 ? t.zero : _connectionHistory.length + ' ' + (_connectionHistory.length === 1 ? t.entry : t.entries)}
            </div>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody('beforeend', modalHTML);
    const historyModal = document.getElementById('historyModal');
    if (historyModal) {
        historyUpdateInterval = setInterval(refreshHistoryContent, 1000);

        historyModal.addEventListener('click', (e) => {
            if (e.target === historyModal) {
                if (historyUpdateInterval) clearInterval(historyUpdateInterval);
                document.getElementById('historyModal').remove();
                _isHistoryVisible = false;
            }
        });
    }
    document.querySelectorAll('.history-entry').forEach(entry => {
        if(entry.classList.contains('history-entry-disabled')) return;
        entry.addEventListener('click', function() {
            const ip = this.getAttribute('data-ip');
            const hasScreenshot = this.getAttribute('data-has-screenshot') === 'true';
            const screenshot = this.getAttribute('data-screenshot');
            const historyItem = _connectionHistory.find(item => item.ip === ip);
            if (historyItem) {
                if (hasScreenshot) {
                    const entryIndex = _connectionHistory.findIndex(item => item.ip === historyItem.ip && item.timestamp === historyItem.timestamp);
                    _showScreenshot(screenshot, historyItem, entryIndex);
                } else if(historyItem.hasScreenshot) {
                    alert(t.photoNotAvailable + "\n\n" + t.skip25Msg);
                } else {
                    _showInfoWithoutScreenshot(historyItem);
                }
            }
        });
    });

    document.getElementById('closeHistory').addEventListener('click', () => {
        if (historyUpdateInterval) clearInterval(historyUpdateInterval);
        document.getElementById('historyModal').remove();
        _isHistoryVisible = false;
    });
}
