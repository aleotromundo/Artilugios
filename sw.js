// sw.js — SW que se autodestruye
// Su único trabajo es limpiar cualquier caché viejo y desregistrarse.
// Sin SW activo, el browser va directo al servidor en cada carga.
// Los headers de Vercel (no-store) se encargan del resto.

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      await self.clients.claim();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => client.postMessage({ type: 'SW_CLEANUP_DONE' }));
      await self.registration.unregister();
    })()
  );
});

// Sin fetch listener = el browser va directo al servidor, siempre.
