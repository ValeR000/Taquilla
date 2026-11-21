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
  etiqueta,
  /* SPRINT 2: Props para un botón que abre un menú: ref para devolverle el foco, si el menú está abierto y qué menú controla */
  ref,
  expandido,
  controla
  /* SPRINT 2 */
}) {
  // ##########
  const clases = `boton boton--${variante} ${clase}`.trim();

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
      /* SPRINT 2: Hace que el botón pueda recibir el foco y anunciar si su menú está abierto */
      ref={ref}
      aria-expanded={expandido}
      aria-controls={controla}
      /* SPRINT 2 */
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