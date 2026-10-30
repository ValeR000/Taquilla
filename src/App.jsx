// ============================================================================
// ARCHIVO: App.jsx
// RESPONSABILIDAD: Componente principal. Une el Navbar, el Footer, maneja la 
// lógica de idiomas y se conecta con la API mediante el hook useTextos.
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
import { useEffect, useState } from "react";

// 2. FUNCIONES AUXILIARES (Fuera del componente)
// [LOCAL] Lee el numeral de la URL. Hace que la app sepa en qué sección está el usuario (ej. "#explorar").
function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

// 3. COMPONENTE PRINCIPAL
function App() {
  
  // ==========================================
  // BLOQUE A: ESTADOS (La memoria de la aplicación)
  // ==========================================
  
  // [LOCAL] Guarda el idioma actual (inicia en "es"). Hace que la app se dibuje en español o inglés.
  const [idioma, setIdioma] = useState("es"); 
  
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
  // Usa "?." para que no explote si los datos de la API aún no llegan.
  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  // [LOCAL] Verifica si es inglés. Hace que los textos de respaldo (si la API falla) salgan en el idioma correcto.
  const ingles = idioma === "en";


  // ==========================================
  // BLOQUE C: EFECTOS (Sincronización con el navegador)
  // ==========================================

  // EFECTO 1: Escuchar cambios en la URL.
  useEffect(() => {
    // [LOCAL] Función que se activa al cambiar el # de la URL. Hace que la vista cambie sin recargar.
    function actualizar() {
      setActivo(leerSeccion()); 
      setConsulta(""); // Hace que el buscador se limpie al cambiar de página.
    }
    
    // [LOCAL] Pone a React a vigilar la URL.
    window.addEventListener("hashchange", actualizar);
    
    // [LOCAL] Limpieza: Hace que React deje de vigilar la URL si el componente se destruye.
    return () => window.removeEventListener("hashchange", actualizar);
  }, []); 

  // EFECTO 2: Sincronizar el idioma con el HTML.
  useEffect(() => {
    // [LOCAL] Cambia la etiqueta <html>. Hace que los lectores de pantalla y el navegador sepan el idioma.
    document.documentElement.lang = idioma;
  }, [idioma]); 

  // EFECTO 3: Controlar el tamaño de la letra.
  useEffect(() => {
    // [LOCAL] Cambia el tamaño base del HTML. Hace que el botón de "letra grande" funcione.
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";
    
    // [LOCAL] Limpieza: Hace que el tamaño vuelva a la normalidad si el componente desaparece.
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
    
    // [LOCAL] Modifica la URL. Hace que el navegador muestre el #explorar sin recargar la página.
    window.history.replaceState(null, "", "#explorar");
  }


  // ==========================================
  // BLOQUE E: LO QUE SE DIBUJA EN PANTALLA (JSX)
  // ==========================================
  return (
    <>
      {/* [STATIC] Componente Navbar. 
          Hace que aparezca la barra superior con menús, buscador y selector de idioma. */}
      <Navbar
        {...datos} // [API] Hace que el Navbar reciba los textos y estados de carga.
        idioma={idioma} // [LOCAL] Hace que el Navbar sepa qué idioma resaltar (ES/EN).
        cambiarIdioma={setIdioma} // [LOCAL] Hace que al hacer clic en ES/EN, el idioma cambie.
        activo={activo} // [LOCAL] Hace que el Navbar subraye el enlace actual.
        onBuscar={buscar} // [LOCAL] Hace que al buscar, se ejecute la función de arriba.
        textoGrande={textoGrande} // [LOCAL] Hace que el botón de accesibilidad sepa su estado.
        alternarTexto={() => setTextoGrande((valor) => !valor)} // [LOCAL] Hace que el tamaño cambie al hacer clic.
      />
      
      {/* [STATIC] Contenedor principal. Hace que el contenido se centre en la pantalla. */}
      <main className="contenedor demo-contenido">
        
        {/* [LOCAL] Hace que aparezca "English content" o "Contenido en español" según el estado. */}
        <p>{ingles ? "English content" : "Contenido en español"}</p>
        
        {/* [API] Hace que aparezca el título obtenido de la API, o uno por defecto si falla. */}
        <h1>{titulo ?? (ingles ? "Navigation" : "Navegación")}</h1>
        
        {/* [LOCAL] Hace que aparezca el resultado del buscador o el mensaje de "Selecciona un enlace". */}
        <p role="status">
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
      {/* [API] Le pasa los textos del pie de página. Hace que el Footer muestre los enlaces y textos correctos. */}
      <Footer textos={datos.textos?.footer} />
    </>
  );
}

export default App;