const CACHE_NAME = "sprintfutures-v8"; // BUMPED TO FORCE UPDATE
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./staff.html", 
  "./admin.html",
  "./sprint.html",
  "./keirin.html",
  "./live.html",
  "./firebase-config.js", // Ensure this is cached
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js",
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js"
];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("firebase")) return; 
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
