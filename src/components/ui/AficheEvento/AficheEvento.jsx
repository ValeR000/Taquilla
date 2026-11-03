// ============================================================================
// ARCHIVO: AficheEvento.jsx
// RESPONSABILIDAD: Pinta el degradado de fondo del evento.
// CONVENCIÓN: [API], [STATIC].
// ============================================================================

import "./AficheEvento.css";

export default function AficheEvento({ afiche }) {
  // [API] Toma los colores de la API. Si falla, usa un gris por defecto.
  const color1 = afiche?.color1 || "#a49086";
  const color2 = afiche?.color2 || "#554650";

  return (
    // [STATIC] Aplica la clase base de la profe y el degradado por estilo en línea.
    <div 
      className="arte-evento" 
      style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
      aria-hidden="true"
    ></div>
  );
}