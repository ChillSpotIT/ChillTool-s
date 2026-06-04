import { getBannedUsers, saveBannedUsers } from '../../features/ban.js';

let _getLang = () => 'en';
let _translations = {};
let _showScreenshot = () => {};
let _showNotification = () => {};
let _insertAdjacentHTMLToBody = () => {};
let _unblurToolbar = () => {};
let _isMobile = () => false;

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.showScreenshot) _showScreenshot = deps.showScreenshot;
    if (deps.showNotification) _showNotification = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.unblurToolbar) _unblurToolbar = deps.unblurToolbar;
    if (deps.isMobile) _isMobile = deps.isMobile;
}

export function displayBannedUsers() {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar && !_isMobile()) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];
    const bannedUsers = getBannedUsers();

    const modalHTML = `
    <div id="bannedUsersModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 800px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #dc3545, #b30000); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-user-slash"></i> ${t.banListTitle}
                </h3>
                <button id="closeBannedUsers" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
            </div>
            <div style="padding: 15px; overflow-y: scroll; flex-grow: 1; min-height: 150px;">
                ${bannedUsers.length ? `
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="color: #fff; background-color: #333;">
                                <th style="padding: 10px; text-align: left;">${t.ip}</th>
                                <th style="padding: 10px; text-align: left;">${t.city}</th>
                                <th style="padding: 10px; text-align: left;">${t.country}</th>
                                <th style="padding: 10px; text-align: left;">${t.time}</th>
                                <th style="padding: 10px; text-align: center;">${t.screenshot}</th>
                                <th style="padding: 10px; text-align: left;">Note</th>
                                <th style="padding: 10px; text-align: center;">${t.actions}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${bannedUsers.map((user, index) => `
                                <tr style="background-color: ${index % 2 === 0 ? '#1a1a1a' : '#222'}; vertical-align: top;">
                                    <td style="padding: 10px; color: #fff;">${user.ip}</td>
                                    <td style="padding: 10px; color: #fff;">${user.info?.city || 'N/A'}</td>
                                    <td style="padding: 10px; color: #fff;">${user.info?.country || 'N/A'}</td>
                                    <td style="padding: 10px; color: #fff;">${user.timestamp}</td>
                                    <td style="padding: 10px; text-align: center;">
                                        ${user.screenshot ? `<img src="${user.screenshot}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="_showScreenshot('${user.screenshot}', {ip: '${user.ip}', timestamp: '${user.timestamp}', info: ${JSON.stringify(user.info)}})">` : 'N/A'}
                                    </td>
                                    <td style="padding: 10px;">
                                        <textarea class="ban-note-input" data-ip="${user.ip}"
                                            maxlength="50"
                                            placeholder="Add note... (max 50)"
                                            style="width: 100%; padding: 4px 8px; background: #333; border: 1px solid #444; border-radius: 4px; color: #fff; font-size: 12px; outline: none; resize: vertical; min-height: 32px; max-height: 120px; overflow-y: auto; box-sizing: border-box; font-family: inherit;"
                                        >${user.note || ''}</textarea>
                                    </td>
                                    <td style="padding: 10px; text-align: center;">
                                        <button class="unban-btn" data-ip="${user.ip}" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                ` : 
                    `<div style="text-align: center; color: #777; padding: 40px 20px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-inbox" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>
                        ${t.bannedListEmpty}
                    </div>`}
            </div>
            <div style="padding: 10px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="text" id="manualIpInput" placeholder="${t.enterIpToBlock}" style="padding: 5px 10px; border: 1px solid #444; border-radius: 4px; background: #333; color: #fff; width: 200px;" />
                    <button id="addManualIpBtn" style="background: #dc3545; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; font-size: 12px;">
                        <i class="fas fa-plus"></i> ${t.blockIp}
                    </button>
                </div>
                <div>
                    chilltools.it
                </div>
            </div>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', modalHTML);

    const bannedModal = document.getElementById('bannedUsersModal');
    if (bannedModal) {
        bannedModal.addEventListener('click', (e) => {
            if (e.target === bannedModal) {
                bannedModal.remove();
                _unblurToolbar();
            }
        });
    }

    document.getElementById('closeBannedUsers').addEventListener('click', () => {
        document.getElementById('bannedUsersModal').remove();
        _unblurToolbar();
    });

    document.querySelectorAll('.unban-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const ipToUnban = this.getAttribute('data-ip');
            let bannedUsers = getBannedUsers();
            bannedUsers = bannedUsers.filter(user => user.ip !== ipToUnban);
            saveBannedUsers(bannedUsers);
            document.getElementById('bannedUsersModal').remove();
            displayBannedUsers();
        });
    });

    document.querySelectorAll('.ban-note-input').forEach(input => {
        let noteWarningShown = false;
        input.addEventListener('input', function() {
            if (this.value.length >= 50 && !noteWarningShown) {
                noteWarningShown = true;
                const lang = _getLang();
                const t = _translations[lang] || _translations['en'];
                _showNotification('Note', t.noteMaxChars || _translations['en'].noteMaxChars || 'Max 50 characters', {
                    type: 'warning',
                    duration: 2500
                });
                setTimeout(() => { noteWarningShown = false; }, 3000);
            }
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 120) + 'px';
        });
        input.addEventListener('blur', function() {
            const ip = this.getAttribute('data-ip');
            const note = this.value.trim();
            const bannedUsers = getBannedUsers();
            const user = bannedUsers.find(u => u.ip === ip);
            if (user) {
                user.note = note;
                saveBannedUsers(bannedUsers);
            }
        });
    });

    const manualIpInput = document.getElementById('manualIpInput');
    const addManualIpBtn = document.getElementById('addManualIpBtn');

    if (addManualIpBtn) {
        addManualIpBtn.addEventListener('click', function() {
            const ip = manualIpInput.value.trim();
            if (!ip) return;

            const bannedUsers = getBannedUsers();
            
            if (bannedUsers.some(user => user.ip === ip)) {
                _showNotification('Info', 'This IP is already blocked', { type: 'info' });
                return;
            }

            bannedUsers.push({
                ip: ip,
                info: {},
                timestamp: new Date().toLocaleString(),
                manuallyAdded: true,
                note: ''
            });
            saveBannedUsers(bannedUsers);
            
            document.getElementById('bannedUsersModal').remove();
            displayBannedUsers();
            _showNotification('Success', 'IP address has been blocked', { type: 'success' });
        });

        manualIpInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addManualIpBtn.click();
            }
        });
    }
}