import FormularioColaborador from "../Components/FormularioColaborado";
import useProyectos from "../hook/useProyectos";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
const NuevoColaborador = () => {
  const { id } = useParams();
  const {
    obtenerProyecto,
    guardarColaborador,
    proyecto,
    colaborador,
    cargando,
  } = useProyectos();
  useEffect(() => {
    obtenerProyecto(id);
  }, []);
  return (
    <>
      <h1 className="text-4xl font-black">
        Añadir colaboradores : {proyecto.nombre}
      </h1>
      <div className="flex justify-center mt-10">
        <FormularioColaborador />
      </div>
      {cargando ? (
        <p className="text-center font-bold">Cargando...</p>
      ) : (
        colaborador?._id && (
          <div className="flex justify-center mt-10">
            <div className="bg-white py-10 px-5 md:w-1/2 rounded-lg">
              <h2 className="text-center mt-10 text-2xl font-bold">
                Resultado:
              </h2>
              <div className="flex justify-between items-center">
                <p className="uppercase">{colaborador.nombre}</p>
              </div>
              <button
                className="bg-slate-500 px-5 p-3 mt-5 text-white  font-bold text-sm w-full rounded uppercase"
                onClick={() =>
                  guardarColaborador({
                    email: colaborador.email,
                  })
                }
              >
                Guardar Colaboradores
              </button>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default NuevoColaborador;
