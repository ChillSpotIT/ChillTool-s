let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};
let _injectToHead = () => {};
let _showNotification = () => {};
let _predefinedStyles = {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead) _injectToHead = deps.injectToHead;
    if (deps.showNotification) _showNotification = deps.showNotification;
    if (deps.predefinedStyles) _predefinedStyles = deps.predefinedStyles;
}

export function getStylePreview(styleKey) {
    const previews = {
        darkMode: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        fstool: 'linear-gradient(135deg,rgb(99, 0, 0) 0%, #1a1a1a 100%)',
        omegle: 'linear-gradient(135deg, #007aff 0%, #339cff 100%)',
    };
    return previews[styleKey] || '#0a0a0b';
}

export function showGalleryModal() {
    const lang = _getLang();
    const t = _translations[lang];

    const galleryHTML = `
    <div id="galleryModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(5px); z-index: 10001; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 900px; max-height: 85vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #6610f2, #007bff); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-images"></i> ${t.gallery}
                </h3>
                <button id="closeGalleryBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
            </div>
            <div style="padding: 20px; overflow-y: auto; flex-grow: 1;">
                <div style="color: #ddd; margin-bottom: 20px; font-size: 14px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.galleryDesc}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
                    ${Object.keys(_predefinedStyles).map(styleKey => {
                        const style = _predefinedStyles[styleKey];
                        return `
                            <div class="gallery-item" data-style="${styleKey}" style="
                                background: #1a1a1a;
                                border: 2px solid #333;
                                border-radius: 8px;
                                padding: 15px;
                                cursor: pointer;
                                transition: all 0.3s;
                                position: relative;
                                overflow: hidden;
                            ">
                                <div style="
                                    height: 120px;
                                    border-radius: 5px;
                                    margin-bottom: 10px;
                                    background: ${getStylePreview(styleKey)};
                                    border: 1px solid #444;
                                "></div>
                                <h4 style="margin: 0 0 8px 0; color: #fff; font-size: 16px;">${t[style.name]}</h4>
                                <button class="apply-style-btn" data-style="${styleKey}" style="
                                    width: 100%;
                                    background: #007bff;
                                    color: white;
                                    border: none;
                                    padding: 8px;
                                    border-radius: 5px;
                                    cursor: pointer;
                                    font-size: 13px;
                                    transition: all 0.2s;
                                ">
                                    <i class="fas fa-check"></i> ${t.applyStyle}
                                </button>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', galleryHTML);

    const userStylesModal = document.getElementById('userStylesModal');
    if (userStylesModal) userStylesModal.style.display = 'none';

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.borderColor = '#007bff';
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0,123,255,0.3)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderColor = '#333';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    document.querySelectorAll('.apply-style-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const styleKey = this.getAttribute('data-style');
            const style = _predefinedStyles[styleKey];

            const textarea = document.getElementById('userStylesTextarea');
            if (textarea) {
                textarea.value = style.css;
            }

            localStorage.setItem('chilltool_userStyles', style.css);

            let styleElement = document.getElementById('chilltool-user-styles');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'chilltool-user-styles';
                _injectToHead(styleElement);
            }
            styleElement.textContent = style.css;

            const rightBoxStyle = document.getElementById('rightBoxStyle');
            if (rightBoxStyle) {
                rightBoxStyle.remove();
            }
            localStorage.removeItem('videoBorderColor');
            document.cookie = 'videoBorderColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            const settingsModal = document.getElementById('settingsModal');
            if (settingsModal) {
                const videoBorderBtn = document.getElementById('videoBorderBtn');
                if (videoBorderBtn) {
                    videoBorderBtn.style.opacity = '0.5';
                    videoBorderBtn.style.cursor = 'not-allowed';
                    videoBorderBtn.title = t.userStyleActive;
                }
            }

            _showNotification('UserStyles', `${t[style.name]} ${t.styleApplied}`, {
                type: 'success',
                duration: 3000
            });

            document.getElementById('galleryModal').remove();
            const usm1 = document.getElementById('userStylesModal');
            if (usm1) usm1.style.display = 'flex';
        });
    });

    document.getElementById('closeGalleryBtn').onclick = function() {
        document.getElementById('galleryModal').remove();
        const usm2 = document.getElementById('userStylesModal');
        if (usm2) usm2.style.display = 'flex';
    };

    document.addEventListener('keydown', function escGalleryHandler(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('galleryModal');
            if (modal) {
                modal.remove();
                const usm3 = document.getElementById('userStylesModal');
                if (usm3) usm3.style.display = 'flex';
                document.removeEventListener('keydown', escGalleryHandler);
            }
        }
    });
}
