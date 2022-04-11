import useProyectos from "../hook/useProyectos";
const Colaboradores = ({ colaborador }) => {
  const { handleEliminarColaborador } = useProyectos();
  const { nombre, email } = colaborador;
  return (
    <div className="borde-b p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-gray-700">{nombre}</p>
        <p>{email}</p>
      </div>
      <div>
        <button
          className="bg-red-600 text-white px-4 py-3 font-bold"
          onClick={() => handleEliminarColaborador(colaborador)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Colaboradores;
