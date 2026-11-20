// RESPONSABILIDAD: Hook personalizado para obtener la lista de ciudades disponibles desde la API para el buscador.

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

// [API] Hace que la URL del endpoint se construya desde las variables de entorno.
const API = `${import.meta.env.VITE_API_URL}/ciudades`;

export function useCiudades() {
  
  // [LOCAL] Hace que se guarde la lista de ciudades que llegan de la API.
  const [ciudades, setCiudades] = useState([]);
  
  // [LOCAL] Hace que la app sepa si la petición está en curso.
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Hace que la app sepa si hubo un error en la petición.
  const [error, setError] = useState(false);

  // [LOCAL] Hace que se ejecute la petición al montar el componente.
  useEffect(() => {
    
    // [LOCAL] Bandera de seguridad para evitar actualizar el estado si el componente se desmonta.
    let vigente = true;

    // [LOCAL] Función asíncrona que realiza la petición real.
    async function cargar() {
      try {
        // [API] Hace la petición a la URL de la API usando la utilidad de caché.
        const datos = await pedirJSON(API);

        // [API] Hace que se guarden las ciudades solo si el componente sigue vigente.
        if (vigente) setCiudades(datos.datos);
        
      } catch (err) {
        // [LOCAL] Hace que se active el estado de error si la petición falla.
        if (vigente) setError(true);
      } finally {
        // [LOCAL] Hace que se apague el estado de carga pase lo que pase.
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Ejecuta la función para que la petición arranque.
    cargar();
    
    // [LOCAL] Función de limpieza: Hace que se marque el componente como no vigente al desmontarse.
    return () => {
      vigente = false;
    };
  }, []); // [LOCAL] El efecto se ejecuta una sola vez al montar.

  // [LOCAL] Devuelve los datos y estados al componente que use el hook.
  return { 
    ciudades, // [API] La lista final de ciudades.
    cargando, // [LOCAL] Para mostrar el mensaje de carga.
    error     // [LOCAL] Para mostrar la alerta.
  };
}