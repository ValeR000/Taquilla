// ============================================================================
// ARCHIVO: useCategorias.js
// RESPONSABILIDAD: Hook personalizado para obtener la lista de categorías 
// y cuántos eventos tiene cada una desde la API.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================
import { useEffect, useState } from "react";

// [API] Hace que la dirección del endpoint salga de la variable de entorno.
const API = `${import.meta.env.VITE_API_URL}/categorias`;

export function useCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  // [LOCAL] Hace que cambiar este número vuelva a pedir las categorías.
  const [intento, setIntento] = useState(0);

  // [API] Hace que se pidan las categorías al cargar y en cada reintento.
  useEffect(() => {
    const controlador = new AbortController();
    let vigente = true;

    setCargando(true);
    setError(false);

    async function cargar() {
      try {
        const res = await fetch(API, { signal: controlador.signal });

        if (!res.ok) throw new Error("Error al cargar categorías");

        const datos = await res.json();

        if (vigente) setCategorias(datos.datos);
      } catch (err) {
        if (vigente) setError(true);
      } finally {
        if (vigente) setCargando(false);
      }
    }

    cargar();

    // [LOCAL] Hace que la petición se cancele si el componente se desmonta.
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, [intento]);

  return {
    categorias,
    cargando,
    error,
    // [LOCAL] Hace que el botón Reintentar vuelva a pedir las categorías.
    recargar: () => setIntento((valor) => valor + 1),
  };
}