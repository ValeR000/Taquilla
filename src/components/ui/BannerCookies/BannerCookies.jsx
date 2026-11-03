// ============================================================================
// ARCHIVO: BannerCookies.jsx
// RESPONSABILIDAD: Muestra el aviso de cookies.
// CONVENCIÓN: [API] para textos, [LOCAL] para funciones, [STATIC] para HTML.
// ============================================================================

import "./BannerCookies.css";

export default function BannerCookies({ textos, onAceptar, onRechazar, onConfigurar }) {
  return (
    <aside className="banner-cookies" aria-label={textos?.titulo || "Aviso de cookies"}>
      {/* [API] Hace que aparezca el título desde la API. */}
      <h2>{textos?.titulo || "Tu privacidad nos importa"}</h2>
      
      {/* [API] Hace que aparezca la descripción desde la API. */}
      <p>{textos?.descripcion || "Usamos cookies para mejorar tu experiencia."}</p>
      
      <div className="grupo-botones">
        {/* [LOCAL] Botón de Aceptar. */}
        <button className="boton-home primario" onClick={onAceptar}>
          {textos?.aceptar || "Aceptar"}
        </button>
        {/* [LOCAL] Botón de Rechazar. */}
        <button className="boton-home secundario" onClick={onRechazar}>
          {textos?.rechazar || "Rechazar"}
        </button>
        {/* [LOCAL] Botón de Configurar (opcional según US). */}
        <button className="enlace-home" onClick={onConfigurar}>
          {textos?.configurar || "Configurar"}
        </button>
      </div>
    </aside>
  );
}