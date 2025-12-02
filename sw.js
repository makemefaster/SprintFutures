// INCREASE THIS VERSION NUMBER EVERY TIME YOU UPDATE CODE
const CACHE_NAME = 'race-suite-v3'; 

const urlsToCache = [
  './',
  './index.html',
  './sprint.html',
  './keirin.html',
  './manifest.json'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // Forces new Service Worker to take over immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Delete old caches (v1, v2, etc)
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
