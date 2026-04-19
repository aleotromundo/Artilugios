(async function () {

  // ── Estilos ──────────────────────────────────────────────────
  const style = document.createElement('style');
  style.textContent = `
    #wpp-fab {
      position: fixed;
      bottom: 28px;
      right: 24px;
      z-index: 9999;
      width: 58px;
      height: 58px;
      background: #25d366;
      border-radius: 50%;
      box-shadow: 0 4px 20px rgba(37,211,102,.5);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      text-decoration: none;
      opacity: 0;
      transform: scale(0.6);
      transition: opacity .35s ease, transform .35s ease, box-shadow .25s ease;
      pointer-events: none;
    }
    #wpp-fab.visible {
      opacity: 1;
      transform: scale(1);
      pointer-events: all;
    }
    #wpp-fab:hover {
      box-shadow: 0 6px 28px rgba(37,211,102,.75);
      transform: scale(1.1);
    }
    #wpp-fab svg {
      width: 30px;
      height: 30px;
      fill: #fff;
    }
    #wpp-tooltip {
      position: fixed;
      bottom: 38px;
      right: 92px;
      z-index: 9998;
      background: #fff;
      color: #111;
      font-family: sans-serif;
      font-size: 13px;
      padding: 7px 14px;
      border-radius: 20px;
      box-shadow: 0 3px 12px rgba(0,0,0,.18);
      white-space: nowrap;
      opacity: 0;
      transform: translateX(8px);
      transition: opacity .25s, transform .25s;
      pointer-events: none;
    }
    #wpp-fab.visible:hover ~ #wpp-tooltip,
    #wpp-tooltip.show {
      opacity: 1;
      transform: translateX(0);
    }
  `;
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────────────
  const fab = document.createElement('a');
  fab.id = 'wpp-fab';
  fab.target = '_blank';
  fab.rel = 'noopener';
  fab.title = 'Contactar por WhatsApp';
  fab.innerHTML = `
    <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16.004 2C8.28 2 2 8.28 2 16.004c0 2.473.648 4.794 1.78 6.808L2 30l7.368-1.752A13.94 13.94 0 0 0 16.004 30C23.72 30 30 23.72 30 16.004 30 8.28 23.72 2 16.004 2zm0 25.385a11.353 11.353 0 0 1-5.788-1.581l-.415-.247-4.372 1.04 1.072-4.26-.27-.437A11.35 11.35 0 0 1 4.615 16c0-6.285 5.105-11.385 11.389-11.385S27.385 9.715 27.385 16c0 6.281-5.101 11.385-11.381 11.385zm6.24-8.523c-.342-.172-2.02-1-2.334-1.113-.314-.114-.543-.172-.772.172-.228.343-.887 1.113-1.087 1.343-.2.228-.4.257-.742.086-.343-.172-1.447-.534-2.757-1.702-1.019-.91-1.707-2.033-1.907-2.376-.2-.343-.021-.528.15-.699.155-.153.343-.4.514-.6.172-.2.229-.343.343-.571.114-.229.057-.429-.028-.6-.086-.172-.772-1.862-1.058-2.548-.278-.668-.561-.577-.772-.588l-.657-.011c-.229 0-.6.086-.914.429s-1.2 1.171-1.2 2.857 1.228 3.313 1.4 3.542c.171.228 2.414 3.685 5.852 5.167.818.353 1.457.564 1.955.722.82.26 1.567.224 2.157.136.658-.098 2.02-.826 2.306-1.624.285-.799.285-1.484.2-1.627-.086-.143-.314-.229-.657-.4z"/>
    </svg>
  `;

  const tooltip = document.createElement('div');
  tooltip.id = 'wpp-tooltip';
  tooltip.textContent = '¡Escribinos por WhatsApp!';

  document.body.appendChild(fab);
  document.body.appendChild(tooltip);

  // ── Obtener número desde Supabase ────────────────────────────
  async function getWppLink() {
    // Si el index ya cargó el número, lo usamos directo
    if (window._wppNum) return 'https://wa.me/' + window._wppNum;

    // Si no, consultamos Supabase nosotros mismos
    try {
      if (typeof supabase === 'undefined' || !window.SUPABASE_URL) return null;
      const { createClient } = supabase;
      const sb = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
      const { data } = await sb.from('contacto_info').select('whatsapp').eq('id', 1).maybeSingle();
      if (data && data.whatsapp && data.whatsapp !== '#') return data.whatsapp.replace('wa.me/c/', 'wa.me/');
    } catch (e) { /* silencioso */ }
    return null;
  }

  const link = await getWppLink();
  if (!link) return; // Si no hay número configurado, no mostramos el botón

  fab.href = link;

  // ── Mostrar al hacer scroll ──────────────────────────────────
  function checkScroll() {
    if (window.scrollY > 80) {
      fab.classList.add('visible');
    } else {
      fab.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();

  // ── Tooltip al hover ─────────────────────────────────────────
  fab.addEventListener('mouseenter', () => tooltip.classList.add('show'));
  fab.addEventListener('mouseleave', () => tooltip.classList.remove('show'));

})();
