// ============================================================================
// ARCHIVO: AficheEvento.jsx
// RESPONSABILIDAD: Crea el fondo visual (afiche) de cada evento.
// ============================================================================

import './AficheEvento.css';

export default function AficheEvento({ afiche }) {
  // [API] Extrae los colores del afiche desde la API. Si falla, usa grises por defecto.
  const color1 = afiche?.color1 || "#ccc";
  const color2 = afiche?.color2 || "#999";
  
  return (
    // [STATIC] Pinta un degradado con los colores de la API.
    <div 
      className="afiche-evento" 
      style={{ background: `linear-gradient(135deg, ${color1}, ${color2})` }}
      aria-hidden="true"
    ></div>
  );
}