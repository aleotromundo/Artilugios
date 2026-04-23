// sw.js — SW que se autodestruye
// Su único trabajo es limpiar cualquier caché viejo y desregistrarse.
// Sin SW activo, el browser va directo al servidor en cada carga.
// Los headers de Vercel (no-store) se encargan del resto.

self.addEventListener('install', (e) => {
  // Activarse inmediatamente sin esperar
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    (async () => {
      // 1. Borrar todos los caches
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));
      // 2. Tomar control de todas las pestañas abiertas
      await self.clients.claim();
      // 3. Avisar a todas las pestañas que recarguen
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(client => client.postMessage({ type: 'SW_CLEANUP_DONE' }));
      // 4. Desregistrarse a sí mismo
      const reg = await self.registration;
      await reg.unregister();
    })()
  );
});

// Sin fetch listener = el browser va directo al servidor, siempre.
