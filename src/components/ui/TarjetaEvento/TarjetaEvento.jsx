import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./TarjetaEvento.css";

// [LOCAL] Recibe el evento, la función para abrirlo y el nombre de la categoría (para mostrarlo).
export default function TarjetaEvento({ evento, onAbrir, nombreCategoria }) {
  return (
    <article className="tarjeta-evento">
      <AficheEvento afiche={evento.afiche} />
      
      <div className="contenido-evento">
        {/* [API] Muestra el nombre de la categoría (ej. "Concierto"). */}
        <span className="etiqueta-evento">
          {nombreCategoria || evento.categoria}
        </span>
        
        <h3>{evento.titulo}</h3>
        
        <p>
          <IconoEvento tipo="fecha" />
          {formatoFecha(evento.fecha)}
        </p>
        
        <p>
          <IconoEvento tipo="lugar" />
          {evento.recinto?.nombre}, {evento.recinto?.ciudad}
        </p>
        
        <div className="precio-evento">
          <div>
            <small>Desde</small>
            <strong>{formatoDinero(evento.precioDesde)}</strong>
          </div>
          <button
            className="boton-evento"
            aria-label={`Ver evento: ${evento.titulo}`}
            onClick={() => onAbrir(evento)}
          >
            Ver evento
          </button>
        </div>
      </div>
    </article>
  );
}