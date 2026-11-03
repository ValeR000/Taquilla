// ============================================================================
// ARCHIVO: useEventosDestacados.js
// RESPONSABILIDAD: Hook personalizado para obtener los eventos desde la API.
// ============================================================================

import { useEffect, useState } from "react";

const API = `${import.meta.env.VITE_API_URL}/eventos/destacados`;

export function useEventosDestacados() {
  // [API] Guarda los eventos que llegan de la API.
  const [eventos, setEventos] = useState([]);
  
  // [LOCAL] Hace que la app sepa si debe mostrar "Cargando...".
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Hace que la app sepa si hubo un error de red.
  const [error, setError] = useState(false);

  useEffect(() => {
    const controlador = new AbortController();
    let vigente = true;

    async function cargar() {
      try {
        // [API] Petición a la API para traer los eventos destacados.
        const res = await fetch(API, { signal: controlador.signal });
        if (!res.ok) throw new Error("Error al cargar eventos");
        
        const datos = await res.json();
        
        // [API] Guarda los eventos en el estado si el componente sigue vigente.
        if (vigente) setEventos(datos.datos); 
      } catch (err) {
        // [LOCAL] Activa el estado de error si algo falla.
        if (vigente) setError(true);
      } finally {
        // [LOCAL] Quita el estado de carga cuando termine (con éxito o error).
        if (vigente) setCargando(false);
      }
    }

    cargar();
    
    // [LOCAL] Limpieza: Cancela la petición si el usuario se va de la página.
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, []);

  return { eventos, cargando, error };
}