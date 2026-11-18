// RESPONSABILIDAD: Sistema de caché y deduplicación de peticiones HTTP para evitar llamadas repetitivas a la API.

// [LOCAL] Hace que se guarden las peticiones que están en curso para evitar duplicados en la red.
const enCurso = new Map();

// [LOCAL] Hace que se guarden los resultados exitosos en caché para no volver a descargar la misma información.
const resultados = new Map();

// [LOCAL] Función interna que realiza la petición real a la API.
async function descargar(url) {
  try {
    // [API] Hace la petición HTTP a la URL especificada.
    const respuesta = await fetch(url);
    
    // [LOCAL] Hace que se valide si la respuesta es correcta, si no, lanza un error.
    if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
    
    // [API] Hace que se convierta la respuesta cruda en un objeto JSON.
    const datos = await respuesta.json();
    
    // [LOCAL] Hace que el resultado exitoso se guarde en el Map de caché.
    resultados.set(url, datos);
    
    return datos;
  } catch (error) {
    // [LOCAL] Hace que si hay un error, se elimine cualquier caché previa de esa URL para evitar datos corruptos.
    resultados.delete(url);
    throw error;
  } finally {
    // [LOCAL] Hace que se libere la URL del mapa de peticiones en curso (haya éxito o error).
    enCurso.delete(url);
  }
}

// [LOCAL] Función pública que se exporta para usarse en toda la app.
export function pedirJSON(url, { forzar = false } = {}) {
  // [LOCAL] Hace que si se pasa "forzar: true", se limpie la caché y el estado en curso de esa URL.
  if (forzar) {
    enCurso.delete(url);
    resultados.delete(url);
  }

  // [LOCAL] Hace que si la URL ya está en caché, devuelva el resultado inmediatamente sin hacer fetch.
  if (resultados.has(url)) return Promise.resolve(resultados.get(url));
  
  // [LOCAL] Hace que si la URL ya está siendo descargada por otra parte de la app, devuelva esa misma promesa para no duplicar la petición.
  if (enCurso.has(url)) return enCurso.get(url);

  // [LOCAL] Hace que si no está en caché ni en curso, inicie una nueva descarga.
  const peticion = descargar(url);
  
  // [LOCAL] Hace que la nueva promesa se guarde en el mapa de "en curso" mientras se completa.
  enCurso.set(url, peticion);
  
  return peticion;
}