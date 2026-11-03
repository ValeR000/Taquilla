// ============================================================================
// ARCHIVO: CategoriasEventos.jsx
// RESPONSABILIDAD: Muestra las categorías como botones con conteo.
// CONVENCIÓN: [API] para datos, [STATIC] para diseño.
// ============================================================================

import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./CategoriasEventos.css";

export default function CategoriasEventos({ categorias, filtros, filtrarCategoria }) {
  return (
    <nav className="categorias-eventos" aria-label="Categorías de eventos">
      {/* [API] Recorre las categorías y dibuja un botón por cada una. */}
      {categorias.map((categoria) => (
        <button
          key={categoria.id}
          aria-pressed={filtros === categoria.id}
          onClick={() => filtrarCategoria(categoria.id)}
        >
          <span className="icono-categoria">
            <IconoEvento tipo={categoria.id} />
          </span>
          <span>
            {categoria.nombre}
            <small>
              {categoria.eventos} eventos
            </small>
          </span>
        </button>
      ))}
    </nav>
  );
}