// ============================================================================
// ARCHIVO: TarjetaEvento.jsx
// RESPONSABILIDAD: Muestra la información resumida de un evento en una tarjeta.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import Boton from "../Boton/Boton.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./TarjetaEvento.css";

export default function TarjetaEvento({
  evento,             // [API] Datos del evento.
  /* SPRINT 2: Props listas desde el padre */
  nombreCategoria = "", // [API] Nombre de la categoría, tal como lo trae la API.
  en = false,         // [LOCAL] Indica si el idioma es inglés.
  textoAccion = "",
  textoDesde = "",
  onAccion            // [LOCAL] Función para abrir el detalle del evento.
  /* SPRINT 2 */
}) {
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
            <small>{textoDesde}</small>{/* Sprint 2 */}
            {/* [API] Hace que aparezca el precio en pesos. */}
            <strong>{formatoDinero(evento.precioDesde)}</strong>
          </div>

          {/* [LOCAL] Hace que "Ver evento" lleve a /eventos/slug sin recargar la página. */}
          <Boton
            href={`/eventos/${evento.slug}`}
            variante="contorno"
            clase="boton-evento"
            // [ACCESIBILIDAD] Hace que el lector anuncie qué evento se va a abrir.
            etiqueta={`${textoAccion}: ${evento.titulo}`} // Sprint 2
            onClick={(e) => {
              e.preventDefault();
              onAccion(evento); // Sprint 2
            }}
          >
            {textoAccion}{/* Sprint 2 */}
          </Boton>
        </div>
      </div>
    </article>
  );
}