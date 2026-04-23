// sw.js
// ⚠️ Para forzar actualización en TODOS los dispositivos:
//    subí el número de SW_VERSION (debe coincidir con panel.html)
const CACHE_NAME = 'artilugios-panel-v3';
const SW_VERSION = 3;

// Solo assets que NUNCA cambian (logos, manifest)
// NO incluir panel.html, index.html, ni ningún .js de la app
const ASSETS_ESTATICOS = [
  './manifest.json',
  './logo-192.png',
  './logo-512.png'
];

// ── INSTALL: cachear solo assets estáticos ──────────────────────
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_ESTATICOS))
      .then(() => {
        console.log('[SW v' + SW_VERSION + '] Instalado. Activando inmediatamente...');
        return self.skipWaiting(); // no esperar: activarse YA
      })
  );
});

// ── ACTIVATE: borrar TODOS los caches viejos ────────────────────
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== CACHE_NAME)
            .map((key) => {
              console.log('[SW v' + SW_VERSION + '] Borrando caché viejo:', key);
              return caches.delete(key);
            })
        )
      )
      .then(() => {
        console.log('[SW v' + SW_VERSION + '] Activo. Tomando control de todas las pestañas...');
        return self.clients.claim(); // tomar control INMEDIATO de todas las pestañas
      })
  );
});

// ── FETCH: estrategia según tipo de recurso ─────────────────────
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // ── REGLA 1: HTML y JS de la app → NETWORK ONLY (sin caché) ──
  // Estos archivos SIEMPRE se bajan del servidor. Nunca desde caché.
  // Si no hay red, mostramos error en lugar de versión vieja.
  const esHTML = url.pathname.endsWith('.html') || url.pathname === '/';
  const esJSApp = url.pathname.endsWith('supabase-config.js') ||
                  url.pathname.endsWith('tracking.js') ||
                  url.pathname.endsWith('music-manager.js') ||
                  url.pathname.endsWith('whatsapp-btn.js');

  if (esHTML || esJSApp) {
    e.respondWith(
      fetch(e.request, { cache: 'no-store' }) // forzar bypass de caché HTTP también
        .catch(() => {
          // Sin red: mostrar página de error amigable en lugar de versión vieja
          return new Response(
            `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>Sin conexión</title>
            <style>body{font-family:sans-serif;background:#110a05;color:#c9a24d;
            display:flex;align-items:center;justify-content:center;min-height:100vh;
            flex-direction:column;gap:16px;text-align:center;padding:20px;}
            h1{font-size:1.5rem;}p{color:#a89070;max-width:320px;line-height:1.5;}
            button{padding:12px 28px;background:#c9a24d;color:#000;border:none;
            border-radius:20px;font-size:1rem;cursor:pointer;margin-top:8px;}
            </style></head><body>
            <h1>⚠️ Sin conexión</h1>
            <p>No se puede cargar la página porque no hay internet. Revisá tu conexión y volvé a intentar.</p>
            <button onclick="location.reload()">Reintentar</button>
            </body></html>`,
            { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
          );
        })
    );
    return;
  }

  // ── REGLA 2: Assets estáticos (logos, manifest) → CACHE FIRST ──
  // Estos no cambian seguido. Si están en caché, los usamos directo.
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((networkRes) => {
        // Guardar copia en caché para próximas veces
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        return networkRes;
      });
    })
  );
});

// ── MENSAJES: responder versión al panel.html ───────────────────
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'GET_VERSION') {
    e.ports[0].postMessage({ version: SW_VERSION });
  }
  // Mensaje para forzar skip waiting desde la página
  if (e.data && e.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
