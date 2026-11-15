// ##########
const enCurso = new Map();
const resultados = new Map();

async function descargar(url) {
  try {
    const respuesta = await fetch(url);
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    const datos = await respuesta.json();
    resultados.set(url, datos);
    return datos;
  } catch (error) {
    resultados.delete(url);
    throw error;
  } finally {
    enCurso.delete(url);
  }
}

export function pedirJSON(url, { forzar = false } = {}) {
  if (forzar) {
    enCurso.delete(url);
    resultados.delete(url);
  }

  if (resultados.has(url)) return Promise.resolve(resultados.get(url));
  if (enCurso.has(url)) return enCurso.get(url);

  const peticion = descargar(url);
  enCurso.set(url, peticion);
  return peticion;
}
// ##########
