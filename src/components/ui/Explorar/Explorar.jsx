// RESPONSABILIDAD: Vista Explorar (/explorar) con filtros en la URL, orden, paginación, estados y panel de filtros móvil.
import { useCallback, useRef, useState } from "react";
import { useEventos } from "../../../hooks/useEventos.js";
import TarjetaEvento from "../../ui/TarjetaEvento/TarjetaEvento.jsx";
import IconoEvento from "../../ui/IconoEvento/IconoEvento.jsx";
import PanelFiltros from "../../ui/PanelFiltros/PanelFiltros.jsx";
import Paginacion from "../../ui/Paginacion/Paginacion.jsx";
import { textosLocales } from "../../../utils/textosLocales.js";
import "./Explorar.css";

// [LOCAL] Hace que "Limpiar" deje todos los filtros vacíos.
const FILTROS_VACIOS = { categoria: "", ciudad: "", q: "", orden: "", pagina: "1" };

// [STATIC] Hace que el selector de orden tenga textos de respaldo si la API no responde.
const ORDEN = {
  fecha: ["Fecha más próxima", "Soonest date"],
  precio: ["Precio más bajo", "Lowest price"],
  popularidad: ["Más populares", "Most popular"],
};

// [LOCAL] Hace que los filtros se lean desde la URL al cargar la vista.
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

// [LOCAL] Hace que los filtros se guarden en la URL sin recargar ni llenar el historial.
function guardarFiltros(filtros) {
  const p = new URLSearchParams();
  Object.entries(filtros).forEach(([clave, valor]) => {
    // [LOCAL] Hace que la página 1 no aparezca en la URL.
    if (valor && !(clave === "pagina" && valor === "1")) p.set(clave, valor);
  });
  const search = p.toString() ? `?${p}` : "";
  window.history.replaceState(null, "", `/explorar${search}`);
}

