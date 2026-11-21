/* SPRINT 2: Hook que recupera la sesión con GET /sesion al cargar la app, la guarda al ingresar y la cierra con DELETE /sesion; una marca en localStorage evita pedir la sesión a quien no ha ingresado, y si hay marca y la API responde 401 la sesión venció */

import { useEffect, useState } from "react";
import { pedirConSesion } from "../services/api.js";

const API = `${import.meta.env.VITE_API_URL}/sesion`;

const MARCA = "sesionIniciada";

let comprobacion = null;

function hayMarca() {
  try {
    return localStorage.getItem(MARCA) === "1";
  } catch {
    return false;
  }
}

function guardarMarca() {
  try {
    localStorage.setItem(MARCA, "1");
  } catch {
    return;
  }
}

function quitarMarca() {
  try {
    localStorage.removeItem(MARCA);
  } catch {
    return;
  }
}

export function useSesion() {
  const [usuario, setUsuario] = useState(null);
  const [comprobando, setComprobando] = useState(hayMarca);
  const [vencida, setVencida] = useState(false);

  useEffect(() => {
    if (!hayMarca()) return;

    let vigente = true;

    if (!comprobacion) comprobacion = pedirConSesion(API);

    comprobacion
      .then((datos) => {
        if (vigente) setUsuario(datos.usuario);
      })
      .catch((error) => {
        if (error.estado !== 401) return;
        quitarMarca();
        if (vigente) setVencida(true);
      })
      .finally(() => {
        if (vigente) setComprobando(false);
      });

    return () => {
      vigente = false;
    };
  }, []);

  function iniciar(nuevoUsuario) {
    guardarMarca();
    setVencida(false);
    setUsuario(nuevoUsuario);
  }

  function cerrar() {
    quitarMarca();
    setUsuario(null);
    return pedirConSesion(API, "DELETE").catch(() => null);
  }

  return { usuario, comprobando, vencida, iniciar, cerrar };
}
