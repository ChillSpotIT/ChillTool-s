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
            
            #statisticsModal > div > div:first-child {
                background: linear-gradient(to right, #ff4444, #ff2222) !important;
                border-bottom: 1px solid #ff4444 !important;
            }

            #statisticsModal > div > div:first-child h3 {
                color: white !important;
                text-shadow: -1px -1px 0 #000,
                            1px -1px 0 #000,
                            -1px 1px 0 #000,
                            1px 1px 0 #000 !important;
            }

            #statisticsModal > div > div:first-child h3 i {
                color: white !important;
            }
            
            #countryLeaderboardModal > div > div:first-child {
                background: linear-gradient(to right, #ff4444, #ff2222) !important;
                border-bottom: 1px solid #ff4444 !important;
            }

            #countryLeaderboardModal > div > div:first-child h3 {
                color: white !important;
                text-shadow: -1px -1px 0 #000,
                            1px -1px 0 #000,
                            -1px 1px 0 #000,
                            1px 1px 0 #000 !important;
            }

            #countryLeaderboardModal > div > div:first-child h3 i {
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

        .bottomButton,
        .bottomButton.outlined,
        .bottomButton.new,
        .bottomButton.skipButton,
        .bottomButton.noSelect,
        .bottomButton.outlined.new,
        .bottomButton.outlined.skipButton,
        .bottomButton.new.skipButton,
        .bottomButton.outlined.new.skipButton,
        .bottomButton.outlined.new.noSelect,
        .bottomButton.outlined.skipButton.noSelect,
        .bottomButton.new.skipButton.noSelect,
        .bottomButton.outlined.new.skipButton.noSelect {
        background: linear-gradient(to top, #007aff, #339cff) !important;
        }
        
        .mainText, .subText  {
        color: white !important;
        }
        `
    }
};

export default predefinedStyles;
