const CACHE = 'ladder-live-v4';
self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => c.addAll([
    './index.html?v=4',
    './style.css?v=4',
    './app.js?v=4',
    './manifest.json?v=4'
  ])));
});
self.addEventListener('activate', (e)=>{
  e.waitUntil(self.clients.claim());
});
self.addEventListener('fetch', (e)=>{
  e.respondWith(caches.match(e.request, {ignoreSearch:true}).then(r=>r||fetch(e.request)));
});
