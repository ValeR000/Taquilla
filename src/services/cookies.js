// ============================================================================
// ARCHIVO: cookies.js
// RESPONSABILIDAD: Funciones de utilidad para leer, guardar y borrar cookies.
// 
// CONVENCIÓN: Todos los datos aquí son [LOCAL] (lógica de React).
// ============================================================================

// [LOCAL] Prefijo fijo para evitar choques con cookies de otros proyectos.
const PREFIJO = "taquilla_";

// [LOCAL] Arma el nombre completo de la cookie.
const obtenerNombre = (clave) => `${PREFIJO}${clave}`;

// [LOCAL] Busca la cookie en el navegador. Hace que devuelva su valor o null si no existe.
export function leerCookie(clave) {
  const nombreCompleto = `${obtenerNombre(clave)}=`;
  const cookie = document.cookie
    .split("; ")
    .find((valor) => valor.startsWith(nombreCompleto));
  try {
    return cookie ? decodeURIComponent(cookie.slice(nombreCompleto.length)) : null;
  } catch {
    return null;
  }
}

// [LOCAL] Guarda la cookie. Hace que dure 6 meses y la protege si el sitio usa HTTPS.
export function guardarCookie(clave, valor) {
  document.cookie = `${obtenerNombre(clave)}=${encodeURIComponent(valor)}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  if (leerCookie(clave) !== valor) throw new Error("cookie_no_guardada");
}

// [LOCAL] Borra la cookie. Hace que expire inmediatamente.
export function borrarCookie(clave) {
  document.cookie = `${obtenerNombre(clave)}=; Path=/; Max-Age=0; SameSite=Lax`;
}