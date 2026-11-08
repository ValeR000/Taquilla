// ============================================================================
// ARCHIVO: SeccionFinDeSemana.jsx
// RESPONSABILIDAD: Muestra una lista vertical de eventos para el fin de semana (diseñada para la vista móvil).
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./SeccionFinDeSemana.css";

export default function SeccionFinDeSemana({ 
  eventos = [],       // [API] Lista de eventos que se van a mostrar.
  en,                 // [LOCAL] Booleano para saber si el idioma es inglés.
  textos,             // [API] Los textos de la interfaz desde la API.
  onAbrir,            // [LOCAL] Función para abrir el detalle de un evento.
  onVerTodos          // [LOCAL] Función para navegar a la vista de Explorar.
}) {
  // ==========================================
  // BLOQUE A: TEXTOS Y TRADUCCIONES
  // ==========================================
  
  // [API] Extrae los textos de la página de inicio desde la API.
  const inicio = textos?.paginas?.inicio;
  
  // [LOCAL] Función auxiliar para elegir texto de la API o un respaldo local.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);
  
  // [API] Hace que aparezca el texto del botón de ver evento (con su aria-label).
  const verEvento = tr(inicio?.tarjeta?.botones?.verEvento, "Ver evento", "View event");
  
  // [API] Hace que aparezca el texto "Desde" o "From" para el precio.
  const desde = tr(inicio?.tarjeta?.desde, "Desde", "From");

  // ==========================================
  // BLOQUE B: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [ACCESIBILIDAD] Etiqueta semántica con aria-labelledby para vincularla al título.
    <section className="fin-de-semana" aria-labelledby="fin-de-semana-titulo">
      
      <div className="titulo-seccion">
        {/* [API] Hace que aparezca el título "Este fin de semana" desde la API. */}
        <h2 id="fin-de-semana-titulo">
          {tr(inicio?.filtrosMovil?.finDeSemana, "Este fin de semana", "This weekend")}
        </h2>
        
        {/* [LOCAL] Botón para navegar a la vista de explorar y ver todos los eventos. */}
        <button className="enlace-home" onClick={onVerTodos}>
          {/* [API] Hace que aparezca el texto "Ver todos" desde la API. */}
          {tr(inicio?.destacados?.enlaces?.verTodos, "Ver todos", "View all")}
        </button>
      </div>

      <ul className="fin-de-semana__lista">
        {/* [API] Recorre los eventos y dibuja un elemento de la lista por cada uno. */}
        {eventos.map((evento) => (
          <li key={evento.id}>
            {/* [LOCAL] Hace que al hacer clic se abra el detalle del evento. */}
            <button
              className="fin-de-semana__item"
              onClick={() => onAbrir(evento)}
              // [ACCESIBILIDAD] Hace que el lector de pantalla anuncie qué evento se va a abrir.
              aria-label={`${verEvento}: ${evento.titulo}`}
            >
              <span className="fin-de-semana__afiche">
                {/* [API] Pinta el afiche del evento usando los colores de la API. */}
                <AficheEvento afiche={evento.afiche} />
              </span>

              <span className="fin-de-semana__texto">
                {/* [API] Hace que aparezca el título del evento. */}
                <strong className="fin-de-semana__titulo">{evento.titulo}</strong>
                
                {/* [API] Hace que aparezca la fecha y hora formateada. */}
                <small>{formatoFecha(evento.fecha, en)}</small>
                
                {/* [API] Hace que aparezca el precio formateado. */}
                <span className="fin-de-semana__precio">
                  {desde} {formatoDinero(evento.precioDesde)}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}