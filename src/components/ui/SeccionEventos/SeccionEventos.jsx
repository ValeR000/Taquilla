// ============================================================================
// ARCHIVO: SeccionEventos.jsx
// RESPONSABILIDAD: Muestra una sección con título, subtítulo, botón "Ver todos" y grid de tarjetas.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import Flecha from "../Flecha/Flecha.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import "./SeccionEventos.css";

export default function SeccionEventos({
  id,
  clase = "", // [LOCAL] Clase extra para controlar visibilidad (ej. ocultar en móvil)
  titulo,
  descripcion,
  eventos = [],
  categorias = [],
  en,
  onAbrir,
  onVerTodos,
}) {
  
  // [LOCAL] Busca el nombre de la categoría por su ID para mostrarlo en la tarjeta.
  const obtenerNombreCategoria = (idCategoria) => {
    const cat = categorias.find((c) => c.id === idCategoria);
    return cat ? cat.nombre : idCategoria;
  };

  return (
    <section className={`seccion-eventos ${clase}`} id={id} aria-labelledby={`${id}-titulo`}>
      <div className="titulo-seccion">
        <div>
          {/* [STATIC] Título principal de la sección. */}
          <h2 id={`${id}-titulo`}>{titulo}</h2>
          {/* [STATIC] Subtítulo o descripción. */}
          <p role="status">{descripcion}</p>
        </div>
        {/* [LOCAL] Botón para ver todos los eventos. */}
        <button className="enlace-home" onClick={onVerTodos}>
          {en ? "View all" : "Ver todos"}
          <Flecha />
        </button>
      </div>
      
      <div className="eventos-grid">
        {/* [API] Recorre los eventos y pinta una TarjetaEvento por cada uno. */}
        {eventos.map((evento) => (
          <TarjetaEvento
            key={evento.id}
            evento={evento}
            en={en}
            nombreCategoria={obtenerNombreCategoria(evento.categoria)}
            onAbrir={onAbrir}
          />
        ))}
      </div>

      {/* [LOCAL] Si no hay eventos, muestra un mensaje de estado vacío. */}
      {!eventos.length && (
        <div className="sin-resultados">
          <h3>{en ? "No events found" : "No encontramos eventos"}</h3>
          <p>{en ? "Try another search." : "Prueba con otra búsqueda."}</p>
          <button className="boton-home primario" onClick={onVerTodos}>
            {en ? "View all events" : "Ver todos los eventos"}
          </button>
        </div>
      )}
    </section>
  );
}