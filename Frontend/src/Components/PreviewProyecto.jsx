import { Link } from "react-router-dom";
import useAuth from "../hook/useAuth";
const PreviewProyecto = ({ proyecto }) => {
  const { auth } = useAuth();
  const { nombre, _id, cliente, creador } = proyecto;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row">
      <div className="flex items-center justify-between"></div>
      <p className="flex-1">
        {nombre}{" "}
        <span className="text-sm text-gray-500 uppercase"> {cliente}</span>
      </p>
      {auth !== creador && (
        <p className="p-1 text-xs rounded-lg text-white bg-green-500 font-bold uppercase">
          Colaborador
        </p>
      )}
      <Link
        className="text-gray-600 uppercase text-sm font-bold hover:text-gray-700"
        to={`${_id}`}
      >
        Ver Proyecto{" "}
      </Link>
    </div>
  );
};

export default PreviewProyecto;
