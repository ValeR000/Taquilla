// ============================================================================
// ARCHIVO: TarjetaEvento.jsx
// RESPONSABILIDAD: Muestra la información resumida de un evento en una tarjeta.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./TarjetaEvento.css";

export default function TarjetaEvento({
  evento,             // [API] Datos del evento.
  onAbrir,            // [LOCAL] Función para abrir el detalle del evento.
  nombreCategoria,    // [API] Nombre de la categoría, tal como lo trae la API.
  en,                 // [LOCAL] Indica si el idioma es inglés.
  textos              // [API] Textos de la interfaz.
}) {
  // ==========================================
  // BLOQUE A: TEXTOS
  // ==========================================

  // [API] Hace que los textos de la tarjeta estén a mano.
  const t = textos?.paginas?.inicio?.tarjeta;

  // [LOCAL] Hace que se use el texto de la API o, si falta, el de respaldo en el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  const verEvento = tr(t?.botones?.verEvento, "Ver evento", "View event");

  return (
    <article className="tarjeta-evento">

      {/* [API] Hace que el afiche se pinte con los colores del evento. */}
      <AficheEvento afiche={evento.afiche} />

      <div className="contenido-evento">

        {/* [API] Hace que aparezca la categoría. */}
        <Etiqueta>{nombreCategoria || evento.categoria}</Etiqueta>

        {/* [API] Hace que aparezca el título del evento. */}
        <h3>{evento.titulo}</h3>

        <p>
          <IconoEvento tipo="fecha" />
          {/* [API] Hace que aparezca la fecha y hora en el idioma actual. */}
          {formatoFecha(evento.fecha, en)}
        </p>

        <p>
          <IconoEvento tipo="lugar" />
          {/* [API] Hace que aparezcan el recinto y la ciudad. */}
          {evento.recinto?.nombre}, {evento.recinto?.ciudad}
        </p>

        <div className="precio-evento">
          <div>
            {/* [API] Hace que aparezca "Desde". */}
            <small>{tr(t?.desde, "Desde", "From")}</small>
            {/* [API] Hace que aparezca el precio en pesos. */}
            <strong>{formatoDinero(evento.precioDesde)}</strong>
          </div>

          {/* [LOCAL] Hace que "Ver evento" lleve a /eventos/slug sin recargar la página. */}
          <a
            href={`/eventos/${evento.slug}`}
            className="boton-evento"
            // [ACCESIBILIDAD] Hace que el lector anuncie qué evento se va a abrir.
            aria-label={`${verEvento}: ${evento.titulo}`}
            onClick={(e) => {
              e.preventDefault();
              onAbrir(evento);
            }}
          >
            {verEvento}
          </a>
        </div>
      </div>
    </article>
  );
}