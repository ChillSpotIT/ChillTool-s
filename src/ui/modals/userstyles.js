let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};
let _injectToHead = () => {};
let _showNotification = () => {};
let _predefinedStyles = {};
let _showGalleryModal = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead) _injectToHead = deps.injectToHead;
    if (deps.showNotification) _showNotification = deps.showNotification;
    if (deps.predefinedStyles) _predefinedStyles = deps.predefinedStyles;
    if (deps.showGalleryModal) _showGalleryModal = deps.showGalleryModal;
}

export function showUserStylesModal() {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];

    const savedCSS = localStorage.getItem('chilltool_userStyles') || '';

    const modalHTML = `
    <div id="userStylesModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 700px; max-height: 85vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #6610f2, #007bff); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-paint-brush"></i> ${t.userStyles}
                </h3>
                <button id="closeUserStylesBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
            </div>
            <div style="padding: 20px; overflow-y: auto; flex-grow: 1;">
                <div style="color: #ddd; margin-bottom: 15px; font-size: 14px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.userStylesDesc}
                </div>

                <div style="margin-bottom: 8px; color: #bbb; font-size: 14px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.customCSS}
                </div>
                <textarea id="userStylesTextarea" style="
                    width: 100%;
                    height: 350px;
                    background: #1a1a1a;
                    color: #f8f8f2;
                    border: 1px solid #444;
                    border-radius: 5px;
                    padding: 12px;
                    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
                    font-size: 13px;
                    line-height: 1.5;
                    resize: vertical;
                    outline: none;
                    box-sizing: border-box;
                " placeholder="/* ${t.customCSS} */\n.example {\n    color: #fff;\n    background: #000;\n}">${savedCSS}</textarea>

                <div style="display: flex; justify-content: space-between; gap: 10px; margin-top: 15px;">
                    <button id="galleryUserStylesBtn" style="
                        background: #6610f2;
                        color: white;
                        border: none;
                        padding: 10px 20px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        transition: all 0.2s;
                    ">
                        <i class="fas fa-images"></i> ${t.gallery}
                    </button>
                    <div style="display: flex; gap: 10px;">
                        <button id="resetUserStylesBtn" style="
                            background: #dc3545;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                            transition: all 0.2s;
                        ">
                            <i class="fas fa-undo"></i> ${t.reset}
                        </button>
                        <button id="saveUserStylesBtn" style="
                            background: #28a745;
                            color: white;
                            border: none;
                            padding: 10px 20px;
                            border-radius: 5px;
                            cursor: pointer;
                            font-size: 14px;
                            transition: all 0.2s;
                        ">
                            <i class="fas fa-save"></i> ${t.save}
                        </button>
                    </div>
                </div>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', modalHTML);

    document.getElementById('settingsModal').style.display = 'none';

    document.getElementById('closeUserStylesBtn').onclick = function() {
        document.getElementById('userStylesModal').remove();
        document.getElementById('settingsModal').style.display = 'flex';
    };

    document.getElementById('galleryUserStylesBtn').onclick = function() {
        _showGalleryModal();
    };

    document.getElementById('resetUserStylesBtn').onclick = function() {
        if (confirm('Are you sure you want to reset all custom styles?')) {
            localStorage.removeItem('chilltool_userStyles');
            document.getElementById('userStylesTextarea').value = '';

            const existingStyle = document.getElementById('chilltool-user-styles');
            if (existingStyle) {
                existingStyle.remove();
            }

            const settingsModal = document.getElementById('settingsModal');
            if (settingsModal) {
                const videoBorderBtn = document.getElementById('videoBorderBtn');
                if (videoBorderBtn) {
                    videoBorderBtn.style.opacity = '1';
                    videoBorderBtn.style.cursor = 'pointer';
                    videoBorderBtn.title = t.videoBorder || 'Custom Color';
                }
            }

            _showNotification('UserStyles', t.stylesReset, {
                type: 'success',
                duration: 3000
            });
        }
    };

    document.getElementById('saveUserStylesBtn').onclick = function() {
        const cssContent = document.getElementById('userStylesTextarea').value;
        localStorage.setItem('chilltool_userStyles', cssContent);

        let styleElement = document.getElementById('chilltool-user-styles');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'chilltool-user-styles';
            _injectToHead(styleElement);
        }
        styleElement.textContent = cssContent;

        if (cssContent.trim() !== '') {
            const rightBoxStyle = document.getElementById('rightBoxStyle');
            if (rightBoxStyle) {
                rightBoxStyle.remove();
            }
            localStorage.removeItem('videoBorderColor');
            document.cookie = 'videoBorderColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }

        const settingsModal = document.getElementById('settingsModal');
        if (settingsModal && cssContent.trim() !== '') {
            const videoBorderBtn = document.getElementById('videoBorderBtn');
            if (videoBorderBtn) {
                videoBorderBtn.style.opacity = '0.5';
                videoBorderBtn.style.cursor = 'not-allowed';
                videoBorderBtn.title = t.userStyleActive;
            }
        }

        _showNotification('UserStyles', t.stylesSaved, {
            type: 'success',
            duration: 3000
        });
    };

    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('userStylesModal');
            if (modal) {
                modal.remove();
                document.getElementById('settingsModal').style.display = 'flex';
                document.removeEventListener('keydown', escHandler);
            }
        }
    });
}
