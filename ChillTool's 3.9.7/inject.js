(function () {
  const scriptUrls = [
    chrome.runtime.getURL("scripts/uhmegle.js"),
  ];

  const loadScript = (url) => {
    fetch(url)
      .then(r => r.text())
      .then(code => {
        const s = document.createElement('script');
        s.textContent = code;
        document.head.appendChild(s);
      });
  };

  scriptUrls.forEach(url => loadScript(url));
})();