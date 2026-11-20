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
}) {
  return (
    <div className={`estado-mensaje ${clase}`} role={rol}>
      <h3>{titulo}</h3>

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
