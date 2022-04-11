import { Link } from "react-router-dom";
import useProyectos from "../hook/useProyectos";
import ModalBuscador from "./ModalBuscador";
import useAuth from "../hook/useAuth";
const Header = () => {
  const { handleBuscador, cerrarSesionProyecto } = useProyectos();
  const { cerrarSesion } = useAuth();
  const salir = () => {
    cerrarSesion();
    cerrarSesionProyecto();
  };
  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="md:flex md:justify-between">
        <h2 className="text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">
          {" "}
          UpTask
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button className="font-bold uppercase" onClick={handleBuscador}>
            Buscar Proyectos
          </button>
          <Link to="/proyectos" className="font-bold uppercase">
            Proyectos
          </Link>
          <button
            className="text-white text-sm bg-sky-600 p-3 rounded-md uppercase font-bold"
            onSubmit={() => salir()}
          >
            Cerrar Sesion
          </button>
        </div>
      </div>
      <ModalBuscador />
    </header>
  );
};

export default Header;
