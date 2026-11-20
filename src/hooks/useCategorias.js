// RESPONSABILIDAD: Hook personalizado para obtener la lista de categorías y la cantidad de eventos de cada una desde la API.

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

// [API] Hace que la URL del endpoint se construya desde las variables de entorno.
const API = `${import.meta.env.VITE_API_URL}/categorias`;

export function useCategorias() {
  // ==========================================
  // BLOQUE A: ESTADOS
  // ==========================================
  
  // [LOCAL] Hace que se guarde la lista de categorías que llegan de la API.
  const [categorias, setCategorias] = useState([]);
  
  // [LOCAL] Hace que la app sepa si la petición está en curso.
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Hace que la app sepa si hubo un error en la petición.
  const [error, setError] = useState(false);
  const [codigo, setCodigo] = useState(""); // Sprint 2: codigo del error que devuelve la API
  
  // [LOCAL] Hace que al incrementar este número se vuelva a pedir la información.
  const [intento, setIntento] = useState(0);

  // ==========================================
  // BLOQUE B: EFECTO DE CARGA
  // ==========================================
  
  // [LOCAL] Hace que se ejecute la petición al montar el componente o al cambiar el intento.
  useEffect(() => {
    // [LOCAL] Bandera para evitar actualizar el estado si el componente se desmonta.
    let vigente = true;

    // [LOCAL] Hace que se active el estado de carga y se limpie cualquier error previo.
    setCargando(true);
    setError(false);
    setCodigo(""); // Sprint 2

    // [LOCAL] Función asíncrona que realiza la petición.
    async function cargar() {
      try {
        // [API] Hace la petición a la API usando la utilidad de caché.
        // Si el intento es mayor a 0, fuerza la recarga ignorando la caché.
        const datos = await pedirJSON(API, { forzar: intento > 0 });

        // [API] Hace que se guarden las categorías solo si el componente sigue vigente.
        if (vigente) setCategorias(datos.datos);
      } catch (err) {
        // [LOCAL] Hace que se active el estado de error si la petición falla.
        /* SPRINT 2: Hace que se guarde también el codigo del error de la API */
        if (vigente) {
          setError(true);
          setCodigo(err.codigo || "");
        }
        /* SPRINT 2 */
      } finally {
        // [LOCAL] Hace que se apague el estado de carga pase lo que pase.
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Ejecuta la función de carga.
    cargar();

    // [LOCAL] Función de limpieza: Hace que se marque el componente como no vigente al desmontarse.
    return () => {
      vigente = false;
    };
  }, [intento]); // [LOCAL] El efecto se vuelve a ejecutar si cambia el intento.

  // ==========================================
  // BLOQUE C: LO QUE DEVUELVE EL HOOK
  // ==========================================
  
  // [LOCAL] Devuelve los estados y la función de recarga al componente que use el hook.
  return {
    categorias,
    cargando,
    error,
    codigo, // Sprint 2
    // [LOCAL] Hace que el botón "Reintentar" sume 1 al intento para disparar el efecto de nuevo.
    recargar: () => setIntento((valor) => valor + 1),
  };
}