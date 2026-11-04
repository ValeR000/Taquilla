// ============================================================================
// ARCHIVO: EventoDestacado.jsx
// RESPONSABILIDAD: Tarjeta de la derecha en el Hero que muestra el evento principal.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./EventoDestacado.css";

// [API] Recibe el evento y el idioma.
export default function EventoDestacado({ evento, en, onAbrir }) {
  // [LOCAL] Si no hay evento, no se dibuja nada para evitar errores.
  if (!evento) return null;

  return (
    // [STATIC] Contenedor principal.
    <div className="destacado-taquilla">
      
      {/* [API] Pinta el afiche con los colores del evento. */}
      <AficheEvento afiche={evento.afiche} />
      
      <div className="ficha-destacado">
        
        {/* [STATIC] Etiqueta "Destacado" */}
        <span className="etiqueta-destacado">
          {en ? "Featured" : "Destacado"}
        </span>
        
        {/* [API] Título del evento. */}
        <h2>{evento.titulo}</h2>
        
        {/* [API] Fecha, hora y lugar formateados. */}
        <p>
          {formatoFecha(evento.fecha)} · {evento.recinto?.nombre}
        </p>
        
        <div>
          {/* [API] Precio formateado desde la API. */}
          <strong>
            {en ? "From" : "Desde"} {formatoDinero(evento.precioDesde)}
          </strong>
          
          {/* [LOCAL] Botón para abrir el evento con clase propia para que sea negro. */}
          <button className="boton-destacado" onClick={() => onAbrir(evento)}>
            {en ? "View event" : "Ver evento"}
          </button>
        </div>
      </div>
    </div>
  );
}