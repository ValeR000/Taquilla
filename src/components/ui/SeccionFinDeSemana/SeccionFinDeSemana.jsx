// ============================================================================
// ARCHIVO: SeccionFinDeSemana.jsx
// RESPONSABILIDAD: Muestra una lista vertical de eventos para el fin de semana (diseñada para la vista móvil).
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./SeccionFinDeSemana.css";

export default function SeccionFinDeSemana({
  eventos = [],       // [API] Eventos que se muestran.
  en,                 // [LOCAL] Indica si el idioma es inglés.
  textos,             // [API] Textos de la interfaz.
  onAbrir,            // [LOCAL] Función para abrir el detalle de un evento.
  onVerTodos          // [LOCAL] Función para ir a Explorar.
}) {
  // ==========================================
  // BLOQUE A: TEXTOS
  // ==========================================

  // [API] Hace que los textos del Inicio estén a mano.
  const inicio = textos?.paginas?.inicio;

  // [LOCAL] Hace que se use el texto de la API o, si falta, el de respaldo en el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  const verEvento = tr(inicio?.tarjeta?.botones?.verEvento, "Ver evento", "View event");
  const desde = tr(inicio?.tarjeta?.desde, "Desde", "From");

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [ACCESIBILIDAD] Hace que la sección tome su nombre del título.
    <section className="fin-de-semana" aria-labelledby="fin-de-semana-titulo">

      <div className="titulo-seccion">
        {/* [API] Hace que aparezca el título "Este fin de semana". */}
        <h2 id="fin-de-semana-titulo">
          {tr(inicio?.filtrosMovil?.finDeSemana, "Este fin de semana", "This weekend")}
        </h2>

        {/* [LOCAL] Hace que "Ver todos" lleve a Explorar. */}
        <button className="enlace-home" onClick={onVerTodos}>
          {tr(inicio?.destacados?.enlaces?.verTodos, "Ver todos", "View all")}
        </button>
      </div>

      <ul className="fin-de-semana__lista">
        {eventos.map((evento) => (
          <li key={evento.id}>
            {/* [LOCAL] Hace que toda la fila lleve a /eventos/slug sin recargar la página. */}
            <a
              href={`/eventos/${evento.slug}`}
              className="fin-de-semana__item"
              // [ACCESIBILIDAD] Hace que el lector anuncie qué evento se va a abrir.
              aria-label={`${verEvento}: ${evento.titulo}`}
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
                  {desde} {formatoDinero(evento.precioDesde)}
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}