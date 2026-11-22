Uso de IA en Taquilla

Registro de cómo usé herramientas de IA en el proyecto, qué me respondieron, qué estaba mal y cómo lo verifiqué.

Herramientas usadas

Claude (chat): para planear cada historia, escribir los prompts, revisar los resúmenes de Claude Code y sacar las medidas de Figma de las capturas de Inspect.
Claude Code: para editar el código del repositorio, probar en el navegador y hacer los commits.

Cómo trabajé: la IA no decide sola. Cada cambio se pidió por pasos y se revisó contra la rúbrica, el contrato de la API y Figma antes de hacer push. Los errores de abajo se detectaron con esa revisión.

Errores de la IA
1. Breakpoint de móvil equivocado
Sprint: 1
Qué pedí: estilos de la versión móvil del Inicio.
Qué respondió la IA: asumió que el punto de corte de móvil era 768 px, un valor común en otros proyectos.
Por qué estaba mal: el proyecto usa 640 px para celular y 1100 px para tablet, según Figma.
Qué hice: se lo corregí y desde entonces los breakpoints quedaron escritos en CLAUDE.md para que no se volvieran a suponer.
Lección: la IA completa con valores "típicos" cuando le falta un dato; hay que darle las medidas reales.
2. Traducción de las categorías del catálogo
Sprint: 1
Qué pedí: que la interfaz cambiara entre español e inglés.
Qué respondió la IA: creó un objeto categoriasEn para traducir los nombres de las categorías.
Por qué estaba mal: la rúbrica dice que los datos del catálogo (eventos, recintos y categorías) no se traducen; se muestran como los entrega la API.
Qué hice: se quitó categoriasEn. Solo se traducen los textos de la interfaz que vienen de GET /textos.
Lección: antes de aceptar una solución, compararla con la rúbrica, no solo ver si "funciona".
3. Claves equivocadas del aviso de cookies
Sprint: 1 (detectado en la corrección después de la calificación)
Qué pasaba: con la página en inglés, el aviso de cookies seguía en español.
Qué respondió la IA: el componente BannerCookies buscaba las claves descripcion, rechazar y aceptar.
Por qué estaba mal: en la API se llaman texto, botones.rechazar y botones.aceptar. Como no las encontraba, siempre mostraba el texto de respaldo, que estaba solo en español.
Qué hice: revisé la respuesta real de GET /textos?idioma=en en Postman, corregí las claves y dejé el respaldo en los dos idiomas.
Lección: verificar los nombres de las claves contra la respuesta real de la API, no contra lo que la IA supone.
4. "Football" en lugar de "Soccer"
Sprint: 1 (corrección)
Qué pedí: la lista de Populares del Hero en inglés.
Qué respondió la IA: tradujo "Fútbol" como "Football".
Por qué estaba mal: la API usa "Soccer", y el término de búsqueda tiene que coincidir con los datos.
Qué hice: se cambió a "Soccer" en textosLocales.js.
5. Sesión vencida mal interpretada
Sprint: 2 (US-TAQ-S2-05)
Qué pedí: recuperar la sesión con GET /sesion; si responde 401, la persona queda sin sesión.
Qué hizo la IA: aplicó "401 → sin sesión" a todos los casos, también cuando la sesión había vencido.
Por qué estaba mal: el criterio 4 pide que, si la sesión vence, se lleve a la persona a Ingresar. Mi instrucción estaba pensada para visitantes sin sesión y no distinguía los dos casos.
Qué hice: se separaron los casos con una marca en localStorage: sin marca, la persona es visitante; con marca y 401, la sesión venció y va a /ingresar con el aviso "Tu sesión terminó". Lo detecté al comparar el resultado con los criterios de la historia.
Lección: una instrucción ambigua mía produce un error de la IA; hay que revisar cada criterio uno por uno.
Respuestas correctas verificadas
6. Cookie de sesión entre dominios
Sprint: 2 (US-TAQ-S2-03 y S2-05)
Qué pregunté: si la cookie sesion de la API funciona desde Vercel, que es otro dominio.
Qué respondió la IA: que funciona con credentials: "include" porque la API responde con SameSite=None; Secure y Access-Control-Allow-Credentials, pero que Safari, el modo incógnito y Brave bloquean las cookies de terceros. Propuso dos opciones: usar la cookie directa o un proxy en Vite y Vercel.
Qué hice: se probó con un fetch real desde localhost: la cookie se guardó, se envió en la siguiente petición y sobrevivió a la recarga. Elegí la cookie directa, porque es lo que el contrato de la API espera y el proxy habría que rehacerlo en el Sprint 3 con Next.js. La limitación quedó documentada en el README.
7. Rendimiento de React en localhost
Sprint: 1 (corrección)
Qué pasaba: en localhost, react-dom tardaba unos 5 segundos en cargar.
Qué respondió la IA: que en modo desarrollo Vite 8 agrega un sourcemap dentro del archivo (2,6 MB) que no se puede quitar, y que el tiempo medido venía también de la red simulada lenta (Fast 4G), la caché desactivada y el antivirus.
Qué hice: se agregó el script npm run local (build + preview). Con él la página pinta en unos 0,2 s, y lo comprobé en las herramientas del navegador.
8. Reutilización de componentes
Sprint: 2 (refactor de componentes)
Qué pedí: analizar cómo reutiliza componentes el proyecto de ejemplo de la profesora y comparar Taquilla con ese patrón.
Qué respondió la IA: que el patrón es: componentes "tontos" que reciben datos, textos y funciones por props (textoAccion, onAccion), y el estado en el padre común con useState. Encontró 8 componentes de Taquilla que recibían el objeto textos completo y buscaban sus textos adentro.
Qué hice: el refactor se hizo en tres partes y en cada una se compararon capturas antes y después para confirmar que nada visual cambiaba. Lo usé para entender el patrón y poder explicarlo.