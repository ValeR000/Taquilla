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
import { useEffect, useState } from "react"; //useState: Guarda un valor que React recuerda mientras el componente está en pantalla
//useEffect: Es código que se ejecuta después de que el componente aparece en pantalla, y otra vez cada vez que cambie algo de su lista [ ]

//useState guarda lo que llegó (los datos, si está cargando y si hubo error).
//useEffect va a buscarlo cuando el componente aparece.

//Sin useEffect no hay cuándo pedir los datos. Sin useState no hay dónde guardarlos.


//useEffect(  () => { ...código... }  ,  [ ...lista... ]  );
//          └──── 1. QUÉ hacer ────┘     └─ 2. CUÁNDO ─┘

// [API] Hace que la dirección del endpoint salga de la variable de entorno.
const API = `${import.meta.env.VITE_API_URL}/categorias`;
//crea var llamada API y tal .env y se mete el coso de la url de la var de entorno y /endpoint como en el contrato

export function useCategorias() { //se declara funcion, el export permite q otros archivos importen y entre () parametros que recibe en este caso no pero por ejemplo useEventos recibe los filtros: useEventos({ categoria, ciudad, q, orden, pagina }) (q btw tienen el mismo nombre que la api)
  const [categorias, setCategorias] = useState([]);

  //categorias: el valor actual, para leerlo.
  //setCategorias: la función para cambiarlo. Nunca se cambia con categorias = algo, siempre con setCategorias(algo), porque así React sabe que debe redibujar la pantalla.
  const [cargando, setCargando] = useState(true);

  //cargando empieza en true porque apenas aparece el componente ya va a empezar a pedir los datos.
  const [error, setError] = useState(false);
  //error empieza en false porque todavía no ha fallado nada.

  // [LOCAL] Hace que cambiar este número vuelva a pedir las categorías.
  const [intento, setIntento] = useState(0);

  // [API] Hace que se pidan las categorías al cargar y en cada reintento.
  useEffect(() => {
    const controlador = new AbortController();
    let vigente = true;

    setCargando(true);
    setError(false);

    //CONSULTAR LA API LO MISMO QUE HACE EL SEND DE POSTMAN
    async function cargar() {
      try {
        const res = await fetch(API, { signal: controlador.signal }); //fetch(API): hace la petición GET a esa URL
        //res: la respuesta completa: código de estado, cabeceras, cuerpo.

        if (!res.ok) throw new Error("Error al cargar categorías"); //res.ok: es true si el código está entre 200 y 299. ! significa “no”, así que !res.ok = “si salió mal”.

        const datos = await res.json();
        //res.json(): convierte el cuerpo de texto JSON a un objeto de JavaScript.

        if (vigente) setCategorias(datos.datos);
      } catch (err) {
        if (vigente) setError(true);
      } finally {
        if (vigente) setCargando(false);
      }
    }

    //try: intenta esto.
//catch: si algo falla, haz esto. err es el error.
//finally: haz esto siempre, salga bien o mal. Por eso ahí apagamos cargando.

    cargar();

    // [LOCAL] Hace que la petición se cancele si el componente se desmonta.
    return () => {
      vigente = false;
      controlador.abort();
    };
  }, [intento]);

  return { //Entrega los tres estados a quien use el hook. { categorias, cargando, error } es la forma corta de escribir { categorias: categorias, cargando: cargando, error: error }
    categorias,
    cargando,
    error,
    // [LOCAL] Hace que el botón Reintentar vuelva a pedir las categorías.
    recargar: () => setIntento((valor) => valor + 1),
  };
}