// ============================================================================
// ARCHIVO: PanelAccesibilidad.jsx
// RESPONSABILIDAD: Panel flotante para ajustar opciones de accesibilidad (texto, contraste, movimiento).
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import "./PanelAccesibilidad.css";

export default function PanelAccesibilidad({
  abierto,               // [LOCAL] Booleano que indica si el panel está visible.
  onCerrar,              // [LOCAL] Función para cerrar el panel.
  en,                    // [LOCAL] Booleano que indica si el idioma es inglés.
  tamanoTexto,           // [LOCAL] Estado numérico del tamaño del texto.
  aumentarTexto,         // [LOCAL] Función para aumentar el tamaño.
  reducirTexto,          // [LOCAL] Función para reducir el tamaño.
  altoContraste,         // [LOCAL] Booleano de alto contraste.
  setAltoContraste,      // [LOCAL] Función para alternar alto contraste.
  reducirMovimiento,     // [LOCAL] Booleano de reducir movimiento.
  setReducirMovimiento,  // [LOCAL] Función para alternar reducir movimiento.
  subrayarEnlaces,       // [LOCAL] Booleano de subrayar enlaces.
  setSubrayarEnlaces,    // [LOCAL] Función para alternar subrayar enlaces.
  espaciadoLectura,      // [LOCAL] Booleano de espaciado de lectura.
  setEspaciadoLectura,   // [LOCAL] Función para alternar espaciado de lectura.
  restablecer            // [LOCAL] Función para restablecer todos los valores por defecto.
}) {
  // [LOCAL] Si el panel no está abierto, no dibuja nada en pantalla.
  if (!abierto) return null;

  return (
    <>
      {/* [ACCESIBILIDAD] Fondo oscuro que cierra el panel al hacer clic. aria-hidden evita que el lector de pantalla lo anuncie. */}
      <div className="panel-accesibilidad__overlay" onClick={onCerrar} aria-hidden="true"></div>

      {/* [ACCESIBILIDAD] Contenedor principal con roles de diálogo modal. */}
      <aside
        className="panel-accesibilidad"
        role="dialog"
        aria-modal="true"
        aria-label={en ? "Accessibility panel" : "Panel de accesibilidad"}
      >
        
        {/* ========================================== */}
        {/* SECCIÓN: Cabecera                         */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__header">
          <h2>{en ? "Accessibility" : "Accesibilidad"}</h2>
          <button
            type="button"
            className="panel-accesibilidad__cerrar"
            onClick={onCerrar}
            aria-label={en ? "Close panel" : "Cerrar panel"} // [ACCESIBILIDAD]
          >
            {/* [STATIC] Versión escritorio: Texto '✕' */}
            <span className="panel-accesibilidad__cerrar-texto" aria-hidden="true">✕</span>
            
            {/* [STATIC] Versión móvil: SVG de la 'X' */}
            <svg className="panel-accesibilidad__cerrar-icono" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Tamaño del texto                  */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__seccion">
          <h3>{en ? "Text size" : "Tamaño del texto"}</h3>
          <div className="panel-accesibilidad__tamano">
            {/* [LOCAL] Botón para reducir. */}
            <button
              type="button"
              className="panel-accesibilidad__tamano-btn"
              onClick={reducirTexto}
              aria-label={en ? "Decrease text size" : "Reducir texto"} // [ACCESIBILIDAD]
            >
              −
            </button>
            {/* [ACCESIBILIDAD] aria-live anuncia los cambios de tamaño al lector de pantalla. */}
            <span aria-live="polite">A</span>
            {/* [LOCAL] Botón para aumentar. */}
            <button
              type="button"
              className="panel-accesibilidad__tamano-btn"
              onClick={aumentarTexto}
              aria-label={en ? "Increase text size" : "Aumentar texto"} // [ACCESIBILIDAD]
            >
              +
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Interruptores (Toggles)           */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__toggles">
          
          {/* Toggle: Alto contraste */}
          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "High contrast" : "Alto contraste"}</h4>
              <p>{en ? "More difference between text and background" : "Más diferencia entre el texto y el fondo"}</p>
            </div>
            <label className="switch">
              {/* [LOCAL] Atado al estado para cambiar el diseño global. */}
              <input type="checkbox" checked={altoContraste} onChange={(e) => setAltoContraste(e.target.checked)} />
              <span className="slider"></span> {/* [STATIC] */}
            </label>
          </div>

          {/* Toggle: Reducir movimiento */}
          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "Reduce motion" : "Reducir movimiento"}</h4>
              <p>{en ? "No animations or transitions" : "Sin animaciones ni transiciones"}</p>
            </div>
            <label className="switch">
              {/* [LOCAL] Atado al estado para cambiar el diseño global. */}
              <input type="checkbox" checked={reducirMovimiento} onChange={(e) => setReducirMovimiento(e.target.checked)} />
              <span className="slider"></span> {/* [STATIC] */}
            </label>
          </div>

          {/* Toggle: Subrayar enlaces */}
          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "Underline links" : "Subrayar enlaces"}</h4>
              <p>{en ? "Links are distinguished without relying on color" : "Los enlaces se distinguen sin depender del color"}</p>
            </div>
            <label className="switch">
              {/* [LOCAL] Atado al estado para cambiar el diseño global. */}
              <input type="checkbox" checked={subrayarEnlaces} onChange={(e) => setSubrayarEnlaces(e.target.checked)} />
              <span className="slider"></span> {/* [STATIC] */}
            </label>
          </div>

          {/* Toggle: Espaciado de lectura */}
          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "Reading spacing" : "Espaciado de lectura"}</h4>
              <p>{en ? "More space between lines and letters" : "Más espacio entre líneas y entre letras"}</p>
            </div>
            <label className="switch">
              {/* [LOCAL] Atado al estado para cambiar el diseño global. */}
              <input type="checkbox" checked={espaciadoLectura} onChange={(e) => setEspaciadoLectura(e.target.checked)} />
              <span className="slider"></span> {/* [STATIC] */}
            </label>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Pie del panel                     */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__footer">
          <p>
            {en
              ? "Saved on this device. Initial values come from what you already defined in your system."
              : "Se guarda en este dispositivo. Los valores iniciales salen de lo que ya definiste en tu sistema."}
          </p>
          <div className="panel-accesibilidad__footer-acciones">
            <a href="#declaracion">{en ? "Accessibility statement" : "Declaración de accesibilidad"}</a> {/* [STATIC] */}
            <button type="button" className="panel-accesibilidad__restablecer" onClick={restablecer}>
              {en ? "Reset" : "Restablecer"} {/* [LOCAL] Restablece todos los valores iniciales. */}
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}