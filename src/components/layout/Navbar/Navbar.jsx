// ============================================================================
// ARCHIVO: Navbar.jsx
// RESPONSABILIDAD: Barra de navegación superior (escritorio y móvil) con enlaces, buscador y controles.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useState } from "react";
import "./Navbar.css";
import Boton from "../../ui/Boton/Boton.jsx";
import SelectorIdioma from "../../ui/SelectorIdioma/SelectorIdioma.jsx";
import iconoAccesibilidad from "../../../assets/accesibilidad.svg";
import logo from "../../../assets/logo-taquilla.svg";
import MenuMovil from "../MenuMovil/MenuMovil.jsx";
import { textosLocales } from "../../../utils/textosLocales.js";

// [STATIC] Lista de enlaces de navegación. Usa hash para cambiar de vista sin recargar.
const ENLACES = [
  { id: "inicio", href: "#inicio" },
  { id: "explorar", href: "#explorar" },
];

export default function Navbar({
  idioma,                 // [LOCAL] Idioma actual.
  cambiarIdioma,          // [LOCAL] Función para cambiar idioma.
  textos,                 // [API] Textos de la interfaz.
  activo,                 // [LOCAL] Vista activa actual.
  onBuscar,               // [LOCAL] Función para ejecutar búsqueda desde el navbar.
  onNavegar,              // [LOCAL] Función para manejar el cambio de ruta.
  onAbrirBusqueda,        // [LOCAL] Función para abrir el buscador en móvil.
  abrirAccesibilidad,     // [LOCAL] Función para abrir el panel de accesibilidad.
  accesibilidadAbierta,   // [LOCAL] Estado de si el panel está abierto.
}) {
  // [API] Extrae los textos del navbar desde la API.
  const t = textos?.navbar;
  
  // [LOCAL] Booleano para saber si el idioma es inglés.
  const en = idioma === "en";
  
  // [STATIC] Extrae los textos locales (ej. textos de aria) según el idioma.
  const local = textosLocales[en ? "en" : "es"];

  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================
  
  // [LOCAL] Guarda el texto que el usuario escribe en el buscador.
  const [busqueda, setBusqueda] = useState("");
  
  // [LOCAL] Controla si el menú móvil está abierto o cerrado.
  const [menuAbierto, setMenuAbierto] = useState(false);

  // ==========================================
  // BLOQUE B: FUNCIONES (Acciones del usuario)
  // ==========================================
  
  // [LOCAL] Hace que al enviar el formulario, se ejecute la búsqueda sin recargar la página.
  const manejarBusqueda = (evento) => {
    evento.preventDefault();
    onBuscar({ consulta: busqueda.trim() });
  };

  // [LOCAL] Hace que al hacer clic en un enlace, navegue a la vista correspondiente sin recargar.
  const manejarClicEnlace = (evento, id) => {
    evento.preventDefault();
    onNavegar(id);
  };

  // ==========================================
  // BLOQUE C: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [STATIC] Etiqueta semántica de cabecera.
    <header className="navbar">
      <div className="navbar__contenedor">
        
        {/* ========================================== */}
        {/* GRUPO IZQUIERDO: Logo y Enlaces            */}
        {/* ========================================== */}
        <div className="navbar__izquierda">
          
          {/* [LOCAL] Enlace del logo que navega al inicio al hacer clic. */}
          <a
            href="#inicio"
            className="navbar__logo"
            // [ACCESIBILIDAD] Aria-label desde la API.
            aria-label={t?.logo.aria}
            onClick={(e) => manejarClicEnlace(e, "inicio")}
          >
            <span className="navbar__logo-icono">
              {/* [STATIC] Imagen del logo. */}
              <img src={logo} alt="" width="24" height="24" />
            </span>
            {/* [API] Hace que aparezca el nombre de la marca. */}
            <span className="navbar__logo-texto">{t?.logo.texto}</span>
          </a>

          {/* [STATIC] Etiqueta semántica para la navegación principal. */}
          <nav aria-label={local.navPrincipal}>
            <ul className="navbar__enlaces">
              {/* [STATIC] Recorre los ENLACES y crea un <li> por cada uno. */}
              {ENLACES.map((enlace) => (
                <li key={enlace.id}>
                  <a
                    href={enlace.href}
                    // [LOCAL] Hace que el enlace clicado cambie a negrita si es el activo.
                    className={activo === enlace.id ? "navbar__enlace navbar__enlace--activo" : "navbar__enlace"}
                    // [ACCESIBILIDAD] Avisa a los lectores de pantalla cuál es la página actual.
                    aria-current={activo === enlace.id ? "page" : undefined}
                    // [LOCAL] Hace que al hacer clic, se ejecute la función de navegación.
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
          
          {/* [STATIC] Formulario del buscador. */}
          <form className="navbar__buscador" role="search" onSubmit={manejarBusqueda}>
            {/* [STATIC] Ícono SVG de la lupa. */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              className="navbar__buscador-input"
              // [API] Hace que aparezca el texto de ejemplo desde la API.
              placeholder={t?.buscador.placeholder}
              // [ACCESIBILIDAD] Hace que el lector de pantalla lea la descripción.
              aria-label={t?.buscador.aria}
              // [LOCAL] Hace que el input esté atado al estado de "busqueda".
              value={busqueda}
              // [LOCAL] Hace que cada letra que el usuario escribe se guarde en el estado.
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </form>

          {/* [LOCAL] Botón de accesibilidad que abre el panel. */}
          <button
            type="button"
            className="navbar__accesibilidad"
            // [ACCESIBILIDAD] Aria-label desde la API o respaldo.
            aria-label={t?.aria?.accesibilidad || (en ? "Open accessibility panel" : "Abrir panel de accesibilidad")}
            // [ACCESIBILIDAD] Avisa si el panel está abierto.
            aria-expanded={accesibilidadAbierta}
            onClick={abrirAccesibilidad}
          >
            {/* [STATIC] Imagen del ícono de accesibilidad. */}
            <img src={iconoAccesibilidad} alt="" width="24" height="24" />
          </button>

          {/* [LOCAL] Selector de idioma. */}
          <SelectorIdioma idioma={idioma} cambiarIdioma={cambiarIdioma} etiqueta={t?.aria.idioma} />

          {/* [LOCAL] Botón de ingresar que navega a la vista de login. */}
          <Boton variante="secundario" onClick={() => onNavegar("ingresar")}>
            {/* [API] Hace que aparezca el texto "Ingresar". */}
            {t?.botones.ingresar}
          </Boton>
          
          {/* [LOCAL] Botón de crear cuenta que navega a la vista de registro. */}
          <Boton variante="primario" onClick={() => onNavegar("registro")}>
            {/* [API] Hace que aparezca el texto "Crear cuenta". */}
            {t?.botones.crearCuenta}
          </Boton>
        </div>

        {/* ========================================== */}
        {/* GRUPO MÓVIL: Lupa, Ingresar y Menú         */}
        {/* ========================================== */}
        <div className="navbar__movil">
          
          {/* [LOCAL] Botón de la lupa que abre el buscador en móvil. */}
          <button
            type="button"
            className="navbar__movil-boton"
            // [ACCESIBILIDAD] Aria-label desde la API.
            aria-label={t?.buscador.aria}
            onClick={onAbrirBusqueda}
          >
            {/* [STATIC] Ícono SVG de la lupa. */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {/* [LOCAL] Botón de ingresar en móvil. */}
          <button type="button" className="navbar__movil-ingresar" onClick={() => onNavegar("ingresar")}>
            {t?.botones.ingresar}
          </button>

          {/* [LOCAL] Botón hamburguesa que abre/cierra el menú móvil. */}
          <button
            type="button"
            className="navbar__movil-boton"
            // [ACCESIBILIDAD] Aria-label desde la API.
            aria-label={textos?.menuMovil?.abrir}
            // [ACCESIBILIDAD] Avisa si el menú está abierto.
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            {/* [STATIC] Ícono SVG de las tres rayitas. */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* [LOCAL] Componente del menú móvil. */}
      <MenuMovil
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
        onNavegar={onNavegar}
        textos={textos}
        idioma={idioma}
        cambiarIdioma={cambiarIdioma}
        abrirAccesibilidad={abrirAccesibilidad}
      />
    </header>
  );
}