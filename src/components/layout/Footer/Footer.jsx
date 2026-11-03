// ============================================================================
// ARCHIVO: Footer.jsx
// RESPONSABILIDAD: Pie de página de Taquilla. Muestra el logo, la descripción, 
// las columnas de enlaces (Explora, Tu cuenta, Legal) y los créditos finales.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

import './Footer.css';
import logoFooter from '../../../assets/logo-taquilla-footer.svg';
// 1. CONFIGURACIÓN ESTÁTICA
// [STATIC] Arreglo fijo con la estructura de las columnas. 
// Hace que, al recorrerlo con un .map, aparezcan los bloques de "Explora", "Tu cuenta" y "Legal".
// Nota: Los textos de los títulos y enlaces no están aquí, vienen de la API.
const COLUMNAS = [
  {
    id: 'explora',
    enlaces: [
      { id: 'inicio', href: '/' },
      { id: 'explorar', href: '/explorar' },
    ],
  },
  {
    id: 'cuenta',
    enlaces: [
      { id: 'ingresar', href: '#' },
      { id: 'crearCuenta', href: '#' },
    ],
  },
  {
    id: 'legal',
    enlaces: [{ id: 'terminos', href: '#' }],
  },
];

// 2. COMPONENTE PRINCIPAL
// [API] Recibe 'textos' desde App.jsx. Hace que el contenido del footer se traduzca.
function Footer({ textos }) {
  return (
    // [STATIC] Etiqueta semántica para el pie de página.
    <footer className="footer">
      {/* [STATIC] Contenedor que limita el ancho y centra el contenido. */}
      <div className="footer__contenedor">

        {/* ========================================== */}
        {/* PARTE SUPERIOR: Marca y Columnas           */}
        {/* ========================================== */}
        <div className="footer__superior">

          {/* [STATIC] Bloque izquierdo: Logo y descripción. */}
          <div className="footer__marca">
            <a href="/" className="footer__logo" aria-label="Taquilla, ir al inicio">
              {/* [STATIC] Cuadro blanco con la imagen del logo */}
              <span className="footer__logo-icono">
                <img src={logoFooter} alt="" width="24" height="24" />
              </span>
              {/* [STATIC] Hace que aparezca el texto fijo "taquilla" al lado del logo. */}
              <span>taquilla</span>
            </a>

            {/* [API] Hace que aparezca el lema del proyecto traducido desde la API. */}
            <p className="footer__descripcion"> {textos?.lema}</p>
          </div>

          {/* [STATIC] Navegación que agrupa las columnas. */}
          <nav className="footer__columnas" aria-label="Enlaces del pie de página">
            {/* [STATIC] Recorre el arreglo COLUMNAS y crea un bloque <div> por cada una. */}
            {COLUMNAS.map((columna) => (
              <div key={columna.id} className="footer__columna">

                {/* [API] Hace que aparezca el título de la columna (Ej. "Explora") desde la API. */}
                <h2 className="footer__titulo">{textos?.columnas[columna.id].titulo}</h2>
                
                <ul className="footer__lista">
                  {/* [STATIC] Recorre los enlaces de la columna actual y crea un <li> por cada uno. */}
                  {columna.enlaces.map((enlace) => (
                    <li key={enlace.id}>
                      {/* [LOCAL] Hace que al hacer clic en el enlace, el navegador vaya a la ruta (href). */}
                      {/* [API] Hace que aparezca el texto de cada enlace traducido desde la API. */}
                      <a href={enlace.href} className="footer__enlace"> {textos?.columnas[columna.id].enlaces[enlace.id]}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* ========================================== */}
        {/* PARTE INFERIOR: Créditos                   */}
        {/* ========================================== */}
        <div className="footer__inferior">
          {/* [API] Hace que aparezca el texto de derechos de autor desde la API. 
              El .replace() cambia "{anio}" por el año actual (Ej. "© 2026"). */}
          <p>{textos?.legal.derechos.replace('{anio}', new Date().getFullYear())}</p>
          
          {/* [API] Hace que aparezca la nota legal final desde la API. */}
          <p>{textos?.legal.nota}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;