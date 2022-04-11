import PreviewProyecto from "../Components/PreviewProyecto";
import useProyectos from "../hook/useProyectos";
import io from "socket.io-client";
import { useEffect } from "react";
let socket;
const Proyectos = () => {
  const { proyectos } = useProyectos();

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>
      <div className="bg-white shadow mt-10 rounded-lg p-4">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className="mt-5 text-center text-gray-600 uppercase">
            No hay proyectos aun
          </p>
        )}
      </div>
    </>
  );
};

export default Proyectos;
