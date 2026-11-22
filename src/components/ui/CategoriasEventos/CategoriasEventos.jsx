// RESPONSABILIDAD: Muestra la lista de categorías con sus íconos y conteo de eventos para filtrar el catálogo.
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./CategoriasEventos.css";

/* SPRINT 2: Firma en varias líneas con los textos listos desde App */
export default function CategoriasEventos({
  categorias = [],
  filtros,
  filtrarCategoria,
  cargando = false,
  textoTodos = "",
  textoUnEvento = "",
  textoVariosEventos = "",
  etiqueta = "",
}) {
  /* SPRINT 2 */
  // ==========================================
  // BLOQUE A: CONTEO DE EVENTOS
  // ==========================================
  
  // [LOCAL] Función que formatea el conteo de eventos (singular o plural).
  const contar = (n) =>
    (n === 1 ? textoUnEvento : textoVariosEventos).replace("{cantidad}", n); // Sprint 2

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [ACCESIBILIDAD] Etiqueta semántica de navegación con su descripción para lectores de pantalla.
    <nav id="categorias-eventos" tabIndex={-1} className="categorias-eventos" aria-label={etiqueta}>{/* Sprint 2: puede recibir el foco después de Reintentar */}
      
      {/* [LOCAL] Botón "Todos". Hace que se limpien los filtros de categoría. */}
      <button
        className="categoria-todos"
        // [ACCESIBILIDAD] Avisa si este botón está activo (sin filtros).
        aria-pressed={filtros === null}
        onClick={() => filtrarCategoria(null)}
      >
        {/* [API] Hace que aparezca el texto "Todos" desde la API o como respaldo. */}
        {textoTodos}{/* Sprint 2 */}
      </button>

      {cargando && Array.from({ length: 6 }, (_, i) => (
        <span key={i} className="categoria-esqueleto" aria-hidden="true" />
      ))}

      {/* [API] Recorre las categorías reales que vienen de la API. */}
      {categorias.map((cat) => (
        <button
          key={cat.id}
          // [ACCESIBILIDAD] Avisa si esta categoría específica es la que está filtrando actualmente.
          aria-pressed={filtros === cat.id}
          // [LOCAL] Aplica el filtro al hacer clic.
          onClick={() => filtrarCategoria(cat.id)}
        >
          <span className="icono-categoria">
            {/* [API] Le pasa el ID de la categoría al IconoEvento para que pinte el dibujo correcto. */}
            <IconoEvento tipo={cat.id} />
          </span>
          <span>
            {/* [API] Hace que aparezca el nombre de la categoría (ej. "Conciertos"). */}
            {cat.nombre}
            
            {/* [API] Hace que aparezca el conteo de eventos formateado. */}
            <small>{contar(cat.eventos)}</small>
          </span>
        </button>
      ))}
    </nav>
  );
}