// ============================================================================
// ARCHIVO: Navbar.jsx
// RESPONSABILIDAD: Barra de navegación superior. Muestra el logo, los enlaces 
// principales, el buscador, el botón de accesibilidad, el selector de idioma 
// (ES/EN) y los botones de sesión.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

import { useState } from 'react';
import './Navbar.css';
import Boton from '../../ui/Boton/Boton.jsx';
// [STATIC] Importa la imagen del ícono de accesibilidad desde la carpeta assets.
import iconoAccesibilidad from '../../../assets/accesibilidad.svg';
// [STATIC] Importa la imagen del logo de Taquilla desde la carpeta assets.
import logo from '../../../assets/logo-taquilla.svg';

// 1. CONFIGURACIÓN ESTÁTICA
// [STATIC] Lista fija de los enlaces del menú. 
const ENLACES = [
  { id: 'inicio', href: '/' },
  { id: 'explorar', href: '/explorar' },
];

// [STATIC] Lista fija de idiomas disponibles.
const IDIOMAS = ['es', 'en'];

// 2. COMPONENTE PRINCIPAL
function Navbar({ idioma, cambiarIdioma, textos, textoGrande, alternarTexto }) {
  
  // [API] Extrae los textos del navbar que vienen de la API. 
  const t = textos?.navbar;
  
  // [API] Extrae los textos del menú móvil de la API. 
  const m = textos?.menuMovil;

  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================
  
  // [LOCAL] Guarda qué enlace está activo. Inicia en 'inicio'.
  const [enlaceActivo, setEnlaceActivo] = useState('inicio');

  // [LOCAL] Guarda el texto que el usuario escribe en el buscador.
  const [busqueda, setBusqueda] = useState('');

  // [LOCAL] Estado falso/verdadero. Inicia cerrado (false).
  const [menuAbierto, setMenuAbierto] = useState(false); 

  // ==========================================
  // BLOQUE B: FUNCIONES (Acciones del usuario)
  // ==========================================

  // [LOCAL] Se ejecuta al enviar el buscador. Evita que la página recargue.
  const manejarBusqueda = (evento) => {
    evento.preventDefault();
    // TODO: Aquí irá la lógica para ir a la página de resultados.
  };

  // [LOCAL] Se ejecuta al hacer clic en un enlace del menú.
  const manejarClicEnlace = (evento, id) => {
    evento.preventDefault();
    setEnlaceActivo(id);
  };

  // ==========================================
  // BLOQUE C: LO QUE SE DIBUJA (JSX)
  // ==========================================
  return (
    // [STATIC] Etiqueta semántica que agrupa la cabecera.
    <header className="navbar">
      {/* [STATIC] Contenedor que limita el ancho y centra los elementos. */}
      <div className="navbar__contenedor">

        {/* ========================================== */}
        {/* GRUPO IZQUIERDO: Logo y Enlaces           */}
        {/* ========================================== */}
        <div className="navbar__izquierda">

          {/* [STATIC] Enlace del logo. */}
          <a href="/" className="navbar__logo" aria-label={t?.logo.aria}>
            <span className="navbar__logo-icono">
              <img src={logo} alt="" width="24" height="24" />
            </span>
            {/* [API] Hace que aparezca el nombre de la marca (Taquilla) traducido desde la API. */}
            <span className="navbar__logo-texto">{t?.logo.texto}</span>
          </a>

          {/* [STATIC] Etiqueta semántica para los enlaces de navegación. */}
          <nav aria-label="Navegación principal">
            <ul className="navbar__enlaces">
              {ENLACES.map((enlace) => (
                <li key={enlace.id}>
                  <a
                    href={enlace.href}
                    // [LOCAL] Hace que el enlace clicado cambie a negrita si es el activo.
                    className={
                      enlaceActivo === enlace.id
                        ? 'navbar__enlace navbar__enlace--activo'
                        : 'navbar__enlace'
                    }
                    // [LOCAL] Avisa a los lectores de pantalla cuál es la página actual.
                    aria-current={enlaceActivo === enlace.id ? 'page' : undefined}
                    // [LOCAL] Hace que al hacer clic, se ejecute la función de arriba.
                    onClick={(e) => manejarClicEnlace(e, enlace.id)}
                  >
                    {/* [API] Hace que aparezca el texto del enlace (Inicio/Explorar) desde la API. */}
                    {t?.enlaces[enlace.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ========================================== */}
        {/* GRUPO DERECHO: Buscador, accesibilidad, idioma, sesión */}
        {/* ========================================== */}
        <div className="navbar__derecha">
          
          {/* [STATIC] Formulario del buscador. */}
          <form className="navbar__buscador" role="search" onSubmit={manejarBusqueda}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              className="navbar__buscador-input"
              // [API] Hace que aparezca el texto de ejemplo ("Busca un evento") desde la API.
              placeholder={t?.buscador.placeholder}
              // [API] Hace que el lector de pantalla lea la descripción desde la API.
              aria-label={t?.buscador.aria}
              // [LOCAL] Hace que el input esté atado al estado de "busqueda".
              value={busqueda}
              // [LOCAL] Hace que cada letra que el usuario escribe se guarde en el estado.
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </form>

          {/* [STATIC] 1. Botón de accesibilidad */}
          <button
            type="button"
            className="navbar__accesibilidad"
            aria-label={idioma === 'en' ? "Toggle text size" : "Aumentar texto"}
            aria-pressed={textoGrande}
            onClick={alternarTexto}
          >
            <img src={iconoAccesibilidad} alt="" width="24" height="24" />
          </button>

          {/* [STATIC] 2. Contenedor del selector de idioma */}
          <div className="navbar__idiomas" role="group" aria-label={t?.aria.idioma}>
            {IDIOMAS.map((codigo) => (
              <button
                key={codigo}
                type="button"
                className={
                  idioma === codigo
                    ? 'navbar__idioma navbar__idioma--activo'
                    : 'navbar__idioma'
                }
                aria-pressed={idioma === codigo}
                onClick={() => cambiarIdioma(codigo)}
              >
                {codigo.toUpperCase()}
              </button>
            ))}
          </div>

          {/* [STATIC] 3. Botones de sesión */}
          <Boton variante="secundario">
            {t?.botones.ingresar}
          </Boton>
          <Boton variante="primario">
            {t?.botones.crearCuenta}
          </Boton>
        </div>
        
        {/* ========================================== */}
        {/* GRUPO MÓVIL (Solo visible en celulares)    */}
        {/* ========================================== */}
        <div className="navbar__movil">
          <button type="button" className="navbar__movil-boton" aria-label={t?.buscador.aria}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          <button type="button" className="navbar__movil-ingresar">
            {t?.botones.ingresar}
          </button>

          <button
            type="button"
            className="navbar__movil-boton"
            aria-label={m?.abrir}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;