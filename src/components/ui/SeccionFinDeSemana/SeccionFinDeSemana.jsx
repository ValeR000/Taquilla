// ============================================================================
// ARCHIVO: SeccionFinDeSemana.jsx
// RESPONSABILIDAD: Muestra una lista vertical de eventos para el fin de semana (diseñada para la vista móvil).
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import EncabezadoSeccion from "../EncabezadoSeccion/EncabezadoSeccion.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./SeccionFinDeSemana.css";

export default function SeccionFinDeSemana({
  eventos = [],       // [API] Eventos que se muestran.
  en = false,         // [LOCAL] Indica si el idioma es inglés.
  titulo = "",
  textoVerTodos = "",
  textoAccion = "",
  textoDesde = "",
  onAbrir,            // [LOCAL] Función para abrir el detalle de un evento.
  onVerTodos,         // [LOCAL] Función para ir a Explorar.
  cargando = false    // Sprint 2: indica si los eventos siguen cargando
}) {
  // ==========================================
  // BLOQUE A: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [ACCESIBILIDAD] Hace que la sección tome su nombre del título.
    <section className="fin-de-semana" aria-labelledby="fin-de-semana-titulo">

      <EncabezadoSeccion
        idTitulo="fin-de-semana-titulo"
        // [API] Hace que aparezca el título "Este fin de semana".
        titulo={titulo}
        // [LOCAL] Hace que "Ver todos" lleve a Explorar.
        textoAccion={textoVerTodos}
        onAccion={onVerTodos}
      />

      <ul className="fin-de-semana__lista" aria-busy={cargando}>{/* Sprint 2 */}
        {/* SPRINT 2: Hace que aparezcan 3 filas esqueleto mientras cargan los eventos */}
        {cargando && Array.from({ length: 3 }, (_, i) => (
          <li key={i} aria-hidden="true">
            <span className="fin-de-semana__item fin-de-semana__esqueleto">
              <span className="fin-de-semana__afiche" />
              <span className="fin-de-semana__texto">
                <strong className="fin-de-semana__titulo fin-de-semana__barra">{" "}</strong>
                <small className="fin-de-semana__barra fin-de-semana__barra--corta">{" "}</small>
                <span className="fin-de-semana__precio fin-de-semana__barra fin-de-semana__barra--corta">{" "}</span>
              </span>
            </span>
          </li>
        ))}
        {/* SPRINT 2 */}
        {eventos.map((evento) => (
          <li key={evento.id}>
            {/* [LOCAL] Hace que toda la fila lleve a /eventos/slug sin recargar la página. */}
            <a
              href={`/eventos/${evento.slug}`}
              className="fin-de-semana__item"
              // [ACCESIBILIDAD] Hace que el lector anuncie qué evento se va a abrir.
              aria-label={`${textoAccion}: ${evento.titulo}`}
              onClick={(e) => {
                e.preventDefault();
                onAbrir(evento);
              }}
            >
              <span className="fin-de-semana__afiche">
                {/* [API] Hace que el afiche se pinte con los colores del evento. */}
                <AficheEvento afiche={evento.afiche} />
              </span>

              <span className="fin-de-semana__texto">
                {/* [API] Hace que aparezca el título del evento. */}
                <strong className="fin-de-semana__titulo">{evento.titulo}</strong>
                {/* [API] Hace que aparezca la fecha y hora en el idioma actual. */}
                <small>{formatoFecha(evento.fecha, en)}</small>
                {/* [API] Hace que aparezca el precio. */}
                <span className="fin-de-semana__precio">
                  {textoDesde} {formatoDinero(evento.precioDesde)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}