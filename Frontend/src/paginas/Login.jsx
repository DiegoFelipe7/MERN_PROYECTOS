import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../Components/Alerta";
import clienteaxios from "../config/axios";
import useAuth from "../hook/useAuth";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navegacion = useNavigate();
  const [usuario, setusuario] = useState({
    email: "",
    password: "",
  });
  const [alerta, setalerta] = useState({});
  const { email, password } = usuario;
  const { setauth } = useAuth();
  const IniciarSesion = async (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      setalerta({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
      return;
    }

    try {
      const respuesta = await clienteaxios.post("usuarios/login", usuario);
      setalerta({
        msg: respuesta.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
      localStorage.setItem("token", respuesta.data.token);
      setauth(respuesta.data);
      navegacion("/proyectos");
    } catch (error) {
      setalerta({
        msg: error.response.data.msg,
        error: true,
      });
      setTimeout(() => {
        setalerta({});
      }, 3000);
    }
  };
  const { msg } = alerta;
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl capitalize">
        Iniciar sesion y administra tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}
      <form
        className="my-5 bg-white shadow rounded px-10 py-5"
        onSubmit={IniciarSesion}
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
            value={email}
            onChange={(e) =>
              setusuario({ ...usuario, [e.target.name]: e.target.value })
            }
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
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
            onChange={(e) =>
              setusuario({ ...usuario, [e.target.name]: e.target.value })
            }
            type="password"
            value={password}
            placeholder="Password "
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="registrar"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="olvide-password"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
