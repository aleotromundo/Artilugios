const CACHE_NAME = 'artilugios-panel-v1';
const urlsToCache = [
  './panel.html',
  './manifest.json',
  './logo.png'
];

// Instalar el Service Worker y guardar los archivos básicos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones (Estrategia: Red primero, Caché después)
// Ideal para un panel: siempre busca la info fresca de Supabase.
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});