/* SPRINT 2: Hook que pone el título y la descripción de la página mientras la vista está abierta y los restaura al salir */

import { useEffect } from "react";

export function useMetadatos(titulo, descripcion) {

  useEffect(() => {
    if (!titulo) return;

    let meta = document.querySelector('meta[name="description"]');
    const metaNueva = !meta;
    if (metaNueva) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }

    const tituloAnterior = document.title;
    const descripcionAnterior = meta.content;

    document.title = titulo;
    meta.content = descripcion;

    return () => {
      document.title = tituloAnterior;
      if (metaNueva) meta.remove();
      else meta.content = descripcionAnterior;
    };
  }, [titulo, descripcion]);
}
