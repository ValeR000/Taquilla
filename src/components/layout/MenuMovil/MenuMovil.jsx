// ============================================================================
// ARCHIVO: MenuMovil.jsx
// RESPONSABILIDAD: Menú lateral deslizante para móviles con overlay, foco y cierre accesible.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useEffect, useRef } from 'react';
import './MenuMovil.css';
import Boton from '../../ui/Boton/Boton.jsx';
import SelectorIdioma from '../../ui/SelectorIdioma/SelectorIdioma.jsx';
import iconoAccesibilidad from '../../../assets/accesibilidad.svg'; // [STATIC] Ícono del muñequito
import { textosLocales } from '../../../utils/textosLocales.js';

export default function MenuMovil({
  abierto,           // [LOCAL] Booleano que indica si el menú está visible.
  onCerrar,          // [LOCAL] Función para cerrar el menú.
  onNavegar,         // [LOCAL] Función para manejar el cambio de ruta.
  textos,            // [API] Objeto con todos los textos traducidos.
  idioma,            // [LOCAL] Idioma actual ('es' o 'en').
  cambiarIdioma,     // [LOCAL] Función para cambiar el idioma.
  abrirAccesibilidad // [LOCAL] Función para abrir el panel.
}) {
  // ==========================================
  // BLOQUE A: LÓGICA DE IDIOMA Y NAVEGACIÓN
  // ==========================================
  
  // [LOCAL] Verifica si el idioma actual es inglés.
  const en = idioma === 'en';
  
  // [LOCAL] Función auxiliar de traducción. Hace que se use el texto de la API si existe, 
  // o un texto de respaldo en español/inglés según el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // [LOCAL] Función para manejar el clic en un enlace o botón de navegación.
  function ir(evento, id) {
    // [LOCAL] Evita que el enlace recargue la página.
    evento?.preventDefault();
    // [LOCAL] Hace que el menú móvil se cierre antes de navegar.
    onCerrar();
    // [LOCAL] Hace que se ejecute la función de navegación del componente padre.
    onNavegar(id);
  }

  // [ACCESIBILIDAD] Referencia para devolver el foco al botón de cerrar al abrir.
  const botonCerrarRef = useRef(null);

  // ==========================================
  // BLOQUE B: EFECTOS DE ACCESIBILIDAD
  // ==========================================
  useEffect(() => {
    // [ACCESIBILIDAD] Cierra el menú si el usuario presiona la tecla Escape.
    function manejarTecla(evento) {
      if (evento.key === 'Escape' && abierto) {
        onCerrar();
      }
    }
    
    if (abierto) {
      document.addEventListener('keydown', manejarTecla);
      // [ACCESIBILIDAD] Mueve el foco automáticamente al botón de cerrar.
      botonCerrarRef.current?.focus();
    }
    
    return () => document.removeEventListener('keydown', manejarTecla);
  }, [abierto, onCerrar]);

  // [LOCAL] Si el menú no está abierto, no renderiza nada.
  if (!abierto) return null;

  // ==========================================
  // BLOQUE C: TEXTOS DE LA API
  // ==========================================
  
  // [API] Alias para acceder más rápido a los textos.
  const m = textos?.menuMovil;
  const t = textos?.navbar;

  return (
    // [ACCESIBILIDAD] Contenedor principal con roles de diálogo modal.
    <div className="menu-movil" role="dialog" aria-modal="true">
      
      {/* [LOCAL] Fondo oscuro que cierra el menú al hacer clic. */}
      {/* [ACCESIBILIDAD] aria-hidden evita que el lector de pantalla lo anuncie. */}
      <div className="menu-movil__fondo" onClick={onCerrar} aria-hidden="true" />

      {/* [STATIC] Panel deslizante que contiene los elementos del menú. */}
      <aside className="menu-movil__panel">
        
        {/* ========================================== */}
        {/* SECCIÓN: Cabecera (Logo y Cerrar)          */}
        {/* ========================================== */}
        <div className="menu-movil__header">
          <div className="menu-movil__marca">
            {/* [STATIC] Ícono SVG del logo en un recuadro. */}
            <span className="menu-movil__logo-icono" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
                <path d="M10 9h4M10 15h4" />
              </svg>
            </span>
            {/* [API] Texto de la marca. */}
            <span className="menu-movil__logo">{t?.logo?.texto}</span>
          </div>

          {/* [LOCAL] Botón para cerrar el menú. */}
          <button
            ref={botonCerrarRef}
            type="button"
            className="menu-movil__cerrar"
            onClick={onCerrar}
            aria-label={tr(m?.cerrar, 'Cerrar menú', 'Close menu')} // [ACCESIBILIDAD]
          >
            {/* [STATIC] SVG de la 'X' */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <hr className="menu-movil__divisoria" /> {/* [STATIC] */}

        {/* ========================================== */}
        {/* SECCIÓN: Enlaces de Navegación             */}
        {/* ========================================== */}
        <nav className="menu-movil__enlaces" aria-label={textosLocales[en ? 'en' : 'es'].navMovil}>
          {/* [LOCAL] Hace que al hacer clic en un enlace, navegue y cierre el menú. */}
          <a href="#inicio" onClick={(e) => ir(e, 'inicio')}>
            {/* [API] Hace que aparezca el texto del enlace. */}
            {tr(m?.enlaces?.inicio, 'Inicio', 'Home')}
          </a>
          <a href="#explorar" onClick={(e) => ir(e, 'explorar')}>
            {tr(m?.enlaces?.explorar, 'Explorar', 'Explore')}
          </a>
        </nav>

        {/* ========================================== */}
        {/* SECCIÓN: Ajustes (Idioma y Accesibilidad)  */}
        {/* ========================================== */}
        <div className="menu-movil__secciones">
          <div className="menu-movil__seccion">
            {/* [API] Hace que aparezca el título "Idioma". */}
            <span className="menu-movil__seccion-titulo">
              {tr(m?.secciones?.idioma, 'Idioma', 'Language')}
            </span>
            {/* [STATIC] Componente reutilizable para alternar ES/EN. */}
            <SelectorIdioma
              idioma={idioma}
              cambiarIdioma={cambiarIdioma}
              etiqueta={t?.aria?.idioma}
            />
          </div>

          <div className="menu-movil__seccion">
            {/* [API] Hace que aparezca el título "Accesibilidad". */}
            <span className="menu-movil__seccion-titulo">
              {tr(m?.secciones?.accesibilidad, 'Accesibilidad', 'Accessibility')}
            </span>
            {/* [LOCAL] Cierra el menú y abre el panel de accesibilidad. */}
            <button
              type="button"
              className="menu-movil__btn-accesibilidad"
              onClick={() => {
                onCerrar();
                abrirAccesibilidad();
              }}
              aria-label={tr(t?.aria?.accesibilidad, 'Abrir panel de accesibilidad', 'Open accessibility panel')} // [ACCESIBILIDAD]
            >
              <img src={iconoAccesibilidad} alt="" width="24" height="24" /> {/* [STATIC] */}
            </button>
          </div>
        </div>

        <hr className="menu-movil__divisoria" /> {/* [STATIC] */}

        {/* ========================================== */}
        {/* SECCIÓN: Botones de Sesión                 */}
        {/* ========================================== */}
        <div className="menu-movil__acciones">
          {/* [LOCAL] Botón que cierra el menú y navega a la vista de ingresar. */}
          <Boton variante="primario" onClick={() => ir(null, 'ingresar')}>
            {/* [API] Hace que aparezca el texto "Ingresar". */}
            {tr(m?.botones?.ingresar, 'Ingresar', 'Log in')}
          </Boton>
          
          {/* [LOCAL] Botón que cierra el menú y navega a la vista de registro. */}
          <Boton variante="secundario" onClick={() => ir(null, 'registro')}>
            {/* [API] Hace que aparezca el texto "Crear cuenta". */}
            {tr(m?.botones?.crearCuenta, 'Crear cuenta', 'Sign up')}
          </Boton>
        </div>
      </aside>
    </div>
  );
}