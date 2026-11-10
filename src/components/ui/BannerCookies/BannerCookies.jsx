// RESPONSABILIDAD: Aviso de cookies de la primera visita, con los botones Aceptar y Rechazar.

import "./BannerCookies.css";
import Boton from "../Boton/Boton.jsx";

export default function BannerCookies({
  textos,       // [API] Textos de cookies.banner.
  en,           // [LOCAL] Indica si el idioma es inglés.
  onAceptar,    // [LOCAL] Función para aceptar las cookies.
  onRechazar,   // [LOCAL] Función para rechazar las cookies.
}) {
  // [LOCAL] Hace que se use el texto de la API o, si falta, el de respaldo en el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  const titulo = tr(textos?.titulo, "Usamos cookies", "We use cookies");

  return (
    // [ACCESIBILIDAD] Hace que el lector de pantalla anuncie el aviso con su título.
    <aside className="banner-cookies" aria-label={titulo}>

      <div className="banner-cookies__contenido">
        {/* [API] Hace que aparezca el título del aviso. */}
        <h2>{titulo}</h2>

        {/* [API] Hace que aparezca el texto del aviso. */}
        <p>
          {tr(
            textos?.texto,
            "Usamos solo las cookies necesarias para mantener tu sesión y recordar tu idioma. Puedes aceptarlas o rechazarlas.",
            "We only use the cookies needed to keep you logged in and remember your language. You can accept or reject them."
          )}
        </p>
      </div>

      <div className="banner-cookies__acciones">
        {/* [LOCAL] Hace que se rechacen las cookies al hacer clic. */}
        <Boton variante="secundario" onClick={onRechazar}>
          {tr(textos?.botones?.rechazar, "Rechazar", "Reject")}
        </Boton>

        {/* [LOCAL] Hace que se acepten las cookies al hacer clic. */}
        <Boton variante="primario" onClick={onAceptar}>
          {tr(textos?.botones?.aceptar, "Aceptar", "Accept")}
        </Boton>
      </div>

    </aside>
  );
}