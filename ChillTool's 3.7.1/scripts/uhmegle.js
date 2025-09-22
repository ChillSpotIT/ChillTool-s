(function() {
    'use strict';

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    document.head.appendChild(link);

    const CURRENT_VERSION = '3.7.1';

    if (window.location.href === 'https://uhmegle.com/' || window.location.href === 'https://uhmegle.com') {
        setTimeout(() => {
            const lang = typeof getLang === 'function' ? getLang() : (localStorage.getItem('chilltool_lang') || 'en');
            const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : (translations && translations.en ? translations.en : { videoModeSuggestion: 'Switch to video mode to use ChillTools', close: 'Close' });
            const msg = t.videoModeSuggestion || 'Switch to video mode to use ChillTools';
            showNotification('ChillTools', msg, {
                type: 'info',
                duration: 5000,
                pulse: true,
                onClick: () => {
                    window.location.href = 'https://uhmegle.com/video';
                }
            });
        }, 1000);
    }

    if (window.location.hostname === 'uhmegle.com' && window.location.pathname.startsWith('/text')) {
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
                longitude: json.longitude || "N/A"
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
            ipBox.style.borderRadius = "10px";
            ipBox.style.border = "1px solid #333";
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
        historyBtn.innerHTML = '<i class="fas fa-clock"></i>';
        historyBtn.style.background = isMobile() ? "#007bff" : "#007bff";
        historyBtn.style.color = "white";
        historyBtn.style.border = "none";
        historyBtn.style.borderRadius = isMobile() ? "8px" : "5px";
        historyBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
        historyBtn.style.cursor = "pointer";
        historyBtn.style.fontSize = isMobile() ? "16px" : "inherit";
        historyBtn.title = "Show/Hide History";
        
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
        
        const settingsBtn = document.createElement("button");
        settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
        settingsBtn.style.background = "#6c757d";
        settingsBtn.style.color = "white";
        settingsBtn.style.border = "none";
        settingsBtn.style.borderRadius = isMobile() ? "8px" : "5px";
        settingsBtn.style.padding = isMobile() ? "10px 12px" : "8px 12px";
        settingsBtn.style.cursor = "pointer";
        settingsBtn.style.fontSize = isMobile() ? "16px" : "inherit";
        settingsBtn.title = "Settings";
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
        if (host !== 'uhmegle.com' || !path.startsWith('/video')) {
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

    const translations = {
        en: {
            settings: 'Settings',
            settingsDesc: 'Here you can configure the extension settings',
            language: 'Language:',
            close: 'Close',
            history: 'History',
            ban: 'Ban User',
            bannedUsers: 'Banned Users List',
            restarting: 'Restarting connection...',
            historyLimit: 'Only the last 25 people screenshots are saved',
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
            skip25Msg: "THIS PERSON WAS MET MORE THAN 25 SKIPS AGO!",
            banListTitle: 'Ban List',
            screenshot: 'Screenshot',
            actions: 'Actions',
            bannedListEmpty: 'Banned list is empty',
            videoModeSuggestion: 'Switch to video mode to use ChillTools',
            textModeNotSupported: 'Text mode is not supported!',
            betaWelcome: 'Welcome Aboard, Beta Tester!',
            outdatedExtension: 'Extension is outdated!'
        },
        zh: {
            settings: '设置',
            settingsDesc: '在这里您可以配置扩展设置',
            language: '语言:',
            close: '关闭',
            history: '历史记录',
            ban: '禁止用户',
            bannedUsers: '已禁止用户',
            restarting: '正在重新启动连接...',
            historyLimit: '只保存最后25个人的截图',
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
            skip25Msg: "此人在25次跳过前遇到过！",
            banListTitle: '封禁列表',
            screenshot: '截图',
            actions: '操作',
            bannedListEmpty: '封禁列表为空',
            videoModeSuggestion: '切换到视频模式以使用 ChillTools',
            textModeNotSupported: '文本模式不受支持！',
            betaWelcome: '欢迎加入，测试员！',
            outdatedExtension: '扩展已过期！'
        },
        hi: {
            settings: 'सेटिंग्स',
            settingsDesc: 'यहां आप एक्सटेंशन सेटिंग्स कॉन्फ़िगर कर सकते हैं',
            language: 'भाषा:',
            close: 'बंद करें',
            history: 'इतिहास',
            ban: 'उपयोगकर्ता को प्रतिबंधित करें',
            bannedUsers: 'प्रतिबंधित उपयोगकर्ता',
            restarting: 'कनेक्शन पुनः आरंभ किया जा रहा है...',
            historyLimit: 'केवल अंतिम 25 लोगों के स्क्रीनशॉट सहेजे जाते हैं',
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
            skip25Msg: "यह व्यक्ति 25 से अधिक स्किप्स पहले मिला था!",
            banListTitle: 'बैन सूची',
            screenshot: 'स्क्रीनशॉट',
            actions: 'कार्रवाई',
            bannedListEmpty: 'बैन की गई सूची खाली है',
            videoModeSuggestion: 'ChillTools का उपयोग करने के लिए वीडियो मोड पर स्विच करें',
            textModeNotSupported: 'टेक्स्ट मोड समर्थित नहीं है!',
            betaWelcome: 'स्वागत है, बीटा परीक्षक!',
            outdatedExtension: 'एक्सटेंशन पुराना हो गया है!'
        },
        es: {
            settings: 'Configuración',
            settingsDesc: 'Aquí puedes configurar los ajustes de la extensión',
            language: 'Idioma:',
            close: 'Cerrar',
            history: 'Historial',
            ban: 'Prohibir usuario',
            bannedUsers: 'Usuarios prohibidos',
            restarting: 'Reiniciando conexión...',
            historyLimit: 'Solo se guardan capturas de las últimas 25 personas',
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
            skip25Msg: "¡ESTA PERSONA FUE ENCONTRADA HACE MÁS DE 25 SKIPS!",
            banListTitle: 'Lista de Bloqueados',
            screenshot: 'Captura',
            actions: 'Acciones',
            bannedListEmpty: 'La lista de bloqueados está vacía',
            videoModeSuggestion: 'Cambia al modo video para usar ChillTools',
            textModeNotSupported: '¡El modo texto no es compatible!',
            betaWelcome: '¡Bienvenido a bordo, tester beta!',
            outdatedExtension: '¡La extensión está desactualizada!'
        },
        ar: {
            settings: 'الإعدادات',
            settingsDesc: 'هنا يمكنك تكوين إعدادات الامتداد',
            language: 'اللغة:',
            close: 'إغلاق',
            history: 'السجل',
            ban: 'حظر المستخدم',
            bannedUsers: 'المستخدمون المحظورون',
            restarting: 'جاري إعادة تشغيل الاتصال...',
            historyLimit: 'يتم حفظ لقطات الشاشة لآخر 25 شخصًا فقط',
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
            skip25Msg: "تمت مقابلة هذا الشخص منذ أكثر من 25 تخطي!",
            banListTitle: 'قائمة الحظر',
            screenshot: 'لقطة الشاشة',
            actions: 'إجراءات',
            bannedListEmpty: 'قائمة الحظر فارغة',
            videoModeSuggestion: 'بدّل إلى وضع الفيديو لاستخدام ChillTools',
            textModeNotSupported: 'وضع النص غير مدعوم!',
            betaWelcome: 'مرحبًا بكم، مختبِر النسخة التجريبية!',
            outdatedExtension: 'الامتداد قديم!'
        },
        fr: {
            settings: 'Paramètres',
            settingsDesc: 'Ici vous pouvez configurer les paramètres de l\'extension',
            language: 'Langue:',
            close: 'Fermer',
            history: 'Historique',
            ban: 'Bannir l\'utilisateur',
            bannedUsers: 'Utilisateurs bannis',
            restarting: 'Redémarrage de la connexion...',
            historyLimit: 'Seules les captures des 25 dernières personnes sont enregistrées',
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
            skip25Msg: "CETTE PERSONNE A ÉTÉ RENCONTRÉE IL Y A PLUS DE 25 SAUTS!",
            banListTitle: 'Liste des Bannis',
            screenshot: 'Capture',
            actions: 'Actions',
            bannedListEmpty: 'La liste des bannis est vide',
            videoModeSuggestion: 'Passez en mode vidéo pour utiliser ChillTools',
            textModeNotSupported: 'Le mode texte n\'est pas pris en charge !',
            betaWelcome: 'Bienvenue à bord, testeur bêta !',
            outdatedExtension: "L'extension est obsolète !"
        },
        bn: {
            settings: 'সেটিংস',
            settingsDesc: 'এখানে আপনি এক্সটেনশন সেটিংস কনফিগার করতে পারেন',
            language: 'ভাষা:',
            close: 'বন্ধ',
            history: 'ইতিহাস',
            ban: 'ব্যবহারকারী নিষিদ্ধ করুন',
            bannedUsers: 'নিষিদ্ধ ব্যবহারকারীরা',
            restarting: 'সংযোগ পুনরায় শুরু করা হচ্ছে...',
            historyLimit: 'শুধুমাত্র শেষ 25 জনের স্ক্রিনশট সংরক্ষণ করা হয়',
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
            skip25Msg: "এই ব্যক্তিকে 25 টির বেশি স্কিপ আগে দেখা হয়েছিল!",
            banListTitle: 'নিষিদ্ধ তালিকা',
            screenshot: 'স্ক্রিনশট',
            actions: 'কার্যকলাপ',
            bannedListEmpty: 'নিষিদ্ধ তালিকা খালি',
            videoModeSuggestion: 'ChillTools ব্যবহার করতে ভিডিও মোডে স্যুইচ করুন',
            textModeNotSupported: 'টেক্সট মোড সমর্থিত নয়!',
            betaWelcome: 'স্বাগতম, বেটা পরীক্ষক!',
            outdatedExtension: 'এক্সটেনশনটি পুরোনো হয়ে গেছে!'
        },

        ru: {
            settings: 'Настройки',
            settingsDesc: 'Здесь вы можете настроить параметры расширения',
            language: 'Язык:',
            close: 'Закрыть',
            history: 'История',
            ban: 'Заблокировать',
            bannedUsers: 'Заблокированные',
            restarting: 'Перезапуск соединения...',
            historyLimit: 'Сохраняются только скриншоты последних 25 человек',
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
            skip25Msg: "ЭТОТ ЧЕЛОВЕК БЫЛ ВСТРЕЧЕН БОЛЕЕ 25 SKIPS НАЗАД!",
            banListTitle: 'Черный список',
            screenshot: 'Скриншот',
            actions: 'Действия',
            bannedListEmpty: 'Черный список пуст',
            videoModeSuggestion: 'Переключитесь в видеорежим, чтобы использовать ChillTools',
            textModeNotSupported: 'Текстовый режим не поддерживается!',
            betaWelcome: 'Добро пожаловать, бета-тестер!',
            outdatedExtension: 'Расширение устарело!'
        },
        pt: {
            settings: 'Configurações',
            settingsDesc: 'Aqui você pode configurar as configurações da extensão',
            language: 'Idioma:',
            close: 'Fechar',
            history: 'Histórico',
            ban: 'Banir usuário',
            bannedUsers: 'Usuários banidos',
            restarting: 'Reiniciando conexão...',
            historyLimit: 'Apenas os screenshots das últimas 25 pessoas são salvos',
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
            skip25Msg: "ESTA PESSOA FOI ENCONTRADA HÁ MAIS DE 25 SKIPS!",
            banListTitle: 'Lista de Banidos',
            screenshot: 'Captura',
            actions: 'Ações',
            bannedListEmpty: 'A lista de banidos está vazia',
            videoModeSuggestion: 'Mude para o modo vídeo para usar o ChillTools',
            textModeNotSupported: 'O modo texto não é suportado!',
            betaWelcome: 'Bem-vindo a bordo, testador beta!',
            outdatedExtension: 'A extensão está desatualizada!'
        },
        id: {
            settings: 'Pengaturan',
            settingsDesc: 'Di sini Anda dapat mengonfigurasi pengaturan ekstensi',
            language: 'Bahasa:',
            close: 'Tutup',
            history: 'Riwayat',
            ban: 'Blokir pengguna',
            bannedUsers: 'Pengguna yang diblokir',
            restarting: 'Memulai ulang koneksi...',
            historyLimit: 'Hanya screenshot dari 25 orang terakhir yang disimpan',
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
            skip25Msg: "ORANG INI DITEMUI LEBIH DARI 25 SKIP YANG LALU!",
            banListTitle: 'Daftar Banned',
            screenshot: 'Screenshot',
            actions: 'Aksi',
            bannedListEmpty: 'Daftar banned kosong',
            videoModeSuggestion: 'Beralih ke mode video untuk menggunakan ChillTools',
            textModeNotSupported: 'Mode teks tidak didukung!',
            betaWelcome: 'Selamat datang, penguji beta!',
            outdatedExtension: 'Ekstensi sudah usang!'
        },
        it: {
            settings: 'Impostazioni',
            settingsDesc: "Qui puoi configurare le impostazioni dell'estensione",
            language: 'Lingua:',
            close: 'Chiudi',
            history: 'Cronologia',
            ban: 'Banna utente',
            bannedUsers: 'Utenti bannati',
            restarting: 'Riconnessione in corso...',
            historyLimit: 'Vengono salvati solo gli screenshot delle ultime 25 persone',
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
            skip25Msg: "QUESTA PERSONE È STATA INCONTRATA PIU' DI 25 SKIPS FA!",
            banListTitle: 'Lista Bannati',
            screenshot: 'Screenshot',
            actions: 'Azioni',
            bannedListEmpty: 'La lista dei bannati è vuota',
            videoModeSuggestion: 'Passa alla modalità video per usare ChillTools',
            textModeNotSupported: 'La modalità testo non è supportata!',
            betaWelcome: 'Benvenuto a bordo, beta tester!',
            outdatedExtension: "L'estensione non è aggiornata!"
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
                    
                    <div style="margin-bottom: 20px;">
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
                    </div>
                    
                    <button id="tosBtn" style="
                        width: 100%;
                        background: #444;
                        color: white;
                        border: none;
                        padding: 10px 15px;
                        border-radius: 5px;
                        cursor: pointer;
                        font-size: 14px;
                        margin-top: 10px;
                        transition: all 0.2s;
                        text-align: center;
                    ">
                        <i class="fas fa-file-alt"></i> ${t.termsOfService || 'Terms of Service'}
                    </button>
                </div>
                <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    chilltools.it
                </div>
            </div>
        </div>`;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.getElementById('langSelect').onchange = function() {
            localStorage.setItem('chilltool_lang', this.value);
            document.getElementById('settingsModal').remove();
            showSettings();
        };
        document.getElementById('tosBtn').onclick = function() {
            showToSModal();
        };
        document.getElementById('closeSettingsBtn').onclick = function() {
            const selected = document.getElementById('langSelect').value;
            localStorage.setItem('chilltool_lang', selected);
            document.getElementById('settingsModal').remove();
            unblurToolbar();
        };
    }

    function showToSModal() {
        const toolbar = document.getElementById('chillToolbar');
        if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
        const tos_en = `By using the IPGrabber extension for Uhmegle ("ChillTool's"), you agree to comply with the following terms and conditions. If you do not agree to these terms, you must refrain from using the Extension.<br><br>Use of the Extension<br>The IPGrabber extension for Uhmegle is a tool designed for use within the Uhmegle platform. By using this Extension, you acknowledge that you are solely responsible for its use and for any actions taken while using it. The Extension is provided "as is" and for personal use only.<br><br>No Liability for Misuse<br>The developers of this Extension assume no responsibility for how it is used. You agree not to use this Extension for illegal activities, including but not limited to harassment, privacy violations, or obtaining information from other users without their consent. Any misuse of the Extension is at your own risk.<br><br>The Extension may collect information. However, the developers do not guarantee the security of the data nor do they assume any responsibility for its potential misuse or exposure.<br><br>No Liability<br>The developers of this extension will not be liable for any damages, data loss, or other negative consequences arising from the use or misuse of the extension. This includes, but is not limited to, any legal action, penalty, or consequence resulting from violations of privacy, intellectual property, or other laws.`;
        const tos_zh = `通过使用Uhmegle的IPGrabber扩展("ChillTool's")，您同意遵守以下条款和条件。如果您不同意这些条款，您必须停止使用该扩展。<br><br>扩展的使用<br>Uhmegle的IPGrabber扩展是专为Uhmegle平台设计的工具。使用此扩展即表示您承认您对其使用及使用过程中采取的任何行动负全部责任。该扩展"按原样"提供，仅限个人使用。<br><br>不对滥用行为负责<br>本扩展的开发人员不对其使用方式承担任何责任。您同意不将此扩展用于非法活动，包括但不限于骚扰、侵犯隐私或在未经其他用户同意的情况下获取其信息。任何滥用扩展的行为均由您自行承担风险。<br><br>扩展可能会收集信息。但是，开发人员不保证数据的安全性，也不对其潜在的滥用或暴露承担任何责任。<br><br>无责任<br>本扩展的开发人员不对因使用或滥用扩展而导致的任何损害、数据丢失或其他负面后果负责。这包括但不限于因侵犯隐私、知识产权或其他法律而产生的任何法律行动、处罚或后果。`;
        const tos_hi = `Uhmegle ("ChillTool's") के लिए IPGrabber एक्सटेंशन का उपयोग करके, आप निम्नलिखित नियमों और शर्तों का पालन करने के लिए सहमत होते हैं। यदि आप इन नियमों से सहमत नहीं हैं, तो आपको एक्सटेंशन का उपयोग नहीं करना चाहिए।<br><br>एक्सटेंशन का उपयोग<br>Uhmegle के लिए IPGrabber एक्सटेंशन Uhmegle प्लेटफॉर्म के भीतर उपयोग के लिए डिज़ाइन किया गया एक टूल है। इस एक्सटेंशन का उपयोग करके, आप स्वीकार करते हैं कि आप इसके उपयोग और उपयोग के दौरान की गई किसी भी कार्रवाई के लिए पूरी तरह से जिम्मेदार हैं। एक्सटेंशन "जैसा है" के आधार पर प्रदान किया जाता है और केवल व्यक्तिगत उपयोग के लिए है।<br><br>दुरुपयोग के लिए कोई जिम्मेदारी नहीं<br>इस एक्सटेंशन के डेवलपर्स इसके उपयोग के तरीके के लिए कोई जिम्मेदारी नहीं लेते हैं। आप सहमत होते हैं कि इस एक्सटेंशन का उपयोग अवैध गतिविधियों के लिए नहीं करेंगे, जिसमें उत्पीड़न, गोपनीयता उल्लंघन या अन्य उपयोगकर्ताओं की सहमति के बिना जानकारी प्राप्त करना शामिल है। एक्सटेंशन के किसी भी दुरुपयोग का जोखिम आपका अपना है।<br><br>एक्सटेंशन जानकारी एकत्र कर सकता है। हालांकि, डेवलपर्स डेटा की सुरक्षा की गारंटी नहीं देते हैं और न ही इसके संभावित दुरुपयोग या एक्सपोजर के लिए कोई जिम्मेदारी लेते हैं।<br><br>कोई जिम्मेदारी नहीं<br>इस एक्सटेंशन के डेवलपर्स एक्सटेंशन के उपयोग या दुरुपयोग से होने वाले किसी भी नुकसान, डेटा हानि या अन्य नकारात्मक परिणामों के लिए जिम्मेदार नहीं होंगे। इसमें गोपनीयता, बौद्धिक संपदा या अन्य कानूनों के उल्लंघन के परिणामस्वरूप होने वाली किसी भी कानूनी कार्रवाई, जुर्माना या परिणाम शामिल हैं।`;
        const tos_es = `Al utilizar la extensión IPGrabber para Uhmegle ("ChillTool's"), aceptas cumplir con los siguientes términos y condiciones. Si no estás de acuerdo con estos términos, debes abstenerte de utilizar la Extensión.<br><br>Uso de la Extensión<br>La extensión IPGrabber para Uhmegle es una herramienta diseñada para su uso dentro de la plataforma Uhmegle. Al utilizar esta Extensión, reconoces que eres el único responsable de su uso y de cualquier acción realizada durante su utilización. La Extensión se proporciona "tal cual" y solo para uso personal.<br><br>Sin responsabilidad por uso indebido<br>Los desarrolladores de esta Extensión no asumen ninguna responsabilidad por cómo se utiliza. Aceptas no utilizar esta Extensión para actividades ilegales, incluyendo pero no limitado a acoso, violaciones de privacidad u obtención de información de otros usuarios sin su consentimiento. Cualquier uso indebido de la Extensión es bajo tu propio riesgo.<br><br>La Extensión puede recopilar información. Sin embargo, los desarrolladores no garantizan la seguridad de los datos ni asumen ninguna responsabilidad por su posible uso indebido o exposición.<br><br>Sin responsabilidad<br>Los desarrolladores de esta extensión no serán responsables por ningún daño, pérdida de datos u otras consecuencias negativas derivadas del uso o mal uso de la extensión. Esto incluye, pero no se limita a, cualquier acción legal, sanción o consecuencia resultante de violaciones de privacidad, propiedad intelectual u otras leyes.`;
        const tos_ar = `باستخدام امتداد IPGrabber لـ Uhmegle ("ChillTool's")، فإنك توافق على الالتزام بالشروط والأحكام التالية. إذا لم توافق على هذه الشروط، فيجب عليك الامتناع عن استخدام الامتداد.<br><br>استخدام الامتداد<br>امتداد IPGrabber لـ Uhmegle هو أداة مصممة للاستخدام داخل منصة Uhmegle. باستخدام هذا الامتداد، فإنك تقر بأنك المسؤول الوحيد عن استخدامه وأي إجراءات تتخذها أثناء استخدامه. يتم توفير الامتداد "كما هو" وللاستخدام الشخصي فقط.<br><br>لا توجد مسؤولية عن سوء الاستخدام<br>لا يتحمل مطورو هذا الامتداد أي مسؤولية عن كيفية استخدامه. أنت توافق على عدم استخدام هذا الامتداد في الأنشطة غير القانونية، بما في ذلك على سبيل المثال لا الحصر المضايقة أو انتهاكات الخصوصية أو الحصول على معلومات من مستخدمين آخرين دون موافقتهم. أي سوء استخدام للامتداد هو على مسؤوليتك الخاصة.<br><br>قد يجمع الامتداد المعلومات. ومع ذلك، لا يضمن المطورون أمان البيانات ولا يتحملون أي مسؤولية عن سوء الاستخدام المحتمل أو الكشف عنها.<br><br>لا توجد مسؤولية<br>لن يكون مطورو هذا الامتداد مسؤولين عن أي أضرار أو فقدان للبيانات أو أي عواقب سلبية أخرى ناتجة عن استخدام أو سوء استخدام الامتداد. وهذا يشمل، على سبيل المثال لا الحصر، أي إجراء قانوني أو عقوبة أو عواقب ناتجة عن انتهاكات الخصوصية أو الملكية الفكرية أو القوانين الأخرى.`;
        const tos_fr = `En utilisant l'extension IPGrabber pour Uhmegle ("ChillTool's"), vous acceptez de respecter les termes et conditions suivants. Si vous n'acceptez pas ces termes, vous devez vous abstenir d'utiliser l'Extension.<br><br>Utilisation de l'Extension<br>L'extension IPGrabber pour Uhmegle est un outil conçu pour être utilisé dans la plateforme Uhmegle. En utilisant cette Extension, vous reconnaissez que vous êtes seul responsable de son utilisation et de toute action entreprise lors de son utilisation. L'Extension est fournie "telle quelle" et uniquement pour un usage personnel.<br><br>Aucune responsabilité en cas d'utilisation abusive<br>Les développeurs de cette Extension n'assument aucune responsabilité quant à la manière dont elle est utilisée. Vous acceptez de ne pas utiliser cette Extension pour des activités illégales, y compris mais sans s'y limiter, le harcèlement, les violations de la vie privée ou l'obtention d'informations auprès d'autres utilisateurs sans leur consentement. Toute utilisation abusive de l'Extension est à vos risques et périls.<br><br>L'Extension peut collecter des informations. Cependant, les développeurs ne garantissent pas la sécurité des données et n'assument aucune responsabilité pour leur utilisation abusive ou leur divulgation potentielle.<br><br>Aucune responsabilité<br>Les développeurs de cette extension ne seront pas responsables des dommages, pertes de données ou autres conséquences négatives résultant de l'utilisation ou de l'utilisation abusive de l'extension. Cela inclut, sans s'y limiter, toute action en justice, pénalité ou conséquence résultant de violations de la vie privée, de la propriété intellectuelle ou d'autres lois.`;
        const tos_bn = `Uhmegle ("ChillTool's") এর জন্য IPGrabber এক্সটেনশন ব্যবহার করে, আপনি নিম্নলিখিত শর্তাবলী মেনে চলতে সম্মত হন। আপনি যদি এই শর্তাবলীতে সম্মত না হন, তাহলে আপনাকে এক্সটেনশন ব্যবহার থেকে বিরত থাকতে হবে।<br><br>এক্সটেনশনের ব্যবহার<br>Uhmegle এর জন্য IPGrabber এক্সটেনশন Uhmegle প্ল্যাটফর্মের মধ্যে ব্যবহারের জন্য ডিজাইন করা একটি টুল। এই এক্সটেনশন ব্যবহার করে, আপনি স্বীকার করেন যে আপনি এর ব্যবহার এবং ব্যবহারের সময় নেওয়া যেকোনো কর্মের জন্য সম্পূর্ণ দায়ী। এক্সটেনশন "যেমন আছে" তেমন সরবরাহ করা হয় এবং শুধুমাত্র ব্যক্তিগত ব্যবহারের জন্য।<br><br>দুর্ব্যবহারের জন্য কোন দায়িত্ব নেই<br>এই এক্সটেনশনের ডেভেলপাররা এটি কীভাবে ব্যবহার করা হয় তার জন্য কোন দায়িত্ব নেয় না। আপনি সম্মত হন যে এই এক্সটেনশনটি অবৈধ কার্যকলাপের জন্য ব্যবহার করবেন না, যার মধ্যে হয়রানি, গোপনীয়তা লঙ্ঘন বা অন্যান্য ব্যবহারকারীদের সম্মতি ছাড়া তথ্য পাওয়া অন্তর্ভুক্ত। এক্সটেনশনের যেকোনো দুর্ব্যবহার আপনার নিজের ঝুঁকিতে।<br><br>এক্সটেনশন তথ্য সংগ্রহ করতে পারে। যাইহোক, ডেভেলপাররা ডেটার নিরাপত্তা নিশ্চিত করে না এবং এর সম্ভাব্য দুর্ব্যবহার বা প্রকাশের জন্য কোন দায়িত্ব নেয় না।<br><br>কোন দায়িত্ব নেই<br>এই এক্সটেনশনের ডেভেলপাররা এক্সটেনশনের ব্যবহার বা দুর্ব্যবহারের ফলে সৃষ্ট কোন ক্ষতি, ডেটা হারানো বা অন্যান্য নেতিবাচক পরিণতির জন্য দায়ী থাকবে না। এর মধ্যে গোপনীয়তা, বৌদ্ধিক সম্পত্তি বা অন্যান্য আইন লঙ্ঘনের ফলে সৃষ্ট কোন আইনি ব্যবস্থা, শাস্তি বা পরিণতি অন্তর্ভুক্ত।`;
        const tos_ru = `Используя расширение IPGrabber для Uhmegle ("ChillTool's"), вы соглашаетесь соблюдать следующие условия. Если вы не согласны с этими условиями, вы должны воздержаться от использования Расширения.<br><br>Использование Расширения<br>Расширение IPGrabber для Uhmegle - это инструмент, предназначенный для использования на платформе Uhmegle. Используя это Расширение, вы признаете, что несете единоличную ответственность за его использование и за любые действия, совершенные во время его использования. Расширение предоставляется "как есть" и только для личного использования.<br><br>Отсутствие ответственности за неправильное использование<br>Разработчики этого Расширения не несут ответственности за то, как оно используется. Вы соглашаетесь не использовать это Расширение для незаконных действий, включая, помимо прочего, преследование, нарушение конфиденциальности или получение информации от других пользователей без их согласия. Любое неправильное использование Расширения осуществляется на ваш страх и риск.<br><br>Расширение может собирать информацию. Однако разработчики не гарантируют безопасность данных и не несут ответственности за их возможное неправильное использование или раскрытие.<br><br>Отсутствие ответственности<br>Разработчики этого расширения не несут ответственности за любой ущерб, потерю данных или другие негативные последствия, возникшие в результате использования или неправильного использования расширения. Это включает, но не ограничивается, любыми юридическими действиями, штрафами или последствиями, вытекающими из нарушений конфиденциальности, интеллектуальной собственности или других законов.`;
        const tos_pt = `Ao usar a extensão IPGrabber para Uhmegle ("ChillTool's"), você concorda em cumprir os seguintes termos e condições. Se você não concordar com esses termos, deve se abster de usar a Extensão.<br><br>Uso da Extensão<br>A extensão IPGrabber para Uhmegle é uma ferramenta projetada para uso dentro da plataforma Uhmegle. Ao usar esta Extensão, você reconhece que é o único responsável por seu uso e por quaisquer ações realizadas durante o uso. A Extensão é fornecida "como está" e apenas para uso pessoal.<br><br>Sem responsabilidade por uso indevido<br>Os desenvolvedores desta Extensão não assumem responsabilidade por como ela é usada. Você concorda em não usar esta Extensão para atividades ilegais, incluindo, mas não se limitando a, assédio, violações de privacidade ou obtenção de informações de outros usuários sem seu consentimento. Qualquer uso indevido da Extensão é por sua conta e risco.<br><br>A Extensão pode coletar informações. No entanto, os desenvolvedores não garantem a segurança dos dados nem assumem qualquer responsabilidade por seu possível uso indevido ou exposição.<br><br>Sem responsabilidade<br>Os desenvolvedores desta extensão não serão responsáveis por quaisquer danos, perda de dados ou outras consequências negativas decorrentes do uso ou mau uso da extensão. Isso inclui, mas não se limita a, qualquer ação legal, penalidade ou consequência resultante de violações de privacidade, propriedade intelectual ou outras leis.`;
        const tos_id = `Dengan menggunakan ekstensi IPGrabber untuk Uhmegle ("ChillTool's"), Anda setuju untuk mematuhi syarat dan ketentuan berikut. Jika Anda tidak setuju dengan syarat-syarat ini, Anda harus menahan diri untuk tidak menggunakan Ekstensi.<br><br>Penggunaan Ekstensi<br>Ekstensi IPGrabber untuk Uhmegle adalah alat yang dirancang untuk digunakan dalam platform Uhmegle. Dengan menggunakan Ekstensi ini, Anda mengakui bahwa Anda bertanggung jawab penuh atas penggunaannya dan atas tindakan apa pun yang dilakukan saat menggunakannya. Ekstensi disediakan "sebagaimana adanya" dan hanya untuk penggunaan pribadi.<br><br>Tidak Ada Tanggung Jawab atas Penyalahgunaan<br>Pengembang Ekstensi ini tidak bertanggung jawab atas cara penggunaannya. Anda setuju untuk tidak menggunakan Ekstensi ini untuk kegiatan ilegal, termasuk tetapi tidak terbatas pada pelecehan, pelanggaran privasi, atau memperoleh informasi dari pengguna lain tanpa persetujuan mereka. Setiap penyalahgunaan Ekstensi adalah risiko Anda sendiri.<br><br>Ekstensi dapat mengumpulkan informasi. Namun, pengembang tidak menjamin keamanan data dan tidak bertanggung jawab atas penyalahgunaan atau paparan potensialnya.<br><br>Tidak Ada Tanggung Jawab<br>Pengembang ekstensi ini tidak akan bertanggung jawab atas kerusakan, kehilangan data, atau konsekuensi negatif lainnya yang timbul dari penggunaan atau penyalahgunaan ekstensi. Ini termasuk, tetapi tidak terbatas pada, tindakan hukum, hukuman, atau konsekuensi yang dihasilkan dari pelanggaran privasi, kekayaan intelektual, atau hukum lainnya.`;
        const tos_it = `Utilizzando l'estensione IPGrabber per Uhmegle ("ChillTool's"), accetti di rispettare i seguenti termini e condizioni. Se non accetti questi termini, devi astenerti dall'utilizzare l'Estensione.<br><br>Utilizzo dell'Estensione<br>L'estensione IPGrabber per Uhmegle è uno strumento progettato per l'utilizzo all'interno della piattaforma Uhmegle. Utilizzando questa Estensione, riconosci di essere l'unico responsabile del suo utilizzo e di qualsiasi azione eseguita durante l'utilizzo. L'Estensione è fornita "così com'è" e solo per uso personale.<br><br>Nessuna responsabilità per uso improprio<br>Gli sviluppatori di questa Estensione non si assumono alcuna responsabilità per il modo in cui viene utilizzata. Accetti di non utilizzare questa Estensione per attività illegali, come, a titolo esemplificativo ma non esaustivo, molestie, violazioni della privacy o ottenimento di informazioni da altri utenti senza il loro consenso. Qualsiasi uso improprio dell'Estensione è a tuo rischio.<br><br>L'Estensione può raccogliere informazioni. Tuttavia, gli sviluppatori non garantiscono la sicurezza dei dati né si assumono alcuna responsabilità per il loro potenziale uso improprio o esposizione.<br><br>Nessuna responsabilità<br>Gli sviluppatori di questa estensione non saranno responsabili per eventuali danni, perdite di dati o altre conseguenze negative derivanti dall'uso o dall'uso improprio dell'estensione. Ciò include, ma non è limitato a, qualsiasi azione legale, sanzione o conseguenza derivante da violazioni della privacy, della proprietà intellettuale o di altre leggi.`;
        const lang = getLang();
        let currentText = lang === 'en' ? tos_en : 
                         lang === 'zh' ? tos_zh : 
                         lang === 'hi' ? tos_hi : 
                         lang === 'es' ? tos_es : 
                         lang === 'ar' ? tos_ar : 
                         lang === 'fr' ? tos_fr : 
                         lang === 'bn' ? tos_bn : 
                         lang === 'ru' ? tos_ru : 
                         lang === 'pt' ? tos_pt : 
                         lang === 'id' ? tos_id : tos_it;
        const modalHTML = `
        <div id="tosModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.85); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center;">
            <div style="background: #23223a; border-radius: 10px; width: 90%; max-width: 600px; padding: 24px; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #444; position: relative;">
                <h3 style="color: #fff; text-align: center; margin-top: 0; margin-bottom: 20px;">ToS</h3>
                <div style="display: flex; justify-content: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap;">
                    <button id="tosLangEn" style="background: ${lang === 'en' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">English</button>
                    <button id="tosLangZh" style="background: ${lang === 'zh' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">中文</button>
                    <button id="tosLangHi" style="background: ${lang === 'hi' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">हिन्दी</button>
                    <button id="tosLangEs" style="background: ${lang === 'es' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">Español</button>
                    <button id="tosLangAr" style="background: ${lang === 'ar' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">العربية</button>
                    <button id="tosLangFr" style="background: ${lang === 'fr' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">Français</button>
                    <button id="tosLangBn" style="background: ${lang === 'bn' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">বাংলা</button>
                    <button id="tosLangRu" style="background: ${lang === 'ru' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">Русский</button>
                    <button id="tosLangPt" style="background: ${lang === 'pt' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">Português</button>
                    <button id="tosLangId" style="background: ${lang === 'id' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">Bahasa Indonesia</button>
                    <button id="tosLangIt" style="background: ${lang === 'it' ? '#007bff' : '#6c757d'}; color: white; border: none; padding: 6px 16px; border-radius: 5px; cursor: pointer;">Italiano</button>
                </div>
                <div id="tosText" style="color: #eee; max-height: 350px; overflow-y: auto; font-size: 15px; line-height: 1.5; border: 1px solid #333; border-radius: 6px; background: #191927; padding: 16px; margin-bottom: 20px;">${currentText}</div>
                <button id="closeTosBtn" style="background: #007bff; color: white; border: none; padding: 8px 15px; border-radius: 5px; cursor: pointer; width: 100%;">${
                    lang === 'en' ? translations.en.close :
                    lang === 'zh' ? translations.zh.close :
                    lang === 'hi' ? translations.hi.close :
                    lang === 'es' ? translations.es.close :
                    lang === 'ar' ? translations.ar.close :
                    lang === 'fr' ? translations.fr.close :
                    lang === 'bn' ? translations.bn.close :
                    lang === 'ru' ? translations.ru.close :
                    lang === 'pt' ? translations.pt.close :
                    lang === 'id' ? translations.id.close :
                    translations.it.close
                }</button>
            </div>
        </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('tosLangEn').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_en;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangZh').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_zh;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangHi').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_hi;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangEs').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_es;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangAr').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_ar;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangFr').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_fr;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangBn').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_bn;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangRu').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_ru;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangPt').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_pt;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangId').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_id;
            resetLangButtons();
            this.style.background = '#007bff';
        };
        document.getElementById('tosLangIt').onclick = function() {
            document.getElementById('tosText').innerHTML = tos_it;
            resetLangButtons();
            this.style.background = '#007bff';
        };

        function resetLangButtons() {
            document.querySelectorAll('#tosModal button[id^="tosLang"]').forEach(btn => {
                btn.style.background = '#6c757d';
            });
        }

        document.getElementById('closeTosBtn').onclick = function() {
            document.getElementById('tosModal').remove();
            unblurToolbar();
        };
    }

    function unblurToolbar() {
        const toolbar = document.getElementById('chillToolbar');
        if (toolbar) toolbar.classList.remove('chill-blur');
    }

    const modalObserver = new MutationObserver(() => {
        if (isMobile()) return; 
        
        const modals = document.querySelectorAll('#settingsModal, #tosModal, #historyModal, #screenshotModal, #infoModal, #bannedUsersModal');
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
    const MAX_SCREENSHOTS = 25;

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

        const banBtn = document.querySelector("#chillToolbar button[title*='Banna']");
        if(banBtn) banBtn.disabled = false;

        const ipBox = getOrCreateIpBox();
        const lang = getLang();
        const t = translations[lang];
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

        const locationInfo = await getLocation(ip);
        if (locationInfo) {
            currentSession.info = locationInfo;
            ipBox.innerHTML = `
                <h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>
                <div style="color: #fff; margin-bottom: 15px;">
                    <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.ip}</span> <br>
                    <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.city}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.city}</span> <br>
                    <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.region}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.state}</span> <br>
                    <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.country}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${locationInfo.country}</span> <br>
                    <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.coordinates}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">(${locationInfo.latitude}, ${locationInfo.longitude})</span>
                </div>
            `;

        }

        const videoElement = document.getElementById('remoteVideo');
        if (videoElement) {
            captureAndStoreScreenshot(videoElement, ip);
        }
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
                            const photoAvailable = index < 25;
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
            logo.style.position = "absolute";
            logo.style.bottom = "10px";
            logo.style.right = "10px";
            logo.style.width = "80px";
            logo.style.transition = "all 0.3s ease";
            logo.style.zIndex = "5"; 
            logo.id = 'chillLogo';
            
            if (chatContainer) {
                chatContainer.style.position = 'relative';
                chatContainer.style.zIndex = 'auto';
            }
            
            logo.addEventListener("mouseenter", () => logo.style.transform = "scale(1.05)");
            logo.addEventListener("mouseleave", () => logo.style.transform = "scale(1)");
            
            chatContainer.appendChild(logo);
        }
        
        logo.style.cursor = "pointer";
        logo.style.borderRadius = "5px";
        logo.style.boxShadow = "0 2px 10px rgba(0,0,0,0.0)";
        logo.style.zIndex = "5"; 
        
        logo.addEventListener("click", () => window.open("https://chilltools.it", "_blank"));
    };

    const replaceLogo = () => {
        const originalLogo = document.querySelector('header img.logo[src="/static/img/logo.svg"]');
        if (originalLogo) {
            originalLogo.src = 'https://i.ibb.co/KcvKXzxK/logo.png';
            originalLogo.style.filter = 'drop-shadow(0 0 5px rgba(0,157,255,0.5))';
        }
    };

    const removeVerificationPopup = () => {
        const popup = document.getElementById("faceOverlay");
        if (popup) popup.remove();
        document.body.style.overflow = "auto";
    };

    const init = () => {
        const checkInterval = setInterval(() => {
            const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow');
            if (chatContainer) {
                checkBackgroundColor();
                clearInterval(checkInterval);
            }
        }, 500);
        
        document.body.appendChild(createToolbar());
        addLogo();
        replaceLogo();
        removeVerificationPopup();
        setupBackgroundObserver();
        
        new MutationObserver(removeVerificationPopup)
            .observe(document.body, { childList: true, subtree: true });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    let escTimes = [];
    const skipPauseBtn = document.createElement("button");
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
    skipPauseBtn.title = "Pause Button";

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
    })();
