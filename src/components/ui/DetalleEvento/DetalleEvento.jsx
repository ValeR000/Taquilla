/* SPRINT 2: Vista de detalle de un evento en /eventos/{slug} con sus eventos relacionados */

import { useEvento } from "../../../hooks/useEvento.js";
import { useRelacionados } from "../../../hooks/useRelacionados.js";
import EstadoMensaje from "../EstadoMensaje/EstadoMensaje.jsx";
import { crearTraductor } from "../../../utils/traductor.js";

export default function DetalleEvento({
  slug,
  en,
  textos,
  onAbrir,
}) {
  const tr = crearTraductor(en);
  const t = textos?.paginas?.detalleEvento;
  const tEstado = textos?.estados;

  const { evento, cargando, error, noEncontrado, recargar } = useEvento(slug);
  const { relacionados, recargar: recargarRelacionados } = useRelacionados(evento?.slug === slug ? slug : "");

  function reintentar() {
    recargar();
    recargarRelacionados();
  }

  if (cargando) {
    return (
      <main className="contenedor">
        <p role="status">{tr(tEstado?.cargando?.titulo, "Cargando…", "Loading…")}</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="contenedor">
        <EstadoMensaje
          rol="alert"
          titulo={tr(tEstado?.error?.titulo, "Algo salió mal", "Something went wrong")}
          texto={tr(tEstado?.error?.texto, "Revisa tu conexión e inténtalo de nuevo.", "Check your connection and try again.")}
          boton={tr(tEstado?.error?.botones?.reintentar, "Reintentar", "Retry")}
          onBoton={reintentar}
        />
      </main>
    );
  }

  if (noEncontrado) {
    return (
      <main className="contenedor">
        <h1>{tr(t?.noEncontrado?.titulo, "No encontramos este evento", "We couldn't find this event")}</h1>
      </main>
    );
  }

  return (
    <main className="contenedor">
      <h1>{evento?.titulo}</h1>

      <ul>
        {relacionados.map((relacionado) => (
          <li key={relacionado.id}>
            <a
              href={`/eventos/${relacionado.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onAbrir(relacionado);
              }}
            >
              {relacionado.titulo}
            </a>
          </li>
        ))}
      </ul>
    </main>
  );
}
