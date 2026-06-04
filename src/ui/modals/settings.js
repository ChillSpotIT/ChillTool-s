import { showColorModal, restoreColorStyle, setDeps as setColorPickerDeps } from '../theme/color-picker.js';

let _getLang = () => 'en';
let _translations = {};
let _showNotification = () => {};
let _insertAdjacentHTMLToBody = () => {};
let _injectToHead = () => {};
let _unblurToolbar = () => {};
let _showUserStylesModal = () => {};
let _showTosModal = () => {};
let _showStatistics = () => {};
let _setIpDisplayPreference = () => {};
let _getIpDisplayPreference = () => false;
let _saveButtonChoice = () => {};
let _updateButtonTitles = () => {};
let _isMobile = () => false;
let _isIpDisplayEnabled = false;
let _isSaveButtonChoiceEnabled = false;

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.showNotification) _showNotification = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead) _injectToHead = deps.injectToHead;
    if (deps.unblurToolbar) _unblurToolbar = deps.unblurToolbar;
    if (deps.showUserStylesModal) _showUserStylesModal = deps.showUserStylesModal;
    if (deps.showTosModal) _showTosModal = deps.showTosModal;
    if (deps.showStatistics) _showStatistics = deps.showStatistics;
    if (deps.setIpDisplayPreference) _setIpDisplayPreference = deps.setIpDisplayPreference;
    if (deps.getIpDisplayPreference) _getIpDisplayPreference = deps.getIpDisplayPreference;
    if (deps.saveButtonChoice) _saveButtonChoice = deps.saveButtonChoice;
    if (deps.updateButtonTitles) _updateButtonTitles = deps.updateButtonTitles;
    if (deps.isMobile) _isMobile = deps.isMobile;
    if (deps.isIpDisplayEnabled !== undefined) _isIpDisplayEnabled = deps.isIpDisplayEnabled;
    if (deps.isSaveButtonChoiceEnabled !== undefined) _isSaveButtonChoiceEnabled = deps.isSaveButtonChoiceEnabled;

    setColorPickerDeps({
        getLang: _getLang,
        translations: _translations,
        showNotification: _showNotification,
        insertAdjacentHTMLToBody: _insertAdjacentHTMLToBody,
        injectToHead: _injectToHead
    });
}

