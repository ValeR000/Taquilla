/* SPRINT 2: Fila de una función o localidad del detalle con su nombre, su precio si lo tiene y si está agotada o cuántas quedan */

import Etiqueta from "../Etiqueta/Etiqueta.jsx";

export default function FilaDisponibilidad({ nombre = "", precio = "", agotada = false, textoAgotada = "", textoQuedan = "" }) {
  return (
    <li className="detalle__lista-item">
      <span className="detalle__lista-nombre">{nombre}</span>
      {precio && <strong className="detalle__lista-precio">{precio}</strong>}
      {agotada ? (
        <Etiqueta>{textoAgotada}</Etiqueta>
      ) : (
        <span className="detalle__lista-disponibles">{textoQuedan}</span>
      )}
    </li>
  );
}
