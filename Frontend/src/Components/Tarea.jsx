import formaterFecha from "../helper/FormateraFecha";
import useProyectos from "../hook/useProyectos";
import useAdmin from "../hook/useAdmin";
const Tarea = ({ tarea }) => {
  const { nombre, descripcion, estado, fechaEntrega, prioridad, _id } = tarea;
  const {
    handleModalEditarTarea,
    handleModalTarea,
    handleModalEliminarTarea,
    completarTarea,
  } = useProyectos();
  const editarTarea = (tarea) => {
    handleModalEditarTarea(tarea);
    handleModalTarea;
  };
  const eliminarTarea = (tarea) => {
    handleModalEliminarTarea(tarea);
  };

  const admin = useAdmin();
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div className="flex flex-col  items-start">
        <p className="mb-1 text-xl">{nombre}</p>
        <p className="mb-1 text-sm text-gray-500">{descripcion}</p>
        <p className="mb-1 text-xl">{formaterFecha(fechaEntrega)}</p>
        <p className="mb-1 text-xl text-gray-600">Prioridad: {prioridad}</p>
        {estado && (
          <p className="text-white bg-green-500 p-1 uppercase font-bold rounded-lg">
            Compleado por:{tarea.completado.nombre}
          </p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-4">
        {admin && (
          <button
            className="bg-indigo-600 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
            onClick={() => editarTarea(tarea)}
          >
            Editar
          </button>
        )}
        <button
          className={`${
            estado ? "bg-sky-600" : "bg-gray-600"
          } px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}
          onClick={() => completarTarea(_id)}
        >
          {estado ? "Completa" : "Incompleta"}
        </button>
        {admin && (
          <button
            className="bg-red-600 text-white px-4 py-3 uppercase font-bold text-sm rounded-lg"
            onClick={() => eliminarTarea(tarea)}
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Tarea;
