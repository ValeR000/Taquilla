// RESPONSABILIDAD: Muestra la lista vertical de eventos para el fin de semana en móvil.
import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./SeccionFinDeSemana.css";

export default function SeccionFinDeSemana({ eventos = [], en, onAbrir, onVerTodos }) {
  return (
    <section className="fin-de-semana" aria-labelledby="fin-de-semana-titulo">
      <div className="titulo-seccion">
        <h2 id="fin-de-semana-titulo">{en ? "This weekend" : "Este fin de semana"}</h2>
        <button className="enlace-home" onClick={onVerTodos}>
          {en ? "View all" : "Ver todos"}
        </button>
      </div>

      <ul className="fin-de-semana__lista">
        {/* [API] Recorre los eventos para pintar la lista horizontal */}
        {eventos.map((evento) => (
          <li key={evento.id}>
            <button
              className="fin-de-semana__item"
              onClick={() => onAbrir(evento)}
              aria-label={`${en ? "View event" : "Ver evento"}: ${evento.titulo}`}
            >
              <span className="fin-de-semana__afiche">
                {/* [API] Pinta el afiche */}
                <AficheEvento afiche={evento.afiche} />
              </span>

              <span className="fin-de-semana__texto">
                <strong className="fin-de-semana__titulo">{evento.titulo}</strong>
                <small>{formatoFecha(evento.fecha, en)}</small>
                <span className="fin-de-semana__precio">
                  {en ? "From" : "Desde"} {formatoDinero(evento.precioDesde)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}