const CACHE_NAME = "deegee-pwa-v1";
const FILES_TO_CACHE = [
    "/DeeGee_Sample/",
     "/DeeGee_Sample/index.html",
     "/DeeGee_Sample/piechart_fullstack.html",
     "/DeeGee_Sample/class-icon-192x192.png",
     "/DeeGee_Sample/class-icon-512x512.png"
 ];

// Install Service Worker and cache files
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Serve files from cache when offline
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Remove old caches when updating
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});