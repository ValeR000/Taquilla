// ============================================================================
// ARCHIVO: App.jsx
// RESPONSABILIDAD: Componente principal. Une el Navbar, el Footer, la vista de
// inicio (categorías y eventos destacados), maneja la lógica de idiomas, 
// cookies y conexión a la API.
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
import "./App.css";
import Footer from "./components/layout/Footer/Footer.jsx";
import Navbar from "./components/layout/Navbar/Navbar.jsx"; 
import BannerCookies from "./components/ui/BannerCookies/BannerCookies.jsx";
import TarjetaEvento from "./components/ui/TarjetaEvento/TarjetaEvento.jsx";
import { leerCookie, guardarCookie, borrarCookie } from "./services/cookies.js";
import { useEffect, useState } from "react";

// 2. FUNCIONES AUXILIARES (Fuera del componente)
// [LOCAL] Lee el numeral de la URL. Hace que la app sepa en qué sección está el usuario.
function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

// 3. COMPONENTE PRINCIPAL
function App() {
  
  // ==========================================
  // BLOQUE A: ESTADOS (La memoria de la aplicación)
  // ==========================================
  
  // [LOCAL] Lee la cookie de consentimiento al iniciar. Hace que la app recuerde si el usuario ya aceptó o rechazó.
  const [consentimiento, setConsentimiento] = useState(() => leerCookie("consentimiento"));
  
  // [LOCAL] Guarda el idioma. Hace que inicie en inglés si el usuario ya aceptó las cookies y guardó esa preferencia.
  const [idioma, setIdioma] = useState(() => {
    return leerCookie("consentimiento") === "aceptado" && leerCookie("idioma") === "en" ? "en" : "es";
  });

  // [LOCAL] Guarda la sección actual. Hace que el Navbar resalte el enlace en negrita.
  const [activo, setActivo] = useState(leerSeccion); 
  
  // [LOCAL] Guarda el texto del buscador. Hace que aparezca el mensaje de "Búsqueda enviada".
  const [consulta, setConsulta] = useState(""); 
  
  // [LOCAL] Estado falso/verdadero. Hace que la letra de toda la página se agrande si es true.
  const [textoGrande, setTextoGrande] = useState(false); 


  // ==========================================
  // BLOQUE B: CONEXIÓN CON LA API
  // ==========================================
  
  // [API] Llama al hook. Hace que la app obtenga todos los textos traducidos de la API.
  const datos = useTextos(idioma);

  // [API] Llama al hook. Hace que la app obtenga la lista de eventos destacados.
  // Se renombran las variables para evitar choques de nombres con las categorías.
  const { eventos, cargando: cargandoEventos, error: errorEventos } = useEventosDestacados();

  // [API] Llama al hook. Hace que la app obtenga la lista de categorías y su conteo.
  const { categorias, cargando: cargandoCategorias } = useCategorias();

  // [API] Extrae el título según la sección. Hace que el <h1> muestre el nombre correcto del menú.
  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  // [LOCAL] Verifica si es inglés. Hace que los textos de respaldo salgan en el idioma correcto.
  const ingles = idioma === "en";

  // [LOCAL] Busca una categoría por su ID. Hace que podamos mostrar el nombre en la tarjeta en lugar del ID técnico.
  const obtenerNombreCategoria = (idCategoria) => {
    const categoriaEncontrada = categorias.find((cat) => cat.id === idCategoria);
    return categoriaEncontrada ? categoriaEncontrada.nombre : idCategoria;
  };


  // ==========================================
  // BLOQUE C: EFECTOS (Sincronización con el navegador)
  // ==========================================

  // EFECTO 1: Escuchar cambios en la URL.
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion()); 
      setConsulta(""); 
    }
    window.addEventListener("hashchange", actualizar);
    return () => window.removeEventListener("hashchange", actualizar);
  }, []); 

  // EFECTO 2: Sincronizar el idioma con el HTML.
  useEffect(() => {
    // [LOCAL] Cambia la etiqueta <html>. Hace que los lectores de pantalla sepan el idioma.
    document.documentElement.lang = idioma;
  }, [idioma]); 

  // EFECTO 3: Controlar el tamaño de la letra.
  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]); 


  // ==========================================
  // BLOQUE D: FUNCIONES DEL COMPONENTE (Acciones del usuario)
  // ==========================================

  // [LOCAL] Recibe el texto buscado. Hace que la app cambie a "explorar" y guarde la búsqueda.
  function buscar(valor) {
    setConsulta(valor); 
    setActivo("explorar"); 
    window.history.replaceState(null, "", "#explorar");
  }

  // [LOCAL] Cambia el idioma. Hace que se guarde en la cookie solo si el usuario ya aceptó.
  function cambiarIdioma(nuevoIdioma) {
    setIdioma(nuevoIdioma);
    if (consentimiento === "aceptado") {
      guardarCookie("idioma", nuevoIdioma);
    }
  }

  // [LOCAL] Se ejecuta al hacer clic en "Aceptar". Hace que se guarden las cookies y desaparezca el banner.
  function aceptarCookies() {
    guardarCookie("consentimiento", "aceptado");
    guardarCookie("idioma", idioma);
    setConsentimiento("aceptado");
  }

  // [LOCAL] Se ejecuta al hacer clic en "Rechazar". Hace que se guarde el rechazo y se borre la cookie de idioma.
  function rechazarCookies() {
    guardarCookie("consentimiento", "rechazado");
    borrarCookie("idioma");
    setConsentimiento("rechazado");
  }


  // ==========================================
  // BLOQUE E: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================
  return (
    <>
      {/* [STATIC] Componente Navbar. Hace que aparezca la barra superior. */}
      <Navbar
        {...datos} 
        idioma={idioma} 
        cambiarIdioma={cambiarIdioma} 
        activo={activo} 
        onBuscar={buscar} 
        textoGrande={textoGrande} 
        alternarTexto={() => setTextoGrande((valor) => !valor)} 
      />
      
      {/* [STATIC] Contenedor principal. Hace que el contenido se centre en la pantalla. */}
      <main className="contenedor demo-contenido">
        
        {/* [LOCAL] Hace que aparezca "English content" o "Contenido en español" según el estado. */}
        <p>{ingles ? "English content" : "Contenido en español"}</p>
        
        {/* [API] Hace que aparezca el título obtenido de la API, o uno por defecto si falla. */}
        <h1>{titulo ?? (ingles ? "Navigation" : "Navegación")}</h1>
        
        {/* ========================================== */}
        {/* SECCIÓN: CATEGORÍAS (Desde la API)         */}
        {/* ========================================== */}
        
        {/* [LOCAL] Hace que aparezca un mensaje de carga mientras la API de categorías responde. */}
        {cargandoCategorias && <p>Cargando categorías...</p>}
        
        {/* [STATIC] Si ya cargaron, dibuja la lista de categorías. */}
        {!cargandoCategorias && (
          <section style={{ marginTop: '2rem' }}>
            <h2>Categorías</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
              {/* [API] Recorre las categorías y las dibuja como píldoras grises. */}
              {categorias.map((cat) => (
                <div key={cat.id} style={{ padding: '8px 16px', border: '1px solid var(--color-borde)', borderRadius: '20px', fontSize: '14px' }}>
                  {cat.nombre} ({cat.eventos})
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ========================================== */}
        {/* SECCIÓN: EVENTOS DESTACADOS (Desde la API) */}
        {/* ========================================== */}
        
        {/* [LOCAL] Hace que aparezca un mensaje de carga mientras la API de eventos responde. */}
        {cargandoEventos && <p style={{ marginTop: '2rem' }}>Cargando eventos...</p>}
        
        {/* [LOCAL] Hace que aparezca un mensaje si falla la conexión con la API de eventos. */}
        {errorEventos && <p style={{ marginTop: '2rem' }}>Hubo un error al cargar los eventos.</p>}
        
        {/* [STATIC] Si ya cargaron los eventos, dibuja la cuadrícula responsiva con las tarjetas. */}
        {!cargandoEventos && !errorEventos && (
          <section style={{ marginTop: '3rem' }}>
            <h2>Destacados de la semana</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '1.5rem' }}>
              {/* [API] Recorre los eventos y le pasa los datos a cada tarjeta. */}
              {eventos.map((evento) => (
                <TarjetaEvento 
                  key={evento.id} 
                  evento={evento} 
                  nombreCategoria={obtenerNombreCategoria(evento.categoria)} // [LOCAL] Pasa el nombre legible de la categoría.
                  onAbrir={() => alert(`Abriendo: ${evento.titulo}`)} // [LOCAL] Temporal para probar clics.
                />
              ))}
            </div>
          </section>
        )}

        {/* [LOCAL] Hace que aparezca el resultado del buscador o el mensaje de "Selecciona un enlace". */}
        <p role="status" style={{ marginTop: '3rem' }}>
          {consulta
            ? `${ingles ? "Search submitted: " : "Búsqueda enviada: "} ${consulta}`
            : ingles
            ? "Select a link"
            : "Selecciona un enlace"}
        </p>
        
        {/* [STATIC] Hace que aparezca el texto fijo de la plantilla de prueba. */}
        <p>
          {ingles
            ? "This example loads navigation labels from the API"
            : "Este ejemplo carga los textos del menú desde la API"}
        </p>
      </main>

      {/* [STATIC] Componente Footer. Hace que aparezca el pie de página. */}
      <Footer textos={datos.textos?.footer} />

      {/* [LOCAL] Hace que aparezca el banner de cookies SOLO si el usuario aún no ha decidido. */}
      {!consentimiento && (
        <BannerCookies 
          textos={datos.textos?.cookies?.banner} // [API] Textos del banner desde la API.
          onAceptar={aceptarCookies} // [LOCAL] Acción del botón Aceptar.
          onRechazar={rechazarCookies} // [LOCAL] Acción del botón Rechazar.
        />
      )}
    </>
  );
}

export default App;