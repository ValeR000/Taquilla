// ============================================================================
// ARCHIVO: EventoDestacado.jsx
// RESPONSABILIDAD: Tarjeta que se muestra a la derecha del Hero.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./EventoDestacado.css";

export default function EventoDestacado({ evento, en, onAbrir }) {
  // [LOCAL] Si no hay evento, no dibuja nada para evitar errores.
  if (!evento) return null;

  return (
    // [STATIC] Contenedor general de la tarjeta.
    <div className="destacado-taquilla">
      {/* [API] Renderiza el afiche con los colores del evento. */}
      <AficheEvento afiche={evento.afiche} />
      
      <div className="ficha-destacado">
        <span className="etiqueta-evento">{en ? "Featured" : "Destacado"}</span>
        
        {/* [API] Título del evento. */}
        <h2>{evento.titulo}</h2>
        
        {/* [API] Fecha formateada y nombre del recinto. */}
        <p>{formatoFecha(evento.fecha)} · {evento.recinto?.nombre}</p>
        
        <div>
          {/* [API] Precio formateado a pesos. */}
          <strong>{en ? "From" : "Desde"} {formatoDinero(evento.precioDesde)}</strong>
          
          {/* [LOCAL] Botón para abrir el evento. */}
          <button className="boton-home primario" onClick={() => onAbrir(evento)}>
            {en ? "View event" : "Ver evento"}
          </button>
        </div>
      </div>
    </div>
  );
}