const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/dist/app.bundle.js',
  '/dist/db.bundle.js',
  '/style.css'
];


const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if(event.request.method === 'POST' || event.request.url.href.match(/*...*/)){
    event.respondWith(
      // First try to fetch the request from the server
      fetch(event.request.clone())
        // If it works, put the response into IndexedDB
        .then(function(response) {
            // Compute a unique key for the POST request
            var key = getPostId(request);
            // Create a cache entry
            var entry = {
                key: key,
                response: serializeResponse(response),
                timestamp: Date.now()
            };
            /* ... save entry to IndexedDB ... */
            // Return the (fresh) response
            return response;
        })
    )}
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});