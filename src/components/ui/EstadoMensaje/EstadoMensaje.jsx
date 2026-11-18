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
        <button type="button" className="estado-mensaje__boton" onClick={onBoton}>
          {boton}
        </button>
      )}
    </div>
  );
}
// ##########
