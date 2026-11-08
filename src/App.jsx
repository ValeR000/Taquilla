// ============================================================================
// ARCHIVO: App.jsx
// RESPONSABILIDAD: Componente principal. Une el Navbar, el Footer, la vista de
// inicio (Hero, categorías y eventos), la vista de explorar, maneja la lógica
// de idiomas, cookies, filtros y la conexión a la API.
//
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

// 1. IMPORTACIONES
import { useTextos } from "./hooks/useTextos.js";
import { useEventosDestacados } from "./hooks/useEventosDestacados.js";
import { useCategorias } from "./hooks/useCategorias.js";
import { useCiudades } from "./hooks/useCiudades.js";
import "./App.css";

import Footer from "./components/layout/Footer/Footer.jsx";
import Navbar from "./components/layout/Navbar/Navbar.jsx";
import BannerCookies from "./components/ui/BannerCookies/BannerCookies.jsx";
import Hero from "./components/ui/Hero/Hero.jsx";
import CategoriasEventos from "./components/ui/CategoriasEventos/CategoriasEventos.jsx";
import BuscadorEventos from "./components/ui/BuscadorEventos/BuscadorEventos.jsx";
import SeccionEventos from "./components/ui/SeccionEventos/SeccionEventos.jsx";
import SeccionFinDeSemana from "./components/ui/SeccionFinDeSemana/SeccionFinDeSemana.jsx";
import Explorar from "./components/ui/Explorar/Explorar.jsx";

import { leerCookie, guardarCookie, borrarCookie } from "./services/cookies.js";
import { useEffect, useState } from "react";

import PanelAccesibilidad from "./components/ui/PanelAccesibilidad/PanelAccesibilidad.jsx";

// 2. FUNCIONES AUXILIARES

// [LOCAL] Lee el numeral de la URL para identificar la sección activa.
function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

// [LOCAL] Ciudad inicial utilizada para mostrar los próximos eventos.
const CIUDAD_INICIAL = "Manizales"; // pendiente: confirmar con la profe

// [LOCAL] Navega a la página del evento seleccionado mediante su slug.
function abrirEvento(evento) {
  window.location.hash = `eventos/${evento.slug}`;
}

