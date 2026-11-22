/* SPRINT 2: Textos del estado de error: el mensaje sale de textos.errores según el codigo de la API, con estados.error de respaldo */
import { crearTraductor } from "./traductor.js";

export function textosError(textos, codigo, en) {
  const tr = crearTraductor(en);
  const error = textos?.estados?.error;

  return {
    titulo: tr(error?.titulo, "Algo salió mal", "Something went wrong"),
    texto: textos?.errores?.[codigo] || tr(error?.texto, "Revisa tu conexión e inténtalo de nuevo.", "Check your connection and try again."),
    textoAccion: tr(error?.botones?.reintentar, "Reintentar", "Try again"),
  };
}
