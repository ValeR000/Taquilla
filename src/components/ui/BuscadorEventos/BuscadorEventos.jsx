// ============================================================================
// ARCHIVO: BuscadorEventos.jsx
// RESPONSABILIDAD: Formulario de búsqueda con filtros para escritorio y versión compacta para móvil.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useEffect, useState } from "react";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import { textosLocales } from "../../../utils/textosLocales.js";
import "./BuscadorEventos.css";

export default function BuscadorEventos({ 
  en,                         // [LOCAL] Booleano para saber si el idioma es inglés.
  eventos = [],               // [API] Lista de eventos para extraer las fechas disponibles.
  ciudades = [],              // [API] Lista de ciudades para el selector.
  onBuscar,                   // [LOCAL] Función que envía los filtros al componente padre.
  filtrosAplicados = null,    // [LOCAL] Filtros externos (ej. desde la URL) para sincronizar el formulario.
  textos                      // [API] Los textos de la interfaz desde la API.
}) {
  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================
  
  // [LOCAL] Guarda el texto que el usuario escribe.
  const [consulta, setConsulta] = useState("");
  
  // [LOCAL] Guarda la ciudad seleccionada. Inicia en "Manizales".
  const [ciudad, setCiudad] = useState("Manizales");
  
  // [LOCAL] Guarda la fecha seleccionada.
  const [fecha, setFecha] = useState("");

  // ==========================================
  // BLOQUE B: EFECTO DE SINCRONIZACIÓN
  // ==========================================
  
  // [LOCAL] Sincroniza los estados locales con los filtros aplicados desde fuera (ej. al recargar la página).
  useEffect(() => {
    setConsulta(filtrosAplicados?.consulta ?? "");
    setCiudad(filtrosAplicados === null ? "Manizales" : (filtrosAplicados?.ciudad ?? ""));
    setFecha(filtrosAplicados?.fecha ?? "");
  }, [filtrosAplicados]);

  // ==========================================
  // BLOQUE C: FUNCIONES
  // ==========================================
  
  // [LOCAL] Hace que al enviar el formulario se envíen los 3 filtros al padre sin recargar la página.
  function buscar(evento) {
    evento.preventDefault();
    onBuscar({ consulta, ciudad, fecha });
  }

  // ==========================================
  // BLOQUE D: TEXTOS Y TRADUCCIONES
  // ==========================================
  
  // [API] Extrae los textos específicos del buscador desde la API.
  const h = textos?.paginas?.inicio?.hero?.buscador;
  
  // [STATIC] Extrae los textos locales (ej. "Todas las ciudades").
  const local = textosLocales[en ? "en" : "es"];
  
  // [LOCAL] Función auxiliar para elegir texto de la API o un respaldo local.
  const tr = (valor, es, enTexto) => valor || (en ? enTexto : es);

  // [API] Hace que aparezca el texto "Cualquier fecha" desde la API.
  const cualquierFecha = tr(h?.placeholders?.cuando, "Cualquier fecha", "Any date");
  
  // [API] Hace que aparezca el texto del botón "Buscar" desde la API.
  const textoBuscar = tr(h?.botones?.buscar, "Buscar", "Search");
  
  // [API] Hace que aparezca el resumen de ciudad y fecha en la versión móvil.
  const resumenMovil = tr(h?.resumenMovil, "{ciudad} · {fecha}", "{ciudad} · {fecha}")
    .replace("{ciudad}", ciudad || local.todasCiudades)
    .replace("{fecha}", cualquierFecha);

  // ==========================================
  // BLOQUE E: LO QUE SE DIBUJA EN PANTALLA (JSX)
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
            <span>{tr(h?.etiquetas?.que, "Qué", "What")}</span>
            <input
              type="search"
              value={consulta}
              // [LOCAL] Hace que el input se actualice al escribir.
              onChange={(e) => setConsulta(e.target.value)}
              // [API] Hace que aparezca el placeholder desde la API.
              placeholder={tr(h?.placeholders?.que, "Evento o artista", "Event or artist")}
            />
          </span>
        </label>

        {/* [STATIC] Campo 2: Filtro por ciudad */}
        <label>
          <IconoEvento tipo="lugar" />
          <span>
            {/* [API] Hace que aparezca la etiqueta "Dónde" desde la API. */}
            <span>{tr(h?.etiquetas?.donde, "Dónde", "Where")}</span>
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              {/* [STATIC] Hace que aparezca la opción "Todas las ciudades". */}
              <option value="">{local.todasCiudades}</option>
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
            <span>{tr(h?.etiquetas?.cuando, "Cuándo", "When")}</span>
            <select value={fecha} onChange={(e) => setFecha(e.target.value)}>
              <option value="">{cualquierFecha}</option>
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
        <button className="buscador-boton" type="submit">
          {textoBuscar}
        </button>
      </div>

      {/* ========================================== */}
      {/* VISTA MÓVIL (Oculta en escritorio)         */}
      {/* ========================================== */}
      <div className="buscador-movil">
        <IconoEvento tipo="buscar" />

        <div className="buscador-movil__texto">
          {/* [API] Hace que aparezca el texto principal (ej. "Evento, artista o lugar"). */}
          <span className="buscador-movil__principal">
            {tr(h?.placeholders?.movil, "Evento, artista o lugar", "Event, artist or place")}
          </span>
          {/* [API] Hace que aparezca el resumen de ciudad y fecha. */}
          <span className="buscador-movil__secundario">{resumenMovil}</span>
        </div>

        {/* [LOCAL] Botón de filtro para móvil (actualmente envía el formulario). */}
        <button type="submit" className="buscador-movil__filtro" aria-label={textoBuscar}>
          {/* [STATIC] Ícono SVG de filtros. */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </button>
      </div>
    </form>
  );
}