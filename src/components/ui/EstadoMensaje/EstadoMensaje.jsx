// RESPONSABILIDAD: Estado de carga, vacío o error con título, texto y un botón de acción.
import { useEffect, useRef } from "react"; // Sprint 2
import Boton from "../Boton/Boton.jsx";
import "./EstadoMensaje.css";

// ##########
export default function EstadoMensaje({
  /* SPRINT 2: Valores por defecto y acción con textoAccion, onAccion y deshabilitada */
  titulo = "",
  texto = "",
  textoAccion = "",
  onAccion,
  deshabilitada = false,
  /* SPRINT 2 */
  rol,
  clase = "",
  nivel = 3, // Sprint 2: nivel del título, para usar el estado como página completa con su h1
  compacto = false, // Sprint 2: variante pequeña en una fila, para errores dentro de una sección
  enfocarBoton = false, // Sprint 2: pone el foco en el botón al aparecer (cuando Reintentar vuelve a fallar)
}) {
  const Titulo = `h${nivel}`; // Sprint 2

  /* SPRINT 2: Hace que el foco vaya al botón si el estado aparece después de un Reintentar que volvió a fallar */
  const raizRef = useRef(null);

  useEffect(() => {
    if (enfocarBoton) raizRef.current?.querySelector("button")?.focus();
  }, [enfocarBoton]);
  /* SPRINT 2 */

  return (
    <div ref={raizRef} className={`estado-mensaje ${compacto ? "estado-mensaje--compacto" : ""} ${clase}`} role={rol}>{/* Sprint 2 */}
      {titulo && <Titulo>{titulo}</Titulo>}{/* Sprint 2: el título es opcional en la variante compacta */}

      {texto && <p>{texto}</p>}

      {/* SPRINT 2: Hace que el botón use textoAccion, onAccion y deshabilitada */}
      {textoAccion && (
        <Boton clase="estado-mensaje__boton" onClick={onAccion} disabled={deshabilitada}>
          {textoAccion}
        </Boton>
      )}
      {/* SPRINT 2 */}
    </div>
  );
}
// ##########
