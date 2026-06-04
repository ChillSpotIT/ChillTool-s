let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};
let _connectionHistory = [];
let _getBannedUsers = () => [];
let _saveBannedUsers = () => {};
let _isUmingle = false;

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.connectionHistory) _connectionHistory = deps.connectionHistory;
    if (deps.getBannedUsers) _getBannedUsers = deps.getBannedUsers;
    if (deps.saveBannedUsers) _saveBannedUsers = deps.saveBannedUsers;
    if (deps.isUmingle !== undefined) _isUmingle = deps.isUmingle;
}

export function downloadImage(imageSrc, fileName) {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = fileName || 'screenshot.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function showScreenshot(screenshot, entry, entryIndex = null) {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];
    const info = entry.info || {};

    if (entryIndex === null) {
        entryIndex = _connectionHistory.findIndex(item => item.ip === entry.ip && item.timestamp === entry.timestamp);
    }
    const modalHTML = `
    <div id="screenshotModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #1a1a1a; border-radius: 10px; width: 90%; max-width: 500px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.8); border: 1px solid #333;">
            <div style="position: relative;">
                <button id="nextScreenshotBtn" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: 1px solid #4dabf7; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#4dabf7'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.next || 'Next'}">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button id="prevScreenshotBtn" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: 1px solid #4dabf7; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#4dabf7'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.previous || 'Previous'}">
                    <i class="fas fa-chevron-right"></i>
                </button>

                <button id="blockUserBtn" style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; border: 1px solid #dc3545; border-radius: 5px; padding: 5px 10px; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#dc3545'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.blockUser || 'Block User'}">
                    <i class="fas fa-ban"></i>
                </button>

                <button id="downloadScreenshotBtn" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; border: 1px solid #4dabf7; border-radius: 5px; padding: 5px 10px; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#4dabf7'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.download || 'Download'}">
                    <i class="fas fa-download"></i>
                </button>
                <div style="max-height: 60vh; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; background: #000; border-radius: 5px;">
                    <img id="screenshotImage" src="${screenshot}" style="max-width: 100%; max-height: 60vh; display: block;">
                </div>
            </div>
            <div class="history-text" style="color: white; margin-bottom: 15px;">
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.ip}:</span> <span style="user-select: all;">${entry.ip}</span></div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.time}:</span> ${entry.timestamp}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.city}:</span> ${info.city || '-'}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.region}:</span> ${info.region || '-'}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.country}:</span> ${info.country || '-'}</div>
                <div><span style="color: #4dabf7; font-weight: bold;">${t.coordinates}:</span> (${info.latitude || '-'}, ${info.longitude || '-'})</div>
            </div>
            <button onclick="document.getElementById('screenshotModal').remove()" style="background: #dc3545; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%; transition: background 0.2s;"
                    onmouseover="this.style.background='#c82333'"
                    onmouseout="this.style.background='#dc3545'">
                <i class="fas fa-times"></i> ${t.close || 'Close'}
            </button>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', modalHTML);

    const modalElement = document.getElementById('screenshotModal');
    const blockUserBtn = document.getElementById('blockUserBtn');
    const prevBtn = document.getElementById('prevScreenshotBtn');
    const nextBtn = document.getElementById('nextScreenshotBtn');

    let currentIndex = entryIndex;

    const hasScreenshotInDirection = (fromIndex, direction) => {
        let idx = fromIndex + direction;
        while (idx >= 0 && idx < _connectionHistory.length) {
            const e = _connectionHistory[idx];
            if (e && e.hasScreenshot && e.screenshot) return true;
            idx += direction;
        }
        return false;
    };

    const updateArrows = () => {
        const pBtn = document.getElementById('prevScreenshotBtn');
        const nBtn = document.getElementById('nextScreenshotBtn');
        if (pBtn) pBtn.style.display = hasScreenshotInDirection(currentIndex, -1) ? 'flex' : 'none';
        if (nBtn) nBtn.style.display = hasScreenshotInDirection(currentIndex, 1) ? 'flex' : 'none';
    };

    updateArrows();

    const navigateScreenshot = (direction) => {
        let newIndex = currentIndex + direction;
        while (newIndex >= 0 && newIndex < _connectionHistory.length) {
            const newEntry = _connectionHistory[newIndex];
            if (newEntry && newEntry.hasScreenshot && newEntry.screenshot) {
                clearInterval(screenshotUpdateInterval);
                document.removeEventListener('keydown', handleKeyDown);
                modalElement.remove();
                showScreenshot(newEntry.screenshot, newEntry, newIndex);
                return;
            }
            newIndex += direction;
        }
    };

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateScreenshot(-1);
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navigateScreenshot(1);
        });
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            navigateScreenshot(1);
        } else if (e.key === 'ArrowRight') {
            navigateScreenshot(-1);
        } else if (e.key === 'Escape') {
            clearInterval(screenshotUpdateInterval);
            modalElement.remove();
            document.removeEventListener('keydown', handleKeyDown);
        }
    };

    document.addEventListener('keydown', handleKeyDown);

    let screenshotUpdateInterval = setInterval(() => {
        const modalStillOpen = document.getElementById('screenshotModal');
        if (!modalStillOpen) {
            clearInterval(screenshotUpdateInterval);
            return;
        }

        const foundIndex = _connectionHistory.findIndex(item => item.ip === entry.ip && item.timestamp === entry.timestamp);

        if (foundIndex === -1) {
            let redirectIndex = -1;
            const searchStart = Math.min(currentIndex, _connectionHistory.length - 1);
            for (let i = searchStart; i >= 0; i--) {
                if (_connectionHistory[i]?.hasScreenshot && _connectionHistory[i]?.screenshot) {
                    redirectIndex = i;
                    break;
                }
            }
            if (redirectIndex === -1) {
                for (let i = searchStart + 1; i < _connectionHistory.length; i++) {
                    if (_connectionHistory[i]?.hasScreenshot && _connectionHistory[i]?.screenshot) {
                        redirectIndex = i;
                        break;
                    }
                }
            }
            clearInterval(screenshotUpdateInterval);
            document.removeEventListener('keydown', handleKeyDown);
            modalElement.remove();
            if (redirectIndex !== -1) {
                const nextEntry = _connectionHistory[redirectIndex];
                showScreenshot(nextEntry.screenshot, nextEntry, redirectIndex);
            }
            return;
        }

        const currentEntry = _connectionHistory[foundIndex];
        const screenshotLost = !currentEntry.hasScreenshot || !currentEntry.screenshot;

        if (screenshotLost) {
            let redirectIndex = -1;
            for (let i = foundIndex - 1; i >= 0; i--) {
                if (_connectionHistory[i]?.hasScreenshot && _connectionHistory[i]?.screenshot) {
                    redirectIndex = i;
                    break;
                }
            }
            if (redirectIndex === -1) {
                for (let i = foundIndex + 1; i < _connectionHistory.length; i++) {
                    if (_connectionHistory[i]?.hasScreenshot && _connectionHistory[i]?.screenshot) {
                        redirectIndex = i;
                        break;
                    }
                }
            }
            clearInterval(screenshotUpdateInterval);
            document.removeEventListener('keydown', handleKeyDown);
            modalElement.remove();
            if (redirectIndex !== -1) {
                const nextEntry = _connectionHistory[redirectIndex];
                showScreenshot(nextEntry.screenshot, nextEntry, redirectIndex);
            }
            return;
        }

        if (currentIndex !== foundIndex) {
            currentIndex = foundIndex;
        }

        updateArrows();
    }, 1000);

    modalElement.addEventListener('click', (e) => {
        if (e.target === modalElement) {
            clearInterval(screenshotUpdateInterval);
            document.removeEventListener('keydown', handleKeyDown);
            modalElement.remove();
        }
    });
    if (blockUserBtn) {
        blockUserBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const bannedUsers = _getBannedUsers();
            const isAlreadyBanned = bannedUsers.some(user => user.ip === entry.ip);

            if (isAlreadyBanned) {
                return;
            }

            bannedUsers.push({
                ip: entry.ip,
                info: info,
                timestamp: entry.timestamp,
                screenshot: screenshot,
                note: ''
            });
            _saveBannedUsers(bannedUsers);
            const modal = document.getElementById('screenshotModal');
            if (modal) {
                document.removeEventListener('keydown', handleKeyDown);
                modal.remove();
            }
        });
    }

    const downloadBtn = document.getElementById('downloadScreenshotBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();

            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width;
                canvas.height = img.height;

                ctx.drawImage(img, 0, 0);

                const logoUrl = _isUmingle ? 'https://i.ibb.co/xS4xFRrS/Frame.png' : 'https://i.ibb.co/KcvKXzxK/logo.png';
                const chilltoolsLogoUrl = 'https://i.ibb.co/zTS0gP0G/logo-chilltools.png';

                let logosProcessed = 0;
                const processLogos = () => {
                    logosProcessed++;
                    if (logosProcessed === 2) {
                        canvas.toBlob(function(blob) {
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement('a');
                            link.href = url;

                            const randomId = Math.floor(1000000000 + Math.random() * 9000000000);
                            const fileName = `chilltools_${entry.ip}_${randomId}.png`;

                            link.download = fileName;
                            link.setAttribute('data-author', "chilltool's");

                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);

                            URL.revokeObjectURL(url);
                        }, 'image/png');
                    }
                };

                const logo = new Image();
                logo.crossOrigin = 'anonymous';
                logo.onload = function() {
                    try {
                        const logoWidth = Math.min(img.width * 0.35, 180);
                        const logoHeight = (logoWidth / logo.width) * logo.height;
                        const logoX = 10;
                        const logoY = img.height - logoHeight - 10;
                        ctx.globalAlpha = 0.6;
                        ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
                        ctx.globalAlpha = 1.0;
                    } catch(e) { console.log('Logo draw failed'); }
                    processLogos();
                };
                logo.onerror = processLogos;
                logo.src = logoUrl;

                const chilltoolsLogo = new Image();
                chilltoolsLogo.crossOrigin = 'anonymous';
                chilltoolsLogo.onload = function() {
                    try {
                        const chillLogoWidth = Math.min(img.width * 0.08, 50);
                        const chillLogoHeight = (chillLogoWidth / chilltoolsLogo.width) * chilltoolsLogo.height;
                        const chillLogoX = img.width - chillLogoWidth - 10;
                        const chillLogoY = img.height - chillLogoHeight - 10;
                        ctx.globalAlpha = 0.6;
                        ctx.drawImage(chilltoolsLogo, chillLogoX, chillLogoY, chillLogoWidth, chillLogoHeight);
                        ctx.globalAlpha = 1.0;
                    } catch(e) { console.log('ChillTools logo draw failed'); }
                    processLogos();
                };
                chilltoolsLogo.onerror = processLogos;
                chilltoolsLogo.src = chilltoolsLogoUrl;
            };
            img.crossOrigin = 'anonymous';
            img.src = screenshot;
        });
    }
}
