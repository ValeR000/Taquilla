// RESPONSABILIDAD: Componente selector de idioma (ES/EN) con accesibilidad.
import "./SelectorIdioma.css";

export default function SelectorIdioma({ idioma, cambiarIdioma, etiqueta }) {
  return (
    // [STATIC] Contenedor con role="group" para agrupar los botones.
    <div className="selector-idioma" role="group" aria-label={etiqueta}>
      {/* [LOCAL] Recorre los idiomas disponibles ('es', 'en') y crea un botón por cada uno. */}
      {["es", "en"].map((codigo) => (
        <button
          key={codigo}
          type="button"
          // [LOCAL] Hace que el botón del idioma actual se pinte de color oscuro.
          className={`selector-idioma__boton ${
            idioma === codigo ? "selector-idioma__boton--activo" : ""
          }`}
          // [LOCAL] Avisa si el botón está "encendido" o no.
          aria-pressed={idioma === codigo}
          // [LOCAL] Hace que al hacer clic, se cambie el idioma de toda la app.
          onClick={() => cambiarIdioma(codigo)}
        >
          {/* [STATIC] Hace que aparezca el texto "ES" o "EN" en mayúscula. */}
          {codigo.toUpperCase()}
        </button>
      ))}
    </div>
  );
}