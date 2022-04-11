const formaterFecha = (fecha) => {
  const nuevafecha = new Date(fecha.split("T")[0].split("-"));
  const opcines = {
    weekday: "long",
    year: "numeric",
    month: "long",
    dat: "number",
  };
  return nuevafecha.toLocaleDateString("es-ES", opcines);
};
export default formaterFecha;
