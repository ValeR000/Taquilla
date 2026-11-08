// ============================================================================
// ARCHIVO: Navbar.jsx
// RESPONSABILIDAD: Barra de navegación superior (escritorio y móvil) con enlaces, buscador y controles.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useCallback, useState } from "react";
import "./Navbar.css";
import Boton from "../../ui/Boton/Boton.jsx";
import SelectorIdioma from "../../ui/SelectorIdioma/SelectorIdioma.jsx";
import iconoAccesibilidad from "../../../assets/accesibilidad.svg";
import logo from "../../../assets/logo-taquilla.svg";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import { textosLocales } from "../../../utils/textosLocales.js";

// [STATIC] Hace que existan los enlaces principales con su ruta real.
const ENLACES = [
  { id: "inicio", href: "/" },
  { id: "explorar", href: "/explorar" },
];

export default function Navbar({
  idioma,                 // [LOCAL] Idioma actual.
  cambiarIdioma,          // [LOCAL] Función para cambiar el idioma.
  textos,                 // [API] Textos de la interfaz.
  activo,                 // [LOCAL] Vista activa actual.
  onBuscar,               // [LOCAL] Función para ejecutar la búsqueda.
  onNavegar,              // [LOCAL] Función para cambiar de vista.
  onAbrirBusqueda,        // [LOCAL] Función para abrir el buscador en móvil.
  abrirAccesibilidad,     // [LOCAL] Función para abrir el panel de accesibilidad.
  accesibilidadAbierta,   // [LOCAL] Indica si el panel de accesibilidad está abierto.
}) {
  // [API] Hace que los textos del navbar estén a mano.
  const t = textos?.navbar;

  const en = idioma === "en";

  // [STATIC] Hace que estén disponibles los textos que la API no trae.
  const local = textosLocales[en ? "en" : "es"];

  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================

  // [LOCAL] Hace que se guarde lo que se escribe en el buscador.
  const [busqueda, setBusqueda] = useState("");

  // [LOCAL] Hace que el menú móvil se abra o se cierre.
  const [menuAbierto, setMenuAbierto] = useState(false);

  // [ACCESIBILIDAD] Hace que el foco no salte al botón cerrar cada vez que el Navbar se vuelve a dibujar.
const cerrarMenu = useCallback(() => setMenuAbierto(false), []);

  // ==========================================
  // BLOQUE B: FUNCIONES
  // ==========================================

  // [LOCAL] Hace que la búsqueda se envíe a Explorar sin recargar la página.
  const manejarBusqueda = (evento) => {
    evento.preventDefault();
    onBuscar({ consulta: busqueda.trim() });
  };

  // [LOCAL] Hace que un enlace cambie de vista sin recargar la página.
  const manejarClicEnlace = (evento, id) => {
    evento.preventDefault();
    onNavegar(id);
  };

  // ==========================================
  // BLOQUE C: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <header className="navbar">
      <div className="navbar__contenedor">

        {/* ========================================== */}
        {/* GRUPO IZQUIERDO: Logo y Enlaces            */}
        {/* ========================================== */}
        <div className="navbar__izquierda">

          {/* [LOCAL] Hace que el logo lleve al Inicio. */}
          <a
            href="/"
            className="navbar__logo"
            // [ACCESIBILIDAD] Hace que el lector anuncie a dónde lleva el logo.
            aria-label={t?.logo.aria}
            onClick={(e) => manejarClicEnlace(e, "inicio")}
          >
            <span className="navbar__logo-icono">
              <img src={logo} alt="" width="24" height="24" />
            </span>
            {/* [API] Hace que aparezca el nombre de la marca. */}
            <span className="navbar__logo-texto">{t?.logo.texto}</span>
          </a>

          {/* [ACCESIBILIDAD] Hace que la navegación principal tenga nombre para el lector. */}
          <nav aria-label={local.navPrincipal}>
            <ul className="navbar__enlaces">
              {ENLACES.map((enlace) => (
                <li key={enlace.id}>
                  <a
                    href={enlace.href}
                    // [LOCAL] Hace que el enlace de la vista actual se resalte.
                    className={activo === enlace.id ? "navbar__enlace navbar__enlace--activo" : "navbar__enlace"}
                    // [ACCESIBILIDAD] Hace que el lector anuncie cuál es la página actual.
                    aria-current={activo === enlace.id ? "page" : undefined}
                    onClick={(e) => manejarClicEnlace(e, enlace.id)}
                  >
                    {/* [API] Hace que aparezca el texto del enlace. */}
                    {t?.enlaces[enlace.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ========================================== */}
        {/* GRUPO DERECHO: Buscador, Accesibilidad, Idioma, Botones */}
        {/* ========================================== */}
        <div className="navbar__derecha">

          {/* [LOCAL] Hace que la búsqueda se envíe al presionar Enter. */}
          <form className="navbar__buscador" role="search" onSubmit={manejarBusqueda}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              className="navbar__buscador-input"
              // [API] Hace que aparezca el texto de ejemplo.
              placeholder={t?.buscador.placeholder}
              // [ACCESIBILIDAD] Hace que el lector anuncie para qué sirve el campo.
              aria-label={t?.buscador.aria}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </form>

          {/* [ACCESIBILIDAD] Hace que el botón abra el panel de accesibilidad y anuncie si está abierto. */}
          <button
            type="button"
            className="navbar__accesibilidad"
            aria-label={t?.aria?.accesibilidad || (en ? "Open accessibility panel" : "Abrir panel de accesibilidad")}
            aria-expanded={accesibilidadAbierta}
            onClick={abrirAccesibilidad}
          >
            <img src={iconoAccesibilidad} alt="" width="24" height="24" />
          </button>

          {/* [LOCAL] Hace que se pueda cambiar entre ES y EN. */}
          <SelectorIdioma idioma={idioma} cambiarIdioma={cambiarIdioma} etiqueta={t?.aria.idioma} />

          {/* [LOCAL] Hace que "Ingresar" lleve a la vista de login. */}
          <Boton variante="secundario" onClick={() => onNavegar("ingresar")}>
            {t?.botones.ingresar}
          </Boton>

          {/* [LOCAL] Hace que "Crear cuenta" lleve a la vista de registro. */}
          <Boton variante="primario" onClick={() => onNavegar("registro")}>
            {t?.botones.crearCuenta}
          </Boton>
        </div>

        {/* ========================================== */}
        {/* GRUPO MÓVIL: Lupa, Ingresar y Menú         */}
        {/* ========================================== */}
        <div className="navbar__movil">

          {/* [LOCAL] Hace que la lupa abra el buscador de Explorar. */}
          <button
            type="button"
            className="navbar__movil-boton"
            // [ACCESIBILIDAD] Hace que el lector anuncie para qué sirve la lupa.
            aria-label={t?.buscador.aria}
            onClick={onAbrirBusqueda}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {/* [LOCAL] Hace que "Ingresar" lleve a la vista de login. */}
          <button type="button" className="navbar__movil-ingresar" onClick={() => onNavegar("ingresar")}>
            {t?.botones.ingresar}
          </button>

          {/* [ACCESIBILIDAD] Hace que el botón abra el menú y anuncie si está abierto. */}
          <button
            type="button"
            className="navbar__movil-boton"
            aria-label={textos?.menuMovil?.abrir}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* [LOCAL] Hace que aparezca el menú móvil. */}
      <MenuMovil
        abierto={menuAbierto}
        onCerrar={cerrarMenu}
        onNavegar={onNavegar}
        textos={textos}
        idioma={idioma}
        cambiarIdioma={cambiarIdioma}
        abrirAccesibilidad={abrirAccesibilidad}
      />
    </header>
  );
}