// RESPONSABILIDAD: Encabezado de sección con título, descripción y un botón de acción opcional.
import Flecha from "../Flecha/Flecha.jsx";
import "./EncabezadoSeccion.css";

// ##########
export default function EncabezadoSeccion({
  idTitulo,
  /* SPRINT 2: Valores por defecto y acción con textoAccion, onAccion y deshabilitada */
  titulo = "",
  descripcion = "",
  textoAccion = "",
  onAccion,
  deshabilitada = false,
  /* SPRINT 2 */
}) {
  return (
    <div className="titulo-seccion">
      <div>
        {/* [API] Hace que aparezca el título de la sección. */}
        <h2 id={idTitulo} tabIndex={-1}>{titulo}</h2>{/* Sprint 2: puede recibir el foco después de Reintentar */}

        {/* [LOCAL] Hace que aparezca la descripción*/}
        {descripcion && <p>{descripcion}</p>}
      </div>

      {/* [LOCAL] Botón de la acción del encabezado (textoAccion). */}
      {/* SPRINT 2: Hace que el botón solo aparezca si tiene texto, para usar el encabezado sin "Ver todos" */}
      {textoAccion && (
        <button className="enlace-home" onClick={onAccion} disabled={deshabilitada}>
          {/* [API] Hace que aparezca el texto de la acción (textoAccion). */}
          {textoAccion}
          <Flecha />
        </button>
      )}
      {/* SPRINT 2 */}
    </div>
  );
}
// ##########
