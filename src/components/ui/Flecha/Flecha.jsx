// ============================================================================
// ARCHIVO: Flecha.jsx
// RESPONSABILIDAD: Dibuja el ícono de flecha hacia la derecha.
// CONVENCIÓN: [STATIC].
// ============================================================================

import "./Flecha.css";

export default function Flecha() {
  return (
    // [STATIC] El dibujo SVG de la flecha.
    <svg
      className="icono-flecha"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}