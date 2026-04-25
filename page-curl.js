// ============================================================
// PAGE CURL — OtroMundo
// Incluir al final del <body> en cada página.
// ============================================================
(function() {

  const LOGO = 'data:image/png;base64,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';
  const WPP_NUM = '59894691690';
  const WPP_MSG = encodeURIComponent('Hola! Te contacto desde OtroMundo 🌙');
  const WPP_URL = 'https://wa.me/' + WPP_NUM + '?text=' + WPP_MSG;
  const NOMBRE  = 'OtroMundo';

  // Inyectar estilos
  const style = document.createElement('style');
  style.textContent = `
    #page-curl-wrap {
      position: fixed;
      bottom: 0;
      left: 0;
      width: 90px;
      height: 90px;
      z-index: 9999;
      cursor: pointer;
      /* El triángulo doblado */
      filter: drop-shadow(3px -3px 6px rgba(0,0,0,0.5));
      transition: width 0.45s cubic-bezier(0.4,0,0.2,1),
                  height 0.45s cubic-bezier(0.4,0,0.2,1);
    }

    #page-curl-wrap.open {
      width: 220px;
      height: 220px;
    }

    /* La "página" doblada — triángulo SVG */
    #page-curl-svg {
      position: absolute;
      bottom: 0; right: 0;
      width: 100%; height: 100%;
      transition: width 0.45s cubic-bezier(0.4,0,0.2,1),
                  height 0.45s cubic-bezier(0.4,0,0.2,1);
    }

    /* Contenido que aparece al abrir */
    #page-curl-content {
      position: absolute;
      bottom: 0; left: 0;
      width: 100%; height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.25s ease 0.15s;
      padding-bottom: 14px;
      padding-left: 10px;
    }

    #page-curl-wrap.open #page-curl-content {
      opacity: 1;
      pointer-events: auto;
    }

    #curl-logo {
      width: 54px;
      height: 54px;
      object-fit: contain;
      filter: drop-shadow(0 0 8px rgba(212,175,55,0.6));
      border-radius: 50%;
    }

    #curl-nombre {
      font-family: 'Cinzel', serif;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 3px;
      color: #d4af37;
      text-shadow: 0 0 12px rgba(212,175,55,0.8);
      text-transform: uppercase;
      text-align: center;
      line-height: 1;
    }

    #curl-wpp {
      display: flex;
      align-items: center;
      gap: 6px;
      background: #25d366;
      color: #fff;
      text-decoration: none;
      font-family: 'Cinzel', serif;
      font-size: 0.65rem;
      font-weight: 700;
      letter-spacing: 1px;
      padding: 6px 12px;
      border-radius: 20px;
      transition: transform 0.2s, box-shadow 0.2s;
      box-shadow: 0 2px 10px rgba(37,211,102,0.4);
      white-space: nowrap;
    }

    #curl-wpp:hover {
      transform: scale(1.07);
      box-shadow: 0 4px 16px rgba(37,211,102,0.6);
    }

    #curl-wpp svg {
      width: 14px; height: 14px; fill: #fff; flex-shrink: 0;
    }

    /* Logo pequeño en la esquina cuando está cerrado */
    #curl-thumb {
      position: absolute;
      bottom: 12px;
      left: 12px;
      width: 42px;
      height: 42px;
      object-fit: contain;
      border-radius: 50%;
      transition: opacity 0.2s;
      pointer-events: none;
    }

    #page-curl-wrap.open #curl-thumb {
      opacity: 0;
    }
  `;
  document.head.appendChild(style);

  // SVG del rizo — triángulo que simula la esquina doblada
  const svgNS = 'http://www.w3.org/2000/svg';

  function buildWrap() {
    const wrap = document.createElement('div');
    wrap.id = 'page-curl-wrap';

    // SVG de fondo (el triángulo de página)
    wrap.innerHTML = `
      <svg id="page-curl-svg" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="curlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%"   stop-color="#1a1400"/>
            <stop offset="100%" stop-color="#2e2000"/>
          </linearGradient>
          <linearGradient id="curlEdge" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stop-color="#d4af37" stop-opacity="0"/>
            <stop offset="100%" stop-color="#d4af37" stop-opacity="0.7"/>
          </linearGradient>
          <filter id="curlShadow">
            <feDropShadow dx="-2" dy="-2" stdDeviation="3" flood-color="rgba(0,0,0,0.6)"/>
          </filter>
        </defs>
        <!-- Triángulo principal (la hoja doblada) -->
        <polygon points="220,220 0,0 0,220"
          fill="url(#curlGrad)"
          filter="url(#curlShadow)"/>
        <!-- Borde dorado diagonal -->
        <line x1="220" y1="220" x2="0" y2="0"
          stroke="url(#curlEdge)" stroke-width="1.5"/>
        <!-- Brillo sutil en el triángulo -->
        <polygon points="100,220 0,120 0,220"
          fill="rgba(212,175,55,0.06)"/>
      </svg>

      <!-- Logo pequeño visible siempre en la esquina -->
      <img id="curl-thumb" src="${LOGO}" alt="OtroMundo"/>

      <!-- Contenido expandido -->
      <div id="page-curl-content">
        <img id="curl-logo" src="${LOGO}" alt="OtroMundo"/>
        <div id="curl-nombre">${NOMBRE}</div>
        <a id="curl-wpp" href="${WPP_URL}" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.522 5.852L.057 23.75a.5.5 0 00.614.633l6.077-1.594A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.716 9.716 0 01-4.95-1.352l-.355-.21-3.676.964.981-3.578-.232-.368A9.718 9.718 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
          </svg>
          WhatsApp
        </a>
      </div>
    `;

    return wrap;
  }

  function init() {
    const wrap = buildWrap();
    document.body.appendChild(wrap);

    let isOpen = false;

    function open() {
      if (!isOpen) { isOpen = true; wrap.classList.add('open'); }
    }
    function close() {
      if (isOpen) { isOpen = false; wrap.classList.remove('open'); }
    }
    function toggle() { isOpen ? close() : open(); }

    // Click / tap
    wrap.addEventListener('click', function(e) {
      // Si clickearon el link de wpp, no cerrar
      if (e.target.closest('#curl-wpp')) return;
      toggle();
    });

    // Hover en desktop
    wrap.addEventListener('mouseenter', open);
    wrap.addEventListener('mouseleave', close);

    // En móvil: abrir cuando el usuario llega al fondo de la página
    if ('IntersectionObserver' in window) {
      const sentinel = document.createElement('div');
      sentinel.style.cssText = 'position:absolute;bottom:0;left:0;width:1px;height:1px;pointer-events:none;';
      document.body.style.position = 'relative';
      document.body.appendChild(sentinel);

      const obs = new IntersectionObserver(function(entries) {
        if (entries[0].isIntersecting) open();
        else close();
      }, { threshold: 1.0 });
      obs.observe(sentinel);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
