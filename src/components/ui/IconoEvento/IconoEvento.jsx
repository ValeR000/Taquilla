// ============================================================================
// ARCHIVO: IconoEvento.jsx
// RESPONSABILIDAD: Dibuja los íconos de fecha y lugar.
// CONVENCIÓN: Todos los datos aquí son [STATIC].
// ============================================================================

export default function IconoEvento({ tipo }) {
  if (tipo === "fecha") {
    // [STATIC] Dibuja el ícono de un calendario.
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    );
  }
  // [STATIC] Si no es fecha, dibuja el ícono de un pin de ubicación.
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}