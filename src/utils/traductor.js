// ##########
export function crearTraductor(en) {
  return (valor, es, enTexto) => valor || (en ? enTexto : es);
}
// ##########
