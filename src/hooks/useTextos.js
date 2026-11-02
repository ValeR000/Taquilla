// ============================================================================
// ARCHIVO: useTextos.js
// RESPONSABILIDAD: Este es un Hook personalizado. Su único trabajo es ir a la API, 
// pedir los textos según el idioma, manejar si está cargando o si hay error, y 
// devolverle todo eso al componente App.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

import { useEffect, useState } from "react";

// 1. CONFIGURACIÓN Y VALIDACIÓN
// [API] Guarda la dirección exacta (endpoint) de donde sacaremos los textos.
const API = `${import.meta.env.VITE_API_URL}/textos`; //PARA SUBIRLO A VERCEL CON LO DE .ENV

// [LOCAL] Esta función revisa que la API no nos haya enviado datos vacíos o rotos.
// Hace que la app explote de forma controlada si falta un texto importante, en vez de mostrar la pantalla en blanco.
function validarTextos(datos) {
  const textos = datos?.textos;
  const nav = textos?.navbar;
  // [API] Hace una lista con todos los textos que necesitamos que existan obligatoriamente.
  const etiquetas = [
    nav?.logo?.texto,
    nav?.logo?.aria,
    nav?.enlaces?.inicio,
    nav?.enlaces?.explorar,
    nav?.buscador?.placeholder,
    nav?.buscador?.aria,
    nav?.botones?.ingresar,
    nav?.botones?.crearCuenta,
    nav?.aria?.idioma,
  ];

  // [LOCAL] Revisa la lista. Si al menos un texto falta o está vacío, lanza un error.
  if (!etiquetas.every((valor) => typeof valor === "string" && valor.trim())) {
    throw new Error("La respuesta no contiene los textos del navbar.");
  }
  // [API] Si todo está bien, devuelve los textos listos para usarse.
  return textos;
}

// 2. EL HOOK PERSONALIZADO
// [LOCAL] Recibe el "idioma" desde App.jsx para saber en qué idioma pedir los textos.
export function useTextos(idioma) {
  
  // ==========================================
  // BLOQUE A: ESTADOS DEL HOOK
  // ==========================================
  
  // [API] Guarda los textos que llegan de la API. Inicia en null (nada) porque aún no hemos ido a buscarlos.
  const [textos, setTextos] = useState(null);
  
  // [LOCAL] Booleano. Hace que la app sepa si debe mostrar un mensaje de "Cargando...".
  const [cargando, setCargando] = useState(true);
  
  // [LOCAL] Booleano. Hace que la app sepa si hubo un error de red o de la API.
  const [error, setError] = useState(false);
  
  // [LOCAL] Número. Sirve para forzar a React a volver a intentar la petición si el usuario hace clic en "Reintentar".
  const [intento, setIntento] = useState(0);

  // ==========================================
  // BLOQUE B: EFECTO DE CARGA (La petición HTTP)
  // ==========================================
  
  // [LOCAL] Se ejecuta automáticamente al iniciar o cada vez que "idioma" o "intento" cambien.
  useEffect(() => {
    
    // [LOCAL] Crea un "AbortController". Sirve para cancelar la petición si se demora demasiado o si el usuario cambia de página.
    const controlador = new AbortController();
    
    // [LOCAL] Un temporizador. Hace que la petición se cancele sola después de 12 segundos (12000 ms) para no dejarla colgada.
    const limite = setTimeout(() => controlador.abort(), 12000);
    
    // [LOCAL] Bandera de seguridad. Hace que React sepa si este efecto sigue "vivo" o si ya fue reemplazado.
    let vigente = true;
    
    // [LOCAL] Hace que la pantalla muestre "Cargando..." y limpie errores anteriores.
    setCargando(true);
    setError(false);
    setTextos(null);

    // [LOCAL] Función asíncrona que hace la petición real.
    async function cargarTextosNavbar() {
      try {
        // [API] Hace la petición a la URL de la API, agregando el idioma al final (ej. ?idioma=en).
        // Le pasamos el "signal" para que se pueda cancelar con el AbortController.
        const respuesta = await fetch(`${API}?idioma=${idioma}`, {
          signal: controlador.signal,
        });
        
        // [LOCAL] Revisa si la API respondió con un error (ej. 404 o 500). Si es así, frena todo.
        if (!respuesta.ok) throw new Error(`HTTP ${respuesta.status}`);
        
        // [API] Convierte la respuesta cruda de internet en un objeto de JavaScript (JSON).
        const datos = await respuesta.json();
        
        // [LOCAL] Llama a nuestra función de validación para asegurar que los datos sirven.
        const nuevosTextos = validarTextos(datos);
        
        // [LOCAL] Si todo salió bien y el efecto sigue vigente, guarda los textos en el estado.
        if (vigente) setTextos(nuevosTextos);
        
      } catch (error) {
        // [LOCAL] Si hubo un error (falló la red o la validación), avisa en consola y activa el estado de error.
        if (vigente) {
          console.error("Error al cargar los textos:", error);
          setError(true);
        }
      } finally {
        // [LOCAL] Pase lo que pase (éxito o error), limpia el temporizador y apaga el estado de "Cargando".
        clearTimeout(limite);
        if (vigente) setCargando(false);
      }
    }

    // [LOCAL] Llama a la función para que la petición arranque.
    cargarTextosNavbar();
    
    // [LOCAL] FUNCIÓN DE LIMPIEZA: Se ejecuta si el usuario cierra la app o cambia de idioma muy rápido.
    // Hace que se cancele la petición anterior, se limpie el temporizador y se marque esta petición como "vieja".
    return () => {
      vigente = false;
      clearTimeout(limite);
      controlador.abort();
    };
  }, [idioma, intento]); // [LOCAL] El efecto se reinicia si el idioma cambia o si se pide un reintento.

  // ==========================================
  // BLOQUE C: LO QUE DEVUELVE EL HOOK
  // ==========================================
  // [LOCAL] Devuelve un objeto con todos los datos y funciones para que App.jsx los use.
  return {
    textos, // [API] Los datos finales.
    cargando, // [LOCAL] Para mostrar el spinner.
    error, // [LOCAL] Para mostrar la alerta.
    recargar: () => setIntento((valor) => valor + 1), // [LOCAL] Función que suma 1 al intento y dispara el useEffect de nuevo.
  };
}