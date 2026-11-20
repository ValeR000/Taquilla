// ============================================================================
// ARCHIVO: formato.js
// RESPONSABILIDAD: Funciones auxiliares para dar formato a los datos de la API.
// ============================================================================

// [LOCAL] Recibe un número y lo convierte en pesos colombianos (ej. 75000 -> $ 75.000).
export function formatoDinero(valor) {
  return new Intl.NumberFormat("es-CO", { 
    style: "currency", 
    currency: "COP", 
    maximumFractionDigits: 0 
  }).format(valor).replace(/\s/g, "");
}

// [LOCAL] Formatea la fecha y hora (ej. "Sáb 14 nov · 8:00 p. m.").
export function formatoFecha(fechaISO, en = false, conHora = true) {
  if (!fechaISO) return "";

  const partes = new Intl.DateTimeFormat(en ? "en-US" : "es-CO", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "America/Bogota",
  }).formatToParts(new Date(fechaISO));

  const get = (tipo) => partes.find((p) => p.type === tipo)?.value ?? "";
  const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

  const diaSemana = cap(get("weekday"));
  const dia = get("day");
  const mes = get("month");
  const hora = `${get("hour")}:${get("minute")}`;
  const ampm = en ? get("dayPeriod").toUpperCase() : get("dayPeriod").toLowerCase();

  const fecha = en ? `${diaSemana} ${mes} ${dia}` : `${diaSemana} ${dia} ${mes}`;

  if (!conHora) return fecha;
  return `${fecha} · ${hora} ${ampm}`;
}

/* SPRINT 2: Hace que la fecha salga con el año (ej. "Sáb 14 nov 2026") y la hora sola (ej. "8:00 p. m.") */
export function formatoFechaConAnio(fechaISO, en = false) {
  if (!fechaISO) return "";

  const anio = new Intl.DateTimeFormat("en-US", { year: "numeric", timeZone: "America/Bogota" }).format(new Date(fechaISO));

  return en ? `${formatoFecha(fechaISO, true, false)}, ${anio}` : `${formatoFecha(fechaISO, false, false)} ${anio}`;
}

export function formatoHora(fechaISO, en = false) {
  if (!fechaISO) return "";

  return formatoFecha(fechaISO, en).split(" · ")[1];
}
/* SPRINT 2 */
