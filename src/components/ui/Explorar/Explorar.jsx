// RESPONSABILIDAD: Vista de exploración de eventos con filtros guardados en la URL y paginación.
import { useState } from "react";
import { useEventos } from "../../../hooks/useEventos.js";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import "./Explorar.css";

// [LOCAL] Lee los filtros actuales desde la URL (query params).
function leerFiltros() {
  const p = new URLSearchParams(window.location.search);
  return {
    categoria: p.get("categoria") || "",
    ciudad: p.get("ciudad") || "",
    q: p.get("q") || "",
    orden: p.get("orden") || "",
    pagina: p.get("pagina") || "1",
  };
}

// [LOCAL] Actualiza la URL sin recargar la página cuando cambian los filtros.
function guardarFiltros(filtros) {
  const p = new URLSearchParams();
  Object.entries(filtros).forEach(([clave, valor]) => {
    // Hace que no se guarde la página 1 en la URL para mantenerla limpia
    if (valor && !(clave === "pagina" && valor === "1")) p.set(clave, valor);
  });
  const search = p.toString() ? `?${p}` : "";
  window.history.replaceState(null, "", `${window.location.pathname}${search}#explorar`);
}

export default function Explorar({ en, categorias = [], ciudades = [], onAbrir }) {
  // [LOCAL] Inicializa el estado con los filtros de la URL.
  const [filtros, setFiltros] = useState(leerFiltros);
  
  // [API] Obtiene los eventos, la paginación y los estados de carga/error.
  const { eventos, paginacion, cargando, error } = useEventos(filtros);

  // [LOCAL] Actualiza los filtros, resetea a la página 1 y guarda en la URL.
  function actualizar(cambios) {
    const nuevos = { ...filtros, pagina: "1", ...cambios };
    setFiltros(nuevos);
    guardarFiltros(nuevos);
  }

  // [LOCAL] Busca el nombre de la categoría para pasárselo a la tarjeta.
  const nombreCategoria = (id) => categorias.find((c) => c.id === id)?.nombre || id;
  
  // [API] Extrae la página actual y el total de páginas de la metadata.
  const pagina = paginacion?.pagina ?? 1;
  const totalPaginas = paginacion?.paginas ?? 1;

  return (
    <main className="contenedor explorar">
      {/* [STATIC] Título principal de la vista */}
      <h1 className="explorar__titulo">{en ? "Explore events" : "Explorar eventos"}</h1>

      {/* TODO: Filtros web + panel móvil (esperando Figma) usando actualizar({ ... }) */}

      {/* [LOCAL] Muestra un mensaje de carga si la API está respondiendo */}
      {cargando && <p role="status">{en ? "Loading events..." : "Cargando eventos..."}</p>}

      {/* [LOCAL] Muestra un mensaje si hay un error de red */}
      {error && <p role="alert">{en ? "Could not load events." : "No se pudieron cargar los eventos."}</p>}

      {/* [LOCAL] Muestra un estado vacío si la búsqueda no arroja resultados */}
      {!cargando && !error && eventos.length === 0 && (
        <div className="explorar__vacio">
          <h3>{en ? "No events found" : "No encontramos eventos"}</h3>
          <p>{en ? "Try other filters." : "Prueba con otros filtros."}</p>
        </div>
      )}

      {/* [API] Si hay eventos, los pinta en la cuadrícula */}
      {!cargando && !error && eventos.length > 0 && (
        <>
          {/* [API] Muestra el conteo total de eventos encontrados */}
          <p className="explorar__total">
            {paginacion?.total} {en ? "events" : "eventos"}
          </p>

          <div className="explorar__grid">
            {/* [API] Recorre los eventos y pinta una tarjeta por cada uno */}
            {eventos.map((evento) => (
              <TarjetaEvento
                key={evento.id}
                evento={evento}
                en={en}
                nombreCategoria={nombreCategoria(evento.categoria)}
                onAbrir={onAbrir}
              />
            ))}
          </div>

          {/* [LOCAL] Controles de paginación */}
          <nav className="explorar__paginacion" aria-label={en ? "Pagination" : "Paginación"}>
            {/* [LOCAL] Botón para ir a la página anterior. Se deshabilita si es la primera. */}
            <button
              disabled={pagina <= 1}
              onClick={() => actualizar({ pagina: String(pagina - 1) })}
            >
              {en ? "Previous" : "Anterior"}
            </button>

            {/* [STATIC] Indicador visual de la página actual */}
            <span>
              {en ? "Page" : "Página"} {pagina} {en ? "of" : "de"} {totalPaginas}
            </span>

            {/* [LOCAL] Botón para ir a la página siguiente. Se deshabilita si es la última. */}
            <button
              disabled={pagina >= totalPaginas}
              onClick={() => actualizar({ pagina: String(pagina + 1) })}
            >
              {en ? "Next" : "Siguiente"}
            </button>
          </nav>
        </>
      )}
    </main>
  );
}