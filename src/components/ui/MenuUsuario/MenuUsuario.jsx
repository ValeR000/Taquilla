/* SPRINT 2: Cuenta de la persona con sesión: en la web, un círculo con sus iniciales que abre el menú con «Cerrar sesión» (se cierra con Escape o con un clic afuera); en el menú móvil, una fila con iniciales, nombre y correo y el botón «Cerrar sesión» */

import { useEffect, useId, useRef, useState } from "react";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono.jsx";
import "./MenuUsuario.css";

function iniciales(usuario) {
  const palabras = (usuario.nombre || "").trim().split(/\s+/).filter(Boolean);
  if (palabras.length === 0) return (usuario.correo || "").charAt(0).toUpperCase();
  return palabras.slice(0, 2).map((palabra) => palabra.charAt(0)).join("").toUpperCase();
}

export default function MenuUsuario({ usuario, textoCerrar = "", etiquetaMenu = "", onCerrarSesion, variante = "menu" }) {
  const [abierto, setAbierto] = useState(false);

  const contenedorRef = useRef(null);
  const botonRef = useRef(null);
  const idLista = useId();

  useEffect(() => {
    if (!abierto) return;

    function cerrarConClic(evento) {
      if (!contenedorRef.current?.contains(evento.target)) setAbierto(false);
    }

    function cerrarConEscape(evento) {
      if (evento.key !== "Escape") return;
      setAbierto(false);
      botonRef.current?.focus();
    }

    document.addEventListener("mousedown", cerrarConClic);
    document.addEventListener("keydown", cerrarConEscape);
    return () => {
      document.removeEventListener("mousedown", cerrarConClic);
      document.removeEventListener("keydown", cerrarConEscape);
    };
  }, [abierto]);

  function cerrarAlSalir(evento) {
    const destino = evento.relatedTarget;
    if (destino && !contenedorRef.current?.contains(destino)) setAbierto(false);
  }

  const panel = variante === "panel";
  const textoIniciales = iniciales(usuario);

  const cuenta = (
    <div className={panel ? "menu-usuario-panel__cuenta" : "menu-usuario-panel__cuenta menu-usuario__cuenta"}>
      <span className={`menu-usuario__iniciales ${panel ? "menu-usuario__iniciales--pequenas" : "menu-usuario__iniciales--oscuras"}`} aria-hidden="true">
        {textoIniciales}
      </span>
      <div className="menu-usuario-panel__datos">
        <p className="menu-usuario-panel__nombre">{usuario.nombre}</p>
        <p className="menu-usuario-panel__correo">{usuario.correo}</p>
      </div>
    </div>
  );

  if (panel) {
    return (
      <div className="menu-usuario-panel">
        {cuenta}

        <Boton variante="contorno" onClick={onCerrarSesion}>
          {textoCerrar}
        </Boton>
      </div>
    );
  }

  return (
    <div ref={contenedorRef} className="menu-usuario" onBlur={cerrarAlSalir}>
      <button
        ref={botonRef}
        type="button"
        className="menu-usuario__iniciales menu-usuario__boton"
        aria-label={etiquetaMenu}
        aria-expanded={abierto}
        aria-controls={idLista}
        onClick={() => setAbierto((actual) => !actual)}
      >
        {textoIniciales}
      </button>

      <div id={idLista} className="menu-usuario__lista" hidden={!abierto}>
        {cuenta}

        <hr className="menu-usuario__divisor" />

        <button type="button" className="menu-usuario__opcion" onClick={onCerrarSesion}>
          <Icono nombre="salir" />
          {textoCerrar}
        </button>
      </div>
    </div>
  );
}
