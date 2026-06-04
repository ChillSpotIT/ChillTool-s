let _getLang = () => 'en';
let _translations = {};
let _injectToBody = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.injectToBody) _injectToBody = deps.injectToBody;
}

export function showTosModal() {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar) toolbar.classList.add('chill-blur');

    const lang = _getLang();
    const t = _translations[lang];

    const modal = document.createElement('div');
    modal.id = 'tosModal';
    modal.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;';

    modal.innerHTML = `
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 500px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #007bff, #6610f2); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-file-contract"></i> ${t.termsOfService || 'Terms of Service'}
                </h3>
            </div>
            <div style="padding: 25px; overflow-y: auto; flex-grow: 1; min-height: 120px; color: #eee; font-size: 16px; line-height: 1.7;">
                <p style="margin: 0; font-size: 16px;">${t.usingExtensionTos || 'By using the Extension "ChillTool\'s" you automatically accept the'} <a href="https://chilltools.it/tos/" target="_blank" style="color: #4CAF50; text-decoration: underline; font-weight: 500;">${t.termsOfService || 'Terms of Service'}</a>.</p>
            </div>
            <div style="padding: 15px; background: #0a0a0a; border-top: 1px solid #333; display: flex; justify-content: flex-end;">
                <button id="acceptTos" style="
                    background: linear-gradient(to right, #4CAF50, #45a049);
                    color: white;
                    border: none;
                    padding: 8px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-weight: bold;
                    text-transform: uppercase;
                    font-size: 13px;
                    transition: all 0.2s;
                ">
                    ${t.accept || 'I Accept'}
                </button>
            </div>
        </div>
    `;

    _injectToBody(modal);

    document.getElementById('acceptTos').addEventListener('click', function() {
        localStorage.setItem('tosAccepted', 'true');
        modal.remove();
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            e.stopPropagation();
        }
    });
}
