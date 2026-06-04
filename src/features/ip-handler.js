import { getBannedUsers, saveBannedUsers } from './ban.js';
import { getOrCreateIpBox, getLocation } from './ip-display.js';
import { getIsIpDisplayEnabled } from '../core/state.js';
import { escapeHtml } from '../core/dom.js';
import { captureAndStoreScreenshot, currentSession, connectionHistory } from './screenshot.js';
import { incrementPeopleCount, updatePeopleCounter } from './people-counter.js';
import { incrementLeaderboardForCurrentPartner, updateCountryStreak, getStreakBadgeHtml } from './country-leaderboard.js';

let _getLang = () => 'en';
let _translations = {};
let _doubleSkipButton = () => {};
let _getSelectedCountries = () => [];
let _showNotification = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.doubleSkipButton) _doubleSkipButton = deps.doubleSkipButton;
    if (deps.getSelectedCountries) _getSelectedCountries = deps.getSelectedCountries;
    if (deps.showNotification) _showNotification = deps.showNotification;
}

// State variables from source
let lastHandledIP = null;
let isHandlingIP = false;
let callStartTime = null;
let timerInterval = null;

export { lastHandledIP, isHandlingIP, callStartTime, timerInterval };

export async function handleNewIP(ip) {
    if (!ip || lastHandledIP === ip) return;
    
    lastHandledIP = ip;
    
    const newCount = incrementPeopleCount();
    updatePeopleCounter();
    
    console.log(`Nuova connessione rilevata: ${ip} (Totale persone: ${newCount})`);

    const bannedUsers = getBannedUsers();
    if (bannedUsers.some(user => user.ip === ip)) {
        console.log(`IP ${ip} è bannato. Simulazione tasto ESC.`);

        _doubleSkipButton();

        setTimeout(() => {
            isHandlingIP = false;
        }, 1000);
        return;
    }
    
    lastHandledIP = ip;

    console.log('New IP detected:', ip);
    
    currentSession.ip = ip;
    currentSession.info = null;
    currentSession.screenshot = null;

    const banBtn = document.getElementById("chillBanBtn");
    if (banBtn) banBtn.disabled = false;

    const ipBox = getOrCreateIpBox();
    if (ipBox) {
        ipBox.style.display = getIsIpDisplayEnabled() ? 'block' : 'none';
    }
    
    const lang = _getLang();
    const t = _translations[lang];
    if (ipBox) {
        ipBox.innerHTML = `
        <h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>
        <div style="margin-bottom: 10px;">
            <span style="color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}: ${escapeHtml(ip)} - <i>${t.loading}</i></span>
        </div>
    `;
    }

    const locationInfo = await getLocation(ip);
    if (!locationInfo || currentSession.ip !== ip) return;
    currentSession.info = locationInfo;
    incrementLeaderboardForCurrentPartner(ip, locationInfo.country);
    updateCountryStreak(locationInfo.country);
        
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        
        callStartTime = new Date();
        const updateTimerDisplay = () => {
            if (!callStartTime) return '';
            
            const now = new Date();
            const diffInSeconds = Math.floor((now - callStartTime) / 1000);
            
            const hours = Math.floor(diffInSeconds / 3600);
            const minutes = Math.floor((diffInSeconds % 3600) / 60);
            const seconds = diffInSeconds % 60;
            
            let timeString = '';
            if (hours > 0) {
                timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            } else {
                timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            }
            
            const timerElement = document.getElementById('callTimer');
            if (timerElement) {
                timerElement.textContent = timeString;
            }
            
            return timeString;
        };
        
        const initialTime = updateTimerDisplay();
        timerInterval = setInterval(updateTimerDisplay, 1000);
        
        if (ipBox) {
            ipBox.innerHTML = `
            <h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>
            <div style="color: #fff; margin-bottom: 15px;">
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.ip)}</span> <span id="copyIpBtn" title="Copy IP" style="cursor:pointer; margin-left:6px; opacity:0.8; font-size:11px; user-select:none; background: rgba(128,128,128,0.15); border: 1px solid rgba(128,128,128,0.4); border-radius: 4px; padding: 1px 5px; vertical-align: middle; transition: background 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);" onmouseover="this.style.background='rgba(128,128,128,0.3)'" onmouseout="this.style.background='rgba(128,128,128,0.15)'" onclick="navigator.clipboard.writeText('${escapeHtml(locationInfo.ip)}').then(()=>{ this.textContent='✅'; setTimeout(()=>{ this.textContent='📋'; }, 1500); })">📋</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.city}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.city)}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.region}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.state)}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.country}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.country)}</span>${getStreakBadgeHtml()} <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">ISP:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.organization)}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.coordinates}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">(${escapeHtml(locationInfo.latitude)}, ${escapeHtml(locationInfo.longitude)})</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">Timer:</strong> <span id="callTimer" style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; font-family: monospace;">${initialTime}</span>
            </div>
        `;
        }

    const videoElement = document.getElementById('remoteVideo');
    if (videoElement) {
        captureAndStoreScreenshot(videoElement, ip);
    }
    
    const disconnectObserver = new MutationObserver((mutations, obs) => {
        const disconnected = document.querySelector('.disconnected, .disconnected-container');
        if (disconnected && timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
            callStartTime = null;
            obs.disconnect();
        }
    });
    
    disconnectObserver.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
    
    setTimeout(() => {
        const selectedCountries = _getSelectedCountries();
        if (selectedCountries.length > 0) {
            let partnerCountry = null;
            const countryNameDiv = document.getElementById('countryName');
            if (countryNameDiv && countryNameDiv.textContent) {
                partnerCountry = countryNameDiv.textContent.trim();
            }
            
            let countryMatch = selectedCountries.includes(partnerCountry);
            if (!countryMatch && (partnerCountry === 'Eswatini' || partnerCountry === 'Swaziland')) {
                countryMatch = selectedCountries.includes('Eswatini') || selectedCountries.includes('Swaziland');
            }
            
            if (partnerCountry && !countryMatch) {
                console.log(`Country ${partnerCountry} not in filter. Skipping...`);

                _doubleSkipButton();
            } else if (partnerCountry) {
                console.log(`Country ${partnerCountry} is in filter. Accepting connection.`);
            }
        } else {
            console.log('Country filter disabled - accepting all countries');
        }
    }, 369);
}
