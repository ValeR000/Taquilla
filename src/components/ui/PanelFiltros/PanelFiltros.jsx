// RESPONSABILIDAD: Panel de filtros (lateral en escritorio, modal en móvil) para refinar la búsqueda de eventos.
import { useEffect, useRef } from "react";
import { formatoDinero } from "../../../utils/formato.js";
import "./PanelFiltros.css";

// [STATIC] Opciones de fecha locales (visuales, ya que la API no filtra por fecha).
const FECHAS = {
  hoy: ["Hoy", "Today"],
  finDeSemana: ["Este fin de semana", "This weekend"],
  mes: ["Este mes", "This month"],
  elegir: ["Elegir fechas", "Pick dates"],
};

export default function PanelFiltros({
  id,
  abierto,
  onCerrar,
  en,
  textos,
  local,
  categorias = [],
  ciudades = [],
  filtros,
  onCambiar,
  onLimpiar,
  total,
  nombreCategoria,
}) {
  // ==========================================
  // BLOQUE A: REFERENCIAS Y TEXTOS
  // ==========================================
  
  // [ACCESIBILIDAD] Referencia al botón de cerrar para manejar el foco del teclado.
  const cerrarRef = useRef(null);
  
  // [API] Extrae los textos específicos de los filtros desde la API.
  const tf = textos?.filtros;
  
  // [LOCAL] Función auxiliar para elegir texto de la API o local según el idioma.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // ==========================================
  // BLOQUE B: EFECTOS DE ACCESIBILIDAD
  // ==========================================
  
  // [ACCESIBILIDAD] Configura el panel como un modal accesible cuando está abierto.
  useEffect(() => {
    if (!abierto) return;

    // [ACCESIBILIDAD] Cierra el panel si el usuario presiona la tecla Escape.
    function alTeclear(e) {
      if (e.key === "Escape") onCerrar();
    }

    // [ACCESIBILIDAD] Mueve el foco al botón de cerrar y bloquea el scroll del fondo.
    cerrarRef.current?.focus();
    document.addEventListener("keydown", alTeclear);
    document.body.style.overflow = "hidden";

    // [LOCAL] Limpieza: remueve el escucha del teclado y devuelve el scroll al cerrar.
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = "";
    };
  }, [abierto, onCerrar]);

  // [LOCAL] Calcula el texto del botón inferior con el total de resultados.
  const verResultados = tr(tf?.botones?.verResultados, "Ver {cantidad} eventos", "See {cantidad} events").replace(
    "{cantidad}",
    total
  );

  // ==========================================
  // BLOQUE C: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <aside
      id={id}
      // [LOCAL] Aplica la clase de abierto para animar la entrada del panel.
      className={`panel-filtros${abierto ? " panel-filtros--abierto" : ""}`}
      aria-labelledby={`${id}-titulo`}
      // [ACCESIBILIDAD] Convierte el panel en un diálogo modal cuando se abre en móvil.
      role={abierto ? "dialog" : undefined}
      aria-modal={abierto ? "true" : undefined}
    >
      {/* ========================================== */}
      {/* SECCIÓN: Cabecera del Panel                */}
      {/* ========================================== */}
      <div className="panel-filtros__cabecera">
        {/* [API] Título del panel de filtros */}
        <h2 id={`${id}-titulo`}>{tr(tf?.titulo, "Filtros", "Filters")}</h2>

        <div className="panel-filtros__acciones">
          {/* [LOCAL] Botón para limpiar todos los filtros aplicados */}
          <button type="button" className="panel-filtros__limpiar" onClick={onLimpiar}>
            {tr(tf?.botones?.limpiar, "Limpiar", "Clear")}
          </button>

          {/* [LOCAL] Botón para cerrar el panel con su respectiva referencia de foco */}
          <button
            ref={cerrarRef}
            type="button"
            className="panel-filtros__cerrar"
            aria-label={local.cerrarFiltros}
            onClick={onCerrar}
          >
            {/* [STATIC] Ícono SVG de la 'X' */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      <div className="panel-filtros__contenido">
        
        {/* ========================================== */}
        {/* SECCIÓN: Filtro por Categoría              */}
        {/* ========================================== */}
        <div className="panel-filtros__grupo">
          <h3 id={`${id}-categoria`} className="panel-filtros__subtitulo">
            {tr(tf?.categoria, "Categoría", "Category")}
          </h3>

          {/* [ACCESIBILIDAD] Usa un grupo de radios para que solo se seleccione una categoría a la vez (como lo permite la API). */}
          <div role="radiogroup" aria-labelledby={`${id}-categoria`} className="panel-filtros__opciones">
            {categorias.map((cat) => (
              <label key={cat.id} className="panel-filtros__opcion">
                {/* [API] Input radio que se conecta con el filtro actual */}
                <input
                  type="radio"
                  name={`${id}-categoria`}
                  value={cat.id}
                  checked={filtros.categoria === cat.id}
                  onChange={() => onCambiar({ categoria: cat.id })}
                  // [LOCAL] Permite desmarcar la categoría si se vuelve a hacer clic en ella
                  onClick={() => filtros.categoria === cat.id && onCambiar({ categoria: "" })}
                />
                <span>{nombreCategoria(cat.id)}</span>
                {/* [API] Conteo de eventos que tiene esa categoría */}
                <small>{cat.eventos}</small>
              </label>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Filtro por Fecha (Visual)         */}
        {/* ========================================== */}
        <div className="panel-filtros__grupo">
          <h3 className="panel-filtros__subtitulo">{tr(tf?.fecha?.titulo, "Fecha", "Date")}</h3>
          <div className="panel-filtros__chips">
            {/* [STATIC] Botones deshabilitados porque la API no filtra por fecha en esta vista */}
            {Object.entries(FECHAS).map(([clave, [es, enTexto]]) => (
              <button key={clave} type="button" disabled>
                {tr(tf?.fecha?.[clave], es, enTexto)}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Filtro por Ciudad                 */}
        {/* ========================================== */}
        <div className="panel-filtros__grupo">
          <label htmlFor={`${id}-ciudad`} className="panel-filtros__subtitulo">
            {tr(tf?.ciudad, "Ciudad", "City")}
          </label>
          {/* [LOCAL] Selector de ciudad que actualiza el filtro en la URL */}
          <select
            id={`${id}-ciudad`}
            className="panel-filtros__select"
            value={filtros.ciudad}
            onChange={(e) => onCambiar({ ciudad: e.target.value })}
          >
            <option value="">{local.todasCiudades}</option>
            {/* [API] Listado de ciudades desde la API */}
            {ciudades.map((c) => (
              <option key={c.nombre} value={c.nombre}>
                {c.nombre}
              </option>
            ))}
          </select>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Filtro por Precio (Visual)        */}
        {/* ========================================== */}
        <div className="panel-filtros__grupo">
          <h3 className="panel-filtros__subtitulo">{tr(tf?.precio, "Precio", "Price")}</h3>
          {/* [STATIC] Falso slider deshabilitado porque la API no filtra por precio */}
          <div className="panel-filtros__rango" aria-hidden="true">
            <span className="panel-filtros__pista" />
          </div>
          <div className="panel-filtros__valores" aria-hidden="true">
            <span>{formatoDinero(30000)}</span>
            <span>{formatoDinero(150000)}</span>
          </div>
        </div>
      </div>

      {/* ========================================== */}
      {/* SECCIÓN: Pie del Panel                     */}
      {/* ========================================== */}
      <div className="panel-filtros__pie">
        {/* [LOCAL] Botón para aplicar filtros y cerrar el panel (muestra el total de eventos) */}
        <button type="button" onClick={onCerrar}>
          {verResultados}
        </button>
      </div>
    </aside>
  );
}