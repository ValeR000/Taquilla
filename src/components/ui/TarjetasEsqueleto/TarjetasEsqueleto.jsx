/* SPRINT 2: Tarjetas esqueleto con la forma de TarjetaEvento mientras cargan los eventos */

export default function TarjetasEsqueleto({ cantidad = 4 }) {
  return Array.from({ length: cantidad }, (_, i) => (
    <div key={i} className="tarjeta-evento tarjeta-esqueleto" aria-hidden="true" />
  ));
}
