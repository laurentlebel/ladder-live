const CACHE = 'ladder-live-v6';
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    './index.html?v=6',
    './style.css?v=6',
    './app.js?v=6',
    './manifest.json?v=6'
  ])));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
