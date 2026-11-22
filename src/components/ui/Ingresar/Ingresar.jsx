/* SPRINT 2: Vista de iniciar sesión en /ingresar: panel de presentación y formulario de correo y contraseña con POST /sesion */

import { useEffect, useRef, useState } from "react";
import { useMetadatos } from "../../../hooks/useMetadatos.js";
import { enviarJSON } from "../../../services/api.js";
import { crearTraductor } from "../../../utils/traductor.js";
import { textosLocales } from "../../../utils/textosLocales.js";
import { textosError } from "../../../utils/textosError.js"; // Sprint 2
import Aviso from "../Aviso/Aviso.jsx";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono.jsx";
import Input from "../Input/Input.jsx";
import "./Ingresar.css";

const API = `${import.meta.env.VITE_API_URL}/sesion`;

export default function Ingresar({ en = false, textos, onIngresar, onNavegar, sesionVencida = false, onAvisoMostrado }) {
  const tr = crearTraductor(en);
  const t = textos?.paginas?.ingresar;
  const tf = t?.formulario;
  const te = t?.errores;
  const beneficios = t?.presentacion?.beneficios;
  const local = textosLocales[en ? "en" : "es"];

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [mantenerSesion, setMantenerSesion] = useState(false);
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState(sesionVencida ? "sesionVencida" : null);
  const [codigoError, setCodigoError] = useState(""); // Sprint 2: codigo del error de la API para elegir su mensaje
  const [enviando, setEnviando] = useState(false);
  const [espera, setEspera] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [anuncio, setAnuncio] = useState("");

  const correoRef = useRef(null);
  const claveRef = useRef(null);

  useMetadatos(
    tr(t?.seo?.titulo, "Ingresar · Taquilla", "Log in · Taquilla"),
    tr(t?.seo?.descripcion, "Ingresa a tu cuenta de Taquilla.", "Log in to your Taquilla account.")
  );

  useEffect(() => {
    if (segundos <= 0) return;

    const temporizador = setTimeout(() => {
      setSegundos((actuales) => actuales - 1);
      if (segundos === 1) {
        setAviso(null);
        setAnuncio(local.ingresoDisponible);
      }
    }, 1000);

    return () => clearTimeout(temporizador);
  }, [segundos, local.ingresoDisponible]);

  function marcarErrores(nuevos) {
    setErrores(nuevos);
    setAviso("campos");
    if (nuevos.correo) correoRef.current?.focus();
    else if (nuevos.clave) claveRef.current?.focus();
  }

  function limpiarErrores() {
    setErrores({});
    if (aviso !== "limite") setAviso(null);
  }

  async function enviar(e) {
    e.preventDefault();
    if (enviando || segundos > 0) return;

    setAnuncio("");
    limpiarErrores();

    const faltantes = {};
    if (!correo.trim()) faltantes.correo = tr(te?.correoObligatorio, "Escribe tu correo electrónico.", "Enter your email.");
    if (!clave) faltantes.clave = tr(te?.claveObligatoria, "Escribe tu contraseña.", "Enter your password.");
    if (faltantes.correo || faltantes.clave) {
      marcarErrores(faltantes);
      return;
    }

    setEnviando(true);

    try {
      const datos = await enviarJSON(API, { correo: correo.trim(), clave });
      onIngresar(datos.usuario);
    } catch (err) {
      setEnviando(false);

      if (err.codigo === "validacion" && err.campos) {
        marcarErrores(err.campos);
        return;
      }

      if (err.codigo === "credenciales_invalidas") {
        setAviso("credenciales");
        setClave("");
      } else if (err.codigo === "demasiadas_peticiones") {
        setEspera(err.reintentarEn);
        setSegundos(err.reintentarEn);
        setAviso("limite");
        /* SPRINT 2: Hace que un error de la API (500, 503, 504…) muestre su mensaje; el de conexión queda solo para cuando no hay red */
      } else if (err.estado) {
        setCodigoError(err.codigo || "");
        setAviso("error");
        /* SPRINT 2 */
      } else {
        setAviso("conexion");
      }

      claveRef.current?.focus();
    }
  }

  const tConexion = te?.conexion;
  const tLimite = te?.demasiadosIntentos;
  const errorApi = textosError(textos, codigoError, en); // Sprint 2: título, mensaje según el codigo y botón Reintentar

  const avisos = {
    sesionVencida: {
      tipo: "info",
      titulo: tr(textos?.estados?.sesionVencida?.titulo, "Tu sesión terminó", "Your session ended"),
      texto: tr(textos?.estados?.sesionVencida?.texto, "Vuelve a ingresar para continuar donde ibas.", "Log in again to pick up where you left off."),
    },
    campos: {
      titulo: tr(te?.camposObligatorios?.titulo, "Revisa los campos marcados", "Check the highlighted fields"),
      texto: tr(te?.camposObligatorios?.texto, "Para ingresar escribe tu correo y tu contraseña.", "To log in, enter your email and password."),
    },
    credenciales: {
      titulo: tr(te?.credenciales?.titulo, "Correo o contraseña incorrectos", "Incorrect email or password"),
      texto: tr(te?.credenciales?.texto, "Revisa los datos e inténtalo de nuevo. Si no recuerdas tu contraseña, puedes restablecerla.", "Check your details and try again. If you don't remember your password, you can reset it."),
    },
    limite: {
      titulo: tr(tLimite?.titulo, "Demasiados intentos", "Too many attempts"),
      texto: tr(tLimite?.texto, "Espera {segundos} segundos antes de volver a intentarlo.", "Wait {segundos} seconds before trying again.").replace("{segundos}", segundos),
      textoLector: tr(tLimite?.texto, "Espera {segundos} segundos antes de volver a intentarlo.", "Wait {segundos} seconds before trying again.").replace("{segundos}", espera),
    },
    conexion: {
      titulo: tr(tConexion?.titulo, "No pudimos conectarnos", "We couldn't connect"),
      texto: tr(tConexion?.texto, "Revisa tu conexión a internet e inténtalo de nuevo. Lo que escribiste se conserva.", "Check your internet connection and try again. What you typed is kept."),
    },
    error: { titulo: errorApi.titulo, texto: errorApi.texto }, // Sprint 2
  };

  useEffect(() => {
    if (!sesionVencida) return;
    setAnuncio(`${avisos.sesionVencida.titulo}. ${avisos.sesionVencida.texto}`);
    onAvisoMostrado();
  }, []);

  const textoBoton = aviso === "conexion"
    ? tr(tConexion?.botones?.reintentar, "Reintentar", "Try again")
    : aviso === "error" ? errorApi.textoAccion // Sprint 2: el mismo botón Reintentar después de un error de la API
    : tr(tf?.botones?.ingresar, "Ingresar", "Log in");

  function irA(e, ruta) {
    e.preventDefault();
    onNavegar(ruta);
  }

  return (
    <main className="ingresar">
      <aside className="ingresar__panel">
        <div className="ingresar__presentacion">
          <p className="ingresar__lema">{tr(t?.presentacion?.lema, "Tu próxima noche empieza aquí.", "Your next night out starts here.")}</p>
          <ul className="ingresar__beneficios">
            {[
              tr(beneficios?.descubre, "Descubre conciertos, teatro y deportes", "Discover concerts, theater and sports"),
              tr(beneficios?.filtra, "Filtra por categoría, fecha y ciudad", "Filter by category, date and city"),
              tr(beneficios?.consulta, "Consulta horario, lugar y cómo llegar", "Check the time, venue and how to get there"),
            ].map((beneficio) => (
              <li key={beneficio} className="ingresar__beneficio">
                <span className="ingresar__check"><Icono nombre="check" /></span>
                {beneficio}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <section className="ingresar__contenido" aria-labelledby="ingresar-titulo">
        <h1 id="ingresar-titulo" className="ingresar__titulo">{tr(tf?.titulo, "Ingresa a tu cuenta", "Log in to your account")}</h1>
        <p className="ingresar__subtitulo">{tr(tf?.subtitulo, "Ingresa con el correo y la contraseña de tu cuenta.", "Log in with the email and password of your account.")}</p>

        <form className="ingresar__formulario" noValidate aria-busy={enviando} onSubmit={enviar}>
          {aviso && <Aviso {...avisos[aviso]} />}

          <Input
            ref={correoRef}
            id="ingresar-correo"
            name="correo"
            type="email"
            autoComplete="email"
            label={tr(tf?.etiquetas?.correo, "Correo electrónico", "Email")}
            placeholder={tr(tf?.placeholders?.correo, "nombre@correo.com", "name@email.com")}
            value={correo}
            onChange={(e) => {
              setCorreo(e.target.value);
              limpiarErrores();
            }}
            error={errores.correo}
          />

          <Input
            ref={claveRef}
            id="ingresar-clave"
            name="clave"
            type={verClave ? "text" : "password"}
            autoComplete="current-password"
            label={tr(tf?.etiquetas?.clave, "Contraseña", "Password")}
            value={clave}
            onChange={(e) => {
              setClave(e.target.value);
              limpiarErrores();
            }}
            error={errores.clave}
            accion={
              <button
                type="button"
                className="ingresar__ver-clave"
                aria-label={tr(tf?.botones?.mostrarClave, "Mostrar contraseña", "Show password")}
                aria-pressed={verClave}
                aria-controls="ingresar-clave"
                onClick={() => setVerClave((actual) => !actual)}
              >
                <Icono nombre={verClave ? "ojoTachado" : "ojo"} />
              </button>
            }
          />

          <div className="ingresar__opciones">
            <label className="ingresar__mantener">
              <span className="ingresar__casilla">
                <input
                  type="checkbox"
                  name="mantenerSesion"
                  checked={mantenerSesion}
                  onChange={(e) => setMantenerSesion(e.target.checked)}
                />
                <Icono nombre="check" />
              </span>
              {tr(tf?.etiquetas?.mantenerSesion, "Mantener la sesión iniciada", "Keep me logged in")}
            </label>

            <a href="/recuperar-clave" className="ingresar__enlace" onClick={(e) => irA(e, "recuperar-clave")}>
              {tr(tf?.enlaces?.olvidasteClave, "¿Olvidaste tu contraseña?", "Forgot your password?")}
            </a>
          </div>

          <Boton
            type="submit"
            tamano="grande"
            clase={`ingresar__boton ${enviando ? "ingresar__boton--enviando" : ""}`}
            disabled={enviando || segundos > 0}
          >
            {enviando ? (
              <>
                <span className="ingresar__spinner" aria-hidden="true" />
                {tr(tf?.mensajes?.ingresando, "Ingresando…", "Logging in…")}
              </>
            ) : textoBoton}
          </Boton>

          <p className="solo-lectores" role="status">{anuncio}</p>
        </form>

        <p className="ingresar__registro">
          {tr(tf?.mensajes?.sinCuenta, "¿No tienes cuenta?", "Don't have an account?")}{" "}
          <a href="/registro" className="ingresar__enlace" onClick={(e) => irA(e, "registro")}>
            {tr(tf?.enlaces?.crearCuenta, "Crea una cuenta", "Create an account")}
          </a>
        </p>
      </section>
    </main>
  );
}
