    /*
    ===========================================
    Project: ChillTool's
    Autor: ChillSpot
    License: MIT License + Common Clause
    Repository: https://github.com/ChillSpotIT/chilltool-s/
    ===========================================
    DISCLAIMER:
    This software is provided "as is" solely for educational and research purposes.  
    The user is solely responsible for its use and must ensure they have obtained the necessary authorizations, in full compliance with all applicable laws on privacy, data protection, and cybersecurity.  
    The developers assume no responsibility for any misuse, illegal activity, or legal consequences resulting from the use of this software.  
    All IP or network-related information processed by the extension remains entirely on the user's device and **is never collected, stored, or transmitted externally**.  
    This project is **not affiliated with, endorsed by, or associated** in any way with Uhmegle or Umingle or related platforms.  
    All trademarks mentioned belong to their respective owners.
    ===========================================
    */

    (function() {
        'use strict';

        function getCookie(name) {
            const nameEQ = name + '=';
            const ca = document.cookie.split(';');
            for (let i = 0; i < ca.length; i++) {
                let c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
            return null;
        }

        if (window.location.pathname.includes('/video')) {
            const savedColor = getCookie('videoBorderColor') || localStorage.getItem('videoBorderColor');
            if (savedColor) {
                const styleElement = document.createElement('style');
                styleElement.id = 'rightBoxStyle';
            
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
                document.head.appendChild(styleElement);
            }
        }

        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
        document.head.appendChild(link);

        const CURRENT_VERSION = '3.8.8';

        const isUhmegle = window.location.hostname === 'uhmegle.com' || window.location.hostname === 'www.uhmegle.com';
        const isUmingle = window.location.hostname === 'umingle.com' || window.location.hostname === 'www.umingle.com';
        const baseUrl = isUmingle ? 'https://umingle.com' : 'https://uhmegle.com';

        if ((window.location.href === 'https://uhmegle.com/' || 
            window.location.href === 'https://uhmegle.com' ||
            window.location.href === 'https://umingle.com/' ||
            window.location.href === 'https://umingle.com') && (isUhmegle || isUmingle)) {
            setTimeout(() => {
                const lang = typeof getLang === 'function' ? getLang() : (localStorage.getItem('chilltool_lang') || 'en');
                const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : (translations && translations.en ? translations.en : { videoModeSuggestion: 'Switch to video mode to use ChillTools', close: 'Close' });
                const msg = t.videoModeSuggestion || 'Switch to video mode to use ChillTools';
                showNotification('ChillTools', msg, {
                    type: 'info',
                    duration: 5000,
                    pulse: true,
                    onClick: () => {
                        window.location.href = `${baseUrl}/video`;
                    }
                });
            }, 1000);
        }

        if ((isUhmegle || isUmingle) && window.location.pathname.startsWith('/text')) {
            setTimeout(() => {
                const lang = typeof getLang === 'function' ? getLang() : (localStorage.getItem('chilltool_lang') || 'en');
                const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : (translations && translations.en ? translations.en : { textModeNotSupported: 'Text mode is not supported!' });
                const msg = t.textModeNotSupported || 'Text mode is not supported!';
                showNotification('ChillTools', msg, {
                    type: 'warning',
                    duration: 5000,
                    pulse: true
                });
            }, 1500);
        }

        const style = document.createElement('style');
        style.textContent = `
            .chill-toast-container {
                position: fixed;
                top: 20px;
                left: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 10000;
                pointer-events: none;
            }
            .chill-toast {
                position: relative;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                color: white;
                padding: 15px 25px;
                border-radius: 8px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                display: flex;
                align-items: center;
                transform: translateX(-120%);
                transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s ease;
                opacity: 0;
                width: 350px;
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                pointer-events: auto;
            }
            
            .chill-toast.show {
                transform: translateX(0);
                opacity: 1;
            }
            
            .chill-toast i {
                margin-right: 12px;
                font-size: 20px;
                color: #4CAF50;
            }
            
            .chill-toast-content {
                flex: 1;
            }
            
            .chill-toast-title {
                font-weight: 600;
                margin-bottom: 4px;
                font-size: 15px;
                text-shadow: 0 1px 2px rgba(0,0,0,0.2);
            }
            
            .chill-toast-message {
                font-size: 13px;
                opacity: 0.9;
            }
            
            .chill-toast-close {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 18px;
                cursor: pointer;
                padding: 0 0 0 15px;
                transition: color 0.2s;
            }
            
            .chill-toast-close:hover {
                color: white;
            }
            
            @keyframes chillPulse {
                0% { box-shadow: 0 0 0 0 rgba(30, 60, 114, 1); }
                70% { box-shadow: 0 0 0 10px rgba(30, 60, 114, 0); }
                100% { box-shadow: 0 0 0 0 rgba(30, 60, 114, 0); }
            }
            
            .chill-toast.pulse {
                animation: chillPulse 2s infinite;
            }
            
            #chillToolbar.chill-blur {
                filter: blur(6px) brightness(0.7);
                pointer-events: none !important;
                transition: filter 0.2s;
            }

            #ipDisplayBox.chilltool-light-mode,
            #ipDisplayBox.chilltool-light-mode * {
                color: #333 !important;
            }
            #ipDisplayBox.chilltool-light-mode h3 {
                color: #333 !important;
            }
            .chilltool-light-mode {
                background-color: rgba(245, 245, 245, 0.9) !important;
                border-color: #ddd !important;
            }
            .chilltool-light-mode-btn {
                background-color: #0056b3 !important;
                color: white !important;
            }
            .history-text {
                color: white !important;
                text-shadow: 
                    -1px -1px 0 #000,
                    1px -1px 0 #000,
                    -1px 1px 0 #000,
                    1px 1px 0 #000 !important;
            }
        `;
        document.head.appendChild(style);

        function checkBackgroundColor() {
            const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow') || document.body;
            const bgColor = window.getComputedStyle(chatContainer).backgroundColor;
            
            const rgb = bgColor.match(/\d+/g);
            const isLight = chatContainer.classList.contains('theme-light') || 
                        bgColor.includes('255, 255, 255') || 
                        bgColor.includes('255,255,255') || 
                        bgColor.includes('#fff') || 
                        bgColor.includes('#ffffff') ||
                        (rgb && rgb.length >= 3 && 
                            parseInt(rgb[0]) > 200 && 
                            parseInt(rgb[1]) > 200 && 
                            parseInt(rgb[2]) > 200);

            const elementsToStyle = document.querySelectorAll('#ipDisplayBox, #ipDisplayBox *, #historyModal, #screenshotModal, .history-entry');
            elementsToStyle.forEach(el => {
                if (isLight) {
                    el.classList.add('chilltool-light-mode');
                    if (el.id === 'ipDisplayBox' || el.closest('#ipDisplayBox')) {
                        el.classList.add('chilltool-dark-text');
                    }
                } else {
                    el.classList.remove('chilltool-light-mode');
                    el.classList.remove('chilltool-dark-text');
                }
            });

            document.querySelectorAll('#chillToolbar button, #closeHistory, #settingsModal button').forEach(btn => {
                if (isLight) {
                    btn.classList.add('chilltool-light-mode-btn');
                } else {
                    btn.classList.remove('chilltool-light-mode-btn');
                }
            });
        }

        function setupBackgroundObserver() {
            const targetNode = document.querySelector('.chat-container') || document.querySelector('.chatWindow') || document.body;
            if (!targetNode) return;

            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && 
                    (mutation.attributeName === 'style' || 
                        mutation.attributeName === 'class')) {
                        checkBackgroundColor();
                    }
                });
            });

            observer.observe(targetNode, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                subtree: true
            });

            checkBackgroundColor();
            
            setInterval(checkBackgroundColor, 1000);
        }

        function getChatBoxColor() {
            const textBox = document.querySelector('.chatWindow') || document.querySelector('.chat-container');
            return textBox ? window.getComputedStyle(textBox).backgroundColor : '#000';
        }

        const getLocation = async (ip) => {
            const url = `https://get.geojs.io/v1/ip/geo/${ip}.json`;

            try {
                const response = await fetch(url);
                const json = await response.json();
                return {
                    ip: ip,
                    country: json.country || "N/A",
                    state: json.region || "N/A",
                    region: json.region || "N/A",
                    city: json.city || "N/A",
                    latitude: json.latitude || "N/A",
                    longitude: json.longitude || "N/A",
                    organization: json.organization_name || "N/A"
                };
            } catch (error) {
                console.error("Error fetching IP location:", error);
                return null;
            }
        };

        function getOrCreateIpBox() {
            let ipBox = document.getElementById("ipDisplayBox");

            if (!ipBox) {
                const countryInfoDiv = document.querySelector('.countryInfo');
                const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow');
                
                if (!chatContainer) return null;

                ipBox = document.createElement("div");
                ipBox.id = "ipDisplayBox";
                ipBox.style.backgroundColor = getChatBoxColor();
                ipBox.style.padding = "10px";
                ipBox.style.marginTop = "10px";
                ipBox.style.color = "#fff";
                ipBox.style.fontSize = "14px";
                ipBox.style.maxHeight = "200px";
                ipBox.style.overflowY = "auto";
                ipBox.style.overflowX = "hidden";
                ipBox.style.borderRadius = "10px";
                ipBox.style.border = "1px solid #333";
                ipBox.style.display = 'block';
                ipBox.style.overflow = "hidden";
                ipBox.style.flexShrink = "0";   
                ipBox.innerHTML = "<h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>";
                
                if (countryInfoDiv && countryInfoDiv.parentNode) {
                    countryInfoDiv.parentNode.insertBefore(ipBox, countryInfoDiv.nextSibling);
                } else {
                    chatContainer.appendChild(ipBox);
                }
                
                setTimeout(checkBackgroundColor, 100);
            }

            return ipBox;
        }

        const isMobile = () => {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        };

        const createToolbar = () => {
            const toolbar = document.createElement("div");
            toolbar.id = "chillToolbar";
            toolbar.style.position = "fixed";
            toolbar.style.top = "20px";
            toolbar.style.right = "250px";
            toolbar.style.display = "flex";
            toolbar.style.gap = "10px";
            toolbar.style.zIndex = "10000";
            toolbar.style.width = "auto";
            toolbar.style.justifyContent = "flex-start";
            
            if (isMobile()) {
                toolbar.style.position = "absolute";
                toolbar.style.top = "5px";
                toolbar.style.left = "5px";
                toolbar.style.right = "auto";
                toolbar.style.gap = "6px";
                toolbar.style.padding = "5px 8px";
                toolbar.style.borderRadius = "12px";
                toolbar.style.zIndex = "999"; 
                const buttons = toolbar.querySelectorAll('button');
                buttons.forEach(button => {
                    button.style.marginTop = '0';
                    button.style.marginBottom = '0';
                    button.style.padding = '8px 10px';
                });
            }
            
            const leftButtons = document.createElement("div");
            leftButtons.style.display = "flex";
            leftButtons.style.gap = "10px";
            leftButtons.style.flexGrow = "1";

            const rightButtons = document.createElement("div");
            rightButtons.style.display = "flex";
            rightButtons.style.gap = "10px";
            rightButtons.style.marginLeft = "auto";

            const historyBtn = document.createElement("button");
            historyBtn.id = "chillHistoryBtn";
            historyBtn.innerHTML = '<i class="fas fa-clock"></i>';
            historyBtn.style.background = isMobile() ? "#007bff" : "#007bff";
            historyBtn.style.color = "white";
            historyBtn.style.border = "none";
            historyBtn.style.borderRadius = isMobile() ? "8px" : "5px";
            historyBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
            historyBtn.style.cursor = "pointer";
            historyBtn.style.fontSize = isMobile() ? "16px" : "inherit";
            historyBtn.title = translations[getLang()].history;
            
            let isHistoryVisible = false;
            historyBtn.addEventListener("click", function() {
                if (isHistoryVisible) {
                    const existingModal = document.getElementById("historyModal");
                    if (existingModal) existingModal.remove();
                    isHistoryVisible = false;
                } else {
                    displayHistory();
                    isHistoryVisible = true;
                }
            });
            leftButtons.appendChild(historyBtn);
            
            const banBtn = document.createElement("button");
            banBtn.id = "chillBanBtn";
            
            const settingsBtn = document.createElement("button");
            settingsBtn.id = "chillSettingsBtn";
            settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
            settingsBtn.style.background = "#6c757d";
            settingsBtn.style.color = "white";
            settingsBtn.style.border = "none";
            settingsBtn.style.borderRadius = isMobile() ? "8px" : "5px";
            settingsBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
            settingsBtn.style.cursor = "pointer";
            settingsBtn.style.fontSize = isMobile() ? "16px" : "inherit";
            settingsBtn.title = translations[getLang()].settings;
            settingsBtn.addEventListener("click", function() {
                showSettings();
            });
            
            rightButtons.appendChild(settingsBtn);
            
            toolbar.appendChild(leftButtons);
            toolbar.appendChild(rightButtons);
            banBtn.innerHTML = '<i class="fas fa-user-slash"></i>';
            banBtn.style.background = "#dc3545";
            banBtn.style.color = "white";
            banBtn.style.border = "none";
            banBtn.style.borderRadius = isMobile() ? "8px" : "5px";
            banBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
            banBtn.style.cursor = "pointer";
            banBtn.style.fontSize = isMobile() ? "16px" : "inherit";
            banBtn.title = translations[getLang()].ban;
            banBtn.disabled = true;
            banBtn.addEventListener("click", function() {
                if (currentSession.ip) {
                    const bannedUsers = getBannedUsers();
                    const userToBan = {
                        ip: currentSession.ip,
                        info: currentSession.info,
                        screenshot: currentSession.screenshot,
                        timestamp: new Date().toLocaleString()
                    };
                    bannedUsers.push(userToBan);
                    saveBannedUsers(bannedUsers);
                    restartConnection();
                }
            });
            leftButtons.appendChild(banBtn);

            const bannedListBtn = document.createElement("button");
            bannedListBtn.id = "chillBannedListBtn";
            bannedListBtn.innerHTML = '<i class="fas fa-list"></i>';
            bannedListBtn.style.background = "#ffc107";
            bannedListBtn.style.color = "black";
            bannedListBtn.style.border = "none";
            bannedListBtn.style.borderRadius = isMobile() ? "8px" : "5px";
            bannedListBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
            bannedListBtn.style.cursor = "pointer";
            bannedListBtn.style.fontSize = isMobile() ? "16px" : "inherit";
            bannedListBtn.title = translations[getLang()].bannedUsers;
            bannedListBtn.addEventListener("click", function() {
                displayBannedUsers();
            });
            leftButtons.appendChild(bannedListBtn);

            const countryFilterBtn = document.createElement("button");
            countryFilterBtn.id = "chillCountryFilterBtn";
            countryFilterBtn.innerHTML = '<i class="fas fa-globe"></i>';
            countryFilterBtn.style.background = "#17a2b8";
            countryFilterBtn.style.color = "white";
            countryFilterBtn.style.border = "none";
            countryFilterBtn.style.borderRadius = isMobile() ? "8px" : "5px";
            countryFilterBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
            countryFilterBtn.style.cursor = "pointer";
            countryFilterBtn.style.fontSize = isMobile() ? "16px" : "inherit";
            countryFilterBtn.title = translations[getLang()].countryFilter;
            countryFilterBtn.addEventListener("click", function() {
                showCountryFilterModal();
            });
            leftButtons.appendChild(countryFilterBtn);

            return toolbar;
        };

        function restartConnection() {
            const chatWindow = document.querySelector('.chatWindow') || document.querySelector('.chat-container');
            if (chatWindow) {
                const pressEsc = () => {
                    const escEvent = new KeyboardEvent('keydown', { 
                        key: 'Escape', 
                        code: 'Escape', 
                        keyCode: 27, 
                        which: 27, 
                        bubbles: true 
                    });
                    document.dispatchEvent(escEvent);
                };
                pressEsc();
                setTimeout(pressEsc, 10);
            }
        }

        function unblurToolbar() {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar) {
                toolbar.classList.remove('chill-blur');
            }
        }

        function showNotification(title, message, options = {}) {
            const { type = 'info', duration = 4000, showClose = true } = options;
            const lang = getLang();
            const t = translations[lang] || translations['en'];
            
            const toast = document.createElement('div');
            toast.className = 'chill-toast';
            
            let icon = 'info-circle';
            if (type === 'success') icon = 'check-circle';
            else if (type === 'error') icon = 'exclamation-circle';
            else if (type === 'warning') icon = 'exclamation-triangle';
            
            if (options.pulse) {
                toast.classList.add('pulse');
            }
            
            toast.innerHTML = `
                <i class="fas fa-${icon}"></i>
                <div class="chill-toast-content">
                    <div class="chill-toast-title">${title}</div>
                    <div class="chill-toast-message">${message}</div>
                </div>
                ${showClose ? '<button class="chill-toast-close">&times;</button>' : ''}
            `;
            if (options.iconColor) {
                try {
                    const ic = toast.querySelector('i');
                    if (ic) ic.style.color = options.iconColor;
                } catch (_) {}
            }
            
            let container = document.getElementById('chill-toast-container');
            if (!container) {
                container = document.createElement('div');
                container.id = 'chill-toast-container';
                container.className = 'chill-toast-container';
                document.body.appendChild(container);
            }
            container.appendChild(toast);
            
            void toast.offsetWidth;
            
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            let timeout;
            if (duration > 0) {
                timeout = setTimeout(() => {
                    hideToast(toast);
                }, duration);
            }
            
            if (typeof options.onClick === 'function') {
                toast.addEventListener('click', (e) => {
                    if (!(e.target && e.target.classList && e.target.classList.contains('chill-toast-close'))) {
                        options.onClick();
                    }
                });
            }

            const closeBtn = toast.querySelector('.chill-toast-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    clearTimeout(timeout);
                    hideToast(toast);
                });
            }
            
            toast.addEventListener('mouseenter', () => {
                if (timeout) clearTimeout(timeout);
            });
            
            toast.addEventListener('mouseleave', () => {
                if (duration > 0) {
                    timeout = setTimeout(() => {
                        hideToast(toast);
                    }, 500);
                }
            });
            
            function hideToast(element) {
                const container = document.getElementById('chill-toast-container');
                const siblings = container ? Array.from(container.children).filter(el => el !== element) : [];
                const positionsBefore = new Map();
                siblings.forEach(el => positionsBefore.set(el, el.getBoundingClientRect().top));

                element.classList.remove('show');
                setTimeout(() => {
                    if (element.parentNode) {
                        element.parentNode.removeChild(element);
                    }
                    if (container) {
                        const remaining = Array.from(container.children);
                        remaining.forEach(el => {
                            const beforeTop = positionsBefore.get(el);
                            if (beforeTop == null) return;
                            const afterTop = el.getBoundingClientRect().top;
                            const deltaY = beforeTop - afterTop;
                            if (Math.abs(deltaY) > 0.5) {
                                el.style.transition = 'none';
                                el.style.transform = `translateY(${deltaY}px)`;
                                void el.offsetHeight;
                                el.style.transition = 'transform 200ms ease';
                                el.style.transform = '';
                                const onEnd = () => {
                                    el.style.transition = '';
                                    el.removeEventListener('transitionend', onEnd);
                                };
                                el.addEventListener('transitionend', onEnd);
                            }
                        });
                    }
                    if (typeof options.onClose === 'function') {
                        try { options.onClose(); } catch (_) {}
                    }
                    const c = document.getElementById('chill-toast-container');
                    if (c && c.children.length === 0) {
                        c.remove();
                    }
                }, 500);
            }
        }
        
        function showWelcomeNotification() {
            const host = (window.location && window.location.hostname) ? window.location.hostname : '';
            const path = (window.location && window.location.pathname) ? window.location.pathname : '';
            if ((host !== 'uhmegle.com' && host !== 'umingle.com') || !path.startsWith('/video')) {
                return;
            }

            const lang = getLang();
            const t = translations[lang] || translations['en'];
            const welcomeMessages = {
                'en': 'ChillTools is now active and ready to use!',
                'es': '¡ChillTools está activo y listo para usar!',
                'fr': 'ChillTools est maintenant actif et prêt à l\'emploi !',
                'de': 'ChillTools ist jetzt aktiv und einsatzbereit!',
                'ar': 'ChillTools الآن نشط و جاهز للعمل!',
                'hi': 'ChillTools अब अच्छा और उपयोग के लिए अच्छा!',
                'bn': 'ChillTools হচ্ছে এখন অচ্ছা এবং ব্যবহারের জন্য অচ্ছা!',
                'ru': 'ChillTools теперь активен и готов к работе!',
                'pt': 'ChillTools agora está ativo e pronto para usar!',
                'id': 'ChillTools sekarang aktif dan siap untuk digunakan!',
                'it': 'ChillTools è ora attivo e pronto per essere utilizzato!',
                'ch': 'ChillTools 现在已激活并准备就绪!'
            };
            
            const message = welcomeMessages[lang] || welcomeMessages['en'];
            window.chilltoolsWelcomeShown = true;
            showNotification('ChillTools', message, {
                type: 'success',
                duration: 5000,
                pulse: true,
                onClose: () => { window.chilltoolsWelcomeClosed = true; }
            });
        }
        setTimeout(showWelcomeNotification, 1000);

        function getIpDisplayPreference() {
            return false; 
        }
        
        function setIpDisplayPreference(show) {
            const ipDisplayBox = document.getElementById('ipDisplayBox');
            if (ipDisplayBox) {
                ipDisplayBox.style.display = show ? 'block' : 'none';
                if (!show && isIpDisplayEnabled) {
                    ipDisplayBox.style.display = 'block';
                }
            }
        }

        let isIpDisplayEnabled = true;

        const translations = {
            en: {
                showIpDisplay: 'Show IP Display',
                settings: 'Settings',
                settingsDesc: 'Here you can configure the extension settings',
                language: 'Language:',
                whiteColorNotAllowed: 'White color is not allowed. Please choose a different color.',
                close: 'Close',
                history: 'History',
                ban: 'Block User',
                bannedUsers: 'Blocked Users List',
                restarting: 'Restarting connection...',
                historyLimit: 'Only the last 30 people screenshots are saved',
                emptyHistory: 'History is empty',
                connectToStart: 'Connect with partners to start recording',
                zero: '0 entries',
                entry: 'entry',
                entries: 'entries',
                ip: 'IP',
                city: 'City',
                region: 'Region',
                country: 'Country',
                coordinates: 'Coordinates',
                time: 'Time',
                photoNotAvailable: 'The photo is no longer available',
                skip25Msg: "THIS PERSON WAS MET MORE THAN 30 SKIPS AGO!",
                banListTitle: 'Block List',
                screenshot: 'Screenshot',
                actions: 'Actions',
                bannedListEmpty: 'Block list is empty',
                videoModeSuggestion: 'Switch to video mode to use ChillTools',
                textModeNotSupported: 'Text mode is not supported!',
                betaWelcome: 'Welcome Aboard, Beta Tester!',
                outdatedExtension: 'Extension is outdated!',
                apply: 'Apply',
                color: 'Color',
                videoBorder: 'Custom Color',
                userStyles: 'UserStyles',
                userStylesDesc: 'Customize the look of the site and extension with custom CSS',
                customCSS: 'Custom CSS',
                reset: 'Reset',
                save: 'Save',
                gallery: 'Gallery',
                userStyleActive: 'UserStyle is active. Custom colors are disabled.',
                disableUserStyle: 'Disable UserStyle to use custom colors.',
                galleryDesc: 'Choose from pre-made styles',
                applyStyle: 'Apply',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Custom styles have been reset',
                stylesSaved: 'Custom styles saved successfully!',
                styleApplied: 'applied!',
                omegle: 'Omegle Style',
                pauseButton: 'Pause',
                countryFilter: 'Country Filter',
                countryFilterDesc: 'Select countries to connect with',
                selectCountries: 'Select Countries',
                noCountriesSelected: 'No countries selected - all countries allowed',
                countriesSelected: 'countries selected'
            },
            zh: {
                showIpDisplay: '显示IP',
                settings: '设置',
                settingsDesc: '在这里您可以配置扩展设置',
                language: '语言:',
                whiteColorNotAllowed: '不允许使用白色。请选择其他颜色。',
                close: '关闭',
                history: '历史记录',
                ban: '屏蔽用户',
                bannedUsers: '已屏蔽用户',
                restarting: '正在重新启动连接...',
                historyLimit: '只保存最后30个人的截图',
                emptyHistory: '历史记录为空',
                connectToStart: '连接伙伴开始录制',
                zero: '0条记录',
                entry: '条记录',
                entries: '条记录',
                ip: 'IP',
                city: '城市',
                region: '地区',
                country: '国家',    
                coordinates: '坐标',
                time: '时间',
                photoNotAvailable: '照片不再可用',
                skip25Msg: "此人在30次跳过前遇到过！",
                apply: '应用',
                color: '颜色',
                videoBorder: '自定义颜色',
                banListTitle: '屏蔽列表',
                screenshot: '截图',
                actions: '操作',
                bannedListEmpty: '屏蔽列表为空',
                videoModeSuggestion: '切换到视频模式以使用 ChillTools',
                textModeNotSupported: '文本模式不受支持！',
                betaWelcome: '欢迎加入，测试员！',
                outdatedExtension: '扩展已过期！',
                userStyles: '用户样式',
                userStylesDesc: '使用自定义CSS自定义网站和扩展的外观',
                customCSS: '自定义CSS',
                reset: '重置',
                save: '保存',
                gallery: '画廊',
                userStyleActive: 'UserStyle 已激活。自定义颜色已禁用。',
                disableUserStyle: '禁用 UserStyle 以使用自定义颜色。',
                galleryDesc: '选择预制样式',
                applyStyle: '应用',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: '自定义样式已重置',
                stylesSaved: '自定义样式保存成功！',
                styleApplied: '已应用！',
                omegle: 'Omegle Style',
                pauseButton: '暂停',
                countryFilter: '国家过滤',
                countryFilterDesc: '选择要连接的国家',
                selectCountries: '选择国家',
                noCountriesSelected: '未选择国家 - 允许所有国家',
                countriesSelected: '个国家已选择'
            },
            hi: {
                showIpDisplay: 'आईपी डिस्प्ले बॉक्स दिखाएं',
                settings: 'सेटिंग्स',
                apply: 'लागू करें',
                color: 'रंग',
                videoBorder: 'कास्टम रंग',
                whiteColorNotAllowed: 'सफेद रंग की अनुमति नहीं है। कृपया कोई अन्य रंग चुनें।',
                settingsDesc: 'यहां आप एक्सटेंशन सेटिंग्स कॉन्फ़िगर कर सकते हैं',
                language: 'भाषा:',
                close: 'बंद करें',
                history: 'इतिहास',
                ban: 'उपयोगकर्ता को ब्लॉक करें',
                bannedUsers: 'ब्लॉक किए गए उपयोगकर्ता',
                restarting: 'कनेक्शन पुनः आरंभ किया जा रहा है...',
                historyLimit: 'केवल अंतिम 30 लोगों के स्क्रीनशॉट सहेजे जाते हैं',
                emptyHistory: 'इतिहास खाली है',
                connectToStart: 'रिकॉर्डिंग शुरू करने के लिए साथियों से कनेक्ट करें',
                zero: '0 प्रविष्टियाँ',
                entry: 'प्रविष्टि',
                entries: 'प्रविष्टियाँ',
                ip: 'आईपी',
                city: 'शहर',
                region: 'क्षेत्र',
                country: 'देश',
                coordinates: 'निर्देशांक',
                time: 'समय',
                photoNotAvailable: 'फोटो अब उपलब्ध नहीं है',
                skip25Msg: "यह व्यक्ति 30 से अधिक स्किप्स पहले मिला था!",
                banListTitle: 'ब्लॉक सूची',
                screenshot: 'स्क्रीनशॉट',
                actions: 'कार्रवाई',
                bannedListEmpty: 'ब्लॉक सूची खाली है',
                videoModeSuggestion: 'ChillTools का उपयोग करने के लिए वीडियो मोड पर स्विच करें',
                textModeNotSupported: 'टेक्स्ट मोड समर्थित नहीं है!',
                betaWelcome: 'स्वागत है, बीटा परीक्षक!',
                outdatedExtension: 'एक्सटेंशन पुराना हो गया है!',
                userStyles: 'उपयोगकर्ता शैलियाँ',
                userStylesDesc: 'कस्टम CSS के साथ साइट और एक्सटेंशन की लुक को कस्टमाइज़ करें',
                customCSS: 'कस्टम CSS',
                reset: 'रीसेट करें',
                save: 'सहेजें',
                gallery: 'गैलरी',
                userStyleActive: 'UserStyle सक्रिय है। कस्टम रंग अक्षम हैं।',
                disableUserStyle: 'कस्टम रंगों का उपयोग करने के लिए UserStyle अक्षम करें।',
                galleryDesc: 'पूर्व-निर्मित शैलियों में से चुनें',
                applyStyle: 'लागू करें',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'कस्टम शैलियाँ रीसेट कर दी गई हैं',
                stylesSaved: 'कस्टम शैलियाँ सफलतापूर्वक सहेजी गईं!',
                styleApplied: 'लागू किया गया!',
                omegle: 'Omegle Style',
                pauseButton: 'रोकें',
                countryFilter: 'देश फ़िल्टर',
                countryFilterDesc: 'कनेक्ट करने के लिए देश चुनें',
                selectCountries: 'देश चुनें',
                noCountriesSelected: 'कोई देश नहीं चुना गया - सभी देश अनुमत',
                countriesSelected: 'देश चुने गए'
            },
            es: {
                showIpDisplay: 'Mostrar IP',
                settings: 'Configuración',
                settingsDesc: 'Aquí puedes configurar los ajustes de la extensión',
                language: 'Idioma:',
                whiteColorNotAllowed: 'El color blanco no está permitido. Por favor, elija un color diferente.',
                close: 'Cerrar',
                history: 'Historial',
                ban: 'Bloquear usuario',
                bannedUsers: 'Usuarios bloqueados',
                restarting: 'Reiniciando conexión...',
                historyLimit: 'Solo se guardan capturas de las últimas 30 personas',
                emptyHistory: 'El historial está vacío',
                connectToStart: 'Conéctate con compañeros para comenzar a grabar',
                zero: '0 encuentros',
                entry: 'entrada',
                entries: 'entradas',
                ip: 'IP',
                city: 'Ciudad',
                region: 'Región',
                country: 'País',
                coordinates: 'Coordenadas',
                time: 'Hora',
                photoNotAvailable: 'La foto ya no está disponible',
                skip25Msg: "¡ESTA PERSONA FUE ENCONTRADA HACE MÁS DE 30 SKIPS!",
                banListTitle: 'Lista de Bloqueados',
                screenshot: 'Captura',
                actions: 'Acciones',
                bannedListEmpty: 'La lista de bloqueados está vacía',
                videoModeSuggestion: 'Cambia al modo video para usar ChillTools',
                textModeNotSupported: '¡El modo texto no es compatible!',
                betaWelcome: '¡Bienvenido a bordo, tester beta!',
                outdatedExtension: '¡La extensión está desactualizada!',
                apply: 'Aplicar',
                color: 'Color',
                videoBorder: 'Color personalizado',
                userStyles: 'UserStyles',
                userStylesDesc: 'Personaliza el aspecto del sitio y la extensión con CSS personalizado',
                customCSS: 'CSS Personalizado',
                reset: 'Restablecer',
                save: 'Guardar',
                gallery: 'Galería',
                userStyleActive: 'UserStyle está activo. Los colores personalizados están deshabilitados.',
                disableUserStyle: 'Deshabilita UserStyle para usar colores personalizados.',
                galleryDesc: 'Elige entre estilos predefinidos',
                applyStyle: 'Aplicar',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Los estilos personalizados se han restablecido',
                stylesSaved: '¡Estilos personalizados guardados con éxito!',
                styleApplied: '¡aplicado!',
                omegle: 'Omegle Style',
                pauseButton: 'Pausar',
                countryFilter: 'Filtro de País',
                countryFilterDesc: 'Selecciona países para conectar',
                selectCountries: 'Seleccionar Países',
                noCountriesSelected: 'Ningún país seleccionado - todos los países permitidos',
                countriesSelected: 'países seleccionados'
            },
            ar: {
                settings: 'الإعدادات',
                apply: 'تطبيق',
                showIpDisplay: 'عرض IP',
                color: 'لون',
                videoBorder: 'لون مخصص',
                whiteColorNotAllowed: 'اللون الأبيض غير مسموح به. الرجاء اختيار لون آخر.',
                settingsDesc: 'هنا يمكنك تكوين إعدادات الامتداد',
                language: 'اللغة:',
                close: 'إغلاق',
                history: 'السجل',
                ban: 'حظر المستخدم',
                bannedUsers: 'المستخدمون المحظورون',
                restarting: 'جاري إعادة تشغيل الاتصال...',
                historyLimit: 'يتم حفظ لقطات الشاشة لآخر 30 شخصًا فقط',
                emptyHistory: 'السجل فارغ',
                connectToStart: 'اتصل بالشركاء لبدء التسجيل',
                zero: '0 إدخالات',
                entry: 'إدخال',
                entries: 'إدخالات',
                ip: 'IP',
                city: 'المدينة',
                region: 'المنطقة',
                country: 'البلد',
                coordinates: 'الإحداثيات',
                time: 'الوقت',
                photoNotAvailable: 'الصورة لم تعد متوفرة',
                skip25Msg: "تمت مقابلة هذا الشخص منذ أكثر من 30 تخطي!",
                banListTitle: 'قائمة الحظر',
                screenshot: 'لقطة الشاشة',
                actions: 'إجراءات',
                bannedListEmpty: 'قائمة الحظر فارغة',
                videoModeSuggestion: 'بدّل إلى وضع الفيديو لاستخدام ChillTools',
                textModeNotSupported: 'وضع النص غير مدعوم!',
                betaWelcome: 'مرحبًا بكم، مختبِر النسخة التجريبية!',
                outdatedExtension: 'الامتداد قديم!',
                userStyles: 'أنماط المستخدم',
                userStylesDesc: 'تخصيص مظهر الموقع والامتداد باستخدام CSS مخصص',
                customCSS: 'CSS مخصص',
                reset: 'إعادة تعيين',
                save: 'حفظ',
                gallery: 'معرض',
                userStyleActive: 'UserStyle نشطة. الألوان المخصصة معطلة.',
                disableUserStyle: 'عطل UserStyle لاستخدام الألوان المخصصة.',
                galleryDesc: 'اختر من الأنماط الجاهزة',
                applyStyle: 'تطبيق',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'تم إعادة تعيين الأنماط المخصصة',
                stylesSaved: 'تم حفظ الأنماط المخصصة بنجاح!',
                styleApplied: 'تم التطبيق!',
                omegle: 'Omegle Style',
                pauseButton: 'إيقاف مؤقت',
                countryFilter: 'تصفية البلد',
                countryFilterDesc: 'حدد البلدان للاتصال بها',
                selectCountries: 'اختر البلدان',
                noCountriesSelected: 'لم يتم اختيار أي بلد - جميع البلدان مسموح بها',
                countriesSelected: 'البلدان المحددة'
            },
            fr: {
                settings: 'Paramètres',
                apply: 'Appliquer',
                color: 'Couleur',
                showIpDisplay: 'Afficher la boîte d\'affichage IP',
                videoBorder: 'Couleur personnalisée',
                whiteColorNotAllowed: 'La couleur blanche n\'est pas autorisée. Veuillez choisir une couleur différente.',
                settingsDesc: 'Ici vous pouvez configurer les paramètres de l\'extension',
                language: 'Langue:',
                close: 'Fermer',
                history: 'Historique',
                ban: 'Bloquer l\'utilisateur',
                bannedUsers: 'Utilisateurs bloqués',
                restarting: 'Redémarrage de la connexion...',
                historyLimit: 'Seules les captures des 30 dernières personnes sont enregistrées',
                emptyHistory: 'L\'historique est vide',
                connectToStart: 'Connectez-vous avec des partenaires pour commencer l\'enregistrement',
                zero: '0 entrées',
                entry: 'entrée',
                entries: 'entrées',
                ip: 'IP',
                city: 'Ville',
                region: 'Région',
                country: 'Pays',
                coordinates: 'Coordonnées',
                time: 'Heure',
                photoNotAvailable: 'La photo n\'est plus disponible',
                skip25Msg: "CETTE PERSONNE A ÉTÉ RENCONTRÉE IL Y A PLUS DE 30 SAUTS!",
                banListTitle: 'Liste des Bloqués',
                screenshot: 'Capture',
                actions: 'Actions',
                bannedListEmpty: 'La liste des bloqués est vide',
                videoModeSuggestion: 'Passez en mode vidéo pour utiliser ChillTools',
                textModeNotSupported: 'Le mode texte n\'est pas pris en charge !',
                betaWelcome: 'Bienvenue à bord, testeur bêta !',
                outdatedExtension: "L'extension est obsolète !",
                userStyles: 'UserStyles',
                userStylesDesc: 'Personnalisez l\'apparence du site et de l\'extension avec du CSS personnalisé',
                customCSS: 'CSS Personnalisé',
                reset: 'Réinitialiser',
                save: 'Enregistrer',
                gallery: 'Galerie',
                userStyleActive: 'UserStyle est actif. Les couleurs personnalisées sont désactivées.',
                disableUserStyle: 'Désactivez UserStyle pour utiliser les couleurs personnalisées.',
                galleryDesc: 'Choisissez parmi les styles prédéfinis',
                applyStyle: 'Appliquer',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Les styles personnalisés ont été réinitialisés',
                stylesSaved: 'Styles personnalisés enregistrés avec succès!',
                styleApplied: 'appliqué!',
                omegle: 'Omegle Style',
                pauseButton: 'Pause',
                countryFilter: 'Filtre de Pays',
                countryFilterDesc: 'Sélectionnez les pays à connecter',
                selectCountries: 'Sélectionner les Pays',
                noCountriesSelected: 'Aucun pays sélectionné - tous les pays autorisés',
                countriesSelected: 'pays sélectionnés'
            },
            bn: {
                settings: 'সেটিংস',
                apply: 'প্রয়োগ করুন',
                color: 'রঙ',
                videoBorder: 'কাস্টম রঙ',
                whiteColorNotAllowed: 'সাদা রং অনুমোদিত নয়। অনুগ্রহ করে একটি ভিন্ন রং নির্বাচন করুন।',
                settingsDesc: 'এখানে আপনি এক্সটেনশন সেটিংস কনফিগার করতে পারেন',
                language: 'ভাষা:',
                showIpDisplay: 'IP দেখানো',
                close: 'বন্ধ',
                history: 'ইতিহাস',
                ban: 'ব্যবহারকারী ব্লক করুন',
                bannedUsers: 'ব্লক করা ব্যবহারকারীরা',
                restarting: 'সংযোগ পুনরায় শুরু করা হচ্ছে...',
                historyLimit: 'শুধুমাত্র শেষ 30 জনের স্ক্রিনশট সংরক্ষণ করা হয়',
                emptyHistory: 'ইতিহাস খালি',
                connectToStart: 'রেকর্ডিং শুরু করতে অংশীদারদের সাথে সংযোগ করুন',
                zero: '0 এন্ট্রি',
                entry: 'এন্ট্রি',
                entries: 'এন্ট্রি',
                ip: 'আইপি',
                city: 'শহর',
                region: 'অঞ্চল',
                country: 'দেশ',
                coordinates: 'স্থানাঙ্ক',
                time: 'সময়',
                photoNotAvailable: 'ছবিটি আর পাওয়া যাচ্ছে না',
                skip25Msg: "এই ব্যক্তিকে 30 টির বেশি স্কিপ আগে দেখা হয়েছিল!",
                banListTitle: 'ব্লক তালিকা',
                screenshot: 'স্ক্রিনশট',
                actions: 'কার্যকলাপ',
                bannedListEmpty: 'ব্লক তালিকা খালি',
                videoModeSuggestion: 'ChillTools ব্যবহার করতে ভিডিও মোডে স্যুইচ করুন',
                textModeNotSupported: 'টেক্সট মোড সমর্থিত নয়!',
                betaWelcome: 'স্বাগতম, বেটা পরীক্ষক!',
                outdatedExtension: 'এক্সটেনশনটি পুরোনো হয়ে গেছে!',
                apply: 'প্রয়োগ করুন',
                color: 'রঙ',
                userStyles: 'ব্যবহারকারী শৈলী',
                userStylesDesc: 'কাস্টম CSS দিয়ে সাইট এবং এক্সটেনশনের চেহারা কাস্টমাইজ করুন',
                customCSS: 'কাস্টম CSS',
                reset: 'রিসেট করুন',
                save: 'সংরক্ষণ করুন',
                gallery: 'গ্যালারি',
                userStyleActive: 'UserStyle সক্রিয়। কাস্টম রঙ নিষ্ক্রিয়।',
                disableUserStyle: 'কাস্টম রঙ ব্যবহার করতে UserStyle নিষ্ক্রিয় করুন।',
                galleryDesc: 'পূর্ব-নির্মিত শৈলী থেকে বেছে নিন',
                applyStyle: 'প্রয়োগ করুন',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'কাস্টম শৈলী রিসেট করা হয়েছে',
                stylesSaved: 'কাস্টম শৈলী সফলভাবে সংরক্ষিত হয়েছে!',
                styleApplied: 'প্রয়োগ করা হয়েছে!',
                omegle: 'Omegle Style',
                pauseButton: 'থামান',
                countryFilter: 'দেশ ফিল্টার',
                countryFilterDesc: 'সংযোগ করার জন্য দেশ নির্বাচন করুন',
                selectCountries: 'দেশ নির্বাচন করুন',
                noCountriesSelected: 'কোনো দেশ নির্বাচন করা হয়নি - সব দেশ অনুমোদিত',
                countriesSelected: 'দেশ নির্বাচিত'
            },

            ru: {
                settings: 'Настройки',
                apply: 'Применить',
                color: 'Цвет',
                videoBorder: 'Кастомный цвет',
                whiteColorNotAllowed: 'Белый цвет не разрешен. Пожалуйста, выберите другой цвет.',
                settingsDesc: 'Здесь вы можете настроить параметры расширения',
                language: 'Язык:',
                close: 'Закрыть',
                showIpDisplay: 'Отображать IP',
                history: 'История',
                ban: 'Заблокировать',
                bannedUsers: 'Заблокированные',
                restarting: 'Перезапуск соединения...',
                historyLimit: 'Сохраняются только скриншоты последних 30 человек',
                emptyHistory: 'История пуста',
                connectToStart: 'Подключитесь к партнерам, чтобы начать запись',
                zero: '0 встреч',
                entry: 'вход',
                entries: 'входы',
                ip: 'IP',
                city: 'Город',
                region: 'Регион',
                country: 'Страна',
                coordinates: 'Координаты',
                time: 'Время',
                photoNotAvailable: 'Фотография больше недоступна',
                skip25Msg: "ЭТОТ ЧЕЛОВЕК БЫЛ ВСТРЕЧЕН БОЛЕЕ 30 SKIPS НАЗАД!",
                banListTitle: 'Список блокировки',
                screenshot: 'Скриншот',
                actions: 'Действия',
                bannedListEmpty: 'Список блокировки пуст',
                videoModeSuggestion: 'Переключитесь в видеорежим, чтобы использовать ChillTools',
                textModeNotSupported: 'Текстовый режим не поддерживается!',
                betaWelcome: 'Добро пожаловать, бета-тестер!',
                outdatedExtension: 'Расширение устарело!',
                apply: 'Применить',
                color: 'Цвет',
                userStyles: 'Пользовательские стили',
                userStylesDesc: 'Настройте внешний вид сайта и расширения с помощью пользовательского CSS',
                customCSS: 'Пользовательский CSS',
                reset: 'Сбросить',
                save: 'Сохранить',
                gallery: 'Галерея',
                userStyleActive: 'UserStyle активен. Пользовательские цвета отключены.',
                disableUserStyle: 'Отключите UserStyle для использования пользовательских цветов.',
                galleryDesc: 'Выберите из готовых стилей',
                applyStyle: 'Применить',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Пользовательские стили сброшены',
                stylesSaved: 'Пользовательские стили успешно сохранены!',
                styleApplied: 'применено!',
                omegle: 'Omegle Style',
                pauseButton: 'Пауза',
                countryFilter: 'Фильтр стран',
                countryFilterDesc: 'Выберите страны для подключения',
                selectCountries: 'Выбрать страны',
                noCountriesSelected: 'Страны не выбраны - все страны разрешены',
                countriesSelected: 'стран выбрано'
            },
            pt: {
                settings: 'Configurações',
                apply: 'Aplicar',
                color: 'Cor',
                videoBorder: 'Cor personalizada',
                whiteColorNotAllowed: 'A cor branca não é permitida. Por favor, escolha uma cor diferente.',
                settingsDesc: 'Aqui você pode configurar as configurações da extensão',
                language: 'Idioma:',
                showIpDisplay: 'Mostrar IP',
                close: 'Fechar',
                history: 'Histórico',
                ban: 'Bloquear usuário',
                bannedUsers: 'Usuários bloqueados',
                restarting: 'Reiniciando conexão...',
                historyLimit: 'Apenas os screenshots das últimas 30 pessoas são salvos',
                emptyHistory: 'O histórico está vazio',
                connectToStart: 'Conecte-se com parceiros para começar a gravar',
                zero: '0 encontros',
                entry: 'entrada',
                entries: 'entradas',
                ip: 'IP',
                city: 'Cidade',
                region: 'Região',
                country: 'País',
                coordinates: 'Coordenadas',
                time: 'Tempo',
                photoNotAvailable: 'A foto não está mais disponível',
                skip25Msg: "ESTA PESSOA FOI ENCONTRADA HÁ MAIS DE 30 SKIPS!",
                banListTitle: 'Lista de Bloqueados',
                screenshot: 'Captura',
                actions: 'Ações',
                bannedListEmpty: 'A lista de bloqueados está vazia',
                videoModeSuggestion: 'Mude para o modo vídeo para usar o ChillTools',
                textModeNotSupported: 'O modo texto não é suportado!',
                betaWelcome: 'Bem-vindo a bordo, testador beta!',
                outdatedExtension: 'A extensão está desatualizada!',
                apply: 'Aplicar',
                color: 'Cor',
                userStyles: 'UserStyles',
                userStylesDesc: 'Personalize a aparência do site e da extensão com CSS personalizado',
                customCSS: 'CSS Personalizado',
                reset: 'Redefinir',
                save: 'Salvar',
                gallery: 'Galeria',
                userStyleActive: 'UserStyle está ativo. Cores personalizadas estão desativadas.',
                disableUserStyle: 'Desative UserStyle para usar cores personalizadas.',
                galleryDesc: 'Escolha entre estilos pré-definidos',
                applyStyle: 'Aplicar',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Estilos personalizados foram redefinidos',
                stylesSaved: 'Estilos personalizados salvos com sucesso!',
                styleApplied: 'aplicado!',
                omegle: 'Omegle Style',
                pauseButton: 'Pause',
                countryFilter: 'Filtro de País',
                countryFilterDesc: 'Selecione países para conectar',
                selectCountries: 'Selecionar Países',
                noCountriesSelected: 'Nenhum país selecionado - todos os países permitidos',
                countriesSelected: 'países selecionados'
            },
            id: {
                settings: 'Pengaturan',
                apply: 'Terapkan',
                color: 'Warna',
                videoBorder: 'Warna kustom',
                whiteColorNotAllowed: 'Warna putih tidak diizinkan. Silakan pilih warna yang berbeda.',
                settingsDesc: 'Di sini Anda dapat mengonfigurasi pengaturan ekstensi',
                language: 'Bahasa:',
                showIpDisplay: 'Tampilkan IP',
                close: 'Tutup',
                history: 'Riwayat',
                ban: 'Blokir pengguna',
                bannedUsers: 'Pengguna yang diblokir',
                restarting: 'Memulai ulang koneksi...',
                historyLimit: 'Hanya screenshot dari 30 orang terakhir yang disimpan',
                emptyHistory: 'Riwayat kosong',
                connectToStart: 'Hubungi mitra untuk mulai merekam',
                zero: '0 entri',
                entry: 'entri',
                entries: 'entri',
                ip: 'IP',
                city: 'Kota',
                region: 'Wilayah',
                country: 'Negara',
                coordinates: 'Koordinat',
                time: 'Waktu',
                photoNotAvailable: 'Foto tidak tersedia lagi',
                skip25Msg: "ORANG INI DITEMUI LEBIH DARI 30 SKIP YANG LALU!",
                banListTitle: 'Daftar Blokir',
                screenshot: 'Screenshot',
                actions: 'Aksi',
                bannedListEmpty: 'Daftar blokir kosong',
                videoModeSuggestion: 'Beralih ke mode video untuk menggunakan ChillTools',
                textModeNotSupported: 'Mode teks tidak didukung!',
                betaWelcome: 'Selamat datang, penguji beta!',
                outdatedExtension: 'Ekstensi sudah usang!',
                apply: 'Terapkan',
                color: 'Warna',
                userStyles: 'UserStyles',
                userStylesDesc: 'Sesuaikan tampilan situs dan ekstensi dengan CSS kustom',
                customCSS: 'CSS Kustom',
                reset: 'Atur Ulang',
                save: 'Simpan',
                gallery: 'Galeri',
                userStyleActive: 'UserStyle aktif. Warna kustom dinonaktifkan.',
                disableUserStyle: 'Nonaktifkan UserStyle untuk menggunakan warna kustom.',
                galleryDesc: 'Pilih dari gaya yang sudah jadi',
                applyStyle: 'Terapkan',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Gaya kustom telah direset',
                stylesSaved: 'Gaya kustom berhasil disimpan!',
                styleApplied: 'diterapkan!',
                omegle: 'Omegle Style',
                pauseButton: 'Jeda',
                countryFilter: 'Filter Negara',
                countryFilterDesc: 'Pilih negara untuk terhubung',
                selectCountries: 'Pilih Negara',
                noCountriesSelected: 'Tidak ada negara yang dipilih - semua negara diizinkan',
                countriesSelected: 'negara dipilih'
            },
            it: {
                settings: 'Impostazioni',
                apply: 'Applica',
                color: 'Colore',
                videoBorder: 'Colori personalizzati',
                whiteColorNotAllowed: 'Il colore bianco non è consentito. Si prega di scegliere un colore diverso.',
                settingsDesc: "Qui puoi configurare le impostazioni dell'estensione",
                language: 'Lingua:',
                close: 'Chiudi',
                showIpDisplay: 'Mostra IP',
                history: 'Cronologia',
                ban: 'Blocca utente',
                bannedUsers: 'Utenti bloccati',
                restarting: 'Riconnessione in corso...',
                historyLimit: 'Vengono salvati solo gli screenshot delle ultime 30 persone',
                emptyHistory: 'La cronologia è vuota',
                connectToStart: 'Connettiti con i partner per iniziare la registrazione',
                zero: '0 incontri',
                entry: 'incontro',
                entries: 'incontri',
                ip: 'IP',
                city: 'Città',
                region: 'Regione',
                country: 'Paese',
                coordinates: 'Coordinate',
                time: 'Ora',
                photoNotAvailable: 'La foto non è più disponibile',
                skip25Msg: "QUESTA PERSONE È STATA INCONTRATA PIU' DI 30 SKIPS FA!",
                banListTitle: 'Lista Bloccati',
                screenshot: 'Screenshot',
                actions: 'Azioni',
                bannedListEmpty: 'La lista dei bloccati è vuota',
                videoModeSuggestion: 'Passa alla modalità video per usare ChillTools',
                textModeNotSupported: 'La modalità testo non è supportata!',
                betaWelcome: 'Benvenuto a bordo, beta tester!',
                outdatedExtension: "L'estensione non è aggiornata!",
                userStyles: 'UserStyles',
                userStylesDesc: 'Personalizza l\'aspetto del sito e dell\'estensione con CSS personalizzato',
                customCSS: 'CSS Personalizzato',
                reset: 'Ripristina',
                save: 'Salva',
                gallery: 'Galleria',
                userStyleActive: 'UserStyle è attivo. I colori personalizzati sono disabilitati.',
                disableUserStyle: 'Disabilita UserStyle per usare i colori personalizzati.',
                galleryDesc: 'Scegli tra gli stili predefiniti',
                applyStyle: 'Applica',
                darkMode: 'Better DarkMode',
                fstool: 'FsTool',
                stylesReset: 'Gli stili personalizzati sono stati ripristinati',
                stylesSaved: 'Stili personalizzati salvati con successo!',
                styleApplied: 'applicato!',
                omegle: 'Omegle Style',
                pauseButton: 'Pausa',
                countryFilter: 'Filtro Paese',
                countryFilterDesc: 'Seleziona i paesi con cui connetterti',
                selectCountries: 'Seleziona Paesi',
                noCountriesSelected: 'Nessun paese selezionato - tutti i paesi consentiti',
                countriesSelected: 'paesi selezionati'
            }
        };

        function compareVersions(a, b) {
            const pa = String(a).split('.').map(n => parseInt(n, 10) || 0);
            const pb = String(b).split('.').map(n => parseInt(n, 10) || 0);
            const len = Math.max(pa.length, pb.length);
            for (let i = 0; i < len; i++) {
                const x = pa[i] || 0;
                const y = pb[i] || 0;
                if (x > y) return 1;
                if (x < y) return -1;
            }
            return 0;
        }

        function showOutdatedToast() {
            const lang = typeof getLang === 'function' ? getLang() : (localStorage.getItem('chilltool_lang') || 'en');
            const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : translations.en;
            const msg = t.outdatedExtension || 'Extension is outdated!';
            showNotification('ChillTools', msg, {
                type: 'error',
                duration: 10000,
                pulse: true,
                onClick: () => {
                    window.open('https://github.com/ChillSpotIT/ChillTool-s', '_blank');
                }
            });
        }

        function showBetaTesterToast() {
            const lang = typeof getLang === 'function' ? getLang() : (localStorage.getItem('chilltool_lang') || 'en');
            const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : translations.en;
            const msg = t.betaWelcome || 'Welcome Aboard, Beta Tester!';
            showNotification('ChillTools', msg, {
                type: 'info',
                duration: 5000,
                pulse: true
            });
        }

        async function checkOutdatedVersion() {
            try {
                const path = (window.location && window.location.pathname) ? window.location.pathname : '';
                if (!path || !path.startsWith('/video')) return;
                const res = await fetch('https://raw.githubusercontent.com/ChillSpotIT/ChillTool-s/refs/heads/version/version', { cache: 'no-store' });
                if (!res.ok) return;
                const text = (await res.text()) || '';
                const latest = text.replace(/^\uFEFF/, '').replace(/^v/i, '').trim();
                const current = String(CURRENT_VERSION).trim();
                if (!latest) return;
                const cmp = compareVersions(current, latest);
                if (cmp === 0) return;
                if (cmp < 0) {
                    showOutdatedToast();
                } else if (cmp > 0) {
                    showBetaTesterToast();
                }
            } catch (e) {
            }
        }

        setTimeout(checkOutdatedVersion, 3000);

        function getLang() {
            return localStorage.getItem('chilltool_lang') || 'en';
        }
        
        function updateButtonTitles() {
            const lang = getLang();
            const t = translations[lang];
            
            const historyBtn = document.getElementById('chillHistoryBtn');
            if (historyBtn) historyBtn.title = t.history;
            
            const banBtn = document.getElementById('chillBanBtn');
            if (banBtn) banBtn.title = t.ban;
            
            const bannedListBtn = document.getElementById('chillBannedListBtn');
            if (bannedListBtn) bannedListBtn.title = t.bannedUsers;
            
            const settingsBtn = document.getElementById('chillSettingsBtn');
            if (settingsBtn) settingsBtn.title = t.settings;
            
            const pauseBtn = document.getElementById('chillPauseBtn');
            if (pauseBtn) pauseBtn.title = t.pauseButton;
            
            const countryFilterBtn = document.getElementById('chillCountryFilterBtn');
            if (countryFilterBtn) countryFilterBtn.title = t.countryFilter;
        }
        
        function getBannedUsers() {
            const bannedUsers = localStorage.getItem('bannedUsers');
            return bannedUsers ? JSON.parse(bannedUsers) : [];
        }

        function saveBannedUsers(bannedUsers) {
            localStorage.setItem('bannedUsers', JSON.stringify(bannedUsers));
        }

        function displayBannedUsers() {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
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
                                        <th style="padding: 10px; text-align: center;">${t.actions}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${bannedUsers.map((user, index) => `
                                        <tr style="background-color: ${index % 2 === 0 ? '#1a1a1a' : '#222'};">
                                            <td style="padding: 10px; color: #fff;">${user.ip}</td>
                                            <td style="padding: 10px; color: #fff;">${user.info?.city || 'N/A'}</td>
                                            <td style="padding: 10px; color: #fff;">${user.info?.country || 'N/A'}</td>
                                            <td style="padding: 10px; color: #fff;">${user.timestamp}</td>
                                            <td style="padding: 10px; text-align: center;">
                                                ${user.screenshot ? `<img src="${user.screenshot}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer;" onclick="showScreenshot('${user.screenshot}', {ip: '${user.ip}', timestamp: '${user.timestamp}', info: ${JSON.stringify(user.info)}})">` : 'N/A'}
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
                    <div style="padding: 10px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        chilltools.it
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHTML);

            document.getElementById('closeBannedUsers').addEventListener('click', () => {
                document.getElementById('bannedUsersModal').remove();
                unblurToolbar();
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
        }

        function getSelectedCountries() {
            const saved = localStorage.getItem('chilltool_selectedCountries');
            return saved ? JSON.parse(saved) : [];
        }

        function saveSelectedCountries(countries) {
            localStorage.setItem('chilltool_selectedCountries', JSON.stringify(countries));
        }

        function showCountryFilterModal() {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
            const selectedCountries = getSelectedCountries();

            const countries = [
                'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina', 
                'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 
                'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana', 
                'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 
                'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo', 
                'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica', 
                'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 
                'Eritrea', 'Eswatini', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia', 
                'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau', 
                'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq', 
                'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya', 
                'Kiribati', 'North Korea', 'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia', 
                'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 
                'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania', 
                'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco', 
                'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua', 
                'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea', 
                'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda', 
                'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 
                'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 
                'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan', 
                'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan', 
                'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 
                'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay', 
                'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
            ];

            const countryCheckboxes = countries.map(country => {
                const isChecked = selectedCountries.includes(country);
                return `
                    <label style="display: flex; align-items: center; padding: 8px; margin: 4px 0; background: ${isChecked ? 'rgba(23, 162, 184, 0.2)' : 'rgba(255,255,255,0.05)'}; border-radius: 5px; cursor: pointer; transition: background 0.2s;">
                        <input type="checkbox" value="${country}" ${isChecked ? 'checked' : ''} style="margin-right: 10px; cursor: pointer; width: 18px; height: 18px;">
                        <span style="color: #fff; font-size: 14px;">${country}</span>
                    </label>
                `;
            }).join('');

            const modalHTML = `
            <div id="countryFilterModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
                <div style="background: #111; border-radius: 10px; width: 90%; max-width: 600px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
                    <div style="padding: 15px; background: linear-gradient(to right, #17a2b8, #138496); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                        <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                            <i class="fas fa-globe"></i> ${t.countryFilter}
                        </h3>
                        <button id="closeCountryFilter" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
                    </div>
                    <div style="padding: 15px; color: #bbb; font-size: 13px; border-bottom: 1px solid #333;">
                        ${t.countryFilterDesc}
                    </div>
                    <div style="padding: 15px; border-bottom: 1px solid #333;">
                        <div style="position: relative;">
                            <i class="fas fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #888; font-size: 14px;"></i>
                            <input type="text" id="countrySearchInput" placeholder="Search countries..." style="width: 100%; padding: 10px 10px 10px 38px; background: #222; border: 1px solid #444; border-radius: 5px; color: white; font-size: 14px; outline: none;">
                        </div>
                    </div>
                    <div style="padding: 15px; overflow-y: auto; flex-grow: 1; min-height: 200px; max-height: 400px;">
                        <div style="margin-bottom: 10px; display: flex; gap: 10px;">
                            <button id="selectAllCountries" style="flex: 1; background: #28a745; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-size: 13px;">
                                <i class="fas fa-check-double"></i> Select All
                            </button>
                            <button id="deselectAllCountries" style="flex: 1; background: #dc3545; color: white; border: none; padding: 8px; border-radius: 5px; cursor: pointer; font-size: 13px;">
                                <i class="fas fa-times"></i> Deselect All
                            </button>
                        </div>
                        <div id="countryCheckboxContainer">
                            ${countryCheckboxes}
                        </div>
                        <div id="noResultsMessage" style="display: none; text-align: center; padding: 40px 20px; color: #666; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                            <i class="fas fa-search" style="font-size: 48px; opacity: 0.3; margin-bottom: 15px;"></i>
                            <p style="margin: 0; font-size: 16px;">No countries found</p>
                        </div>
                    </div>
                    <div style="padding: 15px; background: #1a1a1a; border-top: 1px solid #333; display: flex; justify-content: space-between; align-items: center;">
                        <span id="selectedCountryCount" style="color: #bbb; font-size: 13px;">
                            ${selectedCountries.length > 0 ? `${selectedCountries.length} ${t.countriesSelected}` : t.noCountriesSelected}
                        </span>
                        <button id="saveCountryFilter" style="background: #17a2b8; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-size: 14px;">
                            ${t.save || 'Save'}
                        </button>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHTML);

            const modal = document.getElementById('countryFilterModal');
            const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
            const countLabel = document.getElementById('selectedCountryCount');
            const searchInput = document.getElementById('countrySearchInput');
            const countryContainer = document.getElementById('countryCheckboxContainer');
            const noResultsMsg = document.getElementById('noResultsMessage');

            function updateCount() {
                const checked = Array.from(checkboxes).filter(cb => cb.checked);
                countLabel.innerHTML = `<i class="fas fa-flag" style="color: #17a2b8; font-size: 16px; margin-right: 8px;"></i>${checked.length > 0 ? `${checked.length} ${t.countriesSelected}` : t.noCountriesSelected}`;
                
                checkboxes.forEach(cb => {
                    const label = cb.closest('label');
                    if (cb.checked) {
                        label.style.background = 'rgba(23, 162, 184, 0.3)';
                        label.style.borderLeft = '3px solid #17a2b8';
                    } else {
                        label.style.background = 'rgba(255,255,255,0.05)';
                        label.style.borderLeft = '3px solid transparent';
                    }
                });
            }

            function filterCountries() {
                const searchTerm = searchInput.value.toLowerCase().trim();
                let visibleCount = 0;

                checkboxes.forEach(cb => {
                    const label = cb.closest('label');
                    const countryName = cb.value.toLowerCase();
                    
                    if (countryName.includes(searchTerm)) {
                        label.style.display = 'flex';
                        visibleCount++;
                    } else {
                        label.style.display = 'none';
                    }
                });

                if (visibleCount === 0) {
                    noResultsMsg.style.display = 'block';
                    countryContainer.style.display = 'none';
                } else {
                    noResultsMsg.style.display = 'none';
                    countryContainer.style.display = 'grid';
                }
            }

            searchInput.addEventListener('input', filterCountries);

            checkboxes.forEach(cb => {
                cb.addEventListener('change', updateCount);
            });

            document.getElementById('selectAllCountries').addEventListener('click', () => {
                checkboxes.forEach(cb => cb.checked = true);
                updateCount();
            });

            document.getElementById('deselectAllCountries').addEventListener('click', () => {
                checkboxes.forEach(cb => cb.checked = false);
                updateCount();
            });

            document.getElementById('closeCountryFilter').addEventListener('click', () => {
                modal.remove();
                unblurToolbar();
            });

            document.getElementById('saveCountryFilter').addEventListener('click', () => {
                const selected = Array.from(checkboxes)
                    .filter(cb => cb.checked)
                    .map(cb => cb.value);
                saveSelectedCountries(selected);
                showNotification('Country Filter', `${selected.length > 0 ? selected.length + ' ' + t.countriesSelected : t.noCountriesSelected}`, {
                    type: 'success',
                    duration: 3000
                });
                modal.remove();
                unblurToolbar();
            });
        }

        function showSettings() {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
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

                                <div style="display: flex; align-items: center; margin: 8px 0; padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.05);">
                                    <label class="switch" style="position: relative; display: inline-block; width: 50px; height: 24px; margin-right: 12px;">
                                        <input type="checkbox" id="showIpDisplayCheckbox" ${isIpDisplayEnabled ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
                                        <span class="slider round" style="
                                            position: absolute;
                                            cursor: pointer;
                                            top: 0;
                                            left: 0;
                                            right: 0;
                                            bottom: 0;
                                            background-color: #333;
                                            transition: .4s;
                                            border-radius: 24px;
                                        "></span>
                                    </label>
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
                                        
                                        #showIpDisplayCheckbox + .slider {
                                            background-color: #444;
                                        }
                                        
                                        #showIpDisplayCheckbox:checked + .slider:before {
                                            background-color: white;
                                        }
                                        
                                        #showIpDisplayCheckbox:checked + .slider {
                                            background-color: #4a90e2;
                                        }
                                        
                                        #showIpDisplayCheckbox:checked + .slider:before {
                                            transform: translateX(26px);
                                        }
                                        
                                        #showIpDisplayCheckbox:focus + .slider {
                                            box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
                                        }
                                    </style>
                                    <label for="showIpDisplayCheckbox" style="
                                        color: #e0e0e0;
                                        font-size: 14px;
                                        font-weight: 500;
                                        cursor: pointer;
                                        text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
                                        line-height: 1.4;
                                    ">
                                        ${t.showIpDisplay}
                                    </label>
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
                    </div>
                    <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        chilltools.it
                    </div>
                </div>
            </div>`;
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            const ipCheckbox = document.getElementById('showIpDisplayCheckbox');
            ipCheckbox.checked = isIpDisplayEnabled;
            
            if (isIpDisplayEnabled) {
                const ipDisplayBox = document.getElementById('ipDisplayBox');
                if (ipDisplayBox) {
                    ipDisplayBox.style.display = 'block';
                }
            }
            
            ipCheckbox.addEventListener('change', function(e) {
                isIpDisplayEnabled = e.target.checked;
                const ipDisplayBox = document.getElementById('ipDisplayBox');
                if (ipDisplayBox) {
                    ipDisplayBox.style.display = isIpDisplayEnabled ? 'block' : 'none';
                }
            });
            
            document.getElementById('langSelect').onchange = function() {
                localStorage.setItem('chilltool_lang', this.value);
                updateButtonTitles();
                document.getElementById('settingsModal').remove();
                showSettings();
            };
            document.getElementById('tosBtn').onclick = function() {
                window.open('https://chilltools.it/tos', '_blank');
            };
            document.getElementById('userStylesBtn').onclick = function() {
                showUserStylesModal();
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
                if (userStyleActive && userStyleActive.trim() !== '') {
                    showNotification('Custom Color', t.disableUserStyle, {
                        type: 'warning',
                        duration: 4000,
                        pulse: true
                    });
                    return;
                }
                
                const colorModalHTML = `
                    <div id="colorModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; justify-content: center; align-items: center;">
                        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 400px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333;">
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
                        </div>
                    </div>`;

                document.body.insertAdjacentHTML('beforeend', colorModalHTML);
                
                document.getElementById('settingsModal').style.display = 'none';
                
                document.getElementById('closeColorModal').addEventListener('click', closeColorModal);
                
                const videoBorderColor = document.getElementById('videoBorderColor');
                
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
                                document.head.appendChild(styleElement);
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
                        document.head.appendChild(styleElement);
                    } else {
                        document.head.replaceChild(styleElement, document.getElementById('rightBoxStyle'));
                    }
                }

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
                        const lang = getLang();
                        const t = translations[lang] || translations.en || {};
                        const message = t.whiteColorNotAllowed || 'White color is not allowed. Please choose a different color.';

                        showNotification('Color Selection', message, {
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
                
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        closeColorModal();
                    }
                });
                
                function closeColorModal() {
                    const modal = document.getElementById('colorModal');
                    if (modal) {
                        modal.remove();
                        document.getElementById('settingsModal').style.display = 'flex';
                    }
                }
            });
            
            document.getElementById('showIpDisplayCheckbox').addEventListener('change', function(e) {
                setIpDisplayPreference(e.target.checked);
            });
            
            setIpDisplayPreference(getIpDisplayPreference());
            
            document.getElementById('closeSettingsBtn').onclick = function() {
                const selected = document.getElementById('langSelect').value;
                localStorage.setItem('chilltool_lang', selected);
                document.getElementById('settingsModal').remove();
                unblurToolbar();
            };
            
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
                document.head.appendChild(styleElement);
            }
        }

        const predefinedStyles = {
            darkMode: {
                name: 'darkMode',
                css: `/* Glassmorphism Darkmode Style */
                    @keyframes floatSoft {
                        0%, 100% { transform: translateY(0px); }
                        50% { transform: translateY(-8px); }
                    }

                    .rightBox, .bottomButton, header, .inputContainer, .chat-container {
                        background: rgba(255, 255, 255, 0.05) !important;
                        backdrop-filter: blur(20px) saturate(180%) !important;
                        -webkit-backdrop-filter: blur(20px) saturate(180%) !important;
                        border: 1px solid rgba(255, 255, 255, 0.18) !important;
                        border-radius: 16px !important;
                        box-shadow: 
                            0 8px 32px 0 rgba(0, 0, 0, 0.37),
                            inset 0 0 0 1px rgba(255, 255, 255, 0.1) !important;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    }

                    .mainText {
                        background: rgba(23, 23, 23, 0.05) !important;
                    }

                    .rightBox:hover, .bottomButton:hover {
                        background: rgba(255, 255, 255, 0.08) !important;
                        transform: translateY(-2px) !important;
                        box-shadow: 
                            0 12px 40px 0 rgba(0, 0, 0, 0.45),
                            inset 0 0 0 1px rgba(255, 255, 255, 0.15) !important;
                    }

                    button:not(.chill-notification-close):not(#closeHistory):not(#closeSettingsBtn):not(#closeUserStylesBtn):not(#closeGalleryBtn):not(#closeTosBtn):not(#closeBannedUsers):not(.apply-style-btn):not(#resetUserStylesBtn):not(#saveUserStylesBtn):not(#galleryUserStylesBtn):not(#applyColorBtn):not(#closeColorModal):not(.unban-btn),
                    .button:not(.chill-notification-close) {
                        border-radius: 12px !important;
                        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
                        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2) !important;
                    }

                    button:not(.chill-notification-close):not(#closeHistory):not(#closeSettingsBtn):not(#closeUserStylesBtn):not(#closeGalleryBtn):not(#closeTosBtn):not(#closeBannedUsers):not(.apply-style-btn):not(#resetUserStylesBtn):not(#saveUserStylesBtn):not(#galleryUserStylesBtn):not(#applyColorBtn):not(#closeColorModal):not(.unban-btn):hover,
                    .button:not(.chill-notification-close):hover {
                        transform: translateY(-3px) scale(1.02) !important;
                        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3) !important;
                    }

                    input, textarea, select {
                        background: rgba(255, 255, 255, 0.05) !important;
                        backdrop-filter: blur(10px) !important;
                        border: 1px solid rgba(255, 255, 255, 0.15) !important;
                        border-radius: 10px !important;
                        transition: all 0.3s ease !important;
                    }

                    input:focus, textarea:focus, select:focus {
                        background: rgba(255, 255, 255, 0.08) !important;
                        border-color: rgba(255, 255, 255, 0.3) !important;
                        box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1) !important;
                    }

                    #chillLogo {
                        animation: floatSoft 6s ease-in-out infinite !important;
                        position: fixed !important;
                        bottom: 10px !important;
                        right: 10px !important;
                    }

                    .chill-toast-close {
                        background: rgba(255, 255, 255, 0.1) !important;
                        border: 1px solid rgba(255, 255, 255, 0.2) !important;
                        border-radius: 50% !important;
                        width: 28px !important;
                        height: 28px !important;
                        display: flex !important;
                        align-items: center !important;
                        justify-content: center !important;
                        padding: 0 !important;
                        margin-left: 10px !important;
                        transition: all 0.3s ease !important;
                    }

                    .chill-toast-close:hover {
                        background: rgba(255, 255, 255, 0.2) !important;
                        transform: scale(1.1) !important;
                    }`
            },
            fstool: {
                name: 'fstool',
                css: `
                /* FSTool Style */
                /* Thanks Karma for giving us the permission to use this style */
                    #chillToolbar button,
                    #chillToolbar a {
                        background-color: #ff4444 !important;
                        border-radius: 5px !important;
                        color: white !important;
                    }
                
                    .chatWindow {
                        position: relative !important;
                    }
                
                    #chillLogo {
                        content: url('https://i.postimg.cc/kXBfByP3/fs.png') !important;
                        width: 200px !important;
                        height: 200px !important;
                        object-fit: contain !important;
                        position: absolute !important;
                        top: 50% !important;
                        left: 50% !important;
                        transform: translate(-50%, -50%) !important;
                        z-index: 1 !important;
                        transition: none !important;
                        will-change: transform !important;
                        pointer-events: none !important;
                        margin: 0 !important;
                        bottom: auto !important;
                        right: auto !important;
                    }
    

                    #ipDisplayBox strong {
                        color: #ff4444 !important;
                        font-weight: bold !important;
                    }

                    #userStylesModal > div > div:first-child {
                        background: linear-gradient(to right, #ff4444, #ff2222) !important;
                        border-bottom: 1px solid #ff4444 !important;
                    }

                    #countryFilterModal > div > div:first-child {
                        background: linear-gradient(to right, #ff4444, #ff2222) !important;
                        border-bottom: 1px solid #ff4444 !important;
                    }

                    #userStylesModal > div > div:first-child h3 {
                        color: white !important;
                        text-shadow: -1px -1px 0 #000,
                                    1px -1px 0 #000,
                                    -1px 1px 0 #000,
                                    1px 1px 0 #000 !important;
                    }

                    #userStylesModal > div > div:first-child h3 i {
                        color: white !important;
                    }
                        
                    #settingsModal > div > div:first-child {
                        background: linear-gradient(to right, #ff4444, #ff2222) !important;
                        border-bottom: 1px solid #ff4444 !important;
                    }

                    #settingsModal > div > div:first-child h3 {
                        color: white !important;
                        text-shadow: -1px -1px 0 #000,
                                    1px -1px 0 #000,
                                    -1px 1px 0 #000,
                                    1px 1px 0 #000 !important;
                    }

                    #settingsModal > div > div:first-child h3 i {
                        color: white !important;
                    }

                    #closeSettingsBtn {
                        color: white !important;
                    }
                    
                    #historyModal > div > div:first-child {
                        background: linear-gradient(to right, #ff4444, #ff2222) !important; 
                        border-bottom: 1px solid #ff4444 !important;
                    }

                    #historyModal > div > div:first-child h3 {
                        color: white !important;
                        text-shadow: -1px -1px 0 #000,
                                    1px -1px 0 #000,
                                    -1px 1px 0 #000,
                                    1px 1px 0 #000 !important;
                    }

                    #historyModal > div > div:first-child h3 i {
                        color: white !important;
                    }
                        
                    .logoBlock {
                        content: url('https://i.ibb.co/1twjdMVT/logo-4.png') !important;
                    }

                `
            },
            omegle: {
                name: 'omegle',
                css: `
                /* Omegle Style */
                .logoBlock {
                    content: url('https://i.ibb.co/Y7fnZ0jx/image.png') !important;

                } 

                .bottomButton, .mainText  {
                background: linear-gradient(to top, #007aff, #339cff) !important;
                }
                `
            }
        };

        function showUserStylesModal() {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
            
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
            
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            
            document.getElementById('settingsModal').style.display = 'none';
            
            document.getElementById('closeUserStylesBtn').onclick = function() {
                document.getElementById('userStylesModal').remove();
                document.getElementById('settingsModal').style.display = 'flex';
            };
            
            document.getElementById('galleryUserStylesBtn').onclick = function() {
                showGalleryModal();
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
                    
                    showNotification('UserStyles', t.stylesReset, {
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
                    document.head.appendChild(styleElement);
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
                
                showNotification('UserStyles', t.stylesSaved, {
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

        function showGalleryModal() {
            const lang = getLang();
            const t = translations[lang];
            
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
                            ${Object.keys(predefinedStyles).map(styleKey => {
                                const style = predefinedStyles[styleKey];
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
            
            document.body.insertAdjacentHTML('beforeend', galleryHTML);
            
            document.getElementById('userStylesModal').style.display = 'none';
            
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
                    const style = predefinedStyles[styleKey];

                    const textarea = document.getElementById('userStylesTextarea');
                    if (textarea) {
                        textarea.value = style.css;
                    }
                    
                    localStorage.setItem('chilltool_userStyles', style.css);
                    
                    let styleElement = document.getElementById('chilltool-user-styles');
                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        styleElement.id = 'chilltool-user-styles';
                        document.head.appendChild(styleElement);
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
                    
                    showNotification('UserStyles', `${t[style.name]} ${t.styleApplied}`, {
                        type: 'success',
                        duration: 3000
                    });
                    
                    document.getElementById('galleryModal').remove();
                    document.getElementById('userStylesModal').style.display = 'flex';
                });
            });
            
            document.getElementById('closeGalleryBtn').onclick = function() {
                document.getElementById('galleryModal').remove();
                document.getElementById('userStylesModal').style.display = 'flex';
            };
            
            document.addEventListener('keydown', function escGalleryHandler(e) {
                if (e.key === 'Escape') {
                    const modal = document.getElementById('galleryModal');
                    if (modal) {
                        modal.remove();
                        document.getElementById('userStylesModal').style.display = 'flex';
                        document.removeEventListener('keydown', escGalleryHandler);
                    }
                }
            });
        }
        
        function getStylePreview(styleKey) {
            const previews = {
                darkMode: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
                fstool: 'linear-gradient(135deg,rgb(99, 0, 0) 0%, #1a1a1a 100%)',
                omegle: 'linear-gradient(135deg, #007aff 0%, #339cff 100%)',
            };
            return previews[styleKey] || '#0a0a0b';
        }

        const modalObserver = new MutationObserver(() => {
            if (isMobile()) return; 
            
            const modals = document.querySelectorAll('#settingsModal, #tosModal, #historyModal, #screenshotModal, #infoModal, #bannedUsersModal, #userStylesModal, #galleryModal, #countryFilterModal');
            const toolbar = document.getElementById('chillToolbar');
            const logo = document.getElementById('chillLogo');
            
            if (toolbar) {
                if (modals.length === 0) {
                    toolbar.classList.remove('chill-blur');
                } else {
                    toolbar.classList.add('chill-blur');
                }
            }
            
            if (logo) {
                if (modals.length === 0) {
                    logo.classList.remove('chill-blur');
                } else {
                    logo.classList.add('chill-blur');
                }
            }
        });
        modalObserver.observe(document.body, { childList: true, subtree: false });

        const currentSession = {
            ip: null,
            info: null,
            screenshot: null
        };

        const connectionHistory = [];
        const MAX_SCREENSHOTS = 30;

        const originalRTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection;
        window.RTCPeerConnection = function(...args) {
            const pc = new originalRTCPeerConnection(...args);
            const originalAddIceCandidate = pc.addIceCandidate.bind(pc);

            pc.addIceCandidate = function(iceCandidate, ...rest) {
                if (iceCandidate?.candidate) {
                    const fields = iceCandidate.candidate.split(' ');
                    const ip = fields[4];

                    if (fields[7] === 'srflx' && currentSession.ip !== ip) {
                        handleNewIP(ip);
                    }
                }
                return originalAddIceCandidate(iceCandidate, ...rest);
            };

            return pc;
        };

        let lastHandledIP = null;
        let isHandlingIP = false;
        let callStartTime = null;
        let timerInterval = null;

        async function handleNewIP(ip) {
            if (isHandlingIP || lastHandledIP === ip) {
                return;
            }

            const bannedUsers = getBannedUsers();
            if (bannedUsers.some(user => user.ip === ip)) {
                console.log(`IP ${ip} is banned. Simulating ESC key.`);
                isHandlingIP = true;
                lastHandledIP = ip;
                
                document.dispatchEvent(new KeyboardEvent('keydown', { 
                    key: 'Escape', 
                    code: 'Escape', 
                    keyCode: 27, 
                    which: 27, 
                    bubbles: true 
                }));
                
                setTimeout(() => {
                    document.dispatchEvent(new KeyboardEvent('keydown', { 
                        key: 'Escape', 
                        code: 'Escape', 
                        keyCode: 27, 
                        which: 27, 
                        bubbles: true 
                    }));
                    
                    setTimeout(() => {
                        isHandlingIP = false;
                    }, 1000);
                }, 300);
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
                ipBox.style.display = isIpDisplayEnabled ? 'block' : 'none';
            }
            
            const lang = getLang();
            const t = translations[lang];
            if (ipBox) {
                ipBox.innerHTML = `
                <h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>
                <div style="margin-bottom: 10px;">
                    <span style="color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}: ${ip} - <i>${
                        lang === 'en' ? 'Loading...' :
                        lang === 'zh' ? '加载中...' :
                        lang === 'hi' ? 'लोड हो रहा है...' :
                        lang === 'es' ? 'Cargando...' :
                        lang === 'ar' ? 'جار التحميل...' :
                        lang === 'fr' ? 'Chargement...' :
                        lang === 'bn' ? 'লোড হচ্ছে...' :
                        lang === 'ru' ? 'Загрузка...' :
                        lang === 'pt' ? 'Carregando...' :
                        lang === 'id' ? 'Memuat...' : 'Caricamento...'
                    }</i></span>
                </div>
            `;
            }

            const locationInfo = await getLocation(ip);
            if (locationInfo) {
                currentSession.info = locationInfo;
                
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
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.ip}</span> <br>
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.city}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.city}</span> <br>
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.region}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.state}</span> <br>
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.country}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.country}</span> <br>
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">ISP:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.organization}</span> <br>
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.coordinates}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">(${locationInfo.latitude}, ${locationInfo.longitude})</span> <br>
                        <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">Timer:</strong> <span id="callTimer" style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; font-family: monospace;">${initialTime}</span>
                    </div>
                `;
                }

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
            
            disconnectObserver.observe(document.body, {
                childList: true,
                subtree: true
            });
            
            setTimeout(() => {
                const selectedCountries = getSelectedCountries();
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
                        
                        document.dispatchEvent(new KeyboardEvent('keydown', { 
                            key: 'Escape', 
                            code: 'Escape', 
                            keyCode: 27, 
                            which: 27, 
                            bubbles: true 
                        }));
                        
                        // Check if auto-skipping is not paused
                        const pauseBtn = document.querySelector('.chill-btn.pause-skip');
                        if (!pauseBtn || !pauseBtn.classList.contains('active')) {
                            setTimeout(() => {
                                // Check again if still not paused when the timeout triggers
                                if (!pauseBtn || !pauseBtn.classList.contains('active')) {
                                    document.dispatchEvent(new KeyboardEvent('keydown', { 
                                        key: 'Escape', 
                                        code: 'Escape', 
                                        keyCode: 27, 
                                        which: 27, 
                                        bubbles: true 
                                    }));
                                }
                            }, 300);
                        }
                    } else if (partnerCountry) {
                        console.log(`Country ${partnerCountry} is in filter. Accepting connection.`);
                    }
                } else {
                    console.log('Country filter disabled - accepting all countries');
                }
            }, 369);
        }

        function captureAndStoreScreenshot(videoElement, ip) {
            const captureFrame = () => {
                try {
                    const canvas = document.createElement('canvas');
                    canvas.width = videoElement.videoWidth;
                    canvas.height = videoElement.videoHeight;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    
                    if (currentSession.ip === ip) {
                        const screenshot = canvas.toDataURL('image/png');
                        currentSession.screenshot = screenshot;
                        
                        const existingIndex = connectionHistory.findIndex(item => item.ip === ip);
                        
                        if (existingIndex === -1) {
                            const historyEntry = {
                                ip: ip,
                                info: currentSession.info,
                                screenshot: screenshot,
                                timestamp: new Date().toLocaleString(),
                                hasScreenshot: true
                            };
                            
                            connectionHistory.unshift(historyEntry);
                            
                            if (connectionHistory.length > MAX_SCREENSHOTS) {
                                const oldestWithScreenshot = connectionHistory.findLastIndex(item => item.hasScreenshot);
                                if (oldestWithScreenshot !== -1) {
                                    connectionHistory[oldestWithScreenshot].hasScreenshot = false;
                                    connectionHistory[oldestWithScreenshot].screenshot = null;
                                }
                            }
                            
                            console.log('Added to history:', ip);
                        } else {
                            if (existingIndex < MAX_SCREENSHOTS) {
                                connectionHistory[existingIndex].screenshot = screenshot;
                                connectionHistory[existingIndex].timestamp = new Date().toLocaleString();
                                console.log('Updated existing history entry:', ip);
                            }
                        }
                    }
                } catch (error) {
                    console.error('Error capturing screenshot:', error);
                    setTimeout(captureFrame, 500);
                }
            };

            if (videoElement.readyState >= 2) {
                captureFrame();
            } else {
                videoElement.addEventListener('loadeddata', captureFrame, { once: true });
            }
        }

    function displayHistory() {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
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
                        ${connectionHistory.length ? 
                            connectionHistory.map((entry, index, arr) => {
                                const photoAvailable = index < 30;
                                return `
                                <div class="history-entry${!photoAvailable ? ' history-entry-disabled' : ''}" style="margin-bottom: 10px; padding: 12px; background: #1a1a1a; border-radius: 5px; transition: all 0.2s; border-left: 4px solid ${entry.hasScreenshot && photoAvailable ? '#007bff' : '#ff4444'};${!photoAvailable ? ' pointer-events: none; opacity: 0.7; cursor: default;' : ' cursor: pointer;'}" data-ip="${entry.ip}" data-has-screenshot="${photoAvailable && entry.hasScreenshot}" data-screenshot="${photoAvailable && entry.hasScreenshot ? (entry.screenshot || '') : ''}">
                                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                        <div style="flex: 1; min-width: 0;">
                                            <div class="history-text" style="font-size: 11px; color: #777; margin-bottom: 5px;">${entry.timestamp}</div>
                                            <div>
                                                <span style="color: ${entry.hasScreenshot && photoAvailable ? '#007bff' : '#ff4444'}; margin-right: 8px; text-shadow: none;">
                                                    ${arr.length - index}.
                                                </span>
                                                <span class="history-text" style="font-weight: bold; color: #4dabf7;">${entry.ip}</span>
                                            </div>
                                            <div class="history-text" style="font-size: 13px; color: #aaa; margin-top: 5px;">
                                                ${entry.info?.city || '-'}, ${entry.info?.region || '-'}, ${entry.info?.country || '-'}
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
                        ${connectionHistory.length === 0 ? t.zero : connectionHistory.length + ' ' + (connectionHistory.length === 1 ? t.entry : t.entries)}
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
            document.querySelectorAll('.history-entry').forEach(entry => {
                if(entry.classList.contains('history-entry-disabled')) return;
                entry.addEventListener('click', function() {
                    const ip = this.getAttribute('data-ip');
                    const hasScreenshot = this.getAttribute('data-has-screenshot') === 'true';
                    const screenshot = this.getAttribute('data-screenshot');
                    const historyItem = connectionHistory.find(item => item.ip === ip);
                    if (historyItem) {
                        if (hasScreenshot) {
                            showScreenshot(screenshot, historyItem);
                        } else if(historyItem.hasScreenshot) {
                            alert(t.photoNotAvailable + "\n\n" + t.skip25Msg);
                        } else {
                            showInfoWithoutScreenshot(historyItem);
                        }
                    }
                });
            });

            document.getElementById('closeHistory').addEventListener('click', () => {
                document.getElementById('historyModal').remove();
                isHistoryVisible = false;
            });
        }

        function showScreenshot(screenshot, entry) {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
            const info = entry.info || {};
            const modalHTML = `
            <div id="screenshotModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; justify-content: center; align-items: center;">
                <div style="background: #1a1a1a; border-radius: 10px; width: 90%; max-width: 500px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.8); border: 1px solid #333;">
                    <div style="max-height: 60vh; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; background: #000; border-radius: 5px;">
                        <img src="${screenshot}" style="max-width: 100%; max-height: 60vh; display: block;">
                    </div>
                    <div class="history-text" style="color: white; margin-bottom: 15px;">
                        <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.ip}:</span> <span style="user-select: all;">${entry.ip}</span></div>
                        <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.time}:</span> ${entry.timestamp}</div>
                        <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.city}:</span> ${info.city || '-'}</div>
                        <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.region}:</span> ${info.region || '-'}</div>
                        <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.country}:</span> ${info.country || '-'}</div>
                        <div><span style="color: #4dabf7; font-weight: bold;">${t.coordinates}:</span> (${info.latitude || '-'}, ${info.longitude || '-'})</div>
                    </div>
                    <button onclick="document.getElementById('screenshotModal').remove()" style="background: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#0069d9'" onmouseout="this.style.background='#007bff'">
                        <i class="fas fa-times"></i> ${t.close}
                    </button>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        function showInfoWithoutScreenshot(entry) {
            const toolbar = document.getElementById('chillToolbar');
            if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
            const lang = getLang();
            const t = translations[lang];
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
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }

        const addLogo = () => {
            const logo = document.createElement("img");
            logo.src = "https://i.ibb.co/jHzYHxz/Frame-53.png";
            logo.alt = "ChillSpot Logo";
            
            const rightBox = document.querySelector('.rightBox.outlined');
            const chatContainer = document.querySelector('.chatWindow');
            const container = rightBox || chatContainer;
            if (!container) return;
            
            container.style.position = 'relative';
            
            if (isMobile()) {
                logo.style.position = "absolute";
                logo.style.top = "5px";
                logo.style.right = "5px";
                logo.style.width = "60px";
                
                container.appendChild(logo);
                
                const toolbar = document.getElementById('chillToolbar');
                if (toolbar) {
                    if (toolbar.parentNode) {
                        toolbar.parentNode.removeChild(toolbar);
                    }
                    container.appendChild(toolbar);
                }
            } else {
                logo.style.position = "fixed";
                logo.style.width = "80px";
                logo.style.transition = "all 0.3s ease";
                logo.style.zIndex = "9999"; 
                logo.id = 'chillLogo';
                
                const updateLogoPosition = () => {
                    if (chatContainer) {
                        const rect = chatContainer.getBoundingClientRect();
                        logo.style.bottom = (window.innerHeight - rect.bottom + 10) + "px";
                        logo.style.right = (window.innerWidth - rect.right + 10) + "px";
                    }
                };
                
                updateLogoPosition();
                window.addEventListener('resize', updateLogoPosition);
                window.addEventListener('scroll', updateLogoPosition, true);
                
                logo.addEventListener("mouseenter", () => logo.style.transform = "scale(1.05)");
                logo.addEventListener("mouseleave", () => logo.style.transform = "scale(1)");
                
                if (chatContainer) {
                    chatContainer.appendChild(logo);
                } else {
                    document.body.appendChild(logo);
                }
            }
            
            logo.style.cursor = "pointer";
            logo.style.borderRadius = "5px";
            logo.style.boxShadow = "0 2px 10px rgba(0,0,0,0.0)";
            logo.style.zIndex = "5"; 
            
            logo.addEventListener("click", () => window.open("https://chilltools.it", "_blank"));
        };

