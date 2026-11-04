// ============================================================================
// ARCHIVO: TarjetaEvento.jsx
// RESPONSABILIDAD: Muestra la información resumida de un evento.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import { formatoDinero } from "../../../utils/formato.js";
import "./TarjetaEvento.css";

export default function TarjetaEvento({ evento, onAbrir, nombreCategoria, en }) {
  
  // [LOCAL] Formatea la fecha según el idioma (español o inglés).
  const fechaFormateada = new Date(evento.fecha).toLocaleDateString(
    en ? "en-US" : "es-CO",
    {
      weekday: "short",
      day: "numeric",
      month: "short",
      timeZone: "America/Bogota",
    }
  );

  return (
    <article className="tarjeta-evento">
      <AficheEvento afiche={evento.afiche} />
      
      <div className="contenido-evento">
        {/* [API] Etiqueta de la categoría */}
        <span className="etiqueta-evento">
          {nombreCategoria || evento.categoria}
        </span>
        
        {/* [API] Título del evento */}
        <h3>{evento.titulo}</h3>
        
        {/* [API] Fecha (traducida) */}
        <p>
          <IconoEvento tipo="fecha" />
          {fechaFormateada}
        </p>
        
        {/* [API] Lugar del evento */}
        <p>
          <IconoEvento tipo="lugar" />
          {evento.recinto?.nombre}, {evento.recinto?.ciudad}
        </p>
        
        <div className="precio-evento">
          <div>
            <small>{en ? "From" : "Desde"}</small>
            <strong>{formatoDinero(evento.precioDesde)}</strong>
          </div>
          <button
            className="boton-evento"
            aria-label={`${en ? "View event" : "Ver evento"}: ${evento.titulo}`}
            onClick={() => onAbrir(evento)}
          >
            {en ? "View event" : "Ver evento"}
          </button>
        </div>
      </div>
    </article>
  );
}