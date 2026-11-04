// ============================================================================
// ARCHIVO: PanelAccesibilidad.jsx
// RESPONSABILIDAD: Panel flotante con opciones de accesibilidad (texto, contraste, etc).
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import "./PanelAccesibilidad.css";

export default function PanelAccesibilidad({
  abierto,
  onCerrar,
  en, // [LOCAL] Recibimos si está en inglés
  tamanoTexto,
  aumentarTexto,
  reducirTexto,
  altoContraste,
  setAltoContraste,
  reducirMovimiento,
  setReducirMovimiento,
  subrayarEnlaces,
  setSubrayarEnlaces,
  espaciadoLectura,
  setEspaciadoLectura,
  restablecer
}) {
  // [LOCAL] Si el panel está cerrado, no dibuja nada.
  if (!abierto) return null;

  return (
    <>
      {/* [STATIC] Fondo oscuro transparente para cerrar al hacer clic fuera */}
      <div className="panel-accesibilidad__overlay" onClick={onCerrar}></div>

      {/* [STATIC] El contenedor blanco del panel */}
      <aside className="panel-accesibilidad" role="dialog" aria-label="Panel de accesibilidad">
        
        {/* Cabecera */}
        <div className="panel-accesibilidad__header">
          <h2>{en ? "Accessibility" : "Accesibilidad"}</h2>
          <button className="panel-accesibilidad__cerrar" onClick={onCerrar} aria-label={en ? "Close panel" : "Cerrar panel"}>
            ✕
          </button>
        </div>

        {/* Sección: Tamaño de texto */}
        <div className="panel-accesibilidad__seccion">
          <h3>{en ? "Text size" : "Tamaño del texto"}</h3>
          <div className="panel-accesibilidad__tamano">
            <button onClick={reducirTexto} aria-label={en ? "Decrease text size" : "Reducir texto"}>-</button>
            <span>A</span>
            <button onClick={aumentarTexto} aria-label={en ? "Increase text size" : "Aumentar texto"}>+</button>
          </div>
        </div>

        {/* Sección: Toggles (Interruptores) */}
        <div className="panel-accesibilidad__toggles">
          
          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "High contrast" : "Alto contraste"}</h4>
              <p>{en ? "More difference between text and background" : "Más diferencia entre el texto y el fondo"}</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={altoContraste} onChange={(e) => setAltoContraste(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "Reduce motion" : "Reducir movimiento"}</h4>
              <p>{en ? "No animations or transitions" : "Sin animaciones ni transiciones"}</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={reducirMovimiento} onChange={(e) => setReducirMovimiento(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "Underline links" : "Subrayar enlaces"}</h4>
              <p>{en ? "Links are distinguished without relying on color" : "Los enlaces se distinguen sin depender del color"}</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={subrayarEnlaces} onChange={(e) => setSubrayarEnlaces(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-texto">
              <h4>{en ? "Reading spacing" : "Espaciado de lectura"}</h4>
              <p>{en ? "More space between lines and letters" : "Más espacio entre líneas y entre letras"}</p>
            </div>
            <label className="switch">
              <input type="checkbox" checked={espaciadoLectura} onChange={(e) => setEspaciadoLectura(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

        </div>

        {/* Footer */}
        <div className="panel-accesibilidad__footer">
          <p>
            {en 
              ? "Saved on this device. Initial values come from what you already defined in your system." 
              : "Se guarda en este dispositivo. Los valores iniciales salen de lo que ya definiste en tu sistema."}
          </p>
          <div className="panel-accesibilidad__footer-acciones">
            <a href="#declaracion">{en ? "Accessibility statement" : "Declaración de accesibilidad"}</a>
            <button onClick={restablecer}>{en ? "Reset" : "Restablecer"}</button>
          </div>
        </div>

      </aside>
    </>
  );
}