const replaceLogo = () => {
            const logoBlock = document.querySelector('.logoBlock');
            if (logoBlock) {
                logoBlock.outerHTML = `
                    <a href="${baseUrl}" class="logoBlock" style="display: flex; align-items: center; text-decoration: none;">
                        <img src="https://i.ibb.co/KcvKXzxK/logo.png" 
                            style="height: 58px; width: auto; object-fit: contain; filter: drop-shadow(0 0 5px rgba(0,157,255,0.5))">
                    </a>`;
            }
        };
        const replaceUmingle = () => {
            const logoLink = document.querySelector('.logoLink');
            if (logoLink && window.location.hostname.includes('umingle.com')) {
                logoLink.outerHTML = `
                    <a href="${baseUrl}" class="logoBlock" style="display: flex; align-items: center; text-decoration: none;">
                        <img src="https://i.ibb.co/xS4xFRrS/Frame.png" 
                            style="height: 58px; width: auto; object-fit: contain; filter: drop-shadow(0 0 5px rgba(0,157,255,0.5))">
                    </a>`;
            } else if (logoLink && window.location.hostname.includes('uhmegle.com')) {
                replaceLogo();
            }
        };


        const init = () => {
            const checkInterval = setInterval(() => {
                const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow');
                if (chatContainer) {
                    checkBackgroundColor();
                    clearInterval(checkInterval);
                }
            }, 500);
            
            const isHomePage = (window.location.href === 'https://umingle.com/' || 
                               window.location.href === 'https://umingle.com' ||
                               window.location.href === 'https://www.umingle.com/' ||
                               window.location.href === 'https://www.umingle.com' ||
                               window.location.href === 'https://uhmegle.com/' || 
                               window.location.href === 'https://uhmegle.com' ||
                               window.location.href === 'https://www.uhmegle.com/' ||
                               window.location.href === 'https://www.uhmegle.com');
            
            const isTextMode = window.location.pathname.startsWith('/text');
            
            if (!isHomePage && !isTextMode) {
                document.body.appendChild(createToolbar());
            }
            addLogo();
            replaceLogo();
            replaceUmingle();
            setupBackgroundObserver();
            
            const savedCSS = localStorage.getItem('chilltool_userStyles');
            if (savedCSS) {
                let styleElement = document.getElementById('chilltool-user-styles');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'chilltool-user-styles';
                    document.head.appendChild(styleElement);
                }
                styleElement.textContent = savedCSS;
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
        let escTimes = [];
        const skipPauseBtn = document.createElement("button");
        skipPauseBtn.id = "chillPauseBtn";
        const existingToolbar = document.getElementById('chillToolbar');
        let isPauseActive = true;

        if (existingToolbar) {
            existingToolbar.insertBefore(skipPauseBtn, existingToolbar.firstChild);
        }

        skipPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        skipPauseBtn.style.background = "#28a745";
        skipPauseBtn.style.color = "white";
        skipPauseBtn.style.border = "none";
        skipPauseBtn.style.borderRadius = "5px";
        skipPauseBtn.style.padding = "8px 12px";
        skipPauseBtn.style.cursor = "pointer";
        skipPauseBtn.title = translations[getLang()].pauseButton;

        function updatePauseButtonState() {
            const disconnected = !!document.body.innerText.match(/You have disconnected/i);
            if (disconnected && isPauseActive) {
                skipPauseBtn.style.background = "#dc3545";
                skipPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPauseActive = false;
            } else if (!disconnected && !isPauseActive) {
                skipPauseBtn.style.background = "#28a745";
                skipPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPauseActive = true;
            }
        }

        skipPauseBtn.onclick = function() {
            if (isPauseActive) {
                for (let i = 0; i < 5; i++) {
                    setTimeout(() => {
                        const escEvent = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true });
                        document.dispatchEvent(escEvent);
                    }, i * 100);
                }
                skipPauseBtn.style.background = "#dc3545";
                skipPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
                isPauseActive = false;
            } else {
                const escEvent = new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', keyCode: 27, which: 27, bubbles: true });
                document.dispatchEvent(escEvent);
                skipPauseBtn.style.background = "#28a745";
                skipPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
                isPauseActive = true;
            }
        };

        const disconnectObserver = new MutationObserver(updatePauseButtonState);
        disconnectObserver.observe(document.body, { childList: true, subtree: true });
        setInterval(updatePauseButtonState, 1000);
        // if you see this message, please donate to support the development of the extension, thx! (Open ticket on discord or use funding.yml)
        // to check if your usage falls under prohibited activities, please visit chilltools.it/legal
        })();
