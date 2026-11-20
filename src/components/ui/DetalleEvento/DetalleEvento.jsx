/* SPRINT 2: Vista de detalle de un evento en /eventos/{slug} con sus eventos relacionados */

import { useEffect, useState } from "react";
import { useEvento } from "../../../hooks/useEvento.js";
import { useRelacionados } from "../../../hooks/useRelacionados.js";
import AficheEvento from "../AficheEvento/AficheEvento.jsx";
import DetalleEsqueleto from "./DetalleEsqueleto.jsx";
import EncabezadoSeccion from "../EncabezadoSeccion/EncabezadoSeccion.jsx";
import EstadoMensaje from "../EstadoMensaje/EstadoMensaje.jsx";
import Etiqueta from "../Etiqueta/Etiqueta.jsx";
import Icono from "../Icono.jsx";
import IconoEvento from "../IconoEvento/IconoEvento.jsx";
import TarjetaEvento from "../TarjetaEvento/TarjetaEvento.jsx";
import { formatoDinero, formatoFecha, formatoFechaConAnio, formatoHora } from "../../../utils/formato.js";
import { textosLocales } from "../../../utils/textosLocales.js";
import { crearTraductor } from "../../../utils/traductor.js";
import { textosError } from "../../../utils/textosError.js";
import "./DetalleEvento.css";

