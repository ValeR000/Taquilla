// ============================================================================
// ARCHIVO: SeccionEventos.jsx
// RESPONSABILIDAD: Muestra una sección con título, descripción, botón "Ver todos" y la cuadrícula de tarjetas de eventos.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import EncabezadoSeccion from "../EncabezadoSeccion/EncabezadoSeccion.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import EstadoMensaje from "../EstadoMensaje/EstadoMensaje.jsx";
import TarjetasEsqueleto from "../TarjetasEsqueleto/TarjetasEsqueleto.jsx";
import { nombreCategoria } from "../../../utils/categorias.js";
import "./SeccionEventos.css";

export default function SeccionEventos({
  id,                 // [STATIC] Identificador único para el título y las anclas.
  clase = "",         // [LOCAL] Clase extra para controlar la visibilidad o estilos (ej. ocultar en móvil).
  titulo,             // [API] Título de la sección (ej. "Destacados de la semana").
  descripcion,        // [API] Subtítulo o descripción de la sección.
  eventos = [],       // [API] Lista de eventos a mostrar.
  cargando = false,
  categorias = [],    // [API] Lista de categorías para traducir los IDs.
  en = false,         // [LOCAL] Booleano para saber si el idioma es inglés.
  textoVerTodos = "",
  textoAccion = "",
  textoDesde = "",
  textoVacioTitulo = "",
  textoVacioTexto = "",
  onAbrir,            // [LOCAL] Función para abrir el detalle de un evento.
  onVerTodos,         // [LOCAL] Función para navegar a la vista de Explorar.
}) {
  // ==========================================
  // BLOQUE A: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [STATIC] Contenedor principal con semántica de sección y accesibilidad para el título.
    <section className={`seccion-eventos ${clase}`} id={id} aria-labelledby={`${id}-titulo`}>
      
      <EncabezadoSeccion
        idTitulo={`${id}-titulo`}
        titulo={titulo}
        descripcion={descripcion}
        textoAccion={textoVerTodos}
        onAccion={onVerTodos}
      />

      <div className="eventos-grid">
        {cargando && <TarjetasEsqueleto cantidad={4} />}

        {/* [API] Recorre los eventos y pinta una TarjetaEvento por cada uno. */}
        {eventos.map((evento) => (
          <TarjetaEvento
            key={evento.id}
            evento={evento}
            en={en}
            textoAccion={textoAccion}
            textoDesde={textoDesde}
            nombreCategoria={nombreCategoria(categorias, evento.categoria)}
            onAccion={onAbrir}
          />
        ))}
      </div>

      {/* [LOCAL] Si no hay eventos, muestra un mensaje de estado vacío. */}
      {!cargando && !eventos.length && (
        <EstadoMensaje
          titulo={textoVacioTitulo}
          texto={textoVacioTexto}
          textoAccion={textoVerTodos}
          onAccion={onVerTodos}
        />
      )}
    </section>
  );
}