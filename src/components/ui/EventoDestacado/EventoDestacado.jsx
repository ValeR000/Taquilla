// RESPONSABILIDAD: Tarjeta del evento destacado a la derecha del Hero, con enlace a su detalle.

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import Boton from "../Boton/Boton.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./EventoDestacado.css";

export default function EventoDestacado({
  evento,         // [API] Evento destacado.
  /* SPRINT 2: Valor por defecto del idioma y textos listos desde App */
  en = false,     // [LOCAL] Indica si el idioma es inglés.
  textoEtiqueta = "",
  textoDesde = "",
  textoAccion = "",
  onAbrir,        // [LOCAL] Función para abrir el detalle del evento.
  /* SPRINT 2 */
  cargando = false // Sprint 2: indica si el evento destacado sigue cargando
}) {
  /* SPRINT 2: Hace que mientras carga se vea la tarjeta esqueleto en lugar de un hueco */
  if (!evento && cargando) {
    return <div className="destacado-taquilla destacado-esqueleto" aria-hidden="true" />;
  }
  /* SPRINT 2 */

  // [LOCAL] Hace que no se dibuje nada mientras no haya evento.
  if (!evento) return null;

  return (
    <div className="destacado-taquilla">

      {/* [API] Hace que el afiche se pinte con los colores del evento. */}
      <AficheEvento afiche={evento.afiche} />

      <div className="ficha-destacado">

        {/* [API] Hace que aparezca la etiqueta "Destacado". */}
        <Etiqueta>{textoEtiqueta}</Etiqueta>{/* Sprint 2 */}

        {/* [API] Hace que aparezca el título del evento. */}
        <h2>{evento.titulo}</h2>

        {/* [API] Hace que aparezcan la fecha (sin hora) y el recinto. */}
        <p>
          {formatoFecha(evento.fecha, en, false)} · {evento.recinto?.nombre}
        </p>

        <div>
          {/* [API] Hace que aparezca el precio con "Desde". */}
          <strong>
            {textoDesde.replace("{precio}", formatoDinero(evento.precioDesde))}{/* Sprint 2 */}
          </strong>

          {/* [LOCAL] Hace que "Ver evento" lleve a /eventos/slug sin recargar la página. */}
          <Boton
            href={`/eventos/${evento.slug}`}
            clase="boton-destacado"
            onClick={(e) => {
              e.preventDefault();
              onAbrir(evento);
            }}
          >
            {textoAccion}{/* Sprint 2 */}
          </Boton>
        </div>
      </div>
    </div>
  );
}