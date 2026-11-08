// ============================================================================
// ARCHIVO: TarjetaEvento.jsx
// RESPONSABILIDAD: Muestra la información resumida de un evento.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx"; // <-- NUEVO IMPORT
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./TarjetaEvento.css";

export default function TarjetaEvento({ evento, onAbrir, nombreCategoria, en }) {
  
  const fechaFormateada = formatoFecha(evento.fecha, en);

  return (
    <article className="tarjeta-evento">
      <AficheEvento afiche={evento.afiche} />
      
      <div className="contenido-evento">
        {/* [API] Etiqueta de la categoría usando el nuevo componente */}
        <Etiqueta>
          {nombreCategoria || evento.categoria}
        </Etiqueta>
        
        <h3>{evento.titulo}</h3>
        
        <p>
          <IconoEvento tipo="fecha" />
          {fechaFormateada}
        </p>
        
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