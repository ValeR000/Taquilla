// RESPONSABILIDAD: Hook personalizado para obtener la lista de eventos destacados desde la API.

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

// [API] Hace que la URL del endpoint se construya desde las variables de entorno.
const API = `${import.meta.env.VITE_API_URL}/eventos/destacados`;

export function useEventosDestacados() {
  
  // [API] Hace que se guarde la lista de eventos que devuelve la API.
  const [eventos, setEventos] = useState([]);
  
  // [LOCAL] Hace que la app sepa si la petición está en curso.
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Hace que la app sepa si hubo un error en la petición.
  const [error, setError] = useState(false);
  const [codigo, setCodigo] = useState(""); // Sprint 2: codigo del error que devuelve la API
  
  // [LOCAL] Hace que se fuerce la recarga manual de la petición.
  const [intento, setIntento] = useState(0);

  // [LOCAL] Hace que se ejecute la petición al iniciar el componente o al cambiar el intento.
  useEffect(() => {
    
    // [LOCAL] Hace que se evite actualizar el estado con datos de peticiones viejas.
    let vigente = true;

    // [LOCAL] Hace que se active el estado de carga y se limpien errores previos.
    setCargando(true);
    setError(false);
    setCodigo(""); // Sprint 2

    // [LOCAL] Función asíncrona que realiza la petición.
    async function cargar() {
      try {
        // [API] Hace la petición HTTP a la API usando la utilidad de caché.
        const datos = await pedirJSON(API, { forzar: intento > 0 });

        // [API] Hace que se guarden los eventos si la petición sigue vigente.
        if (vigente) setEventos(datos.datos);
      } catch (err) {
        // [LOCAL] Hace que se active el estado de error si la petición falla.
        /* SPRINT 2: Hace que se guarde también el codigo del error de la API */
        if (vigente) {
          setError(true);
          setCodigo(err.codigo || "");
        }
        /* SPRINT 2 */
      } finally {
        // [LOCAL] Hace que se apague el estado de carga al terminar la petición (éxito o error).
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Ejecuta la función para que inicie la petición.
    cargar();

    // [LOCAL] Función de limpieza: Hace que se marque el componente como no vigente al desmontarse.
    return () => {
      vigente = false;
    };
  }, [intento]); // [LOCAL] El efecto se vuelve a ejecutar si cambia el intento.

  // [LOCAL] Devuelve los datos y estados al componente que use el hook.
  return { 
    eventos, 
    cargando, 
    error, 
    codigo, // Sprint 2
    // [LOCAL] Hace que el botón de reintentar sume 1 al intento para forzar la recarga.
    recargar: () => setIntento((v) => v + 1) 
  };
}