import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../Components/Alerta";
import clienteaxios from "../config/axios";
const OlvidePassword = () => {
  const [email, setemail] = useState("");
  const [alerta, setAlerta] = useState({});
  const EnviarCorreo = async (e) => {
    e.preventDefault();
    if (email.trim() === "") {
      setAlerta({
        msg: "Ingresa un email",
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
      return;
    }
    try {
      const respuesta = await clienteaxios.post("usuarios/olvide-password", {
        email,
      });
      setAlerta({
        msg: respuesta.data.msg,
        error: false,
      });
      setTimeout(() => {
        setAlerta({});
        setemail("");
      }, 2000);
      s;
    } catch (erro) {
      setAlerta({
        msg: erro.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setAlerta({});
      }, 2000);
    }
  };
  const { msg } = alerta;
  return (
    <>
      <>
        <h1 className="text-sky-600 font-black text-5xl capitalize">
          Recupera tu cuenta y administra tus{" "}
          <span className="text-slate-700">proyectos</span>
        </h1>
        {msg && <Alerta alerta={alerta} />}
        <form
          className="my-5 bg-white shadow rounded px-10 py-5"
          onSubmit={EnviarCorreo}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Email de registo"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            />
          </div>
          <input
            type="submit"
            value="Enviar correo"
            className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
        <nav className="lg:flex lg:justify-between">
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/registrar"
          >
            ¿No tienes una cuenta? Registrate
          </Link>
          <Link
            className="block text-center my-5 text-slate-500 uppercase text-sm"
            to="/"
          >
            ¿Ya tienes una cuenta ? Inicia sesión
          </Link>
        </nav>
      </>
    </>
  );
};

export default OlvidePassword;
