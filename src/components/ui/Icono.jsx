const ICONOS = {
  buscar: {
    caja: 16,
    trazos: (
      <>
        <path d="M12.667 7.333a5.333 5.333 0 1 1-10.667 0 5.333 5.333 0 0 1 10.667 0Z" />
        <path d="m14 14-2.867-2.867" />
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
    tamano: 20,
    trazos: <path d="M4 6h16M4 12h16M4 18h16" />,
  },

  cerrar: {
    caja: 24,
    trazos: <path d="M6 18 18 6M6 6l12 12" />,
  },

  filtros: {
    caja: 24,
    trazos: <path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-4V3M1 14h6m2-6h6m2 8h6" />,
  },
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