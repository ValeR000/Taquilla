// RESPONSABILIDAD: Muestra la lista de categorías con sus íconos y conteo de eventos para filtrar el catálogo.
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import { textosLocales } from "../../../utils/textosLocales.js";
import "./CategoriasEventos.css";

export default function CategoriasEventos({ categorias = [], filtros, filtrarCategoria, en, textos }) {
  // ==========================================
  // BLOQUE A: TEXTOS Y TRADUCCIONES
  // ==========================================
  
  // [API] Extrae los textos específicos de la página de inicio desde la API.
  const inicio = textos?.paginas?.inicio;
  
  // [LOCAL] Función auxiliar para elegir texto de la API o local según el idioma.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // [LOCAL] Función que formatea el conteo de eventos (singular o plural).
  const contar = (n) =>
    (n === 1
      ? tr(inicio?.categorias?.eventos?.uno, "{cantidad} evento", "{cantidad} event")
      : tr(inicio?.categorias?.eventos?.otro, "{cantidad} eventos", "{cantidad} events")
    ).replace("{cantidad}", n);

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [ACCESIBILIDAD] Etiqueta semántica de navegación con su descripción para lectores de pantalla.
    <nav className="categorias-eventos" aria-label={textosLocales[en ? "en" : "es"].categoriasAria}>
      
      {/* [LOCAL] Botón "Todos". Hace que se limpien los filtros de categoría. */}
      <button
        className="categoria-todos"
        // [ACCESIBILIDAD] Avisa si este botón está activo (sin filtros).
        aria-pressed={filtros === null}
        onClick={() => filtrarCategoria(null)}
      >
        {/* [API] Hace que aparezca el texto "Todos" desde la API o como respaldo. */}
        {tr(inicio?.filtrosMovil?.todos, "Todos", "All")}
      </button>

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