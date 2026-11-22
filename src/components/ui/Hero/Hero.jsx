// ============================================================================
// ARCHIVO: Hero.jsx
// RESPONSABILIDAD: Estructura principal del Hero (encabezado) con los textos que llegan listos desde App, el buscador (children) y la tarjeta destacada (tarjetaDestacada).
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import "./Hero.css";

export default function Hero({
  /* SPRINT 2: Textos listos y tarjeta destacada desde App */
  etiqueta = "",
  titulo = "",
  subtitulo = "",
  textoPopulares = "",
  populares = [],
  children,           // [LOCAL] El componente del buscador que se inyecta desde App.jsx.
  tarjetaDestacada,
  /* SPRINT 2 */
  onBuscar
}) {
  return (
    // [STATIC] Sección principal con fondo oscuro.
    <section className="hero-taquilla">
      <div className="ancho-home interior-taquilla">
        <div>
          {/* [API] Hace que aparezca la etiqueta de temporada, que llega lista desde App. */}
          <Etiqueta clase="etiqueta-evento">
            {etiqueta}{/* Sprint 2 */}
          </Etiqueta>

          {/* [API] Hace que aparezca el título principal, que llega listo desde App. */}
          <h1>{titulo}</h1>{/* Sprint 2 */}

          {/* [API] Hace que aparezca el párrafo descriptivo, que llega listo desde App. */}
          <p>{subtitulo}</p>{/* Sprint 2 */}
          
          {/* [LOCAL] Aquí se inyecta el BuscadorEventos desde App.jsx. */}
          {children}
          
          {/* [STATIC] Sección de enlaces populares. */}
          <div className="populares">
            {/* [API] Hace que aparezca «Populares:», que llega listo desde App. */}
            <span>{textoPopulares}</span>{/* Sprint 2 */}

            {/* [STATIC] Recorre la lista de términos populares y dibuja un botón por cada uno. */}
            {/* ########## */}
            {populares.map((termino) => (
              <button key={termino} type="button" onClick={() => onBuscar({ consulta: termino })}>
                {termino}
              </button>
            ))}
            {/* ########## */}
          </div>
        </div>

        {/* [LOCAL] Hace que aparezca la tarjeta del evento destacado que arma App.jsx. */}
        {tarjetaDestacada}{/* Sprint 2 */}
      </div>
    </section>
  );
}