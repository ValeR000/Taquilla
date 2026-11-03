// ============================================================================
// ARCHIVO: BuscadorEventos.jsx
// RESPONSABILIDAD: Caja de búsqueda con filtros de texto, ciudad y fecha.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import { useEffect, useState } from "react";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import "./BuscadorEventos.css";

export default function BuscadorEventos({ en, eventos = [], ciudades = [], onBuscar, filtrosAplicados = null }) {
  // [LOCAL] Estados para los filtros.
  const [consulta, setConsulta] = useState("");
  const [ciudad, setCiudad] = useState("Manizales");
  const [fecha, setFecha] = useState("");

  // [LOCAL] Sincroniza el buscador si el usuario cambia los filtros desde otro lado.
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

  return (
    <form id="buscador-eventos" className="buscador-eventos" role="search" onSubmit={buscar} aria-label={en ? "Find events" : "Buscar eventos"}>
      
      {/* [STATIC] Campo 1: Texto */}
      <label>
        <IconoEvento tipo="buscar" />
        <span>
          <span>{en ? "What" : "Qué"}</span>
          <input type="search" value={consulta} onChange={(e) => setConsulta(e.target.value)} placeholder={en ? "Event or artist" : "Evento o artista"} />
        </span>
      </label>

      {/* [STATIC] Campo 2: Ciudades */}
      <label>
        <IconoEvento tipo="lugar" />
        <span>
          <span>{en ? "Where" : "Dónde"}</span>
          <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
            <option value="">{en ? "All cities" : "Todas las ciudades"}</option>
            {/* [API] Recorre las ciudades que vienen de tu API */}
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
            {/* [API] Recorre los eventos y formatea la fecha (sin el T12:00:00 que rompía la app) */}
            {eventos.map((evento) => {
              if (!evento.fecha) return null;
              return (
                <option key={evento.fecha} value={evento.fecha}>
                  {new Date(evento.fecha).toLocaleDateString(en ? "en" : "es-CO", { day: "numeric", month: "short", timeZone: "America/Bogota" })}
                </option>
              );
            })}
          </select>
        </span>
      </label>

      {/* [LOCAL] Botón para buscar */}
      <button className="boton-home primario" type="submit">
        {en ? "Search" : "Buscar"}
      </button>
    </form>
  );
}