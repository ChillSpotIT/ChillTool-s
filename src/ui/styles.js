import { injectToHead } from '../core/dom.js';

export function injectCoreStyles() {
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
            z-index: 9998 !important;
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
    injectToHead(style);
}
