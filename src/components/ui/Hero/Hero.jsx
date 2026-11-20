// ============================================================================
// ARCHIVO: Hero.jsx
// RESPONSABILIDAD: Estructura principal del Hero (encabezado) con textos estáticos, buscador y evento destacado.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import EventoDestacado from "../EventoDestacado/EventoDestacado.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import { textosLocales } from "../../../utils/textosLocales.js";
import "./Hero.css";

export default function Hero({
  en,                 // [LOCAL] Booleano para saber si el idioma es inglés.
  textos,
  children,           // [LOCAL] El componente del buscador que se inyecta desde App.jsx.
  destacado,          // [API] El evento destacado que viene de la API.
  abrirEvento,        // [LOCAL] Función para abrir el detalle del evento.
  onBuscar
}) {
  // ##########
  const hero = textos?.paginas?.inicio?.hero;
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);
  const populares = textosLocales[en ? "en" : "es"].populares;
  // ##########

  return (
    // [STATIC] Sección principal con fondo oscuro.
    <section className="hero-taquilla">
      <div className="ancho-home interior-taquilla">
        <div>
          {/* [STATIC] Etiqueta de temporada con texto condicional según el idioma. */}
          <Etiqueta clase="etiqueta-evento">
            {tr(hero?.etiquetas?.temporada, "Temporada nov – dic 2026", "November – December 2026 season")}
          </Etiqueta>

          {/* [STATIC] Título principal con texto condicional según el idioma. */}
          <h1>{tr(hero?.titulo, "Tu próxima noche empieza aquí", "Your next night starts here")}</h1>

          {/* [STATIC] Párrafo descriptivo con texto condicional según el idioma. */}
          <p>
            {tr(
              hero?.subtitulo,
              "Conciertos, teatro, deportes y festivales. Busca por categoría, fecha o ciudad y consulta todos los detalles de cada evento.",
              "Concerts, theatre, sports and festivals. Search by category, date or city and discover all the details of each event."
            )}
          </p>
          
          {/* [LOCAL] Aquí se inyecta el BuscadorEventos desde App.jsx. */}
          {children}
          
          {/* [STATIC] Sección de enlaces populares. */}
          <div className="populares">
            {/* [STATIC] Título de populares con texto condicional. */}
            <span>{tr(hero?.buscador?.populares, "Populares:", "Popular:")}</span>

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
        <EventoDestacado evento={destacado} en={en} textos={textos} onAbrir={abrirEvento} />
      </div>
    </section>
  );
}