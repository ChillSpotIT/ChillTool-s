(function() {
    'use strict';

    const seenIps = new Set();

    const emitIp = (ip) => {
        if (!ip || seenIps.has(ip)) {
            return;
        }

        seenIps.add(ip);
        window.dispatchEvent(new CustomEvent('chilltools-ip-found', { detail: { ip } }));
    };

    const OriginalRTCPeerConnection = window.RTCPeerConnection || window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
    if (OriginalRTCPeerConnection) {
        window.RTCPeerConnection = new Proxy(OriginalRTCPeerConnection, {
            construct(target, args) {
                const pc = new target(...args);
                const originalAddIceCandidate = pc.addIceCandidate;

                Object.defineProperty(pc, 'addIceCandidate', {
                    value: function(iceCandidate) {
                        if (iceCandidate && iceCandidate.candidate) {
                            const fields = iceCandidate.candidate.split(' ');
                            const ip = fields[4];

                            if (fields[7] === 'srflx') {
                                emitIp(ip);
                            }
                        }
                        return originalAddIceCandidate.apply(this, arguments);
                    },
                    enumerable: false,
                    configurable: true,
                    writable: true
                });

                return pc;
            }
        });
    }

    const originalSend = WebSocket.prototype.send;
    WebSocket.prototype.send = function(data) {
        let finalData = data;
        if (typeof data === 'string' && data.includes('"event":"findPeer"')) {
            try {
                const parsed = JSON.parse(data);
                if (parsed.description && parsed.description.sdp) {
                    let sdp = parsed.description.sdp;
                    const matches = sdp.matchAll(/^(n?s)=([a-z0-9]{5,})/gm);
                    let patched = false;
                    for (const match of matches) {
                        const prefix = match[1];
                        const salt = match[2];
                        const decoded = parseInt(salt, 36);
                        const vShift = (decoded % 1000000) % 17;
                        
                        if (vShift !== 5) {
                            const cleanSalt = (decoded - vShift + 5).toString(36);
                            const lineRegex = new RegExp("^" + prefix + "=" + salt, "m");
                            sdp = sdp.replace(lineRegex, prefix + "=" + cleanSalt);
                            patched = true;
                            console.log("[Bypass] Patched " + prefix + ": " + salt + " (v" + vShift + ") -> " + cleanSalt + " (v5)");
                        }
                    }
                    if (patched) {
                        parsed.description.sdp = sdp;
                        finalData = JSON.stringify(parsed);
                    }
                }
            } catch (e) {
                console.error("[Bypass] Packet patch error:", e);
            }
        }
        return originalSend.call(this, finalData);
    };

    const patchSiteFunction = () => {
        if (typeof window._formatTransportData === 'function' && !window._formatTransportData._proxied) {
            const original = window._formatTransportData;
            window._formatTransportData = function(offer, pc) {
                const result = original.apply(this, arguments);
                if (result && result.sdp) {
                    const matches = result.sdp.matchAll(/(n?s)=([a-z0-9]{5,})/g);
                    for (const match of matches) {
                        const prefix = match[1];
                        const salt = match[2];
                        const vShift = (parseInt(salt, 36) % 1000000) % 17;
                        if (vShift !== 5) {
                            const cleanSalt = (parseInt(salt, 36) - vShift + 5).toString(36);
                            result.sdp = result.sdp.replace(prefix + "=" + salt, prefix + "=" + cleanSalt);
                            console.log("[Bypass] _formatTransportData cleaned: " + salt + " -> " + cleanSalt);
                        }
                    }
                }
                return result;
            };
            window._formatTransportData._proxied = true;
        }
    };

    setInterval(patchSiteFunction, 500);

    const originalGetElements = document.getElementsByTagName;
    document.getElementsByTagName = function(tag) {
        const list = originalGetElements.apply(this, arguments);
        if (tag === '*' || tag === String.fromCharCode(42)) {
            const filtered = Array.from(list).filter(el => !el.id?.startsWith('chill') && !el.id?.includes('DisplayBox'));
            return filtered;
        }
        return list;
    };

})();
