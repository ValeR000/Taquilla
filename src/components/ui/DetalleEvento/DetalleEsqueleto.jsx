/* SPRINT 2: Esqueleto de la vista de detalle con la misma forma y medidas mientras carga el evento */

import Etiqueta from "../Etiqueta/Etiqueta.jsx";

const VACIO = " ";

export default function DetalleEsqueleto({ textoCargando = "" }) {
  return (
    <main className="detalle" aria-busy="true">
      <p className="solo-lectores" role="status">
        {textoCargando}
      </p>

      <div className="detalle__portada" aria-hidden="true">
        <div className="migas detalle__migas">
          <ol className="migas__lista">
            <li className="migas__item detalle__esqueleto detalle__esqueleto--migas">{VACIO}</li>
          </ol>
        </div>

        <div className="detalle__imagen">
          <div className="detalle__afiche detalle__esqueleto-bloque" />
        </div>
      </div>

      <div className="detalle__contenido" aria-hidden="true">
        <div className="detalle__principal">
          <div className="detalle__encabezado">
            <div className="detalle__etiquetas">
              <Etiqueta clase="detalle__esqueleto--etiqueta">{VACIO}</Etiqueta>
              <Etiqueta clase="detalle__edad detalle__esqueleto--etiqueta">{VACIO}</Etiqueta>
            </div>

            <div className="detalle__titulos">
              <p className="detalle__titulo detalle__esqueleto detalle__esqueleto--titulo">{VACIO}</p>
              <p className="detalle__artistas detalle__esqueleto detalle__esqueleto--artistas">{VACIO}</p>
            </div>

            <ul className="detalle__info">
              {["fecha", "hora", "lugar"].map((tipo) => (
                <li key={tipo} className={`detalle__info-item detalle__info-item--${tipo}`}>
                  <span className="detalle__info-icono" />
                  <div className="detalle__info-texto">
                    <small className="detalle__info-etiqueta detalle__esqueleto detalle__esqueleto--corto">{VACIO}</small>
                    <span className="detalle__info-valor detalle__esqueleto detalle__esqueleto--valor">{VACIO}</span>
                    <span className="detalle__info-secundario detalle__esqueleto detalle__esqueleto--valor">{VACIO}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="detalle__pestanas">
            <ul>
              {[1, 2].map((i) => (
                <li key={i}>
                  <span className="detalle__pestana">
                    <span className="detalle__esqueleto detalle__esqueleto--pestana">{VACIO}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="detalle__descripcion">
            <p className="detalle__esqueleto detalle__esqueleto--h2">{VACIO}</p>
            <p className="detalle__descripcion-texto">
              {[1, 2, 3].map((i) => (
                <span key={i} className="detalle__esqueleto detalle__esqueleto--linea">{VACIO}</span>
              ))}
            </p>
            <span className="detalle__leer-mas detalle__esqueleto detalle__esqueleto--corto">{VACIO}</span>
          </div>

          <div className="detalle__como-llegar">
            <p className="detalle__esqueleto detalle__esqueleto--h2">{VACIO}</p>
            <div className="detalle__mapa" />
          </div>
        </div>

        <div className="detalle__lateral">
          <p className="detalle__desde">
            <small className="detalle__esqueleto detalle__esqueleto--corto">{VACIO}</small>
            <strong className="detalle__esqueleto detalle__esqueleto--valor">{VACIO}</strong>
          </p>

          <div className="detalle__funciones">
            <p className="detalle__esqueleto detalle__esqueleto--h2">{VACIO}</p>
            <ul className="detalle__lista">
              {[1, 2].map((i) => (
                <li key={i} className="detalle__lista-item">
                  <span className="detalle__lista-nombre detalle__esqueleto">{VACIO}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
