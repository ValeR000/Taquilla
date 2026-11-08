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
import { useCallback, useEffect, useState } from "react";

import PanelAccesibilidad from "./components/ui/PanelAccesibilidad/PanelAccesibilidad.jsx";

// ==========================================
// FUNCIONES AUXILIARES
// ==========================================

// [LOCAL] Hace que la vista activa se lea desde la ruta de la URL (/, /explorar, /eventos/slug).
function leerSeccion() {
  return window.location.pathname.replace(/^\/+|\/+$/g, "") || "inicio";
}

// [STATIC] Hace que "Próximamente" use Manizales como ciudad inicial, porque la API no define una.
const CIUDAD_INICIAL = "Manizales";

function App() {

  // ==========================================
  // BLOQUE A: ESTADOS
  // ==========================================

  // [LOCAL] Hace que se recuerde si la persona aceptó o rechazó las cookies.
  const [consentimiento, setConsentimiento] = useState(() => leerCookie("consentimiento"));

  // [LOCAL] Hace que el idioma guardado se recupere solo si se aceptaron las cookies.
  const [idioma, setIdioma] = useState(() => {
    return leerCookie("consentimiento") === "aceptado" && leerCookie("idioma") === "en" ? "en" : "es";
  });

  // [LOCAL] Hace que se sepa qué vista mostrar según la ruta.
  const [activo, setActivo] = useState(leerSeccion);

  const [textoGrande, setTextoGrande] = useState(false);

  // [LOCAL] Hace que Explorar se vuelva a montar y relea la URL al navegar.
  const [busquedaId, setBusquedaId] = useState(0);

  // [ACCESIBILIDAD] Hace que Explorar ponga el foco en su buscador al abrirlo desde la lupa.
  const [enfocarBusqueda, setEnfocarBusqueda] = useState(false);

  // [LOCAL] Hace que se guarden las opciones del panel de accesibilidad.
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState(100);
  const [altoContraste, setAltoContraste] = useState(false);
  const [reducirMovimiento, setReducirMovimiento] = useState(false);
  const [subrayarEnlaces, setSubrayarEnlaces] = useState(false);
  const [espaciadoLectura, setEspaciadoLectura] = useState(false);

  // [LOCAL] Hace que el panel de accesibilidad se abra o se cierre.
  const abrirAccesibilidad = () => setPanelAbierto(!panelAbierto);

  // [ACCESIBILIDAD] Hace que el panel se cierre sin mover el foco en cada render.
  const cerrarAccesibilidad = useCallback(() => setPanelAbierto(false), []);

  // [LOCAL] Hace que el texto crezca hasta un máximo del 150%.
  const aumentarTexto = () => setTamanoTexto((prev) => Math.min(prev + 10, 150));

  // [LOCAL] Hace que el texto se reduzca hasta un mínimo del 80%.
  const reducirTexto = () => setTamanoTexto((prev) => Math.max(prev - 10, 80));

  // [LOCAL] Hace que todas las opciones de accesibilidad vuelvan a sus valores iniciales.
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

  // [API] Hace que se carguen los textos de la interfaz en el idioma actual.
  const datos = useTextos(idioma);

  // [API] Hace que los textos de Inicio y de los estados estén a mano.
  const inicio = datos.textos?.paginas?.inicio;
  const estados = datos.textos?.estados;

  // [API] Hace que se carguen los eventos destacados, con su carga, error y reintento.
  const {
    eventos,
    cargando: cargandoEventos,
    error: errorEventos,
    recargar: recargarEventos
  } = useEventosDestacados();

// [API] Hace que se carguen las categorías, con su carga, error y reintento.
  const {
  categorias,
  cargando: cargandoCategorias,
  error: errorCategorias,
  recargar: recargarCategorias
} = useCategorias();

  // [API] Hace que se carguen las ciudades para los buscadores.
  const { ciudades } = useCiudades();

  const en = idioma === "en";

  // [API] Hace que el primer evento destacado aparezca en la tarjeta del Hero.
  const eventoDestacado = eventos?.[0];

  // ==========================================
  // BLOQUE C: EFECTOS
  // ==========================================

  // [LOCAL] Hace que los botones Atrás y Adelante del navegador cambien de vista y relean los filtros.
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
      setEnfocarBusqueda(false);
      setBusquedaId((n) => n + 1);
    }

    window.addEventListener("popstate", actualizar);
    return () => window.removeEventListener("popstate", actualizar);
  }, []);

  // [ACCESIBILIDAD] Hace que <html lang> cambie con el idioma.
  useEffect(() => {
    document.documentElement.lang = idioma;
  }, [idioma]);

  // [ACCESIBILIDAD] Hace que las opciones del panel se apliquen a toda la página.
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

    // [ACCESIBILIDAD] Hace que los estilos se limpien antes de aplicar los nuevos.
    return () => {
      document.documentElement.style.fontSize = "";
      document.body.classList.remove("accesibilidad-alto-contraste", "accesibilidad-reducir-movimiento", "accesibilidad-subrayar-enlaces", "accesibilidad-espaciado-lectura");
    };
  }, [tamanoTexto, altoContraste, reducirMovimiento, subrayarEnlaces, espaciadoLectura]);

  // ==========================================
  // BLOQUE D: FUNCIONES DEL COMPONENTE
  // ==========================================

  // [LOCAL] Hace que la URL cambie sin recargar, quede en el historial y la página suba al inicio.
  function cambiarRuta(ruta, nuevaVista) {
    window.history.pushState(null, "", ruta);
    setActivo(nuevaVista);
    window.scrollTo(0, 0);
  }

  // [LOCAL] Hace que se abra Explorar con los filtros indicados en la URL.
  function irA(search, enfocar = false) {
    setEnfocarBusqueda(enfocar);
    setBusquedaId((n) => n + 1);
    cambiarRuta(`/explorar${search}`, "explorar");
  }

  // [LOCAL] Hace que se navegue a Inicio, Explorar, Ingresar o Registro.
  function navegar(id) {
    if (id === "explorar") return irAExplorar();
    cambiarRuta(id === "inicio" ? "/" : `/${id}`, id);
  }

  // [LOCAL] Hace que se abra la ruta del detalle del evento (/eventos/slug).
  function abrirEvento(evento) {
    cambiarRuta(`/eventos/${evento.slug}`, `eventos/${evento.slug}`);
  }

  // [ACCESIBILIDAD] Hace que la lupa móvil abra Explorar con el foco en su buscador.
  function abrirBusqueda() {
    irA(activo === "explorar" ? window.location.search : "", true);
  }

  // [LOCAL] Hace que la búsqueda del Hero o del Navbar se envíe a Explorar como filtros.
  function buscar(filtros) {
    const p = new URLSearchParams();
    if (filtros.consulta) p.set("q", filtros.consulta);
    if (filtros.ciudad) p.set("ciudad", filtros.ciudad);
    irA(p.toString() ? `?${p}` : "");
  }

  // [LOCAL] Hace que una categoría del Inicio abra Explorar filtrado por ella.
  function filtrarCategoria(idCategoria) {
    irA(idCategoria ? `?${new URLSearchParams({ categoria: idCategoria })}` : "");
  }

  // [LOCAL] Hace que se abra Explorar sin filtros.
  function irAExplorar() {
    irA("");
  }

  // [LOCAL] Hace que el idioma cambie y se guarde si se aceptaron las cookies.
  function cambiarIdioma(nuevoIdioma) {
    setIdioma(nuevoIdioma);
    if (consentimiento === "aceptado") guardarCookie("idioma", nuevoIdioma);
  }

  // [LOCAL] Hace que se guarden el consentimiento y el idioma actual.
  function aceptarCookies() {
    guardarCookie("consentimiento", "aceptado");
    guardarCookie("idioma", idioma);
    setConsentimiento("aceptado");
  }

  // [LOCAL] Hace que se guarde el rechazo y se borre la cookie del idioma.
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

      {/* [STATIC] Hace que aparezca la barra de navegación. */}
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

      {/* [LOCAL] Hace que se muestre Explorar en /explorar y el Inicio en cualquier otra ruta. */}
      {activo === "explorar" ? (
        <Explorar
          key={busquedaId}
          en={en}
          categorias={categorias}
          ciudades={ciudades}
          onAbrir={abrirEvento}
          onNavegar={navegar}
          textos={datos.textos}
          enfocarBusqueda={enfocarBusqueda}
        />
      ) : (
        <>
          {/* ========================================== */}
          {/* SECCIÓN: HERO CON BUSCADOR                 */}
          {/* ========================================== */}

          {/* [STATIC] Hace que aparezca el Hero con el buscador dentro. */}
          <Hero
            en={en}
            textos={datos.textos}
            destacado={eventoDestacado}
            abrirEvento={abrirEvento}
            onBuscar={buscar}
          >
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

            {/* [API] Hace que aparezca el error de categorías con un botón para reintentar. */}
            {errorCategorias && (
              <div role="alert">
                <p>{estados?.error?.titulo || (en ? "Something went wrong" : "Algo salió mal")}</p>
                <button type="button" className="boton-home primario" onClick={recargarCategorias}>
                  {estados?.error?.botones?.reintentar || (en ? "Retry" : "Reintentar")}
                </button>
              </div>
            )}

            {/* [API] Hace que aparezcan las categorías. */}
            {!cargandoCategorias && !errorCategorias && (
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

            {/* [API] Hace que aparezca el estado de carga de los eventos. */}
            {cargandoEventos && (
              <p style={{ marginTop: "3rem" }}>
                {estados?.cargando?.titulo || (en ? "Loading…" : "Cargando…")}
              </p>
            )}

            {/* [API] Hace que aparezca el error con un botón para reintentar. */}
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
                {/* [API] Hace que aparezcan los 4 primeros eventos destacados. */}
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

                {/* [API] Hace que aparezcan los siguientes 4 eventos (solo escritorio). */}
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

                {/* [API] Hace que aparezca la lista "Este fin de semana" (solo móvil). */}
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

      {/* [ACCESIBILIDAD] Hace que aparezca el panel de accesibilidad. */}
      <PanelAccesibilidad
        abierto={panelAbierto}
        onCerrar={cerrarAccesibilidad}
        en={en}
        textos={datos.textos?.accesibilidad}
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

      {/* [STATIC] Hace que aparezca el pie de página. */}
      <Footer
        textos={datos.textos?.footer}
        logo={datos.textos?.navbar?.logo}
        en={en}
        onNavegar={navegar}
        abrirAccesibilidad={abrirAccesibilidad}
      />

      {/* [API] Hace que aparezca el aviso de cookies en la primera visita. */}
      {!consentimiento && (
        <BannerCookies
          textos={datos.textos?.cookies?.banner}
          onAceptar={aceptarCookies}
          onRechazar={rechazarCookies}
        />
      )}

    </div>
  );
}

export default App;