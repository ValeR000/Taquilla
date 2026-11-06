// RESPONSABILIDAD: Menú lateral deslizante para móviles con overlay, foco y cierre accesible.
import { useEffect, useRef } from 'react';
import './MenuMovil.css';
import Boton from '../../ui/Boton/Boton.jsx';
import SelectorIdioma from '../../ui/SelectorIdioma/SelectorIdioma.jsx';
import iconoAccesibilidad from '../../../assets/accesibilidad.svg'; // [STATIC] Ícono del muñequito

export default function MenuMovil({
  abierto,           // [LOCAL] Booleano que indica si el menú está visible.
  onCerrar,          // [LOCAL] Función para cerrar el menú.
  textos,            // [API] Objeto con todos los textos traducidos.
  idioma,            // [LOCAL] Idioma actual ('es' o 'en').
  cambiarIdioma,     // [LOCAL] Función para cambiar el idioma.
  abrirAccesibilidad // [LOCAL] Función para abrir el panel.
}) {
  // [ACCESIBILIDAD] Referencia para devolver el foco al botón de cerrar al abrir.
  const botonCerrarRef = useRef(null);

  // ==========================================
  // BLOQUE A: EFECTOS DE ACCESIBILIDAD
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
            <span className="menu-movil__logo">{t?.logo?.texto || 'taquilla'}</span>
          </div>

          {/* [LOCAL] Botón para cerrar el menú. */}
          <button
            ref={botonCerrarRef}
            type="button"
            className="menu-movil__cerrar"
            onClick={onCerrar}
            aria-label={m?.cerrar || 'Cerrar menú'} // [ACCESIBILIDAD]
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
        <nav className="menu-movil__enlaces" aria-label="Navegación móvil">
          {/* [API] Textos de los enlaces. [LOCAL] Cierre al hacer clic. */}
          <a href="#inicio" onClick={onCerrar}>{m?.enlaces?.inicio || 'Inicio'}</a>
          <a href="#explorar" onClick={onCerrar}>{m?.enlaces?.explorar || 'Explorar'}</a>
        </nav>

        {/* ========================================== */}
        {/* SECCIÓN: Ajustes (Idioma y Accesibilidad)  */}
        {/* ========================================== */}
        <div className="menu-movil__secciones">
          <div className="menu-movil__seccion">
            <span className="menu-movil__seccion-titulo">{m?.secciones?.idioma || 'Idioma'}</span> {/* [API] */}
            {/* [STATIC] Componente reutilizable para alternar ES/EN. */}
            <SelectorIdioma
              idioma={idioma}
              cambiarIdioma={cambiarIdioma}
              etiqueta={t?.aria?.idioma}
            />
          </div>

          <div className="menu-movil__seccion">
            <span className="menu-movil__seccion-titulo">{m?.secciones?.accesibilidad || 'Accesibilidad'}</span> {/* [API] */}
            {/* [LOCAL] Cierra el menú y abre el panel de accesibilidad. */}
            <button
              type="button"
              className="menu-movil__btn-accesibilidad"
              onClick={() => {
                onCerrar();
                abrirAccesibilidad();
              }}
              aria-label={t?.aria?.accesibilidad || 'Abrir panel de accesibilidad'} // [ACCESIBILIDAD]
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
          {/* [LOCAL] Botón principal con texto de la API. */}
          <Boton variante="primario" onClick={onCerrar}>
            {m?.botones?.ingresar || 'Ingresar'}
          </Boton>
          {/* [LOCAL] Botón secundario con texto de la API. */}
          <Boton variante="secundario" onClick={onCerrar}>
            {m?.botones?.crearCuenta || 'Crear cuenta'}
          </Boton>
        </div>
      </aside>
    </div>
  );
}