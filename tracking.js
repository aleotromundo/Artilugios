// ============================================================
// TRACKING — Artilugios
// Incluir DESPUÉS de supabase-config.js en cada página.
// Crea UN SOLO cliente global (window._sb) que reutilizan
// todos los scripts de la página. Sin esto el SDK se queja
// de múltiples instancias y el realtime falla.
// ============================================================

(function () {
  if (typeof supabase === 'undefined' || !window.SUPABASE_URL) return;

  // Limpiar cualquier sesión vieja de Supabase del localStorage
  // Esto evita el warning "Multiple GoTrueClient instances"
  try {
    Object.keys(localStorage).forEach(k => {
      if (k.startsWith('sb-') && k.includes('-auth-token')) localStorage.removeItem(k);
    });
  } catch(e) {}

  // Cliente único para toda la página: tracking + datos + contacto
  if (!window._sb) {
    const { createClient } = supabase;
    window._sb = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY, {
      auth: {
        persistSession:     false,
        autoRefreshToken:   false,
        detectSessionInUrl: false,
        storageKey:         'artilugios-anon-' + Math.random().toString(36).slice(2),
        storage: {
          getItem:    () => null,
          setItem:    () => {},
          removeItem: () => {}
        }
      }
    });
  }

  // Alias para compatibilidad con código existente
  window._sbTrack = window._sb;

  const sb = window._sb;

  function getDispositivo() {
    const ua = navigator.userAgent;
    if (/Mobi|Android|iPhone/i.test(ua)) return 'mobile';
    if (/iPad|Tablet/i.test(ua)) return 'tablet';
    return 'desktop';
  }

  function getReferrer() {
    const ref = document.referrer;
    if (!ref) return 'directo';
    try {
      const host = new URL(ref).hostname.replace('www.', '');
      if (host.includes('google'))    return 'google';
      if (host.includes('instagram')) return 'instagram';
      if (host.includes('facebook'))  return 'facebook';
      if (host.includes('whatsapp'))  return 'whatsapp';
      if (host.includes('tiktok'))    return 'tiktok';
      return host;
    } catch (e) { return 'directo'; }
  }

  async function registrarVisita(seccion = null, productoNombre = null, productoId = null) {
    const { data } = await sb.from('visitas').insert([{
      seccion,
      producto_nombre: productoNombre,
      producto_id:     productoId,
      dispositivo:     getDispositivo(),
      referrer:        getReferrer(),
      user_agent:      navigator.userAgent.substring(0, 200)
    }]).select('id').single();

    if (data && data.id) {
      // ipapi.co permite CORS desde cualquier origen, gratuito sin API key
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(geo => {
          sb.from('visitas').update({
            pais:   geo.country_name || null,
            ciudad: geo.city         || null
          }).eq('id', data.id);
        })
        .catch(() => {});
    }
  }

  window._registrarVisita = registrarVisita;

  document.addEventListener('productoVisto', (e) => {
    if (e.detail) registrarVisita(e.detail.seccion || null, e.detail.nombre || null, e.detail.id || null);
  });

})();
