// ============================================================================
// ARCHIVO: App.jsx
// RESPONSABILIDAD: Componente principal. Une el Navbar, el Footer, la vista de
// inicio (Hero, categorías y eventos), maneja la lógica de idiomas, cookies,
// filtros y la conexión a la API.
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
import TarjetaEvento from "./components/ui/TarjetaEvento/TarjetaEvento.jsx";
import Hero from "./components/ui/Hero/Hero.jsx";
import CategoriasEventos from "./components/ui/CategoriasEventos/CategoriasEventos.jsx";
import BuscadorEventos from "./components/ui/BuscadorEventos/BuscadorEventos.jsx"; // [LOCAL] Importación necesaria
import SeccionEventos from "./components/ui/SeccionEventos/SeccionEventos.jsx";

import { leerCookie, guardarCookie, borrarCookie } from "./services/cookies.js";
import { useEffect, useState } from "react";

import PanelAccesibilidad from "./components/ui/PanelAccesibilidad/PanelAccesibilidad.jsx";

// 2. FUNCIONES AUXILIARES
// [LOCAL] Lee el numeral de la URL.
function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

// 3. COMPONENTE PRINCIPAL
function App() {

  // ==========================================
  // BLOQUE A: ESTADOS
  // ==========================================

  const [consentimiento, setConsentimiento] = useState(() => leerCookie("consentimiento"));

  const [idioma, setIdioma] = useState(() => {
    return leerCookie("consentimiento") === "aceptado" && leerCookie("idioma") === "en" ? "en" : "es";
  });

  const [activo, setActivo] = useState(leerSeccion);
  const [consulta, setConsulta] = useState("");
  const [textoGrande, setTextoGrande] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState(null);

  // Estados para el Panel de Accesibilidad
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [tamanoTexto, setTamanoTexto] = useState(100); // 100%
  const [altoContraste, setAltoContraste] = useState(false);
  const [reducirMovimiento, setReducirMovimiento] = useState(false);
  const [subrayarEnlaces, setSubrayarEnlaces] = useState(false);
  const [espaciadoLectura, setEspaciadoLectura] = useState(false);

  // Funciones para el panel
  const abrirAccesibilidad = () => setPanelAbierto(!panelAbierto);
  const cerrarAccesibilidad = () => setPanelAbierto(false);
  const aumentarTexto = () => setTamanoTexto((prev) => Math.min(prev + 10, 150));
  const reducirTexto = () => setTamanoTexto((prev) => Math.max(prev - 10, 80));

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

  // [API] Obtenemos los eventos y su estado de carga.
  const { eventos, cargando: cargandoEventos, error: errorEventos } = useEventosDestacados();

  // [API] Obtenemos las categorías.
  const { categorias, cargando: cargandoCategorias } = useCategorias();

  // [API] Obtenemos las ciudades para el buscador.
  const { ciudades } = useCiudades();

  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  // [LOCAL] Verifica si es inglés.
  const ingles = idioma === "en";

  // [LOCAL] Variable auxiliar para pasársela al Hero (que espera una prop llamada 'en').
  const en = idioma === "en";

  // [LOCAL] Busca una categoría por su ID.
  const obtenerNombreCategoria = (idCategoria) => {
    const categoriaEncontrada = categorias.find((cat) => cat.id === idCategoria);
    return categoriaEncontrada ? categoriaEncontrada.nombre : idCategoria;
  };

  // [LOCAL] Simulamos las funciones de filtro que pide la profe.
  const setFiltros = (filtros) => console.log("Filtrando:", filtros);
  const filtrarCategoria = (categoria) => console.log("Categoría:", categoria);

  // [LOCAL] Para la tarjeta de la derecha, tomamos el primer evento de la API.
  const eventoDestacado = eventos?.[0];


  // ==========================================
  // BLOQUE C: EFECTOS
  // ==========================================

  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
      setConsulta("");
    }

    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

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

    return () => {
      document.documentElement.style.fontSize = "";
      document.body.classList.remove(
        "accesibilidad-alto-contraste",
        "accesibilidad-reducir-movimiento",
        "accesibilidad-subrayar-enlaces",
        "accesibilidad-espaciado-lectura"
      );
    };
  }, [tamanoTexto, altoContraste, reducirMovimiento, subrayarEnlaces, espaciadoLectura]);


  // ==========================================
  // BLOQUE D: FUNCIONES DEL COMPONENTE
  // ==========================================

  // [LOCAL] Recibe el objeto con los filtros desde el BuscadorEventos.
  function buscar(filtros) {
    console.log("Buscando con filtros:", filtros);
    setConsulta(filtros.consulta || ""); // Guardamos el texto para mostrarlo abajo.
    setActivo("explorar");
    window.history.replaceState(null, "", "#explorar");
  }

  function cambiarIdioma(nuevoIdioma) {
    setIdioma(nuevoIdioma);
    if (consentimiento === "aceptado") {
      guardarCookie("idioma", nuevoIdioma);
    }
  }

  function aceptarCookies() {
    guardarCookie("consentimiento", "aceptado");
    guardarCookie("idioma", idioma);
    setConsentimiento("aceptado");
  }

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
        abrirAccesibilidad={abrirAccesibilidad}
        accesibilidadAbierta={panelAbierto}
      />

      {/* ========================================== */}
      {/* SECCIÓN: HERO CON BUSCADOR                 */}
      {/* ========================================== */}
      {/* [STATIC] El Hero recibe el buscador como children. */}
      <Hero
        en={en} // [LOCAL] Le pasamos si es inglés o no.
        destacado={eventoDestacado} // [API] Le pasamos el primer evento.
        abrirEvento={() => alert("Abriendo...")}
        setFiltros={setFiltros}
        filtrarCategoria={filtrarCategoria}
      >
        {/* [LOCAL] El componente del buscador (con sus ciudades y eventos). */}
        <BuscadorEventos
          en={en}
          ciudades={ciudades || []}
          eventos={eventos || []}
          onBuscar={buscar}
        />
      </Hero>


      {/* ========================================== */}
      {/* SECCIÓN: CONTENIDO PRINCIPAL               */}
      {/* ========================================== */}
      <main className="contenedor demo-contenido">

        {/* CATEGORÍAS */}
        {cargandoCategorias && <p>Cargando categorías...</p>}

        {!cargandoCategorias && (
          <CategoriasEventos
            categorias={categorias}
            filtros={filtroCategoria}
            filtrarCategoria={setFiltroCategoria}
            en={en}
          />
        )}

        {/* ========================================== */}
        {/* SECCIÓN: EVENTOS (Cargando y Error)        */}
        {/* ========================================== */}
        {cargandoEventos && <p style={{ marginTop: "3rem" }}>Cargando eventos...</p>}

        {errorEventos && <p style={{ marginTop: "3rem" }}>Hubo un error al cargar los eventos.</p>}

        {/* ========================================== */}
        {/* SECCIÓN: EVENTOS DESTACADOS                */}
        {/* ========================================== */}
        {!cargandoEventos && !errorEventos && (
          <>
            {/* 1. PRIMERA SECCIÓN (Primeros 4 eventos de la API) */}
            <SeccionEventos
              id="eventos"
              titulo={en ? "This week's highlights" : "Destacados de la semana"}
              descripcion={en ? "The events with the most tickets sold in the last 7 days" : "Los eventos con más entradas vendidas en los últimos 7 días"}
              eventos={eventos.slice(0, 4)}
              categorias={categorias}
              en={en}
              onAbrir={(evento) => alert(`Abriendo: ${evento.titulo}`)}
              onVerTodos={() => {
                setActivo("explorar");
                window.history.replaceState(null, "", "#explorar");
              }}
            />

            {/* 2. SEGUNDA SECCIÓN (Siguientes 4 eventos de la API) */}
            <SeccionEventos
              id="proximos"
              titulo={en ? "Upcoming in Manizales" : "Próximamente en Manizales"}
              descripcion={en ? "Change the city from the search bar" : "Cambia la ciudad desde el buscador"}
              eventos={eventos.slice(4, 8)} // Toma desde el 5to hasta el 8vo evento
              categorias={categorias}
              en={en}
              onAbrir={(evento) => alert(`Abriendo: ${evento.titulo}`)}
              onVerTodos={() => {
                setActivo("explorar");
                window.history.replaceState(null, "", "#explorar");
              }}
            />
          </>
        )}

        {/* NOTA: No se agregan eventos manualmente. Todos vienen de la API. */}

      </main>

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

      {/* [STATIC] Footer. */}
      <Footer textos={datos.textos?.footer} />

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