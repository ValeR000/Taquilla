/* SPRINT 2: Ruta de navegación (migas); cada miga con ruta es un enlace sin recargar y la última es la página actual */

export default function Migas({ items = [], onNavegar, clase = "", etiqueta = "" }) {
  function ir(evento, ruta) {
    evento.preventDefault();
    onNavegar(ruta);
  }

  return (
    <nav className={clase} aria-label={etiqueta}>
      <ol>
        {items.map((item) => (
          <li key={item.id} aria-current={item.ruta ? undefined : "page"}>
            {item.ruta ? (
              <a href={item.ruta === "inicio" ? "/" : `/${item.ruta}`} onClick={(e) => ir(e, item.ruta)}>
                {item.texto}
              </a>
            ) : item.texto}
          </li>
        ))}
      </ol>
    </nav>
  );
}
