import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import useProyectos from "../hook/useProyectos";
import { useParams } from "react-router-dom";
const FormularioProyecto = ({ valor }) => {
  const { id } = useParams();
  const [proyectos, setproyectos] = useState({
    nombre: "",
    descripcion: "",
    fechaEntrega: "",
    cliente: "",
  });
  const { nombre, descripcion, fechaEntrega, cliente } = proyectos;
  const { proyecto, alerta, submitProyecto, mostrarAlerta } = useProyectos();
  useEffect(() => {
    if (id) {
      setproyectos(proyecto);
    }
  }, [id]);
  const NuevoProyecto = async (e) => {
    e.preventDefault();
    if (
      nombre.trim() === "" ||
      descripcion.trim() === "" ||
      fechaEntrega.trim() === "" ||
      cliente.trim() === ""
    ) {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    } else {
      await submitProyecto(proyectos);
      setproyectos({
        nombre: "",
        descripcion: "",
        fechaEntrega: "",
        cliente: "",
      });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <form
        className="bg-white py-10 px-5 md:w-1/2 rounded-lg shadow"
        onSubmit={NuevoProyecto}
        autoComplete="OFF"
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-3">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"
          >
            Nombre Proyecto
          </label>

          <input
            id="nombre"
            name="nombre"
            type="text"
            onChange={(e) =>
              setproyectos({ ...proyectos, [e.target.name]: e.target.value })
            }
            value={nombre}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del Proyecto"
          />
        </div>
        <div className="mb-3">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="descripcion"
          >
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            onChange={(e) =>
              setproyectos({ ...proyectos, [e.target.name]: e.target.value })
            }
            value={descripcion}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del Proyecto"
          ></textarea>
        </div>
        <div className="mb-3">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="fechaEntrega"
          >
            Fecha De Entrega
          </label>

          <input
            id="fechaEntrega"
            name="fechaEntrega"
            type="date"
            onChange={(e) =>
              setproyectos({ ...proyectos, [e.target.name]: e.target.value })
            }
            value={fechaEntrega}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del Proyecto"
          />
        </div>
        <div className="mb-3">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="cliente"
          >
            Nombre Cliente
          </label>

          <input
            id="cliente"
            name="cliente"
            type="text"
            onChange={(e) =>
              setproyectos({ ...proyectos, [e.target.name]: e.target.value })
            }
            value={cliente}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del Proyecto"
          />
        </div>
        <input
          type="submit"
          value={valor}
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    </>
  );
};

export default FormularioProyecto;
