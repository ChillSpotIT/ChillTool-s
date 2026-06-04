export let currentSession = { ip: null, screenshot: null, info: {} };
export let connectionHistory = [];
export const MAX_SCREENSHOTS = 50;

export function captureAndStoreScreenshot(videoElement, ip) {
    const captureFrame = () => {
        try {
            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.translate(canvas.width, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);

            if (currentSession.ip === ip) {
                const screenshot = canvas.toDataURL('image/png');
                currentSession.screenshot = screenshot;

                const existingIndex = connectionHistory.findIndex(item => item.ip === ip);

                if (existingIndex === -1) {
                    const historyEntry = {
                        ip: ip,
                        info: currentSession.info,
                        screenshot: screenshot,
                        timestamp: new Date().toLocaleString(),
                        hasScreenshot: true
                    };

                    connectionHistory.unshift(historyEntry);

                    if (connectionHistory.length > MAX_SCREENSHOTS) {
                        const oldestWithScreenshot = connectionHistory.findLastIndex(item => item.hasScreenshot);
                        if (oldestWithScreenshot !== -1) {
                            connectionHistory[oldestWithScreenshot].hasScreenshot = false;
                            connectionHistory[oldestWithScreenshot].screenshot = null;
                        }
                    }

                    console.log('Added to history:', ip);
                } else {
                    if (existingIndex < MAX_SCREENSHOTS) {
                        connectionHistory[existingIndex].screenshot = screenshot;
                        connectionHistory[existingIndex].timestamp = new Date().toLocaleString();
                        console.log('Updated existing history entry:', ip);
                    }
                }
            }
        } catch (error) {
            console.error('Error capturing screenshot:', error);
            setTimeout(captureFrame, 500);
        }
    };

    if (videoElement.readyState >= 2) {
        captureFrame();
    } else {
        videoElement.addEventListener('loadeddata', captureFrame, { once: true });
    }
}
