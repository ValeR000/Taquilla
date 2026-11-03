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

import { leerCookie, guardarCookie, borrarCookie } from "./services/cookies.js";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);


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
        textoGrande={textoGrande}
        alternarTexto={() => setTextoGrande((valor) => !valor)}
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

        {/* SECCIÓN: CATEGORÍAS */}
        {cargandoCategorias && <p>Cargando categorías...</p>}

        {!cargandoCategorias && (
          <CategoriasEventos
            categorias={categorias}
            filtros={filtroCategoria}
            filtrarCategoria={setFiltroCategoria}
          />
        )}

        {/* SECCIÓN: EVENTOS DESTACADOS */}
        {cargandoEventos && (
          <p style={{ marginTop: "3rem" }}>Cargando eventos...</p>
        )}

        {errorEventos && (
          <p style={{ marginTop: "3rem" }}>Hubo un error al cargar los eventos.</p>
        )}

        {!cargandoEventos && !errorEventos && (
          <section style={{ marginTop: "3rem" }}>
            <h2>Destacados de la semana</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "24px",
                marginTop: "1.5rem"
              }}
            >
              {eventos.map((evento) => (
                <TarjetaEvento
                  key={evento.id}
                  evento={evento}
                  nombreCategoria={obtenerNombreCategoria(evento.categoria)}
                  onAbrir={() => alert(`Abriendo: ${evento.titulo}`)}
                />
              ))}
            </div>
          </section>
        )}

        {/* RESULTADO DEL BUSCADOR */}
        <p role="status" style={{ marginTop: "3rem" }}>
          {consulta
            ? `${ingles ? "Search submitted: " : "Búsqueda enviada: "} ${consulta}`
            : ingles
              ? "Select a link"
              : "Selecciona un enlace"}
        </p>

        <p>
          {ingles
            ? "This example loads navigation labels from the API"
            : "Este ejemplo carga los textos del menú desde la API"}
        </p>

      </main>

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