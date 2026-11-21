const ICONOS = {
  buscar: {
    caja: 24,
    trazos: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4.3-4.3" />
      </>
    ),
  },

  idioma: {
    caja: 18,
    trazos: (
      <>
        <path d="M16.5 9a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
        <path d="M9 1.5A10.9 10.9 0 0 0 6 9a10.9 10.9 0 0 0 3 7.5A10.9 10.9 0 0 0 12 9a10.9 10.9 0 0 0-3-7.5Z" />
        <path d="M1.5 9h15" />
      </>
    ),
  },

  flechaAbajo: {
    caja: 16,
    trazos: <path d="m4 6 4 4 4-4" />,
  },

  accesibilidad: {
    caja: 20,
    trazos: (
      <>
        <path d="M10.833 4.167a.833.833 0 1 1-1.666 0 .833.833 0 0 1 1.666 0Z" />
        <path d="m7.5 16.667 2.5-5 2.5 5" />
        <path d="m5 6.667 5 1.666 5-1.666" />
        <path d="M10 8.333v3.334" />
      </>
    ),
  },

  menu: {
    caja: 24,
    tamano: 22,
    trazos: <path d="M4 7h16M4 12h16M4 17h16" />,
  },

  cerrar: {
    caja: 24,
    trazos: <path d="M6 18 18 6M6 6l12 12" />,
  },

  filtros: {
    caja: 24,
    trazos: <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />,
  },

  flechaIzquierda: {
    caja: 24,
    tamano: 16,
    trazos: <path d="m15 18-6-6 6-6" />,
  },

  flechaDerecha: {
    caja: 24,
    tamano: 16,
    trazos: <path d="m9 18 6-6-6-6" />,
  },

  ticket: {
    caja: 24,
    tamano: 18,
    trazos: (
      <>
        <path d="M3 8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8z" />
        <path d="M10 9h4M10 15h4" />
      </>
    ),
  },

  /* SPRINT 2: Hace que el botón de compartir del detalle tenga su ícono */
  compartir: {
    caja: 24,
    tamano: 18,
    trazos: (
      <>
        <path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7" />
        <path d="m16 6-4-4-4 4M12 2v13" />
      </>
    ),
  },
  /* SPRINT 2 */

  /* SPRINT 2: Hace que el botón de mostrar u ocultar la contraseña tenga sus íconos */
  ojo: {
    caja: 24,
    tamano: 20,
    trazos: (
      <>
        <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },

  ojoTachado: {
    caja: 24,
    tamano: 20,
    trazos: (
      <>
        <path d="M10.7 5.1A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-2.2 3.2M6.6 6.6A17.4 17.4 0 0 0 2 12s3.6 7 10 7a9.7 9.7 0 0 0 5.4-1.6" />
        <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2M2 2l20 20" />
      </>
    ),
  },
  /* SPRINT 2 */

  /* SPRINT 2: Hace que los beneficios del ingreso y la casilla marcada tengan su check */
  check: {
    caja: 24,
    tamano: 12,
    trazos: <path d="M20 6 9 17l-5-5" />,
  },
  /* SPRINT 2 */

  /* SPRINT 2: Hace que el Aviso de error tenga su ícono de alerta en círculo */
  alerta: {
    caja: 24,
    tamano: 20,
    trazos: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </>
    ),
  },
  /* SPRINT 2 */

  /* SPRINT 2: Hace que «Cerrar sesión» tenga su ícono de salir (flecha saliendo de una puerta) */
  salir: {
    caja: 24,
    tamano: 18,
    trazos: (
      <>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <path d="m16 17 5-5-5-5M21 12H9" />
      </>
    ),
  },
  /* SPRINT 2 */
};

// ##########
export default function Icono({ nombre, tamano, clase }) {
  const icono = ICONOS[nombre];
  const medida = tamano || icono.tamano || icono.caja;

  return (
    <svg
      className={clase}
      width={medida}
      height={medida}
      viewBox={`0 0 ${icono.caja} ${icono.caja}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {icono.trazos}
    </svg>
  );
}
// ##########