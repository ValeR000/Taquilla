/* SPRINT 2: Nombre de una categoría tal como lo trae la API a partir de su id, o el id si la categoría no está en la lista */

export function nombreCategoria(categorias, id) {
  return categorias.find((categoria) => categoria.id === id)?.nombre || id;
}
