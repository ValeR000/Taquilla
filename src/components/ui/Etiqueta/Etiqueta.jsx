// RESPONSABILIDAD: Etiqueta visual (badge) reutilizable para categorías y destacados.
import "./Etiqueta.css";

export default function Etiqueta({ children }) {
  return (
    // [STATIC] Contenedor visual de la etiqueta.
    <span className="etiqueta">
      {children}
    </span>
  );
}