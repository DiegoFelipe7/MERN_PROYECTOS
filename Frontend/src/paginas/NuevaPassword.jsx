import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import clienteaxios from "../config/axios";
import Alerta from "../Components/Alerta";
const NuevoPassword = () => {
  const navegacion = useNavigate();
  const [comprovar, setcomprovar] = useState(false);
  const [password, setPassword] = useState("");
  const [alerta, setalerta] = useState({});
  const params = useParams();
  const { token } = params;
  console.log(token);
  useEffect(() => {
    const validarToken = async () => {
      try {
        const respueta = await clienteaxios.get(
          `usuarios/olvide-password/${token}`
        );
        setalerta({
          msg: respueta.data.msg,
          error: false,
        });
        setTimeout(() => {
          setalerta({});
        }, 3000);
        setcomprovar(true);
      } catch (erro) {
        setalerta({
          msg: erro.response.data.msg,
          error: true,
        });
      }
    };
    validarToken();
  }, []);
  const UpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await clienteaxios.post(
        `usuarios/olvide-password/${token}`,
        {
          password,
        }
      );
      setalerta({
        msg: respuesta.data.msg,
        error: false,
      });
      setTimeout(() => {
        setalerta({});
        navegacion("/");
      }, 2000);
      setcomprovar(false);
    } catch (erro) {
      setalerta({
        msg: erro.response.data.msg,
        error: true,
      });
    }
  };
  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Restablece tu password y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}
      {comprovar ? (
        <form
          className="my-5 bg-white shadow rounded px-10 py-5"
          onSubmit={UpdatePassword}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              placeholder="Escribe tu nuevo password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo password"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      ) : null}
    </>
  );
};

export default NuevoPassword;
