let _getLang = () => 'en';
let _translations = {};
let _showNotification = () => {};
let _insertAdjacentHTMLToBody = () => {};
let _unblurToolbar = () => {};

export function setDeps(deps) {
    if (deps.getLang) _getLang = deps.getLang;
    if (deps.translations) _translations = deps.translations;
    if (deps.showNotification) _showNotification = deps.showNotification;
    if (deps.insertAdjacentHTMLToBody) _insertAdjacentHTMLToBody = deps.insertAdjacentHTMLToBody;
    if (deps.unblurToolbar) _unblurToolbar = deps.unblurToolbar;
}

export function getSelectedCountries() {
    const saved = localStorage.getItem('chilltool_selectedCountries');
    return saved ? JSON.parse(saved) : [];
}

export function saveSelectedCountries(countries) {
    localStorage.setItem('chilltool_selectedCountries', JSON.stringify(countries));
}

export function showCountryFilterModal() {
    const toolbar = document.getElementById('chillToolbar');
    if (toolbar && !isMobile()) toolbar.classList.add('chill-blur');
    const lang = _getLang();
    const t = _translations[lang];
    const selectedCountries = getSelectedCountries();

    const countries = [
        'Afghanistan', 'Albania', 'Algeria', 'Andorra', 'Angola', 'Antigua and Barbuda', 'Argentina',
        'Armenia', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados',
        'Belarus', 'Belgium', 'Belize', 'Benin', 'Bhutan', 'Bolivia', 'Bosnia and Herzegovina', 'Botswana',
        'Brazil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada',
        'Cape Verde', 'Central African Republic', 'Chad', 'Chile', 'China', 'Colombia', 'Comoros', 'Congo',
        'Costa Rica', 'Croatia', 'Cuba', 'Cyprus', 'Czech Republic', 'Denmark', 'Djibouti', 'Dominica',
        'Dominican Republic', 'East Timor', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea',
        'Eritrea', 'Eswatini', 'Estonia', 'Ethiopia', 'Fiji', 'Finland', 'France', 'Gabon', 'Gambia',
        'Georgia', 'Germany', 'Ghana', 'Greece', 'Grenada', 'Guatemala', 'Guinea', 'Guinea-Bissau',
        'Guyana', 'Haiti', 'Honduras', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran', 'Iraq',
        'Ireland', 'Israel', 'Italy', 'Ivory Coast', 'Jamaica', 'Japan', 'Jordan', 'Kazakhstan', 'Kenya',
        'Kiribati', 'North Korea', 'South Korea', 'Kosovo', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Latvia',
        'Lebanon', 'Lesotho', 'Liberia', 'Libya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia',
        'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Mauritania',
        'Mauritius', 'Mexico', 'Micronesia', 'Moldova', 'Monaco', 'Mongolia', 'Montenegro', 'Morocco',
        'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Zealand', 'Nicaragua',
        'Niger', 'Nigeria', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestine', 'Panama', 'Papua New Guinea',
        'Paraguay', 'Peru', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Romania', 'Russia', 'Rwanda',
        'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino',
        'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone',
        'Singapore', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Sudan',
        'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Sweden', 'Switzerland', 'Syria', 'Taiwan', 'Tajikistan',
        'Tanzania', 'Thailand', 'Togo', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan',
        'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Uruguay',
        'Uzbekistan', 'Vanuatu', 'Vatican City', 'Venezuela', 'Vietnam', 'Yemen', 'Zambia', 'Zimbabwe'
    ];

    const countryCheckboxes = countries.map(country => {
        const isChecked = selectedCountries.includes(country);
        return `
            <label style="display: flex; align-items: center; padding: 8px; margin: 4px 0; background: ${isChecked ? 'rgba(23, 162, 184, 0.2)' : 'rgba(255,255,255,0.05)'}; border-radius: 5px; cursor: pointer; transition: background 0.2s;">
                <input type="checkbox" value="${country}" ${isChecked ? 'checked' : ''} style="margin-right: 10px; cursor: pointer; width: 18px; height: 18px;">
                <span style="color: #fff; font-size: 14px;">${country}</span>
            </label>
        `;
    }).join('');

    const modalHTML = `
    <div id="countryFilterModal" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.9); backdrop-filter: blur(5px); z-index: 9999; display: flex; justify-content: center; align-items: center;">
        <div style="background: #111; border-radius: 10px; width: 90%; max-width: 600px; max-height: 80vh; overflow: hidden; box-shadow: 0 5px 25px rgba(0,0,0,0.7); border: 1px solid #333; display: flex; flex-direction: column;">
            <div style="padding: 15px; background: linear-gradient(to right, #17a2b8, #138496); color: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333;">
                <h3 style="margin: 0; font-size: 18px; text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;">
                    <i class="fas fa-globe"></i> ${t.countryFilter}
                </h3>
                <button id="closeCountryFilter" style="background: none; border: none; color: white; font-size: 20px; cursor: pointer; padding: 0 10px;">×</button>
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
                    ${t.save || 'Save'}
                </button>
            </div>
        </div>
    </div>`;

    _insertAdjacentHTMLToBody('beforeend', modalHTML);

    const modal = document.getElementById('countryFilterModal');
    const checkboxes = modal.querySelectorAll('input[type="checkbox"]');
    const countLabel = document.getElementById('selectedCountryCount');
    const searchInput = document.getElementById('countrySearchInput');
    const countryContainer = document.getElementById('countryCheckboxContainer');
    const noResultsMsg = document.getElementById('noResultsMessage');

    function updateCount() {
        const checked = Array.from(checkboxes).filter(cb => cb.checked);
        countLabel.innerHTML = `<i class="fas fa-flag" style="color: #17a2b8; font-size: 16px; margin-right: 8px;"></i>${checked.length > 0 ? `${checked.length} ${t.countriesSelected}` : t.noCountriesSelected}`;

        checkboxes.forEach(cb => {
            const label = cb.closest('label');
            if (cb.checked) {
                label.style.background = 'rgba(23, 162, 184, 0.3)';
                label.style.borderLeft = '3px solid #17a2b8';
            } else {
                label.style.background = 'rgba(255,255,255,0.05)';
                label.style.borderLeft = '3px solid transparent';
            }
        });
    }

    function filterCountries() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let visibleCount = 0;

        checkboxes.forEach(cb => {
            const label = cb.closest('label');
            const countryName = cb.value.toLowerCase();

            if (countryName.includes(searchTerm)) {
                label.style.display = 'flex';
                visibleCount++;
            } else {
                label.style.display = 'none';
            }
        });

        if (visibleCount === 0) {
            noResultsMsg.style.display = 'block';
            countryContainer.style.display = 'none';
        } else {
            noResultsMsg.style.display = 'none';
            countryContainer.style.display = 'grid';
        }
    }

    searchInput.addEventListener('input', filterCountries);

    checkboxes.forEach(cb => {
        cb.addEventListener('change', updateCount);
    });

    document.getElementById('selectAllCountries').addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = true);
        updateCount();
    });

    document.getElementById('deselectAllCountries').addEventListener('click', () => {
        checkboxes.forEach(cb => cb.checked = false);
        updateCount();
    });

    document.getElementById('closeCountryFilter').addEventListener('click', () => {
        modal.remove();
        _unblurToolbar();
    });

    document.getElementById('saveCountryFilter').addEventListener('click', () => {
        const selected = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        saveSelectedCountries(selected);
        _showNotification('Country Filter', `${selected.length > 0 ? selected.length + ' ' + t.countriesSelected : t.noCountriesSelected}`, {
            type: 'success',
            duration: 3000
        });
        modal.remove();
        _unblurToolbar();
    });
}
