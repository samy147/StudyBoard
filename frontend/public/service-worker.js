const CACHE_NAME = 'studyboard-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/icon-128.png',
  '/icon-192.png',
  '/icon-512.png',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Service Worker: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - cache-first strategy for static assets
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin requests
  if (url.origin !== location.origin) {
    return;
  }

  // Cache-first strategy for static assets
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          console.log('Service Worker: Serving from cache:', request.url);
          return cachedResponse;
        }

        // If not in cache, fetch from network and cache for future use
        return fetch(request)
          .then((response) => {
            // Only cache successful responses
            if (!response || response.status !== 200 || response.type === 'error') {
              return response;
            }

            // Clone the response since it can only be consumed once
            const responseToCache = response.clone();

            // Cache static files (HTML, JS, CSS, images)
            if (
              request.method === 'GET' &&
              (request.url.endsWith('.html') ||
                request.url.endsWith('.js') ||
                request.url.endsWith('.css') ||
                request.url.endsWith('.png') ||
                request.url.endsWith('.jpg') ||
                request.url.endsWith('.svg') ||
                request.url.endsWith('.webmanifest'))
            ) {
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseToCache);
                  console.log('Service Worker: Cached new resource:', request.url);
                });
            }

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed:', error);
            // Return cached version if available, even if fetch failed
            return caches.match(request);
          });
      })
  );
});
