const CACHE_NAME = "arz-dashboard-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  "./sw.js"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener("activate", e=>{
  e.waitUntil(
    caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null)))
  );
  self.clients.claim();
});

self.addEventListener("fetch", e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
