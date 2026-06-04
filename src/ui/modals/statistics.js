let _getLang = () => 'en';
let _translations = {};
let _insertAdjacentHTMLToBody = () => {};
let _formatTime = () => '00:00:00';
let _getTimeElapsed = () => 0;
let _getPeopleCount = () => 0;
let _getSkipCount = () => 0;
let _showCountryLeaderboard = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.formatTime) _formatTime = deps.formatTime;
    if (deps.getTimeElapsed) _getTimeElapsed = deps.getTimeElapsed;
    if (deps.getPeopleCount) _getPeopleCount = deps.getPeopleCount;
    if (deps.getSkipCount) _getSkipCount = deps.getSkipCount;
    if (deps.showCountryLeaderboard) _showCountryLeaderboard = deps.showCountryLeaderboard;
}

export function showStatistics() {
    const lang = _getLang();
    const t = _translations[lang];

    const statsHTML = `
    <div id="statisticsModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 10000; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 500px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #8e2de2, #4a00e0); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-chart-pie"></i> ${t.statisticsTitle}
                </h3>
                <button id="closeStatisticsBtn" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
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
                    <i class="fas fa-globe"></i> ${(t && (t.countryLeaderboardBtn || (_translations.en && _translations.en.countryLeaderboardBtn))) || 'Country leaderboard'}
                </button>
            </div>
            <div style="padding: 12px; background: #222; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #333; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                chilltools.it
            </div>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', statsHTML);

    const closeModal = function() {
        clearInterval(timeUpdateInterval);
        clearInterval(statsUpdateInterval);
        const modal = document.getElementById('statisticsModal');
        if (modal) modal.remove();
    };

    document.getElementById('closeStatisticsBtn').onclick = closeModal;

    document.getElementById('statisticsModal').onclick = function(e) {
        if (e.target === this) closeModal();
    };

    const leaderboardBtn = document.getElementById('openCountryLeaderboardBtn');
    if (leaderboardBtn) {
        leaderboardBtn.onclick = function() {
            _showCountryLeaderboard();
        };
    }

    const timeUpdateInterval = setInterval(() => {
        const timeElement = document.getElementById('totalTimeStat');
        if (timeElement) {
            timeElement.textContent = _formatTime(_getTimeElapsed());
        }
    }, 1000);

    const statsUpdateInterval = setInterval(() => {
        const skipCountElement = document.getElementById('skipCountStat');
        const peopleCountElement = document.getElementById('peopleCountStat');

        if (skipCountElement) {
            skipCountElement.textContent = _getSkipCount();
        }

        if (peopleCountElement) {
            peopleCountElement.textContent = _getPeopleCount();
        }

        if (!document.getElementById('statisticsModal')) {
            clearInterval(timeUpdateInterval);
            clearInterval(statsUpdateInterval);
        }
    }, 500);
}
