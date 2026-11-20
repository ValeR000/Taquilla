// ============================================================================
// ARCHIVO: SeccionEventos.jsx
// RESPONSABILIDAD: Muestra una sección con título, descripción, botón "Ver todos" y la cuadrícula de tarjetas de eventos.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import EncabezadoSeccion from "../EncabezadoSeccion/EncabezadoSeccion.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import EstadoMensaje from "../EstadoMensaje/EstadoMensaje.jsx";
import "./SeccionEventos.css";

export default function SeccionEventos({
  id,                 // [STATIC] Identificador único para el título y las anclas.
  clase = "",         // [LOCAL] Clase extra para controlar la visibilidad o estilos (ej. ocultar en móvil).
  titulo,             // [API] Título de la sección (ej. "Destacados de la semana").
  descripcion,        // [API] Subtítulo o descripción de la sección.
  eventos = [],       // [API] Lista de eventos a mostrar.
  cargando = false,
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
      
      <EncabezadoSeccion
        idTitulo={`${id}-titulo`}
        titulo={titulo}
        descripcion={descripcion}
        textoBoton={verTodos}
        onBoton={onVerTodos}
      />

      <div className="eventos-grid">
        {cargando && Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="tarjeta-evento tarjeta-esqueleto" aria-hidden="true" />
        ))}

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
      {!cargando && !eventos.length && (
        <EstadoMensaje
          titulo={tr(textos?.estados?.vacio?.titulo, "No hay nada por aquí", "Nothing here yet")}
          texto={tr(textos?.estados?.vacio?.texto, "Cuando haya información la verás en este lugar.", "When there is information you'll see it here.")}
          boton={verTodos}
          onBoton={onVerTodos}
        />
      )}
    </section>
  );
}