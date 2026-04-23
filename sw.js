// sw.js — PWA sin caché
// Permite instalar el panel como app pero NUNCA cachea HTML ni JS.
// Así la app siempre muestra la versión más nueva del servidor.

const CACHE_NAME = 'artilugios-panel-v5';
const SW_VERSION = 5;

// Solo los íconos van a caché (necesarios para que la PWA se instale)
const ICONOS = [
  './logo-192.png',
  './logo-512.png'
];

// ── INSTALL ──────────────────────────────────────────────────────
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ICONOS))
      .then(() => self.skipWaiting()) // activarse sin esperar
  );
});

// ── ACTIVATE: limpiar caches viejos ──────────────────────────────
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Borrando caché viejo:', k);
          return caches.delete(k);
        })
      ))
      .then(() => self.clients.claim())
  );
});

// ── FETCH: NETWORK ONLY para todo excepto íconos ─────────────────
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Íconos PNG → caché (no cambian nunca)
  if (url.pathname.endsWith('.png')) {
    e.respondWith(
      caches.match(e.request).then(cached => cached || fetch(e.request))
    );
    return;
  }

  // TODO lo demás (HTML, JS, JSON, APIs) → NETWORK ONLY forzado
  // Sin respondWith() el browser puede usar su caché interna aunque el servidor
  // diga no-store. Con cache:'no-store' le ordenamos explícitamente que no cachee.
  e.respondWith(fetch(e.request, { cache: 'no-store' }));
});

// ── MENSAJES ─────────────────────────────────────────────────────
self.addEventListener('message', (e) => {
  if (e.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (e.data?.type === 'GET_VERSION')  e.ports[0].postMessage({ version: SW_VERSION });
});
