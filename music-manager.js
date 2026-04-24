/**
 * music-manager.js — Artilugios
 * Mantiene la pista continua entre páginas del mismo grupo musical.
 *
 * Grupos:
 *   "main"    → musica.mp3   (index.html, vivero.html)
 *   "santera" → musica2.mp3  (santeria.html)
 *   "oraculo" → musica3.mp3 (oraculo.html)
 *
 * Uso en cada página:
 *   <script>var MUSIC_GROUP = "main";</script>   ← antes de cargar este script
 *   <script src="music-manager.js"></script>
 *
 * El <audio id="bgMusic"> debe existir en el HTML con su <source> correcto.
 */

(function () {
    const GROUP   = window.MUSIC_GROUP || 'main';
    const KEY_T   = 'music_time_'    + GROUP;   // currentTime
    const KEY_P   = 'music_playing_' + GROUP;   // estaba reproduciendo?

    const music    = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    if (!music || !musicBtn) return;

    let isPlaying = false;

    /* ---------- Restaurar posición guardada ---------- */
    function restore() {
        const savedTime    = parseFloat(sessionStorage.getItem(KEY_T)  || '0');
        const wasPlaying   = sessionStorage.getItem(KEY_P) !== 'false'; // default true

        music.currentTime = isFinite(savedTime) ? savedTime : 0;

        if (wasPlaying) {
            music.play().then(() => {
                isPlaying = true;
                musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
            }).catch(() => {
                isPlaying = false;
                musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
            });
        } else {
            isPlaying = false;
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        }
    }

    /* ---------- Guardar posición al salir ---------- */
    function save() {
        sessionStorage.setItem(KEY_T, music.currentTime);
        sessionStorage.setItem(KEY_P, isPlaying);
    }

    /* ---------- Botón toggle ---------- */
    musicBtn.addEventListener('click', () => {
        if (isPlaying) {
            music.pause();
            musicBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
        } else {
            music.play();
            musicBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
        }
        isPlaying = !isPlaying;
        sessionStorage.setItem(KEY_P, isPlaying);
    });

    /* ---------- Guardar antes de navegar ---------- */
    window.addEventListener('beforeunload', save);
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') save();
    });

    /* ---------- Arrancar ---------- */
    window.addEventListener('load', restore);
})();
