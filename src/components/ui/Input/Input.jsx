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
  error
}) {
  return (
    // [STATIC] Contenedor que agrupa el label, el input y el error.
    <div className="campo">
      
      {/* [STATIC] Si se pasa un 'label', lo dibuja. El htmlFor conecta el texto con el input por su id. */}
      {label && <label htmlFor={id} className="campo__label">{label}</label>}
      
      {/* [STATIC] El campo de texto real. */}
      <input
        id={id}
        type={type}
        // [LOCAL] Si hay un error, le añade la clase roja. Si no, se queda normal.
        className={`campo__input ${error ? 'campo__input--error' : ''}`}
        placeholder={placeholder}
        // [LOCAL] Atado al estado de React para saber qué se escribe.
        value={value}
        // [LOCAL] Función que actualiza el estado cada vez que se teclea.
        onChange={onChange}
        disabled={disabled}
      />
      
      {/* [LOCAL] Si existe un mensaje de error, lo muestra en texto rojo abajo. */}
      {error && <span className="campo__error-msg">{error}</span>}
    </div>
  );
}

export default Input;