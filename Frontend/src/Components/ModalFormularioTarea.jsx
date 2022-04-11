import { Fragment, useState, useEffect } from "react";
import useProyectos from "../hook/useProyectos";
import { Dialog, Transition } from "@headlessui/react";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";
const opciones = ["Baja", "Media", "Alta"];
const ModalFormularioTarea = () => {
  const { id } = useParams();
  const { tarea, modal, alerta, submitTarea, mostrarAlerta, handleModalTarea } =
    useProyectos();
  const [tareas, settareas] = useState({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    prioridad: "",
    proyecto: id,
  });
  useEffect(() => {
    if (tarea?._id) {
      settareas(tarea);
      return;
    }
  }, [tarea]);
  const { nombre, descripcion, fechaEntrega, prioridad } = tareas;
  const submitTareas = async (e) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      fechaEntrega.trim() === "" ||
      prioridad.trim() === ""
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    await submitTarea(tareas);
    settareas({
      nombre: "",
      descripcion: "",
      fechaEntrega: "",
      prioridad: "",
    });
  };
  const { msg } = alerta;
  return (
    <Transition.Root show={modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={handleModalTarea}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={handleModalTarea}
                  className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Cerrar</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <Dialog.Title
                    as="h3"
                    className="text-4xl leading-6 font-bold text-gray-900"
                  >
                    {tarea?._id ? "Editar Tarea" : "Nueva Tarea"}
                  </Dialog.Title>
                  <form className="my-10" onSubmit={submitTareas}>
                    {msg && <Alerta alerta={alerta} />}
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre"
                      >
                        Nombre Tarea
                      </label>

                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={nombre}
                        onChange={(e) =>
                          settareas({
                            ...tareas,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del Proyecto"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre"
                      >
                        Descripción
                      </label>

                      <textarea
                        name="descripcion"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) =>
                          settareas({
                            ...tareas,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del Proyecto"
                        cols="30"
                        rows="3"
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre"
                      >
                        Fecha Entrega
                      </label>

                      <input
                        id="fechaEntrega"
                        name="fechaEntrega"
                        value={fechaEntrega}
                        onChange={(e) =>
                          settareas({
                            ...tareas,
                            [e.target.name]: e.target.value,
                          })
                        }
                        type="date"
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        placeholder="Nombre del Proyecto"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        className="text-gray-700 uppercase font-bold text-sm"
                        htmlFor="nombre"
                      >
                        Prioridad
                      </label>
                      <select
                        id="prioridad"
                        name="prioridad"
                        value={prioridad}
                        onChange={(e) =>
                          settareas({
                            ...tareas,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                      >
                        <option value="">:.</option>
                        {opciones.map((opcion) => (
                          <option key={opcion}>{opcion} </option>
                        ))}
                      </select>
                    </div>
                    <input
                      type="submit"
                      value={tarea?._id ? "Editar Tarea" : "Guardar Tarea"}
                      className="bg-sky-600 p-3 text-white font-bold w-full uppercase hover:bg-sky-700 cursor-pointer transition-colors rounded"
                    />
                  </form>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default ModalFormularioTarea;
