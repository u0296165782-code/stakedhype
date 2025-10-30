// cookie.js
document.addEventListener('DOMContentLoaded', function() {
    if (!getCookie('cookies_accepted')) {
        createCookieNotice();
    }
});

function createCookieNotice() {
    const cookieNotice = document.createElement('div');
    cookieNotice.id = 'cookie-notice';
    cookieNotice.innerHTML = `
        <div class="cookie-notice-container">
            <div class="cookie-content">
                <h3>🍪 We Use Cookies</h3>
                <p>We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and personalize content. By clicking "Accept All", you consent to our use of cookies in accordance with our <a href="https://vercel.com/legal/privacy-policy" target="_blank">Privacy Policy</a> and <a href="https://vercel.com/legal/inactivity-policy" target="_blank">Cookie Policy</a>.</p>
                <div class="cookie-buttons">
                    <button class="cookie-btn accept-all" onclick="acceptAllCookies()">Accept All</button>
                    <button class="cookie-btn settings" onclick="showCookieSettings()">Cookie Settings</button>
                    <button class="cookie-btn reject" onclick="rejectCookies()">Reject Non-Essential</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cookieNotice);

    // Add CSS styles
    const styles = `
        #cookie-notice {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: #2c3e50;
            color: white;
            z-index: 10000;
            font-family: Arial, sans-serif;
            box-shadow: 0 -2px 20px rgba(0,0,0,0.3);
        }
        .cookie-notice-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        .cookie-content h3 {
            margin: 0 0 10px 0;
            font-size: 18px;
            color: #3498db;
        }
        .cookie-content p {
            margin: 0 0 15px 0;
            font-size: 14px;
            line-height: 1.5;
            color: #ecf0f1;
        }
        .cookie-content a {
            color: #3498db;
            text-decoration: underline;
        }
        .cookie-content a:hover {
            color: #2980b9;
        }
        .cookie-buttons {
            display: flex;
            gap: 10px;
            flex-wrap: wrap;
        }
        .cookie-btn {
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }
        .cookie-btn.accept-all {
            background: #27ae60;
            color: white;
        }
        .cookie-btn.accept-all:hover {
            background: #219a52;
        }
        .cookie-btn.settings {
            background: #3498db;
            color: white;
        }
        .cookie-btn.settings:hover {
            background: #2980b9;
        }
        .cookie-btn.reject {
            background: #e74c3c;
            color: white;
        }
        .cookie-btn.reject:hover {
            background: #c0392b;
        }
        @media (max-width: 768px) {
            .cookie-buttons {
                flex-direction: column;
            }
            .cookie-btn {
                width: 100%;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
}

function acceptAllCookies() {
    setCookie('cookies_accepted', 'all', 365);
    setCookie('necessary_cookies', 'true', 365);
    setCookie('analytics_cookies', 'true', 365);
    setCookie('marketing_cookies', 'true', 365);
    hideCookieNotice();
    loadAdditionalServices();
}

function rejectCookies() {
    setCookie('cookies_accepted', 'necessary', 365);
    setCookie('necessary_cookies', 'true', 365);
    setCookie('analytics_cookies', 'false', 365);
    setCookie('marketing_cookies', 'false', 365);
    hideCookieNotice();
}

function showCookieSettings() {
    const settingsHTML = `
        <div class="cookie-settings-overlay">
            <div class="cookie-settings-modal">
                <h3>🔧 Cookie Preferences</h3>
                <div class="cookie-setting">
                    <label>
                        <input type="checkbox" checked disabled>
                        <strong>Necessary Cookies</strong>
                        <span>Required for the website to function properly. Cannot be disabled.</span>
                    </label>
                </div>
                <div class="cookie-setting">
                    <label>
                        <input type="checkbox" id="analytics-cookies" checked>
                        <strong>Analytics Cookies</strong>
                        <span>Help us understand how visitors interact with our website.</span>
                    </label>
                </div>
                <div class="cookie-setting">
                    <label>
                        <input type="checkbox" id="marketing-cookies" checked>
                        <strong>Marketing Cookies</strong>
                        <span>Used to track visitors across websites for advertising purposes.</span>
                    </label>
                </div>
                <div class="cookie-settings-buttons">
                    <button class="cookie-btn save-settings" onclick="saveCookieSettings()">Save Preferences</button>
                    <button class="cookie-btn cancel" onclick="hideCookieSettings()">Cancel</button>
                </div>
            </div>
        </div>
    `;

    const settingsOverlay = document.createElement('div');
    settingsOverlay.innerHTML = settingsHTML;
    document.body.appendChild(settingsOverlay);

    // Add settings styles
    const settingsStyles = `
        .cookie-settings-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .cookie-settings-modal {
            background: white;
            color: #2c3e50;
            padding: 30px;
            border-radius: 10px;
            max-width: 500px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
        }
        .cookie-settings-modal h3 {
            margin: 0 0 20px 0;
            color: #2c3e50;
        }
        .cookie-setting {
            margin: 15px 0;
            padding: 15px;
            border: 1px solid #bdc3c7;
            border-radius: 5px;
        }
        .cookie-setting label {
            display: block;
            cursor: pointer;
        }
        .cookie-setting input {
            margin-right: 10px;
        }
        .cookie-setting strong {
            display: block;
            margin-bottom: 5px;
        }
        .cookie-setting span {
            font-size: 12px;
            color: #7f8c8d;
            display: block;
        }
        .cookie-settings-buttons {
            margin-top: 20px;
            display: flex;
            gap: 10px;
        }
        .cookie-btn.save-settings {
            background: #27ae60;
            color: white;
        }
        .cookie-btn.cancel {
            background: #95a5a6;
            color: white;
        }
    `;

    const settingsStyleSheet = document.createElement('style');
    settingsStyleSheet.textContent = settingsStyles;
    document.head.appendChild(settingsStyleSheet);
}

function saveCookieSettings() {
    const analytics = document.getElementById('analytics-cookies').checked;
    const marketing = document.getElementById('marketing-cookies').checked;
    
    setCookie('cookies_accepted', 'custom', 365);
    setCookie('necessary_cookies', 'true', 365);
    setCookie('analytics_cookies', analytics.toString(), 365);
    setCookie('marketing_cookies', marketing.toString(), 365);
    
    hideCookieSettings();
    hideCookieNotice();
    
    if (analytics) {
        loadAnalytics();
    }
    if (marketing) {
        loadMarketing();
    }
}

function hideCookieSettings() {
    const overlay = document.querySelector('.cookie-settings-overlay');
    if (overlay) {
        overlay.remove();
    }
}

function hideCookieNotice() {
    const notice = document.getElementById('cookie-notice');
    if (notice) {
        notice.style.display = 'none';
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function loadAdditionalServices() {
    // Load analytics if accepted
    if (getCookie('analytics_cookies') === 'true') {
        loadAnalytics();
    }
    
    // Load marketing if accepted
    if (getCookie('marketing_cookies') === 'true') {
        loadMarketing();
    }
}

function loadAnalytics() {
    // Placeholder for Google Analytics or other analytics services
    console.log('Loading analytics services...');
    // Example: gtag('config', 'GA_MEASUREMENT_ID');
}

function loadMarketing() {
    // Placeholder for marketing services
    console.log('Loading marketing services...');
}

// Initialize if cookies were already accepted
if (getCookie('cookies_accepted')) {
    loadAdditionalServices();
}