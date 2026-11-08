// ============================================================================
// ARCHIVO: Footer.jsx
// RESPONSABILIDAD: Pie de página con logo, descripción, columnas de enlaces (incluyendo botón de accesibilidad) y créditos legales.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import './Footer.css';
import logoFooter from '../../../assets/logo-taquilla-footer.svg';
import { textosLocales } from '../../../utils/textosLocales.js';

// [STATIC] Hace que existan las columnas del footer. Los enlaces con "accion" se dibujan como botón.
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

// [LOCAL] Hace que cada ruta se convierta en su dirección real (Inicio es "/").
const rutaAHref = (ruta) => (ruta === 'inicio' ? '/' : `/${ruta}`);

export default function Footer({
  textos,               // [API] Textos del footer (lema, columnas, legal).
  logo,                 // [API] Texto y aria del logo.
  en,                   // [LOCAL] Indica si el idioma es inglés.
  onNavegar,            // [LOCAL] Función para cambiar de vista.
  abrirAccesibilidad    // [LOCAL] Función para abrir el panel de accesibilidad.
}) {

  // ==========================================
  // BLOQUE A: FUNCIONES
  // ==========================================

  // [LOCAL] Hace que un enlace cambie de vista sin recargar. Si no tiene ruta, no hace nada.
  function ir(evento, ruta) {
    if (!ruta) return;
    evento.preventDefault();
    onNavegar(ruta);
  }

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <footer className="footer">
      <div className="footer__contenedor">

        {/* ========================================== */}
        {/* SECCIÓN: Parte Superior (Marca y Columnas) */}
        {/* ========================================== */}
        <div className="footer__superior">

          <div className="footer__marca">
            {/* [LOCAL] Hace que el logo lleve al Inicio. */}
            <a href="/" className="footer__logo" aria-label={logo?.aria} onClick={(e) => ir(e, 'inicio')}>
              <span className="footer__logo-icono">
                <img src={logoFooter} alt="" width="24" height="24" />
              </span>
              {/* [API] Hace que aparezca el nombre de la marca. */}
              <span>{logo?.texto}</span>
            </a>

            {/* [API] Hace que aparezca el lema. */}
            <p className="footer__descripcion">{textos?.lema}</p>
          </div>

          {/* [ACCESIBILIDAD] Hace que la navegación del pie tenga nombre para el lector. */}
          <nav className="footer__columnas" aria-label={textosLocales[en ? 'en' : 'es'].navPie}>
            {COLUMNAS.map((columna) => (
              <div key={columna.id} className="footer__columna">

                {/* [API] Hace que aparezca el título de la columna. */}
                <h2 className="footer__titulo">{textos?.columnas[columna.id].titulo}</h2>

                <ul className="footer__lista">
                  {columna.enlaces.map((enlace) => {
                    // [API] Hace que aparezca el texto de cada enlace.
                    const texto = textos?.columnas[columna.id].enlaces[enlace.id];

                    return (
                      <li key={enlace.id}>
                        {enlace.accion === 'accesibilidad' ? (
                          // [ACCESIBILIDAD] Hace que "Accesibilidad" abra el panel.
                          <button
                            type="button"
                            className="footer__enlace footer__enlace--boton"
                            onClick={abrirAccesibilidad}
                          >
                            {texto}
                          </button>
                        ) : (
                          // [LOCAL] Hace que el enlace lleve a su vista.
                          <a
                            href={enlace.ruta ? rutaAHref(enlace.ruta) : '#'}
                            className="footer__enlace"
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
          {/* [API] Hace que aparezcan los derechos con el año actual. */}
          <p>{textos?.legal.derechos.replace('{anio}', new Date().getFullYear())}</p>

          {/* [API] Hace que aparezca la nota legal. */}
          <p>{textos?.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}