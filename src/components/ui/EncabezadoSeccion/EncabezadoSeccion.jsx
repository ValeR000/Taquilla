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
        <h2 id={idTitulo}>{titulo}</h2>

        {/* [LOCAL] Hace que aparezca la descripción*/}
        {descripcion && <p>{descripcion}</p>}
      </div>

      {/* [LOCAL] Botón para ver todos los eventos. */}
      <button className="enlace-home" onClick={onBoton}>
        {/* [API] Hace que aparezca el texto "Ver todos". */}
        {textoBoton}
        <Flecha />
      </button>
    </div>
  );
}
// ##########
