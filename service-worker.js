// ======================================
// ASÍ ES JACKSON DIGITAL HQ
// SERVICE WORKER V2
// ======================================

const CACHE_NAME = "jackson-hq-v2";

const urlsToCache = [
    "./",
    "./index.html",
    "./styles.css",
    "./app.js",
    "./manifest.json"
];

// =========================
// INSTALACIÓN
// =========================

self.addEventListener("install", event => {

    console.log("Service Worker instalado");

    self.skipWaiting();

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(urlsToCache);

            })

    );

});

// =========================
// ACTIVACIÓN
// =========================

self.addEventListener("activate", event => {

    console.log("Service Worker activado");

    event.waitUntil(

        caches.keys().then(cacheNames => {

            return Promise.all(

                cacheNames.map(cacheName => {

                    if (cacheName !== CACHE_NAME) {

                        console.log(
                            "Eliminando caché antigua:",
                            cacheName
                        );

                        return caches.delete(cacheName);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

// =========================
// FETCH
// =========================

self.addEventListener("fetch", event => {

    event.respondWith(

        fetch(event.request)

            .then(response => {

                return response;

            })

            .catch(() => {

                return caches.match(event.request);

            })

    );

});
