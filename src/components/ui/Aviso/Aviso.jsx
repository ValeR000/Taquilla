/* SPRINT 2: Mensaje de estado dentro de un formulario, con ícono, título y texto */

import Icono from "../Icono.jsx";
import "./Aviso.css";

export default function Aviso({ tipo = "error", titulo, texto, textoLector, clase = "" }) {
  return (
    <div className={`aviso aviso--${tipo} ${clase}`.trim()} role={tipo === "error" ? "alert" : "status"}>
      <span className="aviso__icono">
        <Icono nombre="alerta" />
      </span>

      <div className="aviso__contenido">
        <p className="aviso__titulo">{titulo}</p>
        <p className="aviso__texto" aria-hidden={textoLector ? true : undefined}>{texto}</p>
        {textoLector && <p className="solo-lectores">{textoLector}</p>}
      </div>
    </div>
  );
}
