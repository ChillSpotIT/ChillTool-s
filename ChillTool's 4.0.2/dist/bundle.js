(() => {
  // src/core/dom.js
  var injectToHead = (element) => {
    if (document.head) {
      document.head.appendChild(element);
    } else {
      const observer = new MutationObserver(() => {
        if (document.head) {
          document.head.appendChild(element);
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  };
  var injectToBody = (element) => {
    if (document.body) {
      document.body.appendChild(element);
      updateModalBlockedChrome();
    } else {
      const observer = new MutationObserver(() => {
        if (document.body) {
          document.body.appendChild(element);
          updateModalBlockedChrome();
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  };
  var insertAdjacentHTMLToBody = (position, html) => {
    if (document.body) {
      document.body.insertAdjacentHTML(position, html);
      updateModalBlockedChrome();
    } else {
      const observer = new MutationObserver(() => {
        if (document.body) {
          document.body.insertAdjacentHTML(position, html);
          updateModalBlockedChrome();
          observer.disconnect();
        }
      });
      observer.observe(document.documentElement, { childList: true, subtree: true });
    }
  };
  var CHILL_MODAL_SELECTOR = [
    "#settingsModal",
    "#tosModal",
    "#historyModal",
    "#screenshotModal",
    "#infoModal",
    "#bannedUsersModal",
    "#userStylesModal",
    "#galleryModal",
    "#countryFilterModal",
    "#countryLeaderboardModal",
    "#colorModal",
    "#reviewModal",
    "#statisticsModal"
  ].join(", ");
  var CHILL_TOOLBAR_DEFAULT_Z_INDEX = "10000";
  var CHILL_TOOLBAR_BLOCKED_Z_INDEX = "9998";
  function hasOpenChillModal() {
    return document.querySelector(CHILL_MODAL_SELECTOR) !== null;
  }
  function updateModalBlockedChrome() {
    const modalOpen = hasOpenChillModal();
    const toolbar = document.getElementById("chillToolbar");
    const logo = document.getElementById("chillLogo");
    if (toolbar) {
      toolbar.classList.toggle("chill-blur", modalOpen);
      toolbar.style.zIndex = modalOpen ? CHILL_TOOLBAR_BLOCKED_Z_INDEX : _isMobile() ? "999" : CHILL_TOOLBAR_DEFAULT_Z_INDEX;
      toolbar.style.pointerEvents = modalOpen ? "none" : "";
      toolbar.querySelectorAll("button").forEach((button) => {
        button.style.pointerEvents = modalOpen ? "none" : "";
      });
    }
    if (logo) {
      logo.classList.toggle("chill-blur", modalOpen);
    }
  }
  var _isMobile = () => false;
  function setIsMobile(fn) {
    _isMobile = fn;
  }
  function escapeHtml(str) {
    if (str == null)
      return "";
    return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  // src/core/state.js
  var isSaveButtonChoiceEnabled = localStorage.getItem("saveButtonChoice") === "true";
  var _isIpDisplayEnabled = true;
  if (isSaveButtonChoiceEnabled) {
    const savedIpDisplay = localStorage.getItem("ipDisplayEnabled");
    if (savedIpDisplay !== null) {
      _isIpDisplayEnabled = savedIpDisplay === "true";
    }
  }
  function getIsIpDisplayEnabled() {
    return _isIpDisplayEnabled;
  }
  function setIsIpDisplayEnabled(val) {
    _isIpDisplayEnabled = val;
  }
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ")
        c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0)
        return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
  var CURRENT_VERSION = "4.0.2";

  // src/i18n/translations.js
  var translations = {
    en: {
      showIpDisplay: "Show IP Display",
      settings: "Settings",
      settingsDesc: "Here you can configure the extension settings",
      language: "Language:",
      whiteColorNotAllowed: "White color is not allowed. Please choose a different color.",
      close: "Close",
      download: "Download",
      history: "History",
      ban: "Block User",
      bannedUsers: "Blocked Users List",
      restarting: "Restarting connection...",
      historyLimit: "Only the last 30 people screenshots are saved",
      emptyHistory: "History is empty",
      connectToStart: "Connect with partners to start recording",
      zero: "0 entries",
      entry: "entry",
      entries: "entries",
      ip: "IP",
      loading: "Loading...",
      city: "City",
      region: "Region",
      country: "Country",
      coordinates: "Coordinates",
      time: "Time",
      photoNotAvailable: "The photo is no longer available",
      skip25Msg: "THIS PERSON WAS MET MORE THAN 30 SKIPS AGO!",
      banListTitle: "Block List",
      screenshot: "Screenshot",
      actions: "Actions",
      bannedListEmpty: "Block list is empty",
      videoModeSuggestion: "Switch to video mode to use ChillTools",
      textModeNotSupported: "Text mode is not supported!",
      betaWelcome: "Welcome Aboard, Beta Tester!",
      outdatedExtension: "Extension is outdated!",
      apply: "Apply",
      color: "Color",
      videoBorder: "Custom Color",
      userStyles: "UserStyles",
      userStylesDesc: "Customize the look of the site and extension with custom CSS",
      customCSS: "Custom CSS",
      reset: "Reset",
      save: "Save",
      gallery: "Gallery",
      userStyleActive: "UserStyle is active. Custom colors are disabled.",
      disableUserStyle: "Disable UserStyle to use custom colors.",
      galleryDesc: "Choose from pre-made styles",
      applyStyle: "Apply",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "Custom styles have been reset",
      stylesSaved: "Custom styles saved successfully!",
      styleApplied: "applied!",
      omegle: "Omegle Style",
      countryFilter: "Country Filter",
      countryFilterDesc: "Select countries to connect with",
      selectCountries: "Select Countries",
      noCountriesSelected: "No countries selected - all countries allowed",
      countriesSelected: "countries selected",
      peopleEncountered: "People Encountered",
      saveButtonChoice: "Save button choices",
      persistent: "Persistent",
      persistentTooltip: "Save the last choice made on buttons",
      showIp: "Show IP",
      showIpTooltip: "Show/hide IP box",
      statistics: "Statistics",
      donate: "Donate",
      statisticsTitle: "Usage Statistics",
      totalTimeSpent: "Total Time Spent",
      skips: "Skips",
      enterIpToBlock: "Enter IP to block",
      blockIp: "Block IP",
      reviewTitle: "Enjoying ChillTool's?",
      reviewBody: "If you like it, please leave a 5-star review. It helps a lot!",
      reviewLater: "Maybe later",
      reviewOk: "OK",
      countryLeaderboardBtn: "Country leaderboard",
      countryLeaderboardTitle: "Country leaderboard",
      countryLeaderboardTotalCountries: "Total countries encountered:",
      countryLeaderboardNoData: "No data",
      countryLeaderboardClear: "Clear leaderboard",
      countryLeaderboardClearConfirm: "Clear the entire country leaderboard?",
      noteMaxChars: "Max 50 characters"
    },
    zh: {
      showIpDisplay: "\u663E\u793AIP",
      settings: "\u8BBE\u7F6E",
      settingsDesc: "\u5728\u8FD9\u91CC\u60A8\u53EF\u4EE5\u914D\u7F6E\u6269\u5C55\u8BBE\u7F6E",
      language: "\u8BED\u8A00:",
      whiteColorNotAllowed: "\u4E0D\u5141\u8BB8\u4F7F\u7528\u767D\u8272\u3002\u8BF7\u9009\u62E9\u5176\u4ED6\u989C\u8272\u3002",
      close: "\u5173\u95ED",
      history: "\u5386\u53F2\u8BB0\u5F55",
      ban: "\u5C4F\u853D\u7528\u6237",
      bannedUsers: "\u5DF2\u5C4F\u853D\u7528\u6237",
      restarting: "\u6B63\u5728\u91CD\u65B0\u542F\u52A8\u8FDE\u63A5...",
      historyLimit: "\u53EA\u4FDD\u5B58\u6700\u540E30\u4E2A\u4EBA\u7684\u622A\u56FE",
      emptyHistory: "\u5386\u53F2\u8BB0\u5F55\u4E3A\u7A7A",
      connectToStart: "\u8FDE\u63A5\u4F19\u4F34\u5F00\u59CB\u5F55\u5236",
      zero: "0\u6761\u8BB0\u5F55",
      entry: "\u6761\u8BB0\u5F55",
      entries: "\u6761\u8BB0\u5F55",
      ip: "IP",
      loading: "\u52A0\u8F7D\u4E2D...",
      city: "\u57CE\u5E02",
      region: "\u5730\u533A",
      country: "\u56FD\u5BB6",
      coordinates: "\u5750\u6807",
      time: "\u65F6\u95F4",
      photoNotAvailable: "\u7167\u7247\u4E0D\u518D\u53EF\u7528",
      skip25Msg: "\u6B64\u4EBA\u572830\u6B21\u8DF3\u8FC7\u524D\u9047\u5230\u8FC7\uFF01",
      apply: "\u5E94\u7528",
      color: "\u989C\u8272",
      videoBorder: "\u81EA\u5B9A\u4E49\u989C\u8272",
      banListTitle: "\u5C4F\u853D\u5217\u8868",
      screenshot: "\u622A\u56FE",
      actions: "\u64CD\u4F5C",
      bannedListEmpty: "\u5C4F\u853D\u5217\u8868\u4E3A\u7A7A",
      videoModeSuggestion: "\u5207\u6362\u5230\u89C6\u9891\u6A21\u5F0F\u4EE5\u4F7F\u7528 ChillTools",
      textModeNotSupported: "\u6587\u672C\u6A21\u5F0F\u4E0D\u53D7\u652F\u6301\uFF01",
      betaWelcome: "\u6B22\u8FCE\u52A0\u5165\uFF0C\u6D4B\u8BD5\u5458\uFF01",
      outdatedExtension: "\u6269\u5C55\u5DF2\u8FC7\u671F\uFF01",
      userStyles: "\u7528\u6237\u6837\u5F0F",
      userStylesDesc: "\u4F7F\u7528\u81EA\u5B9A\u4E49CSS\u81EA\u5B9A\u4E49\u7F51\u7AD9\u548C\u6269\u5C55\u7684\u5916\u89C2",
      customCSS: "\u81EA\u5B9A\u4E49CSS",
      reset: "\u91CD\u7F6E",
      save: "\u4FDD\u5B58",
      gallery: "\u753B\u5ECA",
      userStyleActive: "UserStyle \u5DF2\u6FC0\u6D3B\u3002\u81EA\u5B9A\u4E49\u989C\u8272\u5DF2\u7981\u7528\u3002",
      disableUserStyle: "\u7981\u7528 UserStyle \u4EE5\u4F7F\u7528\u81EA\u5B9A\u4E49\u989C\u8272\u3002",
      galleryDesc: "\u9009\u62E9\u9884\u5236\u6837\u5F0F",
      applyStyle: "\u5E94\u7528",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "\u81EA\u5B9A\u4E49\u6837\u5F0F\u5DF2\u91CD\u7F6E",
      stylesSaved: "\u81EA\u5B9A\u4E49\u6837\u5F0F\u4FDD\u5B58\u6210\u529F\uFF01",
      styleApplied: "\u5DF2\u5E94\u7528\uFF01",
      omegle: "Omegle Style",
      countryFilter: "\u56FD\u5BB6\u8FC7\u6EE4",
      countryFilterDesc: "\u9009\u62E9\u8981\u8FDE\u63A5\u7684\u56FD\u5BB6",
      selectCountries: "\u9009\u62E9\u56FD\u5BB6",
      noCountriesSelected: "\u672A\u9009\u62E9\u56FD\u5BB6 - \u5141\u8BB8\u6240\u6709\u56FD\u5BB6",
      countriesSelected: "\u4E2A\u56FD\u5BB6\u5DF2\u9009\u62E9",
      peopleEncountered: "\u9047\u5230\u7684\u7528\u6237",
      saveButtonChoice: "\u4FDD\u5B58\u6309\u94AE\u9009\u62E9",
      persistent: "\u6301\u4E45\u5316",
      persistentTooltip: "\u4FDD\u5B58\u6309\u94AE\u7684\u6700\u540E\u9009\u62E9",
      showIp: "\u663E\u793AIP",
      showIpTooltip: "\u663E\u793A/\u9690\u85CFIP\u6846",
      statistics: "\u7EDF\u8BA1",
      donate: "\u6350\u8D60",
      statisticsTitle: "\u4F7F\u7528\u7EDF\u8BA1",
      totalTimeSpent: "\u603B\u4F7F\u7528\u65F6\u95F4",
      skips: "\u8DF3\u8FC7\u6B21\u6570",
      enterIpToBlock: "\u8F93\u5165\u8981\u963B\u6B62\u7684IP",
      blockIp: "\u963B\u6B62IP",
      reviewTitle: "\u559C\u6B22 ChillTool's \u5417\uFF1F",
      reviewBody: "\u5982\u679C\u60A8\u559C\u6B22\uFF0C\u8BF7\u7ED9\u6211\u4EEC\u4E00\u4E2A\u4E94\u661F\u597D\u8BC4\uFF0C\u8FD9\u5BF9\u6211\u4EEC\u975E\u5E38\u6709\u5E2E\u52A9\uFF01",
      reviewLater: "\u7A0D\u540E\u518D\u8BF4",
      reviewOk: "\u597D\u7684",
      countryLeaderboardBtn: "\u56FD\u5BB6\u6392\u884C\u699C",
      countryLeaderboardTitle: "\u56FD\u5BB6\u6392\u884C\u699C",
      countryLeaderboardTotalCountries: "\u9047\u5230\u7684\u56FD\u5BB6\u603B\u6570\uFF1A",
      countryLeaderboardNoData: "\u6682\u65E0\u6570\u636E",
      countryLeaderboardClear: "\u6E05\u9664\u6392\u884C\u699C",
      noteMaxChars: "\u6700\u591A50\u4E2A\u5B57\u7B26",
      countryLeaderboardClearConfirm: "\u6E05\u9664\u6574\u4E2A\u56FD\u5BB6\u6392\u884C\u699C\uFF1F"
    },
    hi: {
      showIpDisplay: "\u0906\u0908\u092A\u0940 \u0921\u093F\u0938\u094D\u092A\u094D\u0932\u0947 \u092C\u0949\u0915\u094D\u0938 \u0926\u093F\u0916\u093E\u090F\u0902",
      settings: "\u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938",
      apply: "\u0932\u093E\u0917\u0942 \u0915\u0930\u0947\u0902",
      color: "\u0930\u0902\u0917",
      videoBorder: "\u0915\u093E\u0938\u094D\u091F\u092E \u0930\u0902\u0917",
      whiteColorNotAllowed: "\u0938\u092B\u0947\u0926 \u0930\u0902\u0917 \u0915\u0940 \u0905\u0928\u0941\u092E\u0924\u093F \u0928\u0939\u0940\u0902 \u0939\u0948\u0964 \u0915\u0943\u092A\u092F\u093E \u0915\u094B\u0908 \u0905\u0928\u094D\u092F \u0930\u0902\u0917 \u091A\u0941\u0928\u0947\u0902\u0964",
      settingsDesc: "\u092F\u0939\u093E\u0902 \u0906\u092A \u090F\u0915\u094D\u0938\u091F\u0947\u0902\u0936\u0928 \u0938\u0947\u091F\u093F\u0902\u0917\u094D\u0938 \u0915\u0949\u0928\u094D\u092B\u093C\u093F\u0917\u0930 \u0915\u0930 \u0938\u0915\u0924\u0947 \u0939\u0948\u0902",
      language: "\u092D\u093E\u0937\u093E:",
      close: "\u092C\u0902\u0926 \u0915\u0930\u0947\u0902",
      history: "\u0907\u0924\u093F\u0939\u093E\u0938",
      ban: "\u0909\u092A\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E \u0915\u094B \u092C\u094D\u0932\u0949\u0915 \u0915\u0930\u0947\u0902",
      bannedUsers: "\u092C\u094D\u0932\u0949\u0915 \u0915\u093F\u090F \u0917\u090F \u0909\u092A\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E",
      restarting: "\u0915\u0928\u0947\u0915\u094D\u0936\u0928 \u092A\u0941\u0928\u0903 \u0906\u0930\u0902\u092D \u0915\u093F\u092F\u093E \u091C\u093E \u0930\u0939\u093E \u0939\u0948...",
      historyLimit: "\u0915\u0947\u0935\u0932 \u0905\u0902\u0924\u093F\u092E 30 \u0932\u094B\u0917\u094B\u0902 \u0915\u0947 \u0938\u094D\u0915\u094D\u0930\u0940\u0928\u0936\u0949\u091F \u0938\u0939\u0947\u091C\u0947 \u091C\u093E\u0924\u0947 \u0939\u0948\u0902",
      emptyHistory: "\u0907\u0924\u093F\u0939\u093E\u0938 \u0916\u093E\u0932\u0940 \u0939\u0948",
      connectToStart: "\u0930\u093F\u0915\u0949\u0930\u094D\u0921\u093F\u0902\u0917 \u0936\u0941\u0930\u0942 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0938\u093E\u0925\u093F\u092F\u094B\u0902 \u0938\u0947 \u0915\u0928\u0947\u0915\u094D\u091F \u0915\u0930\u0947\u0902",
      zero: "0 \u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901",
      entry: "\u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F",
      entries: "\u092A\u094D\u0930\u0935\u093F\u0937\u094D\u091F\u093F\u092F\u093E\u0901",
      ip: "\u0906\u0908\u092A\u0940",
      loading: "\u0932\u094B\u0921 \u0939\u094B \u0930\u0939\u093E \u0939\u0948...",
      city: "\u0936\u0939\u0930",
      region: "\u0915\u094D\u0937\u0947\u0924\u094D\u0930",
      country: "\u0926\u0947\u0936",
      coordinates: "\u0928\u093F\u0930\u094D\u0926\u0947\u0936\u093E\u0902\u0915",
      time: "\u0938\u092E\u092F",
      photoNotAvailable: "\u092B\u094B\u091F\u094B \u0905\u092C \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948",
      skip25Msg: "\u092F\u0939 \u0935\u094D\u092F\u0915\u094D\u0924\u093F 30 \u0938\u0947 \u0905\u0927\u093F\u0915 \u0938\u094D\u0915\u093F\u092A\u094D\u0938 \u092A\u0939\u0932\u0947 \u092E\u093F\u0932\u093E \u0925\u093E!",
      banListTitle: "\u092C\u094D\u0932\u0949\u0915 \u0938\u0942\u091A\u0940",
      screenshot: "\u0938\u094D\u0915\u094D\u0930\u0940\u0928\u0936\u0949\u091F",
      actions: "\u0915\u093E\u0930\u094D\u0930\u0935\u093E\u0908",
      bannedListEmpty: "\u092C\u094D\u0932\u0949\u0915 \u0938\u0942\u091A\u0940 \u0916\u093E\u0932\u0940 \u0939\u0948",
      videoModeSuggestion: "ChillTools \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0935\u0940\u0921\u093F\u092F\u094B \u092E\u094B\u0921 \u092A\u0930 \u0938\u094D\u0935\u093F\u091A \u0915\u0930\u0947\u0902",
      textModeNotSupported: "\u091F\u0947\u0915\u094D\u0938\u094D\u091F \u092E\u094B\u0921 \u0938\u092E\u0930\u094D\u0925\u093F\u0924 \u0928\u0939\u0940\u0902 \u0939\u0948!",
      betaWelcome: "\u0938\u094D\u0935\u093E\u0917\u0924 \u0939\u0948, \u092C\u0940\u091F\u093E \u092A\u0930\u0940\u0915\u094D\u0937\u0915!",
      outdatedExtension: "\u090F\u0915\u094D\u0938\u091F\u0947\u0902\u0936\u0928 \u092A\u0941\u0930\u093E\u0928\u093E \u0939\u094B \u0917\u092F\u093E \u0939\u0948!",
      userStyles: "\u0909\u092A\u092F\u094B\u0917\u0915\u0930\u094D\u0924\u093E \u0936\u0948\u0932\u093F\u092F\u093E\u0901",
      userStylesDesc: "\u0915\u0938\u094D\u091F\u092E CSS \u0915\u0947 \u0938\u093E\u0925 \u0938\u093E\u0907\u091F \u0914\u0930 \u090F\u0915\u094D\u0938\u091F\u0947\u0902\u0936\u0928 \u0915\u0940 \u0932\u0941\u0915 \u0915\u094B \u0915\u0938\u094D\u091F\u092E\u093E\u0907\u091C\u093C \u0915\u0930\u0947\u0902",
      customCSS: "\u0915\u0938\u094D\u091F\u092E CSS",
      reset: "\u0930\u0940\u0938\u0947\u091F \u0915\u0930\u0947\u0902",
      save: "\u0938\u0939\u0947\u091C\u0947\u0902",
      gallery: "\u0917\u0948\u0932\u0930\u0940",
      userStyleActive: "UserStyle \u0938\u0915\u094D\u0930\u093F\u092F \u0939\u0948\u0964 \u0915\u0938\u094D\u091F\u092E \u0930\u0902\u0917 \u0905\u0915\u094D\u0937\u092E \u0939\u0948\u0902\u0964",
      disableUserStyle: "\u0915\u0938\u094D\u091F\u092E \u0930\u0902\u0917\u094B\u0902 \u0915\u093E \u0909\u092A\u092F\u094B\u0917 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F UserStyle \u0905\u0915\u094D\u0937\u092E \u0915\u0930\u0947\u0902\u0964",
      galleryDesc: "\u092A\u0942\u0930\u094D\u0935-\u0928\u093F\u0930\u094D\u092E\u093F\u0924 \u0936\u0948\u0932\u093F\u092F\u094B\u0902 \u092E\u0947\u0902 \u0938\u0947 \u091A\u0941\u0928\u0947\u0902",
      applyStyle: "\u0932\u093E\u0917\u0942 \u0915\u0930\u0947\u0902",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "\u0915\u0938\u094D\u091F\u092E \u0936\u0948\u0932\u093F\u092F\u093E\u0901 \u0930\u0940\u0938\u0947\u091F \u0915\u0930 \u0926\u0940 \u0917\u0908 \u0939\u0948\u0902",
      stylesSaved: "\u0915\u0938\u094D\u091F\u092E \u0936\u0948\u0932\u093F\u092F\u093E\u0901 \u0938\u092B\u0932\u0924\u093E\u092A\u0942\u0930\u094D\u0935\u0915 \u0938\u0939\u0947\u091C\u0940 \u0917\u0908\u0902!",
      styleApplied: "\u0932\u093E\u0917\u0942 \u0915\u093F\u092F\u093E \u0917\u092F\u093E!",
      omegle: "Omegle Style",
      countryFilter: "\u0926\u0947\u0936 \u092B\u093C\u093F\u0932\u094D\u091F\u0930",
      countryFilterDesc: "\u0915\u0928\u0947\u0915\u094D\u091F \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0926\u0947\u0936 \u091A\u0941\u0928\u0947\u0902",
      selectCountries: "\u0926\u0947\u0936 \u091A\u0941\u0928\u0947\u0902",
      noCountriesSelected: "\u0915\u094B\u0908 \u0926\u0947\u0936 \u0928\u0939\u0940\u0902 \u091A\u0941\u0928\u093E \u0917\u092F\u093E - \u0938\u092D\u0940 \u0926\u0947\u0936 \u0905\u0928\u0941\u092E\u0924",
      countriesSelected: "\u0926\u0947\u0936 \u091A\u0941\u0928\u0947 \u0917\u090F",
      peopleEncountered: "\u092E\u093F\u0932\u0947 \u0932\u094B\u0917",
      saveButtonChoice: "\u092C\u091F\u0928 \u0935\u093F\u0915\u0932\u094D\u092A \u0938\u0939\u0947\u091C\u0947\u0902",
      persistent: "\u0938\u094D\u0925\u093E\u092F\u0940",
      persistentTooltip: "\u092C\u091F\u0928\u094B\u0902 \u092A\u0930 \u0915\u0940 \u0917\u0908 \u0905\u0902\u0924\u093F\u092E \u092A\u0938\u0902\u0926 \u0938\u0939\u0947\u091C\u0947\u0902",
      showIp: "\u0906\u0908\u092A\u0940 \u0926\u093F\u0916\u093E\u090F\u0902",
      showIpTooltip: "\u0906\u0908\u092A\u0940 \u092C\u0949\u0915\u094D\u0938 \u0926\u093F\u0916\u093E\u090F\u0902/\u091B\u0941\u092A\u093E\u090F\u0902",
      statistics: "\u0906\u0902\u0915\u0921\u093C\u0947",
      donate: "\u0926\u093E\u0928 \u0915\u0930\u0947\u0902",
      statisticsTitle: "\u0909\u092A\u092F\u094B\u0917 \u0906\u0902\u0915\u0921\u093C\u0947",
      totalTimeSpent: "\u0915\u0941\u0932 \u092C\u093F\u0924\u093E\u092F\u093E \u0938\u092E\u092F",
      skips: "\u0938\u094D\u0915\u093F\u092A",
      enterIpToBlock: "\u092C\u094D\u0932\u0949\u0915 \u0915\u0930\u0928\u0947 \u0915\u0947 \u0932\u093F\u090F \u0906\u0908\u092A\u0940 \u0926\u0930\u094D\u091C \u0915\u0930\u0947\u0902",
      blockIp: "\u0906\u0908\u092A\u0940 \u092C\u094D\u0932\u0949\u0915 \u0915\u0930\u0947\u0902",
      reviewTitle: "ChillTool's \u092A\u0938\u0902\u0926 \u0906 \u0930\u0939\u093E \u0939\u0948?",
      reviewBody: "\u0905\u0917\u0930 \u0906\u092A\u0915\u094B \u092A\u0938\u0902\u0926 \u0939\u0948, \u0924\u094B \u0915\u0943\u092A\u092F\u093E 5\u2011\u0938\u094D\u091F\u093E\u0930 \u0930\u093F\u0935\u094D\u092F\u0942 \u0926\u0947\u0902\u0964 \u092F\u0939 \u092C\u0939\u0941\u0924 \u092E\u0926\u0926 \u0915\u0930\u0924\u093E \u0939\u0948!",
      reviewLater: "\u0936\u093E\u092F\u0926 \u092C\u093E\u0926 \u092E\u0947\u0902",
      reviewOk: "\u0920\u0940\u0915 \u0939\u0948",
      countryLeaderboardBtn: "\u0926\u0947\u0936 \u0930\u0948\u0902\u0915\u093F\u0902\u0917",
      countryLeaderboardTitle: "\u0926\u0947\u0936 \u0930\u0948\u0902\u0915\u093F\u0902\u0917",
      countryLeaderboardTotalCountries: "\u0915\u0941\u0932 \u092E\u093F\u0932\u0947 \u0926\u0947\u0936:",
      countryLeaderboardNoData: "\u0915\u094B\u0908 \u0921\u0947\u091F\u093E \u0928\u0939\u0940\u0902",
      countryLeaderboardClear: "\u0930\u0948\u0902\u0915\u093F\u0902\u0917 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902",
      noteMaxChars: "\u0905\u0927\u093F\u0915\u0924\u092E 50 \u0905\u0915\u094D\u0937\u0930",
      countryLeaderboardClearConfirm: "\u092A\u0942\u0930\u0940 \u0926\u0947\u0936 \u0930\u0948\u0902\u0915\u093F\u0902\u0917 \u0938\u093E\u092B\u093C \u0915\u0930\u0947\u0902?"
    },
    es: {
      settings: "Configuraci\xF3n",
      apply: "Aplicar",
      color: "Color",
      videoBorder: "Color personalizado",
      whiteColorNotAllowed: "El color blanco no est\xE1 permitido. Por favor, elija un color diferente.",
      settingsDesc: "Aqu\xED puedes configurar los ajustes de la extensi\xF3n",
      language: "Idioma:",
      close: "Cerrar",
      history: "Historial",
      ban: "Bloquear usuario",
      bannedUsers: "Usuarios bloqueados",
      enterIpToBlock: "Ingresar IP para bloquear",
      blockIp: "Bloquear IP",
      restarting: "Reiniciando conexi\xF3n...",
      historyLimit: "Solo se guardan capturas de las \xFAltimas 30 personas",
      emptyHistory: "El historial est\xE1 vac\xEDo",
      connectToStart: "Con\xE9ctate con compa\xF1eros para comenzar a grabar",
      zero: "0 encuentros",
      entry: "entrada",
      entries: "entradas",
      ip: "IP",
      loading: "Cargando...",
      city: "Ciudad",
      region: "Regi\xF3n",
      country: "Pa\xEDs",
      coordinates: "Coordenadas",
      time: "Hora",
      photoNotAvailable: "La foto ya no est\xE1 disponible",
      skip25Msg: "\xA1ESTA PERSONA FUE ENCONTRADA H\xC1 M\xC1S DE 30 SKIPS!",
      banListTitle: "Lista de Bloqueados",
      screenshot: "Captura",
      actions: "Acciones",
      bannedListEmpty: "La lista de bloqueados est\xE1 vac\xEDa",
      videoModeSuggestion: "Cambia al modo video para usar ChillTools",
      textModeNotSupported: "\xA1El modo texto no es compatible!",
      betaWelcome: "\xA1Bienvenido a bordo, tester beta!",
      outdatedExtension: "\xA1La extensi\xF3n est\xE1 desactualizada!",
      userStyles: "UserStyles",
      userStylesDesc: "Personaliza el aspecto del sitio y la extensi\xF3n con CSS personalizado",
      customCSS: "CSS Personalizado",
      reset: "Restablecer",
      save: "Guardar",
      gallery: "Galer\xEDa",
      userStyleActive: "UserStyle est\xE1 activo. Los colores personalizados est\xE1n deshabilitados.",
      disableUserStyle: "Deshabilita UserStyle para usar colores personalizados.",
      galleryDesc: "Elige entre estilos predefinidos",
      applyStyle: "Aplicar",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "Los estilos personalizados se han restablecido",
      stylesSaved: "\xA1Estilos personalizados guardados con \xE9xito!",
      styleApplied: "\xA1aplicado!",
      omegle: "Omegle Style",
      countryFilter: "Filtro de Pa\xEDs",
      countryFilterDesc: "Selecciona pa\xEDses para conectar",
      selectCountries: "Seleccionar Pa\xEDses",
      noCountriesSelected: "Ning\xFAn pa\xEDs seleccionado - todos los pa\xEDses permitidos",
      countriesSelected: "pa\xEDses seleccionados",
      peopleEncountered: "Personas encontradas",
      saveButtonChoice: "Guardar elecci\xF3n de botones",
      persistent: "PERSISTENTE",
      persistentTooltip: "Guarda la \xFAltima elecci\xF3n hecha en los botones",
      showIp: "Mostrar IP",
      showIpTooltip: "Mostrar/ocultar el cuadro de IP",
      statistics: "Estad\xEDsticas",
      donate: "Donar",
      statisticsTitle: "Estad\xEDsticas de Uso",
      totalTimeSpent: "Tiempo Total Transcurrido",
      skips: "Saltos",
      reviewTitle: "\xBFTe gusta ChillTool's?",
      reviewBody: "Si te gusta, por favor deja una rese\xF1a de 5 estrellas. \xA1Nos ayuda mucho!",
      reviewLater: "Quiz\xE1s m\xE1s tarde",
      reviewOk: "OK",
      countryLeaderboardBtn: "Clasificaci\xF3n de pa\xEDses",
      countryLeaderboardTitle: "Clasificaci\xF3n de pa\xEDses",
      countryLeaderboardTotalCountries: "Total de pa\xEDses encontrados:",
      countryLeaderboardNoData: "Sin datos",
      countryLeaderboardClear: "Borrar clasificaci\xF3n",
      noteMaxChars: "M\xE1ximo 50 caracteres",
      countryLeaderboardClearConfirm: "\xBFBorrar toda la clasificaci\xF3n de pa\xEDses?"
    },
    ar: {
      settings: "\u0627\u0644\u0625\u0639\u062F\u0627\u062F\u0627\u062A",
      apply: "\u062A\u0637\u0628\u064A\u0642",
      showIpDisplay: "\u0639\u0631\u0636 IP",
      color: "\u0644\u0648\u0646",
      videoBorder: "\u0644\u0648\u0646 \u0645\u062E\u0635\u0635",
      whiteColorNotAllowed: "\u0627\u0644\u0644\u0648\u0646 \u0627\u0644\u0623\u0628\u064A\u0636 \u063A\u064A\u0631 \u0645\u0633\u0645\u0648\u062D \u0628\u0647. \u0627\u0644\u0631\u062C\u0627\u0621 \u0627\u062E\u062A\u064A\u0627\u0631 \u0644\u0648\u0646 \u0622\u062E\u0631.",
      settingsDesc: "\u0647\u0646\u0627 \u064A\u0645\u0643\u0646\u0643 \u062A\u0643\u0648\u064A\u0646 \u0625\u0639\u062F\u0627\u062F\u0627\u062A \u0627\u0644\u0627\u0645\u062A\u062F\u0627\u062F",
      language: "\u0627\u0644\u0644\u063A\u0629:",
      close: "\u0625\u063A\u0644\u0627\u0642",
      history: "\u0627\u0644\u0633\u062C\u0644",
      ban: "\u062D\u0638\u0631 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",
      bannedUsers: "\u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645\u0648\u0646 \u0627\u0644\u0645\u062D\u0638\u0648\u0631\u0648\u0646",
      restarting: "\u062C\u0627\u0631\u064A \u0625\u0639\u0627\u062F\u0629 \u062A\u0634\u063A\u064A\u0644 \u0627\u0644\u0627\u062A\u0635\u0627\u0644...",
      historyLimit: "\u064A\u062A\u0645 \u062D\u0641\u0638 \u0644\u0642\u0637\u0627\u062A \u0627\u0644\u0634\u0627\u0634\u0629 \u0644\u0622\u062E\u0631 30 \u0634\u062E\u0635\u064B\u0627 \u0641\u0642\u0637",
      emptyHistory: "\u0627\u0644\u0633\u062C\u0644 \u0641\u0627\u0631\u063A",
      connectToStart: "\u0627\u062A\u0635\u0644 \u0628\u0627\u0644\u0634\u0631\u0643\u0627\u0621 \u0644\u0628\u062F\u0621 \u0627\u0644\u062A\u0633\u062C\u064A\u0644",
      zero: "0 \u0625\u062F\u062E\u0627\u0644\u0627\u062A",
      entry: "\u0625\u062F\u062E\u0627\u0644",
      entries: "\u0625\u062F\u062E\u0627\u0644\u0627\u062A",
      ip: "IP",
      loading: "\u062C\u0627\u0631 \u0627\u0644\u062A\u062D\u0645\u064A\u0644...",
      city: "\u0627\u0644\u0645\u062F\u064A\u0646\u0629",
      region: "\u0627\u0644\u0645\u0646\u0637\u0642\u0629",
      country: "\u0627\u0644\u0628\u0644\u062F",
      coordinates: "\u0627\u0644\u0625\u062D\u062F\u0627\u062B\u064A\u0627\u062A",
      time: "\u0627\u0644\u0648\u0642\u062A",
      photoNotAvailable: "\u0627\u0644\u0635\u0648\u0631\u0629 \u0644\u0645 \u062A\u0639\u062F \u0645\u062A\u0648\u0641\u0631\u0629",
      skip25Msg: "\u062A\u0645\u062A \u0645\u0642\u0627\u0628\u0644\u0629 \u0647\u0630\u0627 \u0627\u0644\u0634\u062E\u0635 \u0645\u0646\u0630 \u0623\u0643\u062B\u0631 \u0645\u0646 30 \u062A\u062E\u0637\u064A!",
      banListTitle: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0638\u0631",
      screenshot: "\u0644\u0642\u0637\u0629 \u0627\u0644\u0634\u0627\u0634\u0629",
      actions: "\u0625\u062C\u0631\u0627\u0621\u0627\u062A",
      bannedListEmpty: "\u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062D\u0638\u0631 \u0641\u0627\u0631\u063A\u0629",
      videoModeSuggestion: "\u0628\u062F\u0651\u0644 \u0625\u0644\u0649 \u0648\u0636\u0639 \u0627\u0644\u0641\u064A\u062F\u064A\u0648 \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 ChillTools",
      textModeNotSupported: "\u0648\u0636\u0639 \u0627\u0644\u0646\u0635 \u063A\u064A\u0631 \u0645\u062F\u0639\u0648\u0645!",
      betaWelcome: "\u0645\u0631\u062D\u0628\u064B\u0627 \u0628\u0643\u0645\u060C \u0645\u062E\u062A\u0628\u0650\u0631 \u0627\u0644\u0646\u0633\u062E\u0629 \u0627\u0644\u062A\u062C\u0631\u064A\u0628\u064A\u0629!",
      outdatedExtension: "\u0627\u0644\u0627\u0645\u062A\u062F\u0627\u062F \u0642\u062F\u064A\u0645!",
      userStyles: "\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u0633\u062A\u062E\u062F\u0645",
      userStylesDesc: "\u062A\u062E\u0635\u064A\u0635 \u0645\u0638\u0647\u0631 \u0627\u0644\u0645\u0648\u0642\u0639 \u0648\u0627\u0644\u0627\u0645\u062A\u062F\u0627\u062F \u0628\u0627\u0633\u062A\u062E\u062F\u0627\u0645 CSS \u0645\u062E\u0635\u0635",
      customCSS: "CSS \u0645\u062E\u0635\u0635",
      reset: "\u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646",
      save: "\u062D\u0641\u0638",
      gallery: "\u0645\u0639\u0631\u0636",
      userStyleActive: "UserStyle \u0646\u0634\u0637\u0629. \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0645\u0639\u0637\u0644\u0629.",
      disableUserStyle: "\u0639\u0637\u0644 UserStyle \u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645 \u0627\u0644\u0623\u0644\u0648\u0627\u0646 \u0627\u0644\u0645\u062E\u0635\u0635\u0629.",
      galleryDesc: "\u0627\u062E\u062A\u0631 \u0645\u0646 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u062C\u0627\u0647\u0632\u0629",
      applyStyle: "\u062A\u0637\u0628\u064A\u0642",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "\u062A\u0645 \u0625\u0639\u0627\u062F\u0629 \u062A\u0639\u064A\u064A\u0646 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u062E\u0635\u0635\u0629",
      stylesSaved: "\u062A\u0645 \u062D\u0641\u0638 \u0627\u0644\u0623\u0646\u0645\u0627\u0637 \u0627\u0644\u0645\u062E\u0635\u0635\u0629 \u0628\u0646\u062C\u0627\u062D!",
      styleApplied: "\u062A\u0645 \u0627\u0644\u062A\u0637\u0628\u064A\u0642!",
      omegle: "Omegle Style",
      countryFilter: "\u062A\u0635\u0641\u064A\u0629 \u0627\u0644\u0628\u0644\u062F",
      countryFilterDesc: "\u062D\u062F\u062F \u0627\u0644\u0628\u0644\u062F\u0627\u0646 \u0644\u0644\u0627\u062A\u0635\u0627\u0644 \u0628\u0647\u0627",
      selectCountries: "\u0627\u062E\u062A\u0631 \u0627\u0644\u0628\u0644\u062F\u0627\u0646",
      noCountriesSelected: "\u0644\u0645 \u064A\u062A\u0645 \u0627\u062E\u062A\u064A\u0627\u0631 \u0623\u064A \u0628\u0644\u062F - \u062C\u0645\u064A\u0639 \u0627\u0644\u0628\u0644\u062F\u0627\u0646 \u0645\u0633\u0645\u0648\u062D \u0628\u0647\u0627",
      countriesSelected: "\u0627\u0644\u0628\u0644\u062F\u0627\u0646 \u0627\u0644\u0645\u062D\u062F\u062F\u0629",
      peopleEncountered: "\u0627\u0644\u0623\u0634\u062E\u0627\u0635 \u0627\u0644\u0630\u064A\u0646 \u0642\u0627\u0628\u0644\u062A\u0647\u0645",
      saveButtonChoice: "\u062D\u0641\u0638 \u0627\u062E\u062A\u064A\u0627\u0631 \u0627\u0644\u0623\u0632\u0631\u0627\u0631",
      persistent: "\u0645\u0633\u062A\u0645\u0631",
      persistentTooltip: "\u062D\u0641\u0638 \u0622\u062E\u0631 \u0627\u062E\u062A\u064A\u0627\u0631 \u062A\u0645 \u0639\u0644\u0649 \u0627\u0644\u0623\u0632\u0631\u0627\u0631",
      showIp: "\u0639\u0631\u0636 IP",
      showIpTooltip: "\u0625\u0638\u0647\u0627\u0631/\u0625\u062E\u0641\u0627\u0621 \u0645\u0631\u0628\u0639 IP",
      statistics: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A",
      donate: "\u062A\u0628\u0631\u0639",
      statisticsTitle: "\u0625\u062D\u0635\u0627\u0626\u064A\u0627\u062A \u0627\u0644\u0627\u0633\u062A\u062E\u062F\u0627\u0645",
      totalTimeSpent: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u0633\u062A\u063A\u0631\u0642",
      skips: "\u062A\u062E\u0637\u064A",
      enterIpToBlock: "\u0623\u062F\u062E\u0644 IP \u0644\u0644\u062D\u0638\u0631",
      blockIp: "\u062D\u0638\u0631 IP",
      reviewTitle: "\u0647\u0644 \u062A\u0633\u062A\u0645\u062A\u0639 \u0628\u0640 ChillTool's\u061F",
      reviewBody: "\u0625\u0630\u0627 \u0623\u0639\u062C\u0628\u0643\u060C \u064A\u0631\u062C\u0649 \u062A\u0631\u0643 \u062A\u0642\u064A\u064A\u0645 5 \u0646\u062C\u0648\u0645. \u0647\u0630\u0627 \u064A\u0633\u0627\u0639\u062F\u0646\u0627 \u0643\u062B\u064A\u0631\u064B\u0627!",
      reviewLater: "\u0631\u0628\u0645\u0627 \u0644\u0627\u062D\u0642\u064B\u0627",
      reviewOk: "\u0645\u0648\u0627\u0641\u0642",
      countryLeaderboardBtn: "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062F\u0648\u0644",
      countryLeaderboardTitle: "\u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062F\u0648\u0644",
      countryLeaderboardTotalCountries: "\u0625\u062C\u0645\u0627\u0644\u064A \u0627\u0644\u062F\u0648\u0644 \u0627\u0644\u062A\u064A \u062A\u0645\u062A \u0645\u0642\u0627\u0628\u0644\u062A\u0647\u0627:",
      countryLeaderboardNoData: "\u0644\u0627 \u062A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A",
      countryLeaderboardClear: "\u0645\u0633\u062D \u0627\u0644\u062A\u0635\u0646\u064A\u0641",
      noteMaxChars: "\u0627\u0644\u062D\u062F \u0627\u0644\u0623\u0642\u0635\u0649 50 \u062D\u0631\u0641\u064B\u0627",
      countryLeaderboardClearConfirm: "\u0647\u0644 \u062A\u0631\u064A\u062F \u0645\u0633\u062D \u062A\u0635\u0646\u064A\u0641 \u0627\u0644\u062F\u0648\u0644 \u0628\u0627\u0644\u0643\u0627\u0645\u0644\u061F"
    },
    fr: {
      settings: "Param\xE8tres",
      apply: "Appliquer",
      color: "Couleur",
      showIpDisplay: "Afficher la bo\xEEte d'affichage IP",
      videoBorder: "Couleur personnalis\xE9e",
      whiteColorNotAllowed: "La couleur blanche n'est pas autoris\xE9e. Veuillez choisir une couleur diff\xE9rente.",
      settingsDesc: "Ici vous pouvez configurer les param\xE8tres de l'extension",
      language: "Langue:",
      close: "Fermer",
      history: "Historique",
      ban: "Bloquer l'utilisateur",
      bannedUsers: "Utilisateurs bloqu\xE9s",
      restarting: "Red\xE9marrage de la connexion...",
      historyLimit: "Seules les captures des 30 derni\xE8res personnes sont enregistr\xE9es",
      emptyHistory: "L'historique est vide",
      connectToStart: "Connectez-vous avec des partenaires pour commencer l'enregistrement",
      zero: "0 entr\xE9es",
      entry: "entr\xE9e",
      entries: "entr\xE9es",
      ip: "IP",
      loading: "Chargement...",
      city: "Ville",
      region: "R\xE9gion",
      country: "Pays",
      coordinates: "Coordonn\xE9es",
      time: "Heure",
      photoNotAvailable: "La photo n'est plus disponible",
      skip25Msg: "CETTE PERSONNE A \xC9T\xC9 RENCONTR\xC9E IL Y A PLUS DE 30 SAUTS!",
      banListTitle: "Liste des Bloqu\xE9s",
      screenshot: "Capture",
      actions: "Actions",
      bannedListEmpty: "La liste des bloqu\xE9s est vide",
      videoModeSuggestion: "Passez en mode vid\xE9o pour utiliser ChillTools",
      textModeNotSupported: "Le mode texte n'est pas pris en charge !",
      betaWelcome: "Bienvenue \xE0 bord, testeur b\xEAta !",
      outdatedExtension: "L'extension est obsol\xE8te !",
      userStyles: "UserStyles",
      userStylesDesc: "Personnalisez l'apparence du site et de l'extension avec du CSS personnalis\xE9",
      customCSS: "CSS Personnalis\xE9",
      reset: "R\xE9initialiser",
      save: "Enregistrer",
      gallery: "Galerie",
      userStyleActive: "UserStyle est actif. Les couleurs personnalis\xE9es sont d\xE9sactiv\xE9es.",
      disableUserStyle: "D\xE9sactivez UserStyle pour utiliser les couleurs personnalis\xE9es.",
      galleryDesc: "Choisissez parmi les styles pr\xE9d\xE9finis",
      applyStyle: "Appliquer",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "Les styles personnalis\xE9s ont \xE9t\xE9 r\xE9initialis\xE9s",
      stylesSaved: "Styles personnalis\xE9s enregistr\xE9s avec succ\xE8s!",
      styleApplied: "appliqu\xE9!",
      omegle: "Omegle Style",
      countryFilter: "Filtre de Pays",
      countryFilterDesc: "S\xE9lectionnez les pays \xE0 connecter",
      selectCountries: "S\xE9lectionner les Pays",
      noCountriesSelected: "Aucun pays s\xE9lectionn\xE9 - tous les pays autoris\xE9s",
      countriesSelected: "pays s\xE9lectionn\xE9s",
      peopleEncountered: "Personnes rencontr\xE9es",
      saveButtonChoice: "Enregistrer le choix des boutons",
      persistent: "PERSISTANT",
      persistentTooltip: "Enregistre le dernier choix fait sur les boutons",
      showIp: "Afficher IP",
      showIpTooltip: "Afficher/masquer la bo\xEEte IP",
      statistics: "Statistiques",
      donate: "Faire un don",
      statisticsTitle: "Statistiques d'Utilisation",
      totalTimeSpent: "Temps Total Pass\xE9",
      skips: "Sauts",
      enterIpToBlock: "Entrez l'IP \xE0 bloquer",
      blockIp: "Bloquer IP",
      reviewTitle: "Vous appr\xE9ciez ChillTool's ?",
      reviewBody: "Si vous l'aimez, merci de laisser un avis 5 \xE9toiles. \xC7a nous aide beaucoup !",
      reviewLater: "Plus tard",
      reviewOk: "OK",
      countryLeaderboardBtn: "Classement des pays",
      countryLeaderboardTitle: "Classement des pays",
      countryLeaderboardTotalCountries: "Total des pays rencontr\xE9s :",
      countryLeaderboardNoData: "Aucune donn\xE9e",
      countryLeaderboardClear: "Effacer le classement",
      noteMaxChars: "Maximum 50 caract\xE8res",
      countryLeaderboardClearConfirm: "Effacer tout le classement des pays ?"
    },
    bn: {
      settings: "\u09B8\u09C7\u099F\u09BF\u0982\u09B8",
      apply: "\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u0997 \u0995\u09B0\u09C1\u09A8",
      color: "\u09B0\u0999",
      videoBorder: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09B0\u0999",
      whiteColorNotAllowed: "\u09B8\u09BE\u09A6\u09BE \u09B0\u0982 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4 \u09A8\u09AF\u09BC\u0964 \u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u098F\u0995\u099F\u09BF \u09AD\u09BF\u09A8\u09CD\u09A8 \u09B0\u0982 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8\u0964",
      settingsDesc: "\u098F\u0996\u09BE\u09A8\u09C7 \u0986\u09AA\u09A8\u09BF \u098F\u0995\u09CD\u09B8\u099F\u09C7\u09A8\u09B6\u09A8 \u09B8\u09C7\u099F\u09BF\u0982\u09B8 \u0995\u09A8\u09AB\u09BF\u0997\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09AA\u09BE\u09B0\u09C7\u09A8",
      language: "\u09AD\u09BE\u09B7\u09BE:",
      showIpDisplay: "IP \u09A6\u09C7\u0996\u09BE\u09A8\u09CB",
      statistics: "\u09AA\u09B0\u09BF\u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09A8",
      donate: "\u09A6\u09BE\u09A8 \u0995\u09B0\u09C1\u09A8",
      statisticsTitle: "\u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u09AA\u09B0\u09BF\u09B8\u0982\u0996\u09CD\u09AF\u09BE\u09A8",
      totalTimeSpent: "\u09AE\u09CB\u099F \u0985\u09A4\u09BF\u09AC\u09BE\u09B9\u09BF\u09A4 \u09B8\u09AE\u09AF\u09BC",
      peopleEncountered: "\u09B2\u09CB\u0995\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7",
      skips: "\u09B8\u09CD\u0995\u09BF\u09AA",
      close: "\u09AC\u09A8\u09CD\u09A7",
      history: "\u0987\u09A4\u09BF\u09B9\u09BE\u09B8",
      ban: "\u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0 \u09AC\u09CD\u09B2\u0995 \u0995\u09B0\u09C1\u09A8",
      bannedUsers: "\u09AC\u09CD\u09B2\u0995 \u0995\u09B0\u09BE \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0\u09B0\u09BE",
      restarting: "\u09B8\u0982\u09AF\u09CB\u0997 \u09AA\u09C1\u09A8\u09B0\u09BE\u09AF\u09BC \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09BE \u09B9\u099A\u09CD\u099B\u09C7...",
      historyLimit: "\u09B6\u09C1\u09A7\u09C1\u09AE\u09BE\u09A4\u09CD\u09B0 \u09B6\u09C7\u09B7 30 \u099C\u09A8\u09C7\u09B0 \u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09A8\u09B6\u099F \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC",
      emptyHistory: "\u0987\u09A4\u09BF\u09B9\u09BE\u09B8 \u0996\u09BE\u09B2\u09BF",
      connectToStart: "\u09B0\u09C7\u0995\u09B0\u09CD\u09A1\u09BF\u0982 \u09B6\u09C1\u09B0\u09C1 \u0995\u09B0\u09A4\u09C7 \u0985\u0982\u09B6\u09C0\u09A6\u09BE\u09B0\u09A6\u09C7\u09B0 \u09B8\u09BE\u09A5\u09C7 \u09B8\u0982\u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8",
      zero: "0 \u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF",
      entry: "\u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF",
      entries: "\u098F\u09A8\u09CD\u099F\u09CD\u09B0\u09BF",
      ip: "\u0986\u0987\u09AA\u09BF",
      loading: "\u09B2\u09CB\u09A1 \u09B9\u099A\u09CD\u099B\u09C7...",
      city: "\u09B6\u09B9\u09B0",
      region: "\u0985\u099E\u09CD\u099A\u09B2",
      country: "\u09A6\u09C7\u09B6",
      coordinates: "\u09B8\u09CD\u09A5\u09BE\u09A8\u09BE\u0999\u09CD\u0995",
      time: "\u09B8\u09AE\u09AF\u09BC",
      photoNotAvailable: "\u099B\u09AC\u09BF\u099F\u09BF \u0986\u09B0 \u09AA\u09BE\u0993\u09AF\u09BC\u09BE \u09AF\u09BE\u099A\u09CD\u099B\u09C7 \u09A8\u09BE",
      skip25Msg: "\u098F\u0987 \u09AC\u09CD\u09AF\u0995\u09CD\u09A4\u09BF\u0995\u09C7 30 \u099F\u09BF\u09B0 \u09AC\u09C7\u09B6\u09BF \u09B8\u09CD\u0995\u09BF\u09AA \u0986\u0997\u09C7 \u09A6\u09C7\u0996\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09BF\u09B2!",
      banListTitle: "\u09AC\u09CD\u09B2\u0995 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE",
      screenshot: "\u09B8\u09CD\u0995\u09CD\u09B0\u09BF\u09A8\u09B6\u099F",
      actions: "\u0995\u09BE\u09B0\u09CD\u09AF\u0995\u09B2\u09BE\u09AA",
      bannedListEmpty: "\u09AC\u09CD\u09B2\u0995 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE \u0996\u09BE\u09B2\u09BF",
      videoModeSuggestion: "ChillTools \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 \u09AD\u09BF\u09A1\u09BF\u0993 \u09AE\u09CB\u09A1\u09C7 \u09B8\u09CD\u09AF\u09C1\u0987\u099A \u0995\u09B0\u09C1\u09A8",
      textModeNotSupported: "\u099F\u09C7\u0995\u09CD\u09B8\u099F \u09AE\u09CB\u09A1 \u09B8\u09AE\u09B0\u09CD\u09A5\u09BF\u09A4 \u09A8\u09AF\u09BC!",
      betaWelcome: "\u09B8\u09CD\u09AC\u09BE\u0997\u09A4\u09AE, \u09AC\u09C7\u099F\u09BE \u09AA\u09B0\u09C0\u0995\u09CD\u09B7\u0995!",
      outdatedExtension: "\u098F\u0995\u09CD\u09B8\u099F\u09C7\u09A8\u09B6\u09A8\u099F\u09BF \u09AA\u09C1\u09B0\u09CB\u09A8\u09CB \u09B9\u09AF\u09BC\u09C7 \u0997\u09C7\u099B\u09C7!",
      userStyles: "\u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u0995\u09BE\u09B0\u09C0 \u09B6\u09C8\u09B2\u09C0",
      userStylesDesc: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE CSS \u09A6\u09BF\u09AF\u09BC\u09C7 \u09B8\u09BE\u0987\u099F \u098F\u09AC\u0982 \u098F\u0995\u09CD\u09B8\u099F\u09C7\u09A8\u09B6\u09A8\u09C7\u09B0 \u099A\u09C7\u09B9\u09BE\u09B0\u09BE \u0995\u09BE\u09B8\u09CD\u099F\u09AE\u09BE\u0987\u099C \u0995\u09B0\u09C1\u09A8",
      customCSS: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE CSS",
      reset: "\u09B0\u09BF\u09B8\u09C7\u099F \u0995\u09B0\u09C1\u09A8",
      save: "\u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8",
      gallery: "\u0997\u09CD\u09AF\u09BE\u09B2\u09BE\u09B0\u09BF",
      userStyleActive: "UserStyle \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u0964 \u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09B0\u0999 \u09A8\u09BF\u09B7\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC\u0964",
      disableUserStyle: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09B0\u0999 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0 \u0995\u09B0\u09A4\u09C7 UserStyle \u09A8\u09BF\u09B7\u09CD\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0995\u09B0\u09C1\u09A8\u0964",
      galleryDesc: "\u09AA\u09C2\u09B0\u09CD\u09AC-\u09A8\u09BF\u09B0\u09CD\u09AE\u09BF\u09A4 \u09B6\u09C8\u09B2\u09C0 \u09A5\u09C7\u0995\u09C7 \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09A8",
      applyStyle: "\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u0997 \u0995\u09B0\u09C1\u09A8",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09B6\u09C8\u09B2\u09C0 \u09B0\u09BF\u09B8\u09C7\u099F \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7",
      stylesSaved: "\u0995\u09BE\u09B8\u09CD\u099F\u09AE \u09B6\u09C8\u09B2\u09C0 \u09B8\u09AB\u09B2\u09AD\u09BE\u09AC\u09C7 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4 \u09B9\u09AF\u09BC\u09C7\u099B\u09C7!",
      styleApplied: "\u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u0997 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7!",
      omegle: "Omegle Style",
      countryFilter: "\u09A6\u09C7\u09B6 \u09AB\u09BF\u09B2\u09CD\u099F\u09BE\u09B0",
      countryFilterDesc: "\u09B8\u0982\u09AF\u09CB\u0997 \u0995\u09B0\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09A6\u09C7\u09B6 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
      selectCountries: "\u09A6\u09C7\u09B6 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09C1\u09A8",
      noCountriesSelected: "\u0995\u09CB\u09A8\u09CB \u09A6\u09C7\u09B6 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09A8\u09BF - \u09B8\u09AC \u09A6\u09C7\u09B6 \u0985\u09A8\u09C1\u09AE\u09CB\u09A6\u09BF\u09A4",
      countriesSelected: "\u09A6\u09C7\u09B6 \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09BF\u09A4",
      saveButtonChoice: "\u09AC\u09CB\u09A4\u09BE\u09AE \u09AA\u099B\u09A8\u09CD\u09A6 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8",
      persistent: "\u09B8\u09CD\u09A5\u09BE\u09AF\u09BC\u09C0",
      persistentTooltip: "\u09AC\u09BE\u099F\u09A8\u09C7 \u0995\u09B0\u09BE \u09B6\u09C7\u09B7 \u09AA\u099B\u09A8\u09CD\u09A6\u099F\u09BF \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09A3 \u0995\u09B0\u09C1\u09A8",
      showIp: "\u0986\u0987\u09AA\u09BF \u09A6\u09C7\u0996\u09BE\u09A8",
      showIpTooltip: "\u0986\u0987\u09AA\u09BF \u09AC\u0995\u09CD\u09B8 \u09A6\u09C7\u0996\u09BE\u09A8/\u09B2\u09C1\u0995\u09BE\u09A8",
      enterIpToBlock: "\u09AC\u09CD\u09B2\u0995 \u0995\u09B0\u09A4\u09C7 \u0986\u0987\u09AA\u09BF \u09B2\u09BF\u0996\u09C1\u09A8",
      blockIp: "\u0986\u0987\u09AA\u09BF \u09AC\u09CD\u09B2\u0995 \u0995\u09B0\u09C1\u09A8",
      reviewTitle: "ChillTool's \u0995\u09BF \u09AD\u09BE\u09B2\u09CB \u09B2\u09BE\u0997\u099B\u09C7?",
      reviewBody: "\u09AD\u09BE\u09B2\u09CB \u09B2\u09BE\u0997\u09B2\u09C7 \u0985\u09A8\u09C1\u0997\u09CD\u09B0\u09B9 \u0995\u09B0\u09C7 \u09EB\u2011\u09A4\u09BE\u09B0\u0995\u09BE\u09B0 \u09B0\u09BF\u09AD\u09BF\u0989 \u09A6\u09BF\u09A8\u0964 \u098F\u099F\u09BF \u0986\u09AE\u09BE\u09A6\u09C7\u09B0 \u0996\u09C1\u09AC \u09B8\u09BE\u09B9\u09BE\u09AF\u09CD\u09AF \u0995\u09B0\u09C7!",
      reviewLater: "\u09AA\u09B0\u09C7 \u09B9\u09AF\u09BC\u09A4\u09CB",
      reviewOk: "\u09A0\u09BF\u0995 \u0986\u099B\u09C7",
      countryLeaderboardBtn: "\u09A6\u09C7\u09B6\u09C7\u09B0 \u09B0\u200C\u09CD\u09AF\u09BE\u0999\u09CD\u0995\u09BF\u0982",
      countryLeaderboardTitle: "\u09A6\u09C7\u09B6\u09C7\u09B0 \u09B0\u200C\u09CD\u09AF\u09BE\u0999\u09CD\u0995\u09BF\u0982",
      countryLeaderboardTotalCountries: "\u09AE\u09CB\u099F \u09A6\u09C7\u0996\u09BE \u09A6\u09C7\u09B6:",
      countryLeaderboardNoData: "\u0995\u09CB\u09A8\u09CB \u09A4\u09A5\u09CD\u09AF \u09A8\u09C7\u0987",
      countryLeaderboardClear: "\u09B0\u200C\u09CD\u09AF\u09BE\u0999\u09CD\u0995\u09BF\u0982 \u09AE\u09C1\u099B\u09C1\u09A8",
      noteMaxChars: "\u09B8\u09B0\u09CD\u09AC\u09CB\u099A\u09CD\u099A \u09EB\u09E6 \u0985\u0995\u09CD\u09B7\u09B0",
      countryLeaderboardClearConfirm: "\u09AA\u09C1\u09B0\u09CB \u09A6\u09C7\u09B6\u09C7\u09B0 \u09B0\u200C\u09CD\u09AF\u09BE\u0999\u09CD\u0995\u09BF\u0982 \u09AE\u09C1\u099B\u09C7 \u09AB\u09C7\u09B2\u09AC\u09C7\u09A8?"
    },
    ru: {
      settings: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
      apply: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
      color: "\u0426\u0432\u0435\u0442",
      videoBorder: "\u041A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0439 \u0446\u0432\u0435\u0442",
      whiteColorNotAllowed: "\u0411\u0435\u043B\u044B\u0439 \u0446\u0432\u0435\u0442 \u043D\u0435 \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D. \u041F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0439 \u0446\u0432\u0435\u0442.",
      settingsDesc: "\u0417\u0434\u0435\u0441\u044C \u0432\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F",
      language: "\u042F\u0437\u044B\u043A:",
      close: "\u0417\u0430\u043A\u0440\u044B\u0442\u044C",
      showIpDisplay: "\u041E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0442\u044C IP",
      history: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F",
      ban: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
      bannedUsers: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435",
      restarting: "\u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A \u0441\u043E\u0435\u0434\u0438\u043D\u0435\u043D\u0438\u044F...",
      historyLimit: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F \u0442\u043E\u043B\u044C\u043A\u043E \u0441\u043A\u0440\u0438\u043D\u0448\u043E\u0442\u044B \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0445 30 \u0447\u0435\u043B\u043E\u0432\u0435\u043A",
      emptyHistory: "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043F\u0443\u0441\u0442\u0430",
      connectToStart: "\u041F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u043A \u043F\u0430\u0440\u0442\u043D\u0435\u0440\u0430\u043C, \u0447\u0442\u043E\u0431\u044B \u043D\u0430\u0447\u0430\u0442\u044C \u0437\u0430\u043F\u0438\u0441\u044C",
      zero: "0 \u0432\u0441\u0442\u0440\u0435\u0447",
      entry: "\u0432\u0445\u043E\u0434",
      entries: "\u0432\u0445\u043E\u0434\u044B",
      ip: "IP",
      loading: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430...",
      city: "\u0413\u043E\u0440\u043E\u0434",
      region: "\u0420\u0435\u0433\u0438\u043E\u043D",
      country: "\u0421\u0442\u0440\u0430\u043D\u0430",
      coordinates: "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B",
      time: "\u0412\u0440\u0435\u043C\u044F",
      photoNotAvailable: "\u0424\u043E\u0442\u043E\u0433\u0440\u0430\u0444\u0438\u044F \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430",
      skip25Msg: "\u042D\u0422\u041E\u0422 \u0427\u0415\u041B\u041E\u0412\u0415\u041A \u0411\u042B\u041B \u0412\u0421\u0422\u0420\u0415\u0427\u0415\u041D \u0411\u041E\u041B\u0415\u0415 30 SKIPS \u041D\u0410\u0417\u0410\u0414!",
      banListTitle: "\u0421\u043F\u0438\u0441\u043E\u043A \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438",
      screenshot: "\u0421\u043A\u0440\u0438\u043D\u0448\u043E\u0442",
      actions: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
      bannedListEmpty: "\u0421\u043F\u0438\u0441\u043E\u043A \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438 \u043F\u0443\u0441\u0442",
      videoModeSuggestion: "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u0435\u0441\u044C \u0432 \u0432\u0438\u0434\u0435\u043E\u0440\u0435\u0436\u0438\u043C, \u0447\u0442\u043E\u0431\u044B \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u044C ChillTools",
      textModeNotSupported: "\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0440\u0435\u0436\u0438\u043C \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F!",
      betaWelcome: "\u0414\u043E\u0431\u0440\u043E \u043F\u043E\u0436\u0430\u043B\u043E\u0432\u0430\u0442\u044C, \u0431\u0435\u0442\u0430-\u0442\u0435\u0441\u0442\u0435\u0440!",
      outdatedExtension: "\u0420\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u0435 \u0443\u0441\u0442\u0430\u0440\u0435\u043B\u043E!",
      userStyles: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0441\u0442\u0438\u043B\u0438",
      userStylesDesc: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u0442\u0435 \u0432\u043D\u0435\u0448\u043D\u0438\u0439 \u0432\u0438\u0434 \u0441\u0430\u0439\u0442\u0430 \u0438 \u0440\u0430\u0441\u0448\u0438\u0440\u0435\u043D\u0438\u044F \u0441 \u043F\u043E\u043C\u043E\u0449\u044C\u044E \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E CSS",
      customCSS: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 CSS",
      reset: "\u0421\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
      save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
      gallery: "\u0413\u0430\u043B\u0435\u0440\u0435\u044F",
      userStyleActive: "UserStyle \u0430\u043A\u0442\u0438\u0432\u0435\u043D. \u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0446\u0432\u0435\u0442\u0430 \u043E\u0442\u043A\u043B\u044E\u0447\u0435\u043D\u044B.",
      disableUserStyle: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u0435 UserStyle \u0434\u043B\u044F \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F \u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0445 \u0446\u0432\u0435\u0442\u043E\u0432.",
      galleryDesc: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u0433\u043E\u0442\u043E\u0432\u044B\u0445 \u0441\u0442\u0438\u043B\u0435\u0439",
      applyStyle: "\u041F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0441\u0442\u0438\u043B\u0438 \u0441\u0431\u0440\u043E\u0448\u0435\u043D\u044B",
      stylesSaved: "\u041F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0435 \u0441\u0442\u0438\u043B\u0438 \u0443\u0441\u043F\u0435\u0448\u043D\u043E \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B!",
      styleApplied: "\u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u043E!",
      omegle: "Omegle Style",
      countryFilter: "\u0424\u0438\u043B\u044C\u0442\u0440 \u0441\u0442\u0440\u0430\u043D",
      countryFilterDesc: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0441\u0442\u0440\u0430\u043D\u044B \u0434\u043B\u044F \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u044F",
      selectCountries: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u0442\u0440\u0430\u043D\u044B",
      noCountriesSelected: "\u0421\u0442\u0440\u0430\u043D\u044B \u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u044B - \u0432\u0441\u0435 \u0441\u0442\u0440\u0430\u043D\u044B \u0440\u0430\u0437\u0440\u0435\u0448\u0435\u043D\u044B",
      countriesSelected: "\u0441\u0442\u0440\u0430\u043D \u0432\u044B\u0431\u0440\u0430\u043D\u043E",
      peopleEncountered: "\u0412\u0441\u0442\u0440\u0435\u0447\u0435\u043D\u043D\u044B\u0435 \u043B\u044E\u0434\u0438",
      saveButtonChoice: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u043A\u043D\u043E\u043F\u043E\u043A",
      persistent: "\u0421\u041E\u0425\u0420\u0410\u041D\u042F\u0422\u042C",
      persistentTooltip: "\u0421\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0441\u0434\u0435\u043B\u0430\u043D\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440 \u043A\u043D\u043E\u043F\u043E\u043A",
      showIp: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C IP",
      showIpTooltip: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C/\u0441\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u043B\u0435 IP",
      statisticsTitle: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u043E\u0432\u0430\u043D\u0438\u044F",
      statistics: "\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043A\u0430",
      donate: "\u041F\u043E\u0436\u0435\u0440\u0442\u0432\u043E\u0432\u0430\u0442\u044C",
      totalTimeSpent: "\u041E\u0431\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F",
      skips: "\u041F\u0440\u043E\u043F\u0443\u0441\u043A\u0438",
      enterIpToBlock: "\u0412\u0432\u0435\u0434\u0438\u0442\u0435 IP \u0434\u043B\u044F \u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u043A\u0438",
      blockIp: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C IP",
      reviewTitle: "\u041D\u0440\u0430\u0432\u0438\u0442\u0441\u044F ChillTool's?",
      reviewBody: "\u0415\u0441\u043B\u0438 \u0432\u0430\u043C \u043D\u0440\u0430\u0432\u0438\u0442\u0441\u044F, \u043F\u043E\u0436\u0430\u043B\u0443\u0439\u0441\u0442\u0430, \u043E\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u043E\u0442\u0437\u044B\u0432 \u043D\u0430 5 \u0437\u0432\u0451\u0437\u0434. \u042D\u0442\u043E \u043D\u0430\u043C \u043E\u0447\u0435\u043D\u044C \u043F\u043E\u043C\u043E\u0433\u0430\u0435\u0442!",
      reviewLater: "\u041F\u043E\u0437\u0436\u0435",
      reviewOk: "\u041E\u041A",
      countryLeaderboardBtn: "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0441\u0442\u0440\u0430\u043D",
      countryLeaderboardTitle: "\u0420\u0435\u0439\u0442\u0438\u043D\u0433 \u0441\u0442\u0440\u0430\u043D",
      countryLeaderboardTotalCountries: "\u0412\u0441\u0435\u0433\u043E \u0432\u0441\u0442\u0440\u0435\u0447\u0435\u043D\u043D\u044B\u0445 \u0441\u0442\u0440\u0430\u043D:",
      countryLeaderboardNoData: "\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445",
      countryLeaderboardClear: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433",
      noteMaxChars: "\u041C\u0430\u043A\u0441\u0438\u043C\u0443\u043C 50 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432",
      countryLeaderboardClearConfirm: "\u041E\u0447\u0438\u0441\u0442\u0438\u0442\u044C \u0432\u0435\u0441\u044C \u0440\u0435\u0439\u0442\u0438\u043D\u0433 \u0441\u0442\u0440\u0430\u043D?"
    },
    pt: {
      settings: "Configura\xE7\xF5es",
      apply: "Aplicar",
      color: "Cor",
      videoBorder: "Cor personalizada",
      whiteColorNotAllowed: "A cor branca n\xE3o \xE9 permitida. Por favor, escolha uma cor diferente.",
      settingsDesc: "Aqui voc\xEA pode configurar as configura\xE7\xF5es da extens\xE3o",
      language: "Idioma:",
      showIpDisplay: "Mostrar IP",
      close: "Fechar",
      history: "Hist\xF3rico",
      ban: "Bloquear usu\xE1rio",
      bannedUsers: "Usu\xE1rios bloqueados",
      restarting: "Reiniciando conex\xE3o...",
      historyLimit: "Apenas os screenshots das \xFAltimas 30 pessoas s\xE3o salvos",
      emptyHistory: "O hist\xF3rico est\xE1 vazio",
      connectToStart: "Conecte-se com parceiros para come\xE7ar a gravar",
      zero: "0 encontros",
      entry: "entrada",
      entries: "entradas",
      ip: "IP",
      loading: "Carregando...",
      city: "Cidade",
      region: "Regi\xE3o",
      country: "Pa\xEDs",
      coordinates: "Coordenadas",
      time: "Tempo",
      photoNotAvailable: "A foto n\xE3o est\xE1 mais dispon\xEDvel",
      skip25Msg: "ESTA PESSOA FOI ENCONTRADA H\xC1 MAIS DE 30 SKIPS!",
      banListTitle: "Lista de Bloqueados",
      screenshot: "Captura",
      actions: "A\xE7\xF5es",
      bannedListEmpty: "A lista de bloqueados est\xE1 vazia",
      videoModeSuggestion: "Mude para o modo v\xEDdeo para usar o ChillTools",
      textModeNotSupported: "O modo texto n\xE3o \xE9 suportado!",
      betaWelcome: "Bem-vindo a bordo, testador beta!",
      outdatedExtension: "A extens\xE3o est\xE1 desatualizada!",
      userStyles: "UserStyles",
      userStylesDesc: "Personalize a apar\xEAncia do site e da extens\xE3o com CSS personalizado",
      customCSS: "CSS Personalizado",
      reset: "Redefinir",
      save: "Salvar",
      gallery: "Galeria",
      userStyleActive: "UserStyle est\xE1 ativo. Cores personalizadas est\xE3o desativadas.",
      disableUserStyle: "Desative UserStyle para usar cores personalizadas.",
      galleryDesc: "Escolha entre estilos pr\xE9-definidos",
      applyStyle: "Aplicar",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "Estilos personalizados foram redefinidos",
      stylesSaved: "Estilos personalizados salvos com sucesso!",
      styleApplied: "aplicado!",
      omegle: "Omegle Style",
      countryFilter: "Filtro de Pa\xEDs",
      countryFilterDesc: "Selecione pa\xEDses para conectar",
      selectCountries: "Selecionar Pa\xEDses",
      noCountriesSelected: "Nenhum pa\xEDs selecionado - todos os pa\xEDses permitidos",
      statisticsTitle: "Estat\xEDsticas de Uso",
      statistics: "Estat\xEDsticas",
      donate: "Doar",
      totalTimeSpent: "Tempo Total Gasto",
      peopleEncountered: "Pessoas Encontradas",
      skips: "Pulos",
      countriesSelected: "pa\xEDses selecionados",
      saveButtonChoice: "Salvar escolha de bot\xF5es",
      persistent: "PERSISTENTE",
      persistentTooltip: "Salva a \xFAltima escolha feita nos bot\xF5es",
      showIp: "Mostrar IP",
      showIpTooltip: "Mostrar/ocultar caixa de IP",
      enterIpToBlock: "Digite o IP para bloquear",
      blockIp: "Bloquear IP",
      reviewTitle: "Gostando do ChillTool's?",
      reviewBody: "Se voc\xEA gosta, por favor deixe uma avalia\xE7\xE3o de 5 estrelas. Isso ajuda muito!",
      reviewLater: "Talvez depois",
      reviewOk: "OK",
      countryLeaderboardBtn: "Ranking de pa\xEDses",
      countryLeaderboardTitle: "Ranking de pa\xEDses",
      countryLeaderboardTotalCountries: "Total de pa\xEDses encontrados:",
      countryLeaderboardNoData: "Sem dados",
      countryLeaderboardClear: "Limpar ranking",
      noteMaxChars: "M\xE1ximo 50 caracteres",
      countryLeaderboardClearConfirm: "Limpar todo o ranking de pa\xEDses?"
    },
    id: {
      settings: "Pengaturan",
      apply: "Terapkan",
      color: "Warna",
      peopleEncountered: "Orang yang Ditemui",
      videoBorder: "Warna kustom",
      whiteColorNotAllowed: "Warna putih tidak diizinkan. Silakan pilih warna yang berbeda.",
      settingsDesc: "Di sini Anda dapat mengonfigurasi pengaturan ekstensi",
      language: "Bahasa:",
      showIpDisplay: "Tampilkan IP",
      close: "Tutup",
      history: "Riwayat",
      ban: "Blokir pengguna",
      bannedUsers: "Pengguna yang diblokir",
      restarting: "Memulai ulang koneksi...",
      historyLimit: "Hanya screenshot dari 30 orang terakhir yang disimpan",
      emptyHistory: "Riwayat kosong",
      connectToStart: "Hubungi mitra untuk mulai merekam",
      zero: "0 entri",
      entry: "entri",
      entries: "entri",
      ip: "IP",
      loading: "Memuat...",
      city: "Kota",
      region: "Wilayah",
      country: "Negara",
      coordinates: "Koordinat",
      time: "Waktu",
      photoNotAvailable: "Foto tidak tersedia lagi",
      skip25Msg: "ORANG INI DITEMUI LEBIH DARI 30 SKIP YANG LALU!",
      banListTitle: "Daftar Blokir",
      screenshot: "Screenshot",
      actions: "Aksi",
      bannedListEmpty: "Daftar blokir kosong",
      videoModeSuggestion: "Beralih ke mode video untuk menggunakan ChillTools",
      textModeNotSupported: "Mode teks tidak didukung!",
      betaWelcome: "Selamat datang, penguji beta!",
      outdatedExtension: "Ekstensi sudah usang!",
      userStyles: "UserStyles",
      userStylesDesc: "Sesuaikan tampilan situs dan ekstensi dengan CSS kustom",
      customCSS: "CSS Kustom",
      reset: "Atur Ulang",
      save: "Simpan",
      gallery: "Galeri",
      userStyleActive: "UserStyle aktif. Warna kustom dinonaktifkan.",
      disableUserStyle: "Nonaktifkan UserStyle untuk menggunakan warna kustom.",
      galleryDesc: "Pilih dari gaya yang sudah jadi",
      applyStyle: "Terapkan",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "Gaya kustom telah direset",
      stylesSaved: "Gaya kustom berhasil disimpan!",
      styleApplied: "diterapkan!",
      omegle: "Omegle Style",
      countryFilter: "Filter Negara",
      countryFilterDesc: "Pilih negara untuk terhubung",
      selectCountries: "Pilih Negara",
      noCountriesSelected: "Tidak ada negara yang dipilih - semua negara diizinkan",
      countriesSelected: "negara dipilih",
      saveButtonChoice: "Simpan pilihan tombol",
      persistent: "PERSISTENT",
      persistentTooltip: "Simpan pilihan terakhir yang dibuat pada tombol",
      showIp: "Tampilkan IP",
      showIpTooltip: "Tampilkan/sembunyikan bidang IP",
      statistics: "Statistik",
      donate: "Donasi",
      statisticsTitle: "Statistik Penggunaan",
      totalTimeSpent: "Total Waktu Digunakan",
      skips: "Lewati",
      buttonOn: "ON",
      buttonOff: "OFF",
      enterIpToBlock: "Masukkan IP yang akan diblokir",
      blockIp: "Blokir IP",
      reviewTitle: "Suka dengan ChillTool's?",
      reviewBody: "Jika Anda suka, mohon beri ulasan 5 bintang. Itu sangat membantu!",
      reviewLater: "Mungkin nanti",
      reviewOk: "OK",
      countryLeaderboardBtn: "Papan peringkat negara",
      countryLeaderboardTitle: "Papan peringkat negara",
      countryLeaderboardTotalCountries: "Total negara yang ditemui:",
      countryLeaderboardNoData: "Tidak ada data",
      countryLeaderboardClear: "Hapus papan peringkat",
      noteMaxChars: "Maksimal 50 karakter",
      countryLeaderboardClearConfirm: "Hapus seluruh papan peringkat negara?"
    },
    it: {
      settings: "Impostazioni",
      apply: "Applica",
      saveButtonChoice: "Salva scelta pulsanti",
      color: "Colore",
      videoBorder: "Colori personalizzati",
      whiteColorNotAllowed: "Il colore bianco non \xE8 consentito. Si prega di scegliere un colore diverso.",
      settingsDesc: "Qui puoi configurare le impostazioni dell'estensione",
      language: "Lingua:",
      close: "Chiudi",
      showIpDisplay: "Mostra IP",
      history: "Cronologia",
      ban: "Blocca utente",
      bannedUsers: "Utenti bloccati",
      restarting: "Riconnessione in corso...",
      historyLimit: "Vengono salvati solo gli screenshot delle ultime 30 persone",
      emptyHistory: "La cronologia \xE8 vuota",
      connectToStart: "Connettiti con i partner per iniziare la registrazione",
      zero: "0 incontri",
      entry: "incontro",
      entries: "incontri",
      ip: "IP",
      loading: "Caricamento...",
      city: "Citt\xE0",
      region: "Regione",
      country: "Paese",
      coordinates: "Coordinate",
      time: "Ora",
      photoNotAvailable: "La foto non \xE8 pi\xF9 disponibile",
      skip25Msg: "QUESTA PERSONE \xC8 STATA INCONTRATA PIU' DI 30 SKIPS FA!",
      banListTitle: "Lista Bloccati",
      screenshot: "Screenshot",
      actions: "Azioni",
      bannedListEmpty: "La lista dei bloccati \xE8 vuota",
      videoModeSuggestion: "Passa alla modalit\xE0 video per usare ChillTools",
      textModeNotSupported: "La modalit\xE0 testo non \xE8 supportata!",
      betaWelcome: "Benvenuto a bordo, beta tester!",
      outdatedExtension: "L'estensione non \xE8 aggiornata!",
      userStyles: "UserStyles",
      userStylesDesc: "Personalizza l'aspetto del sito e dell'estensione con CSS personalizzato",
      enterIpToBlock: "Inserisci IP da bloccare",
      blockIp: "Blocca IP",
      customCSS: "CSS Personalizzato",
      reset: "Ripristina",
      save: "Salva",
      gallery: "Galleria",
      userStyleActive: "UserStyle \xE8 attivo. I colori personalizzati sono disabilitati.",
      disableUserStyle: "Disabilita UserStyle per usare i colori personalizzati.",
      galleryDesc: "Scegli tra gli stili predefiniti",
      applyStyle: "Applica",
      darkMode: "Better DarkMode",
      fstool: "FsTool",
      stylesReset: "Gli stili personalizzati sono stati ripristinati",
      stylesSaved: "Stili personalizzati salvati con successo!",
      styleApplied: "applicato!",
      omegle: "Omegle Style",
      countryFilter: "Filtro Paese",
      countryFilterDesc: "Seleziona i paesi con cui connetterti",
      selectCountries: "Seleziona Paesi",
      noCountriesSelected: "Nessun paese selezionato - tutti i paesi consentiti",
      countriesSelected: "paesi selezionati",
      persistent: "PERSISTENTE",
      persistentTooltip: "Salva l'ultima scelta fatta sui pulsanti",
      showIp: "Mostra IP",
      showIpTooltip: "Mostra/nascondi riquadro IP",
      statistics: "Statistiche",
      donate: "Dona",
      statisticsTitle: "Statistiche di utilizzo",
      totalTimeSpent: "Tempo totale trascorso",
      peopleEncountered: "Persone incontrate",
      skips: "Salti",
      reviewTitle: "Ti piace ChillTool's?",
      reviewBody: "Se ti piace, lascia una recensione da 5 stelle. Aiuta tantissimo!",
      reviewLater: "Forse dopo",
      reviewOk: "OK",
      buttonOn: "ON",
      buttonOff: "OFF",
      countryLeaderboardBtn: "Classifica paesi",
      countryLeaderboardTitle: "Classifica paesi",
      countryLeaderboardTotalCountries: "Totale paesi incontrati:",
      countryLeaderboardNoData: "Nessun dato",
      countryLeaderboardClear: "Cancella classifica",
      noteMaxChars: "Massimo 50 caratteri",
      countryLeaderboardClearConfirm: "Cancellare l'intera classifica dei paesi?"
    }
  };
  var translations_default = translations;

  // src/ui/styles.js
  function injectCoreStyles() {
    const style = document.createElement("style");
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

  // src/ui/toast.js
  var _getLang = () => "en";
  function showNotification(title, message, options = {}) {
    const { type = "info", duration = 4e3, showClose = true } = options;
    const lang = _getLang();
    const t = translations_default[lang] || translations_default["en"];
    const toast = document.createElement("div");
    toast.className = "chill-toast";
    toast.style.zIndex = "99999";
    let icon = "info-circle";
    if (type === "success")
      icon = "check-circle";
    else if (type === "error")
      icon = "exclamation-circle";
    else if (type === "warning")
      icon = "exclamation-triangle";
    if (options.pulse) {
      toast.classList.add("pulse");
    }
    toast.innerHTML = `
        <i class="fas fa-${icon}"></i>
        <div class="chill-toast-content">
            <div class="chill-toast-title">${title}</div>
            <div class="chill-toast-message">${message}</div>
        </div>
        ${showClose ? '<button class="chill-toast-close">&times;</button>' : ""}
    `;
    if (options.iconColor) {
      try {
        const ic = toast.querySelector("i");
        if (ic)
          ic.style.color = options.iconColor;
      } catch (_) {
      }
    }
    let container = document.getElementById("chill-toast-container");
    if (!container) {
      container = document.createElement("div");
      container.id = "chill-toast-container";
      container.className = "chill-toast-container";
      container.style.zIndex = "99999";
      injectToBody(container);
    }
    container.appendChild(toast);
    void toast.offsetWidth;
    setTimeout(() => {
      toast.classList.add("show");
    }, 10);
    let timeout;
    if (duration > 0) {
      timeout = setTimeout(() => {
        hideToast(toast);
      }, duration);
    }
    if (typeof options.onClick === "function") {
      toast.addEventListener("click", (e) => {
        if (!(e.target && e.target.classList && e.target.classList.contains("chill-toast-close"))) {
          options.onClick();
        }
      });
    }
    const closeBtn = toast.querySelector(".chill-toast-close");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        clearTimeout(timeout);
        hideToast(toast);
      });
    }
    toast.addEventListener("mouseenter", () => {
      if (timeout)
        clearTimeout(timeout);
    });
    toast.addEventListener("mouseleave", () => {
      if (duration > 0) {
        timeout = setTimeout(() => {
          hideToast(toast);
        }, 500);
      }
    });
    function hideToast(element) {
      const container2 = document.getElementById("chill-toast-container");
      const siblings = container2 ? Array.from(container2.children).filter((el) => el !== element) : [];
      const positionsBefore = /* @__PURE__ */ new Map();
      siblings.forEach((el) => positionsBefore.set(el, el.getBoundingClientRect().top));
      element.classList.remove("show");
      setTimeout(() => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
        if (container2) {
          const remaining = Array.from(container2.children);
          remaining.forEach((el) => {
            const beforeTop = positionsBefore.get(el);
            if (beforeTop == null)
              return;
            const afterTop = el.getBoundingClientRect().top;
            const deltaY = beforeTop - afterTop;
            if (Math.abs(deltaY) > 0.5) {
              el.style.transition = "none";
              el.style.transform = `translateY(${deltaY}px)`;
              void el.offsetHeight;
              el.style.transition = "transform 200ms ease";
              el.style.transform = "";
              const onEnd = () => {
                el.style.transition = "";
                el.removeEventListener("transitionend", onEnd);
              };
              el.addEventListener("transitionend", onEnd);
            }
          });
        }
        if (typeof options.onClose === "function") {
          try {
            options.onClose();
          } catch (_) {
          }
        }
        const c = document.getElementById("chill-toast-container");
        if (c && c.children.length === 0) {
          c.remove();
        }
      }, 500);
    }
  }
  function showWelcomeNotification() {
    const host = window.location && window.location.hostname ? window.location.hostname : "";
    const path = window.location && window.location.pathname ? window.location.pathname : "";
    if (host !== "uhmegle.com" && host !== "umingle.com" || !path.startsWith("/video")) {
      return;
    }
    const lang = _getLang();
    const t = translations_default[lang] || translations_default["en"];
    const welcomeMessages = {
      "en": "ChillTools is now active and ready to use!",
      "es": "\xA1ChillTools est\xE1 activo y listo para usar!",
      "fr": "ChillTools est maintenant actif et pr\xEAt \xE0 l'emploi !",
      "de": "ChillTools ist jetzt aktiv und einsatzbereit!",
      "ar": "ChillTools \u0627\u0644\u0622\u0646 \u0646\u0634\u0637 \u0648 \u062C\u0627\u0647\u0632 \u0644\u0644\u0639\u0645\u0644!",
      "hi": "ChillTools \u0905\u092C \u0905\u091A\u094D\u091B\u093E \u0914\u0930 \u0909\u092A\u092F\u094B\u0917 \u0915\u0947 \u0932\u093F\u090F \u0905\u091A\u094D\u091B\u093E!",
      "bn": "ChillTools \u09B9\u099A\u09CD\u099B\u09C7 \u098F\u0996\u09A8 \u0985\u099A\u09CD\u099B\u09BE \u098F\u09AC\u0982 \u09AC\u09CD\u09AF\u09AC\u09B9\u09BE\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF \u0985\u099A\u09CD\u099B\u09BE!",
      "ru": "ChillTools \u0442\u0435\u043F\u0435\u0440\u044C \u0430\u043A\u0442\u0438\u0432\u0435\u043D \u0438 \u0433\u043E\u0442\u043E\u0432 \u043A \u0440\u0430\u0431\u043E\u0442\u0435!",
      "pt": "ChillTools agora est\xE1 ativo e pronto para usar!",
      "id": "ChillTools sekarang aktif dan siap untuk digunakan!",
      "it": "ChillTools \xE8 ora attivo e pronto per essere utilizzato!",
      "zh": "ChillTools \u73B0\u5728\u5DF2\u6FC0\u6D3B\u5E76\u51C6\u5907\u5C31\u7EEA!"
    };
    const message = welcomeMessages[lang] || welcomeMessages["en"];
    showNotification("ChillTools", message, {
      type: "success",
      duration: 5e3,
      pulse: true
    });
  }

  // src/ui/toolbar.js
  var _showSettings = () => {
  };
  var _displayHistory = () => {
  };
  var _displayBannedUsers = () => {
  };
  var _showCountryFilterModal = () => {
  };
  var _getBannedUsers = () => [];
  var _saveBannedUsers = () => {
  };
  var _currentSession = {};
  var _showNotification = () => {
  };
  var _getLang2 = () => "en";
  var _translations = {};
  var _updateModalBlockedChrome = () => {
  };
  function setDeps(deps) {
    if (deps.showSettings !== void 0)
      _showSettings = deps.showSettings;
    if (deps.displayHistory !== void 0)
      _displayHistory = deps.displayHistory;
    if (deps.displayBannedUsers !== void 0)
      _displayBannedUsers = deps.displayBannedUsers;
    if (deps.showCountryFilterModal !== void 0)
      _showCountryFilterModal = deps.showCountryFilterModal;
    if (deps.getBannedUsers !== void 0)
      _getBannedUsers = deps.getBannedUsers;
    if (deps.saveBannedUsers !== void 0)
      _saveBannedUsers = deps.saveBannedUsers;
    if (deps.currentSession !== void 0)
      _currentSession = deps.currentSession;
    if (deps.showNotification !== void 0)
      _showNotification = deps.showNotification;
    if (deps.getLang !== void 0)
      _getLang2 = deps.getLang;
    if (deps.translations !== void 0)
      _translations = deps.translations;
    if (deps.updateModalBlockedChrome !== void 0)
      _updateModalBlockedChrome = deps.updateModalBlockedChrome;
  }
  var isMobile2 = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };
  var isVideoPage = () => window.location.pathname.includes("/video/");
  var updateToolbarVisibility = () => {
    const toolbar = document.getElementById("chillToolbar");
    if (isVideoPage()) {
      if (!toolbar)
        createToolbar();
    } else if (toolbar) {
      toolbar.remove();
    }
  };
  var urlObserver = new MutationObserver(updateToolbarVisibility);
  urlObserver.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("popstate", updateToolbarVisibility);
  var createToolbar = () => {
    if (!isVideoPage())
      return null;
    const existingToolbar = document.getElementById("chillToolbar");
    if (existingToolbar)
      return existingToolbar;
    const toolbar = document.createElement("div");
    toolbar.id = "chillToolbar";
    toolbar.style.position = "fixed";
    toolbar.style.top = "20px";
    toolbar.style.right = "250px";
    toolbar.style.display = "flex";
    toolbar.style.gap = "10px";
    toolbar.style.zIndex = CHILL_TOOLBAR_DEFAULT_Z_INDEX;
    toolbar.style.width = "auto";
    toolbar.style.justifyContent = "flex-start";
    if (isMobile2()) {
      toolbar.style.position = "absolute";
      toolbar.style.top = "5px";
      toolbar.style.left = "5px";
      toolbar.style.right = "auto";
      toolbar.style.gap = "6px";
      toolbar.style.padding = "5px 8px";
      toolbar.style.borderRadius = "12px";
      toolbar.style.zIndex = "999";
      const buttons = toolbar.querySelectorAll("button");
      buttons.forEach((button) => {
        button.style.marginTop = "0";
        button.style.marginBottom = "0";
        button.style.padding = "8px 10px";
      });
    }
    toolbar.addEventListener("click", function(e) {
      if (hasOpenChillModal()) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }, true);
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
    historyBtn.style.background = isMobile2() ? "#007bff" : "#007bff";
    historyBtn.style.color = "white";
    historyBtn.style.border = "none";
    historyBtn.style.borderRadius = isMobile2() ? "8px" : "5px";
    historyBtn.style.padding = isMobile2() ? "10px 12px" : "8px 12px";
    historyBtn.style.cursor = "pointer";
    historyBtn.style.fontSize = isMobile2() ? "16px" : "inherit";
    historyBtn.title = _translations[_getLang2()]?.history ?? "";
    let isHistoryVisible = false;
    historyBtn.addEventListener("click", function() {
      const existingModal = document.getElementById("historyModal");
      if (existingModal)
        existingModal.remove();
      _displayHistory();
      isHistoryVisible = true;
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
    settingsBtn.style.borderRadius = isMobile2() ? "8px" : "5px";
    settingsBtn.style.padding = isMobile2() ? "10px 12px" : "8px 12px";
    settingsBtn.style.cursor = "pointer";
    settingsBtn.style.fontSize = isMobile2() ? "16px" : "inherit";
    settingsBtn.title = _translations[_getLang2()]?.settings ?? "";
    settingsBtn.addEventListener("click", function() {
      _showSettings();
    });
    rightButtons.appendChild(settingsBtn);
    toolbar.appendChild(leftButtons);
    toolbar.appendChild(rightButtons);
    banBtn.innerHTML = '<i class="fas fa-user-slash"></i>';
    banBtn.style.background = "#dc3545";
    banBtn.style.color = "white";
    banBtn.style.border = "none";
    banBtn.style.borderRadius = isMobile2() ? "8px" : "5px";
    banBtn.style.padding = isMobile2() ? "10px 12px" : "8px 12px";
    banBtn.style.cursor = "pointer";
    banBtn.style.fontSize = isMobile2() ? "16px" : "inherit";
    banBtn.title = _translations[_getLang2()]?.ban ?? "";
    banBtn.disabled = true;
    banBtn.addEventListener("click", function() {
      if (_currentSession.ip) {
        const bannedUsers = _getBannedUsers();
        const userToBan = {
          ip: _currentSession.ip,
          info: _currentSession.info,
          screenshot: _currentSession.screenshot,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleString(),
          note: ""
        };
        bannedUsers.push(userToBan);
        _saveBannedUsers(bannedUsers);
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
    bannedListBtn.style.borderRadius = isMobile2() ? "8px" : "5px";
    bannedListBtn.style.padding = isMobile2() ? "10px 12px" : "8px 12px";
    bannedListBtn.style.cursor = "pointer";
    bannedListBtn.style.fontSize = isMobile2() ? "16px" : "inherit";
    bannedListBtn.title = _translations[_getLang2()]?.bannedUsers ?? "";
    bannedListBtn.addEventListener("click", function() {
      _displayBannedUsers();
    });
    leftButtons.appendChild(bannedListBtn);
    const countryFilterBtn = document.createElement("button");
    countryFilterBtn.id = "chillCountryFilterBtn";
    countryFilterBtn.innerHTML = '<i class="fas fa-globe"></i>';
    countryFilterBtn.style.background = "#17a2b8";
    countryFilterBtn.style.color = "white";
    countryFilterBtn.style.border = "none";
    countryFilterBtn.style.borderRadius = isMobile2() ? "8px" : "5px";
    countryFilterBtn.style.padding = isMobile2() ? "10px 12px" : "8px 12px";
    countryFilterBtn.style.cursor = "pointer";
    countryFilterBtn.style.fontSize = isMobile2() ? "16px" : "inherit";
    countryFilterBtn.title = _translations[_getLang2()]?.countryFilter ?? "";
    countryFilterBtn.addEventListener("click", function() {
      _showCountryFilterModal();
    });
    leftButtons.appendChild(countryFilterBtn);
    if (isVideoPage()) {
      injectToBody(toolbar);
      return toolbar;
    }
    return null;
  };
  function restartConnection() {
    const chatWindow = document.querySelector(".chatWindow") || document.querySelector(".chat-container");
    if (chatWindow) {
      doubleSkipButton();
    }
  }
  function clickSkipButton() {
    const candidates = [
      ".bottomButton.skipButton",
      ".bottomButton.outlined.skipButton",
      ".bottomButton.new.skipButton",
      ".bottomButton.new.outlined.skipButton",
      ".bottomButton.new.outlined.skipButton.noSelect",
      ".skipButton"
    ];
    let el = null;
    for (const sel of candidates) {
      el = document.querySelector(sel);
      if (el)
        break;
    }
    if (!el) {
      const mainText = document.querySelector(".skipButton .mainText");
      if (mainText && typeof mainText.closest === "function") {
        el = mainText.closest("button") || mainText.closest(".bottomButton") || mainText.closest(".skipButton");
      }
    }
    if (!el)
      return false;
    try {
      if (typeof el.click === "function")
        el.click();
      const evOpts = { bubbles: true, cancelable: true, view: window };
      el.dispatchEvent(new MouseEvent("mousedown", evOpts));
      el.dispatchEvent(new MouseEvent("mouseup", evOpts));
      el.dispatchEvent(new MouseEvent("click", evOpts));
      return true;
    } catch (_) {
      return false;
    }
  }
  function doubleSkipButton() {
    clickSkipButton();
    setTimeout(() => {
      clickSkipButton();
    }, 300);
  }
  function unblurToolbar() {
    _updateModalBlockedChrome();
  }

  // src/ui/theme/color-picker.js
  var _getLang3 = () => "en";
  var _translations2 = {};
  var _showNotification2 = () => {
  };
  var _insertAdjacentHTMLToBody = () => {
  };
  var _injectToHead = () => {
  };
  var _restoreColorObserver = null;
  function setDeps2(deps) {
    if (deps.getLang)
      _getLang3 = deps.getLang;
    if (deps.translations)
      _translations2 = deps.translations;
    if (deps.showNotification)
      _showNotification2 = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead)
      _injectToHead = deps.injectToHead;
  }
  function setCookie(name, value, days = 365) {
    const date = /* @__PURE__ */ new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1e3);
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
  }
  function applyVideoBorderColor(color) {
    const styleElement = document.getElementById("rightBoxStyle") || document.createElement("style");
    styleElement.id = "rightBoxStyle";
    const updateStyles = () => {
      const isDarkMode = document.documentElement.classList.contains("dark-mode");
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
        if (!document.getElementById("rightBoxStyle")) {
          _injectToHead(styleElement);
        } else {
          document.head.replaceChild(styleElement, document.getElementById("rightBoxStyle"));
        }
      } else {
        styleElement.textContent = "";
      }
    };
    updateStyles();
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateStyles();
        }
      });
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    updateStyles();
    if (!document.getElementById("rightBoxStyle")) {
      _injectToHead(styleElement);
    } else {
      document.head.replaceChild(styleElement, document.getElementById("rightBoxStyle"));
    }
  }
  function restoreColorStyle() {
    if (_restoreColorObserver) {
      _restoreColorObserver.disconnect();
      _restoreColorObserver = null;
    }
    const savedColor = localStorage.getItem("videoBorderColor") || "#0a0a0b";
    const styleElement = document.getElementById("rightBoxStyle") || document.createElement("style");
    styleElement.id = "rightBoxStyle";
    const updateStyles = () => {
      const isDarkMode = document.documentElement.classList.contains("dark-mode");
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
        styleElement.textContent = "";
      }
    };
    updateStyles();
    _restoreColorObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          updateStyles();
        }
      });
    });
    _restoreColorObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"]
    });
    if (!document.getElementById("rightBoxStyle")) {
      _injectToHead(styleElement);
    }
  }
  function closeColorModal() {
    const modal = document.getElementById("colorModal");
    if (modal) {
      modal.remove();
      document.getElementById("settingsModal").style.display = "flex";
    }
  }
  function showColorModal(userStyleActive) {
    if (userStyleActive && userStyleActive.trim() !== "") {
      const lang2 = _getLang3();
      const t2 = _translations2[lang2] || _translations2.en || {};
      _showNotification2("Custom Color", t2.disableUserStyle, {
        type: "warning",
        duration: 4e3,
        pulse: true
      });
      return;
    }
    const lang = _getLang3();
    const t = _translations2[lang] || _translations2.en || {};
    const colorModalHTML = `
        <div id="colorModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); z-index: 10000; display: flex; justify-content: center; align-items: center;">
            <div style="background: #111; border-radius: 10px; width: 90%; max-width: 400px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; position: relative;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #333;">
                    <h3 style="margin: 0; color: #fff; font-size: 18px;">
                        <i class="fas fa-palette"></i> ${t.color} ${t.settings.toLowerCase()}
                    </h3>
                    <button id="closeColorModal" style="background: none; border: none; color: #fff; font-size: 20px; cursor: pointer;">\xD7</button>
                </div>
                
                <div style="margin-bottom: 20px;">
                    <div style="margin-bottom: 15px;">
                        <div style="color: #bbb; margin-bottom: 8px; font-size: 14px;">${t.color}</div>
                        <input type="color" id="videoBorderColor" value="${localStorage.getItem("videoBorderColor") || "#007bff"}" style="width: 100%; height: 40px; border: none; border-radius: 4px; cursor: pointer;">
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
                
                <button id="resetColorBtn" style="
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: #dc3545;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 14px;
                    transition: all 0.2s;
                " title="${t.reset || "Reset"}">
                    <i class="fas fa-undo"></i> ${t.reset || "Reset"}
                </button>
            </div>
        </div>`;
    _insertAdjacentHTMLToBody("beforeend", colorModalHTML);
    document.getElementById("settingsModal").style.display = "none";
    document.getElementById("closeColorModal").addEventListener("click", closeColorModal);
    const videoBorderColor = document.getElementById("videoBorderColor");
    const savedColor = localStorage.getItem("videoBorderColor");
    if (savedColor) {
      const checkColorInput = setInterval(() => {
        const colorInput = document.getElementById("videoBorderColor");
        if (colorInput) {
          colorInput.value = savedColor;
          clearInterval(checkColorInput);
        }
      }, 100);
    }
    document.getElementById("applyColorBtn").addEventListener("click", function() {
      const color = videoBorderColor.value.toLowerCase();
      const isWhiteHex = color === "#ffffff" || color === "#fff" || color === "white";
      const isWhiteRGB = color === "rgb(255,255,255)" || color === "rgb(255, 255, 255)" || color === "rgba(255,255,255,1)" || color === "rgba(255, 255, 255, 1)";
      let isNearWhite = false;
      if (color.startsWith("#")) {
        const hex = color.substring(1);
        const rgb = parseInt(hex.length === 3 ? hex.split("").map((c) => c + c).join("") : hex, 16);
        const r = rgb >> 16 & 255;
        const g = rgb >> 8 & 255;
        const b = rgb >> 0 & 255;
        isNearWhite = r > 240 && g > 240 && b > 240;
      }
      if (isWhiteHex || isWhiteRGB || isNearWhite) {
        const lang2 = _getLang3();
        const t2 = _translations2[lang2] || _translations2.en || {};
        const message = t2.whiteColorNotAllowed || "White color is not allowed. Please choose a different color.";
        _showNotification2("Color Selection", message, {
          type: "warning",
          duration: 3e3,
          pulse: true,
          zIndex: 10001
        });
        videoBorderColor.value = "#007bff";
        return;
      }
      if (!document.documentElement.classList.contains("dark-mode")) {
        setTimeout(() => {
          document.documentElement.classList.add("dark-mode");
          localStorage.setItem("darkMode", "true");
        }, 500);
      }
      const darkToggle = document.getElementById("toggleDark");
      if (darkToggle) {
        darkToggle.checked = true;
        darkToggle.dispatchEvent(new Event("change"));
      }
      localStorage.setItem("videoBorderColor", color);
      setCookie("videoBorderColor", color);
      applyVideoBorderColor(color);
      closeColorModal();
    });
    document.getElementById("resetColorBtn").addEventListener("click", function() {
      localStorage.removeItem("videoBorderColor");
      document.cookie = "videoBorderColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      const styleElement = document.getElementById("rightBoxStyle");
      if (styleElement) {
        styleElement.remove();
      }
      videoBorderColor.value = "#007bff";
      const lang2 = _getLang3();
      const t2 = _translations2[lang2] || _translations2.en || {};
      const message = t2.stylesReset || "Custom styles have been reset";
      _showNotification2("Color Reset", message, {
        type: "success",
        duration: 2e3,
        pulse: true,
        zIndex: 10001
      });
    });
    document.addEventListener("keydown", function(e) {
      if (e.key === "Escape") {
        closeColorModal();
      }
    });
  }

  // src/ui/modals/settings.js
  var _getLang4 = () => "en";
  var _translations3 = {};
  var _showNotification3 = () => {
  };
  var _insertAdjacentHTMLToBody2 = () => {
  };
  var _injectToHead2 = () => {
  };
  var _unblurToolbar = () => {
  };
  var _showUserStylesModal = () => {
  };
  var _showTosModal = () => {
  };
  var _showStatistics = () => {
  };
  var _setIpDisplayPreference = () => {
  };
  var _getIpDisplayPreference = () => false;
  var _saveButtonChoice = () => {
  };
  var _updateButtonTitles = () => {
  };
  var _isMobile2 = () => false;
  var _isIpDisplayEnabled2 = false;
  var _isSaveButtonChoiceEnabled = false;
  function setDeps3(deps) {
    if (deps.getLang)
      _getLang4 = deps.getLang;
    if (deps.translations)
      _translations3 = deps.translations;
    if (deps.showNotification)
      _showNotification3 = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody2 = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead)
      _injectToHead2 = deps.injectToHead;
    if (deps.unblurToolbar)
      _unblurToolbar = deps.unblurToolbar;
    if (deps.showUserStylesModal)
      _showUserStylesModal = deps.showUserStylesModal;
    if (deps.showTosModal)
      _showTosModal = deps.showTosModal;
    if (deps.showStatistics)
      _showStatistics = deps.showStatistics;
    if (deps.setIpDisplayPreference)
      _setIpDisplayPreference = deps.setIpDisplayPreference;
    if (deps.getIpDisplayPreference)
      _getIpDisplayPreference = deps.getIpDisplayPreference;
    if (deps.saveButtonChoice)
      _saveButtonChoice = deps.saveButtonChoice;
    if (deps.updateButtonTitles)
      _updateButtonTitles = deps.updateButtonTitles;
    if (deps.isMobile)
      _isMobile2 = deps.isMobile;
    if (deps.isIpDisplayEnabled !== void 0)
      _isIpDisplayEnabled2 = deps.isIpDisplayEnabled;
    if (deps.isSaveButtonChoiceEnabled !== void 0)
      _isSaveButtonChoiceEnabled = deps.isSaveButtonChoiceEnabled;
    setDeps2({
      getLang: _getLang4,
      translations: _translations3,
      showNotification: _showNotification3,
      insertAdjacentHTMLToBody: _insertAdjacentHTMLToBody2,
      injectToHead: _injectToHead2
    });
  }
  function showSettings() {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar && !_isMobile2())
      toolbar.classList.add("chill-blur");
    const lang = _getLang4();
    const t = _translations3[lang];
    const modalHTML = `
    <div id="settingsModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 500px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #007bff, #6610f2); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-cog"></i> ${t.settings}
                </h3>
                <button id="closeSettingsBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
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
                            <option value="en" ${lang === "en" ? "selected" : ""}>English</option>
                            <option value="zh" ${lang === "zh" ? "selected" : ""}>\u4E2D\u6587 (Chinese)</option>
                            <option value="hi" ${lang === "hi" ? "selected" : ""}>\u0939\u093F\u0928\u094D\u0926\u0940 (Hindi)</option>
                            <option value="es" ${lang === "es" ? "selected" : ""}>Espa\xF1ol (Spanish)</option>
                            <option value="ar" ${lang === "ar" ? "selected" : ""}>\u0627\u0644\u0639\u0631\u0628\u064A\u0629 (Arabic)</option>
                            <option value="fr" ${lang === "fr" ? "selected" : ""}>Fran\xE7ais (French)</option>
                            <option value="bn" ${lang === "bn" ? "selected" : ""}>\u09AC\u09BE\u0982\u09B2\u09BE (Bengali)</option>
                            <option value="ru" ${lang === "ru" ? "selected" : ""}>\u0420\u0443\u0441\u0441\u043A\u0438\u0439 (Russian)</option>
                            <option value="pt" ${lang === "pt" ? "selected" : ""}>Portugu\xEAs (Portuguese)</option>
                            <option value="id" ${lang === "id" ? "selected" : ""}>Bahasa Indonesia</option>
                            <option value="it" ${lang === "it" ? "selected" : ""}>Italiano</option>
                        </select>


                        <div style="display: flex; justify-content: space-between; align-items: center; margin: 8px 0; padding: 8px 12px; border-radius: 6px; background: rgba(255,255,255,0.05);">
                            <div style="display: flex; align-items: center;">
                                <label class="switch" style="position: relative; display: inline-block; width: 50px; height: 24px; margin-right: 12px;">
                                    <input type="checkbox" id="showIpDisplayCheckbox" ${_isIpDisplayEnabled2 ? "checked" : ""} style="opacity: 0; width: 0; height: 0;">
                                    <span class="slider round"></span>
                                </label>
                                <label for="showIpDisplayCheckbox" style="
                                    color: #e0e0e0;
                                    font-size: 14px;
                                    font-weight: 500;
                                    cursor: pointer;
                                    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
                                    line-height: 1.4;
                                    margin-right: 20px;
                                ">
                                    ${t.showIpDisplay}
                                </label>
                                
                            </div>
                            
                            <div style="display: flex; align-items: center; margin-left: 20px;">
                                <input type="checkbox" id="saveButtonChoiceCheckbox" ${_isSaveButtonChoiceEnabled ? "checked" : ""} style="display: none;">
                                <span style="margin: 0 8px 0 0; color: #e0e0e0; font-size: 14px; font-weight: 500; white-space: nowrap; text-transform: uppercase;">Persistent:</span>
                                <button type="button" id="saveButtonToggle" style="
                                    width: 50px;
                                    height: 24px;
                                    border: none;
                                    border-radius: 12px;
                                    background: ${_isSaveButtonChoiceEnabled ? "#4CAF50" : "#F44336"};
                                    color: white;
                                    font-weight: bold;
                                    font-size: 12px;
                                    cursor: pointer;
                                    outline: none;
                                    position: relative;
                                    overflow: hidden;
                                    transition: background-color 0.3s;
                                    margin-right: 5px;
                                ">
                                    ${_isSaveButtonChoiceEnabled ? "ON" : "OFF"}
                                </button>
                                <i class="fas fa-info-circle" style="color: #666; font-size: 14px; cursor: help;" title="toggle if you want to save the last choice made on the button"></i>
                            </div>
                            
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
                                
                                #showIpDisplayCheckbox + .slider,
                                #saveButtonChoiceCheckbox + .slider {
                                    background-color: #444;
                                }
                                
                                #showIpDisplayCheckbox:checked + .slider:before,
                                #saveButtonChoiceCheckbox:checked + .slider:before {
                                    background-color: white;
                                }
                                
                                #showIpDisplayCheckbox:checked + .slider,
                                #saveButtonChoiceCheckbox:checked + .slider {
                                    background-color: #4a90e2;
                                }
                                
                                #showIpDisplayCheckbox:checked + .slider:before,
                                #saveButtonChoiceCheckbox:checked + .slider:before {
                                    transform: translateX(26px);
                                }
                                
                                #showIpDisplayCheckbox:focus + .slider,
                                #saveButtonChoiceCheckbox:focus + .slider {
                                    box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.3);
                                }
                                
                                #saveButtonToggle {
                                    transition: background-color 0.3s;
                                }
                            </style>
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
                        <i class="fas fa-palette"></i> ${t.videoBorder || "User Color"}
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
                        <i class="fas fa-paint-brush"></i> ${t.userStyles || "UserStyles"}
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
                        <i class="fas fa-file-alt"></i> ${t.termsOfService || "Terms of Service"}
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
                
                <div style="display: flex; gap: 10px; margin-top: 10px;">
                    <a href="https://buymeacoffee.com/chillspotinc" target="_blank" id="donateBtn" style="
                        flex: 1;
                        padding: 12px 15px;
                        background: #ff6b35;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        transition: all 0.2s;
                        text-align: center;
                        text-decoration: none;
                    ">
                        <i class="fas fa-heart"></i>
                        ${t.donate}
                    </a>
                    
                    <button id="showStatisticsBtn" style="
                        flex: 1;
                        padding: 12px 15px;
                        background: #ad6721;
                        color: white;
                        border: none;
                        border-radius: 8px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 600;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 8px;
                        transition: all 0.2s;
                    ">
                        <i class="fas fa-chart-bar"></i>
                        ${t.statistics}
                    </button>
                </div>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody2("beforeend", modalHTML);
    if (_isSaveButtonChoiceEnabled) {
      const savedIpDisplay = localStorage.getItem("ipDisplayEnabled");
      if (savedIpDisplay !== null) {
        _isIpDisplayEnabled2 = savedIpDisplay === "true";
      }
    }
    const initIpDisplayBox = () => {
      const ipDisplayBox = document.getElementById("ipDisplayBox");
      if (ipDisplayBox) {
        ipDisplayBox.style.display = _isIpDisplayEnabled2 ? "block" : "none";
      }
    };
    const ipCheckbox = document.getElementById("showIpDisplayCheckbox");
    if (ipCheckbox) {
      ipCheckbox.checked = _isIpDisplayEnabled2;
      ipCheckbox.dispatchEvent(new Event("change", { bubbles: false }));
    }
    initIpDisplayBox();
    const ipBoxObserver = new MutationObserver(() => {
      const ipDisplayBox = document.getElementById("ipDisplayBox");
      if (ipDisplayBox) {
        ipDisplayBox.style.display = _isIpDisplayEnabled2 ? "block" : "none";
        ipBoxObserver.disconnect();
      }
    });
    ipBoxObserver.observe(document.documentElement, { childList: true, subtree: true });
    if (ipCheckbox) {
      const handleIpCheckboxChange = function(e) {
        _isIpDisplayEnabled2 = e.target.checked;
        if (_isSaveButtonChoiceEnabled) {
          localStorage.setItem("ipDisplayEnabled", _isIpDisplayEnabled2);
        } else {
          localStorage.removeItem("ipDisplayEnabled");
        }
        document.querySelectorAll("#ipDisplayBox").forEach((box) => {
          box.style.display = _isIpDisplayEnabled2 ? "block" : "none";
        });
      };
      ipCheckbox.addEventListener("change", handleIpCheckboxChange);
    }
    const saveButtonChoiceCheckbox = document.getElementById("saveButtonChoiceCheckbox");
    const saveButtonToggle = document.getElementById("saveButtonToggle");
    saveButtonChoiceCheckbox.checked = _isSaveButtonChoiceEnabled;
    saveButtonToggle.addEventListener("click", function() {
      _isSaveButtonChoiceEnabled = !_isSaveButtonChoiceEnabled;
      saveButtonChoiceCheckbox.checked = _isSaveButtonChoiceEnabled;
      saveButtonToggle.style.background = _isSaveButtonChoiceEnabled ? "#4CAF50" : "#F44336";
      saveButtonToggle.textContent = _isSaveButtonChoiceEnabled ? "ON" : "OFF";
      if (_isSaveButtonChoiceEnabled) {
        localStorage.setItem("saveButtonChoice", "true");
      } else {
        localStorage.removeItem("saveButtonChoice");
        localStorage.removeItem("buttonChoices");
        localStorage.removeItem("ipDisplayEnabled");
      }
    });
    document.getElementById("langSelect").onchange = function() {
      localStorage.setItem("chilltool_lang", this.value);
      _updateButtonTitles();
      document.getElementById("settingsModal").remove();
      showSettings();
    };
    document.getElementById("tosBtn").onclick = function() {
      window.open("https://chilltools.it/tos", "_blank");
    };
    document.getElementById("userStylesBtn").onclick = function() {
      _showUserStylesModal();
    };
    const userStyleActive = localStorage.getItem("chilltool_userStyles");
    const videoBorderBtn = document.getElementById("videoBorderBtn");
    if (userStyleActive && userStyleActive.trim() !== "") {
      videoBorderBtn.style.opacity = "0.5";
      videoBorderBtn.style.cursor = "not-allowed";
      videoBorderBtn.title = t.userStyleActive;
    }
    document.getElementById("videoBorderBtn").addEventListener("click", function() {
      const userStyleActive2 = localStorage.getItem("chilltool_userStyles");
      showColorModal(userStyleActive2);
    });
    document.getElementById("showIpDisplayCheckbox").addEventListener("change", function(e) {
      _setIpDisplayPreference(e.target.checked);
    });
    _setIpDisplayPreference(_getIpDisplayPreference());
    document.getElementById("closeSettingsBtn").onclick = function() {
      const selected = document.getElementById("langSelect").value;
      localStorage.setItem("chilltool_lang", selected);
      document.getElementById("settingsModal").remove();
      _unblurToolbar();
    };
    const settingsModal = document.getElementById("settingsModal");
    if (settingsModal) {
      settingsModal.addEventListener("click", (e) => {
        if (e.target === settingsModal) {
          const selected = document.getElementById("langSelect").value;
          localStorage.setItem("chilltool_lang", selected);
          settingsModal.remove();
          _unblurToolbar();
        }
      });
    }
    restoreColorStyle();
  }

  // src/features/ban.js
  function getBannedUsers() {
    const bannedUsers = localStorage.getItem("bannedUsers");
    return bannedUsers ? JSON.parse(bannedUsers) : [];
  }
  function saveBannedUsers(bannedUsers) {
    localStorage.setItem("bannedUsers", JSON.stringify(bannedUsers));
  }

  // src/ui/modals/ban-list.js
  var _getLang5 = () => "en";
  var _translations4 = {};
  var _showScreenshot = () => {
  };
  var _showNotification4 = () => {
  };
  var _insertAdjacentHTMLToBody3 = () => {
  };
  var _unblurToolbar2 = () => {
  };
  var _isMobile3 = () => false;
  function setDeps4(deps) {
    if (deps.getLang)
      _getLang5 = deps.getLang;
    if (deps.translations)
      _translations4 = deps.translations;
    if (deps.showScreenshot)
      _showScreenshot = deps.showScreenshot;
    if (deps.showNotification)
      _showNotification4 = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody3 = deps.insertAdjacentHTMLToBody;
    if (deps.unblurToolbar)
      _unblurToolbar2 = deps.unblurToolbar;
    if (deps.isMobile)
      _isMobile3 = deps.isMobile;
  }
  function displayBannedUsers() {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar && !_isMobile3())
      toolbar.classList.add("chill-blur");
    const lang = _getLang5();
    const t = _translations4[lang];
    const bannedUsers = getBannedUsers();
    const modalHTML = `
    <div id="bannedUsersModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 800px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #dc3545, #b30000); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-user-slash"></i> ${t.banListTitle}
                </h3>
                <button id="closeBannedUsers" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
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
                                <tr style="background-color: ${index % 2 === 0 ? "#1a1a1a" : "#222"}; vertical-align: top;">
                                    <td style="padding: 10px; color: #fff;">${escapeHtml(user.ip)}</td>
                                    <td style="padding: 10px; color: #fff;">${escapeHtml(user.info?.city) || "N/A"}</td>
                                    <td style="padding: 10px; color: #fff;">${escapeHtml(user.info?.country) || "N/A"}</td>
                                    <td style="padding: 10px; color: #fff;">${escapeHtml(user.timestamp)}</td>
                                    <td style="padding: 10px; text-align: center;">
                                        ${user.screenshot ? `<img src="${user.screenshot}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; cursor: pointer;" data-screenshot="${user.screenshot}" data-ip="${user.ip}" data-timestamp="${user.timestamp}" data-info="${escapeHtml(JSON.stringify(user.info))}" class="ban-screenshot-btn">` : "N/A"}
                                    </td>
                                    <td style="padding: 10px;">
                                        <textarea class="ban-note-input" data-ip="${escapeHtml(user.ip)}"
                                            maxlength="50"
                                            placeholder="Add note... (max 50)"
                                            style="width: 100%; padding: 4px 8px; background: #333; border: 1px solid #444; border-radius: 4px; color: #fff; font-size: 12px; outline: none; resize: vertical; min-height: 32px; max-height: 120px; overflow-y: auto; box-sizing: border-box; font-family: inherit;"
                                        >${user.note || ""}</textarea>
                                    </td>
                                    <td style="padding: 10px; text-align: center;">
                                        <button class="unban-btn" data-ip="${escapeHtml(user.ip)}" style="background: #28a745; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;"><i class="fas fa-trash-alt"></i></button>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                ` : `<div style="text-align: center; color: #777; padding: 40px 20px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
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
    _insertAdjacentHTMLToBody3("beforeend", modalHTML);
    const bannedModal = document.getElementById("bannedUsersModal");
    if (bannedModal) {
      bannedModal.addEventListener("click", (e) => {
        if (e.target === bannedModal) {
          bannedModal.remove();
          _unblurToolbar2();
        }
      });
    }
    document.getElementById("closeBannedUsers").addEventListener("click", () => {
      document.getElementById("bannedUsersModal").remove();
      _unblurToolbar2();
    });
    document.querySelectorAll(".unban-btn").forEach((btn) => {
      btn.addEventListener("click", function() {
        const ipToUnban = this.getAttribute("data-ip");
        let bannedUsers2 = getBannedUsers();
        bannedUsers2 = bannedUsers2.filter((user) => user.ip !== ipToUnban);
        saveBannedUsers(bannedUsers2);
        document.getElementById("bannedUsersModal").remove();
        displayBannedUsers();
      });
    });
    document.querySelectorAll(".ban-screenshot-btn").forEach((btn) => {
      btn.addEventListener("click", function() {
        const screenshot = this.getAttribute("data-screenshot");
        const ip = this.getAttribute("data-ip");
        const timestamp = this.getAttribute("data-timestamp");
        const info = JSON.parse(this.getAttribute("data-info") || "{}");
        _showScreenshot(screenshot, { ip, timestamp, info });
      });
    });
    document.querySelectorAll(".ban-note-input").forEach((input) => {
      let noteWarningShown = false;
      input.addEventListener("input", function() {
        if (this.value.length >= 50 && !noteWarningShown) {
          noteWarningShown = true;
          const lang2 = _getLang5();
          const t2 = _translations4[lang2] || _translations4["en"];
          _showNotification4("Note", t2.noteMaxChars || _translations4["en"].noteMaxChars || "Max 50 characters", {
            type: "warning",
            duration: 2500
          });
          setTimeout(() => {
            noteWarningShown = false;
          }, 3e3);
        }
        this.style.height = "auto";
        this.style.height = Math.min(this.scrollHeight, 120) + "px";
      });
      input.addEventListener("blur", function() {
        const ip = this.getAttribute("data-ip");
        const note = this.value.trim();
        const bannedUsers2 = getBannedUsers();
        const user = bannedUsers2.find((u) => u.ip === ip);
        if (user) {
          user.note = note;
          saveBannedUsers(bannedUsers2);
        }
      });
    });
    const manualIpInput = document.getElementById("manualIpInput");
    const addManualIpBtn = document.getElementById("addManualIpBtn");
    if (addManualIpBtn) {
      addManualIpBtn.addEventListener("click", function() {
        const ip = manualIpInput.value.trim();
        if (!ip)
          return;
        const bannedUsers2 = getBannedUsers();
        if (bannedUsers2.some((user) => user.ip === ip)) {
          _showNotification4("Info", "This IP is already blocked", { type: "info" });
          return;
        }
        bannedUsers2.push({
          ip,
          info: {},
          timestamp: (/* @__PURE__ */ new Date()).toLocaleString(),
          manuallyAdded: true,
          note: ""
        });
        saveBannedUsers(bannedUsers2);
        document.getElementById("bannedUsersModal").remove();
        displayBannedUsers();
        _showNotification4("Success", "IP address has been blocked", { type: "success" });
      });
      manualIpInput.addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
          addManualIpBtn.click();
        }
      });
    }
  }

  // src/ui/modals/country-filter.js
  var _getLang6 = () => "en";
  var _translations5 = {};
  var _showNotification5 = () => {
  };
  var _insertAdjacentHTMLToBody4 = () => {
  };
  var _unblurToolbar3 = () => {
  };
  function setDeps5(deps) {
    if (deps.getLang)
      _getLang6 = deps.getLang;
    if (deps.translations)
      _translations5 = deps.translations;
    if (deps.showNotification)
      _showNotification5 = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody4 = deps.insertAdjacentHTMLToBody;
    if (deps.unblurToolbar)
      _unblurToolbar3 = deps.unblurToolbar;
  }
  function getSelectedCountries() {
    const saved = localStorage.getItem("chilltool_selectedCountries");
    return saved ? JSON.parse(saved) : [];
  }
  function saveSelectedCountries(countries) {
    localStorage.setItem("chilltool_selectedCountries", JSON.stringify(countries));
  }
  function showCountryFilterModal() {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar && !isMobile())
      toolbar.classList.add("chill-blur");
    const lang = _getLang6();
    const t = _translations5[lang];
    const selectedCountries = getSelectedCountries();
    const countries = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bhutan",
      "Bolivia",
      "Bosnia and Herzegovina",
      "Botswana",
      "Brazil",
      "Brunei",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cape Verde",
      "Central African Republic",
      "Chad",
      "Chile",
      "China",
      "Colombia",
      "Comoros",
      "Congo",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic",
      "East Timor",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Eswatini",
      "Estonia",
      "Ethiopia",
      "Fiji",
      "Finland",
      "France",
      "Gabon",
      "Gambia",
      "Georgia",
      "Germany",
      "Ghana",
      "Greece",
      "Grenada",
      "Guatemala",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Honduras",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran",
      "Iraq",
      "Ireland",
      "Israel",
      "Italy",
      "Ivory Coast",
      "Jamaica",
      "Japan",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "North Korea",
      "South Korea",
      "Kosovo",
      "Kuwait",
      "Kyrgyzstan",
      "Laos",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macedonia",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands",
      "Mauritania",
      "Mauritius",
      "Mexico",
      "Micronesia",
      "Moldova",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands",
      "New Zealand",
      "Nicaragua",
      "Niger",
      "Nigeria",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines",
      "Poland",
      "Portugal",
      "Qatar",
      "Romania",
      "Russia",
      "Rwanda",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan",
      "Suriname",
      "Sweden",
      "Switzerland",
      "Syria",
      "Taiwan",
      "Tajikistan",
      "Tanzania",
      "Thailand",
      "Togo",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates",
      "United Kingdom",
      "United States",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Vatican City",
      "Venezuela",
      "Vietnam",
      "Yemen",
      "Zambia",
      "Zimbabwe"
    ];
    const countryCheckboxes = countries.map((country) => {
      const isChecked = selectedCountries.includes(country);
      return `
            <label style="display: flex; align-items: center; padding: 8px; margin: 4px 0; background: ${isChecked ? "rgba(23, 162, 184, 0.2)" : "rgba(255,255,255,0.05)"}; border-radius: 5px; cursor: pointer; transition: background 0.2s;">
                <input type="checkbox" value="${country}" ${isChecked ? "checked" : ""} style="margin-right: 10px; cursor: pointer; width: 18px; height: 18px;">
                <span style="color: #fff; font-size: 14px;">${country}</span>
            </label>
        `;
    }).join("");
    const modalHTML = `
    <div id="countryFilterModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 600px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #17a2b8, #138496); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-globe"></i> ${t.countryFilter}
                </h3>
                <button id="closeCountryFilter" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
            </div>
            <div style="padding: 15px; color: #bbb; font-size: 13px; border-bottom: 1px solid #333;">
                ${t.countryFilterDesc}
            </div>
            <div style="padding: 15px; border-bottom: 1px solid #333;">
                <div style="position: relative; display: flex; align-items: center;">
                    <i class="fas fa-search" style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #888; font-size: 14px; pointer-events: none; z-index: 1;"></i>
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
                    ${t.save || "Save"}
                </button>
            </div>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody4("beforeend", modalHTML);
    const modal = document.getElementById("countryFilterModal");
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    const countLabel = document.getElementById("selectedCountryCount");
    const searchInput = document.getElementById("countrySearchInput");
    const countryContainer = document.getElementById("countryCheckboxContainer");
    const noResultsMsg = document.getElementById("noResultsMessage");
    function updateCount() {
      const checked = Array.from(checkboxes).filter((cb) => cb.checked);
      countLabel.innerHTML = `<i class="fas fa-flag" style="color: #17a2b8; font-size: 16px; margin-right: 8px;"></i>${checked.length > 0 ? `${checked.length} ${t.countriesSelected}` : t.noCountriesSelected}`;
      checkboxes.forEach((cb) => {
        const label = cb.closest("label");
        if (cb.checked) {
          label.style.background = "rgba(23, 162, 184, 0.3)";
          label.style.borderLeft = "3px solid #17a2b8";
        } else {
          label.style.background = "rgba(255,255,255,0.05)";
          label.style.borderLeft = "3px solid transparent";
        }
      });
    }
    function filterCountries() {
      const searchTerm = searchInput.value.toLowerCase().trim();
      let visibleCount = 0;
      checkboxes.forEach((cb) => {
        const label = cb.closest("label");
        const countryName = cb.value.toLowerCase();
        if (countryName.includes(searchTerm)) {
          label.style.display = "flex";
          visibleCount++;
        } else {
          label.style.display = "none";
        }
      });
      if (visibleCount === 0) {
        noResultsMsg.style.display = "block";
        countryContainer.style.display = "none";
      } else {
        noResultsMsg.style.display = "none";
        countryContainer.style.display = "grid";
      }
    }
    searchInput.addEventListener("input", filterCountries);
    checkboxes.forEach((cb) => {
      cb.addEventListener("change", updateCount);
    });
    document.getElementById("selectAllCountries").addEventListener("click", () => {
      checkboxes.forEach((cb) => cb.checked = true);
      updateCount();
    });
    document.getElementById("deselectAllCountries").addEventListener("click", () => {
      checkboxes.forEach((cb) => cb.checked = false);
      updateCount();
    });
    document.getElementById("closeCountryFilter").addEventListener("click", () => {
      modal.remove();
      _unblurToolbar3();
    });
    document.getElementById("saveCountryFilter").addEventListener("click", () => {
      const selected = Array.from(checkboxes).filter((cb) => cb.checked).map((cb) => cb.value);
      saveSelectedCountries(selected);
      _showNotification5("Country Filter", `${selected.length > 0 ? selected.length + " " + t.countriesSelected : t.noCountriesSelected}`, {
        type: "success",
        duration: 3e3
      });
      modal.remove();
      _unblurToolbar3();
    });
  }

  // src/ui/modals/country-leaderboard.js
  var _getLang7 = () => "en";
  var _translations6 = {};
  var _insertAdjacentHTMLToBody5 = () => {
  };
  var _getSortedCountryLeaderboard = () => ({ entries: [], total: 0 });
  var _resetLeaderboardDedup = () => {
  };
  function setDeps6(deps) {
    if (deps.getLang)
      _getLang7 = deps.getLang;
    if (deps.translations)
      _translations6 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody5 = deps.insertAdjacentHTMLToBody;
    if (deps.getSortedCountryLeaderboard)
      _getSortedCountryLeaderboard = deps.getSortedCountryLeaderboard;
    if (deps.resetLeaderboardDedup)
      _resetLeaderboardDedup = deps.resetLeaderboardDedup;
  }
  var COUNTRY_LEADERBOARD_STORAGE_KEY = "countryLeaderboardCounts";
  function showCountryLeaderboard() {
    const lang = _getLang7();
    const t = _translations6[lang] || _translations6["en"];
    const tEn = _translations6["en"] || {};
    const existing = document.getElementById("countryLeaderboardModal");
    if (existing)
      existing.remove();
    const { entries, total } = _getSortedCountryLeaderboard();
    const uniqueCountries = entries.length;
    const rowsHtml = entries.length === 0 ? `<div style="color:#aaa; text-align:center; padding: 10px 0;">${t.countryLeaderboardNoData || tEn.countryLeaderboardNoData || "No data"}</div>` : entries.map((e, idx) => {
      const pct = total > 0 ? e.count / total * 100 : 0;
      const pctText = `${pct.toFixed(4)}%`;
      const medalColor = idx === 0 ? "#d4af37" : idx === 1 ? "#c0c0c0" : idx === 2 ? "#cd7f32" : null;
      const rankColorStyle = medalColor ? `color:${medalColor}; font-weight:800;` : "color:#666;";
      const countryColorStyle = medalColor ? `color:${medalColor}; font-weight:800;` : "color:#fff; font-weight:600;";
      return `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.08);">
                    <div style="display:flex; flex-direction:column; gap:2px;">
                        <div style="display:flex; align-items:center; gap:8px;">
                            <span style="${rankColorStyle} min-width: 24px; text-align:right;">${idx + 1}.</span>
                            <div data-country="${e.country}" style="${countryColorStyle}">${e.country}</div>
                        </div>
                        <div style="color:#777; font-size:12px; padding-left:32px;">${pctText}</div>
                    </div>
                    <div style="color:#fff; font-weight:700;">${e.count}</div>
                </div>
            `;
    }).join("");
    const modalHtml = `
        <div id="countryLeaderboardModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 10001; display: flex; justify-content: center; align-items: center;">
            <div style="background: #111; border-radius: 10px; width: 92%; max-width: 540px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display:flex; flex-direction:column;">
                <div style="padding: 15px; background: linear-gradient(to right, #11998e, #38ef7d); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                    <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-globe"></i> ${t.countryLeaderboardTitle || tEn.countryLeaderboardTitle || "Country leaderboard"}
                    </h3>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <button id="clearCountryLeaderboardBtn" style="background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.3); color: white; font-size: 12px; cursor: pointer; padding: 4px 10px; border-radius: 4px;" title="${t.countryLeaderboardClear || tEn.countryLeaderboardClear || "Clear leaderboard"}">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                        <button id="closeCountryLeaderboardBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
                    </div>
                </div>
                <div style="padding: 16px 20px; overflow-y:auto; flex-grow:1;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom: 10px;">
                        <span style="color:#aaa;">${t.countryLeaderboardTotalCountries || tEn.countryLeaderboardTotalCountries || "Total countries encountered:"}</span>
                        <span style="color:#fff; font-weight:700;">${uniqueCountries}</span>
                    </div>
                    <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 12px 15px;">
                        ${rowsHtml}
                    </div>
                </div>
                <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    chilltools.it
                </div>
            </div>
        </div>
    `;
    _insertAdjacentHTMLToBody5("beforeend", modalHtml);
    const close = () => {
      const modal2 = document.getElementById("countryLeaderboardModal");
      if (modal2)
        modal2.remove();
    };
    const closeBtn = document.getElementById("closeCountryLeaderboardBtn");
    if (closeBtn)
      closeBtn.onclick = close;
    const clearBtn = document.getElementById("clearCountryLeaderboardBtn");
    if (clearBtn)
      clearBtn.onclick = function() {
        if (confirm(t.countryLeaderboardClearConfirm || tEn.countryLeaderboardClearConfirm || "Clear the entire country leaderboard?")) {
          localStorage.removeItem(COUNTRY_LEADERBOARD_STORAGE_KEY);
          _resetLeaderboardDedup();
          close();
        }
      };
    const modal = document.getElementById("countryLeaderboardModal");
    if (modal) {
      modal.onclick = function(e) {
        if (e.target === this)
          close();
      };
    }
  }

  // src/ui/modals/history.js
  var _getLang8 = () => "en";
  var _translations7 = {};
  var _insertAdjacentHTMLToBody6 = () => {
  };
  var _connectionHistory = [];
  var _showScreenshot2 = () => {
  };
  var _showInfoWithoutScreenshot = () => {
  };
  var _isHistoryVisible = false;
  function setDeps7(deps) {
    if (deps.getLang)
      _getLang8 = deps.getLang;
    if (deps.translations)
      _translations7 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody6 = deps.insertAdjacentHTMLToBody;
    if (deps.connectionHistory)
      _connectionHistory = deps.connectionHistory;
    if (deps.showScreenshot)
      _showScreenshot2 = deps.showScreenshot;
    if (deps.showInfoWithoutScreenshot)
      _showInfoWithoutScreenshot = deps.showInfoWithoutScreenshot;
    if (deps.isHistoryVisible !== void 0)
      _isHistoryVisible = deps.isHistoryVisible;
  }
  function displayHistory() {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar)
      toolbar.classList.add("chill-blur");
    const lang = _getLang8();
    const t = _translations7[lang];
    let initialHistoryLength = _connectionHistory.length;
    let historyUpdateInterval = null;
    const refreshHistoryContent = () => {
      const historyContainer = document.querySelector("#historyModal > div > div:nth-child(2)");
      const footer = document.querySelector("#historyModal > div > div:last-child");
      if (!historyContainer)
        return;
      const newLength = _connectionHistory.length;
      if (newLength !== initialHistoryLength) {
        initialHistoryLength = newLength;
        historyContainer.innerHTML = `
                <div style="color: #777; font-size: 12px; text-align: center; margin-bottom: 10px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.historyLimit}
                </div>
                ${_connectionHistory.length ? _connectionHistory.map((entry, index, arr) => {
          const photoAvailable = index < 30;
          return `
                        <div class="history-entry${!photoAvailable ? " history-entry-disabled" : ""}" style="margin-bottom: 10px; padding: 12px; background: #1a1a1a; border-radius: 5px; transition: all 0.2s; border-left: 4px solid ${entry.hasScreenshot && photoAvailable ? "#007bff" : "#ff4444"};${!photoAvailable ? " pointer-events: none; opacity: 0.7; cursor: default;" : " cursor: pointer;"}" data-ip="${escapeHtml(entry.ip)}" data-has-screenshot="${photoAvailable && entry.hasScreenshot}" data-screenshot="${photoAvailable && entry.hasScreenshot ? entry.screenshot || "" : ""}">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                <div style="flex: 1; min-width: 0;">
                                    <div class="history-text" style="font-size: 11px; color: #777; margin-bottom: 5px;">${escapeHtml(entry.timestamp)}</div>
                                    <div>
                                        <span style="color: ${entry.hasScreenshot && photoAvailable ? "#007bff" : "#ff4444"}; margin-right: 8px; text-shadow: none;">
                                            ${arr.length - index}.
                                        </span>
                                        <span class="history-text" style="font-weight: bold; color: #4dabf7;">${escapeHtml(entry.ip)}</span>
                                    </div>
                                    <div class="history-text" style="font-size: 13px; color: #aaa; margin-top: 5px;">
                                        ${escapeHtml(entry.info?.city) || "-"}, ${escapeHtml(entry.info?.region) || "-"}, ${escapeHtml(entry.info?.country) || "-"}
                                    </div>
                                </div>
                                ${entry.hasScreenshot && photoAvailable ? `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; overflow: hidden; border: 1px solid #333; flex-shrink: 0;">
                                        <img src="${entry.screenshot}" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>` : `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; background: #222; display: flex; justify-content: center; align-items: center; color: #555; font-size: 20px; flex-shrink: 0;">
                                        <i class="fas fa-user-slash"></i>
                                    </div>`}
                            </div>
                            ${!photoAvailable ? `<div style='background:#ff4444; color:white; font-size:15px; margin-top:10px; border-radius:6px; padding:6px 12px; display:flex; align-items:center; gap:6px;'><i class='fas fa-exclamation-triangle' style='font-size:16px'></i> ${t.skip25Msg}</div>` : ""}
                        </div>
                        `;
        }).join("") : `<div style="text-align: center; color: #777; padding: 40px 20px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-inbox" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>
                        ${t.emptyHistory}<br><small>${t.connectToStart}</small></div>`}
            `;
        if (footer) {
          footer.innerHTML = `${_connectionHistory.length === 0 ? t.zero : _connectionHistory.length + " " + (_connectionHistory.length === 1 ? t.entry : t.entries)}`;
        }
        document.querySelectorAll(".history-entry").forEach((entry) => {
          if (entry.classList.contains("history-entry-disabled"))
            return;
          entry.addEventListener("click", function() {
            const ip = this.getAttribute("data-ip");
            const hasScreenshot = this.getAttribute("data-has-screenshot") === "true";
            const screenshot = this.getAttribute("data-screenshot");
            const historyItem = _connectionHistory.find((item) => item.ip === ip);
            if (historyItem) {
              if (hasScreenshot) {
                const entryIndex = _connectionHistory.findIndex((item) => item.ip === historyItem.ip && item.timestamp === historyItem.timestamp);
                _showScreenshot2(screenshot, historyItem, entryIndex);
              } else if (historyItem.hasScreenshot) {
                alert(t.photoNotAvailable + "\n\n" + t.skip25Msg);
              } else {
                _showInfoWithoutScreenshot(historyItem);
              }
            }
          });
        });
      }
    };
    const modalHTML = `
    <div id="historyModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 600px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #007bff, #6610f2); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-history"></i> ${t.history}
                </h3>
                <button id="closeHistory" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
            </div>
            <div style="padding: 15px; overflow-y: scroll; flex-grow: 1; min-height: 150px;">
                <div style="color: #777; font-size: 12px; text-align: center; margin-bottom: 10px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.historyLimit}
                </div>
                ${_connectionHistory.length ? _connectionHistory.map((entry, index, arr) => {
      const photoAvailable = index < 30;
      return `
                        <div class="history-entry${!photoAvailable ? " history-entry-disabled" : ""}" style="margin-bottom: 10px; padding: 12px; background: #1a1a1a; border-radius: 5px; transition: all 0.2s; border-left: 4px solid ${entry.hasScreenshot && photoAvailable ? "#007bff" : "#ff4444"};${!photoAvailable ? " pointer-events: none; opacity: 0.7; cursor: default;" : " cursor: pointer;"}" data-ip="${escapeHtml(entry.ip)}" data-has-screenshot="${photoAvailable && entry.hasScreenshot}" data-screenshot="${photoAvailable && entry.hasScreenshot ? entry.screenshot || "" : ""}">
                            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 5px;">
                                <div style="flex: 1; min-width: 0;">
                                    <div class="history-text" style="font-size: 11px; color: #777; margin-bottom: 5px;">${escapeHtml(entry.timestamp)}</div>
                                    <div>
                                        <span style="color: ${entry.hasScreenshot && photoAvailable ? "#007bff" : "#ff4444"}; margin-right: 8px; text-shadow: none;">
                                            ${arr.length - index}.
                                        </span>
                                        <span class="history-text" style="font-weight: bold; color: #4dabf7;">${escapeHtml(entry.ip)}</span>
                                    </div>
                                    <div class="history-text" style="font-size: 13px; color: #aaa; margin-top: 5px;">
                                        ${escapeHtml(entry.info?.city) || "-"}, ${escapeHtml(entry.info?.region) || "-"}, ${escapeHtml(entry.info?.country) || "-"}
                                    </div>
                                </div>
                                ${entry.hasScreenshot && photoAvailable ? `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; overflow: hidden; border: 1px solid #333; flex-shrink: 0;">
                                        <img src="${entry.screenshot}" style="width: 100%; height: 100%; object-fit: cover;">
                                    </div>` : `<div style="margin-left: 10px; width: 60px; height: 60px; border-radius: 4px; background: #222; display: flex; justify-content: center; align-items: center; color: #555; font-size: 20px; flex-shrink: 0;">
                                        <i class="fas fa-user-slash"></i>
                                    </div>`}
                            </div>
                            ${!photoAvailable ? `<div style='background:#ff4444; color:white; font-size:15px; margin-top:10px; border-radius:6px; padding:6px 12px; display:flex; align-items:center; gap:6px;'><i class='fas fa-exclamation-triangle' style='font-size:16px'></i> ${t.skip25Msg}</div>` : ""}
                        </div>
                        `;
    }).join("") : `<div style="text-align: center; color: #777; padding: 40px 20px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                        <i class="fas fa-inbox" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i><br>
                        ${t.emptyHistory}<br><small>${t.connectToStart}</small></div>`}
            </div>
            <div style="padding: 10px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                ${_connectionHistory.length === 0 ? t.zero : _connectionHistory.length + " " + (_connectionHistory.length === 1 ? t.entry : t.entries)}
            </div>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody6("beforeend", modalHTML);
    const historyModal = document.getElementById("historyModal");
    if (historyModal) {
      historyUpdateInterval = setInterval(refreshHistoryContent, 1e3);
      historyModal.addEventListener("click", (e) => {
        if (e.target === historyModal) {
          if (historyUpdateInterval)
            clearInterval(historyUpdateInterval);
          document.getElementById("historyModal").remove();
          _isHistoryVisible = false;
        }
      });
    }
    document.querySelectorAll(".history-entry").forEach((entry) => {
      if (entry.classList.contains("history-entry-disabled"))
        return;
      entry.addEventListener("click", function() {
        const ip = this.getAttribute("data-ip");
        const hasScreenshot = this.getAttribute("data-has-screenshot") === "true";
        const screenshot = this.getAttribute("data-screenshot");
        const historyItem = _connectionHistory.find((item) => item.ip === ip);
        if (historyItem) {
          if (hasScreenshot) {
            const entryIndex = _connectionHistory.findIndex((item) => item.ip === historyItem.ip && item.timestamp === historyItem.timestamp);
            _showScreenshot2(screenshot, historyItem, entryIndex);
          } else if (historyItem.hasScreenshot) {
            alert(t.photoNotAvailable + "\n\n" + t.skip25Msg);
          } else {
            _showInfoWithoutScreenshot(historyItem);
          }
        }
      });
    });
    document.getElementById("closeHistory").addEventListener("click", () => {
      if (historyUpdateInterval)
        clearInterval(historyUpdateInterval);
      document.getElementById("historyModal").remove();
      _isHistoryVisible = false;
    });
  }

  // src/ui/modals/screenshot-viewer.js
  var _getLang9 = () => "en";
  var _translations8 = {};
  var _insertAdjacentHTMLToBody7 = () => {
  };
  var _connectionHistory2 = [];
  var _getBannedUsers2 = () => [];
  var _saveBannedUsers2 = () => {
  };
  var _isUmingle = false;
  function setDeps8(deps) {
    if (deps.getLang)
      _getLang9 = deps.getLang;
    if (deps.translations)
      _translations8 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody7 = deps.insertAdjacentHTMLToBody;
    if (deps.connectionHistory)
      _connectionHistory2 = deps.connectionHistory;
    if (deps.getBannedUsers)
      _getBannedUsers2 = deps.getBannedUsers;
    if (deps.saveBannedUsers)
      _saveBannedUsers2 = deps.saveBannedUsers;
    if (deps.isUmingle !== void 0)
      _isUmingle = deps.isUmingle;
  }
  function showScreenshot(screenshot, entry, entryIndex = null) {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar)
      toolbar.classList.add("chill-blur");
    const lang = _getLang9();
    const t = _translations8[lang];
    const info = entry.info || {};
    if (entryIndex === null) {
      entryIndex = _connectionHistory2.findIndex((item) => item.ip === entry.ip && item.timestamp === entry.timestamp);
    }
    const modalHTML = `
    <div id="screenshotModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #1a1a1a; border-radius: 10px; width: 90%; max-width: 500px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.8); border: 1px solid #333;">
            <div style="position: relative;">
                <button id="nextScreenshotBtn" style="position: absolute; top: 50%; left: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: 1px solid #4dabf7; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#4dabf7'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.next || "Next"}">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button id="prevScreenshotBtn" style="position: absolute; top: 50%; right: 10px; transform: translateY(-50%); background: rgba(0,0,0,0.7); color: white; border: 1px solid #4dabf7; border-radius: 50%; width: 40px; height: 40px; display: flex; justify-content: center; align-items: center; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#4dabf7'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.previous || "Previous"}">
                    <i class="fas fa-chevron-right"></i>
                </button>

                <button id="blockUserBtn" style="position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: white; border: 1px solid #dc3545; border-radius: 5px; padding: 5px 10px; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#dc3545'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.blockUser || "Block User"}">
                    <i class="fas fa-ban"></i>
                </button>

                <button id="downloadScreenshotBtn" style="position: absolute; top: 10px; right: 10px; background: rgba(0,0,0,0.7); color: white; border: 1px solid #4dabf7; border-radius: 5px; padding: 5px 10px; cursor: pointer; z-index: 10001; transition: all 0.2s;"
                        onmouseover="this.style.background='#4dabf7'"
                        onmouseout="this.style.background='rgba(0,0,0,0.7)'"
                        title="${t.download || "Download"}">
                    <i class="fas fa-download"></i>
                </button>
                <div style="max-height: 60vh; overflow: hidden; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; background: #000; border-radius: 5px;">
                    <img id="screenshotImage" src="${screenshot}" style="max-width: 100%; max-height: 60vh; display: block;">
                </div>
            </div>
            <div class="history-text" style="color: white; margin-bottom: 15px;">
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.ip}:</span> <span style="user-select: all;">${escapeHtml(entry.ip)}</span></div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.time}:</span> ${escapeHtml(entry.timestamp)}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.city}:</span> ${escapeHtml(info.city) || "-"}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.region}:</span> ${escapeHtml(info.region) || "-"}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.country}:</span> ${escapeHtml(info.country) || "-"}</div>
                <div><span style="color: #4dabf7; font-weight: bold;">${t.coordinates}:</span> (${escapeHtml(info.latitude) || "-"}, ${escapeHtml(info.longitude) || "-"})</div>
            </div>
            <button onclick="document.getElementById('screenshotModal').remove()" style="background: #dc3545; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%; transition: background 0.2s;"
                    onmouseover="this.style.background='#c82333'"
                    onmouseout="this.style.background='#dc3545'">
                <i class="fas fa-times"></i> ${t.close || "Close"}
            </button>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody7("beforeend", modalHTML);
    const modalElement = document.getElementById("screenshotModal");
    const blockUserBtn = document.getElementById("blockUserBtn");
    const prevBtn = document.getElementById("prevScreenshotBtn");
    const nextBtn = document.getElementById("nextScreenshotBtn");
    let currentIndex = entryIndex;
    const hasScreenshotInDirection = (fromIndex, direction) => {
      let idx = fromIndex + direction;
      while (idx >= 0 && idx < _connectionHistory2.length) {
        const e = _connectionHistory2[idx];
        if (e && e.hasScreenshot && e.screenshot)
          return true;
        idx += direction;
      }
      return false;
    };
    const updateArrows = () => {
      const pBtn = document.getElementById("prevScreenshotBtn");
      const nBtn = document.getElementById("nextScreenshotBtn");
      if (pBtn)
        pBtn.style.display = hasScreenshotInDirection(currentIndex, -1) ? "flex" : "none";
      if (nBtn)
        nBtn.style.display = hasScreenshotInDirection(currentIndex, 1) ? "flex" : "none";
    };
    updateArrows();
    const navigateScreenshot = (direction) => {
      let newIndex = currentIndex + direction;
      while (newIndex >= 0 && newIndex < _connectionHistory2.length) {
        const newEntry = _connectionHistory2[newIndex];
        if (newEntry && newEntry.hasScreenshot && newEntry.screenshot) {
          clearInterval(screenshotUpdateInterval);
          document.removeEventListener("keydown", handleKeyDown);
          modalElement.remove();
          showScreenshot(newEntry.screenshot, newEntry, newIndex);
          return;
        }
        newIndex += direction;
      }
    };
    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateScreenshot(-1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navigateScreenshot(1);
      });
    }
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") {
        navigateScreenshot(1);
      } else if (e.key === "ArrowRight") {
        navigateScreenshot(-1);
      } else if (e.key === "Escape") {
        clearInterval(screenshotUpdateInterval);
        modalElement.remove();
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    let screenshotUpdateInterval = setInterval(() => {
      const modalStillOpen = document.getElementById("screenshotModal");
      if (!modalStillOpen) {
        clearInterval(screenshotUpdateInterval);
        return;
      }
      const foundIndex = _connectionHistory2.findIndex((item) => item.ip === entry.ip && item.timestamp === entry.timestamp);
      if (foundIndex === -1) {
        let redirectIndex = -1;
        const searchStart = Math.min(currentIndex, _connectionHistory2.length - 1);
        for (let i = searchStart; i >= 0; i--) {
          if (_connectionHistory2[i]?.hasScreenshot && _connectionHistory2[i]?.screenshot) {
            redirectIndex = i;
            break;
          }
        }
        if (redirectIndex === -1) {
          for (let i = searchStart + 1; i < _connectionHistory2.length; i++) {
            if (_connectionHistory2[i]?.hasScreenshot && _connectionHistory2[i]?.screenshot) {
              redirectIndex = i;
              break;
            }
          }
        }
        clearInterval(screenshotUpdateInterval);
        document.removeEventListener("keydown", handleKeyDown);
        modalElement.remove();
        if (redirectIndex !== -1) {
          const nextEntry = _connectionHistory2[redirectIndex];
          showScreenshot(nextEntry.screenshot, nextEntry, redirectIndex);
        }
        return;
      }
      const currentEntry = _connectionHistory2[foundIndex];
      const screenshotLost = !currentEntry.hasScreenshot || !currentEntry.screenshot;
      if (screenshotLost) {
        let redirectIndex = -1;
        for (let i = foundIndex - 1; i >= 0; i--) {
          if (_connectionHistory2[i]?.hasScreenshot && _connectionHistory2[i]?.screenshot) {
            redirectIndex = i;
            break;
          }
        }
        if (redirectIndex === -1) {
          for (let i = foundIndex + 1; i < _connectionHistory2.length; i++) {
            if (_connectionHistory2[i]?.hasScreenshot && _connectionHistory2[i]?.screenshot) {
              redirectIndex = i;
              break;
            }
          }
        }
        clearInterval(screenshotUpdateInterval);
        document.removeEventListener("keydown", handleKeyDown);
        modalElement.remove();
        if (redirectIndex !== -1) {
          const nextEntry = _connectionHistory2[redirectIndex];
          showScreenshot(nextEntry.screenshot, nextEntry, redirectIndex);
        }
        return;
      }
      if (currentIndex !== foundIndex) {
        currentIndex = foundIndex;
      }
      updateArrows();
    }, 1e3);
    modalElement.addEventListener("click", (e) => {
      if (e.target === modalElement) {
        clearInterval(screenshotUpdateInterval);
        document.removeEventListener("keydown", handleKeyDown);
        modalElement.remove();
      }
    });
    if (blockUserBtn) {
      blockUserBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        const bannedUsers = _getBannedUsers2();
        const isAlreadyBanned = bannedUsers.some((user) => user.ip === entry.ip);
        if (isAlreadyBanned) {
          return;
        }
        bannedUsers.push({
          ip: entry.ip,
          info,
          timestamp: entry.timestamp,
          screenshot,
          note: ""
        });
        _saveBannedUsers2(bannedUsers);
        const modal = document.getElementById("screenshotModal");
        if (modal) {
          document.removeEventListener("keydown", handleKeyDown);
          modal.remove();
        }
      });
    }
    const downloadBtn = document.getElementById("downloadScreenshotBtn");
    if (downloadBtn) {
      downloadBtn.addEventListener("click", function(e) {
        e.stopPropagation();
        e.preventDefault();
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);
          const logoUrl = _isUmingle ? "https://i.ibb.co/xS4xFRrS/Frame.png" : "https://i.ibb.co/KcvKXzxK/logo.png";
          const chilltoolsLogoUrl = "https://i.ibb.co/zTS0gP0G/logo-chilltools.png";
          let logosProcessed = 0;
          const processLogos = () => {
            logosProcessed++;
            if (logosProcessed === 2) {
              canvas.toBlob(function(blob) {
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                const randomId = Math.floor(1e9 + Math.random() * 9e9);
                const fileName = `chilltools_${entry.ip}_${randomId}.png`;
                link.download = fileName;
                link.setAttribute("data-author", "chilltool's");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
              }, "image/png");
            }
          };
          const logo = new Image();
          logo.crossOrigin = "anonymous";
          logo.onload = function() {
            try {
              const logoWidth = Math.min(img.width * 0.35, 180);
              const logoHeight = logoWidth / logo.width * logo.height;
              const logoX = 10;
              const logoY = img.height - logoHeight - 10;
              ctx.globalAlpha = 0.6;
              ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight);
              ctx.globalAlpha = 1;
            } catch (e2) {
              console.log("Logo draw failed");
            }
            processLogos();
          };
          logo.onerror = processLogos;
          logo.src = logoUrl;
          const chilltoolsLogo = new Image();
          chilltoolsLogo.crossOrigin = "anonymous";
          chilltoolsLogo.onload = function() {
            try {
              const chillLogoWidth = Math.min(img.width * 0.08, 50);
              const chillLogoHeight = chillLogoWidth / chilltoolsLogo.width * chilltoolsLogo.height;
              const chillLogoX = img.width - chillLogoWidth - 10;
              const chillLogoY = img.height - chillLogoHeight - 10;
              ctx.globalAlpha = 0.6;
              ctx.drawImage(chilltoolsLogo, chillLogoX, chillLogoY, chillLogoWidth, chillLogoHeight);
              ctx.globalAlpha = 1;
            } catch (e2) {
              console.log("ChillTools logo draw failed");
            }
            processLogos();
          };
          chilltoolsLogo.onerror = processLogos;
          chilltoolsLogo.src = chilltoolsLogoUrl;
        };
        img.crossOrigin = "anonymous";
        img.src = screenshot;
      });
    }
  }

  // src/ui/modals/info-without-screenshot.js
  var _getLang10 = () => "en";
  var _translations9 = {};
  var _insertAdjacentHTMLToBody8 = () => {
  };
  function setDeps9(deps) {
    if (deps.getLang)
      _getLang10 = deps.getLang;
    if (deps.translations)
      _translations9 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody8 = deps.insertAdjacentHTMLToBody;
  }
  function showInfoWithoutScreenshot(entry) {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar)
      toolbar.classList.add("chill-blur");
    const lang = _getLang10();
    const t = _translations9[lang];
    const info = entry.info || {};
    const modalHTML = `
    <div id="infoModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #1a1a1a; border-radius: 10px; width: 90%; max-width: 500px; padding: 20px; box-shadow: 0 5px 25px rgba(0,0,0,0.8); border: 1px solid #333;">
            <div class="history-text" style="color: white; margin-bottom: 15px;">
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.ip}:</span> <span style="user-select: all;">${escapeHtml(entry.ip)}</span></div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.time}:</span> ${escapeHtml(entry.timestamp)}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.city}:</span> ${escapeHtml(info.city) || "-"}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.region}:</span> ${escapeHtml(info.region) || "-"}</div>
                <div style="margin-bottom: 8px;"><span style="color: #4dabf7; font-weight: bold;">${t.country}:</span> ${escapeHtml(info.country) || "-"}</div>
                <div><span style="color: #4dabf7; font-weight: bold;">${t.coordinates}:</span> (${escapeHtml(info.latitude) || "-"}, ${escapeHtml(info.longitude) || "-"})</div>
            </div>
            <button onclick="document.getElementById('infoModal').remove()" style="background: #007bff; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer; width: 100%; transition: background 0.2s;" onmouseover="this.style.background='#0069d9'" onmouseout="this.style.background='#007bff'">
                <i class="fas fa-times"></i> ${t.close}
            </button>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody8("beforeend", modalHTML);
  }

  // src/ui/modals/userstyles.js
  var _getLang11 = () => "en";
  var _translations10 = {};
  var _insertAdjacentHTMLToBody9 = () => {
  };
  var _injectToHead3 = () => {
  };
  var _showNotification6 = () => {
  };
  var _predefinedStyles = {};
  var _showGalleryModal = () => {
  };
  function setDeps10(deps) {
    if (deps.getLang)
      _getLang11 = deps.getLang;
    if (deps.translations)
      _translations10 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody9 = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead)
      _injectToHead3 = deps.injectToHead;
    if (deps.showNotification)
      _showNotification6 = deps.showNotification;
    if (deps.predefinedStyles)
      _predefinedStyles = deps.predefinedStyles;
    if (deps.showGalleryModal)
      _showGalleryModal = deps.showGalleryModal;
  }
  function showUserStylesModal() {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar)
      toolbar.classList.add("chill-blur");
    const lang = _getLang11();
    const t = _translations10[lang];
    const savedCSS = localStorage.getItem("chilltool_userStyles") || "";
    const modalHTML = `
    <div id="userStylesModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 700px; max-height: 85vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #6610f2, #007bff); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-paint-brush"></i> ${t.userStyles}
                </h3>
                <button id="closeUserStylesBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
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
                " placeholder="/* ${t.customCSS} */
.example {
    color: #fff;
    background: #000;
}">${savedCSS}</textarea>

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
    _insertAdjacentHTMLToBody9("beforeend", modalHTML);
    document.getElementById("settingsModal").style.display = "none";
    document.getElementById("closeUserStylesBtn").onclick = function() {
      document.getElementById("userStylesModal").remove();
      document.getElementById("settingsModal").style.display = "flex";
    };
    document.getElementById("galleryUserStylesBtn").onclick = function() {
      _showGalleryModal();
    };
    document.getElementById("resetUserStylesBtn").onclick = function() {
      if (confirm("Are you sure you want to reset all custom styles?")) {
        localStorage.removeItem("chilltool_userStyles");
        document.getElementById("userStylesTextarea").value = "";
        const existingStyle = document.getElementById("chilltool-user-styles");
        if (existingStyle) {
          existingStyle.remove();
        }
        const settingsModal = document.getElementById("settingsModal");
        if (settingsModal) {
          const videoBorderBtn = document.getElementById("videoBorderBtn");
          if (videoBorderBtn) {
            videoBorderBtn.style.opacity = "1";
            videoBorderBtn.style.cursor = "pointer";
            videoBorderBtn.title = t.videoBorder || "Custom Color";
          }
        }
        _showNotification6("UserStyles", t.stylesReset, {
          type: "success",
          duration: 3e3
        });
      }
    };
    document.getElementById("saveUserStylesBtn").onclick = function() {
      const cssContent = document.getElementById("userStylesTextarea").value;
      localStorage.setItem("chilltool_userStyles", cssContent);
      let styleElement = document.getElementById("chilltool-user-styles");
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "chilltool-user-styles";
        _injectToHead3(styleElement);
      }
      styleElement.textContent = cssContent;
      if (cssContent.trim() !== "") {
        const rightBoxStyle = document.getElementById("rightBoxStyle");
        if (rightBoxStyle) {
          rightBoxStyle.remove();
        }
        localStorage.removeItem("videoBorderColor");
        document.cookie = "videoBorderColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      const settingsModal = document.getElementById("settingsModal");
      if (settingsModal && cssContent.trim() !== "") {
        const videoBorderBtn = document.getElementById("videoBorderBtn");
        if (videoBorderBtn) {
          videoBorderBtn.style.opacity = "0.5";
          videoBorderBtn.style.cursor = "not-allowed";
          videoBorderBtn.title = t.userStyleActive;
        }
      }
      _showNotification6("UserStyles", t.stylesSaved, {
        type: "success",
        duration: 3e3
      });
    };
    document.addEventListener("keydown", function escHandler(e) {
      if (e.key === "Escape") {
        const modal = document.getElementById("userStylesModal");
        if (modal) {
          modal.remove();
          document.getElementById("settingsModal").style.display = "flex";
          document.removeEventListener("keydown", escHandler);
        }
      }
    });
  }

  // src/ui/modals/gallery.js
  var _getLang12 = () => "en";
  var _translations11 = {};
  var _insertAdjacentHTMLToBody10 = () => {
  };
  var _injectToHead4 = () => {
  };
  var _showNotification7 = () => {
  };
  var _predefinedStyles2 = {};
  function setDeps11(deps) {
    if (deps.getLang)
      _getLang12 = deps.getLang;
    if (deps.translations)
      _translations11 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody10 = deps.insertAdjacentHTMLToBody;
    if (deps.injectToHead)
      _injectToHead4 = deps.injectToHead;
    if (deps.showNotification)
      _showNotification7 = deps.showNotification;
    if (deps.predefinedStyles)
      _predefinedStyles2 = deps.predefinedStyles;
  }
  function getStylePreview(styleKey) {
    const previews = {
      darkMode: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      fstool: "linear-gradient(135deg,rgb(99, 0, 0) 0%, #1a1a1a 100%)",
      omegle: "linear-gradient(135deg, #007aff 0%, #339cff 100%)"
    };
    return previews[styleKey] || "#0a0a0b";
  }
  function showGalleryModal() {
    const lang = _getLang12();
    const t = _translations11[lang];
    const galleryHTML = `
    <div id="galleryModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(5px); z-index: 10001; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 900px; max-height: 85vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #6610f2, #007bff); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-images"></i> ${t.gallery}
                </h3>
                <button id="closeGalleryBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
            </div>
            <div style="padding: 20px; overflow-y: auto; flex-grow: 1;">
                <div style="color: #ddd; margin-bottom: 20px; font-size: 14px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    ${t.galleryDesc}
                </div>

                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 15px;">
                    ${Object.keys(_predefinedStyles2).map((styleKey) => {
      const style = _predefinedStyles2[styleKey];
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
    }).join("")}
                </div>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody10("beforeend", galleryHTML);
    const userStylesModal = document.getElementById("userStylesModal");
    if (userStylesModal)
      userStylesModal.style.display = "none";
    document.querySelectorAll(".gallery-item").forEach((item) => {
      item.addEventListener("mouseenter", function() {
        this.style.borderColor = "#007bff";
        this.style.transform = "translateY(-5px)";
        this.style.boxShadow = "0 10px 30px rgba(0,123,255,0.3)";
      });
      item.addEventListener("mouseleave", function() {
        this.style.borderColor = "#333";
        this.style.transform = "translateY(0)";
        this.style.boxShadow = "none";
      });
    });
    document.querySelectorAll(".apply-style-btn").forEach((btn) => {
      btn.addEventListener("click", function(e) {
        e.stopPropagation();
        const styleKey = this.getAttribute("data-style");
        const style = _predefinedStyles2[styleKey];
        const textarea = document.getElementById("userStylesTextarea");
        if (textarea) {
          textarea.value = style.css;
        }
        localStorage.setItem("chilltool_userStyles", style.css);
        let styleElement = document.getElementById("chilltool-user-styles");
        if (!styleElement) {
          styleElement = document.createElement("style");
          styleElement.id = "chilltool-user-styles";
          _injectToHead4(styleElement);
        }
        styleElement.textContent = style.css;
        const rightBoxStyle = document.getElementById("rightBoxStyle");
        if (rightBoxStyle) {
          rightBoxStyle.remove();
        }
        localStorage.removeItem("videoBorderColor");
        document.cookie = "videoBorderColor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        const settingsModal = document.getElementById("settingsModal");
        if (settingsModal) {
          const videoBorderBtn = document.getElementById("videoBorderBtn");
          if (videoBorderBtn) {
            videoBorderBtn.style.opacity = "0.5";
            videoBorderBtn.style.cursor = "not-allowed";
            videoBorderBtn.title = t.userStyleActive;
          }
        }
        _showNotification7("UserStyles", `${t[style.name]} ${t.styleApplied}`, {
          type: "success",
          duration: 3e3
        });
        document.getElementById("galleryModal").remove();
        const usm1 = document.getElementById("userStylesModal");
        if (usm1)
          usm1.style.display = "flex";
      });
    });
    document.getElementById("closeGalleryBtn").onclick = function() {
      document.getElementById("galleryModal").remove();
      const usm2 = document.getElementById("userStylesModal");
      if (usm2)
        usm2.style.display = "flex";
    };
    document.addEventListener("keydown", function escGalleryHandler(e) {
      if (e.key === "Escape") {
        const modal = document.getElementById("galleryModal");
        if (modal) {
          modal.remove();
          const usm3 = document.getElementById("userStylesModal");
          if (usm3)
            usm3.style.display = "flex";
          document.removeEventListener("keydown", escGalleryHandler);
        }
      }
    });
  }

  // src/ui/modals/statistics.js
  var _getLang13 = () => "en";
  var _translations12 = {};
  var _insertAdjacentHTMLToBody11 = () => {
  };
  var _formatTime = () => "00:00:00";
  var _getTimeElapsed = () => 0;
  var _getPeopleCount = () => 0;
  var _getSkipCount = () => 0;
  var _showCountryLeaderboard = () => {
  };
  function setDeps12(deps) {
    if (deps.getLang)
      _getLang13 = deps.getLang;
    if (deps.translations)
      _translations12 = deps.translations;
    if (deps.insertAdjacentHTMLToBody)
      _insertAdjacentHTMLToBody11 = deps.insertAdjacentHTMLToBody;
    if (deps.formatTime)
      _formatTime = deps.formatTime;
    if (deps.getTimeElapsed)
      _getTimeElapsed = deps.getTimeElapsed;
    if (deps.getPeopleCount)
      _getPeopleCount = deps.getPeopleCount;
    if (deps.getSkipCount)
      _getSkipCount = deps.getSkipCount;
    if (deps.showCountryLeaderboard)
      _showCountryLeaderboard = deps.showCountryLeaderboard;
  }
  function showStatistics() {
    const lang = _getLang13();
    const t = _translations12[lang];
    const statsHTML = `
    <div id="statisticsModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 500px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #8e2de2, #4a00e0); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-chart-pie"></i> ${t.statisticsTitle}
                </h3>
                <button id="closeStatisticsBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">\xD7</button>
            </div>
            <div style="padding: 20px; overflow-y: auto; flex-grow: 1;">
                <div style="background: rgba(255,255,255,0.05); border-radius: 8px; padding: 15px; margin-bottom: 15px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="color: #aaa;"><i class="fas fa-clock"></i> ${t.totalTimeSpent}:</span>
                        <span style="color: #fff; font-weight: bold;" id="totalTimeStat">${_formatTime(_getTimeElapsed())}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                        <span style="color: #aaa;"><i class="fas fa-users"></i> ${t.peopleEncountered}:</span>
                        <span style="color: #fff; font-weight: bold;" id="peopleCountStat">${_getPeopleCount()}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 5px;">
                            <span style="color: #aaa;"><i class="fas fa-forward"></i> ${t.skips}:</span>
                            <i class="fas fa-info-circle" style="color: #666; cursor: help; font-size: 0.9em;" title="This is the amount of times that you clicked the skip button"></i>
                        </div>
                        <span style="color: #fff; font-weight: bold;" id="skipCountStat">${_getSkipCount()}</span>
                    </div>
                </div>

                <button id="openCountryLeaderboardBtn" style="width: 100%; background: #17a2b8; color: white; border: none; border-radius: 8px; padding: 12px 14px; cursor: pointer; font-weight: 700;">
                    <i class="fas fa-globe"></i> ${t && (t.countryLeaderboardBtn || _translations12.en && _translations12.en.countryLeaderboardBtn) || "Country leaderboard"}
                </button>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;
    _insertAdjacentHTMLToBody11("beforeend", statsHTML);
    const closeModal = function() {
      clearInterval(timeUpdateInterval);
      clearInterval(statsUpdateInterval);
      const modal = document.getElementById("statisticsModal");
      if (modal)
        modal.remove();
    };
    document.getElementById("closeStatisticsBtn").onclick = closeModal;
    document.getElementById("statisticsModal").onclick = function(e) {
      if (e.target === this)
        closeModal();
    };
    const leaderboardBtn = document.getElementById("openCountryLeaderboardBtn");
    if (leaderboardBtn) {
      leaderboardBtn.onclick = function() {
        _showCountryLeaderboard();
      };
    }
    const timeUpdateInterval = setInterval(() => {
      const timeElement = document.getElementById("totalTimeStat");
      if (timeElement) {
        timeElement.textContent = _formatTime(_getTimeElapsed());
      }
    }, 1e3);
    const statsUpdateInterval = setInterval(() => {
      const skipCountElement = document.getElementById("skipCountStat");
      const peopleCountElement = document.getElementById("peopleCountStat");
      if (skipCountElement) {
        skipCountElement.textContent = _getSkipCount();
      }
      if (peopleCountElement) {
        peopleCountElement.textContent = _getPeopleCount();
      }
      if (!document.getElementById("statisticsModal")) {
        clearInterval(timeUpdateInterval);
        clearInterval(statsUpdateInterval);
      }
    }, 500);
  }

  // src/ui/modals/tos.js
  var _getLang14 = () => "en";
  var _translations13 = {};
  var _injectToBody = () => {
  };
  function setDeps13(deps) {
    if (deps.getLang)
      _getLang14 = deps.getLang;
    if (deps.translations)
      _translations13 = deps.translations;
    if (deps.injectToBody)
      _injectToBody = deps.injectToBody;
  }
  function showTosModal() {
    const toolbar = document.getElementById("chillToolbar");
    if (toolbar)
      toolbar.classList.add("chill-blur");
    const lang = _getLang14();
    const t = _translations13[lang];
    const modal = document.createElement("div");
    modal.id = "tosModal";
    modal.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;";
    modal.innerHTML = `
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 500px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #007bff, #6610f2); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-file-contract"></i> ${t.termsOfService || "Terms of Service"}
                </h3>
            </div>
            <div style="padding: 25px; overflow-y: auto; flex-grow: 1; min-height: 120px; color: #eee; font-size: 16px; line-height: 1.7;">
                <p style="margin: 0; font-size: 16px;">${t.usingExtensionTos || `By using the Extension "ChillTool's" you automatically accept the`} <a href="https://chilltools.it/tos/" target="_blank" style="color: #4CAF50; text-decoration: underline; font-weight: 500;">${t.termsOfService || "Terms of Service"}</a>.</p>
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
                    ${t.accept || "I Accept"}
                </button>
            </div>
        </div>
    `;
    _injectToBody(modal);
    document.getElementById("acceptTos").addEventListener("click", function() {
      localStorage.setItem("tosAccepted", "true");
      modal.remove();
    });
    modal.addEventListener("click", function(e) {
      if (e.target === modal) {
        e.stopPropagation();
      }
    });
  }

  // src/ui/modals/review-prompt.js
  var REVIEW_URL = "https://chromewebstore.google.com/detail/pdkdjcijjkhhkfdfbdgdfdgobnliphjd/reviews";
  var REVIEW_SNOOZE_MS = 30 * 24 * 60 * 60 * 1e3;
  var _getTimeElapsed2 = () => 0;
  var _getLang15 = () => localStorage.getItem("chilltool_lang") || "en";
  function setGetTimeElapsed(fn) {
    _getTimeElapsed2 = fn;
  }
  function setGetLang(fn) {
    _getLang15 = fn;
  }
  function showReviewPrompt() {
    if (document.getElementById("reviewModal"))
      return;
    const overlay = document.createElement("div");
    overlay.id = "reviewModal";
    overlay.style.position = "fixed";
    overlay.style.inset = "0";
    overlay.style.background = "rgba(0,0,0,0.6)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "10001";
    const box = document.createElement("div");
    box.style.maxWidth = "560px";
    box.style.width = "90%";
    box.style.background = "#111";
    box.style.color = "#fff";
    box.style.border = "1px solid #333";
    box.style.borderRadius = "12px";
    box.style.boxShadow = "0 10px 30px rgba(0,0,0,0.4)";
    box.style.padding = "24px";
    box.style.fontFamily = "Arial, sans-serif";
    box.style.textAlign = "center";
    const title = document.createElement("div");
    title.style.fontSize = "24px";
    title.style.fontWeight = "600";
    title.style.marginBottom = "12px";
    const lang = _getLang15();
    const t = translations_default[lang] || translations_default.en;
    title.textContent = t.reviewTitle || "Enjoying ChillTool's?";
    const body = document.createElement("div");
    body.style.fontSize = "16px";
    body.style.color = "#ddd";
    body.style.marginBottom = "18px";
    body.textContent = t.reviewBody || "If you like it, please leave a 5-star review. It helps a lot!";
    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "12px";
    btnRow.style.justifyContent = "center";
    const later = document.createElement("button");
    later.type = "button";
    later.textContent = t.reviewLater || "Maybe later";
    later.style.padding = "12px 18px";
    later.style.borderRadius = "10px";
    later.style.border = "1px solid #444";
    later.style.background = "#222";
    later.style.color = "#fff";
    later.style.cursor = "pointer";
    later.style.fontSize = "15px";
    const ok = document.createElement("button");
    ok.type = "button";
    ok.textContent = t.reviewOk || "OK";
    ok.style.padding = "12px 18px";
    ok.style.borderRadius = "10px";
    ok.style.border = "0";
    ok.style.background = "#2563eb";
    ok.style.color = "#fff";
    ok.style.cursor = "pointer";
    ok.style.fontSize = "15px";
    btnRow.append(later, ok);
    box.append(title, body, btnRow);
    overlay.append(box);
    document.body.append(overlay);
    later.addEventListener("click", () => {
      localStorage.setItem("reviewPromptSnoozeUntil", String(Date.now() + REVIEW_SNOOZE_MS));
      overlay.remove();
    });
    ok.addEventListener("click", () => {
      localStorage.setItem("reviewLeft", "true");
      overlay.remove();
      if (window.chrome && chrome.tabs && chrome.tabs.create) {
        chrome.tabs.create({ url: REVIEW_URL });
      } else {
        window.open(REVIEW_URL, "_blank", "noopener");
      }
    });
  }
  function checkAndMaybePromptReview() {
    if (localStorage.getItem("reviewLeft") === "true")
      return;
    const snoozeUntil = parseInt(localStorage.getItem("reviewPromptSnoozeUntil") || "0", 10);
    if (Date.now() < snoozeUntil)
      return;
    const totalSeconds = _getTimeElapsed2();
    if (totalSeconds >= 3600) {
      showReviewPrompt();
    }
  }

  // src/ui/theme/dark-light.js
  function checkBackgroundColor() {
    const chatContainer = document.querySelector(".chat-container") || document.querySelector(".chatWindow") || document.body;
    const bgColor = window.getComputedStyle(chatContainer).backgroundColor;
    const rgb = bgColor.match(/\d+/g);
    const isLight = chatContainer.classList.contains("theme-light") || bgColor.includes("255, 255, 255") || bgColor.includes("255,255,255") || bgColor.includes("#fff") || bgColor.includes("#ffffff") || rgb && rgb.length >= 3 && parseInt(rgb[0]) > 200 && parseInt(rgb[1]) > 200 && parseInt(rgb[2]) > 200;
    const elementsToStyle = document.querySelectorAll("#ipDisplayBox, #ipDisplayBox *, #historyModal, #screenshotModal, .history-entry");
    elementsToStyle.forEach((el) => {
      if (isLight) {
        el.classList.add("chilltool-light-mode");
        if (el.id === "ipDisplayBox" || el.closest("#ipDisplayBox")) {
          el.classList.add("chilltool-dark-text");
        }
      } else {
        el.classList.remove("chilltool-light-mode");
        el.classList.remove("chilltool-dark-text");
      }
    });
    document.querySelectorAll("#chillToolbar button, #closeHistory, #settingsModal button").forEach((btn) => {
      if (isLight) {
        btn.classList.add("chilltool-light-mode-btn");
      } else {
        btn.classList.remove("chilltool-light-mode-btn");
      }
    });
  }
  function setupBackgroundObserver() {
    const targetNode = document.querySelector(".chat-container") || document.querySelector(".chatWindow") || document.body;
    if (!targetNode)
      return;
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && (mutation.attributeName === "style" || mutation.attributeName === "class")) {
          checkBackgroundColor();
        }
      });
    });
    observer.observe(targetNode, {
      attributes: true,
      attributeFilter: ["style", "class"],
      subtree: true
    });
    checkBackgroundColor();
    setInterval(checkBackgroundColor, 1e3);
  }
  function getChatBoxColor() {
    const textBox = document.querySelector(".chatWindow") || document.querySelector(".chat-container");
    return textBox ? window.getComputedStyle(textBox).backgroundColor : "#000";
  }

  // src/ui/theme/userstyles-data.js
  var predefinedStyles = {
    darkMode: {
      name: "darkMode",
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
      name: "fstool",
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
      name: "omegle",
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
  var userstyles_data_default = predefinedStyles;

  // src/features/ip-display.js
  var _getChatBoxColor = () => "#333";
  var _checkBackgroundColor = () => {
  };
  function setDeps14(deps) {
    _getChatBoxColor = deps.getChatBoxColor;
    _checkBackgroundColor = deps.checkBackgroundColor;
  }
  var getLocation = async (ip) => {
    const url = `https://get.geojs.io/v1/ip/geo/${ip}.json`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      return {
        ip,
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
    if (isSaveButtonChoiceEnabled) {
      const savedIpDisplay = localStorage.getItem("ipDisplayEnabled");
      if (savedIpDisplay !== null) {
        setIsIpDisplayEnabled(savedIpDisplay === "true");
      }
    }
    const isIpDisplayEnabled = getIsIpDisplayEnabled();
    if (!ipBox) {
      const countryInfoDiv = document.querySelector(".countryInfo");
      const chatContainer = document.querySelector(".chat-container") || document.querySelector(".chatWindow");
      if (!chatContainer)
        return null;
      ipBox = document.createElement("div");
      ipBox.id = "ipDisplayBox";
      ipBox.style.backgroundColor = _getChatBoxColor();
      ipBox.style.padding = "10px";
      ipBox.style.marginTop = "10px";
      ipBox.style.color = "#fff";
      ipBox.style.fontSize = "14px";
      ipBox.style.maxHeight = "200px";
      ipBox.style.overflowY = "auto";
      ipBox.style.overflowX = "hidden";
      ipBox.style.borderRadius = "10px";
      ipBox.style.border = "1px solid #333";
      ipBox.style.display = isIpDisplayEnabled ? "block" : "none";
      ipBox.style.overflow = "hidden";
      ipBox.style.flexShrink = "0";
      ipBox.innerHTML = "<h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>";
      if (countryInfoDiv && countryInfoDiv.parentNode) {
        countryInfoDiv.parentNode.insertBefore(ipBox, countryInfoDiv.nextSibling);
      } else {
        chatContainer.appendChild(ipBox);
      }
      setTimeout(_checkBackgroundColor, 100);
    }
    return ipBox;
  }

  // src/features/screenshot.js
  var currentSession = { ip: null, screenshot: null, info: {} };
  var connectionHistory = [];
  var MAX_SCREENSHOTS = 50;
  function captureAndStoreScreenshot(videoElement, ip) {
    let retryCount = 0;
    const MAX_RETRIES = 5;
    const captureFrame = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext("2d");
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        if (currentSession.ip === ip) {
          const screenshot = canvas.toDataURL("image/png");
          currentSession.screenshot = screenshot;
          const existingIndex = connectionHistory.findIndex((item) => item.ip === ip);
          if (existingIndex === -1) {
            const historyEntry = {
              ip,
              info: currentSession.info,
              screenshot,
              timestamp: (/* @__PURE__ */ new Date()).toLocaleString(),
              hasScreenshot: true
            };
            connectionHistory.unshift(historyEntry);
            if (connectionHistory.length > MAX_SCREENSHOTS) {
              const oldestWithScreenshot = connectionHistory.findLastIndex((item) => item.hasScreenshot);
              if (oldestWithScreenshot !== -1) {
                connectionHistory[oldestWithScreenshot].hasScreenshot = false;
                connectionHistory[oldestWithScreenshot].screenshot = null;
              }
            }
            console.log("Added to history:", ip);
          } else {
            if (existingIndex < MAX_SCREENSHOTS) {
              connectionHistory[existingIndex].screenshot = screenshot;
              connectionHistory[existingIndex].timestamp = (/* @__PURE__ */ new Date()).toLocaleString();
              console.log("Updated existing history entry:", ip);
            }
          }
        }
      } catch (error) {
        console.error("Error capturing screenshot:", error);
        retryCount++;
        if (retryCount < MAX_RETRIES) {
          setTimeout(captureFrame, 500);
        }
      }
    };
    if (videoElement.readyState >= 2) {
      captureFrame();
    } else {
      videoElement.addEventListener("loadeddata", captureFrame, { once: true });
    }
  }

  // src/features/people-counter.js
  function getPeopleCount() {
    return parseInt(localStorage.getItem("peopleCount") || "0");
  }
  function incrementPeopleCount() {
    const count = getPeopleCount() + 1;
    localStorage.setItem("peopleCount", count.toString());
    return count;
  }
  function updatePeopleCounter() {
    const counterElement = document.getElementById("peopleCounterValue");
    if (counterElement) {
      counterElement.textContent = getPeopleCount();
    }
  }

  // src/features/country-leaderboard.js
  var COUNTRY_LEADERBOARD_STORAGE_KEY2 = "countryLeaderboardCounts";
  var lastCountryCountedIP = null;
  var currentStreakCountry = null;
  var currentStreakCount = 0;
  function safeJsonParse(value, fallback) {
    try {
      if (value == null)
        return fallback;
      return JSON.parse(value);
    } catch (_) {
      return fallback;
    }
  }
  function normalizeCountryKey(countryName) {
    if (!countryName)
      return null;
    const s = String(countryName).trim();
    if (!s)
      return null;
    return s;
  }
  function getCountryCounts() {
    const raw = localStorage.getItem(COUNTRY_LEADERBOARD_STORAGE_KEY2);
    const parsed = safeJsonParse(raw, {});
    if (!parsed || typeof parsed !== "object")
      return {};
    return parsed;
  }
  function setCountryCounts(counts) {
    if (!counts || typeof counts !== "object")
      return;
    localStorage.setItem(COUNTRY_LEADERBOARD_STORAGE_KEY2, JSON.stringify(counts));
  }
  function incrementCountryCount(countryName) {
    const key = normalizeCountryKey(countryName);
    if (!key)
      return;
    const counts = getCountryCounts();
    const current = parseInt(counts[key] || "0", 10) || 0;
    counts[key] = current + 1;
    setCountryCounts(counts);
  }
  function getPartnerCountryFromDom() {
    try {
      const el = document.getElementById("countryName");
      if (!el)
        return null;
      const name = (el.textContent || "").trim();
      return name || null;
    } catch (_) {
      return null;
    }
  }
  function incrementLeaderboardForCurrentPartner(ip, fallbackCountryName) {
    if (!ip)
      return;
    if (lastCountryCountedIP === ip)
      return;
    const fromDom = getPartnerCountryFromDom();
    const countryToUse = fromDom || fallbackCountryName;
    if (!countryToUse)
      return;
    incrementCountryCount(countryToUse);
    lastCountryCountedIP = ip;
  }
  function updateCountryStreak(country) {
    if (!country || country === "N/A")
      return;
    if (country === currentStreakCountry) {
      currentStreakCount++;
    } else {
      currentStreakCountry = country;
      currentStreakCount = 1;
    }
  }
  function getStreakBadgeHtml() {
    if (currentStreakCount < 3)
      return "";
    const emoji = currentStreakCount >= 10 ? "\u{1F525}" : currentStreakCount >= 5 ? "\u26A1" : "\u{1F501}";
    return `<span style="
        display: inline-block;
        margin-left: 8px;
        background: linear-gradient(to right, #f7971e, #ffd200);
        color: #000;
        font-size: 11px;
        font-weight: 800;
        padding: 2px 7px;
        border-radius: 10px;
        vertical-align: middle;
        text-shadow: none;
        box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    ">${emoji} x${currentStreakCount}</span>`;
  }
  function getSortedCountryLeaderboard() {
    const counts = getCountryCounts();
    const entries = Object.entries(counts).map(([country, count]) => ({ country, count: parseInt(count, 10) || 0 })).filter((e) => e.country && e.count > 0).sort((a, b) => b.count - a.count || a.country.localeCompare(b.country));
    const total = entries.reduce((sum, e) => sum + e.count, 0);
    return { entries, total };
  }
  function resetLeaderboardDedup() {
    lastCountryCountedIP = null;
  }

  // src/features/ip-handler.js
  var _getLang16 = () => "en";
  var _translations14 = {};
  var _doubleSkipButton = () => {
  };
  var _getSelectedCountries = () => [];
  var _showNotification8 = () => {
  };
  function setDeps15(deps) {
    if (deps.getLang)
      _getLang16 = deps.getLang;
    if (deps.translations)
      _translations14 = deps.translations;
    if (deps.doubleSkipButton)
      _doubleSkipButton = deps.doubleSkipButton;
    if (deps.getSelectedCountries)
      _getSelectedCountries = deps.getSelectedCountries;
    if (deps.showNotification)
      _showNotification8 = deps.showNotification;
  }
  var lastHandledIP = null;
  var isHandlingIP = false;
  var callStartTime = null;
  var timerInterval = null;
  async function handleNewIP(ip) {
    if (!ip || lastHandledIP === ip)
      return;
    lastHandledIP = ip;
    const newCount = incrementPeopleCount();
    updatePeopleCounter();
    console.log(`Nuova connessione rilevata: ${ip} (Totale persone: ${newCount})`);
    const bannedUsers = getBannedUsers();
    if (bannedUsers.some((user) => user.ip === ip)) {
      console.log(`IP ${ip} \xE8 bannato. Simulazione tasto ESC.`);
      _doubleSkipButton();
      setTimeout(() => {
        isHandlingIP = false;
      }, 1e3);
      return;
    }
    lastHandledIP = ip;
    console.log("New IP detected:", ip);
    currentSession.ip = ip;
    currentSession.info = null;
    currentSession.screenshot = null;
    const banBtn = document.getElementById("chillBanBtn");
    if (banBtn)
      banBtn.disabled = false;
    const ipBox = getOrCreateIpBox();
    if (ipBox) {
      ipBox.style.display = getIsIpDisplayEnabled() ? "block" : "none";
    }
    const lang = _getLang16();
    const t = _translations14[lang];
    if (ipBox) {
      ipBox.innerHTML = `
        <h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>
        <div style="margin-bottom: 10px;">
            <span style="color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}: ${escapeHtml(ip)} - <i>${t.loading}</i></span>
        </div>
    `;
    }
    const locationInfo = await getLocation(ip);
    if (!locationInfo || currentSession.ip !== ip)
      return;
    currentSession.info = locationInfo;
    incrementLeaderboardForCurrentPartner(ip, locationInfo.country);
    updateCountryStreak(locationInfo.country);
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
    callStartTime = /* @__PURE__ */ new Date();
    const updateTimerDisplay = () => {
      if (!callStartTime)
        return "";
      const now = /* @__PURE__ */ new Date();
      const diffInSeconds = Math.floor((now - callStartTime) / 1e3);
      const hours = Math.floor(diffInSeconds / 3600);
      const minutes = Math.floor(diffInSeconds % 3600 / 60);
      const seconds = diffInSeconds % 60;
      let timeString = "";
      if (hours > 0) {
        timeString = `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      } else {
        timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;
      }
      const timerElement = document.getElementById("callTimer");
      if (timerElement) {
        timerElement.textContent = timeString;
      }
      return timeString;
    };
    const initialTime = updateTimerDisplay();
    timerInterval = setInterval(updateTimerDisplay, 1e3);
    if (ipBox) {
      ipBox.innerHTML = `
            <h3 style='color: #fff; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; margin: 0 0 10px 0;'>ChillTool's</h3>
            <div style="color: #fff; margin-bottom: 15px;">
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.ip}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.ip)}</span> <span id="copyIpBtn" title="Copy IP" style="cursor:pointer; margin-left:6px; opacity:0.8; font-size:11px; user-select:none; background: rgba(128,128,128,0.15); border: 1px solid rgba(128,128,128,0.4); border-radius: 4px; padding: 1px 5px; vertical-align: middle; transition: background 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2);" onmouseover="this.style.background='rgba(128,128,128,0.3)'" onmouseout="this.style.background='rgba(128,128,128,0.15)'" onclick="navigator.clipboard.writeText('${escapeHtml(locationInfo.ip)}').then(()=>{ this.textContent='\u2705'; setTimeout(()=>{ this.textContent='\u{1F4CB}'; }, 1500); })">\u{1F4CB}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.city}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.city)}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.region}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.state)}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.country}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.country)}</span>${getStreakBadgeHtml()} <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">ISP:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${escapeHtml(locationInfo.organization)}</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">${t.coordinates}:</strong> <span style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">(${escapeHtml(locationInfo.latitude)}, ${escapeHtml(locationInfo.longitude)})</span> <br>
                <strong style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">Timer:</strong> <span id="callTimer" style="text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000; font-family: monospace;">${initialTime}</span>
            </div>
        `;
    }
    const videoElement = document.getElementById("remoteVideo");
    if (videoElement) {
      captureAndStoreScreenshot(videoElement, ip);
    }
    const disconnectObserver2 = new MutationObserver((mutations, obs) => {
      const disconnected = document.querySelector(".disconnected, .disconnected-container");
      if (disconnected && timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        callStartTime = null;
        obs.disconnect();
      }
    });
    disconnectObserver2.observe(document.documentElement, {
      childList: true,
      subtree: true
    });
    setTimeout(() => {
      const selectedCountries = _getSelectedCountries();
      if (selectedCountries.length > 0) {
        let partnerCountry = null;
        const countryNameDiv = document.getElementById("countryName");
        if (countryNameDiv && countryNameDiv.textContent) {
          partnerCountry = countryNameDiv.textContent.trim();
        }
        let countryMatch = selectedCountries.includes(partnerCountry);
        if (!countryMatch && (partnerCountry === "Eswatini" || partnerCountry === "Swaziland")) {
          countryMatch = selectedCountries.includes("Eswatini") || selectedCountries.includes("Swaziland");
        }
        if (partnerCountry && !countryMatch) {
          console.log(`Country ${partnerCountry} not in filter. Skipping...`);
          _doubleSkipButton();
        } else if (partnerCountry) {
          console.log(`Country ${partnerCountry} is in filter. Accepting connection.`);
        }
      } else {
        console.log("Country filter disabled - accepting all countries");
      }
    }, 369);
  }

  // src/features/skip-counter.js
  function getSkipCount() {
    return parseInt(localStorage.getItem("skipCount") || "0");
  }
  function incrementSkipCount() {
    const count = getSkipCount() + 1;
    localStorage.setItem("skipCount", count.toString());
    console.log("Skip count incremented to:", count);
    return count;
  }
  function setupSkipCounter() {
    let lastButtonState = null;
    const updateSkipCounter = () => {
      const skipButton2 = document.querySelector(".skipButton .mainText");
      if (!skipButton2)
        return;
      const currentState = skipButton2.textContent;
      if (lastButtonState !== null && lastButtonState !== currentState) {
        incrementSkipCount();
      }
      lastButtonState = currentState;
    };
    const skipButtonObserver = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "childList" || mutation.type === "characterData") {
          updateSkipCounter();
        }
      }
    });
    const skipButton = document.querySelector(".skipButton .mainText");
    if (skipButton) {
      lastButtonState = skipButton.textContent;
      skipButtonObserver.observe(skipButton, {
        childList: true,
        characterData: true,
        subtree: true
      });
    } else {
      const buttonObserver = new MutationObserver(() => {
        const skipButton2 = document.querySelector(".skipButton .mainText");
        if (skipButton2) {
          lastButtonState = skipButton2.textContent;
          skipButtonObserver.observe(skipButton2, {
            childList: true,
            characterData: true,
            subtree: true
          });
          buttonObserver.disconnect();
        }
      });
      buttonObserver.observe(document.documentElement, { childList: true, subtree: true });
    }
  }

  // src/features/version-check.js
  var _getLang17 = () => "en";
  function setGetLang2(fn) {
    _getLang17 = fn;
  }
  function compareVersions(a, b) {
    const pa = String(a).split(".").map((n) => parseInt(n, 10) || 0);
    const pb = String(b).split(".").map((n) => parseInt(n, 10) || 0);
    const len = Math.max(pa.length, pb.length);
    for (let i = 0; i < len; i++) {
      const x = pa[i] || 0;
      const y = pb[i] || 0;
      if (x > y)
        return 1;
      if (x < y)
        return -1;
    }
    return 0;
  }
  function showOutdatedToast() {
    const lang = _getLang17();
    const t = translations_default[lang] || translations_default.en;
    const msg = t.outdatedExtension || "Extension is outdated!";
    showNotification("ChillTools", msg, {
      type: "error",
      duration: 1e4,
      pulse: true,
      onClick: () => {
        window.open("https://github.com/ChillSpotIT/ChillTool-s", "_blank");
      }
    });
  }
  function showBetaTesterToast() {
    const lang = _getLang17();
    const t = translations_default[lang] || translations_default.en;
    const msg = t.betaWelcome || "Welcome Aboard, Beta Tester!";
    showNotification("ChillTools", msg, {
      type: "info",
      duration: 5e3,
      pulse: true
    });
  }
  async function checkOutdatedVersion() {
    try {
      const path = window.location && window.location.pathname ? window.location.pathname : "";
      if (!path || !path.startsWith("/video"))
        return;
      const res = await fetch("https://raw.githubusercontent.com/ChillSpotIT/ChillTool-s/refs/heads/version/version", { cache: "no-store" });
      if (!res.ok)
        return;
      const text = await res.text() || "";
      const latest = text.replace(/^\uFEFF/, "").replace(/^v/i, "").trim();
      const current = String(CURRENT_VERSION).trim();
      if (!latest)
        return;
      const cmp = compareVersions(current, latest);
      if (cmp === 0)
        return;
      if (cmp < 0) {
        showOutdatedToast();
      } else if (cmp > 0) {
        showBetaTesterToast();
      }
    } catch (e) {
    }
  }

  // src/timer/session-timer.js
  var isPausedDueToDisconnect = false;
  var _checkAndMaybePromptReview = () => {
  };
  function setReviewCheck(fn) {
    _checkAndMaybePromptReview = fn;
  }
  function checkDisconnectStatus() {
    const disconnectMessage = document.querySelector(".disconnectMessage");
    const isCurrentlyDisconnected = disconnectMessage !== null && disconnectMessage.textContent.includes("You have disconnected");
    if (isCurrentlyDisconnected && !isPausedDueToDisconnect) {
      localStorage.setItem("lastUpdateTime", Math.floor(Date.now() / 1e3).toString());
      isPausedDueToDisconnect = true;
    } else if (!isCurrentlyDisconnected && isPausedDueToDisconnect) {
      localStorage.setItem("lastUpdateTime", Math.floor(Date.now() / 1e3).toString());
      isPausedDueToDisconnect = false;
    }
  }
  var disconnectObserver = new MutationObserver(() => {
    checkDisconnectStatus();
  });
  disconnectObserver.observe(document.documentElement, { childList: true, subtree: true });
  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    return [
      hours.toString().padStart(2, "0"),
      minutes.toString().padStart(2, "0"),
      secs.toString().padStart(2, "0")
    ].join(":");
  }
  function getTimeElapsed() {
    return parseInt(localStorage.getItem("timeElapsed") || "0");
  }
  function updateTimeElapsed() {
    const currentTime = Math.floor(Date.now() / 1e3);
    const lastUpdate = parseInt(localStorage.getItem("lastUpdateTime") || currentTime);
    const timeDiff = currentTime - lastUpdate;
    const isVideoPage2 = window.location.pathname.includes("/video");
    const disconnectSelectors = [
      ".disconnectMessage",
      ".information",
      'div[style*="text-align: center"]',
      'div[class*="disconnect"]'
    ];
    let disconnectMessage = null;
    for (const selector of disconnectSelectors) {
      try {
        const elements = document.querySelectorAll(selector);
        for (const element of elements) {
          if (element && (element.textContent.includes("You have disconnected") || element.textContent.includes("disconnected"))) {
            disconnectMessage = element;
            break;
          }
        }
        if (disconnectMessage)
          break;
      } catch (e) {
      }
    }
    const startButton = document.querySelector(".bottomButton.new.outlined.skipButton.noSelect");
    const isInStartState = startButton && startButton.querySelector(".mainText")?.textContent === "Start";
    const shouldStopTimer = disconnectMessage !== null || isInStartState;
    if (isVideoPage2 && !shouldStopTimer && timeDiff > 0 && timeDiff < 600) {
      const newTime = getTimeElapsed() + timeDiff;
      localStorage.setItem("timeElapsed", newTime.toString());
    }
    localStorage.setItem("lastUpdateTime", currentTime.toString());
    const timeDisplay = document.getElementById("timeElapsedDisplay");
    if (timeDisplay) {
      const totalSeconds = getTimeElapsed();
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor(totalSeconds % 3600 / 60);
      const seconds = totalSeconds % 60;
      timeDisplay.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }
    _checkAndMaybePromptReview();
    return getTimeElapsed();
  }

  // src/timer/video-tab-timer.js
  var _isMobile4 = () => false;
  var _formatTime2 = (s) => "00:00:00";
  var _injectToBody2 = (el) => document.body.appendChild(el);
  function setDeps16(deps) {
    if (deps.isMobile)
      _isMobile4 = deps.isMobile;
    if (deps.formatTime)
      _formatTime2 = deps.formatTime;
    if (deps.injectToBody)
      _injectToBody2 = deps.injectToBody;
  }
  var videoTabTimerInterval = null;
  var videoTabOpenTimeMs = null;
  function createVideoTabTimerDisplay() {
    if (_isMobile4())
      return null;
    const existingTimer = document.getElementById("videoTabTimerContainer");
    if (existingTimer) {
      existingTimer.remove();
    }
    const timerContainer = document.createElement("div");
    timerContainer.id = "videoTabTimerContainer";
    timerContainer.style.position = "fixed";
    timerContainer.style.top = "15px";
    timerContainer.style.right = "15px";
    timerContainer.style.zIndex = "9999";
    timerContainer.style.padding = "8px 15px";
    timerContainer.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
    timerContainer.style.color = "white";
    timerContainer.style.borderRadius = "20px";
    timerContainer.style.fontFamily = "Arial, sans-serif";
    timerContainer.style.fontSize = "14px";
    timerContainer.style.fontWeight = "bold";
    timerContainer.style.display = "flex";
    timerContainer.style.alignItems = "center";
    timerContainer.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
    const icon = document.createElement("i");
    icon.className = "fas fa-clock";
    icon.style.marginRight = "5px";
    icon.style.fontSize = "16px";
    const timerDisplay = document.createElement("span");
    timerDisplay.id = "videoTabTimeElapsedDisplay";
    timerDisplay.textContent = "00:00:00";
    const infoIcon = document.createElement("i");
    infoIcon.className = "fas fa-info-circle";
    infoIcon.style.marginLeft = "8px";
    infoIcon.style.fontSize = "12px";
    infoIcon.style.opacity = "0.85";
    infoIcon.style.cursor = "help";
    infoIcon.title = "this is the time you have spent on this page only and resets when you refresh or close the page";
    timerContainer.appendChild(icon);
    timerContainer.appendChild(timerDisplay);
    timerContainer.appendChild(infoIcon);
    const chatWindow = document.querySelector(".chatWindow") || document.querySelector(".chat-container");
    if (chatWindow) {
      timerContainer.style.position = "absolute";
      timerContainer.style.top = "10px";
      timerContainer.style.right = "10px";
      chatWindow.style.position = "relative";
      chatWindow.prepend(timerContainer);
    } else {
      _injectToBody2(timerContainer);
    }
    return timerContainer;
  }
  function initVideoTabTimer() {
    if (_isMobile4())
      return;
    const isVideoPage2 = window.location.pathname.includes("/video");
    if (!isVideoPage2) {
      const existingTimer = document.getElementById("videoTabTimerContainer");
      if (existingTimer)
        existingTimer.remove();
      if (videoTabTimerInterval) {
        clearInterval(videoTabTimerInterval);
        videoTabTimerInterval = null;
      }
      videoTabOpenTimeMs = null;
      return;
    }
    videoTabOpenTimeMs = Date.now();
    createVideoTabTimerDisplay();
    const tick = () => {
      if (!window.location.pathname.includes("/video"))
        return;
      if (!videoTabOpenTimeMs)
        return;
      const elapsed = Math.max(0, Math.floor((Date.now() - videoTabOpenTimeMs) / 1e3));
      const timeDisplay = document.getElementById("videoTabTimeElapsedDisplay");
      if (timeDisplay) {
        timeDisplay.textContent = formatTime(elapsed);
      } else {
        createVideoTabTimerDisplay();
      }
    };
    if (videoTabTimerInterval) {
      clearInterval(videoTabTimerInterval);
    }
    videoTabTimerInterval = setInterval(tick, 1e3);
    tick();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initVideoTabTimer);
  } else {
    initVideoTabTimer();
  }

  // src/branding/logo.js
  var _isMobile5 = () => false;
  var _isUmingle2 = false;
  var _isUhmegle = false;
  var _baseUrl = "https://umingle.com";
  function setDeps17(deps) {
    if (deps.isMobile)
      _isMobile5 = deps.isMobile;
    if (deps.isUmingle !== void 0)
      _isUmingle2 = deps.isUmingle;
    if (deps.isUhmegle !== void 0)
      _isUhmegle = deps.isUhmegle;
    if (deps.baseUrl)
      _baseUrl = deps.baseUrl;
  }
  var addLogo = () => {
    const logo = document.createElement("img");
    logo.src = "https://i.ibb.co/jHzYHxz/Frame-53.png";
    logo.alt = "ChillSpot Logo";
    const rightBox = document.querySelector(".rightBox.outlined");
    const chatContainer = document.querySelector(".chatWindow");
    const container = rightBox || chatContainer;
    if (!container)
      return;
    container.style.position = "relative";
    if (_isMobile5()) {
      logo.style.position = "absolute";
      logo.style.top = "5px";
      logo.style.right = "5px";
      logo.style.width = "60px";
      container.appendChild(logo);
      const toolbar = document.getElementById("chillToolbar");
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
      logo.id = "chillLogo";
      const updateLogoPosition = () => {
        if (chatContainer) {
          const rect = chatContainer.getBoundingClientRect();
          logo.style.bottom = window.innerHeight - rect.bottom + 10 + "px";
          logo.style.right = window.innerWidth - rect.right + 10 + "px";
        }
      };
      updateLogoPosition();
      window.addEventListener("resize", updateLogoPosition);
      window.addEventListener("scroll", updateLogoPosition, true);
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
  var replaceLogo = () => {
    const logoBlock = document.querySelector(".logoBlock");
    if (logoBlock) {
      logoBlock.outerHTML = `
            <a href="${_baseUrl}" class="logoBlock" style="display: flex; align-items: center; text-decoration: none;">
                <img src="https://i.ibb.co/KcvKXzxK/logo.png"
                    style="height: 58px; width: auto; object-fit: contain; filter: drop-shadow(0 0 5px rgba(0,157,255,0.5))">
            </a>`;
    }
  };
  var replaceUmingle = () => {
    const logoLink = document.querySelector(".logoLink");
    if (logoLink && window.location.hostname.includes("umingle.com")) {
      logoLink.outerHTML = `
            <a href="${_baseUrl}" class="logoBlock" style="display: flex; align-items: center; text-decoration: none;">
                <img src="https://i.ibb.co/xS4xFRrS/Frame.png"
                    style="height: 58px; width: auto; object-fit: contain; filter: drop-shadow(0 0 5px rgba(0,157,255,0.5))">
            </a>`;
    } else if (logoLink && window.location.hostname.includes("uhmegle.com")) {
      replaceLogo();
    }
  };

  // src/main.js
  var translationsRef = translations_default;
  var currentLang = () => localStorage.getItem("chilltool_lang") || "en";
  setDeps({
    getLang: currentLang,
    translations: translationsRef,
    showSettings,
    displayHistory,
    displayBannedUsers,
    showCountryFilterModal,
    getBannedUsers,
    saveBannedUsers,
    currentSession,
    showNotification,
    updateModalBlockedChrome
  });
  var commonDeps = { getLang: currentLang, translations: translationsRef, showNotification, insertAdjacentHTMLToBody, unblurToolbar };
  setDeps3({
    ...commonDeps,
    injectToHead,
    showUserStylesModal,
    showTosModal,
    showStatistics,
    setIpDisplayPreference: () => {
    },
    getIpDisplayPreference: () => false,
    saveButtonChoice: () => {
    },
    updateButtonTitles: () => {
    },
    isMobile: isMobile2
  });
  setDeps4({ ...commonDeps, showScreenshot });
  setDeps5(commonDeps);
  setDeps6({ ...commonDeps, getSortedCountryLeaderboard, resetLeaderboardDedup });
  setDeps7({ ...commonDeps, showScreenshot, showInfoWithoutScreenshot, connectionHistory });
  setDeps8({
    ...commonDeps,
    connectionHistory,
    getBannedUsers,
    saveBannedUsers,
    isUmingle: window.location.hostname.includes("umingle")
  });
  setDeps9(commonDeps);
  setDeps10({ ...commonDeps, injectToHead, showGalleryModal });
  setDeps11({ ...commonDeps, injectToHead, predefinedStyles: userstyles_data_default });
  setDeps12({ ...commonDeps, formatTime, getTimeElapsed, getPeopleCount, getSkipCount, showCountryLeaderboard });
  setDeps13({ ...commonDeps, injectToBody });
  setDeps2(commonDeps);
  setGetTimeElapsed(getTimeElapsed);
  setGetLang(currentLang);
  setDeps14({ getChatBoxColor, checkBackgroundColor });
  setDeps15({ getLang: currentLang, translations: translationsRef, doubleSkipButton, getSelectedCountries, showNotification });
  setGetLang2(currentLang);
  setDeps17({
    isMobile: isMobile2,
    isUmingle: window.location.hostname.includes("umingle"),
    isUhmegle: window.location.hostname.includes("uhmegle"),
    baseUrl: window.location.hostname.includes("umingle") ? "https://umingle.com" : "https://uhmegle.com"
  });
  setReviewCheck(checkAndMaybePromptReview);
  setDeps16({ isMobile: isMobile2, formatTime, injectToBody });
  setIsMobile(isMobile2);
  injectCoreStyles();
  if (window.location.pathname.includes("/video")) {
    const savedColor = getCookie("videoBorderColor") || localStorage.getItem("videoBorderColor");
    if (savedColor) {
      const styleElement = document.createElement("style");
      styleElement.id = "rightBoxStyle";
      styleElement.textContent = `
            .dark-mode .rightBox, .dark-mode .bottomButton, .dark-mode header,
            .dark-mode .inputContainer textarea, .dark-mode .gif, .dark-mode .inputContainer {
                background-color: ${savedColor} !important;
                transition: background-color 0.3s ease;
            }
            .rightBox, .bottomButton, header, .inputContainer textarea, .gif, .inputContainer {
                background-color: ${savedColor} !important;
                transition: background-color 0.3s ease;
            }
        `;
      injectToHead(styleElement);
    }
  }
  (function loadFontAwesome() {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css";
    link.onerror = () => {
      link.href = "https://stackpath.bootstrapcdn.com/font-awesome/5.15.4/css/all.min.css";
    };
    injectToHead(link);
  })();
  var isUhmegle = window.location.hostname.includes("uhmegle");
  var isUmingle = window.location.hostname.includes("umingle");
  var baseUrl = isUmingle ? "https://umingle.com" : "https://uhmegle.com";
  if (window.location.pathname === "/" || window.location.pathname === "") {
    setTimeout(() => {
      showNotification(
        translations_default[currentLang()]?.switchToVideoModeTitle || "Switch to Video Mode",
        translations_default[currentLang()]?.switchToVideoModeMessage || "This extension only works in video mode",
        { type: "warning", duration: 8e3, onClick: () => {
          window.location.href = baseUrl + "/video";
        } }
      );
    }, 2e3);
  }
  if (window.location.pathname.includes("/text")) {
    setTimeout(() => {
      showNotification(
        translations_default[currentLang()]?.textModeNotSupportedTitle || "Text Mode Not Supported",
        translations_default[currentLang()]?.textModeNotSupportedMessage || "This extension only works in video mode",
        { type: "warning", duration: 8e3 }
      );
    }, 2e3);
  }
  window.addEventListener("chilltools-ip-found", (e) => {
    handleNewIP(e.detail.ip);
  });
  setupSkipCounter();
  var modalObserver = new MutationObserver(() => updateModalBlockedChrome());
  modalObserver.observe(document.documentElement, { childList: true, subtree: true });
  function init() {
    const pollForChat = setInterval(() => {
      const chatContainer = document.querySelector(".chat-container") || document.querySelector(".chatWindow");
      if (chatContainer) {
        clearInterval(pollForChat);
        checkBackgroundColor();
        createToolbar();
        addLogo();
        replaceLogo();
        replaceUmingle();
        setupBackgroundObserver();
        const savedStyles = localStorage.getItem("chilltool_userStyles");
        if (savedStyles) {
          const existing = document.getElementById("chilltool-user-styles");
          if (existing)
            existing.remove();
          const style = document.createElement("style");
          style.id = "chilltool-user-styles";
          style.textContent = savedStyles;
          injectToHead(style);
        }
      }
    }, 500);
  }
  function checkAndShowTos() {
    if (!localStorage.getItem("tosAccepted")) {
      showTosModal();
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      updateToolbarVisibility();
      init();
      checkAndShowTos();
    });
  } else {
    updateToolbarVisibility();
    init();
    checkAndShowTos();
  }
  if (!localStorage.getItem("lastUpdateTime")) {
    localStorage.setItem("lastUpdateTime", Math.floor(Date.now() / 1e3).toString());
  }
  setInterval(updateTimeElapsed, 1e3);
  updateTimeElapsed();
  document.addEventListener("click", function(e) {
    if (e.target && e.target.id === "showStatisticsBtn") {
      showStatistics();
    }
  });
  setTimeout(checkOutdatedVersion, 3e3);
  setTimeout(showWelcomeNotification, 1e3);
})();
