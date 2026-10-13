/**
 * js/cart.js — Artilugios
 * Carrito de compras y pedidos multi-producto integrado con WhatsApp.
 */

(function () {
  const STORAGE_KEY = 'artilugios_cart';
  let cart = [];

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  function saveCart() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
    updateBadge();
    renderCart();
  }

  function updateBadge() {
    const totalCount = cart.reduce((acc, item) => acc + item.cantidad, 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) {
        badge.classList.add('has-items');
      } else {
        badge.classList.remove('has-items');
      }
    });
  }

  function showToast(msg) {
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
    }, 2400);
  }

  function addItem(product) {
    if (!product || !product.id) return;
    const existing = cart.find(x => x.id === product.id);
    if (existing) {
      existing.cantidad += 1;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: Number(product.precio) || 0,
        imagen_url: product.imagen_url || '',
        seccion: product.seccion || '',
        cantidad: 1
      });
    }
    saveCart();
    showToast(`"${product.nombre}" agregado al pedido`);
  }

  function removeItem(id) {
    cart = cart.filter(x => x.id !== id);
    saveCart();
  }

  function updateQty(id, delta) {
    const item = cart.find(x => x.id === id);
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      removeItem(id);
    } else {
      saveCart();
    }
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function openCart() {
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      renderCart();
    }
  }

  function closeCart() {
    const overlay = document.getElementById('cartOverlay');
    if (overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderCart() {
    const body = document.getElementById('cartItemsList');
    const totalEl = document.getElementById('cartSubtotal');
    if (!body || !totalEl) return;

    if (cart.length === 0) {
      body.innerHTML = `
        <div class="cart-empty">
          <i class="fas fa-hand-sparkles"></i>
          <p>Tu caldero de pedidos está vacío</p>
          <span style="font-size:0.85rem;color:var(--text-dim);">Explorá la tienda o el vivero para agregar elementos a tu pedido.</span>
        </div>`;
      totalEl.textContent = '$0 UYU';
      const submitBtn = document.getElementById('cartSubmitBtn');
      if (submitBtn) submitBtn.style.opacity = '0.5';
      return;
    }

    const submitBtn = document.getElementById('cartSubmitBtn');
    if (submitBtn) submitBtn.style.opacity = '1';

    let total = 0;
    body.innerHTML = cart.map(item => {
      const itemSubtotal = item.precio * item.cantidad;
      total += itemSubtotal;
      const imgTag = item.imagen_url
        ? `<img src="${item.imagen_url}" class="cart-item-img" alt="${item.nombre}">`
        : `<div class="cart-item-img" style="display:flex;align-items:center;justify-content:center;color:var(--gold);"><i class="fas fa-moon"></i></div>`;

      return `
        <div class="cart-item" data-id="${item.id}">
          ${imgTag}
          <div class="cart-item-details">
            <div class="cart-item-name" title="${item.nombre}">${item.nombre}</div>
            <div class="cart-item-price">$${item.precio.toLocaleString('es-UY')} UYU</div>
            <div class="cart-qty-controls">
              <button class="cart-qty-btn" onclick="window.Cart.updateQty('${item.id}', -1)">-</button>
              <span class="cart-qty-num">${item.cantidad}</span>
              <button class="cart-qty-btn" onclick="window.Cart.updateQty('${item.id}', 1)">+</button>
            </div>
          </div>
          <button class="cart-item-del" onclick="window.Cart.remove('${item.id}')" title="Quitar producto">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>`;
    }).join('');

    totalEl.textContent = `$${total.toLocaleString('es-UY')} UYU`;
  }

  function sendWhatsAppOrder() {
    if (cart.length === 0) return;

    let subtotal = 0;
    let listText = '';
    cart.forEach(item => {
      const p = item.precio * item.cantidad;
      subtotal += p;
      listText += `• ${item.cantidad}x ${item.nombre} ($${p.toLocaleString('es-UY')} UYU)\n`;
    });

    const noteEl = document.getElementById('cartNotes');
    const note = noteEl ? noteEl.value.trim() : '';

    let msg = `✨ *¡Hola Artilugios! Quiero realizar el siguiente pedido:* ✨\n\n`;
    msg += listText;
    msg += `\n💰 *Total estimado:* $${subtotal.toLocaleString('es-UY')} UYU\n`;

    if (note) {
      msg += `\n📝 *Nota / Detalle:* ${note}\n`;
    }

    msg += `\n¿Cómo coordinamos el pago y la entrega / retiro? ¡Muchas gracias!`;

    const phone = window._wppNum || '59898496320';
    const cleanPhone = phone.replace(/\D/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  // Inyectar Drawer del Carrito si no está en el DOM
  function injectCartDrawer() {
    if (document.getElementById('cartOverlay')) return;

    const drawer = document.createElement('div');
    drawer.id = 'cartOverlay';
    drawer.className = 'cart-overlay';
    drawer.innerHTML = `
      <div class="cart-drawer">
        <div class="cart-header">
          <div class="cart-title">
            <i class="fas fa-shopping-bag"></i> TU PEDIDO
          </div>
          <button class="cart-close-btn" onclick="window.Cart.close()">&times;</button>
        </div>
        <div class="cart-body" id="cartItemsList"></div>
        <div class="cart-footer">
          <div class="cart-subtotal-row">
            <span class="cart-subtotal-label">Subtotal:</span>
            <span class="cart-subtotal-val" id="cartSubtotal">$0 UYU</span>
          </div>
          <textarea id="cartNotes" class="cart-note-input" placeholder="Comentarios o aclaraciones de tu pedido (opcional)..."></textarea>
          <button class="cart-wpp-submit" id="cartSubmitBtn" onclick="window.Cart.sendWhatsAppOrder()">
            <i class="fab fa-whatsapp" style="font-size:1.2rem;"></i> ENVIAR PEDIDO POR WHATSAPP
          </button>
        </div>
      </div>
    `;

    drawer.addEventListener('click', (e) => {
      if (e.target.id === 'cartOverlay') closeCart();
    });

    document.body.appendChild(drawer);
  }

  window.Cart = {
    add: addItem,
    remove: removeItem,
    updateQty: updateQty,
    clear: clearCart,
    open: openCart,
    close: closeCart,
    sendWhatsAppOrder: sendWhatsAppOrder,
    getItems: () => [...cart]
  };

  document.addEventListener('DOMContentLoaded', () => {
    injectCartDrawer();
    updateBadge();
    renderCart();

    document.querySelectorAll('.btn-open-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCart();
      });
    });
  });
})();
