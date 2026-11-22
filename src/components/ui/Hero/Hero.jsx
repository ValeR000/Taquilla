// ============================================================================
// ARCHIVO: Hero.jsx
// RESPONSABILIDAD: Estructura principal del Hero (encabezado) con textos estáticos, buscador y evento destacado.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import "./Hero.css";

export default function Hero({
  etiqueta = "",
  titulo = "",
  subtitulo = "",
  textoPopulares = "",
  populares = [],
  children,           // [LOCAL] El componente del buscador que se inyecta desde App.jsx.
  tarjetaDestacada,
  onBuscar
}) {
  return (
    // [STATIC] Sección principal con fondo oscuro.
    <section className="hero-taquilla">
      <div className="ancho-home interior-taquilla">
        <div>
          {/* [STATIC] Etiqueta de temporada con texto condicional según el idioma. */}
          <Etiqueta clase="etiqueta-evento">
            {etiqueta}
          </Etiqueta>

          {/* [STATIC] Título principal con texto condicional según el idioma. */}
          <h1>{titulo}</h1>

          {/* [STATIC] Párrafo descriptivo con texto condicional según el idioma. */}
          <p>{subtitulo}</p>
          
          {/* [LOCAL] Aquí se inyecta el BuscadorEventos desde App.jsx. */}
          {children}
          
          {/* [STATIC] Sección de enlaces populares. */}
          <div className="populares">
            {/* [STATIC] Título de populares con texto condicional. */}
            <span>{textoPopulares}</span>

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

        {/* [STATIC] Componente de la tarjeta derecha. */}
        {/* [API] Le pasa el evento destacado desde la API. */}
        {tarjetaDestacada}
      </div>
    </section>
  );
}