export default function Explorar({
  en,                       // [LOCAL] Indica si el idioma es inglés.
  categorias = [],          // [API] Categorías para el filtro.
  ciudades = [],            // [API] Ciudades para el filtro.
  textos,                   // [API] Textos de la interfaz.
  onAbrir,                  // [LOCAL] Función para abrir el detalle de un evento.
  onNavegar,                // [LOCAL] Función para cambiar de vista.
  enfocarBusqueda = false,  // [ACCESIBILIDAD] Indica si el buscador recibe el foco al cargar.
}) {
  // ==========================================
  // BLOQUE A: ESTADOS Y REFERENCIAS
  // ==========================================

  // [LOCAL] Hace que los filtros empiecen con lo que dice la URL.
  const [filtros, setFiltros] = useState(leerFiltros);

  // [LOCAL] Hace que el texto del buscador no cambie la URL hasta enviarlo.
  const [busqueda, setBusqueda] = useState(filtros.q);

  // [LOCAL] Hace que el panel de filtros móvil se abra o se cierre.
  const [panelAbierto, setPanelAbierto] = useState(false);

  // [ACCESIBILIDAD] Hace que el foco vuelva al botón de filtros al cerrar el panel.
  const botonFiltrosRef = useRef(null);

  // ==========================================
  // BLOQUE B: CONEXIÓN CON LA API Y TEXTOS
  // ==========================================

  // [API] Hace que se carguen los eventos según los filtros.
  const { eventos, paginacion, cargando, error, recargar } = useEventos(filtros);

  // [API] Hace que los textos de Explorar y de los estados estén a mano.
  const t = textos?.paginas?.explorar;
  const tEstado = textos?.estados;

  // [STATIC] Hace que estén disponibles los textos que la API no trae.
  const local = textosLocales[en ? "en" : "es"];

  // [LOCAL] Hace que se use el texto de la API o, si falta, el de respaldo en el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // [API] Hace que el conteo de resultados use singular o plural.
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

  // [LOCAL] Hace que los filtros se guarden en el estado y en la URL.
  function aplicar(nuevos) {
    setFiltros(nuevos);
    guardarFiltros(nuevos);
  }

  // [LOCAL] Hace que un filtro cambie y la lista vuelva a la página 1.
  function actualizar(cambios) {
    aplicar({ ...filtros, pagina: "1", ...cambios });
  }

  // [LOCAL] Hace que cambie la página y la vista suba al inicio.
  function cambiarPagina(numero) {
    aplicar({ ...filtros, pagina: String(numero) });
    window.scrollTo(0, 0);
  }

  // [LOCAL] Hace que se borren todos los filtros menos el orden.
  function limpiar() {
    setBusqueda("");
    aplicar({ ...FILTROS_VACIOS, orden: filtros.orden });
  }

  // [LOCAL] Hace que la búsqueda se aplique al presionar Enter.
  function buscar(e) {
    e.preventDefault();
    actualizar({ q: busqueda.trim() });
  }

  // [ACCESIBILIDAD] Hace que el panel se cierre y el foco vuelva al botón que lo abrió.
  const cerrarPanel = useCallback(() => {
    setPanelAbierto(false);
    botonFiltrosRef.current?.focus();
  }, []);

  // [API] Hace que aparezca el nombre de la categoría tal como lo trae la API.
  function nombreCategoria(id) {
    return categorias.find((c) => c.id === id)?.nombre || id;
  }

  // [LOCAL] Hace que los filtros activos se muestren como chips.
  const chips = [
    filtros.categoria && { clave: "categoria", texto: nombreCategoria(filtros.categoria) },
    filtros.ciudad && { clave: "ciudad", texto: filtros.ciudad },
    filtros.q && { clave: "q", texto: `"${filtros.q}"` },
  ].filter(Boolean);

  // [LOCAL] Hace que la × de un chip quite ese filtro.
  function quitarChip(clave) {
    if (clave === "q") setBusqueda("");
    actualizar({ [clave]: "" });
  }

  // ==========================================
  // BLOQUE D: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <main className="contenedor explorar">

      {/* [ACCESIBILIDAD] Hace que aparezca la ruta de navegación (Inicio › Explorar). */}
      <nav className="explorar__migas" aria-label={local.migas}>
        <ol>
          <li>
            {/* [LOCAL] Hace que "Inicio" vuelva al Inicio sin recargar. */}
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavegar("inicio");
              }}
            >
              {tr(textos?.navbar?.enlaces?.inicio, "Inicio", "Home")}
            </a>
          </li>
          <li aria-current="page">{tr(textos?.navbar?.enlaces?.explorar, "Explorar", "Explore")}</li>
        </ol>
      </nav>

      {/* [STATIC] Hace que aparezca el título de la vista. */}
      <h1 className="explorar__titulo">{local.titulo}</h1>

      {/* [API] Hace que aparezca cuántos eventos coinciden con los filtros. */}
      {paginacion && (
        <p className="explorar__resultados" role="status">
          {textoResultados}
        </p>
      )}

      {/* [STATIC] Hace que aparezcan el buscador y el botón de filtros en móvil. */}
      <div className="explorar__buscador-movil">
        <form className="explorar__busqueda" role="search" onSubmit={buscar}>
          <IconoEvento tipo="buscar" />
          <input
            type="search"
            // [ACCESIBILIDAD] Hace que el buscador reciba el foco si se abrió desde la lupa.
            autoFocus={enfocarBusqueda}
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
          // [ACCESIBILIDAD] Hace que el lector anuncie el botón y si el panel está abierto.
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
        {/* [LOCAL] Hace que aparezca el panel de filtros (barra lateral en escritorio, overlay en móvil). */}
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

            {/* [LOCAL] Hace que aparezcan los filtros activos con su botón para quitarlos. */}
            {chips.length > 0 && (
              <ul className="explorar__chips">
                {chips.map((chip) => (
                  <li key={chip.clave} className="explorar__chip">
                    {chip.texto}
                    <button
                      type="button"
                      // [ACCESIBILIDAD] Hace que el lector anuncie qué filtro se va a quitar.
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
              {/* [API] Hace que aparezca el conteo corto en móvil. */}
              {paginacion && <p className="explorar__total-movil">{textoCorto}</p>}

              {/* [LOCAL] Hace que se pueda cambiar el orden de los resultados. */}
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

          {/* [API] Hace que aparezca el estado de carga. */}
          {cargando && (
            <div className="explorar__estado" role="status">
              <h3>{tr(tEstado?.cargando?.titulo, "Cargando…", "Loading…")}</h3>
              <p>{tr(tEstado?.cargando?.texto, "Esto puede tardar unos segundos.", "This may take a few seconds.")}</p>
            </div>
          )}

          {/* [API] Hace que aparezca el error con un botón para reintentar. */}
          {!cargando && error && (
            <div className="explorar__estado" role="alert">
              <h3>{tr(tEstado?.error?.titulo, "Algo salió mal", "Something went wrong")}</h3>
              <p>{tr(tEstado?.error?.texto, "Revisa tu conexión e inténtalo de nuevo.", "Check your connection and try again.")}</p>
              <button type="button" className="explorar__boton" onClick={recargar}>
                {tr(tEstado?.error?.botones?.reintentar, "Reintentar", "Retry")}
              </button>
            </div>
          )}

          {/* [API] Hace que aparezca el estado vacío con un botón para limpiar filtros. */}
          {!cargando && !error && eventos.length === 0 && (
            <div className="explorar__estado">
              <h3>{tr(t?.vacio?.titulo, "No encontramos eventos con esos filtros", "We couldn't find events with those filters")}</h3>
              <p>{tr(t?.vacio?.texto, "Prueba con otra fecha, otra ciudad o limpia los filtros.", "Try another date, another city or clear the filters.")}</p>
              <button type="button" className="explorar__boton" onClick={limpiar}>
                {tr(t?.vacio?.botones?.limpiar, "Limpiar filtros", "Clear filters")}
              </button>
            </div>
          )}

          {/* [API] Hace que aparezcan las tarjetas de eventos y la paginación. */}
          {!cargando && !error && eventos.length > 0 && (
            <>
              <div className="explorar__grid">
                {eventos.map((evento) => (
                  <TarjetaEvento
                    key={evento.id}
                    evento={evento}
                    en={en}
                    textos={textos}
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