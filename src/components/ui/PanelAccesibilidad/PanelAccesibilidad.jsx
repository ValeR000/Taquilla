// ============================================================================
// ARCHIVO: PanelAccesibilidad.jsx
// RESPONSABILIDAD: Panel flotante para ajustar las preferencias de accesibilidad (contraste, tamaño de texto, etc.).
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useEffect, useRef } from "react";
import { textosLocales } from "../../../utils/textosLocales.js";
import "./PanelAccesibilidad.css";

export default function PanelAccesibilidad({
  abierto,                // [LOCAL] Booleano que indica si el panel está visible.
  onCerrar,               // [LOCAL] Función para cerrar el panel.
  en,                     // [LOCAL] Booleano para saber si el idioma es inglés.
  textos,                 // [API] Textos de la interfaz desde la API.
  aumentarTexto,          // [LOCAL] Función para aumentar el tamaño del texto.
  reducirTexto,           // [LOCAL] Función para reducir el tamaño del texto.
  altoContraste,          // [LOCAL] Estado del switch de alto contraste.
  setAltoContraste,       // [LOCAL] Función para cambiar el alto contraste.
  reducirMovimiento,      // [LOCAL] Estado del switch de reducir movimiento.
  setReducirMovimiento,   // [LOCAL] Función para cambiar reducir movimiento.
  subrayarEnlaces,        // [LOCAL] Estado del switch de subrayar enlaces.
  setSubrayarEnlaces,     // [LOCAL] Función para cambiar subrayar enlaces.
  espaciadoLectura,       // [LOCAL] Estado del switch de espaciado de lectura.
  setEspaciadoLectura,    // [LOCAL] Función para cambiar espaciado de lectura.
  restablecer,            // [LOCAL] Función para restablecer todos los valores.
}) {
  // ==========================================
  // BLOQUE A: REFERENCIAS Y TEXTOS
  // ==========================================
  
  // [ACCESIBILIDAD] Referencia al botón de cerrar para manejar el foco del teclado.
  const cerrarRef = useRef(null);
  
  // [LOCAL] Función auxiliar para elegir texto de la API o un respaldo local.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);
  
  // [STATIC] Extrae los textos locales de respaldo según el idioma.
  const local = textosLocales[en ? "en" : "es"];

  // ==========================================
  // BLOQUE B: EFECTOS DE ACCESIBILIDAD
  // ==========================================
  
  // [ACCESIBILIDAD] Cierra el panel con la tecla Escape y mueve el foco al abrir.
  useEffect(() => {
    if (!abierto) return;

    // [ACCESIBILIDAD] Función que escucha si el usuario presiona una tecla.
    function alTeclear(e) {
      if (e.key === "Escape") onCerrar();
    }

    // [ACCESIBILIDAD] Mueve el foco al botón de cerrar automáticamente.
    cerrarRef.current?.focus();
    
    // [ACCESIBILIDAD] Activa el escucha del teclado.
    document.addEventListener("keydown", alTeclear);
    
    // [LOCAL] Limpieza: remueve el escucha del teclado al cerrar.
    return () => document.removeEventListener("keydown", alTeclear);
  }, [abierto, onCerrar]);

  // [LOCAL] Si el panel no está abierto, no dibuja nada.
  if (!abierto) return null;

  // ==========================================
  // BLOQUE C: CONFIGURACIÓN DE OPCIONES
  // ==========================================
  
  // [LOCAL] Arreglo con la configuración de los switches para renderizarlos dinámicamente.
  const opciones = [
    {
      clave: "altoContraste",
      valor: altoContraste,
      cambiar: setAltoContraste,
      nombre: ["Alto contraste", "High contrast"],
      descripcion: ["Más diferencia entre el texto y el fondo", "More difference between text and background"],
    },
    {
      clave: "reducirMovimiento",
      valor: reducirMovimiento,
      cambiar: setReducirMovimiento,
      nombre: ["Reducir movimiento", "Reduce motion"],
      descripcion: ["Sin animaciones ni transiciones", "No animations or transitions"],
    },
    {
      clave: "subrayarEnlaces",
      valor: subrayarEnlaces,
      cambiar: setSubrayarEnlaces,
      nombre: ["Subrayar enlaces", "Underline links"],
      descripcion: ["Los enlaces se distinguen sin depender del color", "Links stand out without relying on color"],
    },
    {
      clave: "espaciadoLectura",
      valor: espaciadoLectura,
      cambiar: setEspaciadoLectura,
      nombre: ["Espaciado de lectura", "Reading spacing"],
      descripcion: ["Más espacio entre líneas y entre letras", "More space between lines and letters"],
    },
  ];

  // [API] Hace que aparezca el título del panel traducido.
  const titulo = tr(textos?.titulo, "Accesibilidad", "Accessibility");

  // ==========================================
  // BLOQUE D: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <>
      {/* [ACCESIBILIDAD] Fondo oscuro que cierra el panel al hacer clic. aria-hidden evita que el lector lo anuncie. */}
      <div className="panel-accesibilidad__overlay" onClick={onCerrar} aria-hidden="true"></div>

      {/* [ACCESIBILIDAD] Contenedor principal con roles de diálogo modal. */}
      <aside className="panel-accesibilidad" role="dialog" aria-modal="true" aria-labelledby="accesibilidad-titulo">
        
        {/* ========================================== */}
        {/* SECCIÓN: Cabecera                         */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__header">
          {/* [API] Hace que aparezca el título del panel. */}
          <h2 id="accesibilidad-titulo">{titulo}</h2>
          
          {/* [LOCAL] Botón para cerrar el panel con su referencia de foco. */}
          <button
            ref={cerrarRef}
            type="button"
            className="panel-accesibilidad__cerrar"
            onClick={onCerrar}
            // [ACCESIBILIDAD] Aria-label desde los textos locales.
            aria-label={local.cerrarPanel}
          >
            {/* [STATIC] Versión escritorio: Texto '✕' */}
            <span className="panel-accesibilidad__cerrar-texto" aria-hidden="true">✕</span>
            {/* [STATIC] Versión móvil: SVG de la 'X' */}
            <svg className="panel-accesibilidad__cerrar-icono" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Tamaño del texto                  */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__seccion">
          {/* [API] Hace que aparezca el título "Tamaño del texto". */}
          <h3>{tr(textos?.tamanoTexto, "Tamaño del texto", "Text size")}</h3>
          <div className="panel-accesibilidad__tamano">
            
            {/* [LOCAL] Botón para reducir el tamaño del texto. */}
            <button
              type="button"
              className="panel-accesibilidad__tamano-btn"
              onClick={reducirTexto}
              // [ACCESIBILIDAD] Aria-label desde la API.
              aria-label={tr(textos?.aria?.disminuirTexto, "Disminuir el tamaño del texto", "Decrease text size")}
            >
              −
            </button>
            
            {/* [API] Hace que aparezca la letra "A" de muestra. */}
            <span aria-hidden="true">{tr(textos?.muestraTamano, "A", "A")}</span>
            
            {/* [LOCAL] Botón para aumentar el tamaño del texto. */}
            <button
              type="button"
              className="panel-accesibilidad__tamano-btn"
              onClick={aumentarTexto}
              // [ACCESIBILIDAD] Aria-label desde la API.
              aria-label={tr(textos?.aria?.aumentarTexto, "Aumentar el tamaño del texto", "Increase text size")}
            >
              +
            </button>
          </div>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Interruptores (Toggles)           */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__toggles">
          {/* [LOCAL] Recorre las opciones y dibuja un switch por cada una. */}
          {opciones.map(({ clave, valor, cambiar, nombre, descripcion }) => (
            <div className="toggle-item" key={clave}>
              <div className="toggle-texto">
                {/* [API] Hace que aparezca el nombre del switch. */}
                <h3 id={`a11y-${clave}`}>{tr(textos?.[clave]?.nombre, nombre[0], nombre[1])}</h3>
                {/* [API] Hace que aparezca la descripción del switch. */}
                <p id={`a11y-${clave}-desc`}>{tr(textos?.[clave]?.descripcion, descripcion[0], descripcion[1])}</p>
              </div>
              
              <label className="switch">
                {/* [ACCESIBILIDAD] Input tipo switch vinculado a su título y descripción para lectores de pantalla. */}
                <input
                  type="checkbox"
                  role="switch"
                  checked={valor}
                  onChange={(e) => cambiar(e.target.checked)}
                  aria-labelledby={`a11y-${clave}`}
                  aria-describedby={`a11y-${clave}-desc`}
                />
                <span className="slider"></span>
              </label>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Pie del Panel                     */}
        {/* ========================================== */}
        <div className="panel-accesibilidad__footer">
          {/* [API] Hace que aparezca la nota legal sobre el guardado de preferencias. */}
          <p>
            {tr(
              textos?.nota,
              "Se guarda en este dispositivo. Los valores iniciales salen de lo que ya definiste en tu sistema.",
              "Saved on this device. Initial values come from your system settings."
            )}
          </p>
          <div className="panel-accesibilidad__footer-acciones">
            {/* [API] Hace que aparezca el enlace a la declaración de accesibilidad. */}
            <a href="#declaracion">{tr(textos?.enlaces?.declaracion, "Declaración de accesibilidad", "Accessibility statement")}</a>
            
            {/* [LOCAL] Botón que restablece todos los valores iniciales. */}
            <button type="button" className="panel-accesibilidad__restablecer" onClick={restablecer}>
              {/* [API] Hace que aparezca el texto del botón "Restablecer". */}
              {tr(textos?.botones?.restablecer, "Restablecer", "Reset")}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}