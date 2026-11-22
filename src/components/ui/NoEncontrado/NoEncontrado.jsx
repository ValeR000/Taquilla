/* SPRINT 2: Página de no encontrado para las rutas que no existen, con los textos de paginas.noEncontrado */

import { useMetadatos } from "../../../hooks/useMetadatos.js";
import { crearTraductor } from "../../../utils/traductor.js";
import EstadoMensaje from "../EstadoMensaje/EstadoMensaje.jsx";
import "./NoEncontrado.css";

export default function NoEncontrado({ en, textos, onNavegar }) {
  const tr = crearTraductor(en);
  const t = textos?.paginas?.noEncontrado;

  useMetadatos(
    tr(t?.seo?.titulo, "Página no encontrada · Taquilla", "Page not found · Taquilla"),
    tr(t?.seo?.descripcion, "La página que buscas no existe o cambió de dirección.", "The page you are looking for does not exist or has moved.")
  );

  return (
    <main className="contenedor no-encontrado">
      <EstadoMensaje
        nivel={1}
        titulo={tr(t?.contenido?.titulo, "No encontramos esta página", "We couldn't find this page")}
        texto={tr(t?.contenido?.texto, "Puede que el evento ya no exista o que la dirección esté mal escrita.", "The event may no longer exist or the address may be misspelled.")}
        textoAccion={tr(t?.contenido?.botones?.volverInicio, "Volver al inicio", "Back to home")}
        onAccion={() => onNavegar("inicio")}
      />
    </main>
  );
}
