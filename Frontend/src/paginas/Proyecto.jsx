import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import useProyectos from "../hook/useProyectos";
import ModalTarea from "../Components/ModalFormularioTarea";
import Tarea from "../Components/Tarea";
import ModalEliminarTarea from "../Components/ModalEliminarTarea";
import ModalEliminarColaborador from "../Components/ModalEliminarColaborador";
import useAdmin from "../hook/useAdmin";
import Colaboradores from "../Components/Colaboradores";
import Alerta from "../Components/Alerta";
import io from "socket.io-client";
let socket;
const Proyecto = () => {
  const { id } = useParams();
  const {
    alerta,
    proyecto,
    cargando,
    obtenerProyecto,
    handleModalTarea,
    submitTareasProyectos,
    submitEliminarTarea,
    submitActualizarTare,
    cambiarEstadoTarea,
  } = useProyectos();
  const admin = useAdmin();
  console.log(admin);
  useEffect(() => {
    obtenerProyecto(id);
  }, []);
  useEffect(() => {
    socket = io("http://localhost:3001");
    socket.emit("abrir proyecto", id);
  }, []);
  useEffect(() => {
    socket.on("tarea agregada", (tareanueva) => {
      if (tareanueva.proyecto === proyecto._id) {
        submitTareasProyectos(tareanueva);
      }
    });

    socket.on("tarea eliminada", (tareaEliminada) => {
      if (tareaEliminada.proyecto === proyecto._id) {
        submitEliminarTarea(tareaEliminada);
      }
    });

    socket.on("tarea actualizada", (tareaActualizada) => {
      if (tareaActualizada.proyecto._id === proyecto._id) {
        submitActualizarTare(tareaActualizada);
      }
    });
    socket.on("nuevo estado", (nuevoEstadoTarea) => {
      if (nuevoEstadoTarea.proyecto._id === proyecto._id) {
        cambiarEstadoTarea(nuevoEstadoTarea);
      }
    });
  });
  const { msg } = alerta;
  return (
    <>
      {cargando ? (
        <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-slate-200 h-10 w-10"></div>
            <div className="flex-1 space-y-6 py-1">
              <div className="h-2 bg-slate-200 rounded"></div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                  <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                </div>
                <div className="h-2 bg-slate-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl">{proyecto.nombre}</h1>
            {admin && (
              <div className="flex items-center gap-2 text-gray-400 hover:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <Link to={`/proyectos/editar/${id}`}>Editar</Link>
              </div>
            )}
          </div>
          {admin && (
            <button
              onClick={handleModalTarea}
              type="button"
              className="text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Nueva Tarea
            </button>
          )}
          <p className="font-bold text-xl mt-10">Tareas del proyecto </p>
          <div className="bg-white shadow mt-10 rounded-lg">
            {proyecto.tareas?.length ? (
              proyecto.tareas?.map((tarea) => (
                <Tarea key={tarea._id} tarea={tarea} />
              ))
            ) : (
              <p className="text-center my-5 p-10">
                No hay tareas en este proyecto
              </p>
            )}
          </div>
          {admin && (
            <>
              <div className="flex items-center justify-between mt-10">
                <p className="text-xl font-black ">Colaboradores</p>
                <Link
                  className="text-gray-400 uppercase hover:text-black font-bold"
                  to={`/proyectos/nuevo-colaborador/${id}`}
                >
                  Añadir
                </Link>
              </div>
              <div className="bg-white shadow mt-10 rounded-lg">
                {proyecto.colaboradores?.length ? (
                  proyecto.colaboradores?.map((colaborador) => (
                    <Colaboradores
                      key={colaborador._id}
                      colaborador={colaborador}
                    />
                  ))
                ) : (
                  <p className="text-center my-5 p-10">
                    No hay tareas en este proyecto
                  </p>
                )}
              </div>
            </>
          )}
          <ModalTarea />
          <ModalEliminarTarea />
          <ModalEliminarColaborador />
        </>
      )}
    </>
  );
};

export default Proyecto;
