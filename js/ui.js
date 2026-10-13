/**
 * js/ui.js — Artilugios
 * Control de componentes visuales, menú móvil, partículas y contacto.
 */

(function () {
  // ── Partículas Cósmicas ──────────────────────────────────────────
  function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const COUNT = window.innerWidth < 768 ? 25 : 45;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      const size = Math.random() * 3 + 1.5;
      p.style.width = `${size}px`;
      p.style.height = `${size}px`;
      p.style.left = `${Math.random() * 100}%`;
      p.style.animationDuration = `${Math.random() * 12 + 8}s`;
      p.style.animationDelay = `${Math.random() * 5}s`;
      p.style.setProperty('--drift', `${Math.random() * 80 - 40}px`);
      container.appendChild(p);
    }
  }

  // ── Scroll Header State ──────────────────────────────────────────
  function handleHeaderScroll() {
    const header = document.querySelector('header.site-header');
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  // ── Menú Móvil Lateral (Drawer) ──────────────────────────────────
  function initMobileNav() {
    const hamburger = document.getElementById('hamburgerBtn');
    const overlay = document.getElementById('mobileNavOverlay');
    const closeBtn = document.getElementById('mobileNavClose');

    if (!hamburger || !overlay) return;

    function openNav() {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeNav() {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openNav);
    if (closeBtn) closeBtn.addEventListener('click', closeNav);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeNav();
    });

    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', closeNav);
    });
  }

  // ── Contacto: Copiar y Cómo Llegar ───────────────────────────────
  window.copiarTexto = function (texto, etiqueta) {
    navigator.clipboard.writeText(texto).then(() => {
      if (window.showSiteToast) {
        window.showSiteToast(`✓ ${etiqueta || 'Texto'} copiado al portapapeles`);
      } else {
        alert('Copiado: ' + texto);
      }
    });
  };

  window.comoLlegar = function () {
    const lat = window._ubicLat;
    const lng = window._ubicLng;
    let destino;
    if (lat && lng) {
      destino = `${lat},${lng}`;
    } else {
      const el = document.getElementById('footer-direccion');
      destino = encodeURIComponent((el && el.textContent) ? el.textContent.trim() : 'El Pinar, Canelones, Uruguay');
    }
    window.open('https://www.google.com/maps/dir/?api=1&destination=' + destino, '_blank');
  };

  window.showSiteToast = function (msg) {
    let toast = document.getElementById('site-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'site-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fas fa-sparkles"></i> <span>${msg}</span>`;
    toast.classList.add('show');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  };

  // ── Inicialización ───────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initMobileNav();
    window.addEventListener('scroll', handleHeaderScroll, { passive: true });
    handleHeaderScroll();
  });
})();
