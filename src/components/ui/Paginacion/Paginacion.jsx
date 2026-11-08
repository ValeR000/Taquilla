// RESPONSABILIDAD: Componente de paginación para navegar entre páginas de resultados.
import "./Paginacion.css";

// [LOCAL] Calcula qué números de página mostrar y cuándo poner puntos suspensivos (...).
// Recibe la página actual y el total de páginas.
function numeros(actual, total) {
  // [LOCAL] Usa un Set para evitar números duplicados y calcula los extremos (inicio, fin, actual y sus vecinos).
  const set = new Set([1, total, actual - 1, actual, actual + 1]);
  
  // [LOCAL] Si estamos cerca del inicio, asegura que se muestren las primeras páginas.
  if (actual <= 2) [2, 3].forEach((n) => set.add(n));
  
  // [LOCAL] Si estamos cerca del final, asegura que se muestren las últimas páginas.
  if (actual >= total - 1) [total - 1, total - 2].forEach((n) => set.add(n));

  // [LOCAL] Filtra los números para que estén dentro del rango (1 hasta total) y los ordena de menor a mayor.
  const lista = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const resultado = [];

  // [LOCAL] Recorre la lista ordenada. Si hay un salto de más de 1 entre el número actual y el anterior, inserta "...".
  lista.forEach((n, i) => {
    if (i > 0 && n - lista[i - 1] > 1) resultado.push("…");
    resultado.push(n);
  });

  return resultado;
}

export default function Paginacion({ pagina, paginas, onCambiar, etiquetas }) {
  // [LOCAL] Si no hay páginas o solo hay 1, no dibuja nada en pantalla.
  if (!paginas || paginas <= 1) return null;

  return (
    // [ACCESIBILIDAD] Contenedor de navegación con etiqueta descriptiva para lectores de pantalla.
    <nav className="paginacion" aria-label={etiquetas.nav}>
      <ol>
        {/* ========================================== */}
        {/* SECCIÓN: Botón Anterior                    */}
        {/* ========================================== */}
        <li>
          <button
            type="button"
            // [ACCESIBILIDAD] Indica que este botón va a la página anterior.
            aria-label={etiquetas.anterior}
            // [LOCAL] Deshabilita el botón si estamos en la primera página.
            disabled={pagina <= 1}
            onClick={() => onCambiar(pagina - 1)}
          >
            {/* [STATIC] Ícono SVG de flecha izquierda. */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </li>

        {/* ========================================== */}
        {/* SECCIÓN: Números de Página                 */}
        {/* ========================================== */}
        {/* [LOCAL] Recorre el array generado por la función 'numeros()'. */}
        {numeros(pagina, paginas).map((n, i) =>
          // [LOCAL] Si el elemento es "...", lo dibuja como texto estático.
          n === "…" ? (
            <li key={`puntos-${i}`} className="paginacion__puntos" aria-hidden="true">
              …
            </li>
          ) : (
            // [LOCAL] Si es un número, dibuja un botón para navegar a esa página.
            <li key={n}>
              <button
                type="button"
                // [ACCESIBILIDAD] Reemplaza {n} en el texto de la etiqueta (ej. "Ir a la página 3").
                aria-label={etiquetas.pagina.replace("{n}", n)}
                // [ACCESIBILIDAD] Avisa a los lectores de pantalla cuál es la página actual.
                aria-current={n === pagina ? "page" : undefined}
                onClick={() => onCambiar(n)}
              >
                {n}
              </button>
            </li>
          )
        )}

        {/* ========================================== */}
        {/* SECCIÓN: Botón Siguiente                   */}
        {/* ========================================== */}
        <li>
          <button
            type="button"
            // [ACCESIBILIDAD] Indica que este botón va a la página siguiente.
            aria-label={etiquetas.siguiente}
            // [LOCAL] Deshabilita el botón si estamos en la última página.
            disabled={pagina >= paginas}
            onClick={() => onCambiar(pagina + 1)}
          >
            {/* [STATIC] Ícono SVG de flecha derecha. */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </li>
      </ol>
    </nav>
  );
}