/* SPRINT 2: Ruta de navegación (migas); cada miga con ruta es un enlace sin recargar y la última es la página actual */

import "./Migas.css";

export default function Migas({ items = [], onNavegar, clase = "", etiqueta = "" }) {
  function ir(evento, ruta) {
    evento.preventDefault();
    onNavegar(ruta);
  }

  return (
    <nav className={`migas ${clase}`.trim()} aria-label={etiqueta}>
      <ol className="migas__lista">
        {items.map((item) => (
          <li key={item.id} className="migas__item" aria-current={item.ruta ? undefined : "page"}>
            {item.ruta ? (
              <a href={item.ruta === "inicio" ? "/" : `/${item.ruta}`} className="migas__enlace" onClick={(e) => ir(e, item.ruta)}>
                {item.texto}
              </a>
            ) : item.texto}
          </li>
        ))}
      </ol>
    </nav>
  );
}
