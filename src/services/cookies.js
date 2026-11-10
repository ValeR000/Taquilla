// RESPONSABILIDAD: Funciones para leer, guardar y borrar las cookies consentimiento e idioma.

// [LOCAL] Hace que se devuelva el valor de la cookie, o null si no existe.
export function leerCookie(clave) {
  const nombre = `${clave}=`;
  const cookie = document.cookie
    .split("; ")
    .find((valor) => valor.startsWith(nombre));
  try {
    return cookie ? decodeURIComponent(cookie.slice(nombre.length)) : null;
  } catch {
    return null;
  }
}

// [LOCAL] Hace que la cookie se guarde por 6 meses y quede protegida si el sitio usa HTTPS.
export function guardarCookie(clave, valor) {
  document.cookie = `${clave}=${encodeURIComponent(valor)}; Path=/; Max-Age=15552000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
  if (leerCookie(clave) !== valor) throw new Error("cookie_no_guardada");
}

// [LOCAL] Hace que la cookie expire inmediatamente.
export function borrarCookie(clave) {
  document.cookie = `${clave}=; Path=/; Max-Age=0; SameSite=Lax`;
}