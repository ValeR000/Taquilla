// RESPONSABILIDAD: Hook para obtener los textos de la interfaz desde la API, con validación, caché en memoria y sessionStorage.

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

// [API] Hace que la URL del endpoint se construya desde las variables de entorno.
const API = `${import.meta.env.VITE_API_URL}/textos`;

// [LOCAL] Hace que se guarde una caché en memoria para evitar peticiones repetitivas a la API.
const cache = {};

/* SPRINT 2: Hace que se sepa si la página se está cerrando o recargando, porque el navegador cancela las peticiones en curso */
let saliendo = false;
window.addEventListener("pagehide", () => { saliendo = true; });
window.addEventListener("pageshow", () => { saliendo = false; });
/* SPRINT 2 */

// [LOCAL] Hace que se intente recuperar los textos guardados en el sessionStorage del navegador.
function leerGuardado(idioma) {
  try {
    const guardado = sessionStorage.getItem(`textos-${idioma}`);
    return guardado ? JSON.parse(guardado) : null;
  } catch {
    return null;
  }
}

// [LOCAL] Hace que se guarden los textos en memoria y en el sessionStorage.
function guardar(idioma, textos) {
  cache[idioma] = textos;
  try {
    sessionStorage.setItem(`textos-${idioma}`, JSON.stringify(textos));
  } catch {
    return;
  }
}

// [LOCAL] Hace que se valide que la API envió todos los textos obligatorios del navbar para evitar errores visuales.
function validarTextos(datos) {
  const textos = datos?.textos;
  const nav = textos?.navbar;
  
  // [API] Hace una lista con los textos que deben existir obligatoriamente.
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

  // [LOCAL] Hace que se lance un error controlado si al menos un texto falta o está vacío.
  if (!etiquetas.every((valor) => typeof valor === "string" && valor.trim())) {
    throw new Error("La respuesta no contiene los textos del navbar.");
  }
  
  // [API] Hace que se devuelvan los textos validados si todo está correcto.
  return textos;
}

export function useTextos(idioma) {
  
  // [API] Hace que se guarden los textos que llegan de la API, iniciando con la caché o el sessionStorage.
  const [textos, setTextos] = useState(() => cache[idioma] || leerGuardado(idioma));

  // [LOCAL] Hace que la app sepa si debe mostrar el estado de carga.
  const [cargando, setCargando] = useState(() => !textos);
  
  // [LOCAL] Hace que la app sepa si hubo un error en la petición.
  const [error, setError] = useState(false);
  
  // [LOCAL] Hace que se fuerce la recarga manual de los textos.
  const [intento, setIntento] = useState(0);

  // [LOCAL] Hace que se ejecute la petición cada vez que cambie el idioma o el intento.
  useEffect(() => {
    
    // [LOCAL] Hace que si los textos ya están en caché, se usen inmediatamente sin hacer fetch.
    if (cache[idioma]) {
      setTextos(cache[idioma]);
      setCargando(false);
      setError(false);
      return;
    }

    // [LOCAL] Hace que se busque un respaldo en el sessionStorage.
    const guardado = leerGuardado(idioma);

    // [LOCAL] Hace que se evite actualizar el estado con peticiones viejas.
    let vigente = true;
    let expirado = false;

    // [LOCAL] Hace que la petición se cancele si tarda más de 12 segundos y muestra error si no hay respaldo.
    const limite = setTimeout(() => {
      expirado = true;
      if (!vigente) return;
      if (!guardado) setError(true);
      setCargando(false);
    }, 12000);

    // [LOCAL] Hace que se active el estado de carga (solo si no hay respaldo) y se limpien errores previos.
    setCargando(!guardado);
    setError(false);
    setTextos(guardado);

    // [LOCAL] Función asíncrona que realiza la petición real.
    async function cargarTextosNavbar() {
      try {
        // [API] Hace la petición a la API incluyendo el idioma y forzando si es un reintento.
        const datos = await pedirJSON(`${API}?idioma=${idioma}`, { forzar: intento > 0 });

        // [LOCAL] Hace que se validen los datos recibidos antes de guardarlos.
        const nuevosTextos = validarTextos(datos);
        guardar(idioma, nuevosTextos);

        // [API] Hace que se guarden los textos en el estado si el efecto sigue vigente.
        if (vigente && !expirado) setTextos(nuevosTextos);

      } catch (error) {
        // [LOCAL] Hace que se active el estado de error si falla la petición y no hay datos guardados.
        if (vigente && !expirado && !guardado) {
          if (!saliendo) console.error("Error al cargar los textos:", error); // Sprint 2: no imprime la cancelación esperada al recargar o salir
          setError(true);
        }
      } finally {
        // [LOCAL] Hace que se limpie el temporizador y se apague el estado de carga al terminar.
        clearTimeout(limite);
        if (vigente && !expirado) setCargando(false);
      }
    }

    // [LOCAL] Ejecuta la función para que inicie la petición.
    cargarTextosNavbar();
    
    // [LOCAL] Función de limpieza: Hace que se marque el efecto como no vigente al desmontar o cambiar de idioma.
    return () => {
      vigente = false;
      clearTimeout(limite);
    };
  }, [idioma, intento]);

  // [LOCAL] Devuelve los datos y estados al componente que use el hook.
  return {
    textos, // [API] Hace que se expongan los textos finales.
    cargando, // [LOCAL] Hace que se exponga el estado de carga.
    error, // [LOCAL] Hace que se exponga el estado de error.
    // [LOCAL] Hace que se exponga la función para reintentar la petición.
    recargar: () => setIntento((valor) => valor + 1), 
  };
}