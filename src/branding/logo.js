import { injectToBody } from '../core/dom.js';

let _isMobile = () => false;
let _isUmingle = false;
let _isUhmegle = false;
let _baseUrl = 'https://umingle.com';

export function setDeps(deps) {
    if (deps.isMobile) _isMobile = deps.isMobile;
    if (deps.isUmingle !== undefined) _isUmingle = deps.isUmingle;
    if (deps.isUhmegle !== undefined) _isUhmegle = deps.isUhmegle;
    if (deps.baseUrl) _baseUrl = deps.baseUrl;
}

export const addLogo = () => {
    const logo = document.createElement("img");
    logo.src = "https://i.ibb.co/jHzYHxz/Frame-53.png";
    logo.alt = "ChillSpot Logo";

    const rightBox = document.querySelector('.rightBox.outlined');
    const chatContainer = document.querySelector('.chatWindow');
    const container = rightBox || chatContainer;
    if (!container) return;

    container.style.position = 'relative';

    if (_isMobile()) {
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
            injectToBody(logo);
        }
    }

    logo.style.cursor = "pointer";
    logo.style.borderRadius = "5px";
    logo.style.boxShadow = "0 2px 10px rgba(0,0,0,0.0)";
    logo.style.zIndex = "5";

    logo.addEventListener("click", () => window.open("https://chilltools.it", "_blank"));
};

export const replaceLogo = () => {
    const logoBlock = document.querySelector('.logoBlock');
    if (logoBlock) {
        logoBlock.outerHTML = `
            <a href="${_baseUrl}" class="logoBlock" style="display: flex; align-items: center; text-decoration: none;">
                <img src="https://i.ibb.co/KcvKXzxK/logo.png"
                    style="height: 58px; width: auto; object-fit: contain; filter: drop-shadow(0 0 5px rgba(0,157,255,0.5))">
            </a>`;
    }
};

export const replaceUmingle = () => {
    const logoLink = document.querySelector('.logoLink');
    if (logoLink && window.location.hostname.includes('umingle.com')) {
        logoLink.outerHTML = `
            <a href="${_baseUrl}" class="logoBlock" style="display: flex; align-items: center; text-decoration: none;">
                <img src="https://i.ibb.co/xS4xFRrS/Frame.png"
                    style="height: 58px; width: auto; object-fit: contain; filter: drop-shadow(0 0 5px rgba(0,157,255,0.5))">
            </a>`;
    } else if (logoLink && window.location.hostname.includes('uhmegle.com')) {
        replaceLogo();
    }
};
