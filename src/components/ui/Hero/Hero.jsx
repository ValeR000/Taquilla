// ============================================================================
// ARCHIVO: Hero.jsx (antes HeroTaquilla.jsx)
// RESPONSABILIDAD: Estructura principal del Hero.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import EventoDestacado from "../EventoDestacado/EventoDestacado.jsx";
import "./Hero.css";

export default function Hero({ en, children, destacado, abrirEvento, setFiltros, filtrarCategoria }) {
  return (
    // [STATIC] Sección principal con fondo oscuro.
    <section className="hero-taquilla">
      <div className="ancho-home interior-taquilla">
        <div>
          {/* [STATIC] Etiqueta de temporada. */}
          <span className="etiqueta-evento">
            {en ? "November – December 2026 season" : "Temporada nov – dic 2026"}
          </span>
          
          {/* [STATIC] Título principal. */}
          <h1>{en ? "Your next night starts here" : "Tu próxima noche empieza aquí"}</h1>
          
          {/* [STATIC] Descripción. */}
          <p>
            {en
              ? "Concerts, theatre, sports and festivals. Search by category, date or city and discover all the details of each event."
              : "Conciertos, teatro, deportes y festivales. Busca por categoría, fecha o ciudad y consulta todos los detalles de cada evento."}
          </p>
          
          {/* [LOCAL] Aquí se inyecta el BuscadorEventos desde App.jsx. */}
          {children}
          
          {/* [STATIC] Enlaces rápidos. */}
          <div className="populares">
            <span>{en ? "Popular:" : "Populares:"}</span>
            {["Salsa", "Stand-up", "Fútbol", "Festivales de fin de año"].map((valor, i) => (
              <button key={valor} onClick={() => i === 0 ? setFiltros({ consulta: "Salsa" }) : filtrarCategoria(valor)}>
                {valor}
              </button>
            ))}
          </div>
        </div>

        {/* [API] Renderiza la tarjeta derecha con el evento destacado. */}
        <EventoDestacado evento={destacado} en={en} onAbrir={abrirEvento} />
      </div>
    </section>
  );
}