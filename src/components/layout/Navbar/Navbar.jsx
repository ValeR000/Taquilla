// ============================================================================
// ARCHIVO: Navbar.jsx
// RESPONSABILIDAD: Barra de navegación superior.
// CONVENCIÓN: [API], [LOCAL], [STATIC].
// ============================================================================

import { useState } from 'react';
import './Navbar.css';
import Boton from '../../ui/Boton/Boton.jsx';
import SelectorIdioma from '../../ui/SelectorIdioma/SelectorIdioma.jsx'; // <-- NUEVO IMPORT
import iconoAccesibilidad from '../../../assets/accesibilidad.svg';
import logo from '../../../assets/logo-taquilla.svg';
import MenuMovil from '../MenuMovil/MenuMovil.jsx'; // [STATIC] NUEVO IMPORT

const ENLACES = [
  { id: 'inicio', href: '/' },
  { id: 'explorar', href: '/explorar' },
];

function Navbar({ idioma, cambiarIdioma, textos, abrirAccesibilidad, accesibilidadAbierta }) {

  const t = textos?.navbar;
  const m = textos?.menuMovil;

  const [enlaceActivo, setEnlaceActivo] = useState('inicio');
  const [busqueda, setBusqueda] = useState('');
  const [menuAbierto, setMenuAbierto] = useState(false);

  const manejarBusqueda = (evento) => {
    evento.preventDefault();
  };

  const manejarClicEnlace = (evento, id) => {
    evento.preventDefault();
    setEnlaceActivo(id);
  };

  return (
    <header className="navbar">
      <div className="navbar__contenedor">

        <div className="navbar__izquierda">
          <a href="/" className="navbar__logo" aria-label={t?.logo.aria}>
            <span className="navbar__logo-icono">
              <img src={logo} alt="" width="24" height="24" />
            </span>
            <span className="navbar__logo-texto">{t?.logo.texto}</span>
          </a>

          <nav aria-label="Navegación principal">
            <ul className="navbar__enlaces">
              {ENLACES.map((enlace) => (
                <li key={enlace.id}>
                  <a
                    href={enlace.href}
                    className={
                      enlaceActivo === enlace.id
                        ? 'navbar__enlace navbar__enlace--activo'
                        : 'navbar__enlace'
                    }
                    aria-current={enlaceActivo === enlace.id ? 'page' : undefined}
                    onClick={(e) => manejarClicEnlace(e, enlace.id)}
                  >
                    {t?.enlaces[enlace.id]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="navbar__derecha">
          <form className="navbar__buscador" role="search" onSubmit={manejarBusqueda}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
            <input
              type="search"
              className="navbar__buscador-input"
              placeholder={t?.buscador.placeholder}
              aria-label={t?.buscador.aria}
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </form>

          <button
            type="button"
            className="navbar__accesibilidad"
            aria-label={idioma === 'en' ? "Open accessibility panel" : "Abrir panel de accesibilidad"}
            aria-expanded={accesibilidadAbierta}
            onClick={abrirAccesibilidad}
          >
            <img src={iconoAccesibilidad} alt="" width="24" height="24" />
          </button>

          {/* [STATIC] 2. NUEVO COMPONENTE SELECTOR DE IDIOMA */}
          <SelectorIdioma
            idioma={idioma}
            cambiarIdioma={cambiarIdioma}
            etiqueta={t?.aria.idioma}
          />

          <Boton variante="secundario">
            {t?.botones.ingresar}
          </Boton>
          <Boton variante="primario">
            {t?.botones.crearCuenta}
          </Boton>
        </div>

        <div className="navbar__movil">
          <button type="button" className="navbar__movil-boton" aria-label={t?.buscador.aria}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M21 21l-4.3-4.3" />
            </svg>
          </button>

          <button type="button" className="navbar__movil-ingresar">
            {t?.botones.ingresar}
          </button>

          {/* [LOCAL] Botón hamburguesa que alterna el estado del menú. */}
          <button
            type="button"
            className="navbar__movil-boton"
            aria-label={m?.abrir}
            aria-expanded={menuAbierto}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* [STATIC] Renderiza el componente MenuMovil con sus propiedades. */}
      <MenuMovil
        abierto={menuAbierto}
        onCerrar={() => setMenuAbierto(false)}
        textos={textos}
        idioma={idioma}
        cambiarIdioma={cambiarIdioma}
        abrirAccesibilidad={abrirAccesibilidad}
      />
    </header>
  );
}

export default Navbar;