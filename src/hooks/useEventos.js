// RESPONSABILIDAD: Hook personalizado para obtener la lista de eventos con filtros y paginación desde la API.
import { useEffect, useState } from "react";

// [API] URL base para consultar los eventos.
const API = `${import.meta.env.VITE_API_URL}/eventos`;

export function useEventos({ categoria, ciudad, q, orden, pagina }) {
  // ==========================================
  // BLOQUE A: ESTADOS DEL HOOK
  // ==========================================
  
  // [API] Guarda los eventos que devuelve la API.
  const [eventos, setEventos] = useState([]);
  
  // [API] Guarda la metadata de paginación (total, páginas, etc.).
  const [paginacion, setPaginacion] = useState(null);
  
  // [LOCAL] Booleano para saber si la petición está en curso.
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Booleano para saber si hubo un error en la petición.
  const [error, setError] = useState(false);

  // ==========================================
  // BLOQUE B: EFECTO DE CARGA
  // ==========================================
  
  // [LOCAL] Se ejecuta cada vez que cambia alguno de los filtros.
  useEffect(() => {
    
    // [LOCAL] Permite cancelar la petición si los filtros cambian rápidamente.
    const controlador = new AbortController();
    
    // [LOCAL] Bandera para evitar actualizar el estado con datos de peticiones viejas.
    let vigente = true;

    // [LOCAL] Construye la URL dinámicamente solo con los filtros que tengan valor.
    const params = new URLSearchParams();
    Object.entries({ categoria, ciudad, q, orden, pagina }).forEach(([clave, valor]) => {
      if (valor) params.set(clave, valor);
    });

    // [LOCAL] Activa el estado de carga y limpia errores previos.
    setCargando(true);
    setError(false);

    // [LOCAL] Función asíncrona que realiza la petición.
    async function cargar() {
      try {
        // [API] Hace la petición HTTP a la API con los filtros.
        const res = await fetch(`${API}?${params}`, { signal: controlador.signal });
        if (!res.ok) throw new Error("Error al cargar eventos");

        // [API] Convierte la respuesta en un objeto JSON.
        const json = await res.json();

        // [API] Si la petición sigue vigente, guarda los eventos y la paginación.
        if (vigente) {
          setEventos(json.datos);
          setPaginacion(json.paginacion);
        }
      } catch (err) {
        // [LOCAL] Si hay un error (y no es por aborto), activa el estado de error.
        if (vigente && err.name !== "AbortError") setError(true);
      } finally {
        // [LOCAL] Apaga el estado de carga cuando termina la petición.
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Llama a la función para que inicie la petición.
    cargar();

    // [LOCAL] Función de limpieza: cancela la petición y marca como no vigente si el efecto se reinicia.
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, [categoria, ciudad, q, orden, pagina]); // [LOCAL] Dependencias del efecto.

  // ==========================================
  // BLOQUE C: LO QUE DEVUELVE EL HOOK
  // ==========================================
  
  // [LOCAL] Devuelve los datos y estados para que el componente los use.
  return { eventos, paginacion, cargando, error };
}