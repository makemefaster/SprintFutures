const CACHE_NAME = "sprintfutures-v2";
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./sprint.html",
  "./keirin.html",
  "./manifest.json",
  "https://cdn.tailwindcss.com",
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap",
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js",
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js",
  "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
];

// 1. Install Event: Cache all critical files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[Service Worker] Caching app shell");
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Activate Event: Clean up old caches
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
});

// 3. Fetch Event: Serve from Cache first, then Network
self.addEventListener("fetch", (event) => {
  // Database requests should always go to network (live data)
  if (event.request.url.includes("firebase")) {
    return; 
  }

  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file if found, otherwise fetch from network
      return response || fetch(event.request);
    })
  );
});
