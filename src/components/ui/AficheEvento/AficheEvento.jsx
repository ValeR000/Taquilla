// RESPONSABILIDAD: Pinta el degradado de fondo decorativo del evento usando los colores de la API.

import "./AficheEvento.css";

export default function AficheEvento({ 
  clase = "", // Sprint 2: clase extra para darle otro tamaño en el detalle
  afiche // [API] Objeto con los colores del afiche desde la API.
}) {
  // [API] Hace que se tomen los colores de la API, usando variables CSS como respaldo si fallan.
  const color1 = afiche?.color1 || "var(--afiche-color-1)";
  const color2 = afiche?.color2 || "var(--afiche-color-2)";

  return (
    // [STATIC] Hace que se aplique la clase base y se inyecte el degradado mediante variables CSS en línea.
    <div 
      className={`arte-evento ${clase}`.trim()} // Sprint 2
      style={{ "--afiche-inicio": color1, "--afiche-fin": color2 }}
      // [ACCESIBILIDAD] Hace que el lector de pantalla ignore este elemento por ser puramente decorativo.
      aria-hidden="true"
    ></div>
  );
}