# Demo del Sprint 2

Recorrido paso a paso para comprobar las cinco historias del Sprint 2. Cada paso dice qué hacer y qué se debe ver.

**Dónde probar:** https://taquilla-one.vercel.app/ o en local con `npm run local`.

**Cuenta de prueba:** `laura@taquilla.test` / `taquilla123`. La API bloquea un correo unos 5 minutos después de 5 ingresos fallidos.

**Herramientas para simular estados:**
- Una extensión para agregar cabeceras a las peticiones (por ejemplo ModHeader), con `X-Simular-Latencia: 2000` para ver la carga y `X-Simular-Error: 503` para ver el error.
- Las herramientas del navegador (F12): el modo celular, la opción **Offline** en Network y las cookies en Application.

## US-TAQ-S2-01 · Detalle de un evento

1. Desde el Inicio, abrir cualquier evento.
   - **Qué se ve:** La ruta cambia a `/eventos/{slug}`. Aparecen las migas (Inicio › Explorar › evento), el afiche con el degradado de los colores de la API, las etiquetas, el título y los artistas.
2. Bajar por la página.
   - **Qué se ve:** La fecha, la hora con apertura de puertas y el lugar; la descripción; "Cómo llegar"; las funciones y las localidades con su precio y disponibilidad ("Quedan…" o "Agotada"); y hasta 4 eventos relacionados.
3. Mirar la pestaña del navegador.
   - **Qué se ve:** El título es el nombre del evento ("… · Taquilla"). Equivale a `generateMetadata` de Next.js.
4. Ir a `/eventos/no-existe`.
   - **Qué se ve:** La API responde 404 y se muestra "No encontramos este evento". Equivale a `notFound()`.
5. Activar el modo celular (390 px).
   - **Qué se ve:** La imagen ocupa todo el ancho, con los botones Volver y Compartir encima.

## US-TAQ-S2-02 · Estados de carga, vacío y error

1. Con `X-Simular-Latencia: 2000`, recargar el Inicio, Explorar y un Detalle.
   - **Qué se ve:** Esqueletos con la forma del contenido final, sin saltos de diseño al cargar.
2. Con `X-Simular-Error: 503`, recargar Explorar.
   - **Qué se ve:** "Algo salió mal", el mensaje de `textos.errores` y el botón Reintentar.
3. Quitar la cabecera y pulsar Reintentar.
   - **Qué se ve:** Se vuelve a pedir solo lo que falló, carga la lista y el foco va al título.
4. En Explorar, buscar `zzzz` (`GET /eventos?q=zzzz`).
   - **Qué se ve:** Estado vacío con el mensaje de `textos.estados` y el botón "Limpiar filtros".

## US-TAQ-S2-03 · Iniciar sesión

1. Ir a `/ingresar`.
   - **Qué se ve:** Formulario con etiquetas visibles para el correo y la contraseña, y los enlaces "¿Olvidaste tu contraseña?" y "Crea una cuenta".
2. Pulsar Ingresar con los campos vacíos.
   - **Qué se ve:** Un aviso arriba, el mensaje junto a cada campo con el borde rojo, y el foco en el primer campo con error.
3. Pulsar el ojo de la contraseña.
   - **Qué se ve:** La contraseña se muestra u oculta, y el botón anuncia su estado con `aria-pressed`.
4. Ingresar con la cuenta de prueba.
   - **Qué se ve:** Vuelve al Inicio con la sesión iniciada: las iniciales "LC" en la barra.

## US-TAQ-S2-04 · Ver por qué no pude ingresar

1. Con `X-Simular-Latencia: 2000`, enviar el formulario.
   - **Qué se ve:** El botón muestra un spinner y "Ingresando…", y no se puede enviar dos veces.
2. Ingresar con una contraseña incorrecta.
   - **Qué se ve:** Un solo mensaje, "Correo o contraseña incorrectos", sin decir qué dato falló. La contraseña se borra y el foco vuelve a ella.
3. Fallar 6 veces seguidas con un correo inventado.
   - **Qué se ve:** La API responde 429. El formulario se bloquea y cuenta los segundos de la cabecera `Retry-After`.
4. Con F12 → Network → Offline, enviar el formulario.
   - **Qué se ve:** "No pudimos conectarnos", el botón dice "Reintentar" y lo escrito se conserva.

## US-TAQ-S2-05 · Mantener la sesión y cerrarla

1. Con la sesión iniciada, recargar la página.
   - **Qué se ve:** La sesión sigue: se consulta `GET /sesion` y la barra muestra las iniciales.
2. Abrir el menú de las iniciales.
   - **Qué se ve:** El nombre y el correo de la persona (vienen de la API) y "Cerrar sesión". En celular, el menú hamburguesa muestra lo mismo.
3. Pulsar "Cerrar sesión".
   - **Qué se ve:** Se llama a `DELETE /sesion` y se vuelve al Inicio como visitante, con los botones "Ingresar" y "Crear cuenta".
4. Ingresar de nuevo, borrar la cookie `sesion` (F12 → Application → Cookies → dominio de la API) y recargar.
   - **Qué se ve:** La sesión venció (401 `no_autenticado`): se lleva a la persona a Ingresar con el aviso "Tu sesión terminó".
5. Revisar F12 → Application → Local Storage.
   - **Qué se ve:** Solo está la marca `sesionIniciada`; el token nunca se guarda en el navegador.