// RESPONSABILIDAD: Etiqueta visual (badge) reutilizable para categorías y destacados.
import "./Etiqueta.css";

export default function Etiqueta({ children, clase = "" }) {
  return (
    // [STATIC] Contenedor visual de la etiqueta.
    <span className={`etiqueta ${clase}`.trim()}>
      {children}
    </span>
  );
}