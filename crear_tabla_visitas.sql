-- TABLA DE VISITAS para tracking del sitio Artilugios
CREATE TABLE visitas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  seccion TEXT,                  -- 'santeria' | 'vivero' | 'oraculo' | null (página principal)
  producto_nombre TEXT,          -- nombre del producto visto (si abrió uno)
  producto_id TEXT,              -- id del producto visto
  pais TEXT,                     -- país del visitante
  ciudad TEXT,                   -- ciudad del visitante
  dispositivo TEXT,              -- 'mobile' | 'tablet' | 'desktop'
  referrer TEXT,                 -- de dónde vino (google, instagram, directo, etc.)
  user_agent TEXT                -- info del navegador
);

-- Seguridad: cualquiera puede INSERTAR (el script del catálogo lo necesita)
ALTER TABLE visitas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir insercion publica de visitas" ON visitas
  FOR INSERT TO public WITH CHECK (true);

-- Solo el admin logueado puede LEER las visitas
CREATE POLICY "Solo admin puede leer visitas" ON visitas
  FOR SELECT TO authenticated USING (true);
