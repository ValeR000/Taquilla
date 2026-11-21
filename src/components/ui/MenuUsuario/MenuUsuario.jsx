/* SPRINT 2: Botón con el nombre de la persona que abre el menú de su cuenta con «Cerrar sesión»; se cierra con Escape o con un clic afuera */

import { useEffect, useId, useRef, useState } from "react";
import { crearTraductor } from "../../../utils/traductor.js";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono.jsx";
import "./MenuUsuario.css";

export default function MenuUsuario({ usuario, en, textos, onCerrarSesion, clase = "" }) {
  const tr = crearTraductor(en);
  const t = textos?.navbar?.usuario;

  const [abierto, setAbierto] = useState(false);

  const contenedorRef = useRef(null);
  const botonRef = useRef(null);
  const idLista = useId();

  useEffect(() => {
    if (!abierto) return;

    function cerrarConClic(evento) {
      if (!contenedorRef.current?.contains(evento.target)) setAbierto(false);
    }

    document.addEventListener("mousedown", cerrarConClic);
    return () => document.removeEventListener("mousedown", cerrarConClic);
  }, [abierto]);

  function manejarTecla(evento) {
    if (evento.key !== "Escape" || !abierto) return;
    evento.stopPropagation();
    setAbierto(false);
    botonRef.current?.focus();
  }

  return (
    <div ref={contenedorRef} className={`menu-usuario ${clase}`.trim()} onKeyDown={manejarTecla}>
      <Boton
        ref={botonRef}
        variante="secundario"
        clase="menu-usuario__boton"
        etiqueta={tr(t?.menu, "Menú de la cuenta de {nombre}", "Account menu for {nombre}").replace("{nombre}", usuario.nombre)}
        expandido={abierto}
        controla={idLista}
        onClick={() => setAbierto(!abierto)}
      >
        <span className="menu-usuario__nombre">{usuario.nombre}</span>
        <Icono nombre="flechaAbajo" />
      </Boton>

      <ul id={idLista} className="menu-usuario__lista" hidden={!abierto}>
        <li>
          <button type="button" className="menu-usuario__opcion" onClick={onCerrarSesion}>
            {tr(t?.cerrarSesion, "Cerrar sesión", "Log out")}
          </button>
        </li>
      </ul>
    </div>
  );
}
