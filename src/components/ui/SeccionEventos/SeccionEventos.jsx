// ============================================================================
// ARCHIVO: SeccionEventos.jsx
// RESPONSABILIDAD: Muestra una sección con título, descripción, botón "Ver todos" y la cuadrícula de tarjetas de eventos.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import Flecha from "../Flecha/Flecha.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import "./SeccionEventos.css";

export default function SeccionEventos({
  id,                 // [STATIC] Identificador único para el título y las anclas.
  clase = "",         // [LOCAL] Clase extra para controlar la visibilidad o estilos (ej. ocultar en móvil).
  titulo,             // [API] Título de la sección (ej. "Destacados de la semana").
  descripcion,        // [API] Subtítulo o descripción de la sección.
  eventos = [],       // [API] Lista de eventos a mostrar.
  categorias = [],    // [API] Lista de categorías para traducir los IDs.
  en,                 // [LOCAL] Booleano para saber si el idioma es inglés.
  textos,             // [API] Los textos de la interfaz desde la API.
  onAbrir,            // [LOCAL] Función para abrir el detalle de un evento.
  onVerTodos,         // [LOCAL] Función para navegar a la vista de Explorar.
}) {
  // ==========================================
  // BLOQUE A: TEXTOS Y TRADUCCIONES
  // ==========================================
  
  // [LOCAL] Función auxiliar para elegir texto de la API o un respaldo local.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);
  
  // [API] Hace que aparezca el texto del enlace "Ver todos" o "View all".
  const verTodos = tr(textos?.paginas?.inicio?.destacados?.enlaces?.verTodos, "Ver todos", "View all");

  // [LOCAL] Busca el nombre de la categoría por su ID para pasarlo a las tarjetas.
  const obtenerNombreCategoria = (idCategoria) => {
    const cat = categorias.find((c) => c.id === idCategoria);
    return cat ? cat.nombre : idCategoria;
  };

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [STATIC] Contenedor principal con semántica de sección y accesibilidad para el título.
    <section className={`seccion-eventos ${clase}`} id={id} aria-labelledby={`${id}-titulo`}>
      
      <div className="titulo-seccion">
        <div>
          {/* [API] Hace que aparezca el título de la sección. */}
          <h2 id={`${id}-titulo`}>{titulo}</h2>
          
          {/* [LOCAL] Hace que aparezca la descripción*/}
          <p>{descripcion}</p>
        </div>

        {/* [LOCAL] Botón para ver todos los eventos. */}
        <button className="enlace-home" onClick={onVerTodos}>
          {/* [API] Hace que aparezca el texto "Ver todos". */}
          {verTodos}
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
            textos={textos}
            nombreCategoria={obtenerNombreCategoria(evento.categoria)}
            onAbrir={onAbrir}
          />
        ))}
      </div>

      {/* [LOCAL] Si no hay eventos, muestra un mensaje de estado vacío. */}
      {!eventos.length && (
        <div className="sin-resultados">
          {/* [API] Hace que aparezca el título del estado vacío desde la API. */}
          <h3>{tr(textos?.estados?.vacio?.titulo, "No hay nada por aquí", "Nothing here yet")}</h3>
          
          {/* [API] Hace que aparezca el texto del estado vacío desde la API. */}
          <p>{tr(textos?.estados?.vacio?.texto, "Cuando haya información la verás en este lugar.", "When there is information you'll see it here.")}</p>
          
          {/* [LOCAL] Botón que lleva a explorar todos los eventos. */}
          <button className="boton-home primario" onClick={onVerTodos}>
            {verTodos}
          </button>
        </div>
      )}
    </section>
  );
}