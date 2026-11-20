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
}) {
  const Titulo = `h${nivel}`; // Sprint 2

  return (
    <div className={`estado-mensaje ${clase}`} role={rol}>
      <Titulo>{titulo}</Titulo>{/* Sprint 2 */}

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
