/* SPRINT 2: Vista de iniciar sesión en /ingresar: panel de presentación y formulario de correo y contraseña con POST /sesion */

import { useRef, useState } from "react";
import { useMetadatos } from "../../../hooks/useMetadatos.js";
import { enviarJSON } from "../../../services/api.js";
import { crearTraductor } from "../../../utils/traductor.js";
import logo from "../../../assets/logo-taquilla.svg";
import Boton from "../Boton/Boton.jsx";
import Icono from "../Icono.jsx";
import Input from "../Input/Input.jsx";
import "./Ingresar.css";

const API = `${import.meta.env.VITE_API_URL}/sesion`;

export default function Ingresar({ en, textos, onIngresar, onNavegar }) {
  const tr = crearTraductor(en);
  const t = textos?.paginas?.ingresar;
  const tf = t?.formulario;
  const te = t?.errores;
  const beneficios = t?.presentacion?.beneficios;
  const tLogo = textos?.navbar?.logo;

  const [correo, setCorreo] = useState("");
  const [clave, setClave] = useState("");
  const [verClave, setVerClave] = useState(false);
  const [mantenerSesion, setMantenerSesion] = useState(false);
  const [errores, setErrores] = useState({});

  const correoRef = useRef(null);
  const claveRef = useRef(null);

  useMetadatos(
    tr(t?.seo?.titulo, "Ingresar · Taquilla", "Log in · Taquilla"),
    tr(t?.seo?.descripcion, "Ingresa a tu cuenta de Taquilla.", "Log in to your Taquilla account.")
  );

  function marcarErrores(nuevos) {
    setErrores(nuevos);
    if (nuevos.correo) correoRef.current?.focus();
    else if (nuevos.clave) claveRef.current?.focus();
  }

  async function enviar(e) {
    e.preventDefault();

    const faltantes = {};
    if (!correo.trim()) faltantes.correo = tr(te?.correoObligatorio, "Escribe tu correo electrónico.", "Enter your email.");
    if (!clave) faltantes.clave = tr(te?.claveObligatoria, "Escribe tu contraseña.", "Enter your password.");
    marcarErrores(faltantes);
    if (faltantes.correo || faltantes.clave) return;

    try {
      const datos = await enviarJSON(API, { correo: correo.trim(), clave });
      onIngresar(datos.usuario);
    } catch (err) {
      if (err.codigo === "validacion" && err.campos) marcarErrores(err.campos);
    }
  }

  function irA(e, ruta) {
    e.preventDefault();
    onNavegar(ruta);
  }

  return (
    <main className="ingresar">
      <aside className="ingresar__panel">
        <a href="/" className="ingresar__logo" aria-label={tLogo?.aria} onClick={(e) => irA(e, "inicio")}>
          <span className="ingresar__logo-icono">
            <img src={logo} alt="" width="24" height="24" />
          </span>
          <span>{tr(tLogo?.texto, "Taquilla", "Taquilla")}</span>
        </a>

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

        <form className="ingresar__formulario" noValidate onSubmit={enviar}>
          <Input
            ref={correoRef}
            id="ingresar-correo"
            name="correo"
            type="email"
            autoComplete="email"
            label={tr(tf?.etiquetas?.correo, "Correo electrónico", "Email")}
            placeholder={tr(tf?.placeholders?.correo, "nombre@correo.com", "name@email.com")}
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
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
            onChange={(e) => setClave(e.target.value)}
            error={errores.clave}
            accion={
              <button
                type="button"
                className="ingresar__ver-clave"
                aria-label={tr(tf?.botones?.mostrarClave, "Mostrar contraseña", "Show password")}
                aria-pressed={verClave}
                aria-controls="ingresar-clave"
                onClick={() => setVerClave(!verClave)}
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

          <Boton type="submit" clase="ingresar__boton">
            {tr(tf?.botones?.ingresar, "Ingresar", "Log in")}
          </Boton>
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
