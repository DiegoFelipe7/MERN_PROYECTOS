import { useContext } from "react";
import ProyectoContex from "../contex/ProyectosProvider";
const useProyectos = () => {
  return useContext(ProyectoContex);
};

export default useProyectos;
