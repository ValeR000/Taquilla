// ============================================================================
// ARCHIVO: Navbar.jsx
// RESPONSABILIDAD: Barra de navegación superior. Muestra el logo, los enlaces 
// principales, el buscador, el selector de idioma (ES/EN), el botón de 
// accesibilidad y los botones de sesión.
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
// Hace que, al recorrerla con un .map, aparezcan los botones de "Inicio" y "Explorar".
const ENLACES = [
  { id: 'inicio', href: '/' },
  { id: 'explorar', href: '/explorar' },
];

// [STATIC] Lista fija de idiomas disponibles.
// Hace que aparezcan los botones "ES" y "EN" en la barra.
const IDIOMAS = ['es', 'en'];

// 2. COMPONENTE PRINCIPAL
// [LOCAL] Recibe 'idioma', 'cambiarIdioma', 'textoGrande' y 'alternarTexto' desde App.jsx.
// [API] Recibe 'textos' (con toda la información de traducción) desde App.jsx.
function Navbar({ idioma, cambiarIdioma, textos, textoGrande, alternarTexto }) {
  
  // [API] Extrae los textos del navbar que vienen de la API. 
  // Hace que podamos usarlos de forma más corta (ej. t?.logo.texto).
  const t = textos?.navbar;
  
  // [API] Extrae los textos del menú móvil de la API. 
  const m = textos?.menuMovil;

  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================
  
  // [LOCAL] Guarda qué enlace está activo. Inicia en 'inicio'.
  // Hace que el enlace actual se subraye y se ponga en negrita.
  const [enlaceActivo, setEnlaceActivo] = useState('inicio');

  // [LOCAL] Guarda el texto que el usuario escribe en el buscador. Inicia vacío.
  // Hace que el input muestre lo que el usuario teclea.
  const [busqueda, setBusqueda] = useState('');

  // [LOCAL] Estado falso/verdadero. Inicia cerrado (false).
  // Hace que el menú móvil se abra o se cierre.
  const [menuAbierto, setMenuAbierto] = useState(false); 

  // ==========================================
  // BLOQUE B: FUNCIONES (Acciones del usuario)
  // ==========================================

  // [LOCAL] Se ejecuta al enviar el buscador (Enter o clic en la lupa).
  // Evita que la página web se recargue por completo.
  const manejarBusqueda = (evento) => {
    evento.preventDefault();
    // TODO: Aquí irá la lógica para ir a la página de resultados.
  };

  // [LOCAL] Se ejecuta al hacer clic en un enlace del menú.
  // Evita que la página recargue y hace que el enlace clicado se marque como activo.
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
            {/* [STATIC] Cuadro oscuro con la imagen del logo de Taquilla. */}
            <span className="navbar__logo-icono">
              <img src={logo} alt="" width="24" height="24" />
            </span>
            {/* [API] Hace que aparezca el nombre de la marca (Taquilla) traducido desde la API. */}
            <span className="navbar__logo-texto">{t?.logo.texto}</span>
          </a>

          {/* [STATIC] Etiqueta semántica para los enlaces de navegación. */}
          <nav aria-label="Navegación principal">
            <ul className="navbar__enlaces">
              {/* [STATIC] Recorre la lista ENLACES y crea un <li> por cada uno. */}
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
        {/* GRUPO DERECHO: Buscador, idioma, sesión    */}
        {/* ========================================== */}
        <div className="navbar__derecha">

          {/* [STATIC] Formulario del buscador. role="search" ayuda a la accesibilidad. */}
          <form className="navbar__buscador" role="search" onSubmit={manejarBusqueda}>
            {/* [STATIC] Dibujo SVG de la lupa. */}
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

          {/* [STATIC] Contenedor del selector de idioma. */}
          <div className="navbar__idiomas" role="group" aria-label={t?.aria.idioma}>
            {/* [STATIC] Recorre la lista IDIOMAS ('es', 'en') y crea un botón por cada uno. */}
            {IDIOMAS.map((codigo) => (
              <button
                key={codigo}
                type="button"
                // [LOCAL] Hace que el botón del idioma actual se pinte de color oscuro.
                className={
                  idioma === codigo
                    ? 'navbar__idioma navbar__idioma--activo'
                    : 'navbar__idioma'
                }
                // [LOCAL] Avisa si el botón está "encendido" o no.
                aria-pressed={idioma === codigo}
                // [LOCAL] Hace que al hacer clic, se cambie el idioma de toda la app.
                onClick={() => cambiarIdioma(codigo)}
              >
                {/* [STATIC] Hace que aparezca el texto "ES" o "EN" en mayúscula. */}
                {codigo.toUpperCase()}
              </button>
            ))}
          </div>

          {/* [STATIC] Botón de accesibilidad (Aumentar tamaño de letra). */}
          <button
            type="button"
            className="navbar__accesibilidad"
            // [LOCAL] Hace que el lector de pantalla anuncie el botón en el idioma actual.
            aria-label={idioma === 'en' ? "Toggle text size" : "Aumentar texto"}
            // [LOCAL] Hace que el botón cambie su estado visual cuando la letra grande está activa.
            aria-pressed={textoGrande}
            // [LOCAL] Hace que al hacer clic se ejecute la función que viene desde App.jsx.
            onClick={alternarTexto}
          >
            {/* [STATIC] Imagen del ícono de accesibilidad. */}
            <img src={iconoAccesibilidad} alt="" width="24" height="24" />
          </button>

          {/* [STATIC] Botones de sesión que usan el componente Boton creado */}
          <Boton variante="secundario">
            {/* [API] Hace que aparezca el texto "Ingresar" traducido desde la API. */}
            {t?.botones.ingresar}
          </Boton>
          <Boton variante="primario">
            {/* [API] Hace que aparezca el texto "Crear cuenta" traducido desde la API. */}
            {t?.botones.crearCuenta}
          </Boton>
        </div>
        
        {/* ========================================== */}
        {/* GRUPO MÓVIL (Solo visible en celulares)    */}
        {/* ========================================== */}
        <div className="navbar__movil">

          {/* [STATIC] Botón de la lupa para celulares. */}
          <button type="button" className="navbar__movil-boton" aria-label={t?.buscador.aria}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                 strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          {/* [STATIC] Botón de ingresar para celulares. */}
          <button type="button" className="navbar__movil-ingresar">
            {/* [API] Texto de ingresar desde la API. */}
            {t?.botones.ingresar}
          </button>

          {/* [STATIC] Botón de las tres rayitas (menú hamburguesa). */}
          <button
            type="button"
            className="navbar__movil-boton"
            // [API] Hace que el lector de pantalla lea "Abrir menú" desde la API.
            aria-label={m?.abrir}
            // [LOCAL] Hace que el botón sepa si el menú está abierto (true) o cerrado (false).
            aria-expanded={menuAbierto}
            // [LOCAL] Hace que al hacer clic, el menú móvil se abra.
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