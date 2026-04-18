# 🔮 Setup del Panel — Artilugios

## Lo que vas a configurar

- **Supabase** como base de datos y storage de imágenes (gratis)
- **panel.html** accesible en `artilugios.vercel.app/panel.html`
- Login con contraseña para Agus
- Los productos aparecen en el sitio en tiempo real

---

## PASO 1 — Crear proyecto en Supabase

1. Entrá a [supabase.com](https://supabase.com) y creá una cuenta gratis
2. Hacé clic en **New Project**
3. Nombre: `artilugios` | Región: `South America (São Paulo)` | Elegí una contraseña fuerte
4. Esperá ~2 minutos a que termine de crear

---

## PASO 2 — Crear la tabla de productos

1. En tu proyecto Supabase, andá a **SQL Editor**
2. Pegá y ejecutá este SQL:

```sql
create table productos (
  id          uuid default gen_random_uuid() primary key,
  created_at  timestamp with time zone default now(),
  seccion     text not null check (seccion in ('santeria','vivero','oraculo')),
  nombre      text not null,
  descripcion text,
  precio      numeric(10,2),
  stock       integer,
  categoria   text,
  imagen_url  text,
  activo      boolean default true
);

-- Política: solo usuarios autenticados pueden modificar
alter table productos enable row level security;

create policy "Lectura pública" on productos
  for select using (true);

create policy "Solo autenticados pueden escribir" on productos
  for all using (auth.role() = 'authenticated');
```

---

## PASO 3 — Crear el bucket de imágenes

1. En Supabase, andá a **Storage** → **New bucket**
2. Nombre: `imagenes`
3. Marcá **Public bucket** ✅
4. Crealo

Después ejecutá esto en el SQL Editor:

```sql
-- Política para que cualquiera pueda ver las imágenes
create policy "Imágenes públicas" on storage.objects
  for select using (bucket_id = 'imagenes');

-- Política para que solo autenticados puedan subir
create policy "Solo autenticados suben imágenes" on storage.objects
  for insert with check (bucket_id = 'imagenes' and auth.role() = 'authenticated');

create policy "Solo autenticados borran imágenes" on storage.objects
  for delete using (bucket_id = 'imagenes' and auth.role() = 'authenticated');
```

---

## PASO 4 — Crear el usuario de Agus

1. En Supabase, andá a **Authentication** → **Users** → **Add user**
2. Email: el de Agus (ej: `agus@artilugios.com`)
3. Contraseña: la que elijan (al menos 8 caracteres)
4. ✅ Habilitá "Auto Confirm User"

---

## PASO 5 — Obtener las credenciales

1. En Supabase, andá a **Project Settings** → **API**
2. Copiá:
   - **Project URL** → algo como `https://abcdefghij.supabase.co`
   - **anon / public key** → la clave larga que empieza con `eyJ...`

---

## PASO 6 — Configurar el proyecto

Abrí el archivo `supabase-config.js` y reemplazá:

```js
const SUPABASE_URL = 'https://TU_PROJECT_ID.supabase.co';  // ← tu Project URL
const SUPABASE_ANON_KEY = 'TU_ANON_PUBLIC_KEY';            // ← tu anon key
```

---

## PASO 7 — Subir los archivos a Vercel

Subí estos archivos nuevos a tu repositorio:
- `panel.html`
- `panel-manifest.json`
- `supabase-config.js`

Vercel los va a deployar automáticamente.

El panel queda en: **`artilugios.vercel.app/panel.html`**

---

## PASO 8 — Instalar como app en el celular

**En iPhone (Safari):**
1. Abrí `artilugios.vercel.app/panel.html` en Safari
2. Tocá el botón de compartir (cuadrado con flecha)
3. "Agregar a pantalla de inicio"
4. Listo — aparece como app

**En Android (Chrome):**
1. Abrí la URL en Chrome
2. Aparece un banner automático "Instalar app"
3. O entrá al menú ⋮ → "Agregar a pantalla de inicio"

---

## PASO 9 — Mostrar productos en el sitio

Para que los productos de Supabase aparezcan en `santeria.html`, `vivero.html` y `oraculo.html`, agregá esto en cada página donde quieras mostrar productos:

```html
<!-- En el <head> -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
<script src="supabase-config.js"></script>

<!-- Donde quieras mostrar los productos -->
<div id="productos-grid"></div>

<script>
const { createClient } = supabase;
const sb = createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

async function cargarProductos() {
  const { data } = await sb
    .from('productos')
    .select('*')
    .eq('seccion', 'santeria')  // ← cambiar según la página: 'vivero' u 'oraculo'
    .eq('activo', true)
    .order('created_at', { ascending: false });

  const grid = document.getElementById('productos-grid');
  if (!data || data.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);text-align:center">Próximamente...</p>';
    return;
  }

  grid.innerHTML = data.map(p => `
    <div class="card">
      ${p.imagen_url ? `<img src="${p.imagen_url}" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:12px">` : ''}
      <h3>${p.nombre}</h3>
      <p>${p.descripcion || ''}</p>
      ${p.precio ? `<strong style="color:var(--accent)">$${Number(p.precio).toLocaleString('es-UY')}</strong>` : ''}
    </div>
  `).join('');
}

cargarProductos();
</script>
```

---

## Preguntas frecuentes

**¿Cuánto cuesta Supabase?**
El plan gratuito incluye 500MB de base de datos y 1GB de storage. Más que suficiente para empezar.

**¿Se puede agregar otro usuario después?**
Sí, desde Authentication → Users en cualquier momento.

**¿Las imágenes tienen un tamaño máximo?**
Supabase permite hasta 50MB por archivo. Recomendamos no subir fotos de más de 2MB para que el sitio cargue rápido.
