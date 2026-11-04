// ============================================================================
// ARCHIVO: BannerCookies.jsx
// RESPONSABILIDAD: Muestra el aviso flotante de cookies en la parte inferior.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import "./BannerCookies.css";
import Boton from "../Boton/Boton.jsx"; // [STATIC] Importamos tu componente de botón

export default function BannerCookies({ textos, onAceptar, onRechazar }) {
  return (
    // [STATIC] Contenedor principal tipo "aside" para accesibilidad.
    <aside className="banner-cookies" aria-label={textos?.titulo || "Aviso de cookies"}>
      
      <div className="banner-cookies__contenido">
        {/* [API] Hace que aparezca el título desde la API o un texto por defecto. */}
        <h2>{textos?.titulo || "Usamos cookies"}</h2>
        
        {/* [API] Hace que aparezca la descripción desde la API o el texto por defecto. */}
        <p>{textos?.descripcion || "Usamos solo las cookies necesarias para mantener tu sesión y recordar tu idioma. Puedes aceptarlas o rechazarlas."}</p>
      </div>
      
      <div className="banner-cookies__acciones">
        {/* [LOCAL] Botón de Rechazar. Ejecuta la función pasada por props. */}
        <Boton variante="secundario" onClick={onRechazar}>
          {/* [API] Texto desde la API o por defecto. */}
          {textos?.rechazar || "Rechazar"}
        </Boton>
        
        {/* [LOCAL] Botón de Aceptar. Ejecuta la función pasada por props. */}
        <Boton variante="primario" onClick={onAceptar}>
          {/* [API] Texto desde la API o por defecto. */}
          {textos?.aceptar || "Aceptar"}
        </Boton>
      </div>
      
    </aside>
  );
}