// service-worker.js

// Nombre de la caché para tu aplicación. Incrementé la versión.
const CACHE_NAME = 'delivery-app-cache-v3';

// Lista de todos los archivos que tu aplicación necesita para funcionar offline.
// ¡Ahora incluimos el manifest y el favicon!
const urlsToCache = [
    'login.html',
    'admin.html',
    'sistema.html',
    'goku.jpg',
    'goku 2.jpg',
    'administrador.jpg',
    'grabiel.jpg',
    'favicon.png', // El ícono de tu aplicación
    'manifest.json'
];

// Instalar el Service Worker y guardar los archivos en la caché
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// Interceptar las peticiones de red y servir los archivos desde la caché si están disponibles
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Si encontramos una respuesta en la caché, la devolvemos.
                if (response) {
                    return response;
                }
                // Si no, hacemos una petición a la red (esto ocurrirá si no está en caché o si estamos online).
                return fetch(event.request);
            })
    );
});

// Eliminar cachés antiguas si cambias el nombre de la caché
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
