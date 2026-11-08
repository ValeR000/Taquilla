// RESPONSABILIDAD: Tarjeta del evento destacado a la derecha del Hero, con enlace a su detalle.

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./EventoDestacado.css";

export default function EventoDestacado({
  evento,         // [API] Evento destacado.
  en,             // [LOCAL] Indica si el idioma es inglés.
  textos,         // [API] Textos de la interfaz.
  onAbrir         // [LOCAL] Función para abrir el detalle del evento.
}) {
  // [LOCAL] Hace que no se dibuje nada mientras no haya evento.
  if (!evento) return null;

  // [API] Hace que los textos del destacado estén a mano.
  const d = textos?.paginas?.inicio?.hero?.destacado;

  // [LOCAL] Hace que se use el texto de la API o, si falta, el de respaldo en el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  return (
    <div className="destacado-taquilla">

      {/* [API] Hace que el afiche se pinte con los colores del evento. */}
      <AficheEvento afiche={evento.afiche} />

      <div className="ficha-destacado">

        {/* [API] Hace que aparezca la etiqueta "Destacado". */}
        <Etiqueta>{tr(d?.etiqueta, "Destacado", "Featured")}</Etiqueta>

        {/* [API] Hace que aparezca el título del evento. */}
        <h2>{evento.titulo}</h2>

        {/* [API] Hace que aparezcan la fecha (sin hora) y el recinto. */}
        <p>
          {formatoFecha(evento.fecha, en, false)} · {evento.recinto?.nombre}
        </p>

        <div>
          {/* [API] Hace que aparezca el precio con "Desde". */}
          <strong>
            {tr(d?.desde, "Desde {precio}", "From {precio}").replace("{precio}", formatoDinero(evento.precioDesde))}
          </strong>

          {/* [LOCAL] Hace que "Ver evento" lleve a /eventos/slug sin recargar la página. */}
          <a
            href={`/eventos/${evento.slug}`}
            className="boton-destacado"
            onClick={(e) => {
              e.preventDefault();
              onAbrir(evento);
            }}
          >
            {tr(d?.botones?.verEvento, "Ver evento", "View event")}
          </a>
        </div>
      </div>
    </div>
  );
}