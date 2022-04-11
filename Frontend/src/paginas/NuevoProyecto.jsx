import FormularioProyecto from "../Components/FormularioProyecto";
const NuevoProyecto = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>
      <div className="mt-10 flex justify-center">
        <FormularioProyecto valor={"Crear Proyectos"} />
      </div>
    </>
  );
};

export default NuevoProyecto;
