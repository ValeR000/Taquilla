import { useTextos } from "./hooks/useTextos.js";
import "./App.css";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

function leerSeccion() {
  return window.location.hash.slice(1) || "inicio";
}

function App() {
  // Idiom por defecto español
  const [idioma, setIdioma] = useState("es");
  const [activo, setActivo] = useState(leerSeccion);
  const [consulta, setConsulta] = useState("");
  const [textoGrande, setTextoGrande] = useState(false);

  const datos = useTextos(idioma);
  console.log(datos);

  const ingles = idioma === "en";

  const titulo =
    activo === "favoritos"
      ? datos.textos?.navbar.botones.favoritos
      : datos.textos?.navbar.enlaces[activo];

  // Va a sincronizar el estado del componente con el hash de la URL
  useEffect(() => {
    function actualizar() {
      setActivo(leerSeccion());
      setConsulta("");
    }

    window.addEventListener("hashchange", actualizar);

    return () => window.removeEventListener("hashchange", actualizar);
  }, []);

  useEffect(() => {
    document.documentElement.lang;
  }, [idioma]);

  useEffect(() => {
    document.documentElement.style.fontSize = textoGrande ? "112%" : "";

    return () => {
      document.documentElement.style.fontSize = "";
    };
  }, [textoGrande]);

  function buscar(valor) {
    setConsulta(valor);
    setActivo("heroes");

    // window.history es el que da acceso al historial de la pestaña
    window.history.replaceState(null, "", "#heroes");
  }

  return (
    <>
      <Navbar
        {...datos}
        alternarTexto={()}=> setTextoGrande {(valor)=> !valor}
        />
        <main className="contenedor demo-contenido">
          <p>{ingles? "English content":"Contenido en español"}</p>
          <h1>{titulo ?? (ingles ? "Navigation":"Navegación")}</h1>
          <p role= "status">
            {consulta
             ? `$ingles? "Search submitted": "Busqueda enviada"}: &{Consulta}`
             :ingles
              ?"Select a link"
              :"selecciona un enlace"}
              </p>
              <p>
                ${ingles
                ? "This example loads navigation labels from the API"
                : "este ejemplo carga los textos del menu desde la API"}
                </p>
        </main>
    </>
  );
}

export default App; 