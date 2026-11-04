// ============================================================================
// ARCHIVO: useCiudades.js
// RESPONSABILIDAD: Hook personalizado para obtener la lista de ciudades 
// disponibles desde la API para el buscador.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

import { useEffect, useState } from "react";

// 1. CONFIGURACIÓN
// [API] Guarda la dirección exacta (endpoint) de donde sacaremos las ciudades.
const API = `${import.meta.env.VITE_API_URL}/ciudades`;

// 2. EL HOOK PERSONALIZADO
export function useCiudades() {
  
  // ==========================================
  // BLOQUE A: ESTADOS DEL HOOK
  // ==========================================
  
  // [API] Guarda las ciudades que llegan de la API. Inicia como un arreglo vacío.
  const [ciudades, setCiudades] = useState([]);
  
  // [LOCAL] Booleano. Hace que la app sepa si debe mostrar un mensaje de "Cargando...".
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Booleano. Hace que la app sepa si hubo un error de red.
  const [error, setError] = useState(false);

  // ==========================================
  // BLOQUE B: EFECTO DE CARGA
  // ==========================================
  
  // [LOCAL] Se ejecuta automáticamente al iniciar el componente.
  useEffect(() => {
    
    // [LOCAL] Crea un "AbortController". Sirve para cancelar la petición si el usuario se va de la página.
    const controlador = new AbortController();
    
    // [LOCAL] Bandera de seguridad. Hace que React sepa si este efecto sigue "vivo".
    let vigente = true;

    // [LOCAL] Función asíncrona que hace la petición real.
    async function cargar() {
      try {
        // [API] Hace la petición a la URL de la API.
        const res = await fetch(API, { signal: controlador.signal });
        
        // [LOCAL] Revisa si la API respondió con un error.
        if (!res.ok) throw new Error("Error al cargar ciudades");
        
        // [API] Convierte la respuesta en un objeto de JavaScript (JSON).
        const datos = await res.json();
        
        // [API] Si todo salió bien, guarda las ciudades en el estado.
        if (vigente) setCiudades(datos.datos);
        
      } catch (err) {
        // [LOCAL] Si hubo un error, activa el estado de error.
        if (vigente) setError(true);
      } finally {
        // [LOCAL] Pase lo que pase, apaga el estado de "Cargando".
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Llama a la función para que la petición arranque.
    cargar();
    
    // [LOCAL] FUNCIÓN DE LIMPIEZA: Cancela la petición si el componente se destruye.
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, []); 

  // ==========================================
  // BLOQUE C: LO QUE DEVUELVE EL HOOK
  // ==========================================
  // [LOCAL] Devuelve los datos y los estados para que App.jsx los use.
  return { 
    ciudades, // [API] La lista final de ciudades.
    cargando, // [LOCAL] Para mostrar el spinner o mensaje.
    error     // [LOCAL] Para mostrar la alerta.
  };
}