import { isSaveButtonChoiceEnabled, getIsIpDisplayEnabled, setIsIpDisplayEnabled } from '../core/state.js';

let _getChatBoxColor = () => '#333';
let _checkBackgroundColor = () => {};

export function setDeps(deps) {
    _getChatBoxColor = deps.getChatBoxColor;
    _checkBackgroundColor = deps.checkBackgroundColor;
}

export const getLocation = async (ip) => {
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

export function getOrCreateIpBox() {
    let ipBox = document.getElementById("ipDisplayBox");

    if (isSaveButtonChoiceEnabled) {
        const savedIpDisplay = localStorage.getItem('ipDisplayEnabled');
        if (savedIpDisplay !== null) {
            setIsIpDisplayEnabled(savedIpDisplay === 'true');
        }
    }

    const isIpDisplayEnabled = getIsIpDisplayEnabled();

    if (!ipBox) {
        const countryInfoDiv = document.querySelector('.countryInfo');
        const chatContainer = document.querySelector('.chat-container') || document.querySelector('.chatWindow');

        if (!chatContainer) return null;

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
        ipBox.style.display = isIpDisplayEnabled ? 'block' : 'none';
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
