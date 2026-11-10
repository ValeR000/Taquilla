# Taquilla 🎟️

Plataforma web para descubrir conciertos, teatro, deportes y festivales. Proyecto académico construido con **React + Vite** que consume la **Taquilla API** del curso.

**Demo en vivo:** https://taquilla-one.vercel.app/

> Sprint 1: Inicio público, Explorar eventos, cambio de idioma ES | EN y aviso de cookies, en web y móvil.

---

## Contenido

- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Cómo ejecutarlo](#cómo-ejecutarlo)
- [Rutas de la app](#rutas-de-la-app)
- [API](#api)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Convención de comentarios](#convención-de-comentarios)
- [Flujo de trabajo con Git](#flujo-de-trabajo-con-git)
- [Despliegue](#despliegue)
- [Decisiones y limitaciones](#decisiones-y-limitaciones)

---

## Funcionalidades

**Inicio público (`/`)**
- Hero con buscador (qué y dónde) y evento destacado.
- Categorías con su cantidad de eventos. En móvil se muestran como carrusel de píldoras con "Todos".
- Secciones *Destacados de la semana*, *Próximamente* (escritorio) y *Este fin de semana* (móvil).

**Explorar eventos (`/explorar`)**
- Lista paginada (9 eventos por página) con filtros por categoría, ciudad y búsqueda.
- Orden por fecha, precio o popularidad.
- Los filtros se guardan en la URL (`/explorar?categoria=teatro&pagina=2`) y se conservan al recargar o compartir el enlace.
- Chips de filtros activos, panel de filtros lateral en escritorio y a pantalla completa en móvil.
- Estados de carga, vacío y error con botón **Reintentar**.

**Para todo el sitio**
- Interfaz en **español e inglés**. Todos los textos vienen de la API y `<html lang>` cambia con el idioma.
- **Aviso de cookies** en la primera visita. Si la persona acepta, se recuerda el idioma.
- **Panel de accesibilidad:** tamaño de texto, alto contraste, reducir movimiento, subrayar enlaces y espaciado de lectura.
- Navegación con teclado, foco visible y responsive de 390 a 1440 px.

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

> El enunciado pide Next.js con TypeScript. Usamos Vite + React con JavaScript por autorización de la profesora.

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

**Otros comandos**

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga automática |
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm run preview` | Sirve la versión de producción para revisarla en local |

---

## Rutas de la app

| Ruta | Vista |
|---|---|
| `/` | Inicio público |
| `/explorar` | Explorar eventos (acepta `?categoria=`, `?ciudad=`, `?q=`, `?orden=` y `?pagina=`) |
| `/eventos/{slug}` | Detalle del evento *(Sprint 2; por ahora muestra el Inicio)* |
| `/ingresar` | Iniciar sesión *(Sprint 2; por ahora muestra el Inicio)* |
| `/registro` | Crear cuenta *(Sprint 2; por ahora muestra el Inicio)* |

Los botones Atrás y Adelante del navegador funcionan entre vistas.

---

## API

**Dirección base:** `https://yanethm-taquilla-api.fly.dev/api/v1`
**Documentación:** https://yanethm-taquilla-api.fly.dev/docs

| Endpoint | Para qué | Hook |
|---|---|---|
| `GET /textos?idioma=es\|en` | Todos los textos de la interfaz | `useTextos` |
| `GET /eventos/destacados` | Eventos del Inicio | `useEventosDestacados` |
| `GET /categorias` | Categorías con su cantidad de eventos | `useCategorias` |
| `GET /ciudades` | Ciudades para los filtros | `useCiudades` |
| `GET /eventos` | Lista paginada con filtros y orden | `useEventos` |

Todos los hooks siguen el mismo patrón: tres estados (`datos`, `cargando` y `error`), un `useEffect` que hace el `fetch` y cancela la petición si el componente desaparece, y una función `recargar` para el botón Reintentar.

**Probar los estados:** agrega a cualquier petición la cabecera `X-Simular-Latencia: 2000` para ver la carga, o `X-Simular-Error: 503` para ver el error.

---

## Estructura del proyecto

```text
src/
├── assets/                 # SVG del logo y del ícono de accesibilidad
├── components/
│   ├── layout/             # Se repiten en todas las vistas
│   │   ├── Footer/
│   │   ├── MenuMovil/
│   │   └── Navbar/
│   └── ui/                 # Componentes reutilizables y vistas
│       ├── AficheEvento/        # Degradado de color de cada evento
│       ├── BannerCookies/       # Aviso de cookies
│       ├── Boton/               # Botón base
│       ├── BuscadorEventos/     # Buscador del Hero
│       ├── CategoriasEventos/   # Tarjetas / píldoras de categorías
│       ├── Etiqueta/            # Badge de categoría
│       ├── EventoDestacado/     # Tarjeta grande del Hero
│       ├── Explorar/            # Vista Explorar eventos
│       ├── Flecha/              # Flecha de "Ver todos"
│       ├── Hero/                # Cabecera del Inicio
│       ├── Icono.jsx            # Catálogo de íconos de la interfaz
│       ├── IconoEvento/         # Íconos de fecha, lugar y categorías
│       ├── Input/               # Campo de texto base
│       ├── Paginacion/          # ‹ 1 2 3 … 6 ›
│       ├── PanelAccesibilidad/  # Ajustes de accesibilidad
│       ├── PanelFiltros/        # Filtros de Explorar (escritorio y móvil)
│       ├── SeccionEventos/      # Bloque de tarjetas con título
│       ├── SeccionFinDeSemana/  # Lista "Este fin de semana" (móvil)
│       ├── SelectorIdioma/      # ES | EN
│       └── TarjetaEvento/       # Tarjeta de un evento
├── hooks/                  # Un hook por endpoint de la API
├── services/
│   └── cookies.js          # Leer, guardar y borrar cookies
├── styles/
│   ├── global.css          # Estilos base y clases de accesibilidad
│   └── tokens.css          # Colores, tipografía, espacios y radios de Figma
├── utils/
│   ├── formato.js          # Dinero (COP) y fechas (America/Bogota)
│   └── textosLocales.js    # Textos que la API no trae, en ES y EN
├── App.jsx                 # Une layout, vistas, idioma, cookies y rutas
├── App.css
└── main.jsx
```

---

## Convención de comentarios

Para trabajar en equipo sin perdernos, todo el código sigue la misma forma:

- **Cabecera de una línea** en cada archivo:
  ```js
  // RESPONSABILIDAD: Tarjeta con el resumen de un evento y el enlace a su detalle.
  ```
- **Etiquetas de origen del dato:**

  | Etiqueta | Significa |
  |---|---|
  | `[API]` | Dato que viene de la API |
  | `[LOCAL]` | Lógica de React: estados, eventos, variables calculadas |
  | `[STATIC]` | Código fijo de diseño: HTML, SVG, listas y textos de respaldo |
  | `[ACCESIBILIDAD]` | Teclado, foco, `aria-label` y lectores de pantalla |

- **Comentarios orientados a la acción:** siempre empiezan con "Hace que…".
  ```js
  // [ACCESIBILIDAD] Hace que el lector de pantalla anuncie qué evento se va a abrir.
  ```
- **En CSS:** `/* RESPONSABILIDAD: ... */`, `/* SECCIÓN: ... */` y `/* Hace que... */`.

---

## Flujo de trabajo con Git

Cada historia de usuario se trabajó en una rama `feature/` y se integró a `main` con un Pull Request.

| Rama | Historia | Contenido |
|---|---|---|
| `main` | — | Versión estable, aprobada y desplegada en Vercel |
| `feature/componentes-base` | US-TAQ-S1-01 | Configuración, `.env`, tokens, estilos globales, `Boton`, `Input` y `Etiqueta` |
| `feature/mobile-ui` | US-TAQ-S1-02 | `Navbar`, `Footer` y `MenuMovil` |
| `feature/vista-inicio` | US-TAQ-S1-03 | `Hero`, categorías, secciones de eventos y tarjetas |
| `feature/explorar-ui` | US-TAQ-S1-04 | `useEventos`, `Explorar`, `PanelFiltros`, `Paginacion` y filtros en la URL |
| `feature/panel-accesibilidad` | US-TAQ-S1-05 y S1-06 | `PanelAccesibilidad`, cookies, `BannerCookies` y `textosLocales.js` |

> Idioma (S1-05) y cookies (S1-06) comparten rama porque están muy relacionados (el idioma se guarda en una cookie), pero cada funcionalidad tiene commits separados.

**Commits convencionales:** `feat:` (funcionalidad nueva), `fix:` (corrección), `docs:` (documentación), `style:` (solo formato) y `refactor:` (reorganizar sin cambiar el funcionamiento).

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

- La variable `VITE_API_URL` está configurada en *Settings → Environment Variables* de Vercel.
- `vercel.json` redirige todas las rutas a `index.html`. Sin él, recargar en `/explorar` daría 404.
  ```json
  { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
  ```

---

## Decisiones y limitaciones

- **Fecha y Precio** del panel de filtros son solo visuales: `GET /eventos` no tiene esos parámetros, y filtrar en el navegador dañaría el total y la paginación.
- **Categoría única** en los filtros, porque la API acepta un solo `categoria`.
- **Textos que la API no trae** (título de Explorar y algunos `aria-label`) están en `utils/textosLocales.js`, en español e inglés. Cada texto de la API tiene además un respaldo por si la API no responde.
- **El catálogo no se traduce:** nombres de eventos, recintos y categorías se muestran tal como vienen de la API.
- **Tokens:** todos los colores salen de `tokens.css`. Tamaños y espacios pueden ir directos, por indicación de la profesora.
- **Pendiente para el Sprint 2:** vista de detalle, login, registro, páginas de Términos y Declaración de accesibilidad, y guardar los ajustes del panel de accesibilidad al recargar.

El documento completo de decisiones está en `Taquilla_Decisiones_Sprint1.docx`.

---

*Proyecto académico. Los datos son de ejemplo.*
