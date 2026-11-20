/* SPRINT 2: Hook que maneja el foco al pulsar Reintentar: mientras recarga y si carga bien va al título; si vuelve a fallar, al botón */

import { useLayoutEffect, useState } from "react";

export function useReintento(cargando, error, recargar, idTitulo, idEspera = idTitulo) {

  const [fase, setFase] = useState("");

  useLayoutEffect(() => {
    if (fase === "pedido" && cargando) {
      document.getElementById(idEspera)?.focus();
      setFase("cargando");
    }

    if (fase === "cargando" && !cargando) {
      if (!error) document.getElementById(idTitulo)?.focus();
      setFase("");
    }
  }, [fase, cargando, error, idTitulo, idEspera]);

  function reintentar() {
    setFase("pedido");
    recargar();
  }

  return {
    reintentar,
    enfocarBoton: fase === "cargando",
  };
}
