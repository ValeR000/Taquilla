// ============================================================================
// ARCHIVO: Boton.jsx
// RESPONSABILIDAD: Componente reutilizable de botón. Se puede usar en cualquier
// parte de la app (Navbar, formularios, tarjetas, etc.).
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

import './Boton.css';

// [STATIC] Recibe propiedades (props) para personalizar su apariencia y comportamiento.
// 'variante' define el estilo visual (primario o secundario).
// 'disabled' bloquea la interacción si es true.
function Boton({
  children,
  variante = 'primario',
  type = 'button',
  disabled = false,
  onClick,
  href,
  clase = '',
  tamano = '', // Sprint 2: "grande" es el tamaño G de Figma
  etiqueta
}) {
  // ##########
  const clases = `boton boton--${variante} ${tamano ? `boton--${tamano}` : ''} ${clase}`.trim(); // Sprint 2

  if (href) {
    return (
      <a href={href} className={clases} aria-label={etiqueta} onClick={onClick}>
        {children}
      </a>
    );
  }
  // ##########

  return (
    // [STATIC] Etiqueta <button> estándar de HTML.
    <button
      type={type}
      // [STATIC] Aplica la clase base y añade la clase de la variante (ej. boton--primario).
      className={clases}
      aria-label={etiqueta}
      // [LOCAL] Deshabilita el botón visual y funcionalmente si el estado es true.
      disabled={disabled}
      // [LOCAL] Ejecuta la función que se le pase desde el componente padre cuando se hace clic.
      onClick={onClick}
    >
      {/* [STATIC] Renderiza el contenido que esté entre las etiquetas <Boton>...</Boton> */}
      {children}
    </button>
  );
}

export default Boton;