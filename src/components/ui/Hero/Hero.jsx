// ============================================================================
// ARCHIVO: Hero.jsx
// RESPONSABILIDAD: Estructura principal del Hero (encabezado) con textos estáticos, buscador y evento destacado.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import EventoDestacado from "../EventoDestacado/EventoDestacado.jsx";
import "./Hero.css";

export default function Hero({ 
  en,                 // [LOCAL] Booleano para saber si el idioma es inglés.
  children,           // [LOCAL] El componente del buscador que se inyecta desde App.jsx.
  destacado,          // [API] El evento destacado que viene de la API.
  abrirEvento,        // [LOCAL] Función para abrir el detalle del evento.
  setFiltros,         // [LOCAL] Función para enviar filtros a la URL.
  filtrarCategoria    // [LOCAL] Función para filtrar por categoría.
}) {
  return (
    // [STATIC] Sección principal con fondo oscuro.
    <section className="hero-taquilla">
      <div className="ancho-home interior-taquilla">
        <div>
          {/* [STATIC] Etiqueta de temporada con texto condicional según el idioma. */}
          <span className="etiqueta-evento">
            {en ? "November – December 2026 season" : "Temporada nov – dic 2026"}
          </span>
          
          {/* [STATIC] Título principal con texto condicional según el idioma. */}
          <h1>{en ? "Your next night starts here" : "Tu próxima noche empieza aquí"}</h1>
          
          {/* [STATIC] Párrafo descriptivo con texto condicional según el idioma. */}
          <p>
            {en
              ? "Concerts, theatre, sports and festivals. Search by category, date or city and discover all the details of each event."
              : "Conciertos, teatro, deportes y festivales. Busca por categoría, fecha o ciudad y consulta todos los detalles de cada evento."}
          </p>
          
          {/* [LOCAL] Aquí se inyecta el BuscadorEventos desde App.jsx. */}
          {children}
          
          {/* [STATIC] Sección de enlaces populares. */}
          <div className="populares">
            {/* [STATIC] Título de populares con texto condicional. */}
            <span>{en ? "Popular:" : "Populares:"}</span>
            
            {/* [STATIC] Recorre la lista de términos populares y dibuja un botón por cada uno. */}
            {["Salsa", "Stand-up", "Fútbol", "Festivales de fin de año"].map((valor, i) => (
              // [LOCAL] Al hacer clic, el primer término ("Salsa") busca por texto, los demás filtran por categoría.
              <button key={valor} onClick={() => i === 0 ? setFiltros({ consulta: "Salsa" }) : filtrarCategoria(valor)}>
                {valor}
              </button>
            ))}
          </div>
        </div>

        {/* [STATIC] Componente de la tarjeta derecha. */}
        {/* [API] Le pasa el evento destacado desde la API. */}
        <EventoDestacado evento={destacado} en={en} onAbrir={abrirEvento} />
      </div>
    </section>
  );
}