# Taquilla

Plataforma web para descubrir conciertos, teatro, deportes y festivales. Proyecto académico construido con **React + Vite** que consume la **Taquilla API** del curso.

**Demo en vivo:** https://taquilla-one.vercel.app/

> **Sprint 2.** Detalle de un evento, estados de carga, vacío y error, iniciar sesión y mantener la sesión, en web y móvil.
> El proyecto sigue en Vite + React. La migración a Next.js es del Sprint 3.

---

## Contenido

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Rutas de la app](#rutas-de-la-app)
- [API](#api)
- [Cuenta de prueba](#cuenta-de-prueba)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Patrón de componentes](#patrón-de-componentes)
- [Convención de comentarios](#convención-de-comentarios)
- [Flujo de trabajo con Git](#flujo-de-trabajo-con-git)
- [Despliegue](#despliegue)
- [Decisiones y limitaciones](#decisiones-y-limitaciones)

---

## Funcionalidades

### Sprint 1

**Inicio público (`/`)**
- Hero con buscador (qué y dónde) y evento destacado.
- Categorías con su cantidad de eventos. En móvil se muestran como carrusel de píldoras con "Todos".
- Secciones *Destacados de la semana*, *Próximamente* (escritorio) y *Este fin de semana* (móvil).

**Explorar eventos (`/explorar`)**
- Lista paginada (9 eventos por página) con filtros por categoría, ciudad y búsqueda.
- Orden por fecha, precio o popularidad.
- Los filtros se guardan en la URL (`/explorar?categoria=teatro&pagina=2`) y se conservan al recargar o compartir el enlace.
- Chips de filtros activos, panel de filtros lateral en escritorio y a pantalla completa en móvil.

**Para todo el sitio**
- Interfaz en **español e inglés**. Todos los textos vienen de la API y `<html lang>` cambia con el idioma.
- **Aviso de cookies** en la primera visita. Si la persona acepta, se recuerda el idioma.
- **Panel de accesibilidad:** tamaño de texto, alto contraste, reducir movimiento, subrayar enlaces y espaciado de lectura.
- Navegación con teclado, foco visible y responsive de 390 a 1440 px.

### Sprint 2

**Detalle de un evento (`/eventos/{slug}`)**
- Encabezado con el afiche (degradado de `afiche.color1` a `afiche.color2`), información, descripción y cómo llegar.
- Hora de puertas del evento y de cada función, desde `puertas` de la API. Si no viene, solo se muestra la hora.
- Funciones y localidades con su precio y disponibilidad (agotada o cuántas quedan).
- En Cómo llegar: mapa de OpenStreetMap con `recinto.ubicacion` y enlace «Ver en Google Maps» (abre en otra pestaña), y el parqueadero si existe. Sin `ubicacion`, se ve un recuadro con el nombre del mapa.
- Hasta 4 eventos relacionados.
- La página toma el título y la descripción del evento, y los restaura al salir.
- Si el evento no existe (404 `no_encontrado`), se muestra la página de no encontrado.

**Estados de carga, vacío y error** (Inicio, Explorar y Detalle)
- Esqueletos con la misma forma de la vista mientras cargan los datos.
- Estado vacío con mensaje claro (por ejemplo `/explorar?q=zzzz`).
- Estado de error con botón **Reintentar**. El mensaje sale de `textos.errores` según el `codigo` de la API.
- Después de Reintentar, el foco va al título si carga bien o al botón si vuelve a fallar.
- Los estados reservan su alto para que el footer no salte.

**Ingresar (`/ingresar`)**
- Formulario de correo y contraseña con etiquetas visibles.
- Botón con ojo para mostrar u ocultar la contraseña, que anuncia su estado.
- Si falta un dato, el mensaje aparece junto al campo y el foco va al primer campo con error.
- Mientras envía, el botón dice «Ingresando…» y no se puede enviar dos veces.
- **401 `credenciales_invalidas`:** un solo mensaje, sin decir si falló el correo o la contraseña.
- **429 `demasiadas_peticiones`:** bloquea el formulario con una cuenta regresiva de los segundos de `Retry-After`.
- **Error del servidor (500, 503, 504…):** mensaje de `textos.errores`.
- **Sin red:** error de conexión con botón para reintentar. Lo escrito se conserva.
- Enlaces a Crear cuenta y a «¿Olvidaste tu contraseña?».

**Sesión**
- La sesión se conserva al recargar.
- Con sesión: círculo con las iniciales y menú de la cuenta (nombre, correo y Cerrar sesión). En el menú móvil, una fila con la cuenta y Cerrar sesión.
- Sin sesión: botones Ingresar y Crear cuenta.
- El menú de la cuenta se cierra con Escape, con un clic afuera o al salir con Tab.
- **Cerrar sesión** llama a `DELETE /sesion` y vuelve al Inicio como visitante.
- **Sesión vencida** (401): lleva a `/ingresar` con un aviso de sesión terminada.
- Con sesión, `/ingresar` lleva al Inicio.

---

## Tecnologías

| Uso | Herramienta |
|---|---|
| Interfaz | React |
| Empaquetador y servidor de desarrollo | Vite |
| Lenguaje | JavaScript |
| Estilos | CSS puro, un archivo por componente, con tokens de diseño |
| Navegación | `history.pushState` (sin React Router) |
| Despliegue | Vercel |
| Pruebas de la API | Postman |

> El enunciado pide Next.js con TypeScript. Usamos Vite + React con JavaScript por autorización de la profesora. La migración a Next.js es del Sprint 3.

---

## Cómo ejecutarlo

**Requisitos:** Node.js y npm instalados.

1. Clona el repositorio y entra a la carpeta:
   ```bash
   git clone <url-del-repositorio>
   cd <carpeta-del-proyecto>
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Crea un archivo `.env` en la raíz con la dirección de la API:
   ```env
   VITE_API_URL=https://yanethm-taquilla-api.fly.dev/api/v1
   ```
   En Vite, las variables que lee el navegador deben empezar por `VITE_`.

4. Levanta el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre la dirección que muestra la terminal (normalmente http://localhost:5173).

**Comandos**

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción para revisarla en local |
| `npm run local` | Hace el build y lo sirve (`vite build && vite preview`). Sirve para medir el rendimiento en localhost |

---

## Rutas de la app

| Ruta | Vista |
|---|---|
| `/` | Inicio público |
| `/explorar` | Explorar eventos (acepta `?categoria=`, `?ciudad=`, `?q=`, `?orden=` y `?pagina=`) |
| `/eventos/{slug}` | Detalle del evento |
| `/ingresar` | Iniciar sesión (con sesión, lleva al Inicio) |
| `/registro` | Muestra el Inicio hasta el Sprint 3 |
| `/recuperar-clave` | Muestra el Inicio hasta el Sprint 3 |
| Cualquier otra | Página de no encontrado |

Los botones Atrás y Adelante del navegador funcionan entre vistas.

---

## API

**Dirección base:** la de `VITE_API_URL` (ver [Despliegue](#despliegue)).
**Contrato:** https://yanethm-taquilla-sustentacion.fly.dev/docs/contrato

| Endpoint | Para qué | Dónde |
|---|---|---|
| `GET /textos?idioma=es\|en` | Todos los textos de la interfaz | `useTextos` |
| `GET /eventos/destacados` | Eventos del Inicio | `useEventosDestacados` |
| `GET /categorias` | Categorías con su cantidad de eventos | `useCategorias` |
| `GET /ciudades` | Ciudades para los filtros | `useCiudades` |
| `GET /eventos` | Lista paginada con filtros y orden | `useEventos` |
| `GET /eventos/{slug}` | Detalle de un evento | `useEvento` |
| `GET /eventos/{slug}/relacionados` | Eventos relacionados (se muestran hasta 4) | `useRelacionados` |
| `POST /sesion` | Iniciar sesión | `Ingresar` |
| `GET /sesion` | Recuperar la sesión al cargar la app | `useSesion` |
| `DELETE /sesion` | Cerrar sesión | `useSesion` |

### `services/api.js`

| Función | Qué hace |
|---|---|
| `pedirJSON(url, { forzar })` | GET con caché en memoria. Si la misma URL ya se está pidiendo, reutiliza esa promesa, así cada endpoint se pide una sola vez. `forzar: true` borra la caché (Reintentar) |
| `enviarJSON(url, cuerpo)` | POST sin caché, con `credentials: "include"` para recibir la cookie de sesión |
| `pedirConSesion(url, metodo)` | GET o DELETE sin caché (`cache: "no-store"`) y con la cookie de sesión |

Las tres usan `leerRespuesta`. Si la respuesta falla, lanza un error con `estado` (HTTP), `codigo`, `campos` y `reintentarEn` (de `Retry-After` o de `detalles.reintentarEnSegundos`).

### Hooks

Los hooks de datos tienen `datos` (o su nombre propio), `cargando` y `error`, un `useEffect` que pide los datos y una función `recargar` para Reintentar.
No cancelan la petición: usan una **marca `vigente`**. Si el componente desaparece o cambia el slug, la marca pasa a `false` y la respuesta vieja no cambia el estado.

| Hook (Sprint 2) | Qué hace |
|---|---|
| `useEvento(slug)` | Pide el evento. Devuelve también `codigo` y `noEncontrado` (404 `no_encontrado`) |
| `useRelacionados(slug)` | Pide los relacionados y se queda con 4. Solo pide cuando hay slug |
| `useSesion()` | Recupera la sesión con `GET /sesion`, la guarda al ingresar (`iniciar`), la cierra con `DELETE /sesion` (`cerrar`) e indica si venció (`vencida`) |
| `useMetadatos(titulo, descripcion)` | Pone `document.title` y `<meta name="description">` y los restaura al salir |
| `useReintento(...)` | Maneja el foco al pulsar Reintentar: al título si carga bien, al botón si vuelve a fallar |

### Probar los estados

Agrega estas cabeceras a la petición (por ejemplo en Postman):

| Cabecera | Para ver |
|---|---|
| `X-Simular-Latencia: 2000` | El estado de carga (2 segundos de espera) |
| `X-Simular-Error: 503` | El estado de error |

Para el estado vacío: `/explorar?q=zzzz`.

---

## Cuenta de prueba

| Correo | Contraseña |
|---|---|
| `laura@taquilla.test` | `taquilla123` |

- El nombre que se muestra en el menú de la cuenta viene de la API.
- La API bloquea un correo unos 5 minutos después de 5 ingresos fallidos (429).

---

## Estructura del proyecto

```text
src/
├── assets/                       # SVG del logo, del logo del footer y del ícono de accesibilidad
├── components/
│   ├── layout/                   # Se repiten en todas las vistas
│   │   ├── Footer/
│   │   ├── MenuMovil/
│   │   └── Navbar/
│   └── ui/                       # Componentes reutilizables y vistas
│       ├── AficheEvento/         # Degradado de color de cada evento
│       ├── Aviso/                # Mensaje de estado dentro de un formulario (Sprint 2)
│       ├── BannerCookies/        # Aviso de cookies
│       ├── Boton/                # Botón base
│       ├── BuscadorEventos/      # Buscador del Hero
│       ├── CategoriasEventos/    # Tarjetas / píldoras de categorías
│       ├── DetalleEvento/        # Vista de detalle y su esqueleto (Sprint 2)
│       ├── EncabezadoSeccion/    # Título, descripción y acción de una sección
│       ├── EstadoMensaje/        # Estado de carga, vacío o error con botón
│       ├── Etiqueta/             # Badge de categoría
│       ├── EventoDestacado/      # Tarjeta grande del Hero
│       ├── Explorar/             # Vista Explorar eventos
│       ├── FilaDisponibilidad/   # Fila de una función o localidad (Sprint 2)
│       ├── Flecha/               # Flecha de "Ver todos"
│       ├── Hero/                 # Cabecera del Inicio
│       ├── Icono.jsx             # Catálogo de íconos de la interfaz
│       ├── IconoEvento/          # Íconos de fecha, lugar y categorías
│       ├── Ingresar/             # Vista Ingresar (Sprint 2)
│       ├── Input/                # Campo de texto base
│       ├── MenuUsuario/          # Cuenta y Cerrar sesión (Sprint 2)
│       ├── Migas/                # Ruta de navegación (Sprint 2)
│       ├── NoEncontrado/         # Página de no encontrado (Sprint 2)
│       ├── Paginacion/           # ‹ 1 2 3 … 6 ›
│       ├── PanelAccesibilidad/   # Ajustes de accesibilidad
│       ├── PanelFiltros/         # Filtros de Explorar (escritorio y móvil)
│       ├── SeccionEventos/       # Bloque de tarjetas con título
│       ├── SeccionFinDeSemana/   # Lista "Este fin de semana" (móvil)
│       ├── SelectorIdioma/       # ES | EN
│       ├── TarjetaEvento/        # Tarjeta de un evento
│       └── TarjetasEsqueleto/    # Tarjetas mientras cargan los eventos (Sprint 2)
├── hooks/
│   ├── useCategorias.js
│   ├── useCiudades.js
│   ├── useEvento.js              # Sprint 2
│   ├── useEventos.js
│   ├── useEventosDestacados.js
│   ├── useMetadatos.js           # Sprint 2
│   ├── useReintento.js           # Sprint 2
│   ├── useRelacionados.js        # Sprint 2
│   ├── useSesion.js              # Sprint 2
│   └── useTextos.js
├── services/
│   ├── api.js                    # pedirJSON, enviarJSON y pedirConSesion
│   └── cookies.js                # Leer, guardar y borrar cookies
├── styles/
│   ├── global.css                # Estilos base y clases de accesibilidad
│   └── tokens.css                # Colores, familia tipográfica y tamaños de letra
├── utils/
│   ├── categorias.js             # nombreCategoria a partir del id (Sprint 2)
│   ├── formato.js                # Dinero (COP) y fechas (America/Bogota)
│   ├── textosError.js            # Mensaje de error según el codigo de la API (Sprint 2)
│   ├── textosLocales.js          # Textos que la API no trae, en ES y EN
│   └── traductor.js              # crearTraductor: texto de la API o su respaldo
├── App.jsx                       # Une layout, vistas, idioma, cookies, sesión y rutas
├── App.css
└── main.jsx
```

---

## Patrón de componentes

- **Los componentes de `ui` reciben props listas:** datos, textos ya traducidos y funciones. Por ejemplo, `EstadoMensaje` recibe `textoAccion` y `onAccion`, y `TarjetaEvento` recibe `textoAccion`, `textoDesde` y `onAccion`.
- **Las vistas traducen los textos** con `crearTraductor` y se los pasan a sus hijos. `App` resuelve los textos del Inicio en `textosDelInicio`.
- **El estado vive en el padre común.** Por ejemplo, las preferencias de accesibilidad son un solo estado en `App`, y `PanelAccesibilidad` avisa con `onCambiar(clave, valor)`.

---

## Convención de comentarios

**Sprint 1.** Cada archivo tiene una cabecera y etiquetas de origen del dato:

```js
// RESPONSABILIDAD: Tarjeta con el resumen de un evento y el enlace a su detalle.
```

| Etiqueta | Significa |
|---|---|
| `[API]` | Dato que viene de la API |
| `[LOCAL]` | Lógica de React: estados, eventos, variables calculadas |
| `[STATIC]` | Código fijo de diseño: HTML, SVG, listas y textos de respaldo |
| `[ACCESIBILIDAD]` | Teclado, foco, `aria-label` y lectores de pantalla |

Los comentarios empiezan con "Hace que…". En CSS: `/* RESPONSABILIDAD: ... */`, `/* SECCIÓN: ... */` y `/* Hace que... */`.

**Sprint 2.** Los cambios se marcan así:

| Caso | Marca |
|---|---|
| Una línea | `// Sprint 2: lo que hace` al final de la línea |
| Un bloque (2 o más líneas) | Abre con `/* SPRINT 2: lo que hace */` y cierra con `/* SPRINT 2 */` |
| Archivo nuevo | Primera línea `/* SPRINT 2: lo que hace el archivo */` |
| JSX | `{/* Sprint 2: ... */}` o `{/* SPRINT 2: ... */}` ... `{/* SPRINT 2 */}` |

---

## Flujo de trabajo con Git

Cada historia de usuario se trabajó en una rama y se integró a `main` con un Pull Request.

### Sprint 1

| Rama | Historia | Contenido |
|---|---|---|
| `main` | — | Versión estable, aprobada y desplegada en Vercel |
| `feature/componentes-base` | US-TAQ-S1-01 | Configuración, `.env`, tokens, estilos globales, `Boton`, `Input` y `Etiqueta` |
| `feature/mobile-ui` | US-TAQ-S1-02 | `Navbar`, `Footer` y `MenuMovil` |
| `feature/vista-inicio` | US-TAQ-S1-03 | `Hero`, categorías, secciones de eventos y tarjetas |
| `feature/explorar-ui` | US-TAQ-S1-04 | `useEventos`, `Explorar`, `PanelFiltros`, `Paginacion` y filtros en la URL |
| `feature/panel-accesibilidad` | US-TAQ-S1-05 y S1-06 | `PanelAccesibilidad`, cookies, `BannerCookies` y `textosLocales.js` |

> Idioma (S1-05) y cookies (S1-06) comparten rama porque están muy relacionados (el idioma se guarda en una cookie), pero cada funcionalidad tiene commits separados.

### Sprint 2

| Rama | PR | Historia | Contenido |
|---|---|---|---|
| `feature/detalle-evento-2` | #13 | US-TAQ-S2-01 | Ruta `/eventos/{slug}`, `useEvento` y `useRelacionados`, vista de detalle en web, tablet y móvil, hora de puertas, título y descripción de la página, y no encontrado |
| `feature/estados-vistas-2` | #14 | US-TAQ-S2-02 | Esqueletos en Explorar, Detalle, relacionados, fin de semana y Hero; error con Reintentar en relacionados y categorías; mensaje según el `codigo`; foco después de Reintentar; alto reservado |
| `feature/iniciar-sesion-2` | #15 | US-TAQ-S2-03 | `enviarJSON`, `Input` con `ref`, `aria-invalid`, `aria-describedby` y botón de acción, íconos de ojo, vista Ingresar con `POST /sesion` y `useMetadatos` |
| `feature/errores-ingreso-2` | #16 | US-TAQ-S2-04 | Componente `Aviso`, estado «Ingresando…», errores y espera del 429; `reintentarEn` también desde `detalles.reintentarEnSegundos` |
| `feature/sesion-2` | #17 | US-TAQ-S2-05 | `GET` y `DELETE /sesion`, `MenuUsuario`, cuenta en Navbar y menú móvil, sesión vencida, `leerRespuesta` compartida, rutas desconocidas a no encontrado, `Boton` grande y ajustes del footer |
| `refactor/componentes-2` | #18 | Calidad del código | Props listas en `TarjetaEvento`, `EstadoMensaje`, `MenuUsuario`, `BuscadorEventos` y las del Inicio; componentes `TarjetasEsqueleto`, `Migas` y `FilaDisponibilidad`; `nombreCategoria` en `utils`; un solo estado de preferencias |
| `fix/errores-servidor-2` | #19 | US-TAQ-S2-04 y calidad del código | Los errores 500, 503 y 504 muestran el mensaje de `textos.errores`; el de conexión queda solo para cuando no hay red. Marcas de comentarios del Sprint 2 |

**Commits convencionales:** `feat:` (funcionalidad nueva), `fix:` (corrección), `docs:` (documentación), `style:` (solo formato), `refactor:` (reorganizar sin cambiar el funcionamiento) y `chore:` (tareas de mantenimiento).

```bash
git checkout -b feature/nombre-de-la-historia
git add .
git commit -m "feat: descripción corta del cambio"
git push origin feature/nombre-de-la-historia
# Luego se abre el Pull Request hacia main en GitHub
```

---

## Despliegue

El proyecto se despliega en **Vercel**: cada cambio que se integra a `main` genera una nueva versión.

**Enlace:** https://taquilla-one.vercel.app/

| Entorno | `VITE_API_URL` |
|---|---|
| `.env` local | `https://yanethm-taquilla-api.fly.dev/api/v1` (API normal) |
| Vercel | `https://yanethm-taquilla-api.fly.dev/api/v1` (API normal), configurada en *Settings → Environment Variables* |

> La API de sustentación (`https://yanethm-taquilla-sustentacion.fly.dev/api/v1`) no trae `puertas`, `recinto.parqueadero` ni `recinto.ubicacion`. Con ella el Detalle no muestra puertas, parqueadero ni mapa.

- `vercel.json` redirige todas las rutas a `index.html`. Sin él, recargar en `/explorar` o en `/eventos/{slug}` daría 404.
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```
- `vite.config.js` agrega un `preconnect` al origen de la API para que la primera petición llegue antes.

---

## Decisiones y limitaciones

### Sprint 1

- **Fecha y Precio** del panel de filtros son solo visuales: `GET /eventos` no tiene esos parámetros, y filtrar en el navegador dañaría el total y la paginación.
- **Categoría única** en los filtros, porque la API acepta un solo `categoria`.
- **Textos que la API no trae** están en `utils/textosLocales.js`, en español e inglés. Cada texto de la API tiene además un respaldo con `tr(valor, es, en)`.
- **El catálogo no se traduce:** nombres de eventos, recintos y categorías se muestran tal como vienen de la API.
- **Tokens:** `tokens.css` solo tiene colores, familia tipográfica y tamaños de letra. Las distancias van en px directo, por indicación de la profesora.

El detalle completo está en el documento de decisiones del Sprint 1, entregado aparte.

### Sprint 2

**Sesión con la cookie de la API**
- La API devuelve la cookie `sesion`. Las peticiones de sesión usan `credentials: "include"` para enviarla y recibirla.
- El token **no** se guarda en el navegador. En `localStorage` solo va una marca (`sesionIniciada`) que dice si la persona ingresó.
- Con la marca, la app pide `GET /sesion` al cargar. Sin la marca, no la pide: así no se consulta la sesión de quien no ha ingresado.
- Si hay marca y la API responde 401, la sesión venció: se quita la marca y se lleva a la persona a ingresar.

**Limitación:** la cookie es de otro dominio (la API en fly.dev). Safari, el modo incógnito y Brave bloquean las cookies de terceros, así que ahí la sesión no se conserva al recargar.

**Equivalencias con Next.js**

| Next.js | En este proyecto |
|---|---|
| `/eventos/[slug]` | `/eventos/{slug}` con `history.pushState`; el slug se lee de `window.location.pathname` |
| `generateMetadata` | `useMetadatos` |
| `notFound()` | `NoEncontrado`, con los textos de `paginas.noEncontrado` |
| `loading.tsx` | Esqueletos (`DetalleEsqueleto`, `TarjetasEsqueleto`) |
| `error.tsx` | `EstadoMensaje` con Reintentar |

**Datos de Figma que no están en la API**
- **Invitada:** la etiqueta «Invitada:» de Figma no se muestra; se muestran los `artistas` de la API.
- **Pestaña Políticas:** no se incluye. El detalle solo tiene las pestañas Descripción y Cómo llegar.

**Cómo llegar**
- La hora de puertas, el parqueadero y la ubicación vienen de la API (`puertas`, `recinto.parqueadero` y `recinto.ubicacion`). Si un evento no los trae, esa parte no se muestra.
- El mapa es un `iframe` de OpenStreetMap (`export/embed.html` con `bbox` alrededor del punto y `marker`), sin librerías.

**Textos:** los que no están en `/textos` (secciones del detalle, funciones, localidades, leer menos, parqueadero, «Ver en Google Maps», «se abre en otra pestaña» y el aviso al terminar la espera del 429) van en `textosLocales.js`.

**Fuera del Sprint 2:** crear cuenta, verificación de correo y recuperación de contraseña son del Sprint 3. Compra y selección de asientos no se implementan.

---

*Proyecto académico. Los datos son de ejemplo.*
