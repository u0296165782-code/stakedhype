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
