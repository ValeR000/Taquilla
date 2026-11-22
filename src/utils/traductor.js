// RESPONSABILIDAD: Elige el texto de la API o su respaldo en el idioma actual.
// ##########
export function crearTraductor(en) {
  return (valor, es, enTexto) => valor || (en ? enTexto : es);
}
// ##########