export function showSettings() {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar && !_isMobile()) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];
    const modalHTML = `
    <div id="settingsModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 500px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #007bff, #6610f2); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-cog"></i> ${t.settings}
                </h3>
                <button id="closeSettingsBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
            </div>
            <div style="padding: 20px; overflow-y: auto; flex-grow: 1; min-height: 150px;">
                <div style="color: #ddd; margin-bottom: 20px; font-size: 14px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.settingsDesc}
                </div>
                
                <div style="margin-bottom: 15px;">
                    <div style="margin-bottom: 15px;">
                        <div style="margin-bottom: 8px; color: #bbb; font-size: 14px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                            ${t.language}
                        </div>
                        <select id="langSelect" style="
                            width: 100%;
                            padding: 10px 12px;
                            border-radius: 5px;
                            border: 1px solid #444;
                            background-color: #222;
                            color: #fff;
                            font-size: 14px;
                            outline: none;
                            transition: all 0.2s;
                            margin-bottom: 5px;
                        ">
                            <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
                            <option value="zh" ${lang === 'zh' ? 'selected' : ''}>中文 (Chinese)</option>
                            <option value="hi" ${lang === 'hi' ? 'selected' : ''}>हिन्दी (Hindi)</option>
                            <option value="es" ${lang === 'es' ? 'selected' : ''}>Español (Spanish)</option>
                            <option value="ar" ${lang === 'ar' ? 'selected' : ''}>العربية (Arabic)</option>
                            <option value="fr" ${lang === 'fr' ? 'selected' : ''}>Français (French)</option>
                            <option value="bn" ${lang === 'bn' ? 'selected' : ''}>বাংলা (Bengali)</option>
                            <option value="ru" ${lang === 'ru' ? 'selected' : ''}>Русский (Russian)</option>
                            <option value="pt" ${lang === 'pt' ? 'selected' : ''}>Português (Portuguese)</option>
                            <option value="id" ${lang === 'id' ? 'selected' : ''}>Bahasa Indonesia</option>
                            <option value="it" ${lang === 'it' ? 'selected' : ''}>Italiano</option>
                        </select>


                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0; padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.05);">
                            <div style="display: flex; align-items: center;">
                                <label class="switch" style="position: relative; display: inline-block; width: 50px; height: 24px; margin-right: 12px;">
                                    <input type="checkbox" id="showIpDisplayCheckbox" ${_isIpDisplayEnabled ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
                                    <span class="slider round"></span>
                                </label>
                                <label for="showIpDisplayCheckbox" style="
                                    color: #e0e0e0;
                                    font-size: 14px;
                                    font-weight: 500;
                                    cursor: pointer;
                                    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
                                    line-height: 1.4;
                                    margin-right: 20px;
                                ">
                                    ${t.showIpDisplay}
                                </label>
                                
                            </div>
                            
                            <div style="display: flex; align-items: center; margin-left: 20px;">
                                <input type="checkbox" id="saveButtonChoiceCheckbox" ${_isSaveButtonChoiceEnabled ? 'checked' : ''} style="display: none;">
                                <span style="margin: 0 8px 0 0; color: #e0e0e0; font-size: 14px; font-weight: 500; white-space: nowrap; text-transform: uppercase;">Persistent:</span>
                                <button type="button" id="saveButtonToggle" style="
                                    width: 50px;
                                    height: 24px;
                                    border: none;
                                    border-radius: 12px;
                                    background: ${_isSaveButtonChoiceEnabled ? '#4CAF50' : '#F44336'};
                                    color: white;
                                    font-weight: bold;
                                    font-size: 12px;
                                    cursor: pointer;
                                    outline: none;
                                    position: relative;
                                    overflow: hidden;
                                    transition: background-color 0.3s;
                                    margin-right: 5px;
                                ">
                                    ${_isSaveButtonChoiceEnabled ? 'ON' : 'OFF'}
                                </button>
                                <i class="fas fa-info-circle" style="color: #666; font-size: 14px; cursor: help;" title="toggle if you want to save the last choice made on the button"></i>
                            </div>
                            
                            <style>
                                .slider:before {
                                    position: absolute;
                                    content: "";
                                    height: 18px;
                                    width: 18px;
                                    left: 3px;
                                    bottom: 3px;
                                    background-color: #999;
                                    transition: .4s;
                                    border-radius: 50%;
                                }
                                
                                #showIpDisplayCheckbox + .slider,
                                #saveButtonChoiceCheckbox + .slider {
                                    background-color: #444;
                                }
                                
                                #showIpDisplayCheckbox:checked + .slider:before,
                                #saveButtonChoiceCheckbox:checked + .slider:before {
                                    background-color: white;
                                }
                                
                                #showIpDisplayCheckbox:checked + .slider,
                                #saveButtonChoiceCheckbox:checked + .slider {
                                    background-color: #4a90e2;
                                }
                                
                                #showIpDisplayCheckbox:checked + .slider:before,
                                #saveButtonChoiceCheckbox:checked + .slider:before {
                                    transform: translateX(26px);
                                }
                                
                                #showIpDisplayCheckbox:focus + .slider,
                                #saveButtonChoiceCheckbox:focus + .slider {
                                    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
                                }
                                
                                #saveButtonToggle {
                                    transition: background-color 0.3s;
                                }
                            </style>
                        </div>
                    </div>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button id="videoBorderBtn" style="
                        flex: 1;
                        background: #007bff;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                        text-align: center;
                    ">
                        <i class="fas fa-palette"></i> ${t.videoBorder || 'User Color'}
                    </button>
                    <button id="userStylesBtn" style="
                        flex: 1;
                        background: #6610f2;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                        text-align: center;
                    ">
                        <i class="fas fa-paint-brush"></i> ${t.userStyles || 'UserStyles'}
                    </button>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <button id="tosBtn" style="
                        flex: 1;
                        background: #444;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                        text-align: center;
                    ">
                        <i class="fas fa-file-alt"></i> ${t.termsOfService || 'Terms of Service'}
                    </button>
                    <a href="https://discord.gg/FBsPkXDche" target="_blank" style="
                        flex: 1;
                        background: #5865F2;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                        text-align: center;
                        text-decoration: none;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                    ">
                        <i class="fab fa-discord"></i> Discord
                    </a>
                </div>
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <a href="https://buymeacoffee.com/chillspotinc" target="_blank" id="donateBtn" style="
                        flex: 1;
                        padding: 12px 15px;
                        background: #ff6b35;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        transition: all 0.2s;
                        text-align: center;
                        text-decoration: none;
                    ">
                        <i class="fas fa-heart"></i>
                        ${t.donate}
                    </a>
                    
                    <button id="showStatisticsBtn" style="
                        flex: 1;
                        padding: 12px 15px;
                        background: #ad6721;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        transition: all 0.2s;
                    ">
                        <i class="fas fa-chart-bar"></i>
                        ${t.statistics}
                    </button>
                </div>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', modalHTML);

    if (_isSaveButtonChoiceEnabled) {
        const savedIpDisplay = localStorage.getItem('ipDisplayEnabled');
        if (savedIpDisplay !== null) {
            _isIpDisplayEnabled = savedIpDisplay === 'true';
        }
    }

    const initIpDisplayBox = () => {
        const ipDisplayBox = document.getElementById('ipDisplayBox');
        if (ipDisplayBox) {
            ipDisplayBox.style.display = _isIpDisplayEnabled ? 'block' : 'none';
        }
    };

    const ipCheckbox = document.getElementById('showIpDisplayCheckbox');
    if (ipCheckbox) {
        ipCheckbox.checked = _isIpDisplayEnabled;
        ipCheckbox.dispatchEvent(new Event('change', { bubbles: false }));
    }
    initIpDisplayBox();

    const ipBoxObserver = new MutationObserver(() => {
        const ipDisplayBox = document.getElementById('ipDisplayBox');
        if (ipDisplayBox) {
            ipDisplayBox.style.display = _isIpDisplayEnabled ? 'block' : 'none';
            ipBoxObserver.disconnect();
        }
    });

    ipBoxObserver.observe(document.documentElement, { childList: true, subtree: true });

    if (ipCheckbox) {
        const handleIpCheckboxChange = function(e) {
            _isIpDisplayEnabled = e.target.checked;

            if (_isSaveButtonChoiceEnabled) {
                localStorage.setItem('ipDisplayEnabled', _isIpDisplayEnabled);
            } else {
                localStorage.removeItem('ipDisplayEnabled');
            }

            document.querySelectorAll('#ipDisplayBox').forEach(box => {
                box.style.display = _isIpDisplayEnabled ? 'block' : 'none';
            });
        };

        ipCheckbox.addEventListener('change', handleIpCheckboxChange);
    }

    const saveButtonChoiceCheckbox = document.getElementById('saveButtonChoiceCheckbox');
    const saveButtonToggle = document.getElementById('saveButtonToggle');
    saveButtonChoiceCheckbox.checked = _isSaveButtonChoiceEnabled;

    saveButtonToggle.addEventListener('click', function() {
        _isSaveButtonChoiceEnabled = !_isSaveButtonChoiceEnabled;
        saveButtonChoiceCheckbox.checked = _isSaveButtonChoiceEnabled;

        saveButtonToggle.style.background = _isSaveButtonChoiceEnabled ? '#4CAF50' : '#F44336';
        saveButtonToggle.textContent = _isSaveButtonChoiceEnabled ? 'ON' : 'OFF';

        if (_isSaveButtonChoiceEnabled) {
            localStorage.setItem('saveButtonChoice', 'true');
        } else {
            localStorage.removeItem('saveButtonChoice');
            localStorage.removeItem('buttonChoices');
            localStorage.removeItem('ipDisplayEnabled');
        }
    });

    document.getElementById('langSelect').onchange = function() {
        localStorage.setItem('chilltool_lang', this.value);
        _updateButtonTitles();
        document.getElementById('settingsModal').remove();
        showSettings();
    };
    document.getElementById('tosBtn').onclick = function() {
        window.open('https://chilltools.it/tos', '_blank');
    };
    document.getElementById('userStylesBtn').onclick = function() {
        _showUserStylesModal();
    };

    const userStyleActive = localStorage.getItem('chilltool_userStyles');
    const videoBorderBtn = document.getElementById('videoBorderBtn');

    if (userStyleActive && userStyleActive.trim() !== '') {
        videoBorderBtn.style.opacity = '0.5';
        videoBorderBtn.style.cursor = 'not-allowed';
        videoBorderBtn.title = t.userStyleActive;
    }

    document.getElementById('videoBorderBtn').addEventListener('click', function() {
        const userStyleActive = localStorage.getItem('chilltool_userStyles');
        showColorModal(userStyleActive);
    });

    document.getElementById('showIpDisplayCheckbox').addEventListener('change', function(e) {
        _setIpDisplayPreference(e.target.checked);
    });

    _setIpDisplayPreference(_getIpDisplayPreference());

    document.getElementById('closeSettingsBtn').onclick = function() {
        const selected = document.getElementById('langSelect').value;
        localStorage.setItem('chilltool_lang', selected);
        document.getElementById('settingsModal').remove();
        _unblurToolbar();
    };

    const settingsModal = document.getElementById('settingsModal');
    if (settingsModal) {
        settingsModal.addEventListener('click', (e) => {
            if (e.target === settingsModal) {
                const selected = document.getElementById('langSelect').value;
                localStorage.setItem('chilltool_lang', selected);
                settingsModal.remove();
                _unblurToolbar();
            }
        });
    }

    restoreColorStyle();
}
