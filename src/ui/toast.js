import { injectToBody } from '../core/dom.js';
import translations from '../i18n/translations.js';

let _getLang = () => 'en';
export function setGetLang(fn) { _getLang = fn; }

export function showNotification(title, message, options = {}) {
    const { type = 'info', duration = 4000, showClose = true } = options;
    const lang = _getLang();
    const t = translations[lang] || translations['en'];

    const toast = document.createElement('div');
    toast.className = 'chill-toast';
    toast.style.zIndex = '99999';

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
        container.style.zIndex = '99999';
        injectToBody(container);
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

export function showWelcomeNotification() {
    const host = (window.location && window.location.hostname) ? window.location.hostname : '';
    const path = (window.location && window.location.pathname) ? window.location.pathname : '';
    if ((host !== 'uhmegle.com' && host !== 'umingle.com') || !path.startsWith('/video')) {
        return;
    }

    const lang = _getLang();
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
        'zh': 'ChillTools 现在已激活并准备就绪!'
    };

    const message = welcomeMessages[lang] || welcomeMessages['en'];
    showNotification('ChillTools', message, {
        type: 'success',
        duration: 5000,
        pulse: true
    });
}
