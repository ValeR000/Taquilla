// RESPONSABILIDAD: Textos que la API no trae (títulos y aria-label), en ES y EN, para toda la app.
// CONVENCIÓN: [STATIC] (Datos fijos que no dependen de peticiones a la API).

// [STATIC] Salvedad: La API no provee estos textos específicos (como los formatos de paginación o el botón de abrir filtros).
// Por lo tanto, se definen localmente para mantener la interfaz bilingüe.
export const textosLocales = {
  es: {
    titulo: "Explorar eventos",
    migas: "Ruta de navegación",
    todasCiudades: "Todas las ciudades",
    quitarFiltro: "Quitar filtro {nombre}",
    abrirFiltros: "Abrir filtros",
    cerrarFiltros: "Cerrar filtros",
    navPrincipal: "Navegación principal",
    navMovil: "Navegación móvil",
    navPie: "Enlaces del pie de página",
    categoriasAria: "Categorías de eventos",

    /* ACCESIBILIDAD */
    cerrarPanel: "Cerrar panel",

    populares: ["Salsa", "Stand-up", "Fútbol", "Festivales de fin de año"],

    /* SPRINT 2: Textos del detalle del evento que no vienen en /textos */
    detalleSecciones: "Secciones del evento",
    funciones: "Funciones",
    localidades: "Localidades",
    leerMenos: "Leer menos",
    /* SPRINT 2 */
    ingresoDisponible: "Ya puedes volver a intentarlo.", // Sprint 2: anuncio al terminar la espera del 429 (No en /textos)
    /* SPRINT 2: Textos de Cómo llegar que no vienen en /textos */
    parqueadero: "Parqueadero",
    verEnMapa: "Ver en Google Maps",
    nuevaPestana: "(se abre en otra pestaña)",
    /* SPRINT 2 */
  },
  en: {
    titulo: "Explore events",
    migas: "Breadcrumb",
    todasCiudades: "All cities",
    quitarFiltro: "Remove filter {nombre}",
    abrirFiltros: "Open filters",
    cerrarFiltros: "Close filters",
    navPrincipal: "Main navigation",
    navMovil: "Mobile navigation",
    navPie: "Footer links",
    categoriasAria: "Event categories",

    /* ACCESIBILITY */
    cerrarPanel: "Close panel",

    populares: ["Salsa", "Stand-up", "Soccer", "Year-end festivals"],

    /* SPRINT 2: Textos del detalle del evento que no vienen en /textos */
    detalleSecciones: "Event sections",
    funciones: "Shows",
    localidades: "Sections",
    leerMenos: "Read less",
    /* SPRINT 2 */
    ingresoDisponible: "You can try again now.", // Sprint 2: anuncio al terminar la espera del 429 (No en /textos)
    /* SPRINT 2: Textos de Cómo llegar que no vienen en /textos */
    parqueadero: "Parking",
    verEnMapa: "View on Google Maps",
    nuevaPestana: "(opens in a new tab)",
    /* SPRINT 2 */
  },
};

export const textosRespaldo = {
  es: {
    navbar: {
      logo: {
        texto: "taquilla",
        aria: "Taquilla, ir al inicio",
      },
      enlaces: {
        inicio: "Inicio",
        explorar: "Explorar",
      },
      buscador: {
        placeholder: "Busca eventos o artistas",
        aria: "Buscar eventos",
      },
      botones: {
        ingresar: "Ingresar",
        crearCuenta: "Crear cuenta",
      },
      usuario: {
        menu: "Menú de la cuenta de {nombre}",
        panel: "Panel",
        cerrarSesion: "Cerrar sesión",
      },
      aria: {
        idioma: "Cambiar idioma",
        accesibilidad: "Abrir el panel de accesibilidad",
      },
    },
    menuMovil: {
      abrir: "Abrir menú",
      cerrar: "Cerrar menú",
      enlaces: {
        inicio: "Inicio",
        explorar: "Explorar",
      },
      botones: {
        ingresar: "Ingresar",
        crearCuenta: "Crear cuenta",
        cerrarSesion: "Cerrar sesión",
      },
      secciones: {
        idioma: "Idioma",
        accesibilidad: "Accesibilidad",
      },
    },
    footer: {
      lema: "Conciertos, teatro, deportes y festivales en un solo lugar. Explora eventos y consulta sus detalles.",
      columnas: {
        explora: {
          titulo: "Explora",
          enlaces: {
            inicio: "Inicio",
            explorar: "Explorar eventos",
          },
        },
        cuenta: {
          titulo: "Tu cuenta",
          enlaces: {
            ingresar: "Iniciar sesión",
            crearCuenta: "Crear cuenta",
          },
        },
        legal: {
          titulo: "Legal",
          enlaces: {
            terminos: "Términos de uso",
            accesibilidad: "Accesibilidad",
          },
        },
      },
      legal: {
        derechos: "© {anio} Taquilla · Proyecto académico",
        nota: "Datos de ejemplo con fines académicos.",
      },
    },
  },
  en: {
    navbar: {
      logo: {
        texto: "taquilla",
        aria: "Taquilla, go to the home page",
      },
      enlaces: {
        inicio: "Home",
        explorar: "Explore",
      },
      buscador: {
        placeholder: "Search events or artists",
        aria: "Search events",
      },
      botones: {
        ingresar: "Log in",
        crearCuenta: "Sign up",
      },
      usuario: {
        menu: "Account menu for {nombre}",
        panel: "Dashboard",
        cerrarSesion: "Log out",
      },
      aria: {
        idioma: "Change language",
        accesibilidad: "Open the accessibility panel",
      },
    },
    menuMovil: {
      abrir: "Open menu",
      cerrar: "Close menu",
      enlaces: {
        inicio: "Home",
        explorar: "Explore",
      },
      botones: {
        ingresar: "Log in",
        crearCuenta: "Sign up",
        cerrarSesion: "Log out",
      },
      secciones: {
        idioma: "Language",
        accesibilidad: "Accessibility",
      },
    },
    footer: {
      lema: "Concerts, theater, sports and festivals in one place. Explore events and see their details.",
      columnas: {
        explora: {
          titulo: "Explore",
          enlaces: {
            inicio: "Home",
            explorar: "Explore events",
          },
        },
        cuenta: {
          titulo: "Your account",
          enlaces: {
            ingresar: "Log in",
            crearCuenta: "Sign up",
          },
        },
        legal: {
          titulo: "Legal",
          enlaces: {
            terminos: "Terms of use",
            accesibilidad: "Accessibility",
          },
        },
      },
      legal: {
        derechos: "© {anio} Taquilla · Academic project",
        nota: "Sample data for academic purposes.",
      },
    },
  },
};
