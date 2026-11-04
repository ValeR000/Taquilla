// ============================================================================
// ARCHIVO: CategoriasEventos.jsx
// RESPONSABILIDAD: Muestra las categorías como botones con conteo.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./CategoriasEventos.css";

export default function CategoriasEventos({ categorias = [], filtros, filtrarCategoria, en }) {
  // [LOCAL] Diccionario para traducir los nombres de las categorías al inglés.
  // (La API de Taquilla devuelve los nombres en español).
  const traducciones = {
    conciertos: "Concerts",
    teatro: "Theatre",
    deportes: "Sports",
    festivales: "Festivals",
    comedia: "Comedy",
    familiares: "Family",
  };

  return (
    <nav className="categorias-eventos" aria-label={en ? "Event categories" : "Categorías de eventos"}>
      {/* [API] Recorre las categorías reales que vienen de la API. */}
      {categorias.map((cat) => (
        <button
          key={cat.id}
          aria-pressed={filtros === cat.id}
          onClick={() => filtrarCategoria(cat.id)}
        >
          <span className="icono-categoria">
            {/* [API] Le pasa el ID (ej. "conciertos") al IconoEvento para que pinte el dibujo correcto. */}
            <IconoEvento tipo={cat.id} />
          </span>
          <span>
            {/* [LOCAL] Si está en inglés, busca en el diccionario. Si no, usa el nombre de la API. */}
            {en ? (traducciones[cat.id] || cat.nombre) : cat.nombre}
            
            <small>
              {cat.eventos} {en ? (cat.eventos === 1 ? "event" : "events") : "eventos"}
            </small>
          </span>
        </button>
      ))}
    </nav>
  );
}