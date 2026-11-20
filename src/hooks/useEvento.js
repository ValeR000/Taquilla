/* SPRINT 2: Hook para obtener el detalle de un evento por su slug desde la API */

import { useEffect, useState } from "react";
import { pedirJSON } from "../services/api.js";

const API = `${import.meta.env.VITE_API_URL}/eventos`;

export function useEvento(slug) {

  const [evento, setEvento] = useState(null);

  const [cargando, setCargando] = useState(true);

  const [error, setError] = useState(false);

  const [noEncontrado, setNoEncontrado] = useState(false);

  const [intento, setIntento] = useState(0);

  useEffect(() => {

    let vigente = true;

    setCargando(true);
    setError(false);
    setNoEncontrado(false);

    async function cargar() {
      try {
        const datos = await pedirJSON(`${API}/${slug}`, { forzar: intento > 0 });

        if (vigente) setEvento(datos);
      } catch (err) {
        if (!vigente) return;
        if (err.estado === 404 && err.codigo === "no_encontrado") setNoEncontrado(true);
        else setError(true);
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
    evento,
    cargando,
    error,
    noEncontrado,
    recargar: () => setIntento((valor) => valor + 1),
  };
}
