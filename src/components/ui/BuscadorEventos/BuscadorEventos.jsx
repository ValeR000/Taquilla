// ============================================================================
// ARCHIVO: BuscadorEventos.jsx
// RESPONSABILIDAD: Caja de búsqueda con filtros para escritorio y versión compacta para móvil.
// CONVENCIÓN: [API], [LOCAL], [STATIC], [ACCESIBILIDAD].
// ============================================================================

import { useEffect, useState } from "react";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./BuscadorEventos.css";

export default function BuscadorEventos({ en, eventos = [], ciudades = [], onBuscar, filtrosAplicados = null, textos }) {
  // ==========================================
  // BLOQUE A: ESTADOS LOCALES
  // ==========================================

  // [LOCAL] Guarda el texto que el usuario escribe.
  const [consulta, setConsulta] = useState("");

  // [LOCAL] Guarda la ciudad seleccionada.
  const [ciudad, setCiudad] = useState("Manizales");

  // [LOCAL] Guarda la fecha seleccionada.
  const [fecha, setFecha] = useState("");

  // [LOCAL] Sincroniza los filtros si el usuario los cambia desde afuera.
  useEffect(() => {
    setConsulta(filtrosAplicados?.consulta ?? "");
    setCiudad(filtrosAplicados === null ? "Manizales" : (filtrosAplicados?.ciudad ?? ""));
    setFecha(filtrosAplicados?.fecha ?? "");
  }, [filtrosAplicados]);

  // [LOCAL] Envía la búsqueda al componente padre.
  function buscar(evento) {
    evento.preventDefault();
    onBuscar({ consulta, ciudad, fecha });
  }

  // [API] Extrae los textos del buscador desde la API (para la versión móvil).
  const h = textos?.paginas?.inicio?.hero?.buscador;

  return (
    // [STATIC] Formulario contenedor.
    <form id="buscador-eventos" className="buscador-eventos" role="search" onSubmit={buscar}>

      {/* ========================================== */}
      {/* VISTA ESCRITORIO (Oculta en móvil)         */}
      {/* ========================================== */}
      <div className="buscador-desktop">

        {/* [STATIC] Campo 1: Texto */}
        <label>
          <IconoEvento tipo="buscar" />
          <span>
            <span>{en ? "What" : "Qué"}</span>
            <input
              type="search"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              placeholder={en ? "Event or artist" : "Evento o artista"}
            />
          </span>
        </label>

        {/* [STATIC] Campo 2: Ciudades */}
        <label>
          <IconoEvento tipo="lugar" />
          <span>
            <span>{en ? "Where" : "Dónde"}</span>
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              <option value="">{en ? "All cities" : "Todas las ciudades"}</option>
              {/* [API] Recorre las ciudades de la API. */}
              {ciudades.map((c) => (
                <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
              ))}
            </select>
          </span>
        </label>

        {/* [STATIC] Campo 3: Fechas */}
        <label>
          <IconoEvento tipo="fecha" />
          <span>
            <span>{en ? "When" : "Cuándo"}</span>
            <select value={fecha} onChange={(e) => setFecha(e.target.value)}>
              <option value="">{en ? "Any date" : "Cualquier fecha"}</option>
              {/* [API] Recorre las fechas de los eventos de la API. */}
              {eventos.map((ev) => {
                if (!ev.fecha) return null;
                return (
                  <option key={ev.fecha} value={ev.fecha}>
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

        {/* [STATIC] Botón Buscar escritorio */}
        <button className="buscador-boton" type="submit">
          {en ? "Search" : "Buscar"}
        </button>
      </div>

      {/* ========================================== */}
      {/* VISTA MÓVIL (Oculta en escritorio)         */}
      {/* ========================================== */}
      <div className="buscador-movil">
        <IconoEvento tipo="buscar" />

        <div className="buscador-movil__texto">
          {/* [API] Hace que aparezca el texto principal (con fallback en inglés/español) */}
          <span className="buscador-movil__principal">
            {h?.placeholders?.movil || (en ? "Event, artist or place" : "Evento, artista o lugar")}
          </span>

          {/* [STATIC] Texto secundario (Ciudad · Cualquier fecha) con fallback */}
          <span className="buscador-movil__secundario">
            {ciudad || (en ? "All cities" : "Todas las ciudades")} ·{" "}
            {h?.placeholders?.cuando || (en ? "Any date" : "Cualquier fecha")}
          </span>
        </div>

        {/* Botón de filtros para móvil */}
        <button type="submit" className="buscador-movil__filtro" aria-label="Filtrar">
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