export default function DetalleEvento({
  slug,
  en,
  textos,
  categorias = [],
  onAbrir,
  onNavegar,
}) {
  const tr = crearTraductor(en);
  const t = textos?.paginas?.detalleEvento;
  const tEstado = textos?.estados;
  const tGeneral = textos?.general;
  const tMigas = textos?.componentes?.migas;
  const tDisponibilidad = textos?.componentes?.etiquetas?.disponibilidad;
  const local = textosLocales[en ? "en" : "es"];

  const { evento, cargando, error, codigo, noEncontrado, recargar } = useEvento(slug);
  const { relacionados, cargando: cargandoRelacionados, error: errorRelacionados, codigo: codigoRelacionados, recargar: recargarRelacionados } = useRelacionados(evento?.slug === slug ? slug : "");

  const mensajeRelacionados = textosError(textos, codigoRelacionados, en);

  const [pestana, setPestana] = useState("descripcion");
  const [expandida, setExpandida] = useState(false);

  const puedeCompartir = Boolean(navigator.share);

  const eventoListo = evento?.slug === slug && !cargando && !error ? evento : null;

  const tNoEncontrado = textos?.paginas?.noEncontrado?.seo;

  const tituloPagina = eventoListo
    ? tr(t?.seo?.titulo, "{titulo} · Taquilla", "{titulo} · Taquilla").replace("{titulo}", eventoListo.titulo)
    : noEncontrado
      ? tr(tNoEncontrado?.titulo, "Página no encontrada · Taquilla", "Page not found · Taquilla")
      : "";

  const descripcionPagina = eventoListo
    ? eventoListo.descripcion || tr(t?.seo?.descripcion, "Fecha, lugar, precios y detalles del evento.", "Date, venue, prices and event details.")
    : noEncontrado
      ? tr(tNoEncontrado?.descripcion, "La página que buscas no existe o cambió de dirección.", "The page you are looking for does not exist or has moved.")
      : "";

  useEffect(() => {
    if (!tituloPagina) return;

    let meta = document.querySelector('meta[name="description"]');
    const metaNueva = !meta;
    if (metaNueva) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.append(meta);
    }

    const tituloAnterior = document.title;
    const descripcionAnterior = meta.content;

    document.title = tituloPagina;
    meta.content = descripcionPagina;

    return () => {
      document.title = tituloAnterior;
      if (metaNueva) meta.remove();
      else meta.content = descripcionAnterior;
    };
  }, [tituloPagina, descripcionPagina]);

  function nombreCategoria(id) {
    return categorias.find((c) => c.id === id)?.nombre || id;
  }

  function quedan(cantidad) {
    return tr(tDisponibilidad?.quedan, "Quedan {cantidad}", "{cantidad} left").replace("{cantidad}", cantidad);
  }

  function volver() {
    if (window.history.state?.interna) window.history.back();
    else onNavegar("explorar");
  }

  function compartir() {
    navigator.share({ title: evento.titulo, url: window.location.href }).catch(() => {});
  }

  function irASeccion(e, id, nombre) {
    e.preventDefault();
    setPestana(nombre);
    document.getElementById(id)?.scrollIntoView();
  }

  if (cargando) {
    return <DetalleEsqueleto en={en} textos={textos} />;
  }

  if (error) {
    return (
      <main className="contenedor">
        <EstadoMensaje
          rol="alert"
          {...textosError(textos, codigo, en)}
          onBoton={recargar}
        />
      </main>
    );
  }

  if (noEncontrado) {
    return (
      <main className="contenedor detalle__estado">
        <EstadoMensaje
          nivel={1}
          titulo={tr(t?.noEncontrado?.titulo, "No encontramos este evento", "We couldn't find this event")}
          texto={tr(t?.noEncontrado?.texto, "Puede que haya terminado o que el enlace esté mal escrito.", "It may have ended or the link may be mistyped.")}
          boton={tr(t?.noEncontrado?.botones?.volver, "Volver a explorar", "Back to explore")}
          onBoton={() => onNavegar("explorar")}
        />
      </main>
    );
  }

  const recinto = evento?.recinto;

  const edad = evento?.edadMinima > 0
    ? tr(t?.etiquetas?.edadMinima, "Mayores de {edad}", "{edad}+").replace("{edad}", evento.edadMinima)
    : tr(t?.etiquetas?.todoPublico, "Todo público", "All ages");

  const artistas = evento?.artistas?.join(" · "); // Sprint 2: "Invitada:" de Figma (No en la API)

  const hora = formatoHora(evento?.fecha, en);
  const puertas = formatoHora(new Date(new Date(evento?.fecha) - 60 * 60 * 1000).toISOString(), en); // Sprint 2: puertas 1 hora antes del evento (No en la API)
  const horaValor = tr(t?.info?.horaValor, "{hora} · Puertas {puertas}", "{hora} · Doors {puertas}")
    .replace("{hora}", hora)
    .replace("{puertas}", puertas);

  const leerMas = tr(t?.descripcion?.botones?.leerMas, "Leer más", "Read more");

  return (
    <main className="detalle">

      <div className="detalle__portada">
        <nav className="detalle__migas" aria-label={local.migas}>
          <ol>
            <li>
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  onNavegar("inicio");
                }}
              >
                {tr(tMigas?.inicio, "Inicio", "Home")}
              </a>
            </li>
            <li>
              <a
                href="/explorar"
                onClick={(e) => {
                  e.preventDefault();
                  onNavegar("explorar");
                }}
              >
                {tr(tMigas?.explorar, "Explorar", "Explore")}
              </a>
            </li>
            <li aria-current="page">{evento?.titulo}</li>
          </ol>
        </nav>

        <div className="detalle__imagen">
          <AficheEvento afiche={evento?.afiche} clase="detalle__afiche" />

          <button
            type="button"
            className="detalle__boton-portada detalle__volver"
            aria-label={tr(tGeneral?.aria?.volver, "Volver", "Back")}
            onClick={volver}
          >
            <Icono nombre="flechaIzquierda" />
          </button>

          {puedeCompartir && (
            <button
              type="button"
              className="detalle__boton-portada detalle__compartir"
              aria-label={tr(tGeneral?.acciones?.compartir, "Compartir", "Share")}
              onClick={compartir}
            >
              <Icono nombre="compartir" />
            </button>
          )}
        </div>
      </div>

      <div className="detalle__contenido">
        <article className="detalle__principal">

          <header className="detalle__encabezado">
            <div className="detalle__etiquetas">
              <Etiqueta>{tGeneral?.categorias?.singular?.[evento?.categoria] || nombreCategoria(evento?.categoria)}</Etiqueta>
              <Etiqueta clase="detalle__edad">{edad}</Etiqueta>
            </div>

            <div className="detalle__titulos">
              <h1 className="detalle__titulo">{evento?.titulo}</h1>
              {artistas && <p className="detalle__artistas">{artistas}</p>}
            </div>

            <ul className="detalle__info">
              <li className="detalle__info-item detalle__info-item--fecha">
                <span className="detalle__info-icono"><IconoEvento tipo="fecha" /></span>
                <div className="detalle__info-texto">
                  <small className="detalle__info-etiqueta">{tr(t?.info?.fecha, "Fecha", "Date")}</small>
                  <span className="detalle__info-valor">{formatoFechaConAnio(evento?.fecha, en)}</span>
                  <span className="detalle__info-secundario">{horaValor}</span>
                </div>
              </li>

              <li className="detalle__info-item detalle__info-item--hora">
                <span className="detalle__info-icono"><IconoEvento tipo="hora" /></span>
                <div className="detalle__info-texto">
                  <small className="detalle__info-etiqueta">{tr(t?.info?.hora, "Hora", "Time")}</small>
                  <span className="detalle__info-valor">{horaValor}</span>
                </div>
              </li>

              <li className="detalle__info-item detalle__info-item--lugar">
                <span className="detalle__info-icono"><IconoEvento tipo="lugar" /></span>
                <div className="detalle__info-texto">
                  <small className="detalle__info-etiqueta">{tr(t?.info?.lugar, "Lugar", "Venue")}</small>
                  <span className="detalle__info-valor">
                    {recinto?.nombre}
                    <span className="detalle__info-ciudad">, {recinto?.ciudad}</span>
                  </span>
                  <span className="detalle__info-secundario">{recinto?.direccion}, {recinto?.ciudad}</span>
                </div>
              </li>
            </ul>
          </header>

          <nav className="detalle__pestanas" aria-label={local.detalleSecciones}>
            <ul>
              <li>
                <a
                  href="#detalle-descripcion"
                  className="detalle__pestana"
                  aria-current={pestana === "descripcion" ? "true" : undefined}
                  onClick={(e) => irASeccion(e, "detalle-descripcion", "descripcion")}
                >
                  {tr(t?.pestanas?.descripcion, "Descripción", "Description")}
                </a>
              </li>
              <li>
                <a
                  href="#detalle-como-llegar"
                  className="detalle__pestana"
                  aria-current={pestana === "comoLlegar" ? "true" : undefined}
                  onClick={(e) => irASeccion(e, "detalle-como-llegar", "comoLlegar")}
                >
                  {tr(t?.pestanas?.comoLlegar, "Cómo llegar", "How to get there")}
                </a>
              </li>
            </ul>
          </nav>

          <section id="detalle-descripcion" className="detalle__descripcion" aria-labelledby="detalle-descripcion-titulo">
            <h2 id="detalle-descripcion-titulo">{tr(t?.descripcion?.titulo, "Sobre el evento", "About the event")}</h2>

            <p
              id="detalle-descripcion-texto"
              className={`detalle__descripcion-texto ${expandida ? "detalle__descripcion-texto--expandida" : ""}`.trim()}
            >
              {evento?.descripcion}
            </p>

            <button
              type="button"
              className="detalle__leer-mas"
              aria-expanded={expandida}
              aria-controls="detalle-descripcion-texto"
              onClick={() => setExpandida(!expandida)}
            >
              {expandida ? local.leerMenos : leerMas}
            </button>
          </section>

          <section id="detalle-como-llegar" className="detalle__como-llegar" aria-labelledby="detalle-como-llegar-titulo">
            <h2 id="detalle-como-llegar-titulo">{tr(t?.pestanas?.comoLlegar, "Cómo llegar", "How to get there")}</h2>

            <div className="detalle__mapa">
              <IconoEvento tipo="lugar" />
              <span>{tr(t?.mapa?.titulo, "Mapa del lugar", "Venue map")}</span>
            </div>

            <p className="detalle__direccion">
              {recinto?.nombre} · {recinto?.direccion}, {recinto?.ciudad}
            </p>
          </section>
        </article>

        <aside className="detalle__lateral">
          <p className="detalle__desde">
            <small>{tr(t?.info?.desde, "Desde", "From")}</small>
            <strong>{formatoDinero(evento?.precioDesde)}</strong>
          </p>

          <section className="detalle__funciones" aria-labelledby="detalle-funciones-titulo">
            <h2 id="detalle-funciones-titulo">{local.funciones}</h2>

            <ul className="detalle__lista">
              {evento?.funciones?.map((funcion) => (
                <li key={funcion.id} className="detalle__lista-item">
                  <span className="detalle__lista-nombre">{formatoFecha(funcion.fecha, en)}</span>
                  {funcion.agotada ? (
                    <Etiqueta>{tr(tDisponibilidad?.agotada, "Agotada", "Sold out")}</Etiqueta>
                  ) : (
                    <span className="detalle__lista-disponibles">{quedan(funcion.disponibles)}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>

          <section className="detalle__localidades" aria-labelledby="detalle-localidades-titulo">
            <h2 id="detalle-localidades-titulo">{local.localidades}</h2>

            <ul className="detalle__lista">
              {evento?.localidades?.map((localidad) => (
                <li key={localidad.id} className="detalle__lista-item">
                  <span className="detalle__lista-nombre">{localidad.nombre}</span>
                  <strong className="detalle__lista-precio">{formatoDinero(localidad.precio)}</strong>
                  {localidad.agotada ? (
                    <Etiqueta>{tr(tDisponibilidad?.agotada, "Agotada", "Sold out")}</Etiqueta>
                  ) : (
                    <span className="detalle__lista-disponibles">{quedan(localidad.disponibles)}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      {(cargandoRelacionados || errorRelacionados || relacionados.length > 0) && (
        <section
          className="detalle__relacionados"
          aria-labelledby="detalle-relacionados-titulo"
          aria-busy={cargandoRelacionados}
        >
          <EncabezadoSeccion
            idTitulo="detalle-relacionados-titulo"
            titulo={tr(t?.relacionados?.titulo, "También te puede interesar", "You may also like")}
          />

          {cargandoRelacionados && (
            <p className="solo-lectores" role="status">
              {tr(tEstado?.cargando?.titulo, "Cargando…", "Loading…")}
            </p>
          )}

          {errorRelacionados ? (
            <EstadoMensaje
              compacto
              rol="alert"
              texto={mensajeRelacionados.texto}
              boton={mensajeRelacionados.boton}
              onBoton={recargarRelacionados}
            />
          ) : (
            <div className="detalle__relacionados-lista">
              {cargandoRelacionados
                ? Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="tarjeta-evento tarjeta-esqueleto" aria-hidden="true" />
                ))
                : relacionados.map((relacionado) => (
                  <TarjetaEvento
                    key={relacionado.id}
                    evento={relacionado}
                    nombreCategoria={nombreCategoria(relacionado.categoria)}
                    en={en}
                    textos={textos}
                    onAbrir={onAbrir}
                  />
                ))}
            </div>
          )}
        </section>
      )}
    </main>
  );
}
