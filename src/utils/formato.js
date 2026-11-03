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
  }).format(valor);
}

// [LOCAL] Formatea la fecha ISO de la API al estilo "Sáb 14 nov · 8:00 p. m." en zona horaria de Bogotá.
export function formatoFecha(fechaISO) {
  if (!fechaISO) return "";
  const fecha = new Date(fechaISO);
  
  // Formateamos por partes para tener control total del string final.
  const partes = new Intl.DateTimeFormat('es-CO', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Bogota'
  }).formatToParts(fecha);

  // Construimos el string manualmente para lograr el formato exacto de Figma.
  const diaSemana = partes.find(p => p.type === 'weekday').value;
  const dia = partes.find(p => p.type === 'day').value;
  const mes = partes.find(p => p.type === 'month').value;
  const hora = partes.find(p => p.type === 'hour').value;
  const minuto = partes.find(p => p.type === 'minute').value;
  const ampm = partes.find(p => p.type === 'dayPeriod').value.replace('.', '').toLowerCase();

  // Capitalizamos la primera letra del día de la semana.
  const diaSemanaCapitalizado = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);

  return `${diaSemanaCapitalizado} ${dia} ${mes} · ${hora}:${minuto} ${ampm}`;
}