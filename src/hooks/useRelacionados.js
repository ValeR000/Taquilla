/* SPRINT 2: Hook para obtener hasta 4 eventos relacionados con un evento desde la API */

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

const API = `${import.meta.env.VITE_API_URL}/eventos`;

const MAXIMO = 4;

export function useRelacionados(slug) {

  const [relacionados, setRelacionados] = useState([]);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState(false);
  const [codigo, setCodigo] = useState("");

  const [intento, setIntento] = useState(0);

  useEffect(() => {

    if (!slug) return;

    let vigente = true;

    setCargando(true);
    setError(false);
    setCodigo("");

    async function cargar() {
      try {
        const datos = await pedirJSON(`${API}/${slug}/relacionados`, { forzar: intento > 0 });

        if (vigente) setRelacionados(datos.datos.slice(0, MAXIMO));
      } catch (err) {
        if (vigente) {
          setError(true);
          setCodigo(err.codigo || "");
        }
      } finally {
        if (vigente) setCargando(false);
      }
    }

    cargar();

    return () => {
      vigente = false;
    };
  }, [slug, intento]);

  return {
    relacionados,
    cargando,
    error,
    codigo,
    recargar: () => setIntento((valor) => valor + 1),
  };
}
