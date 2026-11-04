// ============================================================================
// ARCHIVO: EventoDestacado.jsx
// RESPONSABILIDAD: Tarjeta de la derecha en el Hero que muestra el evento principal.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx"; // <-- NUEVO IMPORT
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./EventoDestacado.css";

export default function EventoDestacado({ evento, en, onAbrir }) {
  if (!evento) return null;

  return (
    <div className="destacado-taquilla">
      <AficheEvento afiche={evento.afiche} />
      
      <div className="ficha-destacado">
        
        {/* [STATIC] Etiqueta "Destacado" usando el nuevo componente */}
        <Etiqueta>
          {en ? "Featured" : "Destacado"}
        </Etiqueta>
        
        <h2>{evento.titulo}</h2>
        
        <p>
          {formatoFecha(evento.fecha)} · {evento.recinto?.nombre}
        </p>
        
        <div>
          <strong>
            {en ? "From" : "Desde"} {formatoDinero(evento.precioDesde)}
          </strong>
          <button className="boton-destacado" onClick={() => onAbrir(evento)}>
            {en ? "View event" : "Ver evento"}
          </button>
        </div>
      </div>
    </div>
  );
}