// ============================================================================
// ARCHIVO: Input.jsx
// RESPONSABILIDAD: Componente reutilizable de campo de texto. Incluye una 
// etiqueta (label) y un espacio para mostrar mensajes de error.
// 
// CONVENCIÓN DE ETIQUETAS (Origen del dato):
// [API]    = Dato que viene de internet (peticiones al servidor).
// [LOCAL]  = Dato o lógica que vive dentro de React (estados, eventos).
// [STATIC] = Código fijo de diseño (HTML, CSS, SVGs) que no cambia.
// ============================================================================

import './Input.css';

// [LOCAL] Recibe las propiedades para configurar el input.
function Input({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  disabled = false,
  error,
  variante = 'caja',
  clase = '',
  etiqueta,
  autoFocus,
  /* SPRINT 2: Props para formularios: nombre, autocompletado, ref para enfocar y un botón junto al campo (como el ojo de la contraseña) */
  name,
  autoComplete,
  ref,
  accion
  /* SPRINT 2 */
}) {
  // ##########
  const control = (
    // [STATIC] El campo de texto real.
    <input
      ref={ref} // Sprint 2
      id={id}
      name={name} // Sprint 2
      autoComplete={autoComplete} // Sprint 2
      aria-invalid={error ? true : undefined} // Sprint 2: avisa que el campo tiene error
      aria-describedby={error ? `${id}-error` : undefined} // Sprint 2: une el mensaje de error al campo
      type={type}
      // [LOCAL] Si hay un error, le añade la clase roja. Si no, se queda normal.
      className={`campo__input campo__input--${variante} ${error ? 'campo__input--error' : ''} ${clase}`.trim()}
      placeholder={placeholder}
      aria-label={etiqueta}
      autoFocus={autoFocus}
      // [LOCAL] Atado al estado de React para saber qué se escribe.
      value={value}
      // [LOCAL] Función que actualiza el estado cada vez que se teclea.
      onChange={onChange}
      disabled={disabled}
    />
  );

  /* SPRINT 2: Hace que el botón de acción quede junto al campo */
  const campo = accion ? (
    <div className="campo__control">
      {control}
      {accion}
    </div>
  ) : control;
  /* SPRINT 2 */

  if (!label && !error) return campo;
  // ##########

  return (
    // [STATIC] Contenedor que agrupa el label, el input y el error.
    <div className="campo">

      {/* [STATIC] Si se pasa un 'label', lo dibuja. El htmlFor conecta el texto con el input por su id. */}
      {label && <label htmlFor={id} className="campo__label">{label}</label>}

      {campo}

      {/* [LOCAL] Si existe un mensaje de error, lo muestra en texto rojo abajo. */}
      {error && <span id={`${id}-error`} className="campo__error-msg">{error}</span>}{/* Sprint 2: id para aria-describedby */}
    </div>
  );
}

export default Input;