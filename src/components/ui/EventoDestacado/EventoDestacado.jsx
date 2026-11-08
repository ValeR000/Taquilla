// ============================================================================
// ARCHIVO: EventoDestacado.jsx
// RESPONSABILIDAD: Tarjeta destacada que se muestra a la derecha del Hero en la vista de Inicio.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./EventoDestacado.css";

export default function EventoDestacado({ 
  evento,         // [API] El evento destacado que viene de la API.
  en,             // [LOCAL] Booleano para saber si el idioma es inglés.
  textos,         // [API] Los textos de la interfaz desde la API.
  onAbrir         // [LOCAL] Función para abrir el detalle del evento.
}) {
  // [LOCAL] Si no hay evento, no dibuja nada para evitar errores.
  if (!evento) return null;

  // [API] Extrae los textos específicos del evento destacado desde la API.
  const d = textos?.paginas?.inicio?.hero?.destacado;
  
  // [LOCAL] Función auxiliar para elegir texto de la API o un respaldo local.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  return (
    // [STATIC] Contenedor principal con el degradado de fondo.
    <div className="destacado-taquilla">
      
      {/* [API] Pinta el afiche del evento usando los colores de la API. */}
      <AficheEvento afiche={evento.afiche} />

      <div className="ficha-destacado">
        
        {/* [API] Hace que aparezca la etiqueta "Destacado" desde la API. */}
        <Etiqueta>{tr(d?.etiqueta, "Destacado", "Featured")}</Etiqueta>

        {/* [API] Hace que aparezca el título del evento desde la API. */}
        <h2>{evento.titulo}</h2>

        {/* [API] Hace que aparezca la fecha (sin hora) y el nombre del recinto. */}
        <p>
          {formatoFecha(evento.fecha, en, false)} · {evento.recinto?.nombre}
        </p>

        <div>
          {/* [API] Hace que aparezca el precio formateado con el prefijo "Desde" o "From". */}
          <strong>
            {tr(d?.desde, "Desde {precio}", "From {precio}").replace("{precio}", formatoDinero(evento.precioDesde))}
          </strong>
          
          {/* [LOCAL] Botón para abrir el detalle del evento. */}
          <button className="boton-destacado" onClick={() => onAbrir(evento)}>
            {/* [API] Hace que aparezca el texto del botón "Ver evento" desde la API. */}
            {tr(d?.botones?.verEvento, "Ver evento", "View event")}
          </button>
        </div>
      </div>
    </div>
  );
}