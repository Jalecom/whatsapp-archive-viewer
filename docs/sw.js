const CACHE_NAME = 'wa-viewer-v1';
const ASSETS = [
  './index.html',
  './manifest.json',
  './css/app.css',
  './js/app.js',
  './js/chatparse.js',
  './js/session.js',
  './js/util.js',
  './js/voice.js',
  './js/zip.js'
];

// Installazione e salvataggio dei file in cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(ASSETS);
    })
  );
});

// Attivazione e pulizia vecchie cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Intercettazione delle richieste per il funzionamento offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      return cachedResponse || fetch(event.request);
    })
  );
});
