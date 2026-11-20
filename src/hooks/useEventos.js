// RESPONSABILIDAD: Hook para obtener la lista de eventos con filtros y paginación desde la API.

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

// [API] Hace que la URL del endpoint se construya desde las variables de entorno.
const API = `${import.meta.env.VITE_API_URL}/eventos`;

// [STATIC] Hace que se definan la cantidad de eventos que se mostrarán por página.
const POR_PAGINA = 9;

export function useEventos({
  categoria,    // [API] Filtro por categoría.
  ciudad,       // [API] Filtro por ciudad.
  q,            // [API] Texto de búsqueda.
  orden,        // [API] Orden de los resultados (fecha, precio, popularidad).
  pagina,       // [API] Número de página actual.
}) {
  
  // [API] Hace que se guarden los eventos que devuelve la API.
  const [eventos, setEventos] = useState([]);
  
  // [API] Hace que se guarde la metadata de paginación (total, páginas, etc.).
  const [paginacion, setPaginacion] = useState(null);
  
  // [LOCAL] Hace que la app sepa si la petición está en curso.
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Hace que la app sepa si hubo un error en la petición.
  const [error, setError] = useState(false);
  const [codigo, setCodigo] = useState(""); // Sprint 2: codigo del error que devuelve la API
  
  // [LOCAL] Hace que se fuerce la recarga manual de la petición.
  const [intento, setIntento] = useState(0);

  // [LOCAL] Hace que se ejecute la petición cada vez que cambia un filtro o el intento.
  useEffect(() => {
    
    // [LOCAL] Hace que se evite actualizar el estado con datos de peticiones viejas.
    let vigente = true;

    // [API] Hace que se construyan los parámetros de la URL, incluyendo siempre el límite por página.
    const params = new URLSearchParams({ porPagina: POR_PAGINA });
    Object.entries({ categoria, ciudad, q, orden, pagina }).forEach(([clave, valor]) => {
      if (valor) params.set(clave, valor);
    });

    // [LOCAL] Hace que se active el estado de carga y se limpien errores previos.
    setCargando(true);
    setError(false);
    setCodigo(""); // Sprint 2

    // [LOCAL] Función asíncrona que realiza la petición.
    async function cargar() {
      try {
        // [API] Hace la petición HTTP a la API con los filtros aplicados.
        const json = await pedirJSON(`${API}?${params}`, { forzar: intento > 0 });

        // [API] Hace que se guarden los eventos y la paginación si el efecto sigue vigente.
        if (vigente) {
          setEventos(json.datos);
          setPaginacion(json.paginacion);
        }
      } catch (err) {
        // [LOCAL] Hace que se active el estado de error si la petición falla.
        /* SPRINT 2: Hace que se guarde también el codigo del error de la API */
        if (vigente) {
          setError(true);
          setCodigo(err.codigo || "");
        }
        /* SPRINT 2 */
      } finally {
        // [LOCAL] Hace que se apague el estado de carga al terminar la petición.
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Ejecuta la función para que inicie la petición.
    cargar();

    // [LOCAL] Función de limpieza: Hace que se marque el componente como no vigente al desmontarse.
    return () => {
      vigente = false;
    };
  }, [categoria, ciudad, q, orden, pagina, intento]); // [LOCAL] Dependencias del efecto.

  // [LOCAL] Devuelve los datos y estados al componente que use el hook.
  return {
    eventos,
    paginacion,
    cargando,
    error,
    codigo, // Sprint 2
    // [LOCAL] Hace que el botón de reintentar sume 1 al intento para forzar la recarga.
    recargar: () => setIntento((valor) => valor + 1),
  };
}