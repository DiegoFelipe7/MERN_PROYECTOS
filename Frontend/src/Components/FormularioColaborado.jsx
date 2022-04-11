import { useState } from "react";
import useProyectos from "../hook/useProyectos";
import Alerta from "./Alerta";
const FormularioColaborador = () => {
  const { alerta, mostrarAlerta, submitColaborador } = useProyectos();
  const [email, setemail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      mostrarAlerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    await submitColaborador(email);
  };
  const { msg } = alerta;
  return (
    <>
      <form
        className="bg-white py-10 px-5 w-full md:1/2 rounded-lg shadow"
        onSubmit={handleSubmit}
      >
        {msg && <Alerta alerta={alerta} />}
        <div className="mb-3">
          <label
            className="text-gray-700 uppercase font-bold text-sm"
            htmlFor="nombre"
          >
            Email Colaborador
          </label>

          <input
            id="email"
            name="email"
            type="text"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="border w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Email"
          />
        </div>
        <input
          type="submit"
          value="Buscar colaborador"
          className="bg-sky-600 w-full p-3 uppercase font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
        />
      </form>
    </>
  );
};

export default FormularioColaborador;
