// RESPONSABILIDAD: Almacena textos locales y traducciones estáticas para la vista de Explorar.
// CONVENCIÓN: [STATIC] (Datos fijos que no dependen de peticiones a la API).

// [STATIC] Salvedad: La API no provee estos textos específicos (como los formatos de paginación o el botón de abrir filtros).
// Por lo tanto, se definen localmente para mantener la interfaz bilingüe.
export const textosLocales = {
  es: {
    titulo: "Explorar eventos",
    migas: "Ruta de navegación",
    paginacion: "Paginación",
    pagina: "Página {n}",
    todasCiudades: "Todas las ciudades",
    quitarFiltro: "Quitar filtro {nombre}",
    abrirFiltros: "Abrir filtros",
    cerrarFiltros: "Cerrar filtros",
  },
  en: {
    titulo: "Explore events",
    migas: "Breadcrumb",
    paginacion: "Pagination",
    pagina: "Page {n}",
    todasCiudades: "All cities",
    quitarFiltro: "Remove filter {nombre}",
    abrirFiltros: "Open filters",
    cerrarFiltros: "Close filters",
  },
};

// [STATIC] Diccionario local para traducir los IDs de las categorías al inglés, 
// ya que la API devuelve los nombres en español.
export const categoriasEn = {
  conciertos: "Concerts",
  teatro: "Theatre",
  deportes: "Sports",
  festivales: "Festivals",
  comedia: "Comedy",
  familiares: "Family",
};