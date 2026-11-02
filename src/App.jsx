// ============================================================================
// ARCHIVO: App.jsx
// RESPONSABILIDAD: Componente principal. Une el Navbar, el Footer, maneja la 
// lógica de idiomas, el consentimiento de cookies y se conecta con la API.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

// 1. IMPORTACIONES
import { useTextos } from "./hooks/useTextos.js";
import "./App.css";
import Footer from "./components/layout/Footer/Footer.jsx";
import Navbar from "./components/layout/Navbar/Navbar.jsx"; 
import BannerCookies from "./components/ui/BannerCookies/BannerCookies.jsx";
import { leerCookie, guardarCookie, borrarCookie } from "./services/cookies.js";
import { useEffect, useState } from "react";

// 2. FUNCIONES AUXILIARES
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

  // [API] Extrae el título según la sección. Hace que el <h1> muestre el nombre correcto del menú.
  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  // [LOCAL] Verifica si es inglés. Hace que los textos de respaldo salgan en el idioma correcto.
  const ingles = idioma === "en";


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
  // BLOQUE D: FUNCIONES DEL COMPONENTE
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
      {/* [STATIC] Componente Navbar. */}
      <Navbar
        {...datos} 
        idioma={idioma} 
        cambiarIdioma={cambiarIdioma} // [LOCAL] Usa la nueva función con cookies.
        activo={activo} 
        onBuscar={buscar} 
        textoGrande={textoGrande} 
        alternarTexto={() => setTextoGrande((valor) => !valor)} 
      />
      
      {/* [STATIC] Contenedor principal. */}
      <main className="contenedor demo-contenido">
        <p>{ingles ? "English content" : "Contenido en español"}</p>
        <h1>{titulo ?? (ingles ? "Navigation" : "Navegación")}</h1>
        
        <p role="status" style={{ marginTop: '2rem' }}>
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

      {/* [STATIC] Componente Footer. */}
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