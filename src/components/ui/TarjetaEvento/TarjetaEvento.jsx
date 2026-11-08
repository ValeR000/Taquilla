// ============================================================================
// ARCHIVO: TarjetaEvento.jsx
// RESPONSABILIDAD: Muestra la información resumida de un evento en una tarjeta.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import { formatoDinero, formatoFecha } from "../../../utils/formato.js";
import "./TarjetaEvento.css";

export default function TarjetaEvento({ 
  evento,             // [API] El objeto del evento con sus datos.
  onAbrir,            // [LOCAL] Función para abrir el detalle del evento.
  nombreCategoria,    // [API] El nombre de la categoría ya traducido.
  en,                 // [LOCAL] Booleano para saber si el idioma es inglés.
  textos              // [API] Los textos de la interfaz desde la API.
}) {
  // ==========================================
  // BLOQUE A: TEXTOS Y TRADUCCIONES
  // ==========================================
  
  // [API] Extrae los textos específicos de la tarjeta desde la API.
  const t = textos?.paginas?.inicio?.tarjeta;
  
  // [LOCAL] Función auxiliar para elegir texto de la API o un respaldo local.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);
  
  // [API] Hace que aparezca el texto del botón (Ver evento / View event).
  const verEvento = tr(t?.botones?.verEvento, "Ver evento", "View event");

  return (
    // [STATIC] Contenedor principal de la tarjeta.
    <article className="tarjeta-evento">
      
      {/* [API] Pinta el afiche del evento usando los colores de la API. */}
      <AficheEvento afiche={evento.afiche} />

      <div className="contenido-evento">
        
        {/* [API] Hace que aparezca la etiqueta con el nombre de la categoría. */}
        <Etiqueta>{nombreCategoria || evento.categoria}</Etiqueta>

        {/* [API] Hace que aparezca el título del evento. */}
        <h3>{evento.titulo}</h3>

        <p>
          <IconoEvento tipo="fecha" />
          {/* [API] Hace que aparezca la fecha y hora formateada. */}
          {formatoFecha(evento.fecha, en)}
        </p>

        <p>
          <IconoEvento tipo="lugar" />
          {/* [API] Hace que aparezca el nombre del recinto y la ciudad. */}
          {evento.recinto?.nombre}, {evento.recinto?.ciudad}
        </p>

        <div className="precio-evento">
          <div>
            {/* [API] Hace que aparezca el texto "Desde" o "From". */}
            <small>{tr(t?.desde, "Desde", "From")}</small>
            {/* [API] Hace que aparezca el precio formateado. */}
            <strong>{formatoDinero(evento.precioDesde)}</strong>
          </div>
          
          <button
            className="boton-evento"
            // [ACCESIBILIDAD] Hace que el lector de pantalla anuncie qué evento se va a abrir.
            aria-label={`${verEvento}: ${evento.titulo}`}
            // [LOCAL] Hace que al hacer clic se abra el detalle del evento.
            onClick={() => onAbrir(evento)}
          >
            {/* [API] Hace que aparezca el texto del botón. */}
            {verEvento}
          </button>
        </div>
      </div>
    </article>
  );
}