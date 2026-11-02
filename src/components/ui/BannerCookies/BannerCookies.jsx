// ============================================================================
// ARCHIVO: BannerCookies.jsx
// RESPONSABILIDAD: Muestra el aviso de cookies al entrar por primera vez.
// 
// CONVENCIÓN: 
// [API] = Textos (vienen de useTextos).
// [LOCAL] = Acciones de aceptar/rechazar.
// [STATIC] = HTML/CSS.
// ============================================================================

import './BannerCookies.css';

// [LOCAL] Recibe los textos de la API y las funciones para los botones.
export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  return (
    // [STATIC] Contenedor con role="dialog" para accesibilidad.
    <div className="banner-cookies" role="dialog" aria-label="Aviso de cookies">
      
      {/* [API] Muestra el mensaje del banner traducido desde la API. */}
      <p>{textos?.mensaje || "Usamos cookies para mejorar tu experiencia."}</p>
      
      <div className="banner-cookies__acciones">
        {/* [LOCAL] Botón de Rechazar. Ejecuta la función pasada por props. */}
        <button type="button" className="banner-cookies__btn" onClick={onRechazar}>
          {textos?.rechazar || "Rechazar"}
        </button>
        
        {/* [LOCAL] Botón de Aceptar. Ejecuta la función pasada por props. */}
        <button type="button" className="banner-cookies__btn banner-cookies__btn--primario" onClick={onAceptar}>
          {textos?.aceptar || "Aceptar"}
        </button>
      </div>
    </div>
  );
}