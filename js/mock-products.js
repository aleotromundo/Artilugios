/**
 * ARTILUGIOS - Catálogo Mock de Demostración con Imágenes de Alta Definición
 * Provee productos simulados realistas cuando la base de datos Supabase
 * está vacía, sin conexión o en modo demostración local.
 */

window.MOCK_PRODUCTOS = [
    // --- TIENDA ESOTÉRICA (seccion: 'santeria') ---
    {
        id: 'mock-s-1',
        nombre: 'Velas de Miel Puras para Endulzamiento y Prosperidad',
        descripcion: 'Cera 100% pura de abejas enrollada artesanalmente con aroma a miel virgen.',
        descripcion_larga: 'Elaboradas con cera pura de abeja de apicultores locales. La energía de la miel y el fuego solar potencia pedidos de dulzura, armonía en el hogar, apertura de caminos y prosperidad económica. Duración estimada: 4 horas por vela. Pack de 3 unidades.',
        precio: 380,
        seccion: 'santeria',
        categoria: 'Velas',
        imagen_url: 'img/productos/velas-miel.jpg',
        galeria_urls: ['img/productos/velas-miel.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 'mock-s-2',
        nombre: 'Sahumerio Artesanal de Salvia Blanca y Romero',
        descripcion: 'Atado rústico para sahumado profundo del aura y purificación de ambientes.',
        descripcion_larga: 'Atado vegetal de salvia blanca silvestre, ramas de romero de nuestro jardín y flores de lavanda. Ideal para descargar energías densas en el hogar, recibir solsticios o consagrar nuevos proyectos y altares.',
        precio: 290,
        seccion: 'santeria',
        categoria: 'Sahumerios',
        imagen_url: 'img/productos/sahumerio-hierbas.jpg',
        galeria_urls: ['img/productos/sahumerio-hierbas.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
        id: 'mock-s-3',
        nombre: 'Resina Copal e Incienso Sagrado del Tíbet',
        descripcion: 'Lágrimas de resina pura para defumar sobre carbón litúrgico.',
        descripcion_larga: 'Resina 100% natural recolectada éticamente. Al calentarse sobre carbón encendido desprende un aroma balsámico y amaderado que eleva la frecuencia vibratoria, induce estados meditativos y disipa bloqueos espirituales.',
        precio: 450,
        seccion: 'santeria',
        categoria: 'Inciensos',
        imagen_url: 'img/productos/incienso-resina.jpg',
        galeria_urls: ['img/productos/incienso-resina.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
        id: 'mock-s-4',
        nombre: 'Amuleto Sagrado Ojo Turco y Cuarzo Protector',
        descripcion: 'Talisman artesanal de protección contra envidias y mal de ojo.',
        descripcion_larga: 'Pieza consagrada en ritual lunar con cristal de cuarzo genuino engarzado y amuleto nazarí de vidrio soplado. Listo para colgar en la entrada del hogar, automóvil o llevar como dije personal.',
        precio: 620,
        seccion: 'santeria',
        categoria: 'Amuletos',
        imagen_url: 'img/productos/amuleto-proteccion.jpg',
        galeria_urls: ['img/productos/amuleto-proteccion.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        id: 'mock-s-5',
        nombre: 'Drusa Natural de Amatista Violeta de Rivera',
        descripcion: 'Geoda cristalina uruguaya para transmutación energética y calma mental.',
        descripcion_larga: 'Genuina amatista extraída en el norte de Uruguay, famosa mundialmente por su intenso tono violeta. Actúa transmutando pensamientos negativos en energía de luz y favorece el descanso reparador en dormitorios.',
        precio: 890,
        seccion: 'santeria',
        categoria: 'Cristales',
        imagen_url: 'img/productos/cristal-amatista.jpg',
        galeria_urls: ['img/productos/cristal-amatista.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },
    {
        id: 'mock-s-6',
        nombre: 'Velón Ritual de Descarga y Corte 7 Días',
        descripcion: 'Velón consagrado para disolver negatividad y cortar lazos densos.',
        descripcion_larga: 'Cilindro de cera vegetal de combustión lenta de 7 días continuos. Indicado para rituales de corte de maleficios, limpieza profunda de negocios y desbloqueo de situaciones estancadas.',
        precio: 320,
        seccion: 'santeria',
        categoria: 'Velas',
        imagen_url: 'img/productos/vela-ritual-negra.jpg',
        galeria_urls: ['img/productos/vela-ritual-negra.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 7).toISOString()
    },

    // --- VIVERO HOLÍSTICO (seccion: 'vivero') ---
    {
        id: 'mock-v-1',
        nombre: 'Planta de Ruda Macho Protectora en Maceta Terracota',
        descripcion: 'Guardián botánico ancestral para proteger la entrada del hogar.',
        descripcion_larga: 'Ejemplar rústico y vigoroso cultivado de forma agroecológica sin químicos. La ruda (Ruta chalepensis) es la planta reina de protección en la tradición popular uruguaya. Incluye maceta de barro cocido.',
        precio: 350,
        seccion: 'vivero',
        categoria: 'Medicinales',
        imagen_url: 'img/productos/planta-ruda.jpg',
        galeria_urls: ['img/productos/planta-ruda.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
        id: 'mock-v-2',
        nombre: 'Lavanda Francesa Aromática de Jardín',
        descripcion: 'Fragancia relajante que ahuyenta insectos y atrae polinizadores.',
        descripcion_larga: 'Arbusto perenne de flores púrpuras y follaje grisáceo sumamente aromático. Tolera pleno sol y vientos costeros de Canelones. Sus flores secas pueden cosecharse para infusiones y almohadillas terapéuticas.',
        precio: 420,
        seccion: 'vivero',
        categoria: 'Aromáticas',
        imagen_url: 'img/productos/planta-lavanda.jpg',
        galeria_urls: ['img/productos/planta-lavanda.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 'mock-v-3',
        nombre: 'Monstera Deliciosa (Costilla de Adán) Extra Grande',
        descripcion: 'Hojas exuberantes fenestradas para armonizar espacios interiores.',
        descripcion_larga: 'Impresionante planta tropical de interior con hojas de gran porte. Purifica el aire del ambiente y aporta una estética selvática y calma a cualquier rincón luminoso sin sol directo.',
        precio: 1450,
        seccion: 'vivero',
        categoria: 'Interior',
        imagen_url: 'img/productos/monstera-deliciosa.jpg',
        galeria_urls: ['img/productos/monstera-deliciosa.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
        id: 'mock-v-4',
        nombre: 'Ficus Lyrata Elegante de Salón',
        descripcion: 'Árbol higuera de hojas violín para transformar tu sala o estudio.',
        descripcion_larga: 'Una de las plantas de interior más deseadas por su porte majestuoso y hojas de textura coriácea. Prospera en sitios con muy buena luz indirecta y riegos moderados.',
        precio: 1850,
        seccion: 'vivero',
        categoria: 'Interior',
        imagen_url: 'img/productos/ficus-interior.jpg',
        galeria_urls: ['img/productos/ficus-interior.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
        id: 'mock-v-5',
        nombre: 'Limonero Cuatro Estaciones en Maceta Biodegradable',
        descripcion: 'Cítrico injertado que florece y da frutos frescos todo el año.',
        descripcion_larga: 'Árbol frutal adaptado al clima de la costa de Canelones. Provee limones jugosos prácticamente todo el año, además del inconfundible aroma a azahar de sus flores en primavera.',
        precio: 1600,
        seccion: 'vivero',
        categoria: 'Frutales',
        imagen_url: 'img/productos/arbol-citrico.jpg',
        galeria_urls: ['img/productos/arbol-citrico.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    },
    {
        id: 'mock-v-6',
        nombre: 'Trío de Hierbas Sagradas (Romero, Tomillo y Menta)',
        descripcion: 'Combo botánico para tu huerta o cocina medicinal casera.',
        descripcion_larga: 'Set de 3 plantines listos para trasplante o macetón. Combinación ideal para sazonar platos naturales, preparar tisanas digestivas y realizar sahumados frescos.',
        precio: 490,
        seccion: 'vivero',
        categoria: 'Aromáticas',
        imagen_url: 'img/productos/plantas-aromaticas.jpg',
        galeria_urls: ['img/productos/plantas-aromaticas.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 6).toISOString()
    },

    // --- MANCIAS Y SANACIÓN (seccion: 'oraculo') ---
    {
        id: 'mock-m-1',
        nombre: 'Sesión de Tameana y Alineación de Centros Energéticos',
        descripcion: 'Terapia vibracional con cristales de cuarzo y símbolos pleyadianos.',
        descripcion_larga: 'Terapia energética de alta vibración desarrollada con puntas de cuarzo maestro. Ayuda a liberar angustias, restaurar el campo electromagnético y conectar con tu propósito interior. Modalidad presencial en El Pinar o a distancia.',
        precio: 1600,
        seccion: 'oraculo',
        categoria: 'Terapias',
        imagen_url: 'img/productos/sesion-tameana.jpg',
        galeria_urls: ['img/productos/sesion-tameana.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 1).toISOString()
    },
    {
        id: 'mock-m-2',
        nombre: 'Lectura Integral de Tarot Terapéutico y Evolutivo',
        descripcion: 'Orientación arquetípica para clarificar momentos de decisión y autoconocimiento.',
        descripcion_larga: 'Una mirada reflexiva de 60 minutos a través de los Arcanos Mayores y Menores. No predecimos un destino rígido, sino que exploramos las influencias inconscientes para que tomes las mejores decisiones con plena conciencia.',
        precio: 1400,
        seccion: 'oraculo',
        categoria: 'Lecturas',
        imagen_url: 'img/productos/lectura-tarot.jpg',
        galeria_urls: ['img/productos/lectura-tarot.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 2).toISOString()
    },
    {
        id: 'mock-m-3',
        nombre: 'Juego de Runas Vikingas en Madera Sagrada con Bolsa',
        descripcion: '24 runas del Futhark antiguo grabadas al fuego sobre madera noble.',
        descripcion_larga: 'Oráculo de tradición nórdica consagrado y pulido a mano. Incluye saquito de terciopelo artesanal y guía básica explicativa de los símbolos rúnicos y tiradas de consulta rápida.',
        precio: 980,
        seccion: 'oraculo',
        categoria: 'Oráculos',
        imagen_url: 'img/productos/runas-vikingas.jpg',
        galeria_urls: ['img/productos/runas-vikingas.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    {
        id: 'mock-m-4',
        nombre: 'Péndulo de Cuarzo Cristal Facetado para Radiestesia',
        descripcion: 'Instrumento de precisión para diagnóstico de chakras y consulta energética.',
        descripcion_larga: 'Punta facetada de cuarzo transparente con cadena de aleación dorada y tope de esfera. Excelente sensibilidad para preguntas de radiestesia, testeo de alimentos o desbloqueo de meridianos sutiles.',
        precio: 750,
        seccion: 'oraculo',
        categoria: 'Radiestesia',
        imagen_url: 'img/productos/pendulo-cuarzo.jpg',
        galeria_urls: ['img/productos/pendulo-cuarzo.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 4).toISOString()
    },
    {
        id: 'mock-m-5',
        nombre: 'Sesión de Armonización con Cuenco Tibetano y Sonoterapia',
        descripcion: 'Inmersión acústica para inducir estados alfa, relajación profunda y alivio.',
        descripcion_larga: 'Masaje sonoro con cuencos de 7 metales forjados a mano. Las ondas armónicas masajean a nivel celular y serenar el sistema nervioso, liberando contracturas sutiles acumuladas por el estrés cotidiano.',
        precio: 1500,
        seccion: 'oraculo',
        categoria: 'Terapias',
        imagen_url: 'img/productos/cuenco-sonoterapia.jpg',
        galeria_urls: ['img/productos/cuenco-sonoterapia.jpg'],
        activo: true,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString()
    }
];

// Helper para obtener productos por sección
window.getMockProductos = function(seccion) {
    if (!seccion || seccion === 'todos') return window.MOCK_PRODUCTOS;
    return window.MOCK_PRODUCTOS.filter(p => p.seccion === seccion);
};
