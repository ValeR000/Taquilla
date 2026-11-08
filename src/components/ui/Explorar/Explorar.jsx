// RESPONSABILIDAD: Vista de exploración de eventos con filtros, ordenamiento, paginación y adaptabilidad móvil.
import { useCallback, useRef, useState } from "react";
import { useEventos } from "../../../hooks/useEventos.js";
import TarjetaEvento from "../../ui/TarjetaEvento/TarjetaEvento.jsx";
import IconoEvento from "../../ui/IconoEvento/IconoEvento.jsx";
import PanelFiltros from "../../ui/PanelFiltros/PanelFiltros.jsx";
import Paginacion from "../../ui/Paginacion/Paginacion.jsx";
import { textosLocales, categoriasEn } from "../../../utils/textosLocales.js";
import "./Explorar.css";

// [LOCAL] Estado inicial para limpiar los filtros.
const FILTROS_VACIOS = { categoria: "", ciudad: "", q: "", orden: "", pagina: "1" };

// [STATIC] Opciones de ordenamiento con sus respectivas traducciones.
const ORDEN = {
  fecha: ["Fecha más próxima", "Soonest date"],
  precio: ["Precio más bajo", "Lowest price"],
  popularidad: ["Más populares", "Most popular"],
};

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

export default function Explorar({ en, categorias = [], ciudades = [], onAbrir, textos }) {
  // ==========================================
  // BLOQUE A: ESTADOS Y REFERENCIAS
  // ==========================================
  
  // [LOCAL] Inicializa el estado con los filtros de la URL.
  const [filtros, setFiltros] = useState(leerFiltros);
  
  // [LOCAL] Guarda el texto del buscador para no actualizar la URL en cada tecla.
  const [busqueda, setBusqueda] = useState(filtros.q);
  
  // [LOCAL] Controla si el panel de filtros móvil está abierto o cerrado.
  const [panelAbierto, setPanelAbierto] = useState(false);
  
  // [ACCESIBILIDAD] Referencia al botón de filtros para devolverle el foco al cerrar el panel.
  const botonFiltrosRef = useRef(null);

  // ==========================================
  // BLOQUE B: CONEXIÓN CON LA API Y TEXTOS
  // ==========================================
  
  // [API] Obtiene los eventos, la paginación y los estados de carga/error.
  const { eventos, paginacion, cargando, error, recargar } = useEventos(filtros);

  // [API] Extrae los textos dinámicos desde la API.
  const t = textos?.paginas?.explorar;
  const tEstado = textos?.estados;
  
  // [STATIC] Extrae los textos locales (porque la API no tiene estos).
  const local = textosLocales[en ? "en" : "es"];
  
  // [LOCAL] Función auxiliar para elegir texto de la API o local según el idioma.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // [API] Calcula el total de eventos y maneja singular/plural.
  const total = paginacion?.total ?? 0;
  const uno = total === 1;

  const textoResultados = (
    uno
      ? tr(t?.resultados?.uno, "{cantidad} evento coincide con tus filtros", "{cantidad} event matches your filters")
      : tr(t?.resultados?.otro, "{cantidad} eventos coinciden con tus filtros", "{cantidad} events match your filters")
  ).replace("{cantidad}", total);

  const textoCorto = (
    uno
      ? tr(t?.resultadosCorto?.uno, "{cantidad} evento", "{cantidad} event")
      : tr(t?.resultadosCorto?.otro, "{cantidad} eventos", "{cantidad} events")
  ).replace("{cantidad}", total);

  const placeholderBusqueda = tr(
    textos?.paginas?.inicio?.hero?.buscador?.placeholders?.movil,
    "Evento, artista o lugar",
    "Event, artist or place"
  );

  // ==========================================
  // BLOQUE C: FUNCIONES DEL COMPONENTE
  // ==========================================
  
  // [LOCAL] Guarda los filtros en el estado y en la URL.
  function aplicar(nuevos) {
    setFiltros(nuevos);
    guardarFiltros(nuevos);
  }

  // [LOCAL] Actualiza un filtro específico y resetea a la página 1.
  function actualizar(cambios) {
    aplicar({ ...filtros, pagina: "1", ...cambios });
  }

  // [LOCAL] Cambia de página y hace scroll hacia arriba.
  function cambiarPagina(numero) {
    aplicar({ ...filtros, pagina: String(numero) });
    window.scrollTo(0, 0);
  }

  // [LOCAL] Limpia todos los filtros excepto el orden actual.
  function limpiar() {
    setBusqueda("");
    aplicar({ ...FILTROS_VACIOS, orden: filtros.orden });
  }

  // [LOCAL] Envía la búsqueda al presionar Enter o el ícono de la lupa.
  function buscar(e) {
    e.preventDefault();
    actualizar({ q: busqueda.trim() });
  }

  // [ACCESIBILIDAD] Cierra el panel y devuelve el foco al botón que lo abrió.
  const cerrarPanel = useCallback(() => {
    setPanelAbierto(false);
    botonFiltrosRef.current?.focus();
  }, []);

  // [LOCAL] Obtiene el nombre de la categoría traducido si es necesario.
  function nombreCategoria(id) {
    const nombre = categorias.find((c) => c.id === id)?.nombre || id;
    return en ? categoriasEn[id] || nombre : nombre;
  }

  // [LOCAL] Arma la lista de filtros activos para mostrar como "chips".
  const chips = [
    filtros.categoria && { clave: "categoria", texto: nombreCategoria(filtros.categoria) },
    filtros.ciudad && { clave: "ciudad", texto: filtros.ciudad },
    filtros.q && { clave: "q", texto: `"${filtros.q}"` },
  ].filter(Boolean);

  // [LOCAL] Quita un filtro específico.
  function quitarChip(clave) {
    if (clave === "q") setBusqueda("");
    actualizar({ [clave]: "" });
  }

  // ==========================================
  // BLOQUE D: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <main className="contenedor explorar">
      
      {/* [STATIC] Migas de pan (Breadcrumbs). */}
      <nav className="explorar__migas" aria-label={local.migas}>
        <ol>
          <li>
            <a href="#inicio">{tr(textos?.navbar?.enlaces?.inicio, "Inicio", "Home")}</a>
          </li>
          <li aria-current="page">{tr(textos?.navbar?.enlaces?.explorar, "Explorar", "Explore")}</li>
        </ol>
      </nav>

      {/* [API] Título principal de la vista. */}
      <h1 className="explorar__titulo">{local.titulo}</h1>

      {/* [API] Muestra el conteo de resultados si hay paginación. */}
      {paginacion && (
        <p className="explorar__resultados" role="status">
          {textoResultados}
        </p>
      )}

      {/* [STATIC] Barra de búsqueda y botón de filtros para móvil. */}
      <div className="explorar__buscador-movil">
        <form className="explorar__busqueda" role="search" onSubmit={buscar}>
          <IconoEvento tipo="buscar" />
          <input
            type="search"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder={placeholderBusqueda}
            aria-label={placeholderBusqueda}
          />
        </form>

        <button
          ref={botonFiltrosRef}
          type="button"
          className="explorar__boton-filtros"
          aria-label={local.abrirFiltros}
          aria-expanded={panelAbierto}
          aria-controls="panel-filtros"
          onClick={() => setPanelAbierto(true)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <line x1="4" y1="21" x2="4" y2="14" />
            <line x1="4" y1="10" x2="4" y2="3" />
            <line x1="12" y1="21" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12" y2="3" />
            <line x1="20" y1="21" x2="20" y2="16" />
            <line x1="20" y1="12" x2="20" y2="3" />
            <line x1="1" y1="14" x2="7" y2="14" />
            <line x1="9" y1="8" x2="15" y2="8" />
            <line x1="17" y1="16" x2="23" y2="16" />
          </svg>
        </button>
      </div>

      <div className="explorar__cuerpo">
        {/* [STATIC] Componente del panel de filtros (Sidebar/Móvil). */}
        <PanelFiltros
          id="panel-filtros"
          abierto={panelAbierto}
          onCerrar={cerrarPanel}
          en={en}
          textos={t}
          local={local}
          categorias={categorias}
          ciudades={ciudades}
          filtros={filtros}
          onCambiar={actualizar}
          onLimpiar={limpiar}
          total={total}
          nombreCategoria={nombreCategoria}
        />

        <section className="explorar__contenido">
          <div className="explorar__barra">
            
            {/* [LOCAL] Muestra los filtros activos como "chips" con botón para quitarlos. */}
            {chips.length > 0 && (
              <ul className="explorar__chips">
                {chips.map((chip) => (
                  <li key={chip.clave} className="explorar__chip">
                    {chip.texto}
                    <button
                      type="button"
                      aria-label={local.quitarFiltro.replace("{nombre}", chip.texto)}
                      onClick={() => quitarChip(chip.clave)}
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            )}

            <div className="explorar__barra-fila">
              {/* [API] Conteo de resultados corto (para móvil). */}
              {paginacion && <p className="explorar__total-movil">{textoCorto}</p>}

              {/* [LOCAL] Selector de ordenamiento. */}
              <label className="explorar__orden">
                <span className="explorar__orden-etiqueta">{tr(t?.orden?.etiqueta, "Ordenar:", "Sort by:")}</span>
                <select value={filtros.orden || "fecha"} onChange={(e) => actualizar({ orden: e.target.value })}>
                  {Object.entries(ORDEN).map(([clave, [es, enTexto]]) => (
                    <option key={clave} value={clave}>
                      {tr(t?.orden?.opciones?.[clave], es, enTexto)}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          {/* [LOCAL] Estado de carga. */}
          {cargando && (
            <div className="explorar__estado" role="status">
              <h3>{tr(tEstado?.cargando?.titulo, "Cargando…", "Loading…")}</h3>
              <p>{tr(tEstado?.cargando?.texto, "Esto puede tardar unos segundos.", "This may take a few seconds.")}</p>
            </div>
          )}

          {/* [LOCAL] Estado de error. */}
          {!cargando && error && (
            <div className="explorar__estado" role="alert">
              <h3>{tr(tEstado?.error?.titulo, "Algo salió mal", "Something went wrong")}</h3>
              <p>{tr(tEstado?.error?.texto, "Revisa tu conexión e inténtalo de nuevo.", "Check your connection and try again.")}</p>
              <button type="button" className="explorar__boton" onClick={recargar}>
                {tr(tEstado?.error?.botones?.reintentar, "Reintentar", "Retry")}
              </button>
            </div>
          )}

          {/* [LOCAL] Estado vacío (sin resultados). */}
          {!cargando && !error && eventos.length === 0 && (
            <div className="explorar__estado">
              <h3>{tr(t?.vacio?.titulo, "No encontramos eventos con esos filtros", "We couldn't find events with those filters")}</h3>
              <p>{tr(t?.vacio?.texto, "Prueba con otra fecha, otra ciudad o limpia los filtros.", "Try another date, another city or clear the filters.")}</p>
              <button type="button" className="explorar__boton" onClick={limpiar}>
                {tr(t?.vacio?.botones?.limpiar, "Limpiar filtros", "Clear filters")}
              </button>
            </div>
          )}

          {/* [API] Grid de resultados y paginación. */}
          {!cargando && !error && eventos.length > 0 && (
            <>
              <div className="explorar__grid">
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

              <Paginacion
                pagina={paginacion?.pagina ?? 1}
                paginas={paginacion?.paginas ?? 1}
                onCambiar={cambiarPagina}
                etiquetas={{
                  nav: local.paginacion,
                  pagina: local.pagina,
                  anterior: tr(t?.paginacion?.anterior, "Página anterior", "Previous page"),
                  siguiente: tr(t?.paginacion?.siguiente, "Página siguiente", "Next page"),
                }}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}