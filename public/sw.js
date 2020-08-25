importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/css/vendor/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/images/bg/background.svg', revision: '1' },
    { url: '/images/bg/background_2.svg', revision: '1' },
    { url: '/images/icons/icon-72x72.png', revision: '1' },
    { url: '/images/icons/icon-96x96.png', revision: '1' },
    { url: '/images/icons/icon-128x128.png', revision: '1' },
    { url: '/images/icons/icon-144x144.png', revision: '1' },
    { url: '/images/icons/icon-152x152.png', revision: '1' },
    { url: '/images/icons/icon-192x192.png', revision: '1' },
    { url: '/images/icons/icon-384x384.png', revision: '1' },
    { url: '/images/icons/icon-512x512.png', revision: '1' },
    { url: '/images/logo_liga/laliga.svg', revision: '1' },
    { url: '/images/logo_liga/premiere_liga.svg', revision: '1' },
    { url: '/images/logo_liga/uefa_liga.svg', revision: '1' },
    { url: '/images/page/fav_game.svg', revision: '1' },
    { url: '/images/page/player.svg', revision: '1' },
    { url: '/images/page/unknown_logo.svg', revision: '1' },
    { url: '/js/content/api.js', revision: '1' },
    { url: '/js/content/classhandler.js', revision: '1' },
    { url: '/js/content/page.js', revision: '1' },
    { url: '/js/content/reload.js', revision: '1' },
    { url: '/js/content/sw-notif.js', revision: '1' },
    { url: '/js/database/db.js', revision: '1' },
    { url: '/js/database/idb.js', revision: '1' },
    { url: '/js/vendor/materialize.min.js', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/league.html', revision: '1' },
    { url: '/pages/liked.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/sidenav.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
]);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.googleapis\.com/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'google-fonts-stylesheets',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football\-data\.org\/v2/,
    workbox.strategies.networkFirst({
        cacheName: 'api-football',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
        cacheName: 'google-fonts-webfonts',
        plugins: [
            new workbox.cacheableResponse.Plugin({
                statuses: [0, 200],
            }),
            new workbox.expiration.Plugin({
                maxAgeSeconds: 60 * 60 * 24 * 365,
                maxEntries: 30,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 hari
            }),
        ],
    }),
);

// Eventlistener untuk Push
self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/notification.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});