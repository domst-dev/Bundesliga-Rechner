const CACHE_NAME = 'bl-rechner-v1';
const ASSETS = [
  '.',             // index.html
  'manifest.json',
  'styles.css',    // falls du Styles ausgelagert hast
  'script.js',     // falls du JS ausgelagert hast
  // alle weiteren Dateien, die offline verfügbar sein sollen:
  // z.B. icons/icon-192.png, icons/icon-512.png
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
  );
});

self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request)
      .then(resp => resp || fetch(evt.request))
  );
});
