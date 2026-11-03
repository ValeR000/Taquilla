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

// 1. CONFIGURACIÓN
// [API] Guarda la dirección exacta (endpoint) de donde sacaremos las categorías.
// Usa la variable de entorno configurada en Vercel.
const API = `${import.meta.env.VITE_API_URL}/categorias`;

// 2. EL HOOK PERSONALIZADO
export function useCategorias() {
  
  // ==========================================
  // BLOQUE A: ESTADOS DEL HOOK
  // ==========================================
  
  // [API] Guarda las categorías que llegan de la API. Inicia como un arreglo vacío.
  const [categorias, setCategorias] = useState([]);
  
  // [LOCAL] Booleano. Hace que la app sepa si debe mostrar un mensaje de "Cargando...".
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Booleano. Hace que la app sepa si hubo un error de red o de la API.
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
        // Le pasamos el "signal" para que se pueda cancelar.
        const res = await fetch(API, { signal: controlador.signal });
        
        // [LOCAL] Revisa si la API respondió con un error (ej. 404 o 500). Si es así, frena todo.
        if (!res.ok) throw new Error("Error al cargar categorías");
        
        // [API] Convierte la respuesta de internet en un objeto de JavaScript (JSON).
        const datos = await res.json();
        
        // [API] Si todo salió bien y el efecto sigue vigente, guarda las categorías en el estado.
        // La API devuelve la lista dentro de la propiedad "datos".
        if (vigente) setCategorias(datos.datos);
        
      } catch (err) {
        // [LOCAL] Si hubo un error (falló la red), activa el estado de error.
        if (vigente) setError(true);
      } finally {
        // [LOCAL] Pase lo que pase (éxito o error), apaga el estado de "Cargando".
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Llama a la función para que la petición arranque.
    cargar();
    
    // [LOCAL] FUNCIÓN DE LIMPIEZA: Se ejecuta si el usuario cambia de página o el componente se destruye.
    // Hace que se cancele la petición y se marque como "vieja".
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, []); // El arreglo vacío [] significa "ejecuta esto solo una vez al inicio".

  // ==========================================
  // BLOQUE C: LO QUE DEVUELVE EL HOOK
  // ==========================================
  // [LOCAL] Devuelve los datos y los estados para que App.jsx los use.
  return { 
    categorias, // [API] La lista final de categorías.
    cargando,   // [LOCAL] Para mostrar el spinner o mensaje.
    error       // [LOCAL] Para mostrar la alerta.
  };
}