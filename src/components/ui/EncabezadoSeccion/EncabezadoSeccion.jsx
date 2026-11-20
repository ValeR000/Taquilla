import Flecha from "../Flecha/Flecha.jsx";
import "./EncabezadoSeccion.css";

// ##########
export default function EncabezadoSeccion({
  idTitulo,
  titulo,
  descripcion,
  textoBoton,
  onBoton,
}) {
  return (
    <div className="titulo-seccion">
      <div>
        {/* [API] Hace que aparezca el título de la sección. */}
        <h2 id={idTitulo} tabIndex={-1}>{titulo}</h2>{/* Sprint 2: puede recibir el foco después de Reintentar */}

        {/* [LOCAL] Hace que aparezca la descripción*/}
        {descripcion && <p>{descripcion}</p>}
      </div>

      {/* [LOCAL] Botón para ver todos los eventos. */}
      {/* SPRINT 2: Hace que el botón solo aparezca si tiene texto, para usar el encabezado sin "Ver todos" */}
      {textoBoton && (
        <button className="enlace-home" onClick={onBoton}>
          {/* [API] Hace que aparezca el texto "Ver todos". */}
          {textoBoton}
          <Flecha />
        </button>
      )}
      {/* SPRINT 2 */}
    </div>
  );
}
// ##########
