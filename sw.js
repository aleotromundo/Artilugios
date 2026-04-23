// sw.js
// ⚠️ Para forzar una actualización: cambiá el número de versión (v2 → v3, etc.)
const CACHE_NAME = 'artilugios-panel-v2';
const SW_VERSION = 2; // debe coincidir con SW_VERSION en panel.html

const ASSETS = [
  './manifest.json',
  './logo-192.png',
  './logo-512.png'
];

// ── INSTALL: cachear solo assets estáticos (NO el panel.html) ──
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
      .then(() => self.skipWaiting()) // activarse de inmediato sin esperar
  );
});

// ── ACTIVATE: borrar caches viejos y tomar control inmediato ──
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => key !== CACHE_NAME)
          .map((key) => {
            console.log('[SW] Borrando caché viejo:', key);
            return caches.delete(key);
          })
      )
    ).then(() => self.clients.claim()) // tomar control de todas las pestañas abiertas
  );
});

// ── FETCH: estrategia según tipo de archivo ──
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // panel.html y supabase-config.js → NETWORK FIRST
  // Siempre intenta bajar la versión nueva del servidor.
  // Solo usa caché si no hay red (modo avión, etc.)
  if (
    url.pathname.endsWith('panel.html') ||
    url.pathname.endsWith('supabase-config.js') ||
    url.pathname === '/'
  ) {
    e.respondWith(
      fetch(e.request)
        .then((networkRes) => {
          // Guardar copia fresca en caché
          const clone = networkRes.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return networkRes;
        })
        .catch(() => caches.match(e.request)) // fallback si no hay red
    );
    return;
  }

  // Assets estáticos (logos, manifest) → CACHE FIRST
  // No cambian seguido, no vale la pena ir a la red cada vez.
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((networkRes) => {
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return networkRes;
      });
    })
  );
});

// ── MENSAJES: responder versión al panel.html ──
self.addEventListener('message', (e) => {
    if (e.data && e.data.type === 'GET_VERSION') {
        e.ports[0].postMessage({ version: SW_VERSION });
    }
});
