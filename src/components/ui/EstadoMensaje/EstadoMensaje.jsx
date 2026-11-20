import Boton from "../Boton/Boton.jsx";
import "./EstadoMensaje.css";

// ##########
export default function EstadoMensaje({
  titulo,
  texto,
  boton,
  onBoton,
  rol,
  clase = "",
  nivel = 3, // Sprint 2: nivel del título, para usar el estado como página completa con su h1
  compacto = false, // Sprint 2: variante pequeña en una fila, para errores dentro de una sección
}) {
  const Titulo = `h${nivel}`; // Sprint 2

  return (
    <div className={`estado-mensaje ${compacto ? "estado-mensaje--compacto" : ""} ${clase}`} role={rol}>{/* Sprint 2 */}
      {titulo && <Titulo>{titulo}</Titulo>}{/* Sprint 2: el título es opcional en la variante compacta */}

      {texto && <p>{texto}</p>}

      {boton && (
        <Boton clase="estado-mensaje__boton" onClick={onBoton}>
          {boton}
        </Boton>
      )}
    </div>
  );
}
// ##########
