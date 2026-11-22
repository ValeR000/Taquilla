// ============================================================================
// ARCHIVO: BuscadorEventos.jsx
// RESPONSABILIDAD: Formulario de búsqueda con filtros para escritorio y versión compacta para móvil.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useState } from "react"; // Sprint 2
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import Icono from "../Icono.jsx";
import Boton from "../Boton/Boton.jsx";
import Input from "../Input/Input.jsx";
import "./BuscadorEventos.css";

export default function BuscadorEventos({ 
  en,                         // [LOCAL] Booleano para saber si el idioma es inglés.
  eventos = [],               // [API] Lista de eventos para extraer las fechas disponibles.
  ciudades = [],              // [API] Lista de ciudades para el selector.
  onBuscar,                   // [LOCAL] Función que envía los filtros al componente padre.
  /* SPRINT 2: Ciudad inicial y textos listos desde App */
  ciudadInicial = "",
  textoQue = "",
  textoDonde = "",
  textoCuando = "",
  placeholderQue = "",
  placeholderMovil = "",
  textoCualquierFecha = "",
  textoTodasCiudades = "",
  textoBuscar = "",
  textoResumenMovil = "",
  /* SPRINT 2 */
}) {
  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================
  
  // [LOCAL] Guarda el texto que el usuario escribe.
  const [consulta, setConsulta] = useState("");
  
  // [LOCAL] Guarda la ciudad seleccionada. Inicia en la ciudad que llega de App (ciudadInicial).
  const [ciudad, setCiudad] = useState(ciudadInicial); // Sprint 2
  
  // [LOCAL] Guarda la fecha seleccionada.
  const [fecha, setFecha] = useState("");

  // ==========================================
  // BLOQUE B: FUNCIONES
  // ==========================================
  
  // [LOCAL] Hace que al enviar el formulario se envíen los 3 filtros al padre sin recargar la página.
  function buscar(evento) {
    evento.preventDefault();
    onBuscar({ consulta, ciudad, fecha });
  }

  // ==========================================
  // BLOQUE C: RESUMEN MÓVIL
  // ==========================================
  
  // [API] Hace que aparezca el resumen de ciudad y fecha en la versión móvil.
  /* SPRINT 2: el resumen sale de la plantilla que llega lista */
  const resumenMovil = textoResumenMovil
    .replace("{ciudad}", ciudad || textoTodasCiudades)
    .replace("{fecha}", textoCualquierFecha);
  /* SPRINT 2 */

  // ==========================================
  // BLOQUE D: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    // [STATIC] Formulario contenedor con role de búsqueda para accesibilidad.
    <form id="buscador-eventos" className="buscador-eventos" role="search" onSubmit={buscar}>
      
      {/* ========================================== */}
      {/* VISTA ESCRITORIO (Oculta en móvil)         */}
      {/* ========================================== */}
      <div className="buscador-desktop">
        
        {/* [STATIC] Campo 1: Búsqueda por texto */}
        <label>
          <IconoEvento tipo="buscar" />
          <span>
            {/* [API] Hace que aparezca la etiqueta "Qué" desde la API. */}
            <span>{textoQue}</span>{/* Sprint 2 */}
            <Input
              type="search"
              variante="busqueda"
              value={consulta}
              // [LOCAL] Hace que el input se actualice al escribir.
              onChange={(e) => setConsulta(e.target.value)}
              // [API] Hace que aparezca el placeholder desde la API.
              placeholder={placeholderQue} // Sprint 2
            />
          </span>
        </label>

        {/* [STATIC] Campo 2: Filtro por ciudad */}
        <label>
          <IconoEvento tipo="lugar" />
          <span>
            {/* [API] Hace que aparezca la etiqueta "Dónde" desde la API. */}
            <span>{textoDonde}</span>{/* Sprint 2 */}
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              {/* [STATIC] Hace que aparezca la opción "Todas las ciudades". */}
              <option value="">{textoTodasCiudades}</option>{/* Sprint 2 */}
              {/* [API] Recorre las ciudades y las dibuja como opciones. */}
              {ciudades.map((c) => (
                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </span>
        </label>

        {/* [STATIC] Campo 3: Filtro por fecha */}
        <label>
          <IconoEvento tipo="fecha" />
          <span>
            {/* [API] Hace que aparezca la etiqueta "Cuándo" desde la API. */}
            <span>{textoCuando}</span>{/* Sprint 2 */}
            <select value={fecha} onChange={(e) => setFecha(e.target.value)}>
              <option value="">{textoCualquierFecha}</option>{/* Sprint 2 */}
              {/* [API] Recorre los eventos para extraer las fechas disponibles. */}
              {eventos.map((ev) => {
                if (!ev.fecha) return null;
                return (
                  <option key={ev.id} value={ev.fecha}>
                    {/* [API] Formatea la fecha ISO a un texto corto (ej. "14 nov"). */}
                    {new Date(ev.fecha).toLocaleDateString(en ? "en" : "es-CO", {
                      day: "numeric",
                      month: "short",
                      timeZone: "America/Bogota"
                    })}
                  </option>
                );
              })}
            </select>
          </span>
        </label>

        {/* [LOCAL] Botón para enviar el formulario de búsqueda. */}
        <Boton clase="buscador-boton" type="submit">
          {textoBuscar}
        </Boton>
      </div>

      {/* ========================================== */}
      {/* VISTA MÓVIL (Oculta en escritorio)         */}
      {/* ========================================== */}
      <div className="buscador-movil">
        <IconoEvento tipo="buscar" />

        <div className="buscador-movil__texto">
          {/* [API] Hace que aparezca el texto principal (ej. "Evento, artista o lugar"). */}
          <span className="buscador-movil__principal">
            {placeholderMovil}{/* Sprint 2 */}
          </span>
          {/* [API] Hace que aparezca el resumen de ciudad y fecha. */}
          <span className="buscador-movil__secundario">{resumenMovil}</span>
        </div>

        {/* [LOCAL] Botón de filtro para móvil (actualmente envía el formulario). */}
        <button type="submit" className="buscador-movil__filtro" aria-label={textoBuscar}>
          {/* [STATIC] Ícono SVG de filtros. */}
          <Icono nombre="filtros" tamano={20} />
        </button>
      </div>
    </form>
  );
}