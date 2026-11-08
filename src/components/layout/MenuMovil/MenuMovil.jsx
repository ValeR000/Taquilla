// ============================================================================
// ARCHIVO: MenuMovil.jsx
// RESPONSABILIDAD: Menú lateral deslizante para móviles con overlay, foco y cierre accesible.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useEffect, useRef } from 'react';
import './MenuMovil.css';
import Boton from '../../ui/Boton/Boton.jsx';
import SelectorIdioma from '../../ui/SelectorIdioma/SelectorIdioma.jsx';
import iconoAccesibilidad from '../../../assets/accesibilidad.svg';
import { textosLocales } from '../../../utils/textosLocales.js';

export default function MenuMovil({
  abierto,           // [LOCAL] Indica si el menú está visible.
  onCerrar,          // [LOCAL] Función para cerrar el menú.
  onNavegar,         // [LOCAL] Función para cambiar de vista.
  textos,            // [API] Textos de la interfaz.
  idioma,            // [LOCAL] Idioma actual.
  cambiarIdioma,     // [LOCAL] Función para cambiar el idioma.
  abrirAccesibilidad // [LOCAL] Función para abrir el panel de accesibilidad.
}) {
  // ==========================================
  // BLOQUE A: IDIOMA Y NAVEGACIÓN
  // ==========================================

  const en = idioma === 'en';

  // [LOCAL] Hace que se use el texto de la API o, si falta, el de respaldo en el idioma actual.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // [LOCAL] Hace que el menú se cierre y se cambie de vista sin recargar.
  function ir(evento, id) {
    evento?.preventDefault();
    onCerrar();
    onNavegar(id);
  }

  // [ACCESIBILIDAD] Hace que el foco vaya al botón cerrar al abrir el menú.
  const botonCerrarRef = useRef(null);

  // ==========================================
  // BLOQUE B: EFECTOS DE ACCESIBILIDAD
  // ==========================================

  // [ACCESIBILIDAD] Hace que Escape cierre el menú y que el foco vaya al botón cerrar.
  useEffect(() => {
    function manejarTecla(evento) {
      if (evento.key === 'Escape' && abierto) {
        onCerrar();
      }
    }

    if (abierto) {
      document.addEventListener('keydown', manejarTecla);
      botonCerrarRef.current?.focus();
    }

    return () => document.removeEventListener('keydown', manejarTecla);
  }, [abierto, onCerrar]);

  if (!abierto) return null;

  // ==========================================
  // BLOQUE C: TEXTOS DE LA API
  // ==========================================

  // [API] Hace que los textos del menú y del navbar estén a mano.
  const m = textos?.menuMovil;
  const t = textos?.navbar;

  return (
    // [ACCESIBILIDAD] Hace que el menú se anuncie como diálogo modal.
    <div className="menu-movil" role="dialog" aria-modal="true">

      {/* [LOCAL] Hace que un clic en el fondo cierre el menú. */}
      <div className="menu-movil__fondo" onClick={onCerrar} aria-hidden="true" />

      <aside className="menu-movil__panel">

        {/* ========================================== */}
        {/* SECCIÓN: Cabecera (Logo y Cerrar)          */}
        {/* ========================================== */}
        <div className="menu-movil__header">
          <div className="menu-movil__marca">
            {/* [STATIC] Hace que aparezca el ícono del logo. */}
            <span className="menu-movil__logo-icono" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
                <path d="M10 9h4M10 15h4" />
              </svg>
            </span>
            {/* [API] Hace que aparezca el nombre de la marca. */}
            <span className="menu-movil__logo">{t?.logo?.texto}</span>
          </div>

          {/* [ACCESIBILIDAD] Hace que el botón cerrar tenga nombre para el lector. */}
          <button
            ref={botonCerrarRef}
            type="button"
            className="menu-movil__cerrar"
            onClick={onCerrar}
            aria-label={tr(m?.cerrar, 'Cerrar menú', 'Close menu')}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <hr className="menu-movil__divisoria" />

        {/* ========================================== */}
        {/* SECCIÓN: Enlaces de Navegación             */}
        {/* ========================================== */}
        {/* [ACCESIBILIDAD] Hace que la navegación móvil tenga nombre para el lector. */}
        <nav className="menu-movil__enlaces" aria-label={textosLocales[en ? 'en' : 'es'].navMovil}>
          {/* [LOCAL] Hace que el enlace navegue y cierre el menú. */}
          <a href="/" onClick={(e) => ir(e, 'inicio')}>
            {tr(m?.enlaces?.inicio, 'Inicio', 'Home')}
          </a>
          <a href="/explorar" onClick={(e) => ir(e, 'explorar')}>
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
            {/* [LOCAL] Hace que se pueda cambiar entre ES y EN. */}
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
            {/* [LOCAL] Hace que se cierre el menú y se abra el panel de accesibilidad. */}
            <button
              type="button"
              className="menu-movil__btn-accesibilidad"
              onClick={() => {
                onCerrar();
                abrirAccesibilidad();
              }}
              aria-label={tr(t?.aria?.accesibilidad, 'Abrir panel de accesibilidad', 'Open accessibility panel')}
            >
              <img src={iconoAccesibilidad} alt="" width="24" height="24" />
            </button>
          </div>
        </div>

        <hr className="menu-movil__divisoria" />

        {/* ========================================== */}
        {/* SECCIÓN: Botones de Sesión                 */}
        {/* ========================================== */}
        <div className="menu-movil__acciones">
          {/* [LOCAL] Hace que se cierre el menú y se vaya a la vista de login. */}
          <Boton variante="primario" onClick={() => ir(null, 'ingresar')}>
            {tr(m?.botones?.ingresar, 'Ingresar', 'Log in')}
          </Boton>

          {/* [LOCAL] Hace que se cierre el menú y se vaya a la vista de registro. */}
          <Boton variante="secundario" onClick={() => ir(null, 'registro')}>
            {tr(m?.botones?.crearCuenta, 'Crear cuenta', 'Sign up')}
          </Boton>
        </div>
      </aside>
    </div>
  );
}