// RESPONSABILIDAD: Hook personalizado para obtener la lista de eventos destacados desde la API.
import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

// [API] URL base para consultar los eventos destacados.
const API = `${import.meta.env.VITE_API_URL}/eventos/destacados`;

export function useEventosDestacados() {
  // ==========================================
  // BLOQUE A: ESTADOS DEL HOOK
  // ==========================================
  
  // [API] Guarda la lista de eventos que devuelve la API.
  const [eventos, setEventos] = useState([]);
  
  // [LOCAL] Booleano para saber si la petición está en curso.
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Booleano para saber si hubo un error en la petición.
  const [error, setError] = useState(false);
  
  // [LOCAL] Número de intento para forzar la recarga manual de la petición.
  const [intento, setIntento] = useState(0);

  // ==========================================
  // BLOQUE B: EFECTO DE CARGA
  // ==========================================
  
  // [LOCAL] Se ejecuta al iniciar el componente o cuando cambia el número de intento.
  useEffect(() => {
    
    // [LOCAL] Bandera para evitar actualizar el estado con datos de peticiones viejas.
    let vigente = true;

    // [LOCAL] Activa el estado de carga y limpia errores previos.
    setCargando(true);
    setError(false);

    // [LOCAL] Función asíncrona que realiza la petición.
    async function cargar() {
      try {
        // [API] Hace la petición HTTP a la API pasando la señal de cancelación.
        const datos = await pedirJSON(API, { forzar: intento > 0 });

        // [API] Guarda los eventos en el estado si la petición sigue vigente.
        if (vigente) setEventos(datos.datos);
      } catch (err) {
        // [LOCAL] Activa el estado de error si la petición falla.
        if (vigente) setError(true);
      } finally {
        // [LOCAL] Apaga el estado de carga cuando termina la petición (éxito o error).
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Ejecuta la función de carga.
    cargar();

    // [LOCAL] Función de limpieza: cancela la petición y marca como no vigente.
    return () => {
      vigente = false;
    };
  }, [intento]); // [LOCAL] Dependencia del efecto: se vuelve a ejecutar si cambia el intento.

  // ==========================================
  // BLOQUE C: LO QUE DEVUELVE EL HOOK
  // ==========================================
  
  // [LOCAL] Devuelve los datos, estados y la función para recargar.
  return { 
    eventos, 
    cargando, 
    error, 
    // [LOCAL] Incrementa el intento para disparar el efecto de carga de nuevo.
    recargar: () => setIntento((v) => v + 1) 
  };
}