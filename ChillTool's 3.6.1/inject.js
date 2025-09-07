(function () {
  const scriptUrls = [
      chrome.runtime.getURL("scripts/uhmegle.js"),
      chrome.runtime.getURL("scripts/antip.js"),
      chrome.runtime.getURL("scripts/buttons.js")
  ];

  const loadScript = (url) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = url;
      scriptElement.type = "text/javascript";

      scriptElement.onload = () => {
          console.log(`Script ${url} successfully loaded and executed.`);
      };
      
      scriptElement.onerror = () => {
          console.error(`Error loading the script: ${url}`);
      };

      document.head.appendChild(scriptElement);
  };

  scriptUrls.forEach(url => loadScript(url));
})();
