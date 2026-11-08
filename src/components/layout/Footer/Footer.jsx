// ============================================================================
// ARCHIVO: Footer.jsx
// RESPONSABILIDAD: Pie de página con logo, descripción, columnas de enlaces (incluyendo botón de accesibilidad) y créditos legales.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import './Footer.css';
import logoFooter from '../../../assets/logo-taquilla-footer.svg';
import { textosLocales } from '../../../utils/textosLocales.js';

// [STATIC] Define la estructura de las columnas del footer. 
// A diferencia de los enlaces normales, el de accesibilidad usa 'accion' para renderizar un botón en lugar de un enlace.
const COLUMNAS = [
  {
    id: 'explora',
    enlaces: [
      { id: 'inicio', ruta: 'inicio' },
      { id: 'explorar', ruta: 'explorar' },
    ],
  },
  {
    id: 'cuenta',
    enlaces: [
      { id: 'ingresar', ruta: 'ingresar' },
      { id: 'crearCuenta', ruta: 'registro' },
    ],
  },
  {
    id: 'legal',
    enlaces: [
      { id: 'terminos', ruta: null },
      { id: 'accesibilidad', accion: 'accesibilidad' },
    ],
  },
];

export default function Footer({ 
  textos,               // [API] Textos de la interfaz (lema, columnas, legal).
  logo,                 // [API] Textos e información de accesibilidad del logo.
  en,                   // [LOCAL] Booleano para saber si el idioma es inglés.
  onNavegar,            // [LOCAL] Función para manejar el cambio de ruta.
  abrirAccesibilidad    // [LOCAL] Función para abrir el panel de accesibilidad.
}) {
  
  // ==========================================
  // BLOQUE A: FUNCIONES
  // ==========================================
  
  // [LOCAL] Hace que al hacer clic en un enlace navegue sin recargar la página.
  function ir(evento, ruta) {
    // [LOCAL] Si la ruta es null (como en Términos), no hace nada y deja el comportamiento por defecto.
    if (!ruta) return;
    evento.preventDefault();
    onNavegar(ruta);
  }

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [STATIC] Etiqueta semántica de pie de página.
    <footer className="footer">
      <div className="footer__contenedor">
        
        {/* ========================================== */}
        {/* SECCIÓN: Parte Superior (Marca y Columnas) */}
        {/* ========================================== */}
        <div className="footer__superior">
          
          <div className="footer__marca">
            {/* [LOCAL] Enlace del logo que navega al inicio al hacer clic. */}
            <a href="#inicio" className="footer__logo" aria-label={logo?.aria} onClick={(e) => ir(e, 'inicio')}>
              <span className="footer__logo-icono">
                {/* [STATIC] Imagen del logo. */}
                <img src={logoFooter} alt="" width="24" height="24" />
              </span>
              {/* [API] Hace que aparezca el nombre de la marca. */}
              <span>{logo?.texto}</span>
            </a>

            {/* [API] Hace que aparezca la descripción o lema del pie de página. */}
            <p className="footer__descripcion">{textos?.lema}</p>
          </div>

          {/* [STATIC] Navegación que agrupa las columnas. */}
          <nav className="footer__columnas" aria-label={textosLocales[en ? 'en' : 'es'].navPie}>
            {/* [STATIC] Recorre el arreglo COLUMNAS y crea un bloque por cada una. */}
            {COLUMNAS.map((columna) => (
              <div key={columna.id} className="footer__columna">
                
                {/* [API] Hace que aparezca el título de la columna (ej. "Legal"). */}
                <h2 className="footer__titulo">{textos?.columnas[columna.id].titulo}</h2>

                <ul className="footer__lista">
                  {/* [STATIC] Recorre los enlaces de la columna y crea un <li> por cada uno. */}
                  {columna.enlaces.map((enlace) => {
                    // [API] Extrae el texto del enlace específico desde la API.
                    const texto = textos?.columnas[columna.id].enlaces[enlace.id];

                    return (
                      <li key={enlace.id}>
                        {/* [LOCAL] Si el enlace es la acción de accesibilidad, dibuja un botón. */}
                        {enlace.accion === 'accesibilidad' ? (
                          <button
                            type="button"
                            className="footer__enlace footer__enlace--boton"
                            // [LOCAL] Hace que al hacer clic se abra el panel de accesibilidad.
                            onClick={abrirAccesibilidad}
                          >
                            {texto}
                          </button>
                        ) : (
                          // [LOCAL] Si es un enlace normal, dibuja la etiqueta <a>.
                          <a
                            href={enlace.ruta ? `#${enlace.ruta}` : '#'}
                            className="footer__enlace"
                            // [LOCAL] Hace que al hacer clic navegue a la ruta indicada.
                            onClick={(e) => ir(e, enlace.ruta)}
                          >
                            {texto}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ========================================== */}
        {/* SECCIÓN: Parte Inferior (Créditos)         */}
        {/* ========================================== */}
        <div className="footer__inferior">
          {/* [API] Hace que aparezcan los derechos de autor, reemplazando {anio} por el año actual. */}
          <p>{textos?.legal.derechos.replace('{anio}', new Date().getFullYear())}</p>
          
          {/* [API] Hace que aparezca la nota legal. */}
          <p>{textos?.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}