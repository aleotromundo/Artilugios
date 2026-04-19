// ============================================================
// TRACKING — Artilugios
// Incluir DESPUÉS de supabase-config.js en cada página.
// ============================================================

(async function () {
  if (typeof supabase === 'undefined' || !window.SUPABASE_URL) return;

  // Reutilizar instancia global si ya existe (evita doble createClient)
  if (!window._sbTrack) {
    const { createClient } = supabase;
    window._sbTrack = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
  }
  const sbTrack = window._sbTrack;

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

  // Registra la visita inmediatamente sin esperar la geo,
  // luego actualiza el registro con país y ciudad en background.
  async function registrarVisita(seccion = null, productoNombre = null, productoId = null) {
    // Insert rápido sin geo
    const { data, error } = await sbTrack.from('visitas').insert([{
      seccion,
      producto_nombre: productoNombre,
      producto_id:     productoId,
      dispositivo:     getDispositivo(),
      referrer:        getReferrer(),
      user_agent:      navigator.userAgent.substring(0, 200)
    }]).select('id').single();

    // Geo en background: no bloquea ni la página ni el insert
    if (data && data.id) {
      fetch('https://ipapi.co/json/')
        .then(r => r.json())
        .then(geo => {
          sbTrack.from('visitas').update({
            pais:   geo.country_name || null,
            ciudad: geo.city || null
          }).eq('id', data.id);
        })
        .catch(() => {}); // falla silenciosamente
    }
  }

  // Exponer función globalmente para que cada página la llame
  window._registrarVisita = registrarVisita;

  // Escuchar evento de producto visto (disparado por cada catálogo)
  document.addEventListener('productoVisto', (e) => {
    if (e.detail) registrarVisita(e.detail.seccion || null, e.detail.nombre || null, e.detail.id || null);
  });

})();