// 3. COMPONENTE PRINCIPAL
function App() {

  // ==========================================
  // BLOQUE A: ESTADOS
  // ==========================================

  // [LOCAL] Guarda la decisión del usuario sobre el consentimiento de cookies.
  const [consentimiento, setConsentimiento] = useState(() => leerCookie("consentimiento"));

  // [LOCAL] Recupera el idioma guardado si el usuario aceptó las cookies.
  const [idioma, setIdioma] = useState(() => {
    return leerCookie("consentimiento") === "aceptado" && leerCookie("idioma") === "en" ? "en" : "es";
  });

  // [LOCAL] Controla la sección que se muestra según el numeral de la URL.
  const [activo, setActivo] = useState(leerSeccion);

  // [LOCAL] Estado para controlar el tamaño general del texto.
  const [textoGrande, setTextoGrande] = useState(false);

  // [LOCAL] Contador para forzar que el componente Explorar se refresque al navegar.
  const [busquedaId, setBusquedaId] = useState(0);
  
  // [LOCAL] Estado para pedirle a Explorar que enfoque el input de búsqueda al cargar.
  const [enfocarBusqueda, setEnfocarBusqueda] = useState(false);

  // Estados para el Panel de Accesibilidad
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState(100);
  const [altoContraste, setAltoContraste] = useState(false);
  const [reducirMovimiento, setReducirMovimiento] = useState(false);
  const [subrayarEnlaces, setSubrayarEnlaces] = useState(false);
  const [espaciadoLectura, setEspaciadoLectura] = useState(false);

  // [LOCAL] Abre o cierra el panel de accesibilidad.
  const abrirAccesibilidad = () => setPanelAbierto(!panelAbierto);

  // [LOCAL] Cierra el panel de accesibilidad.
  const cerrarAccesibilidad = () => setPanelAbierto(false);

  // [LOCAL] Aumenta el tamaño del texto hasta un máximo del 150%.
  const aumentarTexto = () => setTamanoTexto((prev) => Math.min(prev + 10, 150));

  // [LOCAL] Reduce el tamaño del texto hasta un mínimo del 80%.
  const reducirTexto = () => setTamanoTexto((prev) => Math.max(prev - 10, 80));

  // [LOCAL] Restablece todas las opciones de accesibilidad a sus valores iniciales.
  const restablecerAccesibilidad = () => {
    setTamanoTexto(100);
    setAltoContraste(false);
    setReducirMovimiento(false);
    setSubrayarEnlaces(false);
    setEspaciadoLectura(false);
  };

  // ==========================================
  // BLOQUE B: CONEXIÓN CON LA API Y VARIABLES
  // ==========================================

  // [API] Obtenemos los textos traducidos.
  const datos = useTextos(idioma);

  // [API] Extraemos los textos específicos de la página de inicio y los estados generales.
  const inicio = datos.textos?.paginas?.inicio;
  const estados = datos.textos?.estados;

  // [API] Obtenemos los eventos, su estado de carga y la función para reintentar.
  const { 
    eventos, 
    cargando: cargandoEventos, 
    error: errorEventos, 
    recargar: recargarEventos 
  } = useEventosDestacados();

  // [API] Obtenemos las categorías.
  const { categorias, cargando: cargandoCategorias } = useCategorias();

  // [API] Obtenemos las ciudades para el buscador.
  const { ciudades } = useCiudades();

  // [LOCAL] Variable auxiliar para pasársela al Hero (que espera una prop llamada 'en').
  const en = idioma === "en";

  // [LOCAL] Para la tarjeta de la derecha, tomamos el primer evento de la API.
  const eventoDestacado = eventos?.[0];

  // ==========================================
  // BLOQUE C: EFECTOS
  // ==========================================

  // [LOCAL] Escucha los cambios en el numeral de la URL para actualizar la vista activa.
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
    }

    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

  // [LOCAL] Actualiza el idioma del documento HTML cuando cambia el idioma de la aplicación.
  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  // EFECTO: Aplicar las clases de accesibilidad al body
  useEffect(() => {
    document.documentElement.style.fontSize = `${tamanoTexto}%`;

    if (altoContraste) document.body.classList.add("accesibilidad-alto-contraste");
    else document.body.classList.remove("accesibilidad-alto-contraste");

    if (reducirMovimiento) document.body.classList.add("accesibilidad-reducir-movimiento");
    else document.body.classList.remove("accesibilidad-reducir-movimiento");

    if (subrayarEnlaces) document.body.classList.add("accesibilidad-subrayar-enlaces");
    else document.body.classList.remove("accesibilidad-subrayar-enlaces");

    if (espaciadoLectura) document.body.classList.add("accesibilidad-espaciado-lectura");
    else document.body.classList.remove("accesibilidad-espaciado-lectura");

    // [LOCAL] Limpia los estilos y las clases de accesibilidad cuando el efecto se desmonta o se actualiza.
    return () => {
      document.documentElement.style.fontSize = "";
      document.body.classList.remove("accesibilidad-alto-contraste", "accesibilidad-reducir-movimiento", "accesibilidad-subrayar-enlaces", "accesibilidad-espaciado-lectura");
    };
  }, [tamanoTexto, altoContraste, reducirMovimiento, subrayarEnlaces, espaciadoLectura]);

  // ==========================================
  // BLOQUE D: FUNCIONES DEL COMPONENTE
  // ==========================================

  // [LOCAL] Función centralizada para navegar a la vista de Explorar aplicando filtros en la URL.
  function irA(search, enfocar = false) {
    // [LOCAL] Hace que la URL cambie a #explorar conservando la ruta actual pero con los nuevos parámetros.
    window.history.replaceState(null, "", `${window.location.pathname}${search}#explorar`);

    // [LOCAL] Hace que el componente Explorar sepa si debe enfocar el buscador.
    setEnfocarBusqueda(enfocar);

    // [LOCAL] Hace que el componente <Explorar> se vuelva a montar incrementando el ID.
    setBusquedaId((n) => n + 1);

    // [LOCAL] Hace que la vista activa cambie a "explorar".
    setActivo("explorar");

    // [LOCAL] Hace que la página haga scroll hasta arriba del todo.
    window.scrollTo(0, 0);
  }

  // [LOCAL] Función para navegar entre las vistas principales (Inicio, Login, Registro, Explorar).
  function navegar(id) {
    // [LOCAL] Si el destino es "explorar", delega la acción a la función específica.
    if (id === "explorar") return irAExplorar();
    
    // [LOCAL] Si es cualquier otra vista, limpia la URL de parámetros y apunta al hash correspondiente.
    window.history.replaceState(null, "", `${window.location.pathname}#${id}`);
    
    // [LOCAL] Hace que la vista activa cambie a la vista solicitada.
    setActivo(id);
    
    // [LOCAL] Hace que la página haga scroll hasta arriba del todo.
    window.scrollTo(0, 0);
  }

  // [LOCAL] Hace que la lupa móvil abra la vista de explorar y enfoque el buscador.
  function abrirBusqueda() {
    // [LOCAL] Si ya está en explorar, conserva los filtros actuales de la URL, si no, limpia la búsqueda.
    irA(activo === "explorar" ? window.location.search : "", true);
  }

  // [LOCAL] Recibe los filtros del buscador (Hero) y los envía a la URL.
  function buscar(filtros) {
    const p = new URLSearchParams();
    if (filtros.consulta) p.set("q", filtros.consulta);
    if (filtros.ciudad) p.set("ciudad", filtros.ciudad);

    // Hace que navegue con los filtros aplicados o a la vista limpia.
    irA(p.toString() ? `?${p}` : "");
  }

  // [LOCAL] Navega a explorar aplicando el filtro de categoría.
  function filtrarCategoria(idCategoria) {
    // Hace que se arme la URL con la categoría o se limpie si se deselecciona.
    irA(idCategoria ? `?${new URLSearchParams({ categoria: idCategoria })}` : "");
  }

  // [LOCAL] Limpia los filtros y navega a explorar (para el "Ver todos").
  function irAExplorar() {
    irA("");
  }

  // [LOCAL] Cambia el idioma de la aplicación y guarda la preferencia si se aceptaron las cookies.
  function cambiarIdioma(nuevoIdioma) {
    setIdioma(nuevoIdioma);
    if (consentimiento === "aceptado") guardarCookie("idioma", nuevoIdioma);
  }

  // [LOCAL] Guarda el consentimiento y el idioma actual en las cookies.
  function aceptarCookies() {
    guardarCookie("consentimiento", "aceptado");
    guardarCookie("idioma", idioma);
    setConsentimiento("aceptado");
  }

  // [LOCAL] Guarda el rechazo del consentimiento y elimina la cookie del idioma.
  function rechazarCookies() {
    guardarCookie("consentimiento", "rechazado");
    borrarCookie("idioma");
    setConsentimiento("rechazado");
  }

  // ==========================================
  // BLOQUE E: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================

  return (
    <div className="taquilla">

      {/* [STATIC] Navbar superior. */}
      <Navbar
        {...datos}
        idioma={idioma}
        cambiarIdioma={cambiarIdioma}
        activo={activo}
        onBuscar={buscar}
        onNavegar={navegar}
        onAbrirBusqueda={abrirBusqueda}
        abrirAccesibilidad={abrirAccesibilidad}
        accesibilidadAbierta={panelAbierto}
      />

      {/* ========================================== */}
      {/* SECCIÓN: VISTA DE EXPLORAR O INICIO         */}
      {/* ========================================== */}

      {/* [LOCAL] CONDICIONAL: Si activo es "explorar", muestra la vista Explorar. Si no, el Home. */}
      {activo === "explorar" ? (
        <Explorar
          key={busquedaId}
          en={en}
          categorias={categorias}
          ciudades={ciudades}
          onAbrir={abrirEvento}
          textos={datos.textos}
          enfocarBusqueda={enfocarBusqueda}
        />
      ) : (
        <>
          {/* ========================================== */}
          {/* SECCIÓN: HERO CON BUSCADOR                 */}
          {/* ========================================== */}

          {/* [STATIC] El Hero recibe el buscador como children. */}
          <Hero
            en={en}
            textos={datos.textos}
            destacado={eventoDestacado}
            abrirEvento={abrirEvento}
            onBuscar={buscar}
          >
            {/* [LOCAL] El componente del buscador (con sus ciudades y eventos). */}
            <BuscadorEventos
              en={en}
              ciudades={ciudades || []}
              eventos={eventos || []}
              onBuscar={buscar}
              textos={datos.textos}
            />
          </Hero>

          {/* ========================================== */}
          {/* SECCIÓN: CONTENIDO PRINCIPAL               */}
          {/* ========================================== */}

          <main className="contenedor demo-contenido">

            {/* CATEGORÍAS */}
            {cargandoCategorias && (
              <p>{estados?.cargando?.titulo || (en ? "Loading…" : "Cargando…")}</p>
            )}

            {!cargandoCategorias && (
              <CategoriasEventos
                categorias={categorias}
                filtros={null}
                filtrarCategoria={filtrarCategoria}
                en={en}
                textos={datos.textos}
              />
            )}

            {/* ========================================== */}
            {/* SECCIÓN: EVENTOS (Cargando y Error)        */}
            {/* ========================================== */}

            {cargandoEventos && (
              <p style={{ marginTop: "3rem" }}>
                {estados?.cargando?.titulo || (en ? "Loading…" : "Cargando…")}
              </p>
            )}

            {/* [LOCAL] Muestra un mensaje de error y un botón para reintentar la carga de eventos. */}
            {errorEventos && (
              <div style={{ marginTop: "3rem" }} role="alert">
                <p>{estados?.error?.titulo || (en ? "Something went wrong" : "Algo salió mal")}</p>
                <button type="button" className="boton-home primario" onClick={recargarEventos}>
                  {estados?.error?.botones?.reintentar || (en ? "Retry" : "Reintentar")}
                </button>
              </div>
            )}

            {/* ========================================== */}
            {/* SECCIÓN: EVENTOS DESTACADOS                */}
            {/* ========================================== */}

            {!cargandoEventos && !errorEventos && (
              <>
                {/* 1. PRIMERA SECCIÓN (Primeros 4 eventos de la API) */}
                <SeccionEventos
                  id="eventos"
                  titulo={inicio?.destacados?.titulo || (en ? "This week's highlights" : "Destacados de la semana")}
                  descripcion={inicio?.destacados?.subtitulo || (en ? "Best-selling events in the last 7 days" : "Los eventos con más entradas vendidas en los últimos 7 días")}
                  eventos={eventos.slice(0, 4)}
                  categorias={categorias}
                  en={en}
                  onAbrir={abrirEvento}
                  onVerTodos={irAExplorar}
                  textos={datos.textos}
                />

                {/* 2. SEGUNDA SECCIÓN (Siguientes 4 eventos de la API) */}
                <SeccionEventos
                  id="proximos"
                  clase="proximos"
                  titulo={(inicio?.proximos?.titulo || (en ? "Upcoming in {ciudad}" : "Próximamente en {ciudad}")).replace("{ciudad}", CIUDAD_INICIAL)}
                  descripcion={inicio?.proximos?.subtitulo || (en ? "Change the city from the search bar" : "Cambia la ciudad desde el buscador")}
                  eventos={eventos.slice(4, 8)}
                  categorias={categorias}
                  en={en}
                  onAbrir={abrirEvento}
                  onVerTodos={irAExplorar}
                  textos={datos.textos}
                />

                {/* 3. TERCERA SECCIÓN (Lista vertical para móvil) */}
                <SeccionFinDeSemana
                  eventos={eventos.slice(4, 7)}
                  en={en}
                  onAbrir={abrirEvento}
                  onVerTodos={irAExplorar}
                  textos={datos.textos}
                />
              </>
            )}
          </main>
        </>
      )}

      {/* Panel de Accesibilidad */}
      <PanelAccesibilidad
        abierto={panelAbierto}
        onCerrar={cerrarAccesibilidad}
        en={en}
        tamanoTexto={tamanoTexto}
        aumentarTexto={aumentarTexto}
        reducirTexto={reducirTexto}
        altoContraste={altoContraste}
        setAltoContraste={setAltoContraste}
        reducirMovimiento={reducirMovimiento}
        setReducirMovimiento={setReducirMovimiento}
        subrayarEnlaces={subrayarEnlaces}
        setSubrayarEnlaces={setSubrayarEnlaces}
        espaciadoLectura={espaciadoLectura}
        setEspaciadoLectura={setEspaciadoLectura}
        restablecer={restablecerAccesibilidad}
      />

      {/* [STATIC] Footer con sus respectivas props. */}
      <Footer 
        textos={datos.textos?.footer} 
        logo={datos.textos?.navbar?.logo} 
        en={en} 
        onNavegar={navegar} 
        abrirAccesibilidad={abrirAccesibilidad} 
      />

      {/* [LOCAL] Banner de cookies. */}
      {!consentimiento && (
        <BannerCookies
          textos={datos.textos?.cookies?.banner}
          onAceptar={aceptarCookies}
          onRechazar={rechazarCookies}
          onConfigurar={() => alert("Configurar preferencias...")}
        />
      )}

    </div>
  );
}

export default App;