let _getLang = () => 'en';
let _translations = {};
let _showNotification = () => {};
let _insertAdjacentHTMLToBody = () => {};
let _injectToHead = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.showNotification) _showNotification = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead) _injectToHead = deps.injectToHead;
}

function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + date.toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + ';' + expires + ';path=/';
}

function applyVideoBorderColor(color) {
    const styleElement = document.getElementById('rightBoxStyle') || document.createElement('style');
    styleElement.id = 'rightBoxStyle';

    const updateStyles = () => {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');

        if (isDarkMode) {
            styleElement.textContent = `
                .dark-mode .rightBox,
                .dark-mode .bottomButton,
                .dark-mode header,
                .dark-mode .inputContainer textarea,
                .dark-mode .gif,
                .dark-mode .inputContainer {
                    background-color: ${color} !important;
                    transition: background-color 0.3s ease;
                }
                .rightBox,
                .bottomButton,
                header,
                .inputContainer textarea,
                .gif,
                .inputContainer {
                    transition: background-color 0.3s ease;
                }
            `;

            if (!document.getElementById('rightBoxStyle')) {
                _injectToHead(styleElement);
            } else {
                document.head.replaceChild(styleElement, document.getElementById('rightBoxStyle'));
            }
        } else {
            styleElement.textContent = '';
        }
    };

    updateStyles();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateStyles();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    updateStyles();

    if (!document.getElementById('rightBoxStyle')) {
        _injectToHead(styleElement);
    } else {
        document.head.replaceChild(styleElement, document.getElementById('rightBoxStyle'));
    }
}

export function restoreColorStyle() {
    const savedColor = localStorage.getItem('videoBorderColor') || '#0a0a0b';
    const styleElement = document.getElementById('rightBoxStyle') || document.createElement('style');
    styleElement.id = 'rightBoxStyle';

    const updateStyles = () => {
        const isDarkMode = document.documentElement.classList.contains('dark-mode');

        if (isDarkMode) {
            styleElement.textContent = `
                .dark-mode .rightBox,
                .dark-mode .bottomButton,
                .dark-mode header,
                .dark-mode .inputContainer textarea,
                .dark-mode .gif,
                .dark-mode .inputContainer {
                    background-color: ${savedColor} !important;
                    transition: background-color 0.3s ease;
                }
                .rightBox,
                .bottomButton,
                header,
                .inputContainer textarea,
                .gif,
                .inputContainer {
                    transition: background-color 0.3s ease;
                }
            `;
        } else {
            styleElement.textContent = '';
        }
    };

    updateStyles();

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class') {
                updateStyles();
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });

    if (!document.getElementById('rightBoxStyle')) {
        _injectToHead(styleElement);
    }
}

function closeColorModal() {
    const modal = document.getElementById('colorModal');
    if (modal) {
        modal.remove();
        document.getElementById('settingsModal').style.display = 'flex';
    }
}

export function showColorModal(userStyleActive) {
    if (userStyleActive && userStyleActive.trim() !== '') {
        const lang = _getLang();
        const t = _translations[lang] || _translations.en || {};
        _showNotification('Custom Color', t.disableUserStyle, {
            type: 'warning',
            duration: 4000,
            pulse: true
        });
        return;
    }

    const lang = _getLang();
    const t = _translations[lang] || _translations.en || {};

    const colorModalHTML = `
        <div id="colorModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; justify-content: center; align-items: center;">
            <div style="background: #111; border-radius: 10px; width: 90%; max-width: 400px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #333;">
                    <h3 style="margin: 0; color: #fff; font-size: 18px;">
                        <i class="fas fa-palette"></i> ${t.color} ${t.settings.toLowerCase()}
                    </h3>
                    <button id="closeColorModal" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">×</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="margin-bottom: 15px;">
                        <div style="color: #bbb; margin-bottom: 8px; font-size: 14px;">${t.color}</div>
                        <input type="color" id="videoBorderColor" value="${localStorage.getItem('videoBorderColor') || '#007bff'}" style="width: 100%; height: 40px; border: none; border-radius: 4px; cursor: pointer;">
                    </div>
                </div>
                
                
                <div style="display: flex; justify-content: flex-end; gap: 10px;">
                    <button id="applyColorBtn" style="
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 8px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                    ">
                        ${t.apply}
                    </button>
                </div>
                
                <button id="resetColorBtn" style="
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                " title="${t.reset || 'Reset'}">
                    <i class="fas fa-undo"></i> ${t.reset || 'Reset'}
                </button>
            </div>
        </div>`;

    _insertAdjacentHTMLToBody('beforeend', colorModalHTML);

    document.getElementById('settingsModal').style.display = 'none';

    document.getElementById('closeColorModal').addEventListener('click', closeColorModal);

    const videoBorderColor = document.getElementById('videoBorderColor');

    const savedColor = localStorage.getItem('videoBorderColor');
    if (savedColor) {
        const checkColorInput = setInterval(() => {
            const colorInput = document.getElementById('videoBorderColor');
            if (colorInput) {
                colorInput.value = savedColor;
                clearInterval(checkColorInput);
            }
        }, 100);
    }

    document.getElementById('applyColorBtn').addEventListener('click', function() {
        const color = videoBorderColor.value.toLowerCase();

        const isWhiteHex = color === '#ffffff' || color === '#fff' || color === 'white';
        const isWhiteRGB = color === 'rgb(255,255,255)' ||
                        color === 'rgb(255, 255, 255)' ||
                        color === 'rgba(255,255,255,1)' ||
                        color === 'rgba(255, 255, 255, 1)';

        let isNearWhite = false;
        if (color.startsWith('#')) {
            const hex = color.substring(1);
            const rgb = parseInt(hex.length === 3 ?
                hex.split('').map(c => c + c).join('') : hex, 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >> 8) & 0xff;
            const b = (rgb >> 0) & 0xff;
            isNearWhite = r > 240 && g > 240 && b > 240;
        }

        if (isWhiteHex || isWhiteRGB || isNearWhite) {
            const lang = _getLang();
            const t = _translations[lang] || _translations.en || {};
            const message = t.whiteColorNotAllowed || 'White color is not allowed. Please choose a different color.';

            _showNotification('Color Selection', message, {
                type: 'warning',
                duration: 3000,
                pulse: true,
                zIndex: 10001
            });

            videoBorderColor.value = '#007bff';
            return;
        }

        if (!document.documentElement.classList.contains('dark-mode')) {
            setTimeout(() => {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'true');
            }, 500);
        }
        const darkToggle = document.getElementById("toggleDark");
        if (darkToggle) {
            darkToggle.checked = true;
            darkToggle.dispatchEvent(new Event('change'));
        }

        localStorage.setItem('videoBorderColor', color);
        setCookie('videoBorderColor', color);
        applyVideoBorderColor(color);
        closeColorModal();
    });

    document.getElementById('resetColorBtn').addEventListener('click', function() {
        localStorage.removeItem('videoBorderColor');
        document.cookie = 'videoBorderColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

        const styleElement = document.getElementById('rightBoxStyle');
        if (styleElement) {
            styleElement.remove();
        }

        videoBorderColor.value = '#007bff';

        const lang = _getLang();
        const t = _translations[lang] || _translations.en || {};
        const message = t.stylesReset || 'Custom styles have been reset';

        _showNotification('Color Reset', message, {
            type: 'success',
            duration: 2000,
            pulse: true,
            zIndex: 10001
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeColorModal();
        }
    });
}
